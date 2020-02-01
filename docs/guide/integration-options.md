# Integration Options

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system. 

There are multiple ways you can integrate Naninovel with a custom project and specific implementation will depend on the type of the project and what exactly you want to achieve with Naninovel. In the following documentation we'll list various configuration options and API that could be useful for "pairing" Naninovel with a standalone game. Before you continue, consider checking the [engine architecture](/guide/engine-architecture.md) to better understand how the engine behaves on a conceptual level.

*Notice: The engine's asynchronous APIs are built with **UniTask** third-party library. You'll need to install the library to your Unity project to be able to use the async APIs; consult [UniTask extension guide](/guide/unitask.md) for more information.*

## Manual Initialization 
The first thing you'll probably want to change is disable the `Initialize On Application Load` option in the engine configuration menu.

![](https://i.gyazo.com/d7244a998f6fcaba8b440ba8bf527610.png)

When enabled, the engine services will automatically initialize on application start. Unless you want to begin your game in dialogue mode, you would rather manually initialize the engine when it's actually needed. 

Use the static async `RuntimeInitializer.InitializeAsync()` method to initialize the engine at runtime before using any of the built-in service APIs.

You can check whether the engine is currently initialized with `Engine.Initialized` property. Use `Engine.OnInitialized` event to listen for the initialization finished events.

To destroy all the engine services and completely remove Naninovel from memory, use `Engine.Destroy()` static method.

## Playing Naninovel Scripts
To preload and play a naninovel script with a given name, use `PreloadAndPlayAsync(ScriptName)` method of a `IScriptPlayer` service. To get an engine service, use `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of the service to retrieve. For example, the following will get a script player service, then preload and play a script with name "Script001":

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

When exiting the dialogue mode and returning to the main game mode, you probably would like to unload all the resources currently used by Naninovel and stop all the engine services. For this, use `ResetStateAsync()` method of a `IStateManager` service:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetStateAsync();
```

## Disable Title Menu
A built-in title menu implementation will be automatically shown when the engine is initialized, while you'll most likely have your own title menu. You can either modify or completely replace the built-in title menu using [UI customization feature](/guide/user-interface.md#ui-customization) or just disable it by turning off `Show Title UI` toggle in the engine configuration menu.

## Engine Objects Layer
You can set a specific [layer](https://docs.unity3d.com/Manual/Layers.html) for all the objects created by the engine via configuration menu.

![](https://i.gyazo.com/e0dc4b49fcc54b00c78e0114eb55827b.png)

This will also make the engine's camera to use culling mask and render only the objects with the specified layer.

To change the layer of the UI objects managed by the engine, use `Objects Layer` option in the UI configuration menu.

![](https://i.gyazo.com/d518a996d501aaa9c5b3f50f6c07fdbc.png)

## Render to Texture
You can make the engine's camera render to a custom [render texture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) instead of the screen (and change other camera-related settings) by assigning a custom camera prefab in the camera configuration.

![](https://i.gyazo.com/f41858f82464a98150c9cb52a6b6222c.png)

## Integration Example
The following video shows a basic way to integrate Naninovel with Unity's 3D Game Kit project and use it as a drop-in dialogue system.

*Be aware, that the video was created with a previous version of the engine and some of the steps may not reflect how things currently work. We'll update the video after the stable release, but you can still use the current one to get a grasp on how the integration could be implemented on a conceptual level.*

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/5h3-xnbyphk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Example Project

The sources of the project shown in the video are available on [GitHub](https://github.com/Elringus/NaninovelIntegrationExample).
