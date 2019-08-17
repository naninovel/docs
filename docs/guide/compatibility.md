# Compatibility

## Unity Version
While in [beta development stage](https://github.com/Elringus/NaninovelWeb/milestone/1), with every new Naninovel release we're targeting the latest available **stable** (not an alpha or beta) Unity version. You can always find supported Unity versions per Naninovel release on the [GitHub releases page](https://github.com/Elringus/NaninovelWeb/releases). 

In case you need an older Naninovel package, which supports some previous Unity version, you can request one by [contacting the support](/support/).

## Platforms
All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested for compatibility:
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/IL2CPP-BytecodeStripping) profiles are not supported. Either disable the stripping or use the "Low" profile (set by default).
