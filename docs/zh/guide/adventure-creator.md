# Adventure Creator

[Adventure Creator](https://www.adventurecreator.org/) （下简称AC）使您可以制作传统的2D，2.5D和3D冒险游戏-强调讲故事，探索和解谜的游戏，例如《Monkey Island》，《Grim Fandango》，《The Longest Journey》和《行尸走肉》。

![](https://i.gyazo.com/74a12fa535198cb26a87a5037b15a988.jpg)

你可以使用Naninovel处理AC中的对话场景，也可以从基于Naninovel的游戏中加载AC以获得一些自定义游戏玩法。

## 安装

同时安装AC和Naninovel（顺序无关紧要）。

下载并导入 [AC扩展包](https://github.com/Naninovel/AdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage) 。

在下图所示位置填入`NaninovelAdventureCreator/Runtime/Actions`，参考[AC指南](https://www.adventurecreator.org/tutorials/writing-custom-action) 了解更多其他相关设置。

![](https://i.gyazo.com/59a162751411ec60a7cf5ad89e9a66ec.png)

现在你应该能在"Custom" （自定义）窗口下看到 "Play Naninovel Script" （运行Naninovel脚本）选项了。

![](https://i.gyazo.com/faf33afa1df8ff98ea04ef9cf1a44f8f.png)

根据设置，你可能需要为Naninovel的物体单独创建一个渲染层级，以避免被AC的相机渲染，反之亦然。这可以通过Naninovel的引擎配置窗口来完成。

![](https://i.gyazo.com/ed765928c0420ec2b1e26d6bf4a66e6c.png)

当使用Naninovel作为基于AC的游戏的嵌入式系统时，按需关闭`Initialize On Application Load` 和  `Show Title UI` 选项。

## 使用方法

使用AC的定义动作行为 `Play Naninovel Script` 来关闭AC，并初始化Naninovel，如果必要可以加载特定Naninovel脚本。默认情况下，AC和Naninovel相机会自动切换，可以禁用`Swap Cameras`属性终止。

使用`@turnOnAC` 自定义Naninovel命令来在Naninovel脚本中启用AC，重置Naninovel引擎状态（可选）并交换回相机（也可选）。状态重置由 `reset` 参数控制，相机切换由 `swapCameras` 参数控制。

以下视频演示了与Naninovel集成在一起以处理对话的AC演示场景。

![](https://www.youtube.com/watch?v=7tOIFZRSAec)

::: tip EXAMPLE
在 [GitHub项目](https://github.com/Naninovel/AdventureCreator) 获取集成示例。第一次打开如果不导入AC和Naninovel资源包会报错，导入后会自动解决编译错误。
:::
