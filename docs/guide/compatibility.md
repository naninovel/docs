# Compatibility

## Unity Version

Minimum supported and recommended Unity version is [2019.4.35](https://unity3d.com/unity/whats-new/2019.4.35). As a legacy [LTS stream](https://unity.com/releases/lts-vs-tech-stream), it's the most tested and stable to use with the current Naninovel release. Supported Unity versions for other Naninovel releases are specified in the [change logs](https://github.com/Naninovel/Documentation/releases).

::: note
It's not uncommon for Unity to introduce regressions even in LTS patches (let alone minor and major releases), so we highly recommend using the recommended version to minimize production risks.
:::

## UPM Packages

Only verified package versions are supported. When installing or updating a package via Unity's package manager, make sure it has a "verified" label for the Unity version you're currently using.

![](https://i.gyazo.com/a06f8b0cefff2fc5e578c60cae4ed33f.png)

## Platforms

All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested for compatibility and are officially supported by us:
* Standalone: Windows, Mac, Linux
* Mobiles: iOS, Android
* Web: WebGL
* Consoles: Nintendo Switch

::: note
While Unity allows building for numerous other platforms (PlayStation, Xbox, Stadia, etc), some features (eg, save system) may not work out of the box, as access to the platform-specific SDKs is restricted for registered developers only. We don't have the access to such SDKs and are not able to provide support for platforms outside of the list above. Find more information about developing for game consoles in [the article](https://unity.com/how-to/develop-console-video-games-unity).
:::

## Enter Play Mode

Naninovel supports disabling both `Reload Domain` and `Reload Scene` options under "Enter Play Mode Settings" category of the project settings. Disabling the options will make entering play mode take less time, especially in large projects.

![](https://i.gyazo.com/dd0a3037a0bca8b73608ecc7b71c3982.png)

## Render Pipelines

While it's possible to use Nanionvel with Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/render-pipelines.html) (both URP and HDRP), some built-in features may not work out of the box and we won't be able to provide any support in such cases; see [render pipelines guide](/guide/render-pipelines.md) for more information.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. Either disable the stripping or use the "Low" profile (selected by default).

## Exceptions

At least "Explicitly Thrown Exceptions Only" level is required for `Enable Exceptions` option in "Publishing Settings" (selected by default). The setting is only applicable for [WebGl builds](https://docs.unity3d.com/Manual/webgl-building). "None" level is not supported.
