# Integration Options
While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system. 

There are multiple ways you can integrate Naninovel with a custom project and specific implementation will depend on the type of the project and what exactly you want to achieve with Naninovel. In the following documentation we'll list various configuration options and API that could be useful for "pairing" Naninovel with a standalone game. Before you continue, consider checking the [engine architecture](/guide/engine-architecture.md) to better understand how the engine behaves on a conceptual level.

## Manual Initialization 
The first thing you'll probably want to change is disable the `Initialize On Application Load` option in the engine configuration menu.

![](https://i.gyazo.com/d7244a998f6fcaba8b440ba8bf527610.png)

When enabled, the engine services will automatically initialize on application start. Unless you want to begin your game in dialogue mode, you would rather manually initialize the engine when it's actually needed. 

Use the static async `RuntimeInitializer.InitializeAsync()` method to initialize the engine at runtime before using any of the built-in service APIs.

You can check whether the engine is currently initialized with `Engine.IsInitialized` property. Use `Engine.OnInitialized` event to listen for the initialization finished events.

To destroy all the engine services and completely remove Naninovel from memory, use `Engine.Destroy()` static method.

## Playing Novel Scripts
To preload and play a novel script with a given name, use `PreloadAndPlayAsync(ScriptName)` method of the `NovelScriptPlayer` service. To get an engine service, use `Engine.GetService<TService>()` static method, where `TService` is the type of the service to retrieve. For example, the following will get the player service, then preload and play a novel script with name "Script001":

```csharp
var player = Engine.GetService<NovelScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

When exiting the dialogue mode and returning to the main game mode, you probably would like to unload all the resources currently used by Naninovel and stop all the engine services. For this, use `LoadDefaultEngineStateAsync()` method of the `StateManager` service:

```csharp
var stateManager = Engine.GetService<StateManager>();
await stateManager.LoadDefaultEngineStateAsync();
```

## Disable Title Menu
A built-in title menu implementation will be automatically shown when the engine is initialized, while you'll most likely have your own title menu. You can either modify or completely replace the built-in title menu using [UI customization feature](/guide/ui-customization.md) or just disable it by turning off `Show Title UI` toggle in the engine configuration menu.

## Engine Objects Layer
You can set a specific [layer](https://docs.unity3d.com/Manual/Layers.html) for all the objects created by the engine via configuration menu.

![](https://i.gyazo.com/e0dc4b49fcc54b00c78e0114eb55827b.png)

This will also make the engine's camera to use culling mask and render only the objects with the specified layer.

To change the layer of the UI objects managed by the engine, use `Objects Layer` option in the UI configuration menu.

![](https://i.gyazo.com/d518a996d501aaa9c5b3f50f6c07fdbc.png)

## Render to Texture
You can make the engine's camera render to a custom [render texture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) instead of the screen using `Render Texture` setting in the camera configuration.

![](https://i.gyazo.com/51c866f1d5c62e34a86b9c09f0c47a48.png)

## Integration Example
The following video shows a basic way to integrate Naninovel with Unity's 3D Game Kit project and use it as a drop-in dialogue system.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/5h3-xnbyphk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

You can find the sources of the project shown in the video on [GitHub](https://github.com/Elringus/NaninovelIntegrationExample).
