# Engine Services

Most of the engine features are implemented via engine services. Engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing novel scripts, managing actors or saving-loading the game state.

In case you wish to interact with engine system, you'll most likely want to use an engine service. You can get a reference to an engine service using `Naninovel.Engine.GetService<TService>()` static method, where `TService` is the type of service you wish to reference; e.g., to get a `NovelScriptPlayer` service:

```csharp
var player = Naninovel.Engine.GetService<NovelScriptPlayer>();
player.Stop();
```

The following services are currently available:

Service Type | Description
--- | ---
BackgroundManager | Manages [background](/guide/backgrounds.md) actors.
CharacterManager | Manages [character](/guide/characters.md) actors.
ChoiceHandlerManager | Manages [choice handler](/guide/choices.md) actors.
TextPrinterManager | Manages [text printer](/guide/text-printers.md) actors.
AudioManager | Manages the audio: [SFX](/guide/sound-effects.md), [BGM](/guide/background-music.md) and [voicing](/guide/voicing.md).
InputManager | Manages the user [input processing](/guide/input-processing.md).
LocalizationManager| Manages the [localization](/guide/localization.md) activities.
TextManager | Handles [managed text](/guide/managed-text.md) feature.
MoviePlayer | Handles [movie](/guide/movies.md) playing.
NovelScriptManager | Manages [novel script](/guide/novel-scripts.md) resources.
NovelScriptPlayer | Handles [novel scripts](/guide/novel-scripts.md) execution.
CameraManager | Manages cameras and other systems required for scene rendering.
ResourceProviderManager | Manages `IResourceProvider` objects.
StateManager | Handles `IEngineService`-related persistent data de-/serialization; provides API to [save and load](/guide/save-load-system.md) game state.
UIManager | Manages `IManagedUI` objects and handles [UI customization](/guide/ui-customization.md) feature.
CustomVariableManager | Provides access and allows modifying [custom variables](/guide/custom-variables.md). 
UnlockableManager | Manages [unlockable items](/guide/unlockable-items.md) (CG and movie gallery items, tips, etc).

