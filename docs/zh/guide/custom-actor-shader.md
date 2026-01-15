# 自定义演出元素着色器

在渲染大多数字符和背景 actor（不包括通用）时，使用特殊着色器来处理半透明过度绘制并支持各种过渡效果。

您可以通过分配材质给 actor 配置菜单中可用的 `Custom Texture Material` 属性来覆盖默认着色器。

![](https://i.gyazo.com/8b6c06d2a7ed276f17cb25ecf7bcc4b0.png)

请注意，分配的材质使用的着色器应具有特定属性；请检查 `Naninovel/Resources/Naninovel/Shaders/TransitionalTexture` 中的默认着色器以供参考。

当 actor 在场景中表示为精灵时，`Custom Sprite Material` 属性可用（这是非通用实现未渲染到纹理时的情况）。默认情况下，使用简单的无光照透明着色器；如果您想实现光照或表面效果，请将具有自定义着色器的材质分配给该属性。

::: tip EXAMPLE
查看 [actor 着色器示例](/zh/guide/samples#actor-着色器)，了解如何创建和使用纹理着色器添加自定义过渡效果，以及如何创建和使用支持光照和自发光的精灵着色器来模拟背景 actor 的一天中的时间。
:::

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)
