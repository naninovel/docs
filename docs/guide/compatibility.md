# Compatibility

## Unity Version

Minimum supported Unity version is 2019.4.x; this won't change until the stream is out of maintenance (expected in spring 2022), at which point we'll upgrade to the next LTS version.

In case breaking changes or critical fixes are introduced throughout the release cycle, minimum supported patch version (the ".x" part) could change. You can always find minimum supported Unity version for specific Naninovel release in the [change log](https://github.com/Naninovel/Documentation/releases).

Support for new releases from the [TECH stream](https://blogs.unity3d.com/2018/04/09/new-plans-for-unity-releases-introducing-the-tech-and-long-term-support-lts-streams/) is added once they're out of beta.

::: note
Unity [2019.4.11](https://unity3d.com/unity/whats-new/2019.4.11) is the most tested and stable version to use with Naninovel at the moment. It's not uncommon for Unity to introduce regressions even in LTS patches (let alone minor and major releases), so we highly recommend using this version to minimize production risks.
:::

## UPM Packages

Only verified package versions are supported. When installing or updating a package via UPM (unity package manager), make sure it has a "verified" label for the Unity version you're currently using.

![](https://i.gyazo.com/a06f8b0cefff2fc5e578c60cae4ed33f.png)

## Platforms

All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested for compatibility:
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

::: note
While Unity allows building for game consoles (Switch, PlayStation, Xbox, etc), some features (eg, IO-related) are not implemented out of the box, as access to the platform-specific SDKs is restricted for registered developers only. In Naninovel case, this affects the save system, which will require implementing [custom serialization handlers](/guide/state-management.md#custom-serialization-handlers) in order to work correctly on the consoles. Find more information about developing for game consoles in [the article](https://unity.com/how-to/develop-console-video-games-unity).
:::

## Render Pipelines

Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/render-pipelines.html) (both URP and HDRP) are supported with some limitations and require additional setup; see [render pipelines guide](/guide/render-pipelines.md) for more information.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. Either disable the stripping or use the "Low" profile (set by default).
