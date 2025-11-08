# 渲染管线

Naninovel 支持使用 Unity 的 [可编程渲染管线](https://docs.unity3d.com/Manual/render-pipelines.html)，包括 URP（Universal Render Pipeline）与 HDRP（High Definition Render Pipeline）。不过，这需要进行额外配置，并且某些功能无法开箱即用（参见下方限制说明）。

::: info 注意
目前 SRP 仍然[不完全适用于正式生产环境](https://forum.unity.com/threads/915275)，与 Unity 默认渲染系统相比仍缺少部分功能。**除非你是高级用户，并能自行处理潜在问题与限制，否则不建议使用 SRP。** 对于使用 SRP 时出现的不兼容或未适配问题，**Naninovel 官方不提供支持或指导。**
:::

## 设置步骤

请参考 Unity 官方文档：[Render Pipelines 指南](https://docs.unity3d.com/Manual/render-pipelines.html)，了解如何安装与配置所需的 SRP。

若使用 **URP**，则无需为 Naninovel 进行任何额外配置即可基本运行。

若使用 **HDRP**，由于其不支持摄像机堆叠，请在相机配置菜单中关闭 `Use UI Camera` 选项（该选项默认启用）。

![](https://i.gyazo.com/5b70d18f028d27124bd8f4a25b2df47c.png)

在使用 HDRP 时，请将色彩空间切换为 **Linear**，因为 HDRP 不支持默认项目中的 Gamma 模式。

![](https://i.gyazo.com/2c053a6e3d79f080469787b7f09ee8f3.png)

## 限制

部分内置效果与功能（如景深 Depth of Field、数字干扰 Digital Glitch、以及 [@trans] 指令）可能无法在 SRP 下正常工作，因为它们依赖于某些默认渲染特性。

不过，大多数缺失的效果与功能都可以通过一些 **自定义扩展或替代方案** 实现，无需修改 Naninovel 源码或包内容。你可以参考以下文档来扩展引擎功能：

- [自定义特效（Special Effects）](/zh/guide/special-effects#adding-custom-effects)  
- [自定义指令（Custom Commands）](/zh/guide/custom-commands)