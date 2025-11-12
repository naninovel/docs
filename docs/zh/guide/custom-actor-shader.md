# 自定义演出元素着色器

在渲染大多数角色、背景演出元素（不包括通用类型）时，会使用一个特殊的着色器来处理半透明叠加并支持各种过渡效果。

你可以在角色配置菜单中通过 `Custom Texture Material` 属性分配一个材质，以覆盖默认着色器。

![](https://i.gyazo.com/8b6c06d2a7ed276f17cb25ecf7bcc4b0.png)

请注意，所分配材质中使用的着色器应包含特定的属性；可参考默认着色器 `Naninovel/Resources/Naninovel/Shaders/TransitionalTexture` 了解其结构。

当角色在场景中以精灵图形式呈现时，可使用 `Custom Sprite Material` 属性（适用于非通用实现且未渲染到纹理的情况）。默认情况下使用简单的无光照透明着色器；如果你希望实现光照或表面特效，可以在该属性中分配带有自定义着色器的材质。

::: tip 示例
参阅 [演出元素着色器示例](/zh/guide/samples#演出元素着色器)，了解如何创建并使用纹理着色器以添加自定义过渡效果，以及带有光照与自发光支持的精灵着色器，用于模拟背景角色的昼夜变化。
:::

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)
