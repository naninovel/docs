# 常见问题

## 我需要会编程才能使用 Naninovel 吗？

Naninovel 的设计目标是让非程序员也能轻松上手，不需要任何编程知识就能制作基础的视觉小说。例如，我们的 [WebGL 演示](https://naninovel.com/demo) 就完全没有使用任何自定义 C# 脚本。请参阅 [入门指南](/zh/guide/getting-started) 和 [视频教程](https://youtu.be/wFil5vje3NE) 了解基本工作流程。

不过，如果要添加自定义功能（例如特殊玩法）或整合第三方插件，则通常需要编写 C# 脚本（或使用 [可视化脚本](/zh/guide/samples#visual-scripting)）。部分功能（例如 [UI 自定义](/zh/guide/gui.html#ui-customization)）也可能需要具备一定的 Unity 编辑器经验。

## 我可以将 Naninovel 用作已有游戏的对话系统吗？

可以。虽然 Naninovel 主要面向传统视觉小说，并且最适合作为这类游戏的模板，但它同样可以整合到其他类型的项目中。无论你正在制作 3D 冒险游戏、RPG，还是其他类型的游戏，都可以将 Naninovel 当作即插即用的对话系统。

请注意，这类整合通常需要一定程度的 C#（或 [可视化脚本](/zh/guide/samples#visual-scripting)）开发。建议先阅读 [引擎架构概览](/zh/guide/engine-architecture) 了解 Naninovel 的运行机制，并查阅 [整合指南](/zh/guide/integration-options) 获取详细的整合方式。

## 为什么不使用节点图来编写脚本？

乍一看，节点图似乎很适合编写对话，但当内容量增加时，它会迅速变得杂乱且难以维护。复杂的对话逻辑在纯文本格式中反而更易管理、扩展性更好、效率更高。

可以查看 [示例对比图](https://i.gyazo.com/94fc39b918d2acdf9437a96c4f3cce10.png)：左侧是某个常见的节点式对话编辑器，右侧是同样内容的 Naninovel 脚本。可以看到，文本形式更加直观、易于维护，没有复杂的界面操作，也不必在 Unity 资源中四处查找。

当然，如果只是为了观察剧情分支的整体结构，节点图仍然有其价值。因此，Naninovel 也提供了 [演出脚本图](/zh/guide/editor#story-graph)，可用于查看与整理故事流程。

## 能在 Naninovel 中嵌入小游戏吗？

可以。你可以在 Naninovel 的默认流程中“注入”自定义逻辑。不过，这通常需要通过引擎的 C# API 实现（可以直接编写脚本，也可以使用 [可视化脚本](/zh/guide/samples#visual-scripting) 方案）。

请参考 [引擎服务指南](/zh/guide/engine-services)，了解可以调用的开放 API。你还可以利用 [状态托管机制](/zh/guide/state-management#custom-state)、[自定义演出元素实现](/zh/guide/custom-actor-implementations) 以及 [自定义指令](/zh/guide/custom-commands) 来实现更复杂的功能。

## 它支持特定语言吗？

Naninovel 可以显示任何语言的文本，但部分语言需要使用兼容的字体。请参阅 [本地化指南的字体部分](/zh/guide/localization.html#fonts) 获取相关信息。

## 购买 Naninovel 后能获得源码吗？

可以。所有 Unity 相关源码都包含在发行包中。通用的 Naninovel 模块以动态程序集的形式分发，其源码托管在 [私有 GitHub 仓库](https://github.com/naninovel/engine)，你可以在 [注册许可证](https://naninovel.com/register) 后获取访问权限。

## 使用条款和授权协议是什么？

Naninovel 的使用受以下《最终用户许可协议》（EULA）约束：👉 [naninovel.com/eula](https://naninovel.com/eula) 请在下载或使用之前仔细阅读该文档。

## 为什么注册 Asset Store 许可证时提示 “asset wasn’t downloaded”？

当你通过 Unity Asset Store 购买 Naninovel 时，注册过程会验证下载记录。因此，你必须先使用购买该资产的账户通过 Unity 的 [Package Manager](https://docs.unity3d.com/Manual/Packages.html) 至少下载一次 Naninovel。

如果是多个副本（例如团队许可证），每个副本都需要由对应组织用户下载。若确认已完成步骤但仍出现问题，请 [联系 Unity 客服](https://support.unity.com)。

::: warning
如果资产是以组织账号购买的，**必须由组织所有者本人** 下载才能通过验证（被分配的成员账户不计入）。
这是 Unity Asset Store 的限制，我们无法提供绕过方法；如有问题，请联系 Unity 支持团队。
:::

## 为什么安装包里没有 Demo 场景？

Naninovel 设计为 [场景无关](/zh/guide/engine-architecture#scene-independent)，不会使用任何 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes.html)。因此，无法提供传统意义上的示例或 Demo 场景。

引擎会在游戏启动时自动初始化（可在配置中改为手动初始化），并通过称为 [Nani脚本](/zh/guide/scenario-scripting) 的文本文件来编写剧情。

建议先阅读 [入门指南](/zh/guide/getting-started)，了解如何使用引擎。更多使用示例可在 [功能指南](/zh/guide/index) 和 [指令 API 参考](/api/index) 中找到。如果你需要一个完整的示例项目，可以查看 [Demo 项目](/zh/guide/getting-started.html#demo-project)。

## 如何自定义标题（主）菜单，例如添加背景、音乐、特效、修改按钮等？

UI 部分（如修改按钮、布局或样式）请参考 [修改内置 Title UI 预制体](/zh/guide/gui#modifying-built-in-ui)。其他内容可在脚本配置菜单中设置 `Title Script`（路径：`Naninovel -> Configuration -> Scripts`），并使用脚本指令来布置场景，就像编写普通剧本一样。

该标题脚本会在进入主菜单时自动播放。完整示例可参考视频教程：🎬 [youtu.be/hqhfhXzQkdk](https://youtu.be/hqhfhXzQkdk)

## 为什么背景图被裁切了？

请确保背景贴图的宽高比与相机配置中设置的参考分辨率一致。同时检查贴图导入设置（例如 `Max Size` 是否足够大）。

当屏幕宽高比与参考分辨率不一致时，背景演出元素会尝试自动匹配，可能因此导致裁切。详情可参阅 [匹配模式说明](/zh/guide/backgrounds#match-mode)。

## 如何在文本中间插入指令？

请使用 [指令内联](/zh/guide/scenario-scripting#command-inlining) 功能。

## 如何防止指令并行执行？

在所有异步指令中，都可以使用 `wait` 参数来实现此目的，例如：

```nani
; 在角色被隐藏之后，文本输出窗才会开始淡出。
@hideChars wait!
@hidePrinter
```

或者，可以在脚本播放器配置中启用 `Wait By Default` 选项；这样所有指令都会默认等待执行完毕，除非显式地将 `wait` 取反（设为 false）。

::: info
有关异步（并行）指令执行的更多信息，请参阅[专门章节](/zh/guide/scenario-scripting#async-execution)。
:::

## 如何让角色（Actor）在彼此前后显示（Z 轴排序）？

可以通过调整 Z 轴位置来实现，例如：

```nani
; 让 Sora 出现在底部中央位置，并位于 Felix 前方。
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

如果在透视相机模式下遇到排序问题，请尝试将编辑器菜单中 “Edit > Project Settings > Graphics” 下的 `Transparency Sort Mode` 设置为 `Orthographic`。有关 Unity 中对象排序方式的更多信息，请参阅 [2D 排序手册](https://docs.unity3d.com/Manual/2DSorting.html)。

## 是否可以只在文本输出窗中显示角色头像，而隐藏角色本体？

可以。为想要隐藏的角色指定 `!visible` 参数即可，此时头像仍会保持可见，例如：

```nani
@char CharId !visible
```

如果你在隐藏角色本体的同时需要频繁切换头像，建议在角色配置菜单中禁用 `Auto Show On Modify` 选项；禁用后，即使角色处于隐藏状态，也可以直接修改其参数，而无需每次都指定 `!visible`。

另外，也可以参考 [角色渲染到纹理](/zh/guide/characters#render-to-texture) 功能。

## 如何在 Naninovel 脚本中执行自定义 C# 代码？

若要调用 C# 行为（例如访问场景中的游戏对象），请使用 [自定义指令](/zh/guide/custom-commands)；
若要从 C# 方法中获取返回值并在 Naninovel 脚本中使用，请参考 [表达式函数扩展](/zh/guide/script-expressions#adding-custom-functions)。
