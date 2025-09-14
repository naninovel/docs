# Configuration
The engine configuration is stored in multiple scriptable object assets located at `Assets/NaninovelData/Resources/Naninovel/Configuration` folder. They are automatically generated when opening the corresponding configuration menus in the Unity editor for the first time. 

Use `Naninovel -> Configuration` or `Edit -> Project Settings -> Naninovel` to access the configuration menu.

Notice, that all the configuration menus are supporting [Unity's presets feature](https://docs.unity3d.com/Manual/Presets). It could be useful to create several configuration presets when deploying to different target platforms (eg, mobile, standalone, consoles, etc).

![](https://i.gyazo.com/55f5c74bfc16e1af2455034647525df3.mp4)

It's possible to modify configuration objects at runtime, add new custom configurations and change the way the objects are accessed at runtime (eg, read configuration from JSON files stored on a remote host); see [custom configuration](/guide/custom-configuration) guide for more information.

## Audio

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Audio Loader | Audio- (Addressable, Project) | Configuration of the resource loader used with audio (BGM and SFX) resources.
Voice Loader | Voice- (Addressable, Project) | Configuration of the resource loader used with voice resources.
Audio Player | Naninovel Audio Player | IAudioPlayer implementation responsible for playing audio clips.
Default Master Volume | 1 | Master volume to set when the game is first started.
Default Bgm Volume | 1 | BGM volume to set when the game is first started.
Default Sfx Volume | 1 | SFX volume to set when the game is first started.
Default Voice Volume | 1 | Voice volume to set when the game is first started.
Enable Auto Voicing | False | When enabled, each [@print] command will attempt to play an associated voice clip.
Voice Overlap Policy | Prevent Overlap | Dictates how to handle concurrent voices playback:<br> • Allow Overlap — Concurrent voices will be played without limitation.<br> • Prevent Overlap — Prevent concurrent voices playback by stopping any played voice clip before playing a new one.<br> • Prevent Character Overlap — Prevent concurrent voices playback per character; voices of different characters (auto voicing) and any number of [@voice] command are allowed to be played concurrently.
Voice Locales | Null | Assign localization tags to allow selecting voice language in the game settings independently of the main localization.
Default Fade Duration | 0.35 | Default duration of the volume fade in/out when starting or stopping playing audio.
Play Sfx While Skipping | True | Whether to play non-looped sound effects (SFX) while in skip mode. When disabled, will ignore [@sfx] commands without `loop!` while skipping.
Custom Audio Mixer | Null | Audio mixer to control audio groups. When not specified, will use a default one.
Master Group Path | Master | Path of the mixer's group to control master volume.
Master Volume Handle Name | Master Volume | Name of the mixer's handle (exposed parameter) to control master volume.
Bgm Group Path | Master/BGM | Path of the mixer's group to control volume of background music.
Bgm Volume Handle Name | BGM Volume | Name of the mixer's handle (exposed parameter) to control background music volume.
Sfx Group Path | Master/SFX | Path of the mixer's group to control sound effects music volume.
Sfx Volume Handle Name | SFX Volume | Name of the mixer's handle (exposed parameter) to control sound effects volume.
Voice Group Path | Master/Voice | Path of the mixer's group to control voice volume.
Voice Volume Handle Name | Voice Volume | Name of the mixer's handle (exposed parameter) to control voice volume.

</div>

## Backgrounds

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Metadata | Object Ref | Metadata to use by default when creating background actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating background actors with specific IDs.
Shared Poses | Object Ref | Named states (poses) shared between the backgrounds; pose name can be used as appearance in [@back] commands to set enabled properties of the associated state.
Scene Origin | (0.50, 0.00) | Reference point on scene to be considered as origin for the managed actors. Doesn't affect positioning.
Z Offset | 100 | Initial Z-axis offset (depth) from actors to the camera to set when the actors are created.
Z Step | 0.1 | Distance by Z-axis to set between the actors when they are created; used to prevent z-fighting issues.
Default Duration | 0.35 | Default duration (in seconds) for all the actor modifications (changing appearance, position, tint, etc).
Default Easing | Linear | Easing function to use by default for all the actor modification animations (changing appearance, position, tint, etc).
Auto Show On Modify | True | Whether to automatically reveal (show) an actor when executing modification commands.

</div>

## Camera

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Reference Resolution | (1920, 1080) | The reference resolution is used to evaluate proper rendering dimensions, so that actors are correctly positioned on scene. As a rule of thumb, set this equal to the resolution of the background textures you make for the game.
Reference PPU | 100 | How many pixels correspond to a scene unit. Reducing this will make all the actors appear smaller and vice-versa. Default value of 100 is recommended for most cases.
Match Screen Width | False | Whether reference scene rectangle width should be matched against screen width. When enabled, relative (scene) position evaluation will use screen border as the origin; otherwise reference resolution is used.
Initial Position | (0.00, 0.00, -10.00) | Initial world position of the managed cameras.
Custom Camera Prefab | Null | A prefab with a camera component to use for rendering. Will use a default one when not specified. In case you wish to set some camera properties (background color, FOV, HDR, etc) or add post-processing scripts, create a prefab with the desired camera setup and assign the prefab to this field.
Use UI Camera | True | Whether to render the UI with a dedicated camera. This option is for backward-compatibility and should not be disabled in new projects. Expect issues when disabled (eg, constant uGUI layout rebuilds on camera animations).
Custom UI Camera Prefab | Null | A prefab with a camera component to use for UI rendering. Will use a default one when not specified. Has no effect when `Use UI Camera` is disabled
Default Duration | 0.35 | Default duration (in seconds) for all the camera modifications (changing zoom, position, rotation, etc).
Default Easing | Linear | Easing function to use by default for all the camera modifications (changing zoom, position, rotation, etc).
Thumbnail Resolution | (240, 140) | The resolution in which thumbnails to preview game save slots will be captured.
Hide UI In Thumbnails | False | Whether to ignore UI layer when capturing thumbnails.

</div>

## Characters

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Auto Arrange On Add | True | Whether to evenly distribute characters by X-axis when adding a new character without a specified position.
Arrange Range | (0.00, 1.00) | Start (x) and end (y) positions (in 0.0 to 1.0 range) relative to scene width representing the range over which the characters are arranged.
Default Metadata | Object Ref | Metadata to use by default when creating character actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating character actors with specific IDs.
Avatar Loader | Character Avatars- (Addressable, Project) | Configuration of the resource loader used with character avatar texture resources.
Shared Poses | Object Ref | Named states (poses) shared between the characters; pose name can be used as appearance in [@char] commands to set enabled properties of the associated state.
Scene Origin | (0.50, 0.00) | Reference point on scene to be considered as origin for the managed actors. Doesn't affect positioning.
Z Offset | 50 | Initial Z-axis offset (depth) from actors to the camera to set when the actors are created.
Z Step | 0.1 | Distance by Z-axis to set between the actors when they are created; used to prevent z-fighting issues.
Default Duration | 0.35 | Default duration (in seconds) for all the actor modifications (changing appearance, position, tint, etc).
Default Easing | Smooth Step | Easing function to use by default for all the actor modification animations (changing appearance, position, tint, etc).
Auto Show On Modify | True | Whether to automatically reveal (show) an actor when executing modification commands.

</div>

## Choice Handlers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Handler Id | Button List | ID of the choice handler to use by default.
Choice Button Loader | Choice Buttons- (Addressable, Project) | Configuration of the resource loader used for loading custom choice buttons.
Default Metadata | Object Ref | Metadata to use by default when creating choice handler actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating choice handler actors with specific IDs.
Default Duration | 0.35 | Default duration (in seconds) for all the actor modifications (changing appearance, position, tint, etc).
Default Easing | Linear | Easing function to use by default for all the actor modification animations (changing appearance, position, tint, etc).
Auto Show On Modify | True | Whether to automatically reveal (show) an actor when executing modification commands.

</div>

## Custom Variables

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Predefined Variables | Object Ref | The list of variables to initialize by default. Global variables (names starting with `g_`) are initialized on first application start, and others on each state reset.

</div>

## Engine

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Override Objects Layer | False | Whether to assign a specific layer to all the engine objects. Engine's camera will use the layer for the culling mask. Use this to isolate Naninovel objects from being rendered by other cameras.
Objects Layer | 0 | When `Override Objects Layer` is enabled, the specified layer will be assigned to all the engine objects.
Async Exception Log Type | Error | Log type to use for UniTask-related exceptions.
Async Instantiation | True | Whether to use `Object.InstantiateAsync` for instantiating engine objects, which moves most associated work off the main thread. Keep enabled unless experiencing issues.
Initialize On Application Load | True | Whether to automatically initialize the engine when application starts.
Scene Independent | True | Whether to apply `DontDestroyOnLoad` to the engine objects, making their lifetime independent of any loaded scenes. When disabled, the objects will be part of the Unity scene where the engine was initialized and will be destroyed when the scene is unloaded.
Show Initialization UI | True | Whether to show a loading UI while the engine is initializing.
Custom Initialization UI | Null | UI to show while the engine is initializing (when enabled). Will use a default one when not specified.
Enable Bridging | True | Whether to automatically start the bridging server to communicate with external Naninovel tools: IDE extension, web editor, etc.
Auto Generate Metadata | True | Whether to automatically generate project metadata when Unity editor is started and after compiling C# scripts.
Enable Development Console | True | Whether to enable development console.
Debug Only Console | False | When enabled, development console will only be available in development (debug) builds.

</div>

## Input

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Spawn Event System | True | Whether to spawn an event system when initializing.
Custom Event System | Null | A prefab with an `EventSystem` component to spawn for input processing. Will spawn a default one when not specified.
Spawn Input Module | True | Whether to spawn an input module when initializing.
Custom Input Module | Null | A prefab with an `InputModule` component to spawn for input processing. Will spawn a default one when not specified.
Input Actions | Null | When Unity's new input system is installed, assign input actions asset here.<br><br>To map input actions to Naninovel's input bindings, create `Naninovel` action map and add actions with names equal to the binding names (found below under `Control Scheme` -> Bindings list).<br><br>Be aware, that 2-dimensional (Vector2) axes are not supported.
Process Legacy Bindings | True | Whether to process legacy input bindings. Disable in case you're using Unity's new input system and don't want the legacy bindings to work in addition to input actions.
Touch Frequency Limit | 0.1 | Limits frequency of the registered touch inputs, in seconds. For legacy input only.
Touch Distance Limit | 25 | Limits distance of the registered touch inputs, in pixels. For legacy input only.
Detect Input Mode | True | Whether to change input mode when associated device is activated. Eg, switch to gamepad when any gamepad button is pressed and switch back to mouse when mouse button clicked. Requires new input system.
Bindings | Object Ref | Bindings to process input for; find descriptions for each default input in the 'Input Processing' guide.

</div>

## Localization

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Localization- (Addressable, Project) | Configuration of the resource loader used with the localization resources.
Languages | Object Ref | RFC5646 language tags mapped to default language display names. Restart Unity editor for changes to take effect.
Source Locale | En | Locale of the source project resources (language in which the project assets are being authored).
Expose Source Locale | True | Whether to make the source locale available to the end-users (players), ie included to the language selection.<br><br>Disabling this option can be useful in case you'd like to share the source localizable text with a third-party (eg, for proofreading), but don't want to share the scenario scripts. In which case, disable this option and add a dedicated locale for the source material, which can then be exported to the localization documents or spreadsheets.
Default Locale | Null | Locale selected by default when running the game for the first time. Will select `Source Locale` when not specified.
Auto Detect Locale | True | When enabled and the game is running for the first time, attempts to automatically detect locale based on system language. When succeeds and the locale is supported by the game, selects it; otherwise falls back to 'Default Locale'.
Record Separator | | | Text character to join common localized script records, such as parts of generic text lines and localizable parameter values.
Annotation Prefix | >  | Text character to insert before annotation lines to distinguish them for the localized text. Annotations are comments optionally added to the generated localization documents to provide additional context for the translators, such as author of the printed text messages, inlined commands and command lines containing localized parameters. Stub character is used to replace localized parts of such annotations, as they're duplicated on the next comment line containing the text to localize.

</div>

## Managed Text

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Text- (Addressable, Project) | Configuration of the resource loader used with the managed text documents.
Multiline Documents | Object Ref | Local resource paths of the managed text documents for which to use multiline format.

</div>

## Movies

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Movies- (Addressable, Project) | Configuration of the resource loader used with movie resources.
Skip On Input | True | Whether to skip movie playback when user activates `cancel` input keys.
Skip Frames | True | Whether to skip frames to catch up with current time.
Fade Duration | 1 | Time in seconds to fade in/out before starting/finishing playing the movie.
Custom Fade Texture | Null | Texture to show while fading. Will use a simple black texture when not specified.
Play Intro Movie | False | Whether to automatically play a movie after engine initialization and before showing the main menu.
Intro Movie Name | Null | Path to the intro movie resource.

</div>

## Resource Provider

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Resource Policy | Conservative | Dictates when the resources are loaded and unloaded during script execution:<br><br> • Conservative — The default mode with balanced memory utilization. All the resources required for script execution are preloaded when starting playback and unloaded when the script has finished playing. Scripts referenced in [@gosub] commands are preloaded as well. Additional scripts can be preloaded by using the `hold` parameter of the [@goto] command.<br><br> • Optimistic — All the resources required by the played script, as well as all resources of the scripts specified in [@goto] and [@gosub] commands, are preloaded and not unloaded unless the `release` parameter is specified in the [@goto] command. This minimizes loading screens and allows smooth rollback, but requires manually specifying when the resources should be unloaded, increasing the risk of out-of-memory exceptions.<br><br> • Lazy — No resources are preloaded for executed scripts when starting playback, and no loading screens are automatically shown. Instead, only the resources required for the next few commands are loaded "on the fly" while the script is playing, and resources used by executed commands are immediately released. This policy requires no scenario planning or manual control and consumes the least memory, but it may result in stutters during gameplay due to resources being loaded in the background—especially when fast-forwarding (skip mode) or performing rollback.
Lazy Buffer | 25 | When lazy resource policy is enabled, controls the size of the preload buffer, that is the maximum number of script commands to preload.
Lazy Priority | Below Normal | When lazy resource policy is enabled, controls the background thread priority where the resources are loaded. Decrease to minimize stutters at the cost of longer load times.
Remove Actors | True | Whether to automatically remove unused actors (characters, backgrounds, text printers and choice handlers) when unloading script resources. Note, that even when enabled, it's still possible to remove actors manually with `@remove` commands at any time.
Log Resource Loading | False | Whether to log resource un-/loading operations.
Enable Build Processing | True | Whether to register a custom build player handle to process the assets assigned as Naninovel resources.<br><br>Warning: In order for this setting to take effect, it's required to restart the Unity editor.
Use Addressables | True | When the Addressable Asset System is installed, enabling this property will optimize asset processing step improving the build time.
Auto Build Bundles | True | Whether to automatically build the addressable asset bundles when building the player. Has no effect when `Use Addressables` is disabled.
Label By Scripts | True | Whether to label all the Naninovel addressable assets by the scenario script path they're used in. When `Bundle Mode` is set to `Pack Together By Label` in the addressable group settings, will result in a more efficient bundle packing.<br><br>Note that script labels will be assigned to all the assets with 'Naninovel' label, which includes assets manually exposed to the addressable resource provider (w/o using the resource editor menus).
Group By Category | False | Whether to create an addressable group per Naninovel resource category: scripts, characters, audio, etc. When disabled, will use single `Naninovel` group for all the resources.
Extra Labels | Null | Addressable provider will only work with assets, that have the assigned labels in addition to `Naninovel` label. Can be used to filter assets used by the engine based on custom criteria (eg, HD vs SD textures).
Local Root Path | %DATA%/Resources | Path root to use for the local resource provider. Can be an absolute path to the folder where the resources are located, or a relative path with one of the available origins:<br> • %DATA% — Game data folder on the target device (UnityEngine.Application.dataPath).<br> • %PDATA% — Persistent data directory on the target device (UnityEngine.Application.persistentDataPath).<br> • %STREAM% — `StreamingAssets` folder (UnityEngine.Application.streamingAssetsPath).<br> • %SPECIAL{F}% — An OS special folder (where F is value from System.Environment.SpecialFolder).
Video Stream Extension | .mp 4 | When streaming videos under WebGL (movies, video backgrounds), specify the extension of the video files.
Project Root Path | Naninovel | Path relative to `Resources` folders, under which the naninovel-specific assets are located.

</div>

## Script Player

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Skip Mode | Read Only | Default skip mode to set when the game is first started.
Skip Time Scale | 10 | Time scale to use when in skip (fast-forward) mode. Set to 1 to disable changing the time scale on skip.
Min Auto Play Delay | 1 | Minimum seconds to wait before executing next command while in auto play mode.
Complete On Continue | True | Whether to instantly complete blocking (`wait!`) commands performed over time (eg, animations, hide/reveal, tint changes, etc) when `Continue` input is activated.
Show Debug On Init | False | Whether to show player debug window on engine initialization.
Wait By Default | False | Whether to wait the played commands when the `wait` parameter is not explicitly specified. Only applicable to the awaitable (asynchronous) commands.<br><br>WARNING: Don't enable in new projects, as this option is kept for backward compatibility and will be removed in the next release.
Show Loading UI | True | Whether to show `ILoadingUI` while a script is pre-/loaded. Allows masking resource loading process with the loading screen.
Resolve Mode | Nearest | The mode in which script player handles missing playback spots when loading state. This may happen when player saved a game amidst a scenario script, which is then changed (eg, via a game update) and the saved playback spot (line and inline indexes) is no longer available.<br> • Nearest — Attempt to play from the nearest next spot; in case no next spots found (script was made shorter), start from nearest previous one. Most forgiving mode, but could cause an undefined behaviour.<br> • Restart — Start playing current script from start. Won't cause undefined behaviour in case all the state is local to scenario script, but player will have to re-play the script form the start.<br> • Error — Throw an error. Choose this option in case undefined behaviour is not acceptable.

</div>

## Scripts

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Scripts- (Addressable, Project) | Configuration of the resource loader used with naninovel script resources.
Script Compiler | Naninovel Script Compiler | IScriptCompiler implementation to use for transforming source scenario text into script assets. Reimport script assets after modifying this setting for changes to take effect.
Compiler Localization |  (Naninovel.Compiler Localization) | Locale-specific NaniScript compiler options. Will propagate to IDE extension on metadata sync. Restart Unity editor and reimport script assets for changes to take effect.
Stable Identification | False | Whether to automatically write identifiers to all the localizable text parameters in imported scripts. Enable to persist associations (eg, localization and voiceover) while editing text content. Re-import the scripts for the change to take effect.
Initialization Script | Null | Local resource path of the script to play right after the engine initialization.
Title Script | Null | Local resource path of the script to play when showing the Title UI. Can be used to setup the title screen scene (background, music, etc).
Start Game Script | Null | Local resource path of the script to play when starting a new game. Will use first available when not specified.
Auto Add Scripts | True | Whether to automatically add created naninovel scripts to the resources.
Auto Resolve Path | True | Whether to automatically resolve and update resource paths whenever scripts are created, renamed or moved.
Hot Reload Scripts | True | Whether to reload modified (both via visual and external editors) scripts and apply changes during play mode without restarting the playback.
Watch Scripts | True | Whether to run a file system watcher over '.nani' files. Required to register script changes when edited with an external application.
Show Script Navigator | False | Whether to auto-show script navigator UI after engine is initialized (requires 'IScriptNavigatorUI' available in UI resources).
Enable Visual Editor | True | Whether to show visual script editor when a script is selected.
Hide Unused Parameters | True | Whether to hide un-assigned parameters of the command lines when the line is not hovered or focused.
Select Played Script | True | Whether to automatically select currently played script when visual editor is open.
Insert Line Key | Space | Hot key used to show 'Insert Line' window when the visual editor is in focus. Set to 'None' to disable.
Insert Line Modifier | Control | Modifier for the 'Insert Line Key'. Set to 'None' to disable.
Indent Line Key | Right Arrow | Hot key used to indent lines. Set to 'None' to disable.
Indent Line Modifier | Control | Modifier for the 'Indent Line Key'. Set to 'None' to disable.
Unindent Line Key | Left Arrow | Hot key used to un-indent lines. Set to 'None' to disable.
Unindent Line Modifier | Control | Modifier for the 'Unindent Line Key'. Set to 'None' to disable.
Save Script Key | S | Hot key used to save (serialize) the edited script when the visual editor is in focus. Set to 'None' to disable.
Save Script Modifier | Control | Modifier for the 'Save Script Key'. Set to 'None' to disable.
Rewind Mouse Button | 0 | When clicked a line in visual editor, which mouse button should activate rewind: '0' is left, '1' right, '2' middle; set to '-1' to disable.
Rewind Modifier | Shift | Modifier for 'Rewind Mouse Button'. Set to 'None' to disable.
Editor Page Length | 300 | How many script lines should be rendered per visual editor page.
Editor Custom Style Sheet | Null | Allows modifying default style of the visual editor.
Graph Orientation | Horizontal | Whether to build the graph vertically or horizontally.
Graph Auto Align Padding | (10.00, 0.00) | Padding to add for each node when performing auto align.
Show Synopsis | True | Whether to show fist comment lines of the script inside the graph node.
Graph Custom Style Sheet | Null | Allows modifying default style of the script graph.
Enable Community Modding | False | Whether to allow adding external naninovel scripts to the build.
External Loader | Scripts- (Local) | Configuration of the resource loader used with external naninovel script resources.

</div>

## Spawn

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Spawn- (Addressable, Project) | Configuration of the resource loader used with spawn resources.

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
Auto Save Slot Mask | Game Auto Save{0:000} | Mask used to name auto save slots.
Save Slot Limit | 99 | Maximum number of save slots.
Quick Save Slot Limit | 18 | Maximum number of quick save slots.
Auto Save Slot Limit | 18 | Maximum number of auto save slots.
Auto Save On Quit | True | Whether to auto-save the game before exiting to title or when the application is closed while not in title menu (doesn't work in editor).
Binary Save Files | True | Whether to compress and store the saves as binary files (.nson) instead of text files (.json). This will significantly reduce the files size and make them harder to edit (to prevent cheating), but will consume more memory and CPU time when saving and loading.
Reset On Goto | False | Whether to reset state of the engine services when loading another script via [@goto] command. Can be used instead of [@resetState] command to automatically unload all the resources on each goto.
Enable State Rollback | True | Whether to enable state rollback feature allowing player to rewind the script backwards.
State Rollback Steps | 1024 | The number of state snapshots to keep at runtime; determines how far back the rollback (rewind) can be performed. Increasing this value will consume more memory.
Saved Rollback Steps | 128 | The number of state snapshots to serialize (save) under the save game slots; determines how far back the rollback can be performed after loading a saved game. Increasing this value will enlarge save game files.
Game State Handler | Naninovel Universal Game State Serializer | Implementation responsible for de-/serializing local (session-specific) game state; see `State Management` guide on how to add custom serialization handlers.
Global State Handler | Naninovel Universal Global State Serializer | Implementation responsible for de-/serializing global game state; see `State Management` guide on how to add custom serialization handlers.
Settings State Handler | Naninovel Universal Settings State Serializer | Implementation responsible for de-/serializing game settings; see `State Management` guide on how to add custom serialization handlers.

</div>

## Text Printers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Printer Id | Dialogue | ID of the text printer to use by default.
Default Base Reveal Speed | 0.5 | Base reveal speed (game settings) to set when the game is first started.
Default Base Auto Delay | 0.5 | Base auto delay (game settings) to set when the game is first started.
Max Reveal Delay | 0.06 | Delay limit (in seconds) when revealing (printing) the text messages. Specific reveal speed is set via `message speed` in the game settings; this value defines the available range (higher the value, lower the reveal speed).
Max Auto Wait Delay | 0.02 | Delay limit (in seconds) per each printed character while waiting to continue in auto play mode. Specific delay is set via `auto delay` in the game settings; this value defines the available range.
Scale Auto Wait | True | Whether to scale the wait time in auto play mode by the reveal speed set in the print commands.
Skip Print Delay | 0 | When above zero, each print command will wait for the specified time (in seconds, unscaled) while the skip playback mode (fast-forward) is enabled. Use to slow down the playback while skipping.
Default Metadata | Object Ref | Metadata to use by default when creating text printer actors and custom metadata for the created actor ID doesn't exist.
Metadata | Object Ref | Metadata to use when creating text printer actors with specific IDs.
Scene Origin | (0.50, 0.00) | Reference point on scene to be considered as origin for the managed actors. Doesn't affect positioning.
Z Offset | 0 | Initial Z-axis offset (depth) from actors to the camera to set when the actors are created.
Z Step | 0 | Distance by Z-axis to set between the actors when they are created; used to prevent z-fighting issues.
Default Duration | 0.35 | Default duration (in seconds) for all the actor modifications (changing appearance, position, tint, etc).
Default Easing | Linear | Easing function to use by default for all the actor modification animations (changing appearance, position, tint, etc).
Auto Show On Modify | False | Whether to automatically reveal (show) an actor when executing modification commands.

</div>

## UI

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
UI Loader | UI- (Addressable, Project) | Configuration of the resource loader used with UI resources.
Font Loader | Fonts- (Addressable, Project) | Configuration of the resource loader used with font resources.
Override Objects Layer | True | Whether to assign a specific layer to all the UI objects managed by the engine. Required for some of the built-in features, eg `Toggle UI`.
Objects Layer | 5 | When `Override Objects Layer` is enabled, the specified layer will be assigned to all the managed UI objects.
Font Options | Object Ref | Font options, that should be available in the game settings UI (in addition to `Default`) for the player to choose from.
Default Font | Null | Font name from `Font Options` to apply by default when the game is first started. When not specified, `Default` font is applied.

</div>

## Unlockables

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Unlockables- (Addressable, Project) | Configuration of the resource loader used with unlockable resources.

</div>

