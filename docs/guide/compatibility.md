# Compatibility

## Unity Version

Minimum supported Unity version is **2019.4**.x; this won't change throughout Naninovel v1.x releases.

In case Unity introduce breaking changes or fix critical issues throughout the 2019.4 release cycle, minimum supported patch version (the ".x" part) could change. You can always find minimum supported Unity version for specific Naninovel release in the [change log](https://github.com/Elringus/NaninovelWeb/releases).

Support for new releases from the [TECH stream](https://blogs.unity3d.com/2018/04/09/new-plans-for-unity-releases-introducing-the-tech-and-long-term-support-lts-streams/) is added once they're out of beta.

::: tip
It's recommended to stay on the latest [2019 LTS stream](https://unity3d.com/unity/qa/lts-releases?version=2019.4) release to minimize production risks.
:::

## UPM Packages

Only verified package versions are officially supported. When installing or updating a package via UPM (unity package manager), make sure it has a "verified" label for the Unity version you're currently using.

![](https://i.gyazo.com/a06f8b0cefff2fc5e578c60cae4ed33f.png)

## Platforms

All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested for compatibility:
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

## Render Pipelines

Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/render-pipelines.html) (both URP and HDRP) are supported with some limitations and require additional setup; see [render pipelines guide](/guide/render-pipelines.md) for more information.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. Either disable the stripping or use the "Low" profile (set by default).
