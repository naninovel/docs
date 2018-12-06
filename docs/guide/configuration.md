---
pageClass: config
---

# Configuration
The engine configuration is stored in scriptable object assets located in `Naninovel/Resources/Naninovel/Configuration` folder. They are automatically generated when initially importing the package or when a project configuration menu is opened. 

Use `Naninovel -> Configuration` or `Edit -> Project Settings -> Naninovel` to access the configuration menu.

## Audio

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
AudioLoader | Audio- (Project, Local) | Configuration of the resource loader used to manage audio (BGM and SFX) resources.
VoiceLoader | Voice- (Project, Local) | Configuration of the resource loader used to manage voice resources.
EnableAutoVoicing | False | When enabled, each `PrintText` action will attempt to play voice clip at `VoiceResourcesPrefix/ScriptName/LineIndex-ActionIndex`.
AudioMixer | DefaultMixer (UnityEngine | Audio Mixer to control audio groups. When not provided, will handle all groups as one.
MasterVolumeHandleName | Master Volume | Name of the mixer's handle to control master volume.
BgmGroupPath | Master/BGM | Path of the mixer's group to control master volume.
BgmVolumeHandleName | BGM Volume | Name of the mixer's handle to control background music volume.
SfxGroupPath | Master/SFX | Path of the mixer's group to control background music volume.
SfxVolumeHandleName | SFX Volume | Name of the mixer's handle to control sound effects volume.
VoiceGroupPath | Master/Voice | Path of the mixer's group to control sound effects volume.
VoiceVolumeHandleName | Voice Volume | Name of the mixer's handle to control voice volume.

</div>

## Backgrounds

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
ZOffset | 100 | Z-axis offset distance to add between background actors.
DefaultMetadata | Object Ref | Metadata to use by default when creating background actors.
Metadata | Object Ref | Metadata to use when creating background actors with specific names. Populated automatically when using backround resources manager.
SceneOrigin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Camera

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
ReferenceResolution | (1920, 1080) | The reference resolution used when creating sprite assets (characters, backgrounds, etc).
ThumbnailResolution | (240, 140) | The resolution in which thumbnails to preview game save slots will be captured.
InitialPosition | (0.0, 0.0, -10.0) | Initial position of the camera on scene.
BackgroundColor | RGBA(0.137, 0.122, 0.125, | Color of the camera background layer.

</div>

## Characters

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
AutoArrangeOnAdd | True | Whether to evenly distribute characters by X-axis when adding a new character without a specified position.
DefaultMetadata | Object Ref | Metadata to use by default when creating character actors.
Metadata | null | Metadata to use when creating character actors with specific names. Populated automatically when using character resources manager.
SceneOrigin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Choice Handlers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
DefaultActorName | ButtonList | Name of the choice handler to use by default.
DefaultMetadata | Object Ref | Metadata to use by default when creating choice handler actors.
Metadata | Object Ref | Metadata to use when creating choice handler actors with specific names.

</div>

## Input

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Bindings | Object Ref | Bindings to process input for.
TouchContinueCooldown | 0.1 | Limits frequency on the continue input when using touch input.
SpawnEventSystem | True | Whether to spawn an event system and input module when initializing. Uncheck in case scenes will already have one.

</div>

## Localization

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
ProviderTypes | Object Ref | Provider types to use when accesing localization resources, in order.
ResourcesPathPrefix | Localization | Path prefix to add for each requested localization resource.
DefaultLocale | en | Default locale of the game. When user selects a default locale, original resources will be used.

</div>

## Managed Text

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
ProviderTypes | Object Ref | Provider types to use when accesing managed text resources, in order.
ResourcesPathPrefix | Text | Path prefix to add for each requested managed text resource.

</div>

## Movies

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
LoaderConfiguration | Movies- (Project) | Configuration of the resource loader used to manage movie resources.
SkipOnInput | True | Whether to skip movie playback when user activates `cancel` input keys.
SkipFrames | True | Whether to skip frames to catch up with current time.
AspectRatio | FitHorizontally | Defines how the video content will be stretched to fill the target area.
FadeDuration | 1 | Time in seconds to fade in/out before starting/finishing playing the movie.
FadeTexture | BlackTexture (UnityEngine | Texture to show while fading.

</div>

## Printers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
DefaultActorName | Dialogue | Name of the text printer to use by default.
MaxPrintDelay | 0.06 | Max typing delay. Determines print speed interval.
DefaultMetadata | Object Ref | Metadata to use by default when creating text printer actors.
Metadata | Object Ref | Metadata to use when creating text printer actors with specific names.

</div>

## Resource Provider

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
LogResourceLoading | True | Whether to log resource loading operations on the loading screen.
LocalRootPath | Resources | Path root to use for the local resource provider.
GoogleDriveRootPath | Resources | Path root to use for the Google Drive resource provider.
GoogleDriveRequestLimit | 2 | Maximum allowed concurrent requests when contacting Google Drive API.
GoogleDriveCachingPolicy | Smart | Cache policy to use when downloading resources. `Smart` will attempt to use Changes API to check for the modifications on the drive. `PurgeAllOnInit` will to re-download all the resources when the provider is initialized.

</div>

## Script Player

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
SkipTimeScale | 10 | Time scale to use when in skip (fast-forward) mode.
MinAutoPlayDelay | 3 | Minimum seconds to wait before executing next action while in auto play mode.

</div>

## Scripts

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Scripts- (Project, Local) | Configuration of the resource loader used to manage novel script resources.
StartGameScript | null | Name of the script to play when starting a new game.
EnableNavigator | True | Whether to initializte script navigator to browse available novel scripts.
ShowNavigatorOnInit | False | Whether to show novel script navigator when script manager is initialized.
NavigatorPrefab | ScriptNavigator (Naninove | Script navigator prefab to use.
NavigatorSortOrder | 900 | UI sort order of the script navigator.

</div>

## State

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
SaveFolderName | NovelSaveData | The folder will be created in the game data folder.
DefaultSettingsSlotId | Settings | The name of the settings save file.
DefaultGlobalSlotId | GlobalSave | The name of the global save file.
SaveSlotMask | GameSave{0:000} | Mask used to name save slots.
QuickSaveSlotMask | GameQuickSave{0:000} | Mask used to name quick save slots.
SaveSlotLimit | 99 | Maximum number of save slots.
QuickSaveSlotLimit | 9 | Maximum number of quick save slots.
LoadStartDelay | 0.3 | Seconds to wait before starting the load operation.

</div>

## UI

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
CustomUI | null | The list of custom UI prefabs to spawn on the engine initialization. Each prefab should have a `IManagedUI`-derived component attached.

</div>

