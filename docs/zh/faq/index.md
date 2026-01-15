# 常见问题

## 我需要懂编程才能使用 Naninovel 吗？

Naninovel 专为非程序员设计，不需要编程知识即可创建基本的视觉小说。例如，我们的 [WebGL 演示](https://naninovel.com/demo) 就是在没有任何自定义 C# 脚本的情况下创建的。请查看 [快速上手](/zh/guide/getting-started) 和 [视频教程](https://youtu.be/wFil5vje3NE) 以了解基本工作流程的示例。但是，添加自定义功能（游戏玩法）或与其他第三方包集成，在大多数情况下将需要 C#（或 [可视化脚本](/zh/guide/samples#可视化脚本)）。特定功能（例如 [UI 自定义](/zh/guide/gui#ui-自定义)）可能还需要一些 Unity 编辑器的经验。

## 我可以将 Naninovel 用作现有游戏的对话系统吗？

虽然 Naninovel 主要设计为构建视觉小说的基础，但它也可以用作任何类型游戏的嵌入式对话或过场动画系统。它甚至包括一个专门针对该用例的 [专用模式](/zh/guide/getting-started#对话模式)。

## 为什么不使用节点图来编写剧本？

乍一看，您可能认为节点图对于创建对话很方便。实际上，一旦添加了足够的内容，它们很快就会变成无法管理的混乱。复杂的对话最好以文本格式处理，因为它可以更清晰地扩展并保持工作流程的高效。

例如，比较 [这些截图](https://i.gyazo.com/94fc39b918d2acdf9437a96c4f3cce10.png)：左边是用于通过节点图编写对话的流行 Unity 资产之一，右边是用 Naninovel 编写的完全相同的脚本。如您所见，脚本在文本格式下更加直观且易于管理——没有笨重的 UI，无需翻阅 Unity 资产来进行编辑。如果您仍然更喜欢可视化编辑器，我们要一个 [专门的编辑器](/zh/guide/editor#剧本编辑器)，它的处理过程比节点图要好得多。

话虽如此，节点图对于跟踪和组织故事的分支流程仍然很有用。这就是为什么 Naninovel 包含一个 [故事图](/zh/guide/editor#故事图)，它可以提供您叙事的清晰、高级视图。

## 可以在 Naninovel 中嵌入小游戏吗？

当然，您可以将任何自定义逻辑“注入”到默认的 Naninovel 流程中。然而，在许多情况下，这将需要使用引擎的 C# API（通过编写自定义 C# 脚本或使用 [可视化脚本](/zh/guide/samples#可视化脚本) 解决方案）。查看 [引擎服务指南](/zh/guide/engine-services) 以获取可用的开放 API 列表，这些 API 允许与引擎进行交互；在此过程中，您还可以利用 [状态外包](/zh/guide/state-management#自定义状态)、[自定义演出元素实现](/zh/guide/custom-actor-implementations) 和 [自定义命令](/zh/guide/custom-commands)。

## 支持特定的语言吗？

Naninovel 可以与任何语言一起使用，但要在某些语言中显示文本，您需要兼容的字体。有关更多信息，请参阅 [本地化指南](/zh/guide/localization#字体) 的“字体”部分。

## 购买后可以获得源代码吗？

所有与 Unity 相关的源代码都在分发包中提供。通用的 Naninovel 模块预编译为动态程序集，源代码托管在 [私有 GitHub 仓库](https://github.com/naninovel/engine) 上，您可以在 [注册许可证](https://naninovel.com/register) 后访问。

## 法律条款和使用条件是什么？

Naninovel 受以下最终用户许可协议 (EULA) 管辖：[naninovel.com/eula](https://naninovel.com/eula)。在下载 or 使用应用程序之前，请仔细阅读该文档。

## 为什么在注册 Asset Store 许可证时会出现 "asset wasn't downloaded" 错误？

当通过 Unity 的 Asset Store 购买 Naninovel 时，需要进行资产下载验证。为了使验证成功，购买资产的用户必须通过 Unity 的 [包管理器](https://docs.unity3d.com/Manual/Packages.html) 至少下载一次 Naninovel。如果购买了多个资产副本，则必须由关联的组织用户下载每个副本。如果您已完成所有步骤但仍然遇到问题，请 [联系 Unity 支持](https://support.unity.com)。

::: warning
当从组织帐户购买资产时，组织所有者必须下载资产以满足检查（分配的成员不算数）。这是 Asset Store 的限制，我们在这种情况下无法提供任何解决方法；请联系 Unity 支持以获取更多信息和帮助。
:::

## 如何自定义标题（主）菜单？

对于 UI 部分（更改/添加按钮或面板布局和样式），[修改内置的标题 UI 预制件](/zh/guide/gui#修改内置-ui)；对于其他所有内容，请在脚本配置菜单（`Naninovel -> Configuration -> Scripts`）中设置 `Title Script`，并像编写剧本一样使用脚本命令来设置场景。标题脚本将在引擎初始化后以及使用 [@title] 命令时自动播放。

## 为什么背景被裁剪了？

确保背景纹理分辨率的宽高比与相机配置中设置的参考分辨率相匹配。此外，确保使用 [正确的设置](https://docs.unity3d.com/Manual/class-TextureImporter) 导入纹理（例如，`Max Size` 足够高）。

当屏幕宽高比与参考分辨率比例不同时，背景演员将默认尝试匹配，这可能会导致裁剪；有关更多信息，请参阅 [匹配模式指南](/zh/guide/backgrounds#匹配模式)。

## 如何在打印文本中间插入命令？

使用 [命令内联](/zh/guide/scenario-scripting#命令内联)。

## 如何防止命令并发运行？

指定 `wait` 参数，该参数在所有异步命令中均可用，例如：

```nani
; 打印机将在角色隐藏后开始淡出。
@hideChars wait!
@hidePrinter
```

或者，在脚本播放器配置中启用 `Wait By Default` 选项；这样，所有命令默认都将被等待，除非 `wait` 被否定（设置为 false）。

::: info
在 [专门的文章](/zh/guide/scenario-scripting#异步执行) 中了解有关异步（并行）命令执行的更多信息。
:::

## 如何让角色显示在彼此前面（Z轴排序）？

使用 Z 轴定位，例如：

```nani
; 让 Sora 显示在底部中心并且在 Felix 前面
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

如果在透视相机模式下遇到排序问题，请尝试将“Edit > Project Settings > Graphics”编辑器菜单中的 `Transparency Sort Mode` 更改为 `Orthographic`。在 [2D 排序手册](https://docs.unity3d.com/Manual/2DSorting.html) 中查找有关 Unity 中对象排序的更多信息。

## 是否可以只显示文本框中的头像，而隐藏角色本身？

为您希望隐藏的角色指定 `!visible`；头像将保持可见，例如：

```nani
@char CharId !visible
```

如果您在角色本身应保持隐藏的情况下不断更改头像，请考虑在角色配置菜单中禁用 `Auto Show On Modify`；禁用后，您无需在隐藏角色时指定 `!visible` 即可更改角色的任何参数。

或者，查看 [渲染角色到纹理](/zh/guide/characters#渲染到纹理) 功能。

## 如何从剧本脚本运行自定义 C# 代码？

要调用 C# 行为（例如，访问场景中的游戏对象），请使用 [自定义命令](/zh/guide/custom-commands)；要从 C# 方法获取值并在剧本脚本中使用它，请使用 [脚本表达式](/zh/guide/script-expressions#添加自定义函数)。
