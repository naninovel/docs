# Configuration
The engine configuration is stored in scriptable object assets located in `Naninovel/Resources/Naninovel/Configuration` folder. They are automatically generated when initially importing the package or when a project configuration menu is opened. 

Use `Naninovel -> Configuration` or `Edit -> Project Settings -> Naninovel` to access the configuration menu.

<video class="video" loop autoplay><source src="https://i.gyazo.com/c278bc7d9d2c569993a30be7706fbb38.mp4" type="video/mp4"></video>

## Audio

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Audio Loader | Audio- (Project, Local) | Configuration of the resource loader used to manage audio (BGM and SFX) resources.
Voice Loader | Voice- (Project, Local) | Configuration of the resource loader used to manage voice resources.
Enable Auto Voicing | False | When enabled, each `PrintText` action will attempt to play voice clip at `VoiceResourcesPrefix/ScriptName/LineIndex.ActionIndex`.
Audio Mixer | Default Mixer (Unity Engine.Audio Mixer Controller) | Audio Mixer to control audio groups. When not provided, will handle all groups as one.
Master Volume Handle Name | Master Volume | Name of the mixer's handle to control master volume.
Bgm Group Path | Master/BGM | Path of the mixer's group to control master volume.
Bgm Volume Handle Name | BGM Volume | Name of the mixer's handle to control background music volume.
Sfx Group Path | Master/SFX | Path of the mixer's group to control background music volume.
Sfx Volume Handle Name | SFX Volume | Name of the mixer's handle to control sound effects volume.
Voice Group Path | Master/Voice | Path of the mixer's group to control sound effects volume.
Voice Volume Handle Name | Voice Volume | Name of the mixer's handle to control voice volume.

</div>

## Backgrounds

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Z Offset | 100 | Z-axis offset distance (depth) from background actors to the camera.
Default Metadata | Object Ref | Metadata to use by default when creating background actors.
Metadata | Object Ref | Metadata to use when creating background actors with specific names. Populated automatically when using backround resources manager.
Scene Origin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Camera

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Reference Resolution | (1920, 1080) | The reference resolution used when creating sprite assets (characters, backgrounds, etc).
Thumbnail Resolution | (240, 140) | The resolution in which thumbnails to preview game save slots will be captured.
Initial Position | (0.0, 0.0, -10.0) | Initial position of the camera on scene.
Background Color | RGBA(0.137, 0.122, 0.125, 1.000) | Color of the camera background layer.

</div>

## Characters

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Auto Arrange On Add | True | Whether to evenly distribute characters by X-axis when adding a new character without a specified position.
Default Metadata | Object Ref | Metadata to use by default when creating character actors.
Metadata | Null | Metadata to use when creating character actors with specific names. Populated automatically when using character resources manager.
Scene Origin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Choice Handlers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Actor Name | Button List | Name of the choice handler to use by default.
Default Metadata | Object Ref | Metadata to use by default when creating choice handler actors.
Metadata | Object Ref | Metadata to use when creating choice handler actors with specific names.

</div>

## Input

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Bindings | Object Ref | Bindings to process input for.
Touch Continue Cooldown | 0.1 | Limits frequency on the continue input when using touch input.
Spawn Event System | True | Whether to spawn an event system and input module when initializing. Uncheck in case scenes will already have one.

</div>

## Localization

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Provider Types | Object Ref | Provider types to use when accesing localization resources, in order.
Resources Path Prefix | Localization | Path prefix to add for each requested localization resource.
Default Locale | En | Default locale of the game. When user selects a default locale, original resources will be used.

</div>

## Managed Text

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Provider Types | Object Ref | Provider types to use when accesing managed text resources, in order.
Resources Path Prefix | Text | Path prefix to add for each requested managed text resource.

</div>

## Movies

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader Configuration | Movies- (Project) | Configuration of the resource loader used to manage movie resources.
Skip On Input | True | Whether to skip movie playback when user activates `cancel` input keys.
Skip Frames | True | Whether to skip frames to catch up with current time.
Aspect Ratio | Fit Horizontally | Defines how the video content will be stretched to fill the target area.
Fade Duration | 1 | Time in seconds to fade in/out before starting/finishing playing the movie.
Fade Texture | Black Texture (Unity Engine.Texture 2D) | Texture to show while fading.

</div>

## Printers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Actor Name | Dialogue | Name of the text printer to use by default.
Max Print Delay | 0.06 | Max typing delay. Determines print speed interval.
Default Metadata | Object Ref | Metadata to use by default when creating text printer actors.
Metadata | Object Ref | Metadata to use when creating text printer actors with specific names.

</div>

## Resource Provider

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Log Resource Loading | True | Whether to log resource loading operations on the loading screen.
Local Root Path | Resources | Path root to use for the local resource provider.
Google Drive Root Path | Resources | Path root to use for the Google Drive resource provider.
Google Drive Request Limit | 2 | Maximum allowed concurrent requests when contacting Google Drive API.
Google Drive Caching Policy | Smart | Cache policy to use when downloading resources. `Smart` will attempt to use Changes API to check for the modifications on the drive. `PurgeAllOnInit` will to re-download all the resources when the provider is initialized.

</div>

## Script Player

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Skip Time Scale | 10 | Time scale to use when in skip (fast-forward) mode.
Min Auto Play Delay | 3 | Minimum seconds to wait before executing next action while in auto play mode.

</div>

## Scripts

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Scripts- (Project, Local) | Configuration of the resource loader used to manage novel script resources.
Start Game Script | Null | Name of the script to play when starting a new game.
Enable Navigator | True | Whether to initializte script navigator to browse available novel scripts.
Show Navigator On Init | False | Whether to show novel script navigator when script manager is initialized.
Navigator Prefab | Script Navigator (Naninovel.UI.Script Navigator) | Script navigator prefab to use.
Navigator Sort Order | 900 | UI sort order of the script navigator.

</div>

## State

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Save Folder Name | Novel Save Data | The folder will be created in the game data folder.
Default Settings Slot Id | Settings | The name of the settings save file.
Default Global Slot Id | Global Save | The name of the global save file.
Save Slot Mask | Game Save{0:000} | Mask used to name save slots.
Quick Save Slot Mask | Game Quick Save{0:000} | Mask used to name quick save slots.
Save Slot Limit | 99 | Maximum number of save slots.
Quick Save Slot Limit | 9 | Maximum number of quick save slots.
Load Start Delay | 0.3 | Seconds to wait before starting the load operation.

</div>

## UI

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Custom UI | Null | The list of custom UI prefabs to spawn on the engine initialization. Each prefab should have a `IManagedUI`-derived component attached.

</div>

