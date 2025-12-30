# Resource Providers

Resource providers are used to retrieve Naninovel-related assets (appearance textures, BGM clips, etc.) at runtime, in accordance with the [memory management](/guide/memory-management) needs. Each provider specializes in retrieving the assets from a specific source: project's "Resources" folders, Unity's addressable asset system, local file storage, etc.

Providers' general behavior can be configured via `Naninovel -> Configuration -> Resource Provider` menu.

![](https://i.gyazo.com/b895b71462d39352931609bcf2115711.png)

`Resource Policy` property dictates when the resources are loaded and unloaded during script execution. Refer to [memory management](/guide/memory-management) guide for more info.

When `Log Resources Loading` is enabled, various provider-related log messages will be mirrored to the default loading screen UI.

`Enable Build Processing` enables a build pre-processing procedure required to ensure assets assigned via editor menus are available in the builds. Disabling the processing may be required if you're using a [custom build environment](/guide/custom-build-environment) or attaching your own build hooks. When enabling or disabling the property, restart Unity editor in order for the change to take effect.

When [addressable system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is installed, enabling `Use Addressables` will optimize the asset processing step improving the build time; enabling `Auto Build Bundles` at the same time will cause asset bundles to automatically compile when building the player.

Other properties in the configuration menu are provider-specific and described below.

Resource-specific providers behavior is configured via `Loader` properties, available in the corresponding configuration menus. For example, here is the default loader configuration used to retrieve audio resources (BGM and SFX):

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix` property allows specifying an additional path over provider's root path for the specific type of resources. E.g., given we're going to retrieve an "Explosion" audio file from a project's "Resources" folder, setting path prefix to "Audio" will result in the following resource request: `Resources.Load("Audio/Explosion")`.

`Providers List` allows specifying which provider types to use and in which order. E.g., in the above example, when requesting an audio resource, first an "Addressable" provider will be used, and in case the provider won't be able to find the requested resource, the "Project" provider will be used.

Be aware that **while in editor a special "Editor" resource provider is always used first** (no matter the loader configuration). The provider has access to all the resources assigned via Naninovel's configuration and resource manager menus (`Naninovel -> Resources -> ...`). When the game is built, all such resources are automatically copied to a temporary "Resources" folder or (when [addressable system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is installed and enabled) registered in the addressables configuration and compiled to asset bundles. Remember to **always perform any provider-related tests in builds**, not in the Unity editor.

## Addressable

The [Addressable Asset system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) is a Unity package allowing to load assets by "address". It uses asynchronous loading to support loading from any location (local storage, remote web hosting, etc.) with any collection of dependencies. Consult Unity's documentation on how to set up, configure and use the system.

Naninovel will automatically use addressables when the package is installed in the project and `Use Addressables` property is enabled in resource provider configuration. No additional setup is required. All the assets assigned in the Naninovel's configuration menus (eg, scenario scripts, character sprites, audio clips, etc) will be registered with the system (assigned an address) when building the player.

In case you wish to configure how the Naninovel assets are served (eg, specify a remote web host), edit Naninovel groups via `Window -> Asset Management -> Addressables -> Groups` menu. The groups are automatically created when first building the game; in case they're missing, you can create them manually.

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
Asset records under Naninovel addressable groups are automatically generated on each build. Don't edit the records manually, as any changes will be lost on build. However, all the group settings are preserved.
:::

### Category Groups

By default, `Group By Category` option in resource provider configuration is disabled, which results in all the Naninovel assets end up under a single "Naninovel" group. In case you wish to group the resources by category (eg, to specify individual packing or serving options), enable the property and re-build. When enabled, each resource category (eg, scripts, audio, characters, etc) will be added under their own addressable group named "Naninovel-*Category*", where *Category* is the category of the resource.

![](https://i.gyazo.com/80938ca5ca1021e8a71f783eef516d15.png)

### Manual Assignment

To expose an addressable asset to Naninovel without using editor menus, use a custom addressable group; group can have any name, except it can't start with the reserved "Naninovel" (otherwise, it'll be recognized as an auto-generated and will be cleared on build). Address of the exposed assets should start with "Naninovel/" and they should have a "Naninovel" label assigned. You can specify additional labels to filter the assets used by Naninovel via `Extra Labels` property in resource provider configuration menu.

::: tip EXAMPLE
Check the [addressable sample](/guide/samples#addressable) on how to manually register Naninovel resources via addressable provider (without using resource editor menus) and serve the assets from a remote host. You may also find the Unity [learning materials](https://learn.unity.com/course/get-started-with-addressables) useful.
:::

### Script Labels

Due to an [unfortunate Unity design decision](https://github.com/naninovel/docs/issues/159), addressable assets are not unloaded from the memory until the entire asset bundle is unloaded. This means, unless you properly organize the bundles, all the assets may end up in a single bundle and will never unload once loaded, potentially causing out of memory exceptions.

Easiest solution would be setting `Bundle Mode` in the [group settings](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html) to `Pack Separately`:

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

— this will make each asset have its own bundle, allowing to unload it as soon as it's released. While optimal from the RAM usage perspective, this will result in a CPU overhead and increase load times, as it's much faster to load one large continuous binary blob compared to seeking and constantly loading/unloading many small ones, especially on slower hard drives.

When `Label By Scripts` is enabled in resource provider configuration (the default), Naninovel will utilize a compromise solution: when building the player, it will scan all the scenario scripts and attempt to figure which assets are required by the script; it'll then assign labels to the addressable assets by the scripts they're used in:

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

— if you then set `Bundle Mode` to `Pack Together By Label` (the default), the assets will be split between bundles based on the affinity to the scenario scripts, which will optimize the bundle's structure to the Naninovel's [memory management policy](/guide/memory-management).

::: info NOTE
All the Naninovel assets are subject to the labeling, including the assets [assigned manually](/guide/resource-providers#manual-assignment), without using the resource editor menus. As long as asset has `Naninovel` label, it'll be labeled with the associated script.
:::

The labeling process requires a degree of guessing, however, and is not always possible. To make sure most assets are labeled correctly, follow the guidelines:

- Don't use [expressions](/guide/script-expressions) in parameters of the resource context, such as actor IDs, appearances, audio paths, etc. Expressions are evaluated just before the command is executed, which makes it impossible to resolve the final path when building the player. Naninovel will warn you when it detects such cases when building the player.
- Always specify actor IDs and appearances in commands like [@char] and [@back]; while such commands may not require these parameters and will fall back to default values, it's not always possible to resolve the defaults when building.
- When creating [custom commands](/guide/custom-commands), apply [resource context attributes](/guide/ide-extension#ide-attributes) to the parameters which reference the resources. For example, if your custom command has a parameter that accepts an actor ID, apply `[ActorContext]` to the parameter's field. While such attributes are mostly used by the IDE extension to provide auto-complete, labeling tool uses them as well to resolve the asset address.

## Project

Project provider serves the assets located in "Resources" folders of your Unity project. Consult Unity's guide for more information regarding the project [resources loading API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime).

::: warning
In most cases [using "Resources" folders is discouraged](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html). Consider assigning the resources via a Naninovel resource manager menu when possible or use an addressable system instead; remember to move the asset out of a "Resources" folder after that.
:::

## Local

Local provider allows serving simple (scenario scripts and managed text, sprite characters and backgrounds, audio) assets from an arbitrary location in the local file system.

::: info NOTE
Local provider loads raw files from the file system and converts them at runtime, which is slow and limits the supported file types compared to other providers. Only use it in development or for specific features (eg, [community modding](/guide/community-modding)).
:::

Supported file formats:

- `.nani` plain text files for scenario scripts
- `.png` and `.jpg` for images/textures
- `.wav` (PCM16 44100Hz stereo only) for audio

::: tip
Add more supported file formats by overriding `IResourceProviderManager` [engine service](/guide/engine-services#overriding-built-in-services) and adding a custom converter for the local provider.

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

`Local Path Root` property in the resource provider configuration should point to a folder, where the local resources are stored. You can either use an absolute (eg, `C:\Resources`) or a relative path, starting with one of the following origins:

- `%DATA%` — Game data folder on the target device ([Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath));
- `%PDATA%` — Persistent data directory on the target device ([Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath));
- `%STREAM%` — "StreamingAssets" folder ([Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath));
- `%SPECIAL{F}%` — An OS special folder, where `F` is the name of a [special folders enum](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) value.

Default `%DATA%/Resources` value points to a "Resources" folder inside game's data directory (which is different depending on the target platform).

As one of the usage examples, let's say you want to load naninovel scripts from a `C:/Users/Admin/Dropbox/MyGame/Scripts` folder, which you share with collaborators to author the scenario. While it's possible to just specify an absolute path to the root folder (`C:/Users/Admin/Dropbox/MyGame`), that will require all your collaborators to also store the folder by the exact same path (under the same drive label and username). Instead, use the following relative path over a "UserProfile" special folder origin: `%SPECIAL{UserProfile}%/Dropbox/MyGame`.

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

Given path prefix under scripts configuration is set to `Scripts` and local provider is added to the list, script navigator (accessible with `nav` [console command](/guide/development-console)) should now pick up any ".nani" text files stored under the folder.

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## Custom Providers

It's possible to add a custom implementation of a resource provider and make Naninovel use it with (or instead of) built-in providers.

To add a custom provider, create a C# class with a parameterless constructor and implement `IResourceProvider` interface. Once created, a custom provider type will appear in all the loader configuration menus along with the built-in types.

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

You can find built-in resource provider implementations at `Naninovel/Runtime/Common/ResourceProvider` package directory; feel free to use them as a reference when implementing your own versions.

Below is an example of a custom provider that does nothing but logs messages when used.

```csharp
using Naninovel;
using System;
using System.Collections.Generic;

public class CustomResourceProvider : IResourceProvider
{
    public event Action<float> OnLoadProgress;
    public event Action<string> OnMessage;

    public bool IsLoading => default;
    public float LoadProgress => default;
    public IEnumerable<Resource> LoadedResources => default;

    public Resource<T> GetLoadedResourceOrNull<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"GetLoadedResourceOrNull: {path}");
        return default;
    }

    public Awaitable<Resource<T>> LoadResource<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResource: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public Awaitable<IEnumerable<Resource<T>>> LoadResources<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResources: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public Awaitable<IEnumerable<Folder>> LocateFolders (string path)
    {
        OnMessage?.Invoke($"LocateFolders: {path}");
        return default;
    }

    public Awaitable<IEnumerable<string>> LocateResources<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LocateResources: {path}");
        return default;
    }

    public Awaitable<bool> ResourceExists<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"ResourceExists: {path}");
        return default;
    }

    public bool ResourceLoaded (string path)
    {
        OnMessage?.Invoke($"ResourceLoaded: {path}");
        return default;
    }

    public bool ResourceLoading (string path)
    {
        OnMessage?.Invoke($"ResourceLoading: {path}");
        return default;
    }

    public bool SupportsType<T> ()
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"SupportsType: {typeof(T).Name}");
        return default;
    }

    public void UnloadResource (string path)
    {
        OnMessage?.Invoke($"UnloadResource: {path}");
    }

    public void UnloadResources ()
    {
        OnMessage?.Invoke("UnloadResources");
    }
}
```
