# 渲染管线

Unity的 [可编程渲染管线](https://docs.unity3d.com/Manual/render-pipelines.html) (URP和HDRP) 部分支持需要额外设置。


::: warning
SRPs仍不完善（虽然官方说已可用于开发），并缺少许多功能相比于默认渲染系统。不推荐使用该系统，除非你是高级用户，有准备解决潜在问题和技术问题。
:::

## 安装
请参阅有关如何安装和配置所选SRP 的[官方文档](https://docs.unity3d.com/Manual/render-pipelines.html)

URP和HDRP均不支持多台摄像机，因此需要在摄像机配置菜单中将 `Use UI Camera` 禁用（默认情况下启用）。

![](https://i.gyazo.com/5b70d18f028d27124bd8f4a25b2df47c.png)

在HDRP下运行时，请将颜色空间更改为线性（HDRP不支持默认设置的伽玛模式）。

![](https://i.gyazo.com/2c053a6e3d79f080469787b7f09ee8f3.png)

## 限制

部分内置效果和特性（比如，景深，数字故障， [@startTrans] 和 [@finishTrans] 命令）不能在SRPs下正常工作因为缺少部分渲染特性。可用各种方法在不修改Naninovel源码或资源包内容的情况下，替换大多数丢失效果和特性。有关在这方面扩展引擎的更多信息，请参见[特殊效果](/zh/guide/special-effects#添加自定义效果)和[自定义命令](/zh/guide/custom-commands) 指南。
