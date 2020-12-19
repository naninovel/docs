# 常见问题

## 我能否将Naninovel作为嵌入对话系统添加到已有的游戏中？

尽管Naninovel专注于传统视觉小说游戏，引擎仍然可以与现有项目集成。如果你在制作3D冒险游戏，RPG或任何其他类型的游戏，你仍然可以将Naninovel引入用作嵌入式对话（长篇文字）系统。

注意，大多数整合需求都需要C#编程或者[可视化编程](/zh/guide/bolt.md)) 来扩展。查阅[整合引导](/zh/guide/integration-options.md) 来获取Naninovel工作流程和整合的相关说明。

## 能在Naninovel中嵌入小游戏吗？

当然，你可以自由“植入”任何自有逻辑到Naninovel流程。大多数情况下，这会需要C#API（自编程或是使用[可视化编程](/zh/guide/bolt.md)) ）。参考[e引擎服务引导](/zh/guide/engine-services.md) 获取相关和引擎交互的开放API；在嵌入过程中你可能还需要参考[状态开放](/zh/guide/state-management.md#自定义状态) ， [自定义元素实现](/zh/guide/custom-actor-implementations.md) 和 [自定义命令](/zh/guide/custom-commands.md)。

## 支持某种特定语言吗？

Naninovel可以工作于任何语言环境，但是只能显示部分语言文本，你需要匹配的字体。[Google's Roboto](https://fonts.google.com/specimen/Roboto) 是默认被使用的，支持在Unicode7.0下的拉丁语、西里尔文和希腊语字符。你可以使用 [UI自定义](/zh/guide/user-interface.md#UI自定义) 特性修改所有内置UI的字体；打字机相关字体的改变， [添加自定义打字机](/zh/guide/text-printers.md#添加自定义打字机) 来设置你想要的字体。

如果你想添加尽可能多的语言，参考[Noto字体](https://www.google.com/get/noto/) 。

## 购买Naninovel后我能获取到源码吗？

所有源码都在发布的包里。部分第三方库源码（[NCalc](https://github.com/ncalc/ncalc) 和 [NLayer](https://github.com/naudio/NLayer)） 经过预编译，但他们为开源的（MIT许可）在Github可以找到。

## 为什么资源包里没有任何示例场景？

Naninovel设计是[独立于场景](/zh/guide/engine-architecture.md#独立于场景) 的，不会使用[Unity场景](https://docs.unity3d.com/Manual/CreatingScenes.html)  所以无法制作任何基于场景的示例。引擎会在游戏启动时自动初始化（或者在配置菜单设置手动初始化），预设舞台表现都是通过名为[naninovel 脚本](/zh/guide/naninovel-scripts.md) 的文本文件实现。

请阅读[快速上手](/zh/guide/getting-started.md) 获取引擎的基础使用指导。你可以在[概览](/zh/guide/index.md) 和 [API 命令参考](/zh/api/index.md) 看到关于引擎多种特性的使用示例。如果你想参考完整项目，参考[演示项目](/zh/guide/getting-started.html#演示项目)

## 怎么自定义标题菜单：添加背景，音乐，特效，改变按钮等？

UI部分（改变/添加按钮，面板布局和风格），使用[UI自定义](/zh/guide/user-interface.md#UI自定义) 特性；其他部分，通过设置(`Naninovel -> Configuration -> Scripts`)菜单内的 `Title Script` 来实现，只需像其他脚本一样来完成想要的效果，即可在进入标题菜单的时候自动执行相应效果。

## 如何移除所有默认Unity场景中的天空背景？

移除  `Window -> Rendering -> Lighting Settings` 中的 `Skybox Material` 。

当你移除天空盒后，相机的背景色会在没有物体可见的时候填充至屏幕。你可以通过创建相机预制体来改变颜色和其他相关设置，将创建好的相机预制体绑定至 `Naninovel -> Configuration -> Camera` 的 `Custom Camera Prefab` 属性以应用修改。

## 如何换行？

参考 [`[br]` 命令](/zh/api/#br) 。

## 如何在文本中间插入命令执行？

使用 [command inlining](/zh/guide/naninovel-scripts.md#内联命令执行) 。

## 如何让元素在其他物体之上(z轴位置)?

定义z轴的位置，比如:

```nani
; 让Sora在中下位置并置于Felix前面。
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

## 可以只在打字机显示头像，而不显示角色本身吗？

为想隐藏的角色设置 `visible:false` ；头像会依旧保持可见。比如：

```nani
@char CharId visible:false
```

如果你想永久实现这个效果，考虑关闭角色配置菜单 `Auto Show On Modify` 属性；这样在角色被隐藏时，你就不必每次都去修改 `visible:false` ，角色的任何参数。

## 我想使用不标准分辨率的背景图（比如2048x1024），但是看起来不对。

相机配置菜单中（`Naninovel -> Configuration -> Camera`）配置 `Reference Resolution` 属性，等于背景分辨率。同时确保背景图使用
[正确设置](https://docs.unity3d.com/Manual/class-TextureImporter) （比如，`Max Size`足够大）。

## 如何解决不同目标平台的纵横比？

对个人电脑 (PC, Mac, Linux) ，你可以在[player settings](https://docs.unity3d.com/Manual/class-PlayerSettingsStandalone.html#Resolution) 内选择可用的纵横比；对web，主机，移动端，你不能设置强制纵横比，需要相应对其做适配。

某种特殊比例的图像，要让他们适配不同的纵横比的唯一办法就是：重调比例（会失真），加黑边，或是裁剪。显然，最不容易察觉的办法应该是裁剪了。Naninovel会自动裁剪，当相机配置菜单内的 `Auto Correct Ortho Size` 选项开启并且和该菜单的 `Reference Resolution` 不同时，就会自动裁剪。自动纠正，会确保用户不会看到任何黑边或失真，不管使用设备为何种纵横比。

想要手动解决纵横比的问题的话（比如，你想加上黑边或重构图像比例，而不是平铺），关闭相机配置菜单内的 `Auto Correct Ortho Size` 选项。之后你就可以在Naninovel里通过 `CameraManager` [引擎服务](/zh/guide/engine-services.md) 控制相机正交大小了。 

## 怎样在Naninovel脚本里运行自己的C#脚本。

使用 [自定义命令](/zh/guide/custom-commands.md).
