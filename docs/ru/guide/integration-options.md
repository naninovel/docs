# Integration Options

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue (novel) system. 

[!b1b6042db4a91b3a8cee74236b33c17c]

There are multiple ways you can integrate Naninovel with a custom project and specific implementation will depend on the type of the project and what exactly you want to achieve with Naninovel. In the following documentation we'll list various configuration options and API that could be useful for "pairing" Naninovel with a standalone game. Before you continue, take a look at the [engine architecture](/ru/guide/engine-architecture.md) to better understand how it behaves on a conceptual level.

::: example
Check out an [example project](/ru/guide/integration-options.md#example-project), where Naninovel is used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode. 
:::

## Manual Initialization 
The first thing you'll probably want to change is disable `Initialize On Application Load` option in the engine configuration menu.

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

When enabled, the engine services will automatically initialize on application start. Unless you want to begin your game in novel mode, you would rather manually initialize the engine when it's actually needed. 

Use static async `RuntimeInitializer.InitializeAsync()`  method (or a custom script) to initialize the engine at runtime before using any of the built-in service APIs. You can check whether the engine is currently initialized with `Engine.Initialized` property. Use `Engine.OnInitialized` event to listen for the initialization finished events.

To reset the engine services (and dispose most of the occupied resources), use `ResetStateAsync()` method of `IStateManager` service; this is useful, when you're going to temporary switch to some other gameplay mode, but be able to return to novel mode without re-initializing the engine.

To destroy all the engine services and completely remove Naninovel from memory, use `Engine.Destroy()` static method.

## Playing Naninovel Scripts
To preload and play a naninovel script with a given name, use `PreloadAndPlayAsync(ScriptName)` method of `IScriptPlayer` service. To get an engine service, use `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of the service to retrieve. For example, the following will get a script player service, then preload and play a script with name "Script001":

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

When exiting the novel mode and returning to the main game mode, you probably would like to unload all the resources currently used by Naninovel and stop all the engine services. For this, use `ResetStateAsync()` method of a `IStateManager` service:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetStateAsync();
```

## Disable Title Menu
A built-in title menu implementation will be automatically shown when the engine is initialized, while you'll most likely have your own title menu. You can either modify or completely replace the built-in title menu using [UI customization feature](/ru/guide/user-interface.md#ui-customization) or just disable it by turning off `Show Title UI` toggle in the engine configuration menu.

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

```csharp
[CommandAlias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptName;
    public StringParameter Label;

    public override async UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        // 1. Disable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. Load and play specified script (if assigned).
        if (Assigned(ScriptName))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.PreloadAndPlayAsync(ScriptName, label: Label);
        }

        // 4. Enable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = true;
    }
}
```

```csharp
[CommandAlias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        // 1. Disable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = false;

        // 2. Stop script player.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.Stop();

        // 3. Reset state.
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetStateAsync();

        // 4. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. Enable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

The commands can then be used in naninovel scripts:

```
; Switch to adventure mode.
@adventure
```

— or directly in C# (eg, in `OnTrigger` Unity events):

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptName = "Script001" };
	switchCommand.ExecuteAsync().Forget();
}
```

## Other Options

There are multiple other features (state outsourcing, services overriding, custom serialization, resource and configuration providers, etc), which could be situationally helpful when integrating the engine with another systems; check out rest of the guide for more information. Consider investigating the available [configuration options](/ru/guide/configuration.md) as well; some feature may not be described in the guide, but still be handy for integration purposes.

If you feel some engine API or system is lacking in extendability and requiring source code modification in order to integrate, please [contact the developer](/ru/support/#developer-support) — we'll consider improving it.

## Example Project

An example project with Naninovel used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode is [available on GitHub](https://github.com/Elringus/NaninovelIntegrationExample). You can [clone the repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) with a Git client or [download it as a zip archive](https://github.com/Elringus/NaninovelIntegrationExample/archive/master.zip).

::: warn
Naninovel package is not distributed with the project, hence compilation errors will be produced after opening it for the first time; import Naninovel from the Asset Store to resolve the issues.
:::

All the project-specific (example) scripts are stored at `Assets/Runtime` folder.

Naninovel is initialized manually (auto initialization is disabled in the engine configuration menu) via `Runtime/SetupGame.cs` script attached to `SetupGame` game object located on `MainScene` scene.

`Runtime/DialogueTrigger.cs` script used as component on triggers perform switch to dialogue mode when player is hitting the trigger colliders.

`Runtime/SwitchToNovelMode.cs` custom command is used to switch to novel mode from both C# and naninovel scripts.

`Runtime/SwitchToAdventureMode.cs` custom command is used to switch to adventure from novel mode.
