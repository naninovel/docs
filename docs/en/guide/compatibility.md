# Compatibility

## Unity Version

Supported Unity versions: `6.0` and `6.3` LTS releases (with the latest patches).

Non-LTS (tech, beta, and alpha) releases are not supported. Any issues with future Unity releases will be addressed in the next Naninovel versions. Compatible Unity releases for past Naninovel versions are listed in the [release notes](https://pre.naninovel.com/releases).

## Platforms

Naninovel doesn't use any platform-specific APIs, precompiled native libraries, or third-party dependencies. As a result, the engine is expected to be compatible with all platforms Unity can target. However, this also means we don't utilize any native platform capabilities, so you may need to adapt some features for an optimal user experience on exotic platforms, such as VR/XR.

::: info NOTE
While Unity [supports game consoles](https://unity.com/how-to/develop-console-video-games-unity) (PlayStation, Xbox, Switch), the process can be challenging for smaller developers. If you're looking for a publishing partner, we recommend [Sometimes You](https://porting.games), which has a strong track record of bringing Naninovel projects to a wide range of platforms.
:::

## Enter Play Mode

Naninovel supports disabling both `Reload Domain` and `Reload Scene` options under "Enter Play Mode Settings" category of the project settings. Disabling the options will make entering play mode take less time, especially in large projects.

![](https://i.gyazo.com/dd0a3037a0bca8b73608ecc7b71c3982.png)

## Render Pipelines

Both the Universal Render Pipeline (URP) and the legacy built-in render pipeline (BiRP) are fully supported. The High-Definition Render Pipeline (HDRP) is not actively tested and is not recommended; while most Naninovel features will work with HDRP, expect some rendering-specific features — such as the [@trans], [@glitch], and [@bokeh] commands — to not work under HDRP out of the box.

## Text

Legacy (uGUI) text component is not supported by any of the built-in UIs or associated APIs; [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) is used by default.

## Input System

Unity's [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) is supported by default. The legacy Input Manager is not supported. Custom input systems can be implemented by [overriding](/guide/engine-services#overriding-built-in-services) the `IInputManager` engine service.

## Managed Stripping

"Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. Either disable the stripping or use the "Low" profile (selected by default).

## Exceptions

At least "Explicitly Thrown Exceptions Only" level is required for `Enable Exceptions` option in "Publishing Settings" (selected by default). The setting is only applicable for [WebGl builds](https://docs.unity3d.com/Manual/webgl-building). "None" level is not supported.

## Story Editor

The embedded Story Editor requires at least Windows 10 build 1809 with an x86-64 CPU, or macOS 11 (Big Sur) with an Apple Silicon (ARM64) CPU. Linux, as well as ARM-based Windows and x86-based Apple devices, are not supported; however, you can still use the [web version](https://naninovel.com/editor) of the Story Editor on those platforms.
