# Configuration
The engine configuration is stored in scriptable object assets located in `Naninovel/Resources/Naninovel/Configuration` folder. They are automatically generated when initially importing the package or when a project configuration menu is opened. 

Use `Naninovel -> Configuration` or `Edit -> Project Settings -> Naninovel` to access the configuration menu.

This configuration reference is valid for [Naninovel v1.4.0-beta](https://github.com/Elringus/NaninovelWeb/releases).

## Audio

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Audio Loader | Audio- (Project, Local) | Configuration of the resource loader used with audio (BGM and SFX) resources.
Voice Loader | Voice- (Project, Local) | Configuration of the resource loader used with voice resources.
Enable Auto Voicing | False | When enabled, each `PrintText` action will attempt to play voice clip at `VoiceResourcesPrefix/ScriptName/LineIndex.ActionIndex`.
Custom Audio Mixer | Null | Audio mixer to control audio groups. When not provided, will use a default one.
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
Default Metadata | Object Ref | Metadata to use by default when creating background actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating background actors with specific IDs.
Scene Origin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Camera

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Reference Resolution | (1920, 1080) | The reference resolution used when creating sprite assets (characters, backgrounds, etc).
Initial Position | (0.0, 0.0, -10.0) | Initial world position of the camera.
Background Color | RGBA(0.137, 0.122, 0.125, 1.000) | Color of the camera background layer.
Render Texture | Null | When provided, the camera will render to the texture instead of screen.
Thumbnail Resolution | (240, 140) | The resolution in which thumbnails to preview game save slots will be captured.
Hide UI In Thumbnails | False | Whether to ignore UI layer when capturing thumbnails.

</div>

## Characters

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Auto Arrange On Add | True | Whether to evenly distribute characters by X-axis when adding a new character without a specified position.
Default Metadata | Object Ref | Metadata to use by default when creating character actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating character actors with specific IDs.
Scene Origin | (0.5, 0.0) | Origin point used for reference when positioning actors on scene.

</div>

## Choice Handlers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Handler Id | Button List | ID of the choice handler to use by default.
Default Metadata | Object Ref | Metadata to use by default when creating choice handler actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating choice handler actors with specific IDs.

</div>

## Engine

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Generated Data Path | Naninovel Data | Relative (to the application data directory) path to store the automatically generated assets.
Initialize On Application Load | True | Whether to automatically initialize the engine when application starts.
Show Initialization UI | True | Whether to show a loading UI while the engine is initializing.
Custom Initialization UI | Null | UI to show while the engine is initializing (when enabled). Will use a default one when not provided.
Override Objects Layer | False | Whether to assign a specific layer to all the engine objects. Engine's camera will use the layer for the culling mask. Use this to isolate Naninovel objects from being rendered by other cameras.
Objects Layer | 0 | When `Override Objects Layer` is enabled, the specified layer will be assigned to all the engine objects.
Enable Development Console | True | Whether to enable development console.
Toggle Console Key | Back Quote | Key used to toggle development console. You can also toggle it with a multi (3 or more) touch when using touchscreens.

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
Loader Configuration | Localization- (Project, Local) | Configuration of the resource loader used with the localization resources.
Default Locale | En | Default locale of the game. When user selects a default locale, original resources will be used.

</div>

## Managed Text

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader Configuration | Text- (Project, Local) | Configuration of the resource loader used with the managed text resources.

</div>

## Movies

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader Configuration | Movies- (Project, Local) | Configuration of the resource loader used with movie resources.
Skip On Input | True | Whether to skip movie playback when user activates `cancel` input keys.
Skip Frames | True | Whether to skip frames to catch up with current time.
Aspect Ratio | Fit Horizontally | Defines how the video content will be stretched to fill the target area.
Fade Duration | 1 | Time in seconds to fade in/out before starting/finishing playing the movie.
Custom Fade Texture | Null | Texture to show while fading. Will use a simple black texture when not provided.
Play Intro Movie | False | Whether to automatically play a movie after engine initialization and before showing the main menu.
Intro Movie Name | Null | Path to the intro movie resource.

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
Loader | Scripts- (Project, Local) | Configuration of the resource loader used with novel script resources.
Start Game Script | Null | Name of the script to play when starting a new game. Will use first available when not provided.
Enable Community Modding | False | Whether to allow adding external novel scripts to the build.
External Loader | Scripts- (Local) | Configuration of the resource loader used with external novel script resources.
Enable Navigator | True | Whether to initializte script navigator to browse available novel scripts.
Show Navigator On Init | False | Whether to show novel script navigator when script manager is initialized.
Navigator Sort Order | 900 | UI sort order of the script navigator.

</div>

## State

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Save Folder Name | Saves | The folder will be created in the game data folder.
Default Settings Slot Id | Settings | The name of the settings save file.
Default Global Slot Id | Global Save | The name of the global save file.
Save Slot Mask | Game Save{0:000} | Mask used to name save slots.
Quick Save Slot Mask | Game Quick Save{0:000} | Mask used to name quick save slots.
Save Slot Limit | 99 | Maximum number of save slots.
Quick Save Slot Limit | 9 | Maximum number of quick save slots.
Load Start Delay | 0.3 | Seconds to wait before starting the load operation.

</div>

## Text Printers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Defaul Printer Id | Dialogue | ID of the text printer to use by default.
Max Print Delay | 0.06 | Max typing delay. Determines print speed interval.
Default Metadata | Object Ref | Metadata to use by default when creating text printer actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating text printer actors with specific IDs.

</div>

## UI

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Objects Layer | 5 | The layer to assign for the UI elements instatiated by the engine. Used to cull the UI when using `toogle UI` feature.
Render Mode | Screen Space Camera | The canvas render mode to apply for all the managed UI elements.
Sorting Offset | 1 | The sorting offset to apply for all the managed UI elements.
Custom UI | Object Ref | The list of custom UI prefabs to spawn on the engine initialization. Each prefab should have a `IManagedUI`-derived component attached to the root object.

</div>

