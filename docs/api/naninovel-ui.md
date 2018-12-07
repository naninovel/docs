---
sidebar: auto
---

# Naninovel.UI

## BacklogCloseButton

```csharp
public class Naninovel.UI.BacklogCloseButton
    : ScriptableLabeledButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## BacklogPanel

```csharp
public class Naninovel.UI.BacklogPanel
    : ScriptableUIBehaviour, IBacklogUI, IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddMessage(`String` message, `String` actorName = null) |  | 
| `void` | AppendMessage(`String` message) |  | 
| `void` | Awake() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 
| `void` | SetIsVisible(`Boolean` isVisible) |  | 
| `Task` | SetIsVisibleAsync(`Boolean` isVisible, `Nullable<Single>` fadeTime = null) |  | 


## ChoiceHandler

#### Summary
Represents a view for choosing between a list of choices.
```csharp
public class Naninovel.UI.ChoiceHandler
    : ScriptableUIBehaviour

```

#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action<ChoiceState>` | OnChoice | Invoked when one of active choices are choosen. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddChoiceButton(`ChoiceState` choice) |  | 
| `void` | Awake() |  | 
| `void` | RemoveAllChoiceButtons() |  | 
| `void` | RemoveChoiceButton(`String` id) |  | 


## ChoiceHandlerButton

```csharp
public class Naninovel.UI.ChoiceHandlerButton
    : ScriptableButton

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Id |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | Initialize(`ChoiceState` choiceState) |  | 


## ControlPanelAutoPlayButton

```csharp
public class Naninovel.UI.ControlPanelAutoPlayButton
    : ScriptableLabeledButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelHideButton

```csharp
public class Naninovel.UI.ControlPanelHideButton
    : ScriptableLabeledButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelLoadButton

```csharp
public class Naninovel.UI.ControlPanelLoadButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelLogButton

```csharp
public class Naninovel.UI.ControlPanelLogButton
    : ScriptableLabeledButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelQuickLoadButton

```csharp
public class Naninovel.UI.ControlPanelQuickLoadButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelQuickSaveButton

```csharp
public class Naninovel.UI.ControlPanelQuickSaveButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelSaveButton

```csharp
public class Naninovel.UI.ControlPanelSaveButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelSettingsButton

```csharp
public class Naninovel.UI.ControlPanelSettingsButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelSkipButton

```csharp
public class Naninovel.UI.ControlPanelSkipButton
    : ScriptableLabeledButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## ControlPanelTitleButton

```csharp
public class Naninovel.UI.ControlPanelTitleButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## DebugInfoGUI

```csharp
public class Naninovel.UI.DebugInfoGUI
    : MonoBehaviour

```

#### Static Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `KeyCode` | NextKey |  | 
| `KeyCode` | PlayKey |  | 
| `KeyCode` | PreviousKey |  | 
| `KeyCode` | StopKey |  | 


#### Static Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Toggle() |  | 


## EngineVersionText

```csharp
public class Naninovel.UI.EngineVersionText
    : MonoBehaviour

```

## GameSettingsBgmVolumeSlider

```csharp
public class Naninovel.UI.GameSettingsBgmVolumeSlider
    : ScriptableSlider

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Single` value) |  | 
| `void` | Start() |  | 


## GameSettingsLanguageDropdown

```csharp
public class Naninovel.UI.GameSettingsLanguageDropdown
    : ScriptableDropdown

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Int32` value) |  | 


## GameSettingsManagedText

```csharp
public class Naninovel.UI.GameSettingsManagedText
    : ManagedTextUITextSetter

```

#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | BasicTitleLabel |  | 
| `String` | EffectsVolumeLabel |  | 
| `String` | LanguageLabel |  | 
| `String` | MasterVolumeLabel |  | 
| `String` | MessageSpeedLabel |  | 
| `String` | MusicVolumeLabel |  | 
| `String` | NavigationBasicLabel |  | 
| `String` | NavigationReturnLabel |  | 
| `String` | NavigationSoundLabel |  | 
| `String` | NavigationTextLabel |  | 
| `String` | ResolutionLabel |  | 
| `String` | ScreenModeLabel |  | 
| `String` | SkipModeLabel |  | 
| `String` | SoundTitleLabel |  | 
| `String` | TextTitleLabel |  | 
| `String` | VoiceVolumeLabel |  | 


## GameSettingsMasterVolumeSlider

```csharp
public class Naninovel.UI.GameSettingsMasterVolumeSlider
    : ScriptableSlider

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Single` value) |  | 
| `void` | Start() |  | 


## GameSettingsMenu

```csharp
public class Naninovel.UI.GameSettingsMenu
    : ScriptableUIBehaviour, ISettingsUI, IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## GameSettingsMessageSpeedSlider

```csharp
public class Naninovel.UI.GameSettingsMessageSpeedSlider
    : ScriptableSlider

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Single` value) |  | 
| `void` | Start() |  | 


## GameSettingsResolutionDropdown

```csharp
public class Naninovel.UI.GameSettingsResolutionDropdown
    : ScriptableDropdown

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Int32` value) |  | 
| `void` | Start() |  | 


## GameSettingsReturnButton

```csharp
public class Naninovel.UI.GameSettingsReturnButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


## GameSettingsScreenModeDropdown

```csharp
public class Naninovel.UI.GameSettingsScreenModeDropdown
    : ScriptableDropdown

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Int32` value) |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ExclusiveFullScreen |  | 
| `String` | FullScreenWindow |  | 
| `String` | MaximizedWindow |  | 
| `String` | Windowed |  | 


## GameSettingsSfxVolumeSlider

```csharp
public class Naninovel.UI.GameSettingsSfxVolumeSlider
    : ScriptableSlider

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Single` value) |  | 
| `void` | Start() |  | 


## GameSettingsSkipModeDropdown

```csharp
public class Naninovel.UI.GameSettingsSkipModeDropdown
    : ScriptableDropdown

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Int32` value) |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Everything |  | 
| `String` | ReadOnly |  | 


## GameSettingsVoiceVolumeSlider

```csharp
public class Naninovel.UI.GameSettingsVoiceVolumeSlider
    : ScriptableSlider

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnValueChanged(`Single` value) |  | 
| `void` | Start() |  | 


## GameStateSlot

```csharp
public class Naninovel.UI.GameStateSlot
    : ScriptableUIBehaviour, IPointerEnterHandler, IEventSystemHandler, IPointerExitHandler, IPointerClickHandler

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | Id |  | 
| `Int32` | SlotIndex |  | 
| `GameState` | State |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | Initialize(`String` id, `GameState` state = null, `OnClicked` onClicked = null, `OnDeleteClicked` onDeleteClicked = null) |  | 
| `void` | OnPointerClick(`PointerEventData` eventData) |  | 
| `void` | OnPointerEnter(`PointerEventData` eventData) |  | 
| `void` | OnPointerExit(`PointerEventData` eventData) |  | 
| `void` | SetEmptyState() |  | 
| `void` | SetState(`GameState` state) |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | EmptySlotLabel |  | 


## GameStateSlotsGrid

```csharp
public class Naninovel.UI.GameStateSlotsGrid
    : ScriptableUIBehaviour

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Int32` | LastPage |  | 
| `Nullable<DateTime>` | LastSaveDateTime |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `GameStateSlot` | AddSlot(`String` slotId, `GameState` state = null, `OnClicked` onClicked = null, `OnDeleteClicked` onDeleteClicked = null) |  | 
| `void` | Awake() |  | 
| `GameStateSlot` | GetSlot(`String` slotId) |  | 
| `Boolean` | SlotExists(`String` slotId) |  | 


## IBacklogUI

#### Summary
Represents a set of UI elements used for managing backlog messages.
```csharp
public interface Naninovel.UI.IBacklogUI
    : IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | AddMessage(`String` message, `String` actorName = null) | Adds message to the log. | 
| `void` | AppendMessage(`String` message) | Appends message to the last message of the log (if exists). | 


## ILoadingUI

#### Summary
Represents a set of UI elements shown when the game is loading.
```csharp
public interface Naninovel.UI.ILoadingUI
    : IManagedUI

```

## IManagedUI

#### Summary
Generic interface for all the UI objects managable by `Naninovel.UIManager` service.
```csharp
public interface Naninovel.UI.IManagedUI

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Boolean` | IsVisible | Whether the UI element is currently visible to the user. | 


#### Events

| Type | Name | Summary | 
| --- | --- | --- | 
| `Action<Boolean>` | OnVisibilityChanged | Event invoked when `Naninovel.UI.IManagedUI.IsVisible` of the UI object is changed. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Hide() | Hides the UI element from the user. | 
| `Task` | InitializeAsync() | Allows to execute any async initialization logic.  Invoked once by `Naninovel.UIManager` on service initialization. | 
| `Task` | SetIsVisibleAsync(`Boolean` isVisible, `Nullable<Single>` fadeTime = null) | Changes the visibility over the specified ``. | 
| `void` | Show() | Shows the UI element to the user. | 


## IMovieUI

#### Summary
Used to render videos played via `Naninovel.MoviePlayer`.
```csharp
public interface Naninovel.UI.IMovieUI
    : IManagedUI

```

## ISaveLoadUI

#### Summary
Represents a set of UI elements for managing `Naninovel.GameState` slots.
#### Remarks
Implementation is expected to have two independent sets of slots: `normal` and `quick`.
```csharp
public interface Naninovel.UI.ISaveLoadUI
    : IManagedUI

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `SaveLoadUIPresentationMode` | PresentationMode | Current presentation mode of the UI. | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `SaveLoadUIPresentationMode` | GetLastLoadMode() | Returns either `Naninovel.UI.SaveLoadUIPresentationMode.Load` or `Naninovel.UI.SaveLoadUIPresentationMode.QuickLoad`,  depending on where is the latest (chronologically, based on `Naninovel.GameState.SaveDateTime`) save slot resides. | 


## ISettingsUI

#### Summary
Represents a set of UI elements used for managing game settings.
```csharp
public interface Naninovel.UI.ISettingsUI
    : IManagedUI

```

## ITitleUI

#### Summary
Represents a set of UI elements where user can start new, continue or exit the game.
```csharp
public interface Naninovel.UI.ITitleUI
    : IManagedUI

```

## LoadingIcon

```csharp
public class Naninovel.UI.LoadingIcon
    : ScriptableUIBehaviour

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## LoadingPanel

```csharp
public class Naninovel.UI.LoadingPanel
    : ScriptableUIBehaviour, ILoadingUI, IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## LoadLoggerScrollRect

```csharp
public class Naninovel.UI.LoadLoggerScrollRect
    : ScriptableUIComponent<ScrollRect>

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | Log(`String` message) |  | 
| `void` | OnDestroy() |  | 
| `void` | OnEnable() |  | 
| `void` | Start() |  | 


## MovieUI

```csharp
public class Naninovel.UI.MovieUI
    : ScriptableUIBehaviour, IMovieUI, IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## NavigatorPlaytButton

```csharp
public class Naninovel.UI.NavigatorPlaytButton
    : ScriptableButton, IPointerEnterHandler, IEventSystemHandler, IPointerExitHandler

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | Initialize(`ScriptNavigator` navigator, `NovelScript` script, `NovelScriptPlayer` player) |  | 
| `void` | OnButtonClick() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 
| `void` | OnPointerEnter(`PointerEventData` eventData) |  | 
| `void` | OnPointerExit(`PointerEventData` eventData) |  | 


## NavigatorSyncButton

```csharp
public class Naninovel.UI.NavigatorSyncButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


## NovelText

```csharp
public class Naninovel.UI.NovelText
    : Text, ICanvasElement, IClippable, IMaskable, IMaterialModifier, ILayoutElement

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `Int32` | LastCharIndex |  | 
| `Int32` | LastRevealedCharIndex |  | 
| `Single` | RevealFadeDuration |  | 
| `Single` | RevealFadeWidth |  | 
| `Single` | RevealProgress |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Vector2` | GetLastRevealedCharPosition() | Returns position (in world space) of the last revealed character. | 
| `Single` | GetRevealProgress() |  | 
| `void` | HideAll() |  | 
| `void` | RevealAll() |  | 
| `Boolean` | RevealNextChar() | Attempts to reveal next visible (not-a-tag) character.  Could fail when cached text generator is not valid. | 
| `void` | SetLastRevealedCharAsLimit() | Prevents reveal fade effect from affecting last revealed char. | 
| `void` | SetLastRevealedCharIndex(`Int32` charIndex, `Boolean` triggerFade = True) |  | 
| `void` | SetRevealProgress(`Single` revealProgress) |  | 
| `void` | Start() |  | 


## SaveLoadMenu

```csharp
public class Naninovel.UI.SaveLoadMenu
    : ScriptableUIBehaviour, ISaveLoadUI, IManagedUI

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `SaveLoadUIPresentationMode` | PresentationMode |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `SaveLoadUIPresentationMode` | GetLastLoadMode() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## SaveLoadMenuManagedText

```csharp
public class Naninovel.UI.SaveLoadMenuManagedText
    : ManagedTextUITextSetter

```

#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LoadTitleLabel |  | 
| `String` | NavigationLoadLabel |  | 
| `String` | NavigationQuickLoadLabel |  | 
| `String` | NavigationReturnLabel |  | 
| `String` | NavigationSaveLabel |  | 
| `String` | QuickLoadTitleLabel |  | 
| `String` | SaveTitleLabel |  | 


## SaveLoadMenuReturnButton

```csharp
public class Naninovel.UI.SaveLoadMenuReturnButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


## SaveLoadUIPresentationMode

#### Summary
Represents available `Naninovel.UI.ISaveLoadUI` presentation modes.
```csharp
public enum Naninovel.UI.SaveLoadUIPresentationMode
    : Enum, IComparable, IFormattable, IConvertible

```

#### Enum

| Value | Name | Summary | 
| --- | --- | --- | 
| `0` | QuickLoad |  | 
| `1` | Load |  | 
| `2` | Save |  | 


## ScriptNavigator

```csharp
public class Naninovel.UI.ScriptNavigator
    : ScriptableUIBehaviour

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | DestroyScriptButtons() |  | 
| `void` | GenerateScriptButtons(`IEnumerable<NovelScript>` novelScripts) |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 
| `Task` | SetIsVisibleAsync(`Boolean` isVisible, `Nullable<Single>` fadeTime = null) |  | 


## TextPrinter

#### Summary
Allows printing text over time, controlling actor name label (optional) and `waiting for input` indicator.
```csharp
public class Naninovel.UI.TextPrinter
    : ScriptableUIBehaviour

```

#### Properties

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | ActorNameText |  | 
| `RectTransform` | Content |  | 
| `NovelText` | NovelText |  | 


#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Task` | PrintTextAsync(`CancellationToken` cancellationToken, `Single` printDelay) |  | 
| `void` | SetActorName(`String` actorName) |  | 
| `void` | SetWaitForInputIndicatorVisible(`Boolean` isVisible) |  | 


## TitleContinueButton

```csharp
public class Naninovel.UI.TitleContinueButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## TitleExitButton

```csharp
public class Naninovel.UI.TitleExitButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## TitleMenu

```csharp
public class Naninovel.UI.TitleMenu
    : ScriptableUIBehaviour, ITitleUI, IManagedUI

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `Task` | InitializeAsync() |  | 
| `void` | OnDisable() |  | 
| `void` | OnEnable() |  | 


## TitleNewGameButton

```csharp
public class Naninovel.UI.TitleNewGameButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 
| `void` | Start() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## TitleSettingsButton

```csharp
public class Naninovel.UI.TitleSettingsButton
    : ScriptableButton

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Awake() |  | 
| `void` | OnButtonClick() |  | 


#### Static Fields

| Type | Name | Summary | 
| --- | --- | --- | 
| `String` | LabelText |  | 


## WaitingForInputIndicator

```csharp
public class Naninovel.UI.WaitingForInputIndicator
    : ScriptableUIComponent<RawImage>

```

#### Methods

| Type | Name | Summary | 
| --- | --- | --- | 
| `void` | Hide() |  | 
| `void` | Show(`Vector2` position) | Reveales and sets position in world space. | 


