# Resource Providers

Resource providers are used to retrieve Naninovel-related assets (appearance textures, BGM clips, etc.) at runtime, in accordance with the [memory management](/guide/memory-management) needs. Each provider specializes in retrieving assets from a specific source: the project's "Resources" folders, Unity's addressable asset system, local file storage, etc.

Providers' general behavior can be configured via the `Naninovel -> Configuration -> Resource Provider` menu.

![](https://i.gyazo.com/b895b71462d39352931609bcf2115711.png)

`Resource Policy` property dictates when the resources are loaded and unloaded during script execution. Refer to the [memory management](/guide/memory-management) guide for more info.

When `Log Resources Loading` is enabled, various provider-related log messages will be mirrored to the default loading screen UI.

`Enable Build Processing` turns on a build pre-processing step required to ensure assets assigned via editor menus are available in builds. You may need to disable this processing if you're using a [custom build environment](/guide/custom-build-environment) or attaching your own build hooks. After enabling or disabling the property, restart the Unity editor for the change to take effect.

When the [Addressables system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is installed, enabling `Use Addressables` will optimize the asset processing step and improve build time; enabling `Auto Build Bundles` at the same time will cause asset bundles to be compiled automatically when building the player.

Other properties in the configuration menu are provider-specific and are described below.

Resource-specific provider behavior is configured via `Loader` properties available in the corresponding configuration menus. For example, here is the default loader configuration used to retrieve audio resources (BGM and SFX):

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix` property allows specifying an additional path over the provider's root path for a specific type of resources. For example, if we're going to retrieve an "Explosion" audio file from a project's "Resources" folder and set the path prefix to `Audio`, the resulting resource request will be `Resources.Load("Audio/Explosion")`.

`Providers List` allows specifying which provider types to use and in which order. For example, in the configuration above, when requesting an audio resource, the Addressable provider will be tried first; if it can't find the requested resource, the Project provider will be used as a fallback.

Be aware that while in the editor a special "Editor" resource provider is always used first (no matter the loader configuration). This provider has access to all the resources assigned via Naninovel's configuration and resource manager menus (`Naninovel -> Resources -> ...`). When the game is built, such resources are automatically copied to a temporary "Resources" folder or (when the [Addressables system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is installed and enabled) registered in the Addressables configuration and compiled to asset bundles. Remember to always perform any provider-related tests in builds, not in the Unity editor.

## Addressable

The [Addressable Asset system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is a Unity package that allows loading assets by "address." It uses asynchronous loading to support loading from any location (local storage, remote web hosting, etc.) with arbitrary collections of dependencies. Consult Unity's documentation on how to set up, configure, and use the system.

Naninovel will automatically use Addressables when the package is installed in the project and the `Use Addressables` property is enabled in the resource provider configuration. No additional setup is required: all assets assigned in Naninovel's configuration menus (e.g., scenario scripts, character sprites, audio clips) will be registered with the system (assigned an address) when building the player.

If you wish to configure how Naninovel assets are served (for example, to specify a remote web host), edit Naninovel groups via `Window -> Asset Management -> Addressables -> Groups`. Addressable groups are automatically created when first building the game; if they're missing, you can create them manually.

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
Asset records under Naninovel addressable groups are automatically generated on each build. Don't edit the records manually, as any changes will be lost on the next build. Group settings, however, are preserved.
:::

### Category Groups

By default, the `Group By Category` option in the resource provider configuration is disabled, causing all Naninovel assets to end up under a single "Naninovel" group. If you wish to group resources by category (e.g., to specify individual packing or serving options), enable the property and rebuild. When enabled, each resource category (scripts, audio, characters, etc.) will be added under its own addressable group named `Naninovel-*Category*`, where *Category* is the resource category.

![](https://i.gyazo.com/80938ca5ca1021e8a71f783eef516d15.png)

### Manual Assignment

To expose an addressable asset to Naninovel without using editor menus, use a custom addressable group. The group can have any name, except it must not start with the reserved `Naninovel` prefix (otherwise it will be recognized as auto-generated and cleared on build). Addresses of exposed assets should start with `Naninovel/` and they should have a `Naninovel` label assigned. You can specify additional labels to filter the assets used by Naninovel via the `Extra Labels` property in the resource provider configuration menu.

::: tip EXAMPLE
Check the [addressable sample](/guide/samples#addressable) for an example of manually registering Naninovel resources via the Addressable provider (without using the resource editor menus) and serving the assets from a remote host. You may also find Unity's [learning materials](https://learn.unity.com/course/get-started-with-addressables) useful.
:::

### Script Labels

Due to an [unfortunate Unity design decision](https://github.com/naninovel/docs/issues/159), Addressable assets are not unloaded from memory until the entire asset bundle is unloaded. This means, unless you organize bundles properly, assets may end up in a single bundle and never unload once loaded, potentially causing out-of-memory exceptions.

The simplest solution is to set `Bundle Mode` to `Pack Separately` in the [group settings](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html):

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

This makes each asset its own bundle, allowing it to be unloaded as soon as it's released. While optimal for RAM usage, this approach increases CPU overhead and load times, because it's much faster to load one large continuous binary blob than to repeatedly seek and load many small ones, especially on slower drives.

When `Label By Scripts` is enabled in the resource provider configuration (the default), Naninovel will use a compromise: during the build process it scans all scenario scripts, tries to determine which assets are required by each script, and assigns labels to addressable assets by the scripts that reference them:

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

If you set `Bundle Mode` to `Pack Together By Label` (the default), assets will be split into bundles based on their affinity to scenario scripts, which optimizes bundle structure for Naninovel's [memory management policy](/guide/memory-management).

::: info NOTE
All Naninovel assets are subject to labeling, including assets [assigned manually](/guide/resource-providers#manual-assignment) via addressables. As long as an asset has the `Naninovel` label, it will be labeled with the associated script.
:::

The labeling process requires a degree of guessing and isn't always perfect. To help ensure assets are labeled correctly, follow these guidelines:

- Don't use [expressions](/guide/script-expressions) in parameters of resource contexts, such as actor IDs, appearances, audio paths, etc. Expressions are evaluated just before the command is executed, which makes it impossible to resolve the final path at build time. Naninovel will warn you when it detects such cases during the build.
- Always specify actor IDs and appearances in commands like [@char] and [@back]; while such commands may fall back to defaults, it's not always possible to resolve those defaults at build time.
- When creating [custom commands](/guide/custom-commands), apply [resource context attributes](/guide/ide-extension#ide-attributes) to parameters that reference resources (for example, apply `[ActorContext]` to a parameter that accepts an actor ID). These attributes are primarily used by the IDE extension for autocomplete, but the labeling tool also uses them to resolve asset addresses.

## Project

The Project provider serves assets located in "Resources" folders inside your Unity project. Consult Unity's guide for more information regarding the project [resources loading API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime).

::: warning
In most cases, [using "Resources" folders is discouraged](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html). Consider assigning resources via a Naninovel resource manager menu when possible or using the Addressables system instead; remember to move the asset out of a "Resources" folder after that.
:::

## Local

The Local provider allows serving simple assets (scenario scripts and managed text, sprite characters and backgrounds, audio) from an arbitrary location in the local file system.

::: info NOTE
The Local provider loads raw files from the file system and converts them at runtime, which is slow and limits the supported file types compared to other providers. Only use it in development or for specific features (e.g., [community modding](/guide/resource-providers#community-modding)).
:::

Supported file formats:

- `.nani` plain text files for scenario scripts
- `.png` and `.jpg` for images/textures
- `.wav` (PCM16 44100Hz stereo only) for audio

::: tip
Add more supported file formats by overriding the `IResourceProviderManager` [engine service](/guide/engine-services#overriding-built-in-services) and adding a custom converter for the Local provider.

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

`Local Path Root` property in the resource provider configuration should point to the folder where local resources are stored. You can use either an absolute path (e.g., `C:\Resources`) or a relative path that starts with one of the following origins:

- `%DATA%` — Game data folder on the target device ([Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath));
- `%PDATA%` — Persistent data directory on the target device ([Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath));
- `%STREAM%` — "StreamingAssets" folder ([Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath));
- `%SPECIAL{F}%` — An OS special folder, where `F` is the name of a [special folders enum](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) value.

The default `%DATA%/Resources` value points to a "Resources" folder inside the game's data directory (the exact location differs by target platform).

As one usage example, suppose you want to load scenario scripts from `C:/Users/Admin/Dropbox/MyGame/Scripts`, which you share with collaborators to author the scenario. Specifying the absolute root folder (`C:/Users/Admin/Dropbox/MyGame`) would require all collaborators to store the folder at the exact same path. Instead, use a relative path over a "UserProfile" special folder origin: `%SPECIAL{UserProfile}%/Dropbox/MyGame`.

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

If the path prefix under scripts configuration is set to `Scripts` and the Local provider is added to the list, the script navigator (accessible with `nav` console command) should pick up any `.nani` text files stored under the folder.

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## Custom Providers

It's possible to add a custom implementation of a resource provider and make Naninovel use it with (or instead of) built-in providers.

To add a custom provider, create a C# class with a parameterless constructor and implement the `IResourceProvider` interface. Once created, a custom provider type will appear in all the loader configuration menus along with the built-in types.

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

You can find built-in resource provider implementations at the `Naninovel/Runtime/Common/ResourceProvider` package directory; feel free to use them as a reference when implementing your own providers.

## Community Modding

Community modding allows players to modify the build by adding their own scenarios and resources while still having access to the game's built-in resources.

To activate the feature, enable the `Enable Community Modding` property in the Scripts configuration UI (Naninovel -> Configuration -> Scripts) and set up a [Local](/guide/resource-providers#local) provider for any resources you want to expose for modding. Make sure the Local provider's root path is set to the default value (`%DATA%/Resources`) so it will look for resources under the build directory.

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

When the feature is enabled, an "EXTERNAL SCRIPTS" button appears in the title menu and opens the external scripts browser. While in the editor, the browser will also list scenario scripts from the project assets.

Note that the `External Loader` configuration controls which scripts are shown in the external scripts browser, while the `Loader` configuration controls loading of the actual script resources. The External Loader uses a Local provider by default, so it only looks for scripts in the game build directory. For other resource types (backgrounds, characters, etc.) you must manually set up Local providers in the corresponding configuration menus to allow players to add them.

To add external resources to the build, drop them into subfolders under the game's `Resources` directory that correspond to the resource's `Path Prefix` property configured in the `Loader` foldout. For example, to add an external scenario script, drop it into `GameFolder/GameName_Data/Resources/Scripts`; backgrounds go to `GameFolder/GameName_Data/Resources/Backgrounds`, and so on. *GameFolder* and *GameName* depend on the name of your Unity project.

The external scripts browser UI can be customized or completely replaced using the [UI Customization](/guide/gui#ui-customization) feature.
