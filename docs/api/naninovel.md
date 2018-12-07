---
sidebar: auto
---

# Naninovel

## ActionScriptLine

#### Summary
A `Naninovel.NovelScript` line representing a single `Naninovel.Actions.NovelAction`.
```csharp
public class Naninovel.ActionScriptLine
    : NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActionName | Name or tag of the action (string between `Naninovel.ActionScriptLine.IdentifierLiteral` and white space). Case-insensitive. | 
| `LiteralMap<String>` | ActionParameters | Parameters of the action represented by [paramater name] -&gt; [value] map. Keys are case-insensitive. | 
| `Int32` | InlineIndex | In cases when inlined to a `Naninovel.GenericTextScriptLine`, represents index among other inlined action lines.  Will return zero if not inlined. | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | AssignLiteral | Literal used to assign paramer values to their names. | 
| `String` | IdentifierLiteral | Literal used to identify this type of lines. | 


## AnimatorBackground

#### Summary
A `Naninovel.IBackgroundActor` implementation using `UnityEngine.Animator` to represent an actor.
#### Remarks
This implementation can't be used as a main background; in scripts, always specify name to reference animated backgrounds.  Prefab with the actor name should have an `UnityEngine.Animator` component attached to the root object.  All the apperance changes are handled by invoking a `UnityEngine.Animator.SetTrigger(System.String)` with the apperance name as the trigger name.
```csharp
public class Naninovel.AnimatorBackground
    : MonoBehaviourActor, INovelActor, IDisposable, IBackgroundActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Animator` | Animator |  | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration, `Nullable<TransitionType>` transitionType, `Nullable<Vector4>` transitionParams) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## AnimatorCharacter

#### Summary
A `Naninovel.ICharacterActor` implementation using `UnityEngine.Animator` to represent an actor.
#### Remarks
Prefab with the actor name should have an `UnityEngine.Animator` component attached to the root object.  All the apperance changes are handled by invoking a `UnityEngine.Animator.SetTrigger(System.String)` with the apperance name as the trigger name.
```csharp
public class Naninovel.AnimatorCharacter
    : MonoBehaviourActor, INovelActor, IDisposable, ICharacterActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Animator` | Animator |  | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 
| `CharacterLookDirection` | LookDirection |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeLookDirectionAsync(`CharacterLookDirection` lookDirection, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `Quaternion` | LookDirectionToRotation(`CharacterLookDirection` lookDirection) |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetLookDirection(`CharacterLookDirection` lookDirection) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## AudioConfiguration

```csharp
public class Naninovel.AudioConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `ResourceLoaderConfiguration` | AudioLoader |  | 
| `AudioMixer` | AudioMixer |  | 
| `String` | BgmGroupPath |  | 
| `String` | BgmVolumeHandleName |  | 
| `Boolean` | EnableAutoVoicing |  | 
| `String` | MasterVolumeHandleName |  | 
| `String` | SfxGroupPath |  | 
| `String` | SfxVolumeHandleName |  | 
| `String` | VoiceGroupPath |  | 
| `ResourceLoaderConfiguration` | VoiceLoader |  | 
| `String` | VoiceVolumeHandleName |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## AudioLoader

```csharp
public class Naninovel.AudioLoader
    : LocalizableResourceLoader<AudioClip>

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task<AudioClip>` | LoadAsync(`String` path, `Boolean` isFullPath = False) |  | 


## AudioManager

```csharp
public class Naninovel.AudioManager
    : IStatefulService<SettingsState>, IEngineService, IStatefulService<GameState>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AutoVoicingEnabled |  | 
| `Boolean` | BgmGroupAvailable |  | 
| `Single` | BgmVolume |  | 
| `Single` | MasterVolume |  | 
| `Boolean` | SfxGroupAvailable |  | 
| `Single` | SfxVolume |  | 
| `Boolean` | VoiceGroupAvailable |  | 
| `Single` | VoiceVolume |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `ClipState` | GetBgmState() |  | 
| `List<ClipState>` | GetSfxState() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | LoadServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | LoadServiceStateAsync(`GameState` engineGameState) |  | 
| `Task` | PlayBgmAsync(`String` path, `Single` fadeTime = 0, `Boolean` loop = True) |  | 
| `Task` | PlaySfxAsync(`String` path, `Single` volume = 1, `Boolean` loop = False) |  | 
| `Task` | PlayVoiceAsync(`String` path, `Single` volume = 1) |  | 
| `Task` | PreloadAudioAsync(`String` path) |  | 
| `Task` | PreloadVoiceAsync(`String` path) |  | 
| `void` | ResetService() |  | 
| `Task` | SaveServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | SaveServiceStateAsync(`GameState` engineGameState) |  | 
| `void` | StopBgm(`Single` fadeTime = 0) |  | 
| `void` | StopSfx(`String` path, `Single` fadeTime = 0) |  | 
| `void` | StopVoice() |  | 
| `Task` | UnloadAudioAsync(`String` path) |  | 
| `Task` | UnloadVoiceAsync(`String` path) |  | 


## BackgroundManager

#### Summary
Manages background actors in the ortho mode.
```csharp
public class Naninovel.BackgroundManager
    : OrthoActorManager<IBackgroundActor, BackgroundState>, IStatefulService<GameState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Int32` | TopmostZPosition |  | 
| `Int32` | ZOffset |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `IBackgroundActor` | ConstructActor(`String` actorName) |  | 
| `TMetadata` | GetActorMetadata(`String` backgroundName) |  | 
| `String` | GetMainActorName(`String` backgroundName = null) | Returns name of the main actor for the provided background name (appearance).  Multiple main actors possible when using different implementations simultaneously.  When background name is not provided, returns either first available main actor name or  main name for the default implementation. | 
| `IEnumerable<IBackgroundActor>` | GetMainActors() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | MainNamePrefix |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | GetMainActorNameForImpl() | Returns name of the main actor for the provided background implementation type. | 
| `String` | GetMainActorNameForImpl(`String` implementationTypeFullName) | Returns name of the main actor for the provided background implementation type. | 


## BackgroundsConfiguration

```csharp
public class Naninovel.BackgroundsConfiguration
    : OrthoActorManagerConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `OrthoActorMetadata` | DefaultMetadata |  | 
| `Map` | Metadata |  | 
| `Int32` | ZOffset |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## BackgroundState

#### Summary
Represents serializable state of `Naninovel.IBackgroundActor`.
```csharp
public class Naninovel.BackgroundState
    : NovelActorState<IBackgroundActor>

```

## BacklogMessage

```csharp
public class Naninovel.BacklogMessage
    : ScriptableUIBehaviour

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AppendMessage(`String` message) |  | 
| `void` | Awake() |  | 
| `void` | SetMessage(`String` message, `String` actorName) |  | 


## CameraComponent

```csharp
public class Naninovel.CameraComponent
    : MonoBehaviour

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | BurnColors |  | 
| `Boolean` | DodgeColors |  | 
| `Single` | GlitchFrequency |  | 
| `Texture` | GlitchTexture |  | 
| `Single` | Intensity |  | 
| `Boolean` | PerformColorShifting |  | 
| `Boolean` | PerformScreenShifting |  | 
| `Boolean` | PerformUVShifting |  | 
| `Boolean` | RandomGlitchFrequency |  | 
| `Shader` | Shader |  | 
| `Single` | ShiftAmount |  | 
| `Color` | TintColor |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Material` | Material |  | 


## CameraConfiguration

```csharp
public class Naninovel.CameraConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Color` | BackgroundColor |  | 
| `Vector3` | InitialPosition |  | 
| `Vector2Int` | ReferenceResolution |  | 
| `Vector2Int` | ThumbnailResolution |  | 


## CharacterLookDirection

```csharp
public enum Naninovel.CharacterLookDirection
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | Center |  | 
| `1` | Left |  | 
| `2` | Right |  | 


## CharacterManager

#### Summary
Manages character actors in the ortho mode.
```csharp
public class Naninovel.CharacterManager
    : OrthoActorManager<ICharacterActor, CharacterState>, IStatefulService<GameState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AutoArrangeOnAdd | Whether to perform `Naninovel.CharacterManager.ArrangeCharactersAsync(System.Single)` when adding actors. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ArrangeCharactersAsync(`Single` duration = 0) | Evenly distribute visible controlled characters positions over specified time. | 
| `ICharacterActor` | ConstructActor(`String` actorName) |  | 
| `TMetadata` | GetActorMetadata(`String` actorName) |  | 
| `void` | LookAtOrigin(`ICharacterActor` actor) | Makes the character to look at the scene origin point. | 


## CharactersConfiguration

```csharp
public class Naninovel.CharactersConfiguration
    : OrthoActorManagerConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AutoArrangeOnAdd |  | 
| `OrthoActorMetadata` | DefaultMetadata |  | 
| `Map` | Metadata |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## CharacterState

#### Summary
Represents serializable state of `Naninovel.ICharacterActor`.
```csharp
public class Naninovel.CharacterState
    : NovelActorState<ICharacterActor>

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `CharacterLookDirection` | LookDirection |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyToActor(`ICharacterActor` actor) |  | 
| `void` | OverwriteFromActor(`ICharacterActor` actor) |  | 


## ChoiceHandlerManager

#### Summary
Manages choice handler actors.
```csharp
public class Naninovel.ChoiceHandlerManager
    : NovelActorManager<IChoiceHandlerActor, ChoiceHandlerState>, IStatefulService<GameState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefaultHandlerName |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `IChoiceHandlerActor` | GetActiveHandlerOrDefault() | Returns currently active handler; will create and return `Naninovel.ChoiceHandlerManager.DefaultHandlerName` if none. | 
| `TMetadata` | GetActorMetadata(`String` actorName) |  | 
| `IChoiceHandlerActor` | SetActiveHandler(`String` name) | Selects choice handler with provided name as active.  Will de-activate any other handlers on scene.  Will add new actor with provided name if it doesn't exist. | 


## ChoiceHandlersConfiguration

```csharp
public class Naninovel.ChoiceHandlersConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `ChoiceHandler` | ButtonListChoiceHandlerPrefab |  | 
| `String` | DefaultActorName |  | 
| `NovelActorMetadata` | DefaultMetadata |  | 
| `Map` | Metadata |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## ChoiceHandlerState

#### Summary
Represents serializable state of a `Naninovel.IChoiceHandlerActor`.
```csharp
public class Naninovel.ChoiceHandlerState
    : NovelActorState<IChoiceHandlerActor>

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<ChoiceState>` | Choices |  | 
| `Boolean` | IsHandlerActive |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyToActor(`IChoiceHandlerActor` actor) |  | 
| `void` | OverwriteFromActor(`IChoiceHandlerActor` actor) |  | 


## ChoiceState

#### Summary
Represents serializable state of a choice in `Naninovel.ChoiceHandlerState`.
```csharp
public class Naninovel.ChoiceState

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | GotoLabel | The choice will lead to label with the specified name. | 
| `String` | GotoScript | The choice will load script with the specified name. | 
| `String` | Summary | Text describing consequences of this choice. | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Id | GUID of the state instance. | 


## CommentScriptLine

#### Summary
A `Naninovel.NovelScript` line representing a commentary left by the author of the script.
```csharp
public class Naninovel.CommentScriptLine
    : NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | CommentText | Text contents of the commentary (trimmed string after the `;` symbol). | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | IdentifierLiteral | Literal used to identify this type of lines. | 


## ConsoleCommands

```csharp
public static class Naninovel.ConsoleCommands

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Play() |  | 
| `void` | PurgeCache() |  | 
| `void` | Rewind(`Int32` line) |  | 
| `void` | Stop() |  | 
| `void` | ToggleDebugInfo() |  | 
| `void` | ToggleScriptNavigator() |  | 


## CustomVariableManager

#### Summary
Manages variables set by user in the novel scripts.
```csharp
public class Naninovel.CustomVariableManager
    : IStatefulService<GlobalState>, IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `String` | GetVariable(`String` name) | Attempts to retrive value of a variable with the provided name. Variable names are case-insensitive.  When no variables of the provided name are found will return null. | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | LoadServiceStateAsync(`GlobalState` state) |  | 
| `void` | ResetService() |  | 
| `Task` | SaveServiceStateAsync(`GlobalState` state) |  | 
| `void` | SetVariable(`String` name, `String` value) | Sets value of a variable with the provided name. Variable names are case-insensitive.  When no variables of the provided name are found, will add a new one and assign the value. | 


## DefaultUI

#### Summary
Contains references to the default UI implementation prefabs.
```csharp
public class Naninovel.DefaultUI
    : ScriptableObject

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<GameObject>` | GetUnique(`IEnumerable<IManagedUI>` existingUIs) |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ResourcePath |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<Type>` | &lt;GetUnique&gt;g__GetImplementation|3_0(`Type` type) |  | 
| `DefaultUI` | LoadFromResources() |  | 


## DefineScriptLine

#### Summary
A `Naninovel.NovelScript` line representing a define expression.
```csharp
public class Naninovel.DefineScriptLine
    : NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefineKey | Key of the define expression (string between the `&gt;` symbol and white space). | 
| `String` | DefineValue | Value of the define expression (trimmed string after the `Naninovel.DefineScriptLine.DefineKey`). | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ReplaceDefines(`String` lineText, `LiteralMap<String>` defines) |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | IdentifierLiteral | Literal used to identify this type of lines. | 


## DicedSpriteCharacter

#### Summary
A `Naninovel.ICharacterActor` implementation using `SpriteDicing.DicedSpriteRenderer` to represent an actor.
```csharp
public class Naninovel.DicedSpriteCharacter
    : MonoBehaviourActor, INovelActor, IDisposable, ICharacterActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `DicedSpriteRenderer` | DicedSpriteRenderer |  | 
| `Boolean` | IsVisible |  | 
| `CharacterLookDirection` | LookDirection |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | BuildAppearanceResourcePath(`String` appearance) | By default, all the appearance diced sprites are stored in one atlas of actor's name. | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeLookDirectionAsync(`CharacterLookDirection` lookDirection, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `CharacterLookDirection` | GetLookDirection() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetLookDirection(`CharacterLookDirection` lookDirection) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## Engine

#### Summary
Class responsible for management of systems critical to the engine.
```csharp
public static class Naninovel.Engine

```

#### Static Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEngineBehaviour` | Behaviour |  | 
| `Boolean` | IsInitialized |  | 
| `Boolean` | IsInitializing |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `GameObject` | CreateObject(`String` name = null, `Type[]` components) | Creates a new `UnityEngine.GameObject`, making it a child of the engine object and (optionally) adding provided components. | 
| `T` | CreateObject(`String` name = null) | Creates a new `UnityEngine.GameObject`, making it a child of the engine object and (optionally) adding provided components. | 
| `void` | Destroy() | Deconstructs all the engine services and stops the behaviour. | 
| `List<TService>` | GetAllServices(`Predicate<TService>` predicate = null, `Boolean` assertResult = True) | Resolves all the matching `Naninovel.IEngineService` objects from the services list. | 
| `TService` | GetService(`Predicate<TService>` predicate = null, `Boolean` assertResult = True) | Resolves a `Naninovel.IEngineService` object from the services list. | 
| `Task` | InitializeAsync(`IEngineBehaviour` behaviour, `List<IEngineService>` services) | Initializes engine behaviour and services.  Services will be initialized in the order in which they were added to the list. | 
| `T` | Instantiate(`T` obj, `String` name = null) | Invokes `UnityEngine.Object.Instantiate(UnityEngine.Object)` and adds the object as child of the engine object. | 
| `void` | Reset() | Resets state of all the engine services. | 


#### Static Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnInitialized |  | 


## EngineConfiguration

#### Summary
Represents configuration data for `Naninovel.Engine`.
```csharp
public class Naninovel.EngineConfiguration
    : ScriptableObject

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `ScriptableUIBehaviour` | InitializationUI |  | 
| `Boolean` | InitializeOnApplicationLoad |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ResourcePath |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `EngineConfiguration` | LoadFromResources() |  | 


## EngineVersion

#### Summary
Stores engine version and build number.
```csharp
public class Naninovel.EngineVersion
    : ScriptableObject

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Build |  | 
| `String` | Version |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | UpdateMenu() |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `EngineVersion` | LoadFromResources() |  | 
| `void` | Update() |  | 


## GameState

#### Summary
Represents serializable session-specific state of the engine services and related data (aka saved game status).
```csharp
public class Naninovel.GameState
    : ServicesStateMap, IDictionary<String, String>, ICollection<KeyValuePair<String, String>>, IEnumerable<KeyValuePair<String, String>>, IEnumerable, IDictionary, ICollection, ISerializationCallbackReceiver, IDeserializationCallback, ISerializable

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `DateTime` | SaveDateTime |  | 
| `Texture2D` | Thumbnail |  | 


## GameStateSlotManager

```csharp
public class Naninovel.GameStateSlotManager
    : StateSlotManager<GameState>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Int32` | QuickSaveSlotLimit |  | 
| `Int32` | SaveSlotLimit |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AnySaveExists() |  | 
| `String` | IndexToQuickSaveSlotId(`Int32` index) |  | 
| `String` | IndexToSaveSlotId(`Int32` index) |  | 
| `Task<IDictionary<String, GameState>>` | LoadAllQuickSaveSlotsAsync() | Slots are provided in [slotId]-&gt;[state] map format; null state represents an `empty` slot. | 
| `Task<IDictionary<String, GameState>>` | LoadAllSaveSlotsAsync() | Slots are provided in [slotId]-&gt;[state] map format; null state represents an `empty` slot. | 
| `void` | ShiftQuickSaveSlots() | Frees first quick save slot by shifting existing ones by one.  Will delete the last slot in case it's out of the limit. | 


## GenericTextScriptLine

#### Summary
A `Naninovel.NovelScript` line representing text to print.  Could contain actor name at the start of the line followed by a column,  and multiple inlined `Naninovel.ActionScriptLine` enclosed in square brackets.
```csharp
public class Naninovel.GenericTextScriptLine
    : NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<ActionScriptLine>` | InlinedActionLines | A list of `Naninovel.ActionScriptLine` inlined in this line. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ReplaceDefines(`String` lineText, `LiteralMap<String>` defines) |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActorNameLiteral | Literal used to declare actor name before the text to print. | 


## GlitchCamera

```csharp
public class Naninovel.GlitchCamera
    : MonoBehaviour, IInitializable, IAwaitable

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Single` | Duration |  | 
| `Single` | Intensity |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | AwaitAsync() |  | 
| `void` | Destroy() |  | 
| `TaskAwaiter<GlitchCamera>` | GetAwaiter() |  | 
| `Camera` | GetCamera() |  | 
| `Task` | GlitchAndDestroyAsync(`Camera` camera) |  | 
| `void` | Initialize(`String[]` parameters) |  | 


## GlobalState

#### Summary
Represents serializable global state of the engine services.
```csharp
public class Naninovel.GlobalState
    : ServicesStateMap, IDictionary<String, String>, ICollection<KeyValuePair<String, String>>, IEnumerable<KeyValuePair<String, String>>, IEnumerable, IDictionary, ICollection, ISerializationCallbackReceiver, IDeserializationCallback, ISerializable

```

## GlobalStateSlotManager

```csharp
public class Naninovel.GlobalStateSlotManager
    : StateSlotManager<GlobalState>

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AnySaveExists() |  | 


## IBackgroundActor

#### Summary
Implementation is able to represent a background actor on scene.
```csharp
public interface Naninovel.IBackgroundActor
    : INovelActor

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration, `Nullable<TransitionType>` transitionType, `Nullable<Vector4>` transitionParams) | Changes background appearance over specified time with specified transition effect. | 


## ICharacterActor

#### Summary
Implementation is able to represent a character actor on scene.
```csharp
public interface Naninovel.ICharacterActor
    : INovelActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `CharacterLookDirection` | LookDirection | Look direction of the actor. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeLookDirectionAsync(`CharacterLookDirection` lookDirection, `Single` duration) | Changes character look direction over specified time. | 


## IChoiceHandlerActor

#### Summary
Implementation is able to represent a choice handler actor on scene.
```csharp
public interface Naninovel.IChoiceHandlerActor
    : INovelActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ChoiceState>` | Choices | Currently added options to choose from. | 
| `Boolean` | IsHandlerActive | Whether the choice handler is active and forces user to select a choice. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChoice(`ChoiceState` choice) | Handler should add an option to choose from. | 
| `void` | RemoveChoice(`String` id) | Handler should remove a choice option with the provided ID. | 


## IEngineBehaviour

```csharp
public interface Naninovel.IEngineBehaviour

```

#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnBehaviourDestroy |  | 
| `Action` | OnBehaviourLateUpdate |  | 
| `Action` | OnBehaviourUpdate |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChildObject(`GameObject` obj) |  | 
| `void` | Destroy() |  | 
| `Coroutine` | StartCoroutine(`IEnumerator` routine) |  | 
| `void` | StopCoroutine(`IEnumerator` routine) |  | 


## IEngineService

#### Summary
Implementation represents an `Naninovel.Engine` service.
```csharp
public interface Naninovel.IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `void` | ResetService() |  | 


## InitializeAtRuntimeAttribute

#### Summary
When applied to a `Naninovel.IEngineService` implementation,  adds the service to the initialization list of `Naninovel.RuntimeInitializer`.
#### Remarks
Requires the implementation to have either a default ctor, or a ctor with the following parameter types:  `Naninovel.ServiceConfiguration`, `Naninovel.IEngineService` or `Naninovel.IEngineBehaviour`.
```csharp
public class Naninovel.InitializeAtRuntimeAttribute
    : Attribute, _Attribute

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Int32` | InitializationPriority |  | 


## INovelActor

#### Summary
Implementation is able to represent an actor on scene.
```csharp
public interface Naninovel.INovelActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance | Appearance of the actor. | 
| `Boolean` | IsVisible | Whether the actor is currently visible on scene. | 
| `String` | Name | Name of the actor. | 
| `Vector3` | Position | Position of the actor. | 
| `Quaternion` | Rotation | Rotation of the actor. | 
| `Vector3` | Scale | Scale of the actor. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) | Changes `Naninovel.INovelActor.Appearance` over specified time. | 
| `Task` | ChangePositionAsync(`Vector3` position, `Single` duration) | Changes `Naninovel.INovelActor.Position` over specified time. | 
| `Task` | ChangeRotationAsync(`Quaternion` rotation, `Single` duration) | Changes `Naninovel.INovelActor.Rotation` over specified time. | 
| `Task` | ChangeScaleAsync(`Vector3` scale, `Single` duration) | Changes `Naninovel.INovelActor.Scale` factor over specified time. | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) | Changes `Naninovel.INovelActor.IsVisible` over specified time. | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) | Loads resources required for specified actor's appearance.  Will load the entire actor resources when appearance is not specified. | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) | Unloads resources required for specified actor's appearance.  Will unload the entire actor resources when appearance is not specified. | 


## InputAxisTrigger

```csharp
public class Naninovel.InputAxisTrigger
    : IEquatable<InputAxisTrigger>

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | AxisName |  | 
| `InputAxisTriggerMode` | TriggerMode |  | 
| `Single` | TriggerTolerance |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | Equals(`Object` obj) |  | 
| `Boolean` | Equals(`InputAxisTrigger` other) |  | 
| `Int32` | GetHashCode() |  | 
| `Nullable<Boolean>` | Sample() | Returns true when changed state from inactive to active since the last sample.  Returns false when changed state from active to inactive since the last sample.  Returns null when activation state hadn't changed since the last sample. | 


## InputAxisTriggerMode

```csharp
public enum Naninovel.InputAxisTriggerMode
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | Both |  | 
| `1` | Positive |  | 
| `2` | Negative |  | 


## InputBinding

```csharp
public class Naninovel.InputBinding

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AlwaysProcess |  | 
| `List<InputAxisTrigger>` | Axes |  | 
| `List<KeyCode>` | Keys |  | 
| `String` | Name |  | 


## InputConfiguration

```csharp
public class Naninovel.InputConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<InputBinding>` | Bindings |  | 
| `Boolean` | SpawnEventSystem |  | 
| `Single` | TouchContinueCooldown |  | 


## InputManager

```csharp
public class Naninovel.InputManager
    : IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `InputSampler` | AutoPlay |  | 
| `InputSampler` | Cancel |  | 
| `InputSampler` | Continue |  | 
| `InputSampler` | ShowBacklog |  | 
| `InputSampler` | Skip |  | 
| `InputSampler` | Submit |  | 
| `InputSampler` | ToggleUI |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddBlockingUI(`IManagedUI` ui) | Provided UI will block input processing when visible. | 
| `void` | DestroyService() |  | 
| `InputSampler` | GetSampler(`String` bindingName) |  | 
| `Task` | InitializeServiceAsync() |  | 
| `void` | RemoveBlockingUI(`IManagedUI` ui) | Provided UI will no longer block input processing when visible. | 
| `void` | ResetService() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | AutoPlayName |  | 
| `String` | CancelName |  | 
| `String` | ContinueName |  | 
| `String` | ShowBacklogName |  | 
| `String` | SkipName |  | 
| `String` | SubmitName |  | 
| `String` | ToggleUIName |  | 


## InputSampler

```csharp
public class Naninovel.InputSampler

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `InputBinding` | Binding | Assigned input binding. | 
| `Boolean` | EndedDuringFrame | Whether input ended activation during current frame. | 
| `Boolean` | IsActive | Whether input is being activated. | 
| `Boolean` | StartedDuringFrame | Whether input started activation during current frame. | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnEnd | Invoked when input activation ended. | 
| `Action` | OnStart | Invoked when input activation started. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddObjectTrigger(`GameObject` obj) | When any of the provided game objects are clicked or touched, input event will trigger. | 
| `CancellationToken` | GetInputEndCancellationToken() | Returned token will be canceled on next input end activation. | 
| `CancellationToken` | GetInputStartCancellationToken() | Returned token will be canceled on next input start activation. | 
| `void` | RemoveObjectTrigger(`GameObject` obj) |  | 
| `void` | SampleInput() |  | 
| `Task<Boolean>` | WaitForInputAsync() | Waits until input starts or ends activation. | 
| `Task` | WaitForInputEndAsync() | Waits until input ends activation. | 
| `Task` | WaitForInputStartAsync() | Waits until input starts activation. | 


## IStatefulService<TState>

#### Summary
Implementation represents a `Naninovel.IEngineService` that has a persistent  state and is able to save/load it using `type`.
```csharp
public interface Naninovel.IStatefulService<TState>
    : IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | LoadServiceStateAsync(`TState` state) |  | 
| `Task` | SaveServiceStateAsync(`TState` state) |  | 


## ITextPrinterActor

#### Summary
Implementation is able to represent a text printer actor on scene.
```csharp
public interface Naninovel.ITextPrinterActor
    : INovelActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActorNameText | The name of the actor to which currently printed text belongs. | 
| `Boolean` | IsPrinterActive | Whether the printer should handle print tasks by default. | 
| `String` | LastPrintedText | Returns text that was printed at the last `Naninovel.ITextPrinterActor.PrintTextAsync(System.String,System.String,System.Threading.CancellationToken[])` invocation. | 
| `Single` | PrintDelay | Delay (in seconds) after each printed text character. Lower the value, faster the printing speed. | 
| `String` | PrintedText | The text which the printer has currently printed. | 
| `List<String>` | RichTextTags | Currently active rich text tags. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AppendText(`String` text) | Adds text to the current output. | 
| `Task` | PrintTextAsync(`String` text, `String` actorName, `CancellationToken[]` cancellationTokens) | Outputs the provided text over time, gradually revealing characters one by one. | 
| `void` | ResetText() | Clears printed text. | 


## LabelScriptLine

#### Summary
A `Naninovel.NovelScript` line representing a text marker used to navigate within the script.
```csharp
public class Naninovel.LabelScriptLine
    : NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText | Text contents of the label (trimmed string after the `Naninovel.LabelScriptLine.IdentifierLiteral`). | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | IdentifierLiteral | Literal used to identify this type of lines. | 


## LanguageTags

```csharp
public static class Naninovel.LanguageTags

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | ContainsLanguage(`String` language) |  | 
| `Boolean` | ContainsTag(`String` languageTag) |  | 
| `IEnumerable<String>` | GetAllLanguages() |  | 
| `IEnumerable<String>` | GetAllTags() |  | 
| `String` | GetLanguageByTag(`String` languageTag) |  | 


## Live2DAppearanceController

```csharp
public class Naninovel.Live2DAppearanceController
    : MonoBehaviour

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | SetAppearance(`String` appearance, `Single` speed = 1) |  | 
| `void` | SetLookDirection(`CharacterLookDirection` lookDirection, `Single` speed = 1) |  | 


## Live2DCharacter

#### Summary
A `Naninovel.ICharacterActor` implementation using a `Live2D.Cubism.Core.CubismModel` to represent an actor.
#### Remarks
Prefab with the actor name should have a `Naninovel.Live2DAppearanceController` components attached to the root object.  All the apperance changes are handled by mapping apperance name to the set of `Live2D.Cubism.Core.CubismParameter` as specified in the `Naninovel.Live2DAppearanceController`.
```csharp
public class Naninovel.Live2DCharacter
    : MonoBehaviourActor, INovelActor, IDisposable, ICharacterActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 
| `Live2DAppearanceController` | Live2DController |  | 
| `CharacterLookDirection` | LookDirection |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeLookDirectionAsync(`CharacterLookDirection` lookDirection, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `Single` | DurationToSpeed(`Single` duration) |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetLookDirection(`CharacterLookDirection` lookDirection) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## LocalizableResourceLoader<TResource>

#### Summary
Allows working with localizable resources.
```csharp
public class Naninovel.LocalizableResourceLoader<TResource>
    : ResourceLoader<TResource>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `LocalizationManager` | LocalizationManager |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `TResource` | Load(`String` path, `Boolean` isFullPath = False) |  | 
| `IEnumerable<Resource<TResource>>` | LoadAll(`String` path = null, `Boolean` isFullPath = False) |  | 
| `Task<IEnumerable<Resource<TResource>>>` | LoadAllAsync(`String` path = null, `Boolean` isFullPath = False) |  | 
| `Task<TResource>` | LoadAsync(`String` path, `Boolean` isFullPath = False) |  | 
| `void` | Unload(`String` path, `Boolean` isFullPath = False) |  | 
| `Task` | UnloadAsync(`String` path, `Boolean` isFullPath = False) |  | 


## LocalizationConfiguration

```csharp
public class Naninovel.LocalizationConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefaultLocale |  | 
| `List<ResourceProviderType>` | ProviderTypes |  | 
| `String` | ResourcesPathPrefix |  | 


## LocalizationManager

```csharp
public class Naninovel.LocalizationManager
    : IStatefulService<SettingsState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<String>` | AvailableLocales |  | 
| `String` | DefaultLocale |  | 
| `String` | SelectedLocale |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChangeLocaleCallback(`Func<Task>` callback) |  | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Boolean` | IsLocaleAvailable(`String` locale) |  | 
| `Boolean` | IsLocalizedResourceAvailable(`String` path) |  | 
| `Task<Boolean>` | IsLocalizedResourceAvailableAsync(`String` path) |  | 
| `Boolean` | IsLocalizedResourceLoaded(`String` path) |  | 
| `Resource<TResource>` | LoadLocalizedResource(`String` path) |  | 
| `Task<Resource<TResource>>` | LoadLocalizedResourceAsync(`String` path) |  | 
| `Task` | LoadServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `void` | RemoveChangeLocaleCallback(`Func<Task>` callback) |  | 
| `void` | ResetService() |  | 
| `Task` | SaveServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | SelectLocaleAsync(`String` locale) |  | 
| `void` | UnloadLocalizedResource(`String` path) |  | 
| `Task` | UnloadLocalizedResourceAsync(`String` path) |  | 


## ManagedText

```csharp
public struct Naninovel.ManagedText
    : IEquatable<ManagedText>

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Category |  | 
| `String` | Comment |  | 
| `String` | FieldId |  | 
| `String` | FieldValue |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | Equals(`Object` obj) |  | 
| `Boolean` | Equals(`ManagedText` other) |  | 
| `Int32` | GetHashCode() |  | 


## ManagedTextAttribute

#### Summary
When applied to a static string field, the field's value will be ovewritten  by the `Naninovel.TextManager` service (during initialization) based on the managed text resource.  The field will also be included to the generated managed text resources.
```csharp
public class Naninovel.ManagedTextAttribute
    : Attribute, _Attribute

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Category | Category of the generated text resource. | 
| `String` | Comment | Commentary to put before the field record in the generated managed text resource. | 


## ManagedTextConfiguration

```csharp
public class Naninovel.ManagedTextConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<ResourceProviderType>` | ProviderTypes |  | 
| `String` | ResourcesPathPrefix |  | 


## ManagedTextSetter

#### Summary
Allows setting `Naninovel.ManagedText` by associating `UnityEngine.GameObject` name and defined managed text fields.  Underscore ("_") chars and casing in the defined field names are ignored.
```csharp
public abstract class Naninovel.ManagedTextSetter
    : MonoBehaviour

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | SetManagedTextValue(`String` value) |  | 
| `void` | Start() |  | 


## ManagedTextUITextSetter

#### Summary
Allows setting `Naninovel.ManagedText` to a `Naninovel.ManagedTextUITextSetter.Text` by associating `UnityEngine.GameObject` name and defined managed text fields.  Underscore ("_") chars and casing in the defined field names are ignored.
```csharp
public abstract class Naninovel.ManagedTextUITextSetter
    : ManagedTextSetter

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Text` | Text |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | SetManagedTextValue(`String` value) |  | 


## ManagedTextUtils

```csharp
public static class Naninovel.ManagedTextUtils

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `ManagedText` | CreateManagedTextFromFieldInfo(`FieldInfo` fieldInfo) | Creates new `Naninovel.ManagedText` from provided `System.Reflection.FieldInfo`.  Field should be static string with `Naninovel.ManagedTextAttribute`. | 
| `HashSet<ManagedText>` | GetManagedTextFromAssembly() | Scans all the static `System.String` fields marked with `Naninovel.ManagedTextAttribute` in the assembly,  transforming them to a `System.Collections.Generic.HashSet`1` of `Naninovel.ManagedText`. | 
| `HashSet<ManagedText>` | GetManagedTextFromScript(`NovelScript` managedTextScript) | Parses provided managed text `Naninovel.NovelScript` resource. | 
| `HashSet<ManagedText>` | GetManagedTextFromType(`Type` type) | Scans all the static `System.String` fields marked with `Naninovel.ManagedTextAttribute` in the type,  transforming them to a `System.Collections.Generic.HashSet`1` of `Naninovel.ManagedText`. | 
| `void` | SetManagedTextValues(`HashSet<ManagedText>` managedTextSet) | Scans entire type system setting static `System.String` field values with  `Naninovel.ManagedTextAttribute` to corresponding values from the provided set. | 


## MonoBehaviourActor

#### Summary
A `Naninovel.INovelActor` implementation using `UnityEngine.MonoBehaviour` to represent an actor.
```csharp
public abstract class Naninovel.MonoBehaviourActor
    : INovelActor, IDisposable

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `ProxyBehaviour` | ActorBehaviour |  | 
| `String` | Appearance |  | 
| `GameObject` | GameObject |  | 
| `Boolean` | IsVisible |  | 
| `String` | Name |  | 
| `Vector3` | Position |  | 
| `Quaternion` | Rotation |  | 
| `Vector3` | Scale |  | 
| `Transform` | Transform |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangePositionAsync(`Vector3` position, `Single` duration) |  | 
| `Task` | ChangeRotationAsync(`Quaternion` rotation, `Single` duration) |  | 
| `Task` | ChangeScaleAsync(`Vector3` scale, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetPosition(`Vector3` position) |  | 
| `void` | SetRotation(`Quaternion` rotation) |  | 
| `void` | SetRotation(`Vector3` rotation) |  | 
| `void` | SetScale(`Vector3` scale) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## MoviePlayer

```csharp
public class Naninovel.MoviePlayer
    : IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Single` | FadeDuration |  | 
| `Texture2D` | FadeTexture |  | 
| `Boolean` | IsPlaying |  | 
| `VideoPlayer` | Player |  | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnMoviePlay |  | 
| `Action` | OnMovieStop |  | 
| `Action<Texture>` | OnMovieTextureReady |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | PlayAsync(`String` movieName) | Plays a movie with the provided name; returns when the playback finishes. | 
| `Task` | PreloadAsync(`String` movieName) |  | 
| `void` | ResetService() |  | 
| `void` | Stop() |  | 
| `Task` | UnloadAsync(`String` movieName) |  | 


## MoviesConfiguration

```csharp
public class Naninovel.MoviesConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `VideoAspectRatio` | AspectRatio |  | 
| `Single` | FadeDuration |  | 
| `Texture2D` | FadeTexture |  | 
| `ResourceLoaderConfiguration` | LoaderConfiguration |  | 
| `Boolean` | SkipFrames |  | 
| `Boolean` | SkipOnInput |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## NovelActorExtensions

```csharp
public static class Naninovel.NovelActorExtensions

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ChangePositionX(this `INovelActor` actor, `Single` posX) |  | 
| `Task` | ChangePositionXAsync(this `INovelActor` actor, `Single` posX, `Single` duration) |  | 
| `void` | ChangePositionY(this `INovelActor` actor, `Single` posY) |  | 
| `Task` | ChangePositionYAsync(this `INovelActor` actor, `Single` posY, `Single` duration) |  | 
| `void` | ChangePositionZ(this `INovelActor` actor, `Single` posZ) |  | 
| `Task` | ChangePositionZAsync(this `INovelActor` actor, `Single` posZ, `Single` duration) |  | 
| `void` | ChangeRotationX(this `INovelActor` actor, `Single` rotX) |  | 
| `Task` | ChangeRotationXAsync(this `INovelActor` actor, `Single` rotX, `Single` duration) |  | 
| `void` | ChangeRotationY(this `INovelActor` actor, `Single` rotY) |  | 
| `Task` | ChangeRotationYAsync(this `INovelActor` actor, `Single` rotY, `Single` duration) |  | 
| `void` | ChangeRotationZ(this `INovelActor` actor, `Single` rotZ) |  | 
| `Task` | ChangeRotationZAsync(this `INovelActor` actor, `Single` rotZ, `Single` duration) |  | 
| `void` | ChangeScaleX(this `INovelActor` actor, `Single` scaleX) |  | 
| `Task` | ChangeScaleXAsync(this `INovelActor` actor, `Single` scaleX, `Single` duration) |  | 
| `void` | ChangeScaleY(this `INovelActor` actor, `Single` scaleY) |  | 
| `Task` | ChangeScaleYAsync(this `INovelActor` actor, `Single` scaleY, `Single` duration) |  | 
| `void` | ChangeScaleZ(this `INovelActor` actor, `Single` scaleZ) |  | 
| `Task` | ChangeScaleZAsync(this `INovelActor` actor, `Single` scaleZ, `Single` duration) |  | 


## NovelActorManager

```csharp
public abstract class Naninovel.NovelActorManager
    : IStatefulService<GameState>, IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | ActorExists(`String` actorName) |  | 
| `INovelActor` | AddActor(`String` actorName) |  | 
| `INovelActor` | AddActor(`NovelActorState` state) |  | 
| `INovelActor` | AddNovelActor(`String` actorName) |  | 
| `void` | DestroyService() |  | 
| `INovelActor` | GetActor(`String` actorName) |  | 
| `TMetadata` | GetActorMetadata(`String` actorName) |  | 
| `NovelActorState` | GetActorState(`String` actorName) |  | 
| `IEnumerable<INovelActor>` | GetAllActors() |  | 
| `IEnumerable<INovelActor>` | GetAllNovelActors() |  | 
| `INovelActor` | GetNovelActor(`String` actorName) |  | 
| `NovelActorState` | GetNovelActorState(`String` actorName) |  | 
| `INovelActor` | GetOrAddActor(`String` actorName) |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | LoadServiceStateAsync(`GameState` engineGameState) |  | 
| `void` | RemoveActor(`String` actorName) |  | 
| `void` | RemoveAllActors() |  | 
| `void` | ResetService() |  | 
| `Task` | SaveServiceStateAsync(`GameState` engineGameState) |  | 


## NovelActorManager<TActor, TState>

```csharp
public abstract class Naninovel.NovelActorManager<TActor, TState>
    : NovelActorManager, IStatefulService<GameState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Dictionary<String, TActor>` | ManagedActors |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | ActorExists(`String` actorName) |  | 
| `TActor` | AddActor(`String` actorName) | Adds a new managed actor with the provided name. | 
| `TActor` | AddActor(`TState` state) | Adds a new managed actor with the provided name. | 
| `INovelActor` | AddActor(`NovelActorState` state) | Adds a new managed actor with the provided name. | 
| `INovelActor` | AddNovelActor(`String` actorName) |  | 
| `TActor` | ConstructActor(`String` actorName) |  | 
| `TActor` | DeserializeActorFromJson(`String` json) |  | 
| `TActor` | GetActor(`String` actorName) |  | 
| `TState` | GetActorState(`String` actorName) |  | 
| `IEnumerable<TActor>` | GetAllActors() |  | 
| `IEnumerable<INovelActor>` | GetAllNovelActors() |  | 
| `INovelActor` | GetNovelActor(`String` actorName) |  | 
| `NovelActorState` | GetNovelActorState(`String` actorName) |  | 
| `TActor` | GetOrAddActor(`String` actorName) | Returns a managed actor with the provided name. If the actor doesn't exist, will add it. | 
| `Task` | LoadServiceStateAsync(`GameState` engineGameState) |  | 
| `void` | RemoveActor(`String` actorName) |  | 
| `void` | RemoveAllActors() |  | 
| `Task` | SaveServiceStateAsync(`GameState` engineGameState) |  | 
| `String` | SerializeActorToJson(`TActor` actor) |  | 


## NovelActorMetadata

#### Summary
Represents data required to construct and initialize a `Naninovel.INovelActor`.
```csharp
public class Naninovel.NovelActorMetadata

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Implementation |  | 
| `ResourceLoaderConfiguration` | LoaderConfiguration |  | 


## NovelActorState

#### Summary
Represents serializable state of a `Naninovel.INovelActor`.
```csharp
public abstract class Naninovel.NovelActorState

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 
| `String` | Name |  | 
| `Vector3` | Position |  | 
| `Quaternion` | Rotation |  | 
| `Vector3` | Scale |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyToActor(`INovelActor` actor) |  | 
| `void` | OverwriteFromActor(`INovelActor` actor) |  | 
| `void` | OverwriteFromJson(`String` json) |  | 
| `String` | ToJson() |  | 


## NovelActorState<TActor>

```csharp
public abstract class Naninovel.NovelActorState<TActor>
    : NovelActorState

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyToActor(`TActor` actor) |  | 
| `void` | ApplyToActor(`INovelActor` actor) |  | 
| `void` | OverwriteFromActor(`TActor` actor) |  | 
| `void` | OverwriteFromActor(`INovelActor` actor) |  | 


## NovelScript

#### Summary
Representation of a text file used to author novel script flow.
```csharp
public class Naninovel.NovelScript

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ActionScriptLine>` | ActionLines |  | 
| `IEnumerable<CommentScriptLine>` | CommentLines |  | 
| `IEnumerable<DefineScriptLine>` | DefineLines |  | 
| `IEnumerable<GenericTextScriptLine>` | GenericTextLines |  | 
| `IEnumerable<LabelScriptLine>` | LabelLines |  | 
| `List<NovelScriptLine>` | Lines |  | 
| `String` | Name |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<ActionScriptLine>` | CollectAllActionLines() | Returns list of all the `Naninovel.ActionScriptLine`, including the ones inlined in `Naninovel.GenericTextScriptLine`.  The order of the actions will be retained. | 
| `Int32` | CountActionAtLine(`Int32` lineIndex) | Returns number of `Naninovel.ActionScriptLine` at the provided line index. | 
| `String` | GetCommentForLine(`Int32` lineIndex) | Returns `Naninovel.CommentScriptLine.CommentText` of the `Naninovel.CommentScriptLine` located before line with the provided index. | 
| `Int32` | GetLineIndexForLabel(`String` label) |  | 
| `Boolean` | IsActionFinalAtLine(`Int32` lineIndex, `Int32` inlineIndex) | Checks whether provided inline index of a `Naninovel.ActionScriptLine` is last at the provided line index. | 
| `Boolean` | IsActionIndexValid(`Int32` lineIndex, `Int32` inlineIndex) | Checks whether a `Naninovel.ActionScriptLine` exists at the provided indexes. | 
| `Boolean` | IsLineIndexValid(`Int32` lineIndex) |  | 
| `Boolean` | LabelExists(`String` label) |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Type` | ResolveLineType(`String` lineText) |  | 


## NovelScriptLine

#### Summary
Represents a single line in a `Naninovel.NovelScript`.
```csharp
public abstract class Naninovel.NovelScriptLine

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ContentHash | Represents persistent hash code of the script line content in hex format. | 
| `Int32` | LineIndex | Index of the line in novel script. | 
| `String` | ParseErrorMessage | A generic log message used when parsing fails. | 
| `String` | ScriptName | Name of the novel script to which the line belongs. | 
| `String` | Text | Text representation of the line. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ReplaceDefines(`String` lineText, `LiteralMap<String>` defines) | Replaces all occurences of replace defined expressions in the provided string with the provided values. | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ReplaceIdentifier | Literal used to identify replace defined expressions. | 


## NovelScriptLoader

```csharp
public class Naninovel.NovelScriptLoader
    : LocalizableResourceLoader<TextAsset>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Dictionary<String, NovelScript>` | LoadedScripts |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `NovelScript` | GetLoaded(`String` path, `Boolean` isFullPath = False) |  | 
| `Boolean` | IsLoaded(`String` path, `Boolean` isFullPath = False) |  | 
| `Task<IEnumerable<NovelScript>>` | LoadAllAsync(`String` path = null, `Boolean` isFullPath = False) |  | 
| `Task<NovelScript>` | LoadAsync(`String` path, `Boolean` isFullPath = False) |  | 
| `void` | Unload(`String` path, `Boolean` isFullPath = False) |  | 
| `void` | UnloadAll() |  | 
| `Task` | UnloadAllAsync() |  | 
| `Task` | UnloadAsync(`String` path, `Boolean` isFullPath = False) |  | 


## NovelScriptLocalization

#### Summary
Collection of utils to work with `Naninovel.NovelScript` localization.
#### Remarks
Localization script format:  # {source line content hash in hex}  ; Commentary with the original line's path and content.  @action1  @action2  ...
```csharp
public static class Naninovel.NovelScriptLocalization

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Dictionary<String, List<String>>` | GenerateLocalizationTerms(`NovelScript` localizationScript) | Groups lines from the localization script to [content hash] -&gt; [line text] map. | 
| `void` | LocalizeScript(`NovelScript` sourceScript, `NovelScript` localizationScript) | Replaces lines of the `` with the lines from ``,  that have equal `Naninovel.NovelScriptLine.ContentHash`. | 


## NovelScriptManager

#### Summary
Manages `Naninovel.NovelScript` resources.
```csharp
public class Naninovel.NovelScriptManager
    : IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | IsLoadingScripts |  | 
| `Boolean` | IsNavigatorAvailable |  | 
| `Boolean` | IsNavigatorVisible |  | 
| `String` | StartGameScriptName |  | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnScriptLoadCompleted |  | 
| `Action` | OnScriptLoadStarted |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `void` | HideNavigator() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task<IEnumerable<NovelScript>>` | LoadAllScriptsAsync() |  | 
| `Task<NovelScript>` | LoadScriptAsync(`String` name) |  | 
| `Task` | ReloadAllScriptsAsync() |  | 
| `void` | ResetService() |  | 
| `void` | ShowNavigator() |  | 
| `void` | ToggleNavigator() |  | 
| `Task` | UnloadAllScriptsAsync() |  | 


## NovelScriptPlayer

```csharp
public class Naninovel.NovelScriptPlayer
    : IStatefulService<SettingsState>, IEngineService, IStatefulService<GlobalState>, IStatefulService<GameState>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | IsAutoPlayActive | Whether auto play mode is currently active. | 
| `Boolean` | IsPlaying | Whether the player is currently playing a script. | 
| `Boolean` | IsSkipActive | Whether skip mode is currently active. | 
| `Boolean` | IsWaitingForInput | Whether user input is required to execute next script action. | 
| `NovelAction` | PlayedAction | Currently played action. | 
| `NovelScript` | PlayedScript | Currently played script. | 
| `PlayerSkipMode` | SkipMode | Skip mode to use while `Naninovel.NovelScriptPlayer.IsSkipActive`. | 
| `Boolean` | SkipNextWaitForInput | Whether to ignore next `Naninovel.NovelScriptPlayer.EnableWaitingForInput`. | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action<Boolean>` | OnAutoPlay | Event invoked when auto play mode changes. | 
| `Action` | OnPlay | Event invoked when player starts playing a script. | 
| `Action<Boolean>` | OnSkip | Event invoked when skip mode changes. | 
| `Action` | OnStop | Event invoked when player stops playing a script. | 
| `Action<Boolean>` | OnWaitingForInput | Event invoked when waiting for input mode changes. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `void` | DisableAutoPlay() |  | 
| `void` | DisableSkip() | Disables `Naninovel.NovelScriptPlayer.IsSkipActive`. | 
| `void` | DisableWaitingForInput() |  | 
| `void` | EnableAutoPlay() |  | 
| `void` | EnableSkip() | Enables `Naninovel.NovelScriptPlayer.IsSkipActive` when `Naninovel.NovelScriptPlayer.IsSkipAllowed`. | 
| `void` | EnableWaitingForInput() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Boolean` | IsSkipAllowed() | Checks whether `Naninovel.NovelScriptPlayer.IsSkipActive` can be enabled at the moment.  Result depends on `Naninovel.PlayerSkipMode` and currently played action. | 
| `Task` | LoadServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | LoadServiceStateAsync(`GlobalState` engineGlobalState) |  | 
| `Task` | LoadServiceStateAsync(`GameState` engineGameState) |  | 
| `void` | Play() | Starts `Naninovel.NovelScriptPlayer.PlayedScript` playback at `Naninovel.NovelScriptPlayer.playedIndex`. | 
| `void` | Play(`NovelScript` script, `Int32` startLineIndex = 0, `Int32` startInlineIndex = 0) | Starts `Naninovel.NovelScriptPlayer.PlayedScript` playback at `Naninovel.NovelScriptPlayer.playedIndex`. | 
| `void` | Play(`NovelScript` script, `String` label) | Starts `Naninovel.NovelScriptPlayer.PlayedScript` playback at `Naninovel.NovelScriptPlayer.playedIndex`. | 
| `Task` | PreloadAndPlayAsync(`NovelScript` script, `Int32` startLineIndex = 0, `Int32` startInlineIndex = 0, `String` label = null) | Preloads the script's actions and starts playing. | 
| `Task` | PreloadAndPlayAsync(`String` scriptName, `Int32` startLineIndex = 0, `Int32` startInlineIndex = 0, `String` label = null) | Preloads the script's actions and starts playing. | 
| `void` | ResetService() |  | 
| `Task<Boolean>` | RewindAsync(`Int32` lineIndex, `Int32` inlineIndex = 0) | Depending on the provided `` being before or after currently played action' line index,  performs a fast-forward or fast-backward playback of the currently loaded script. | 
| `Task` | SaveServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | SaveServiceStateAsync(`GlobalState` engineGlobalState) |  | 
| `Task` | SaveServiceStateAsync(`GameState` engineGameState) |  | 
| `void` | SelectNext() | Attempts to select next action in the current playlist. | 
| `void` | SelectPrevious() | Attempts to select previous action in the current playlist. | 
| `void` | Stop() | Halts the playback of the currently played script. | 
| `void` | ToggleAutoPlay() |  | 


## NovelScriptPlaylist

#### Summary
Represents a list of `Naninovel.Actions.NovelAction` based on the contents of a `Naninovel.NovelScript`.
```csharp
public class Naninovel.NovelScriptPlaylist
    : List<NovelAction>, IList<NovelAction>, ICollection<NovelAction>, IEnumerable<NovelAction>, IEnumerable, IList, ICollection, IReadOnlyList<NovelAction>, IReadOnlyCollection<NovelAction>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ScriptName |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `NovelAction` | GetActionByIndex(`Int32` actionIndex) | Returns a `Naninovel.Actions.NovelAction` at the provided index; null if not found. | 
| `NovelAction` | GetActionByLine(`Int32` lineIndex, `Int32` inlineIndex) | Finds a `Naninovel.Actions.NovelAction` that was created from a `Naninovel.ActionScriptLine` with provided line and inline indexes. | 
| `NovelAction` | GetFirstActionAfterLine(`Int32` lineIndex, `Int32` inlineIndex) | Finds a `Naninovel.Actions.NovelAction` that was created from a `Naninovel.ActionScriptLine` located at or after provided line and inline indexes. | 
| `Task` | PreloadActionsAsync(`Int32` startActionIndex = 0) | Preloads resources required to execute `Naninovel.Actions.NovelAction.IPreloadable` actions. | 
| `Task` | UnloadActionsAsync() | Unloads resources loaded with `Naninovel.NovelScriptPlaylist.PreloadActionsAsync(System.Int32)`. | 


## NovelSpriteRenderer

```csharp
public class Naninovel.NovelSpriteRenderer
    : MonoBehaviour

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | FlipX |  | 
| `Boolean` | FlipY |  | 
| `Texture` | MainTexture |  | 
| `Single` | Opacity |  | 
| `Vector2` | Pivot |  | 
| `Int32` | PixelsPerUnit |  | 
| `Vector2` | RandomSeed |  | 
| `Color` | TintColor |  | 
| `Vector4` | TransitionParams |  | 
| `Single` | TransitionProgress |  | 
| `Texture` | TransitionTexture |  | 
| `TransitionType` | TransitionType |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | FadeInAsync(`Single` duration) |  | 
| `Task` | FadeOutAsync(`Single` duration) |  | 
| `Task` | FadeToAsync(`Single` opacity, `Single` duration) |  | 
| `Task` | TintToAsync(`Color` color, `Single` duration) |  | 
| `Task` | TransitionToAsync(`Texture` texture, `Single` duration, `Boolean` smoothStep = False, `Nullable<TransitionType>` transitionType = null, `Nullable<Vector4>` transitionParams = null) |  | 


## OrthoActorManager<TActor, TState>

#### Summary
Manages actors in the `Naninovel.OrthoCamera` space.
```csharp
public abstract class Naninovel.OrthoActorManager<TActor, TState>
    : NovelActorManager<TActor, TState>, IStatefulService<GameState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Vector2` | GlobalSceneOrigin | Scene origin point position in world space. | 
| `OrthoCamera` | OrthoCamera |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | MoveActorToBottom(`TActor` actor) | Changes provided actor y position so that it's bottom edge is alligned with the bottom of the screen. | 
| `Vector2` | SceneToWorldSpace(`Vector2` scenePosition) | Converts ortho scene space position to world position.  Scene space described as follows: x0y0 is at the bottom left and x1y1 is at the top right corner of the screen. | 


## OrthoActorManagerConfiguration

```csharp
public abstract class Naninovel.OrthoActorManagerConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Vector2` | SceneOrigin |  | 


## OrthoActorMetadata

#### Summary
Represents data required to construct and initialize a `Naninovel.INovelActor`  managed in the `Naninovel.OrthoCamera` space.
```csharp
public class Naninovel.OrthoActorMetadata
    : NovelActorMetadata

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Vector2` | Pivot |  | 
| `Int32` | PixelsPerUnit |  | 


## OrthoCamera

```csharp
public class Naninovel.OrthoCamera
    : IStatefulService<SettingsState>, IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Camera` | Camera |  | 
| `Single` | MaxOrthoSize |  | 
| `Single` | PixelsPerUnit |  | 
| `Single` | ReferenceAspect |  | 
| `Vector2` | ReferenceResolution |  | 
| `Vector2` | ReferenceSize |  | 
| `Int32` | RefreshRate |  | 
| `Boolean` | RenderUILayer |  | 
| `Vector2Int` | Resolution |  | 
| `Int32` | ResolutionIndex |  | 
| `FullScreenMode` | ScreenMode |  | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action<Single>` | OnAspectChanged |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Texture2D` | CaptureThumbnail() |  | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | LoadServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `void` | ResetService() |  | 
| `Task` | SaveServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `void` | SetResolution(`Vector2Int` resolution, `FullScreenMode` screenMode, `Int32` refreshRate) |  | 
| `void` | ToggleRenderUILayer() |  | 


## PlayedScriptRegister

```csharp
public class Naninovel.PlayedScriptRegister

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | IsIndexPlayed(`String` scriptName, `Int32` playlistIndex) |  | 
| `void` | RegisterPlayedIndex(`String` scriptName, `Int32` playlistIndex) |  | 


## PlayerSkipMode

#### Summary
The mode in which `Naninovel.NovelScriptPlayer` should handle actions skipping.
```csharp
public enum Naninovel.PlayerSkipMode
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | ReadOnly | Skip only the actions that has already been executed. | 
| `1` | Everything | Skip all actions. | 


## PrintersConfiguration

```csharp
public class Naninovel.PrintersConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefaultActorName |  | 
| `NovelActorMetadata` | DefaultMetadata |  | 
| `TextPrinter` | DialoguePrinterPrefab |  | 
| `TextPrinter` | FullscreenPrinterPrefab |  | 
| `Single` | MaxPrintDelay |  | 
| `Map` | Metadata |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## ProjectResourceMetadata

#### Summary
Describes a `UnityEngine.Resources` stored in project assets.
```csharp
public class Naninovel.ProjectResourceMetadata

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Path | A relative resource path. | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Guid | Asset GUID of the resource's object.  Can be changed in editor by assigning a valid `Naninovel.ProjectResourceMetadata.Object` property. | 
| `Object` | Object | Resource's object (editor-only, won't be serialized). | 


## ResourceLoaderConfiguration

#### Summary
Represents serializable data used for `UnityCommon.ResourceLoader` construction.
```csharp
public class Naninovel.ResourceLoaderConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | PathPrefix |  | 
| `List<ProjectResourceMetadata>` | PredefinedResources |  | 
| `List<ResourceProviderType>` | ProviderTypes |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddPredefinedResources(`ResourceLoader<TResource>` loader) |  | 
| `ResourceLoader<TResource>` | CreateFor(`ResourceProviderManager` providerManager) |  | 
| `String` | ToString() |  | 


## ResourceProviderConfiguration

```csharp
public class Naninovel.ResourceProviderConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `CachingPolicyType` | GoogleDriveCachingPolicy |  | 
| `Int32` | GoogleDriveRequestLimit |  | 
| `String` | GoogleDriveRootPath |  | 
| `String` | LocalRootPath |  | 
| `Boolean` | LogResourceLoading |  | 


## ResourceProviderManager

#### Summary
Manages `UnityCommon.IResourceProvider` objects.
```csharp
public class Naninovel.ResourceProviderManager
    : IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Single` | AverageLoadProgress |  | 
| `Boolean` | IsAnyLoading |  | 
| `Boolean` | LogResourceLoading |  | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action<Boolean>` | OnLoad |  | 
| `Action<Single>` | OnLoadProgress |  | 
| `Action<String>` | OnProviderMessage |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `IResourceProvider` | GetProvider(`ResourceProviderType` providerType) |  | 
| `List<IResourceProvider>` | GetProviderList(`List<ResourceProviderType>` providerTypes) |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Boolean` | IsProviderInitialized(`ResourceProviderType` providerType) |  | 
| `void` | ResetService() |  | 


## ResourceProviderType

#### Summary
Represents available `UnityCommon.IResourceProvider` types.
```csharp
public enum Naninovel.ResourceProviderType
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | Project |  | 
| `1` | Local |  | 
| `2` | GoogleDrive |  | 


## RuntimeBehaviour

#### Summary
A `Naninovel.IEngineBehaviour` implementation using `UnityEngine.MonoBehaviour` for runtime environment.  Behaviour lifetime is independent of the Unity scenes, but will be destroyed when exiting editor play mode.
```csharp
public class Naninovel.RuntimeBehaviour
    : MonoBehaviour, IEngineBehaviour

```

#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnBehaviourDestroy |  | 
| `Action` | OnBehaviourLateUpdate |  | 
| `Action` | OnBehaviourUpdate |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChildObject(`GameObject` obj) |  | 
| `void` | Destroy() |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `RuntimeBehaviour` | Create() |  | 


## RuntimeInitializer

```csharp
public class Naninovel.RuntimeInitializer
    : MonoBehaviour

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | &lt;InitializeAsync&gt;g__isBehaviour|3_1(`Type` t) |  | 
| `Boolean` | &lt;InitializeAsync&gt;g__isConfig|3_2(`Type` t) |  | 
| `Boolean` | &lt;InitializeAsync&gt;g__isService|3_0(`Type` t) |  | 
| `Task` | InitializeAsync() |  | 


## SceneBackground

#### Summary
A `Naninovel.IBackgroundActor` implementation using `UnityEngine.SceneManagement.Scene` to represent an actor.
#### Remarks
The implementation currently requires scenes to be at `./Assets/Scenes` project folder; resource providers are not supported.  Scenes should be added to the build settings.
```csharp
public class Naninovel.SceneBackground
    : MonoBehaviourActor, INovelActor, IDisposable, IBackgroundActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 
| `NovelSpriteRenderer` | SpriteRenderer |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration, `Nullable<TransitionType>` transitionType, `Nullable<Vector4>` transitionParams) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## ScriptPlayerConfiguration

```csharp
public class Naninovel.ScriptPlayerConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Single` | MinAutoPlayDelay |  | 
| `Single` | SkipTimeScale |  | 


## ScriptsConfiguration

```csharp
public class Naninovel.ScriptsConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | EnableNavigator |  | 
| `ResourceLoaderConfiguration` | Loader |  | 
| `ScriptNavigator` | NavigatorPrefab |  | 
| `Int32` | NavigatorSortOrder |  | 
| `Boolean` | ShowNavigatorOnInit |  | 
| `String` | StartGameScript |  | 


#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders |  | 


## ServiceConfiguration

#### Summary
Base class for `Naninovel.IEngineService` configuration objects.
```csharp
public abstract class Naninovel.ServiceConfiguration
    : ScriptableObject

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `IEnumerable<ResourceLoaderConfiguration>` | ResourceLoaders | Collection of all the resource loader configs used in this configuration asset. | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | GetResourcePath() |  | 
| `String` | GetResourcePath(`Type` type) |  | 
| `T` | LoadFromResources() |  | 
| `ServiceConfiguration` | LoadFromResources(`Type` type) |  | 


## ServicesStateMap

#### Summary
Represents serializable state of the engine services.
```csharp
public class Naninovel.ServicesStateMap
    : SerializableLiteralStringMap, IDictionary<String, String>, ICollection<KeyValuePair<String, String>>, IEnumerable<KeyValuePair<String, String>>, IEnumerable, IDictionary, ICollection, ISerializationCallbackReceiver, IDeserializationCallback, ISerializable

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `TState` | GetServiceState() | Attempts to retrieve an object of the provided type from the map.  Will return null when no objects of the type is contained in the map. | 
| `void` | SetServiceState(`TState` state) | Stores JSON representation of the provided object in the map using the object's full type name as the key. | 


## SettingsSlotManager

```csharp
public class Naninovel.SettingsSlotManager
    : StateSlotManager<SettingsState>

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AnySaveExists() |  | 


## SettingsState

#### Summary
Represents serializable state of the engine service's settings.
```csharp
public class Naninovel.SettingsState
    : ServicesStateMap, IDictionary<String, String>, ICollection<KeyValuePair<String, String>>, IEnumerable<KeyValuePair<String, String>>, IEnumerable, IDictionary, ICollection, ISerializationCallbackReceiver, IDeserializationCallback, ISerializable

```

## ShakeActor

#### Summary
Shakes a `Naninovel.INovelActor`.
```csharp
public abstract class Naninovel.ShakeActor
    : MonoBehaviour, IInitializable, IAwaitable

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActorName |  | 
| `Single` | AmplitudeVariation |  | 
| `Single` | DurationVariation |  | 
| `Single` | ShakeAmplitude |  | 
| `Single` | ShakeDuration |  | 
| `Boolean` | ShakeHorizontally |  | 
| `Int32` | ShakesCount |  | 
| `Boolean` | ShakeVertically |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | AwaitAsync() |  | 
| `void` | Destroy() |  | 
| `INovelActor` | GetActor() |  | 
| `TaskAwaiter<ShakeActor>` | GetAwaiter() |  | 
| `void` | Initialize(`String[]` parameters) |  | 
| `Task` | ShakeAndDestroyAsync(`INovelActor` actor) |  | 
| `Task` | ShakeSequenceAsync(`INovelActor` actor) |  | 


## ShakeBackground

#### Summary
Shakes a `Naninovel.IBackgroundActor` or the main one.
```csharp
public class Naninovel.ShakeBackground
    : ShakeActor, IInitializable, IAwaitable

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `INovelActor` | GetActor() |  | 


## ShakeCharacter

#### Summary
Shakes a `Naninovel.ICharacterActor` with provided name or a random visible one.
```csharp
public class Naninovel.ShakeCharacter
    : ShakeActor, IInitializable, IAwaitable

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `INovelActor` | GetActor() |  | 


## ShakePrinter

#### Summary
Shakes a `Naninovel.ITextPrinterActor` with provided name or an active one.
```csharp
public class Naninovel.ShakePrinter
    : ShakeActor, IInitializable, IAwaitable

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `INovelActor` | GetActor() |  | 


## SpriteActor

#### Summary
A `Naninovel.MonoBehaviourActor` using `Naninovel.NovelSpriteRenderer` to represent appearance of the actor.
```csharp
public abstract class Naninovel.SpriteActor
    : MonoBehaviourActor, INovelActor, IDisposable

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `LocalizableResourceLoader<Texture2D>` | AppearanceLoader |  | 
| `Boolean` | IsVisible |  | 
| `Boolean` | SmoothStepTransition |  | 
| `NovelSpriteRenderer` | SpriteRenderer |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyTextureSettings(`Texture2D` texture) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `Task<Texture2D>` | LoadAppearanceTextureAsync(`String` appearance) |  | 
| `Task<Texture2D>` | LoadDefaultTextureAsync() |  | 
| `Task<String>` | LocateDefaultTextureAsync() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## SpriteBackground

#### Summary
A `Naninovel.IBackgroundActor` implementation using `Naninovel.SpriteActor` to represent an actor.
```csharp
public class Naninovel.SpriteBackground
    : SpriteActor, INovelActor, IDisposable, IBackgroundActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | SmoothStepTransition |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration, `Nullable<TransitionType>` transitionType, `Nullable<Vector4>` transitionParams) |  | 


## SpriteCharacter

#### Summary
A `Naninovel.ICharacterActor` implementation using `Naninovel.SpriteActor` to represent an actor.
```csharp
public class Naninovel.SpriteCharacter
    : SpriteActor, INovelActor, IDisposable, ICharacterActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `CharacterLookDirection` | LookDirection |  | 
| `Boolean` | SmoothStepTransition |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeLookDirectionAsync(`CharacterLookDirection` lookDirection, `Single` duration) |  | 
| `CharacterLookDirection` | GetLookDirection() |  | 
| `Task<Texture2D>` | LoadAppearanceTextureAsync(`String` appearance) |  | 
| `Task<String>` | LocateDefaultTextureAsync() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetLookDirection(`CharacterLookDirection` lookDirection) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## StateConfiguration

```csharp
public class Naninovel.StateConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefaultGlobalSlotId |  | 
| `String` | DefaultSettingsSlotId |  | 
| `Single` | LoadStartDelay |  | 
| `Int32` | QuickSaveSlotLimit |  | 
| `String` | QuickSaveSlotMask |  | 
| `String` | SaveFolderName |  | 
| `Int32` | SaveSlotLimit |  | 
| `String` | SaveSlotMask |  | 


## StateManager

#### Summary
Manages various `Naninovel.IEngineService`-related persistent data.  Provides API to save and load game state.
```csharp
public class Naninovel.StateManager
    : IEngineService

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | AnyGameSaveExists |  | 
| `GameStateSlotManager` | GameStateSlotManager |  | 
| `GlobalStateSlotManager` | GlobalStateSlotManager |  | 
| `String` | LastQuickSaveSlotId |  | 
| `Boolean` | QuickLoadAvailable |  | 
| `SettingsSlotManager` | SettingsSlotManager |  | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action` | OnGameLoadFinish |  | 
| `Action` | OnGameLoadStart |  | 
| `Action<GameState>` | OnQuickSaved |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `Task` | LoadDefaultEngineStateAsync(`Func`1[]` additionalTasks) | Loads a default engine state.  Will reset the services and unload unused assets before load and mask the process with the loading UI (when available). | 
| `Task<GameState>` | LoadEngineStateAsync(`String` slotId) | Loads engine services state from the specified save slot.  Will reset the services and unload unused assets before load and mask the process with the loading UI (when available). | 
| `Task<GameState>` | LoadGameAsync(`String` slotId) | Loads game state from the specified save slot. | 
| `Task<GlobalState>` | LoadGlobalStateAsync() |  | 
| `Task<SettingsState>` | LoadSettingsAsync() |  | 
| `Task<GameState>` | QuickLoadAsync() | Loads game state from the most recent quick save slot. | 
| `Task<GameState>` | QuickSaveAsync() | Saves current game state to the first quick save slot.  Will shift the quick save slots chain by one index before saving. | 
| `void` | ResetService() |  | 
| `Task<GameState>` | SaveGameAsync(`String` slotId) | Saves current game state to the specified save slot. | 
| `Task<GlobalState>` | SaveGlobalStateAsync() |  | 
| `Task<SettingsState>` | SaveSettingsAsync() |  | 


## StateSlotManager<TData>

```csharp
public abstract class Naninovel.StateSlotManager<TData>
    : SaveSlotManager<TData>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | SaveDataPath |  | 


## TextManager

#### Summary
Manages static string values, marked with `Naninovel.ManagedTextAttribute`.
```csharp
public class Naninovel.TextManager
    : IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ApplyManagedTextAsync() |  | 
| `void` | DestroyService() |  | 
| `Task` | InitializeServiceAsync() |  | 
| `void` | ResetService() |  | 


## TextPrinterManager

#### Summary
Manages text printer actors.
```csharp
public class Naninovel.TextPrinterManager
    : NovelActorManager<ITextPrinterActor, TextPrinterState>, IStatefulService<GameState>, IEngineService, IStatefulService<SettingsState>

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | DefaultPrinterName |  | 
| `Single` | MaxPrintDelay |  | 
| `Single` | PrintDelay |  | 
| `Single` | PrintSpeed |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `ITextPrinterActor` | ConstructActor(`String` actorName) |  | 
| `void` | DeactivateAllPrinters() | De-activates all the managed printers. | 
| `ITextPrinterActor` | GetActivePrinter() | Returns currently active printer. | 
| `ITextPrinterActor` | GetActivePrinterOrDefault(`Boolean&` wasAdded, `String&` initialActivePrinterName) | Retunrs currently active printer; when no active printers found, will add a default one and make it active. | 
| `ITextPrinterActor` | GetActivePrinterOrDefault() | Retunrs currently active printer; when no active printers found, will add a default one and make it active. | 
| `TMetadata` | GetActorMetadata(`String` actorName) |  | 
| `Task` | LoadServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `Task` | SaveServiceStateAsync(`SettingsState` engineSettingsState) |  | 
| `void` | SetActivePrinter(`String` name) | Selects printer with provided as active, wile de-activating all the other managed printers. | 
| `void` | SetPrintSpeed(`Single` value) | Sets `Naninovel.ITextPrinterActor.PrintDelay` for all the managed printers. | 


## TextPrinterState

#### Summary
Represents serializable state of a `Naninovel.ITextPrinterActor`.
```csharp
public class Naninovel.TextPrinterState
    : NovelActorState<ITextPrinterActor>

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<String>` | ActiveRichTextTags |  | 
| `String` | ActorNameText |  | 
| `Boolean` | IsPrinterActive |  | 
| `Single` | PrintDelay |  | 
| `String` | PrintedText |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | ApplyToActor(`ITextPrinterActor` actor) |  | 
| `void` | OverwriteFromActor(`ITextPrinterActor` actor) |  | 


## TransitionType

```csharp
public enum Naninovel.TransitionType
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | Crossfade |  | 
| `1` | BandedSwirl |  | 
| `2` | Blinds |  | 
| `3` | CircleReveal |  | 
| `4` | CircleStretch |  | 
| `5` | CloudReveal |  | 
| `6` | Crumble |  | 
| `7` | Disolve |  | 
| `8` | DropFade |  | 
| `9` | LineReveal |  | 
| `10` | Pixelate |  | 
| `11` | RadialBlur |  | 
| `12` | RadialWiggle |  | 
| `13` | RandomCircleReveal |  | 
| `14` | Ripple |  | 
| `15` | RotateCrumble |  | 
| `16` | Saturate |  | 
| `17` | Shrink |  | 
| `18` | SlideIn |  | 
| `19` | SwirlGrid |  | 
| `20` | Swirl |  | 
| `21` | Water |  | 
| `22` | Waterfall |  | 
| `23` | Wave |  | 


## TransitionUtils

```csharp
public static class Naninovel.TransitionUtils

```

#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | EnableKeyword(`Material` material, `TransitionType` transitionType) |  | 
| `Vector4` | GetDefaultParams(this `TransitionType` transitionType) |  | 
| `TransitionType` | GetEnabled(`Material` material) |  | 
| `String` | GetShaderKeyword(this `TransitionType` type) |  | 
| `TransitionType` | TypeFromString(`String` transitionType) |  | 


## UIChoiceHandler

#### Summary
A `Naninovel.IChoiceHandlerActor` implementation using `Naninovel.UI.ChoiceHandler` to represent an actor.
```csharp
public class Naninovel.UIChoiceHandler
    : MonoBehaviourActor, INovelActor, IDisposable, IChoiceHandlerActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `ChoiceHandler` | ChoiceHandler |  | 
| `IEnumerable<ChoiceState>` | Choices |  | 
| `Boolean` | IsHandlerActive |  | 
| `Boolean` | IsVisible |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChoice(`ChoiceState` choice) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | HandleChoice(`ChoiceState` state) |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | RemoveChoice(`String` id) |  | 
| `void` | SetIsHandlerActive(`Boolean` value) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## UIConfiguration

```csharp
public class Naninovel.UIConfiguration
    : ServiceConfiguration

```

#### Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `List<GameObject>` | CustomUI |  | 


## UIManager

#### Summary
Manages `Naninovel.UI.IManagedUI` objects.
```csharp
public class Naninovel.UIManager
    : IEngineService

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | DestroyService() |  | 
| `T` | GetUI() | Returns a managed UI of the provided type `type`.  Managed UIs are added on initialization based on `Naninovel.UIConfiguration.CustomUI`. | 
| `Task` | InitializeServiceAsync() |  | 
| `void` | ResetService() |  | 


## UITextPrinter

#### Summary
A `Naninovel.ITextPrinterActor` implementation using `Naninovel.UI.TextPrinter` to represent an actor.
```csharp
public class Naninovel.UITextPrinter
    : MonoBehaviourActor, INovelActor, IDisposable, ITextPrinterActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActorNameText |  | 
| `String` | Appearance |  | 
| `Boolean` | IsPrinterActive |  | 
| `Boolean` | IsUsingRichTags |  | 
| `Boolean` | IsVisible |  | 
| `String` | LastPrintedText |  | 
| `Single` | PrintDelay |  | 
| `String` | PrintedText |  | 
| `TextPrinter` | Printer |  | 
| `List<String>` | RichTextTags |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AppendText(`String` textToAppend) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `Task` | PrintTextAsync(`String` text, `String` actorName, `CancellationToken[]` cancellationTokens) |  | 
| `void` | ResetText() |  | 
| `void` | SetActorName(`String` actorName) |  | 
| `void` | SetPosition(`Vector3` position) |  | 
| `void` | SetPrintedText(`String` text) |  | 
| `void` | SetRichTextTags(`List<String>` tags) |  | 
| `void` | SetRotation(`Quaternion` rotation) |  | 
| `void` | SetScale(`Vector3` scale) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


## VideoBackground

#### Summary
A `Naninovel.IBackgroundActor` implementation using `UnityEngine.Video.VideoPlayer` to represent an actor.
```csharp
public class Naninovel.VideoBackground
    : MonoBehaviourActor, INovelActor, IDisposable, IBackgroundActor

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Appearance |  | 
| `Boolean` | IsVisible |  | 
| `NovelSpriteRenderer` | SpriteRenderer |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration) |  | 
| `Task` | ChangeAppearanceAsync(`String` appearance, `Single` duration, `Nullable<TransitionType>` transitionType, `Nullable<Vector4>` transitionParams) |  | 
| `Task` | ChangeVisibilityAsync(`Boolean` isVisible, `Single` duration) |  | 
| `void` | Dispose() |  | 
| `Task` | PreloadResourcesAsync(`String` appearance = null) |  | 
| `void` | SetAppearance(`String` appearance) |  | 
| `void` | SetVisibility(`Boolean` isVisible) |  | 
| `Task` | UnloadResourcesAsync(`String` appearance = null) |  | 


