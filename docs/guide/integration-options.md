# Integration Options

While Naninovel is focused around traditional visual novel games and works best as a template for one, it's possible to integrate the engine with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system.

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

There are multiple ways you can integrate Naninovel with a custom project and specific implementation will depend on the type of the project and what exactly you want to achieve with Naninovel. In the following documentation we'll list various configuration options and API that could be useful for "pairing" Naninovel with a standalone game. Before you continue, take a look at the [engine architecture](/guide/engine-architecture) to better understand how it behaves on a conceptual level.

::: tip EXAMPLE
Check out an [example project](/guide/integration-options#example-project), where Naninovel is used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode.
:::

## Manual Initialization

When `Initialize On Application Load` option in the engine configuration menu is enabled, the engine services will automatically initialize on application start.

![](https://i.gyazo.com/6349692c2e2036e908e41c3d89509102.png)

Unless you want to begin your game in novel mode, you would rather manually initialize the engine when it's actually needed by either invoking a static `RuntimeInitializer.Initialize()` method from C# or adding a `Runtime Initializer` component to a game object on scene; the latter will make the engine initialize when the scene is loaded in Unity.

Below is an example of manual initialization from a [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) script:

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

Disabling `Scene Independent` option will make all the Naninovel-related objects part of the Unity scene where the engine was initialized; the engine will be destroyed when the scene is unloaded.

To reset the engine services (and dispose most of the occupied resources), use `ResetState()` method of `IStateManager` service; this is useful, when you're going to temporary switch to some other gameplay mode, but be able to return to novel mode without re-initializing the engine.

To destroy all the engine services and completely remove Naninovel from memory, use `Engine.Destroy()` static method.

## Accessing Engine API

The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs may not be available right after Unity loads a scene (eg, in `Awake`, `Start` and `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) methods).

To check whether the engine is currently available, use `Engine.Initialized` property; `Engine.OnInitializationFinished` event allows executing actions after the initialization procedure is finished, eg:

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

## Playing Naninovel Scripts

To preload and play a naninovel script with a given path, use `LoadAndPlay(ScriptPath)` method of `IScriptPlayer` service. To get an engine service, use `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of the service to retrieve. For example, the following will get a script player service, then preload and play a script with name "Script001":

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.LoadAndPlay("Script001");
```

When exiting the novel mode and returning to the main game mode, you probably would like to unload all the resources currently used by Naninovel and stop all the engine services. For this, use `ResetState()` method of a `IStateManager` service:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

## Disable Title Menu

A built-in title menu implementation will be automatically shown when the engine is initialized, while you'll most likely have your own title menu. You can either modify, replace or completely remove the built-in title menu using [UI customization feature](/guide/user-interface#ui-customization). The menu goes under `Title UI` in the UI resources list.

## Engine Objects Layer

You can make the engine assign a specific [layer](https://docs.unity3d.com/Manual/Layers.html) for all the objects (except UI-related) it creates via configuration menu.

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

This will also make the engine's camera to use [culling mask](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) and render only the objects with the specified layer.

To change layer of the UI objects managed by the engine, use `Objects Layer` option in the UI configuration menu.

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## Render to Texture

You can make the engine's camera render to a custom [render texture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) instead of the screen (and change other camera-related settings) by assigning a custom camera prefab in camera configuration menu.

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## Switching Modes

While it heavily depends on the project, following is an abstract example (based on the integration project mentioned previously) on how you can implement switching between "adventure" and "novel" modes via custom commands.

::: code-group

```csharp [SwitchToNovelMode.cs]
[CommandAlias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptPath;
    public StringParameter Label;

    public override async UniTask Execute (AsyncToken asyncToken)
    {
        // 1. Disable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
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
            await scriptPlayer.LoadAndPlay(ScriptPath, label);
        }

        // 4. Enable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = true;
    }
}
```

```csharp [SwitchToAdventureMode.cs]
[CommandAlias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask Execute (AsyncToken asyncToken)
    {
        // 1. Disable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = false;

        // 2. Stop script player.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.Stop();

        // 3. Reset state.
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetState();

        // 4. Switch cameras.
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. Enable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

:::

The commands can then be used in naninovel scripts:

```nani
; Switch to adventure mode.
@adventure
```

— or directly in C# (eg, in `OnTrigger` Unity events):

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptPath = "Script001" };
	switchCommand.Execute().Forget();
}
```

## Other Options

There are multiple other features (state outsourcing, services overriding, custom serialization, resource and configuration providers, etc), which could be situationally helpful when integrating the engine with another systems; check out rest of the guide for more information. Consider investigating the available [configuration options](/guide/configuration) as well; some feature may not be described in the guide, but still be handy for integration purposes.

If you feel some engine API or system is lacking in extendability and requiring source code modification in order to integrate, please [contact the support](/support/#naninovel-support) — we'll consider improving it.

::: tip EXAMPLE
Check [integration sample](/guide/samples#integration) where Naninovel is used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode.
:::
