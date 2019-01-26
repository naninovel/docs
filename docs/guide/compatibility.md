# Requirements and Compatibility

## Unity Version
~~Due to complex nature of the engine, only the latest [LTS (long-term support)]( https://unity3d.com/unity/qa/lts-releases) Unity version is officially supported. Newer versions from the TECH stream could still work, but it’s not recommended to use them in production, as it could take us a while to fix possible compatibility issues.~~

At the moment, **Unity 2018.3** is the minimum supported version; when 2018.4 is released, we'll stick with the initial LTS plan.

Be aware, that .NET 3.5 [scripting runtime](https://docs.unity3d.com/Manual/ScriptingRuntimeUpgrade.html) is not supported and is being deprecated by Unity. Make sure **.NET 4.x Equivalent** scripting runtime version is set in the player settings before importing the package. 

## Platforms
All the engine features are implemented using cross-platform APIs and are expected to be compatible with all the platforms Unity can target. 

The following platforms were tested and are guaranteed to work:
* Standalone: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)
