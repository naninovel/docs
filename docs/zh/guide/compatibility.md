# 兼容性

## Unity Version

支持的 Unity 版本范围: `2022.3.61 - 6000.0`

此范围内只有LTS版本收到支持。未来 Unity 版本中出现的任何问题都会在下一次 Naninovel 发布中得到修复。
过去版本所兼容的 Unity 版本请参阅 [更新日志](https://pre.naninovel.com/releases)。

## 平台支持

Naninovel 不使用任何特定平台的 API、预编译的本地库或第三方依赖。因此，该引擎预计可以兼容所有 Unity 支持的目标平台。
不过，这也意味着我们不会利用任何原生平台功能，因此在某些特殊平台（如 VR/XR）上，你可能需要对部分功能进行适配，以便为用户提供最佳的使用体验。

::: info 注意
虽然 Unity [支持主机平台](https://unity.com/how-to/develop-console-video-games-unity)（PlayStation、Xbox、Switch），但对于中小型开发者而言，这一过程可能会较为困难。如果你正在寻找发行合作伙伴，我们推荐 [Sometimes You](https://porting.games)，他们在将 Naninovel 项目移植到多种平台方面拥有丰富经验和良好口碑。
[呐呐呐制作组](https://nanana.cn/)亦向国内 Naninovel 用户提供安卓、iOS、Xbox主机等平台的[游戏移植服务](https://nanana.cn/article/contact)。
:::

## 进入播放模式

Naninovel 支持在项目设置中的 “Enter Play Mode Settings” 分类下关闭 `Reload Domain` 和 `Reload Scene` 选项。  
关闭这些选项可以显著缩短进入播放模式所需的时间，特别是在大型项目中。

![](https://i.gyazo.com/dd0a3037a0bca8b73608ecc7b71c3982.png)

## 渲染管线

虽然 Naninovel 可以与 Unity 的 [可编程渲染管线（SRP）](https://docs.unity3d.com/Manual/render-pipelines.html)（包括 URP 与 HDRP）一起使用，  
但部分内置功能可能无法直接正常运行。在这种情况下，我们无法提供官方支持。有关更多信息，请参阅 [渲染管线指南](/zh/guide/render-pipelines)。

## 文本

旧版的 uGUI 文本组件不被任何内置 UI 或相关 API 支持；系统默认使用 [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html)。

## 输入系统

Unity 的 [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) 在 Naninovel 中默认启用。旧版的 Input Manager 不受支持。如需自定义输入系统，可通过 [重写](/zh/guide/engine-services#overriding-built-in-services) `IInputManager` 引擎服务来实现。

## 托管代码剥离

“中（Medium）”和“高（High）”级别的 [托管字节码剥离](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) 不受支持。请关闭剥离功能或使用默认的“低（Low）”级别。

## 异常处理

在“Publishing Settings”中的 `Enable Exceptions` 选项，至少需要设置为 “Explicitly Thrown Exceptions Only” （默认选中）。该设置仅适用于 [WebGL 构建](https://docs.unity3d.com/Manual/webgl-building)。“不启用（None）”级别不受支持。