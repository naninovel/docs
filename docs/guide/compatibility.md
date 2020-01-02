# Compatibility

## Beta

Be aware, that the engine is currently in [beta development stage](https://github.com/Elringus/NaninovelWeb/milestone/1). There is a high probability of changes that could lead to incompatibility with the previous versions, require to re-write scenario scripts or re-setup configuration assets. Please take those risks into consideration when planning to use the engine for a project in production stage. 

## Unity Version

Minimum supported Unity version is **2019.3**; this won't change throughout Naninovel v1.x releases. Support for new releases from the [TECH stream](https://blogs.unity3d.com/2018/04/09/new-plans-for-unity-releases-introducing-the-tech-and-long-term-support-lts-streams/) is added once they're out of the beta.

It's recommended to stick with the LTS stream (Unity 2019.4 LTS release is expected in spring 2020) to minimize production risks.

## Platforms

All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested for compatibility:
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

## Render Pipelines

Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/ScriptableRenderPipeline.html) (both URP and HDRP) are supported with some limitations and require additional setup; see [render pipelines guide](/guide/render-pipelines.md) for more information.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/IL2CPP-BytecodeStripping) profiles are not supported. Either disable the stripping or use the "Low" profile (set by default).
