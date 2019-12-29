# Engine Services

Most of the engine features are implemented via engine services. Engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing naninovel scripts, managing actors or saving-loading the game state.

In case you wish to interact with an engine system, you'll most likely want to use an engine service. You can get a reference to an engine service using `Engine.GetService<TService>()` static method, where `TService` is the interface of the service you wish to get; e.g., to get a `IScriptPlayer` service:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

The following services are currently available:

Service Interface | Description
--- | ---
IBackgroundManager | Manages [background](/guide/backgrounds.md) actors.
ICharacterManager | Manages [character](/guide/characters.md) actors.
IChoiceHandlerManager | Manages [choice handler](/guide/choices.md) actors.
ITextPrinterManager | Manages [text printer](/guide/text-printers.md) actors.
IAudioManager | Manages the audio: [SFX](/guide/sound-effects.md), [BGM](/guide/background-music.md) and [voicing](/guide/voicing.md).
IInputManager | Manages the user [input processing](/guide/input-processing.md).
ILocalizationManager| Manages the [localization](/guide/localization.md) activities.
ITextManager | Handles [managed text](/guide/managed-text.md) feature.
IMoviePlayer | Handles [movie](/guide/movies.md) playing.
IScriptManager | Manages [naninovel script](/guide/naninovel-scripts.md) resources.
IScriptPlayer | Handles [naninovel scripts](/guide/naninovel-scripts.md) execution.
ICameraManager | Manages cameras and other systems required for scene rendering.
IResourceProviderManager | Manages `IResourceProvider` objects.
IStateManager | Handles `IEngineService`-related persistent data de-/serialization; provides API to [save and load](/guide/save-load-system.md) game state.
IUIManager | Manages `IManagedUI` objects and handles [UI customization](/guide/ui-customization.md) feature.
ICustomVariableManager | Provides access and allows modifying [custom variables](/guide/custom-variables.md). 
ISpawnManager | Manages objects spawned with [`@spawn`](/api/#spawn) and [`@fx`](/api/#fx) commands.
IUnlockableManager | Manages [unlockable items](/guide/unlockable-items.md) (CG and movie gallery items, tips, etc).

You can find built-in implementations of the services in the runtime source code stored at `Naninovel/Runtime`.

The services are referenced via interfaces in the engine source code, making it possible to swap any of them with a custom implementation. For this, create your own implementation(s) and manually initialize the engine via `Engine.Initialize(List<IEngineService>)` (don't forget to disable auto initialization in the engine configuration menu) providing list of services you want to use. See `Naninovel/Runtime/Engine/RuntimeInitializer.cs` for a reference on how to initialize the engine.