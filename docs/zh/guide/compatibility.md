# 兼容性

## Unity 版本

支持的 Unity 版本：`6.0` 和 `6.3` LTS 版本（带有最新补丁）。

不支持非 LTS（技术、测试和 alpha）版本。未来 Unity 版本的任何问题将在下一个 Naninovel 版本中解决。过去 Naninovel 版本的兼容 Unity 版本列在 [发行说明](https://pre.naninovel.com/releases) 中。

## 平台

运行时不使用任何特定于平台的 API、预编译的本机库或第三方依赖项。因此，预计 Naninovel 与 Unity 可以定位的所有平台兼容。然而，这也意味着它不利用任何本机平台功能，因此您可能需要调整某些功能以在 VR/XR 等特殊平台上获得最佳用户体验。

::: info NOTE
虽然 Unity [支持主机平台](https://unity.com/how-to/develop-console-video-games-unity)（PlayStation、Xbox、Switch），但对于中小型开发者而言，这一过程可能会较为困难。如果你正在寻找发行合作伙伴，[呐呐呐制作组](https://nanana.cn/)亦向国内 Naninovel 用户提供安卓、iOS、Xbox 主机等平台的[游戏移植服务](https://nanana.cn/article/contact)。
:::

## 进入播放模式

Naninovel 支持禁用项目设置中 "Enter Play Mode Settings" 类别下的 `Reload Domain` 和 `Reload Scene` 选项。禁用这些选项将减少进入播放模式所需的时间，尤其是在大型项目中。

![](https://i.gyazo.com/bf1a91f7ad04f0823e72c9feb4f67f0a.png)

## 渲染管线

完全支持 Universal Render Pipeline (URP) 和旧版内置渲染管线 (BiRP)。High-Definition Render Pipeline (HDRP) 未经积极测试，不建议使用。虽然大多数 Naninovel 功能可以在 HDRP 下工作，但某些特定于渲染的功能 — 例如 [@trans]、[@glitch] 和 [@bokeh] 命令 — 可能无法在 HDRP 下开箱即用。

## GUI

UI Toolkit 可以与 [适配器](/zh/guide/gui#ui-toolkit) 一起使用，但不建议这样做，并且内置 UI 系统不支持它。所有内置 UI 和底层脚本均使用 Unity 的默认 [uGUI 系统](https://docs.unity3d.com/Packages/com.unity.ugui@latest) 编写。所有文本均基于内置的 [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) 组件。

## 输入系统

默认支持 Unity 的 [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest)。不支持旧版 Input Manager。可以通过 [覆盖](/zh/guide/engine-services#覆盖内置服务) `IInputManager` 引擎服务来实现自定义输入系统（例如 Rewired）。

## 托管代码剥离

不支持 "Medium" 和 "High" [托管字节码剥离](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) 配置文件。您应该禁用剥离或使用默认选择的 "Low" 配置文件。

## 异常

"Publishing Settings" 中的 `Enable Exceptions` 选项（默认选择）至少需要 "Explicitly Thrown Exceptions Only" 级别；不支持 "None" 级别。此设置仅适用于 [WebGL 构建](https://docs.unity3d.com/Manual/webgl-building)。

## 故事编辑器

嵌入式 [故事编辑器](/zh/guide/editor) 至少需要带有 x86-64 CPU 的 Windows 10 build 1809，或带有 Apple Silicon (ARM64) CPU 的 macOS 11 (Big Sur)。不支持 Linux 以及基于 ARM 的 Windows 和基于 x86 的 Apple 设备；但是，您仍然可以在这些平台上使用 [Web 版本](https://naninovel.com/editor) 的故事编辑器。
