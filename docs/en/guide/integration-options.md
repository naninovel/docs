# Integration Options

While Naninovel is focused around traditional visual novel games and works best as a template for one, it's possible to integrate the engine with existing projects. If you're making a 3D adventure game, RPG, or a game of any other genre — you can still use Naninovel as a drop-in dialogue system.

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

There are multiple ways you can integrate Naninovel with a custom project; the specific implementation depends on the project type and what you want to achieve. In the following documentation we'll list various configuration options and APIs that can be useful for "pairing" Naninovel with a standalone game. Before you continue, take a look at the [engine architecture](/guide/engine-architecture) to better understand its conceptual behavior.

::: tip EXAMPLE
Check out the [integration sample](/guide/samples#integration) where Naninovel is used both as a drop-in dialogue system for a 3D adventure game and as a standalone novel mode.
:::

## Manual Initialization

When the `Initialize On Application Load` option in the engine configuration menu is enabled, engine services automatically initialize on application start.

![](https://i.gyazo.com/6349692c2e2036e908e41c3d89509102.png)

Unless you want to begin your game in novel mode, you should manually initialize the engine when it's needed by invoking the static `RuntimeInitializer.Initialize()` method from C# or by adding a `Runtime Initializer` component to a GameObject in the scene; the latter will make the engine initialize when the scene is loaded in Unity.

Below is an example of manual initialization from a MonoBehaviour script:

```csharp
using Naninovel;
using UnityEngine;

public class MyScript : MonoBehaviour
{
    private async void Start ()
    {
        await RuntimeInitializer.Initialize();
    }
}
```

Disabling `Scene Independent` will make all Naninovel-related objects part of the Unity scene where the engine was initialized; the engine will be destroyed when the scene is unloaded.

To reset the engine services (and dispose most occupied resources), use `ResetState()` method of `IStateManager` service; this is useful when temporarily switching to another gameplay mode while being able to return to novel mode without re-initializing the engine.

To destroy all the engine services and completely remove Naninovel from memory, use `Engine.Destroy()` static method.

## Accessing Engine API

The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs may not be available right after Unity loads a scene (e.g., in `Awake`, `Start`, and `OnEnable` MonoBehaviour methods).

To check whether the engine is currently available, use `Engine.Initialized` property; `Engine.OnInitializationFinished` event allows executing actions after the initialization procedure is finished, e.g.:

```csharp
public class MyScript : MonoBehaviour
{
    private void Awake ()
    {
        // Engine may not be initialized here, so check first.
        if (Engine.Initialized) DoMyCustomWork();
        else Engine.OnInitializationFinished += DoMyCustomWork;
    }

    private void DoMyCustomWork ()
    {
        // Engine is initialized here, it's safe to use the APIs.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## Playing scenario scripts

To preload and play a scenario script with a given path, use `LoadAndPlay(ScriptPath)` method of `IScriptPlayer` service. To get an engine service, use `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of the service to retrieve. For example, the following gets a script player service, preloads, and plays a script named `Script001`:

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.MainTrack.LoadAndPlay("Script001");
```

When exiting the novel mode and returning to the main game mode, you probably want to unload all resources currently used by Naninovel and stop engine services. For this, use `ResetState()` method of the `IStateManager` service:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### Script Asset Reference

If you'd like to reference scenario script assets in your custom systems (for example, to play dialogues or cutscenes), be aware that storing a script path directly is fragile as it depends on file location and name.

Instead, use the asset reference (GUID). The reference won't change when the associated file is moved or renamed. To resolve a script path from a GUID use `ScriptAssets.GetPath` method. Naninovel also provides a `ScriptAssetRef` property drawer, allowing assigning script assets directly to serialized fields for convenience.

Below is a component from the [integration sample](/guide/samples#integration) that starts playing a specified script when the player collides with a trigger:

```cs
public class DialogueTrigger : MonoBehaviour
{
    [ScriptAssetRef]
    public string ScriptRef;
    public string Label;

    private void OnTriggerEnter (Collider other)
    {
        var player = Engine.GetService<IScriptPlayer>();
        var path = ScriptAssets.GetPath(ScriptRef);
        player.MainTrack.LoadAndPlayAtLabel(path, Label).Forget();
    }
}
```

In the Editor, you can drag-and-drop script assets to the `Script Ref` field, and the reference will remain intact when the script file is moved or renamed.

![](https://i.gyazo.com/cd634c628a0a116397f6ecef837a10b0.png)

## Disable Title Menu

A built-in title menu implementation is automatically shown when the engine is initialized, while you likely have your own title menu. You can modify, replace, or completely remove the built-in title menu using the [UI customization feature](/guide/gui#ui-customization). The menu is listed under `Title UI` in the UI resources.

## Engine Objects Layer

You can make the engine assign a specific [layer](https://docs.unity3d.com/Manual/Layers.html) for all the objects (except UI-related) it creates via the configuration menu.

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

This will also make the engine's camera use a [culling mask](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) to render only objects on the specified layer.

To change the layer of UI objects managed by the engine, use the `Objects Layer` option in the UI configuration menu.

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## Render to Texture

You can make the engine's camera render to a custom [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) instead of the screen (and change other camera-related settings) by assigning a custom camera prefab in the camera configuration menu.

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## Switching Modes

While it heavily depends on the project, the following is an abstract example (based on the integration sample) showing how to implement switching between "adventure" and "novel" modes via custom commands.

::: code-group

```csharp [SwitchToNovelMode.cs]
[Alias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptPath;
    public StringParameter Label;

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. Disable character control.
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. Switch cameras.
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. Load and play specified script (if assigned).
        if (Assigned(ScriptPath))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.MainTrack.LoadAndPlayAtLabel(ScriptPath, Label);
        }

        // 4. Unmute Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = false;
    }
}
```

```csharp [SwitchToAdventureMode.cs]
[Alias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. Mute Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = true;

        // 2. Stop script player.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.MainTrack.Stop();

        // 3. Reset state.
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetState();

        // 4. Switch cameras.
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. Enable character control.
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

:::

The commands can then be used in scenario scripts:

```nani
; Switch to adventure mode.
@adventure
```

—or directly in C# (e.g., in `OnTrigger` Unity events):

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptPath = "Script001" };
	switchCommand.Execute().Forget();
}
```

## Other Options

There are multiple other features (state outsourcing, service overriding, custom serialization, resource and configuration providers, etc.) that can be useful when integrating the engine with other systems. Check the rest of the guide for more information. Consider investigating the available [configuration options](/guide/configuration) as well; some features may not be described in the guide but can still be handy for integration.

If you feel some engine API or system lacks extendability and requires source code modification to integrate, please [contact the support](/support/#naninovel-support) — we'll consider improving it.

::: tip EXAMPLE
Check [integration sample](/guide/samples#integration) where Naninovel is used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode.
:::
