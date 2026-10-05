# 自定义 Actor 着色器

在渲染大多数角色和背景 Actor（通用实现除外）时，会使用特殊着色器来处理半透明过度绘制并支持各种过渡效果。

您可以通过将材质分配给 Actor 配置菜单中的 `Custom Texture Material` 属性来覆盖默认着色器。

![](https://i.gyazo.com/8b6c06d2a7ed276f17cb25ecf7bcc4b0.png)

请注意，分配的材质使用的着色器应具有特定属性；请查看 `Naninovel/Resources/Naninovel/Shaders/TransitionalTexture` 中的默认着色器作为参考。

当 Actor 在场景中表示为精灵时，`Custom Sprite Material` 属性可用（非通用实现在未渲染到纹理时即属于这种情况）。默认情况下，使用简单的无光照透明着色器；如果您想实现光照或表面效果，请将具有自定义着色器的材质分配给该属性。

::: tip EXAMPLE
查看 [Actor 着色器示例](/zh/guide/samples#actor-着色器)，了解如何创建和使用纹理着色器添加自定义过渡效果，以及如何创建和使用支持光照和自发光的精灵着色器来为背景 Actor 模拟一天中的时间。
:::

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)
