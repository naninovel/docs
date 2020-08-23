# 自定义演出元素shader着色器

当在渲染大多数演出元素时候（人物，背景，除传统模型），都使用了特定shader着色器来处理半透明已经其他各种效果。

你可以在属性配置中配置`Custom Shader`属性来使用自定义shader着色器。


![](https://i.gyazo.com/0ddd77ffda5e4d31e09be723b318ef43.png)

注意，自定义shader着色器有几条特定属性和通道为必需的，以确保正常工作。参考内置默认的shader着色器来修改你的自定义shader着色器。内置shader着色器路径为`Naninovel/Resources/Naninovel/Shaders/TransitionalSprite.shader`。

参考Unity关于shader着色器的手册和教程，了解如何创建和定制你的shader着色器来达到你想要的效果。
