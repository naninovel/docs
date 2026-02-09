# Compatibility

## Unity Version

Supported Unity versions: `6.0` and `6.3` LTS releases (with the latest patches).

Non-LTS (tech, beta, and alpha) releases are not supported. Any issues with future Unity releases will be addressed in the next Naninovel versions. Compatible Unity releases for past Naninovel versions are listed in the [release notes](https://pre.naninovel.com/releases).

## Platforms

The runtime doesn't use any platform-specific APIs, precompiled native libraries, or third-party dependencies. As a result, Naninovel is expected to be compatible with all platforms Unity can target. However, this also means it doesn't utilize any native platform capabilities, so you may need to adapt some features for an optimal user experience on exotic platforms, such as VR/XR.

::: info NOTE
While Unity [supports game consoles](https://unity.com/how-to/develop-console-video-games-unity) (PlayStation, Xbox, Switch), the process can be challenging for smaller developers. If you're looking for a publishing partner, we recommend [Sometimes You](https://porting.games), which has a strong track record of bringing Naninovel projects to a wide range of platforms.
:::

## Enter Play Mode

Naninovel supports disabling both the `Reload Domain` and `Reload Scene` options under the "Enter Play Mode Settings" category in the project settings. Disabling these options will reduce the time it takes to enter play mode, especially in large projects.

![](https://i.gyazo.com/bf1a91f7ad04f0823e72c9feb4f67f0a.png)

## Render Pipelines

Both the Universal Render Pipeline (URP) and the legacy built-in render pipeline (BiRP) are fully supported. The High-Definition Render Pipeline (HDRP) is not actively tested and is not recommended. While most Naninovel features will work with HDRP, some rendering-specific features — such as the [@trans], [@glitch], and [@bokeh] commands — may not work under HDRP out of the box.

## GUI

UI Toolkit can be used with [an adapter](/guide/gui#ui-toolkit), but it is not recommended and is not supported by the built-in UI system. All built-in UIs and the underlying scripts are authored using Unity's default [uGUI system](https://docs.unity3d.com/Packages/com.unity.ugui@latest). All the text is based on the built-in [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) component.

## Input System

Unity's [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) is supported by default. The legacy Input Manager is not supported. Custom input systems (such as Rewired) can be implemented by [overriding](/guide/engine-services#overriding-built-in-services) the `IInputManager` engine service.

## Managed Stripping

The "Medium" and "High" [managed bytecode stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) profiles are not supported. You should either disable stripping or use the "Low" profile, which is selected by default.

## Exceptions

At least the "Explicitly Thrown Exceptions Only" level is required for the `Enable Exceptions` option in "Publishing Settings" (selected by default); the "None" level is not supported. This setting applies only to [WebGL builds](https://docs.unity3d.com/Manual/webgl-building).

## Story Editor

The embedded [Story Editor](/guide/editor) requires at least Windows 10 build 1809 with an x86-64 CPU, or macOS 11 (Big Sur) with an Apple Silicon (ARM64) CPU. Linux, as well as ARM-based Windows and x86-based Apple devices, are not supported; however, you can still use the [web version](https://naninovel.com/editor) of the Story Editor on those platforms.
