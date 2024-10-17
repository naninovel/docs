# Compatibility

## Unity Version

Supported Unity versions range: `2022.3.45 - 6`

Any issues with the future Unity releases will be addressed in the next Naninovel releases. Compatible Unity versions for past Naninovel releases are specified in the [release notes](https://pre.naninovel.com/releases).

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

::: info NOTE
While Unity allows building for many other platforms (PlayStation, Xbox, Stadia, etc), some features (eg, save system) may not work out of the box, as access to the platform-specific SDKs is restricted for registered developers only. We don't have the access to such SDKs and are not able to provide support for platforms outside the list above. Find more information in [the article](https://unity.com/how-to/develop-console-video-games-unity).
:::

## Enter Play Mode

Naninovel supports disabling both `Reload Domain` and `Reload Scene` options under "Enter Play Mode Settings" category of the project settings. Disabling the options will make entering play mode take less time, especially in large projects.

![](https://i.gyazo.com/dd0a3037a0bca8b73608ecc7b71c3982.png)

## Render Pipelines

While it's possible to use Nanionvel with Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/render-pipelines.html) (both URP and HDRP), some built-in features may not work out of the box and we won't be able to provide any support in such cases; see [render pipelines guide](/guide/render-pipelines) for more information.

## Text

Legacy (uGUI) text component is not supported by any of the built-in UIs or associated APIs; [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) is used by default.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. Either disable the stripping or use the "Low" profile (selected by default).

## Exceptions

At least "Explicitly Thrown Exceptions Only" level is required for `Enable Exceptions` option in "Publishing Settings" (selected by default). The setting is only applicable for [WebGl builds](https://docs.unity3d.com/Manual/webgl-building). "None" level is not supported.
