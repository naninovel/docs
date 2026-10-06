# Integration Options

While Naninovel is focused on traditional visual novel games and works best as a template for one, it's possible to integrate the engine with existing projects. If you're making a 3D adventure game, RPG or a game of any other genre, you can still use Naninovel as a drop-in dialogue system.

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

There are multiple ways you can integrate Naninovel with a custom project; the specific implementation depends on the project type and what you want to achieve. In the following documentation we'll list various configuration options and APIs that can be useful for "pairing" Naninovel with a standalone game. Before you continue, take a look at the [engine architecture](/guide/engine-architecture) to better understand its conceptual behaviour.

::: tip EXAMPLE
Check out the [integration sample](/guide/samples#dialogue-mode) where Naninovel is used both as a drop-in dialogue system for a 3D adventure game and as a standalone novel mode.
:::

## Manual Initialization

When the `Initialize On Application Load` option in the engine configuration menu is enabled, engine services automatically initialize on application start.

![](https://i.gyazo.com/5cb8ba25304f7c80d0af23859bc9286f.png)

Unless you want to begin your game in novel mode, you should manually initialize the engine when it's needed by invoking the static `RuntimeInitializer.Initialize()` method from C# or by adding a `Runtime Initializer` component to a game object in the scene; the latter will make the engine initialize when the scene is loaded in Unity.

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

To reset the engine services (and dispose most occupied resources), use the `ResetState()` method of the `IStateManager` service; this is useful when temporarily switching to another gameplay mode while being able to return to novel mode without re-initializing the engine.

To destroy all the engine services and completely remove Naninovel from memory, use the `Engine.Destroy()` static method.

## Accessing Engine API

The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs may not be available right after Unity loads a scene (eg, in `Awake`, `Start` and `OnEnable` MonoBehaviour methods).

To check whether the engine is currently available, use the `Engine.Initialized` property; the `Engine.OnInitializationFinished` event allows executing actions after the initialization procedure is finished, eg:

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
        // Engine is initialized here; it's safe to use the APIs.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## Playing Scenario Scripts

To preload and play a scenario script with a given path, use the `LoadAndPlay(scriptPath)` method on the `MainTrack` of the `IScriptPlayer` service. To get an engine service, use the `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of the service to retrieve. For example, the following gets a script player service, preloads and plays a script named `Script001`:

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.MainTrack.LoadAndPlay("Script001");
```

When exiting the novel mode and returning to the main game mode, you probably want to unload all resources currently used by Naninovel and stop engine services. For this, use the `ResetState()` method of the `IStateManager` service:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### Script Asset Reference

If you'd like to reference scenario script assets in your custom systems (for example, to play dialogues or cutscenes), be aware that storing a script path directly is fragile as it depends on file location and name.

Instead, use the asset reference (GUID). The reference won't change when the associated file is moved or renamed. To resolve a script path from a GUID, use the `ScriptAssets.GetPath` method. Naninovel also provides a `ScriptAssetRef` property drawer, allowing assigning script assets directly to serialized fields for convenience.

Below is an example of a serialized script reference that is resolved to a script path and played when the player collides with a trigger:

```cs
[ScriptAssetRef]
public string ScriptRef;

private void OnTriggerEnter (Collider other)
{
    var path = ScriptAssets.GetPath(ScriptRef);
    var player = Engine.GetService<IScriptPlayer>();
    player.MainTrack.LoadAndPlay(path).Forget();
}
```

Built-in components, such as `Dialogue Events`, use the same attribute: drag and drop a script asset to the `Script` field, and the reference will remain intact when the script file is moved or renamed.

![](https://i.gyazo.com/e6d96c7de99fabd16cf4a74d8a485469.png)

## Disable Title Menu

After initialization, the engine plays the script assigned to `Title Script` in the scripts configuration menu (`Title` by default), and the default [title script](/guide/scenario-scripting#title-script) shows the built-in title menu with the `@showUI TitleUI` command. If you have your own title menu, unassign the title script or remove the command from it. You can also modify, replace or completely remove the built-in title menu using the [UI customization feature](/guide/gui#ui-customization). The menu is listed under `TitleUI` in the UI resources.

## Engine Objects Layer

You can make the engine assign a specific [layer](https://docs.unity3d.com/Manual/Layers.html) to all the objects (except UI-related) it creates via the configuration menu.

![](https://i.gyazo.com/b27cdf9e3f5d9e7b25bbc4cbb37afe04.png)

This will also make the engine's camera use a [culling mask](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) to render only objects on the specified layer.

To change the layer of UI objects managed by the engine, use the `Objects Layer` option in the UI configuration menu.

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## Render to Texture

You can make the engine's camera render to a custom [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) instead of the screen (and change other camera-related settings) by assigning a custom camera prefab to the `Main Camera` option in the camera configuration menu.

![](https://i.gyazo.com/e302efafe6136a0d949defe17f6bc625.png)

## Switching Modes

To switch between your game and Naninovel (eg, between "adventure" and "novel" modes), use the static `Dialogue` class. `Dialogue.Enter()` initializes the engine when it's not initialized yet and enables Naninovel rendering and input processing, while `Dialogue.Exit()` resets the engine state and disables them. `Dialogue.EnterAndPlay()` enters the dialogue mode and plays a scenario script with the specified path; `Dialogue.EnterAndPlayAsset()` does the same with a [script asset reference](/guide/integration-options#script-asset-reference):

```csharp
await Dialogue.EnterAndPlay("Script001");
...
await Dialogue.Exit();
```

Exiting has no effect unless the dialogue mode was entered first; the current state is exposed via the `Dialogue.Active` property. To react to the switch (eg, to block the character controls of your game during a dialogue), use the `Dialogue.OnEntered` and `Dialogue.OnExited` events.

In scenario scripts, use the [@enterDialogue] and [@exitDialogue] commands:

```nani
; Switch to adventure mode.
@exitDialogue
```

The same API is available without C# via the `Dialogue Events` component: invoke its `EnterDialogue` and `ExitDialogue` methods from Unity events, assign `Script` and `Label` to play a scenario script on enter and use the `Dialogue Entered` and `Dialogue Exited` events to react to the switch. To add a preconfigured dialogue trigger, right-click a game object in the scene and select `Naninovel -> Dialogue`; the created object pairs `Dialogue Events` with a `Trigger Events` component, which enters the dialogue when the configured constraints (collision, raycast, pointer hover, input) are met. See the [getting started guide](/guide/getting-started#dialogue-mode) for an example.

In the [integration sample](/guide/samples#dialogue-mode), each NPC has such a `Dialogue` object with a script and a label assigned; the trigger activates when the player character enters its collider and performs the assigned input. A `Dialogue Events` component under the player object blocks the character controls while the dialogue mode is active, and a `Camera Events` component stacks the Naninovel camera over the scene camera with the `SetupBaseCamera` method, so the cameras don't have to be switched. The dialogue scripts end with [@exitDialogue]; the novel mode is a regular scenario script navigated to with [@goto], which ends with the same command.

## Other Options

There are multiple other features (state outsourcing, service overriding, custom serialization, resource and configuration providers, etc) that can be useful when integrating the engine with other systems. Check the rest of the guide for more information. Consider investigating the available [configuration options](/guide/configuration) as well; some features may not be described in the guide but can still be handy for integration.

If you feel some engine API or system lacks extensibility and requires source code modification to integrate, please [contact support](/support/) — we'll consider improving it.

::: tip EXAMPLE
Check the [integration sample](/guide/samples#dialogue-mode), where Naninovel is used both as a drop-in dialogue system for a 3D adventure game and as a switchable standalone novel mode.
:::
