# GUI

Naninovel 附带多个内置 UI：标题（主）菜单、游戏设置、保存加载菜单、积压日志面板、CG 画廊、提示和许多其他内容。

每个内置 UI 都可以禁用或自定义；有关更多信息，请参阅 [UI 自定义](/zh/guide/gui#ui-自定义) 指南。

## 自适应 UI 布局

所有内置 UI 均采用自适应布局实现。这允许 UI 在所有平台上保持可用，无论屏幕分辨率如何。

![](https://i.gyazo.com/b6bddf8a0c6f2ba68dcdc1bc65db0c09.mp4)

如果您希望更改 UI 适应屏幕分辨率和/或纵横比的方式 — 或者正在构建自定义 UI 并希望配置自适应布局 — 请参阅有关 uGUI 的 Unity 指南和教程以获取可用选项，例如 [为多种分辨率设计 UI](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/HOWTO-UIMultiResolution.html)。

## UI 切换

UI 切换功能允许用户隐藏或显示整个游戏内 UI。

![](https://i.gyazo.com/e267c4ab3654efbfaf611011502de79f.mp4)

激活 `ToggleUI` 输入（独立输入模块默认为 `Space` 键）或使用控制面板上的 `HIDE` 按钮来隐藏/显示 UI。

当 UI 隐藏时，`Continue` 输入或单击/触摸屏幕也将取消隐藏 UI。

## UI 自定义

UI 自定义允许添加自定义 UI 并修改或完全替换任何内置 UI 元素，如标题菜单、设置菜单、打印机积压日志等。

请注意，文本打印机和选项处理程序是通过 actor 接口实现的，并以不同的方式进行自定义；有关更多信息，请参阅相应的文档（[文本打印机](/zh/guide/text-printers)、[选项处理程序](/zh/guide/choices)）。

::: warning
在尝试创建自定义 UI 或修改现有 UI 之前，请确保您熟悉 [Unity 的 UI 系统](https://docs.unity3d.com/Packages/com.unity.ugui@latest) (uGUI)。虽然下面提供了用于 UI 自定义的视频教程和示例项目，但请注意，我们将无法就 Unity 的内置工具提供额外的指导；有关更多信息，请参阅 [支持页面](/zh/support/#unity-support)。
:::

要添加自定义 UI 或修改（禁用）内置 UI，请使用可通过 `Naninovel -> Resources -> UI` 编辑器菜单访问的 UI 资源管理器。

![](https://i.gyazo.com/b0f00e8431e34e59249b3f59919e3b2c.png)

当引擎初始化时，它将实例化资源管理器中分配的所有 UI 预制件。

::: info NOTE
某些功能（例如 [UI 切换](/zh/guide/gui#ui-切换)）要求 UI 在 `Screen Space - Camera` 模式下渲染。为了获得最佳兼容性，请确保您的自定义 UI 选择了正确的渲染模式，并且 Render Camera 字段为空（UI 管理器将自动分配相机）。

![](https://i.gyazo.com/d62bed3ba0c85972b12e759cc7b44c91.png)
:::

要显示或隐藏资源管理器中列出的任何 UI，请分别使用 [@showUI] 和 [@hideUI] 命令。

### 添加自定义 UI

要添加新的自定义 UI，请通过 `Create -> Naninovel -> Custom UI` 资产上下文菜单创建一个预制件，并将其添加到 UI 资源列表中。然后，它将在引擎初始化时与其他 UI 预制件一起实例化。

以下视频教程展示了如何添加带有特殊显示和隐藏动画的自定义日历 UI。日历根据 [自定义变量](/zh/guide/custom-variables) 显示日期，该变量可以通过剧本脚本进行更改并随游戏保存。当变量更改时，日历会自动更新 — 所有这些都无需任何 C# 脚本即可实现。

![](https://www.youtube.com/watch?v=wrAm-cwPXy4)

::: tip EXAMPLE
上面视频教程中显示的 Unity 项目可以在 [UI 示例](/zh/guide/samples#ui) 中找到。它还包含添加带有滚动视图和 Web 链接的制作人员名单屏幕、带有粒子效果的选项按钮、在文本打印机中使用表情符号、向聊天打印机添加时间戳等的示例。
:::

::: tip EXAMPLE
另一个更高级的示例是添加具有网格布局、分页和拖放窗口的自定义库存 UI，可以在 [库存示例](/zh/guide/samples#库存-inventory) 中找到。具体来说，UI 相关脚本存储在 `Scripts/Runtime/Inventory/UI` 中，预制件存储在 `Content/UI/Inventory` 目录中。
:::

当您通过上下文菜单创建新的自定义 UI 预制件时，该预制件将具有附加到根对象的 `Custom UI` 组件。此组件（或者更确切地说是它实现了 `IManagedUI` 接口这一事实）对于使预制件被引擎识别为 UI 至关重要。

![](https://i.gyazo.com/b3149c82bf3a42436903f54f826ad349.png)

`Disable Interaction` 属性允许永久禁用与 UI 的交互，无论可见性如何。需要在同一游戏对象上有一个 `Canvas Group` 组件。

当启用 `Visible On Awake` 时，UI 将在实例化后（引擎初始化后立即）可见，反之亦然。

当启用 `Control Opacity` 并且 `Canvas Group` 组件附加到同一游戏对象时，`Canvas Group` 的 `Alpha` 属性将与 UI 元素的当前可见性状态同步更改。然后，`Fade Time` 控制不透明度淡入淡出动画的持续时间（以秒为单位）。如果您希望实现自定义效果（例如，滑动动画而不是淡入淡出），请禁用 `Control Opacity` 并使用 `On Show` 和 `On Hide` Unity 事件来响应可见性更改。

如果您希望支持 UI 的游戏手柄或键盘导航，请将可交互游戏对象（例如 `Button`）分配给 `Focus Object` 属性。当 UI 变为可见时，该对象将自动聚焦，允许使用游戏手柄和/或键盘在其他可交互对象上进行导航。有关如何设置导航行为的更多信息，请参阅 Unity 的 [UI 导航指南](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-SelectableNavigation.html)。

当分配了 `Focus Object` 时，`Focus Mode` 属性允许选择何时聚焦对象：`Visibility` 模式将在 UI 变为可见后立即聚焦它，而 `Navigation` 将推迟聚焦，直到玩家激活游戏手柄（左摇杆或方向键）或键盘（箭头键）上的导航键。

`On Show` 和 `On Hide` Unity 事件允许挂钩自定义处理程序以响应 UI 可见性更改。例如，您可以挂钩 `Animator` 触发器，以便在 UI 变为可见时播放自定义动画，反之亦然。

当启用 `Hide On Load` 时，当引擎开始加载操作时，UI 将自动隐藏。这通常发生在加载另一个剧本脚本或退出到标题菜单时。

启用 `Save Visibility State` 将使 UI 的可见性状态持久化，因此当玩家加载保存的游戏时，UI 将处于与保存游戏时相同的状态（可见或隐藏）。

`Block Input When Visible` 允许在 UI 可见时禁用 [输入处理](/zh/guide/input-processing)。这对于防止玩家在与 UI 交互时使用各种热键（隐藏 UI、继续文本等）很有用。`Allowed Samplers` 允许向被阻止的输入添加例外；例如，您可以将 `ToggleUI` 输入名称添加到列表中，允许玩家切换 UI，同时仍防止激活其他输入。

启用 `Modal UI` 会使所有其他 UI 在该 UI 可见时忽略交互。这类似于 `Block Input When Visible`，但影响基于事件的交互（鼠标单击、触摸、UI 导航）而不是直接输入处理。

创建自定义 UI 时，默认情况下还会添加其他几个组件：
- `Canvas Group` 允许通过更改不透明度（由 `Fade Duration` 控制）来隐藏 UI，并允许 UI 在必要时忽略用户交互。
- `Canvas Scaler` 自动缩放布局以适应当前显示分辨率。
- `Graphic Raycaster` 允许玩家与 UI 画布内的按钮和其他可交互元素进行交互。

您可以根据需要随意修改或删除上述任何组件。

### 更改字体

要指定哪些文本元素应受游戏设置中设置的字体和文本大小更改的影响，请使用 `Custom UI` 和派生组件的 `Font Change Configuration` 属性。

![](https://i.gyazo.com/f8e8b03580940cce72de9e9970512902.png)

配置列表中的每个元素都有以下属性：

| 属性 | 描述 |
| --- | --- |
| Object | 带有文本组件的游戏对象，该组件应受字体更改的影响。 |
| Include Children | 是否影响容器子游戏对象；禁用时，只有指定容器对象上的文本组件会受到影响。 |
| Allow Font Change | 是否允许更改文本组件的字体。 |
| Allow Font Size Change | 是否允许更改文本组件的字体大小。 |
| Font Sizes | 应用于文本组件的实际字体大小。列表中的每个元素对应字体大小下拉列表索引：Small -> 0, Default -> 1, Large -> 2, Extra Large -> 3（可以通过 SettingsUI 更改）。默认值将被忽略，并将使用预制件中最初设置的字体大小。 |

可以通过 `Create -> Naninovel -> Font Sizes` 资产上下文菜单创建 `Font Sizes` 资产；使用该资产在多个 UI 之间共享通用字体大小。

游戏设置菜单中可用的特定文本字体选项在 UI 配置菜单中设置：

![](https://i.gyazo.com/31a9b81dae56fb114a75e25211d26126.png)

`Font Resource` 应指定 `TMPro Font` 资产的 [资源路径](/zh/guide/resource-providers)。默认情况下，Naninovel 将使用 addressable 和项目资源提供者来查找字体资产；使用 `Font Loader` 更改行为。在使用默认设置时公开字体资产的最简单方法是将字体放在 `Resources/Naninovel/Fonts` 文件夹内；然后，您可以使用字体的资产名称作为字体资源路径。有关如何创建和配置字体的更多信息，请参阅 Unity 的 TextMesh Pro 文档。

要在 `Custom UI` 对象之外（例如，在选项处理程序按钮预制件上）更改字体，请使用 `Font Changer` 组件。它具有相同的字体配置选项，可以应用于任何游戏对象。

### 禁用内置 UI

要禁用内置 UI，请从 UI 资源列表中删除相应的记录，这样在引擎初始化时就不会实例化预制件。

### 修改内置 UI

如果您希望修改现有的内置（默认）UI 预制件，可以在 `Naninovel/Prefabs/DefaultUI` 包文件夹中找到它们。

虽然可以，但 **请避免直接编辑内置预制件**，以防止在更新包时出现问题。相反，通过 `Create -> Naninovel -> Default UI -> ...` 资产上下文菜单从模板创建一个新预制件，或者手动复制您想要修改的预制件 (Ctrl/Cmd+D) 并将其移出包文件夹。然后将创建/修改的预制件分配给 UI 资源管理器中的现有记录（`Object` 字段）。

在下面的视频教程中，您可以学习如何覆盖内置标题（主）菜单。它还将展示如何使用标题脚本在进入标题菜单时添加背景和特殊效果；无需使用 C# 脚本即可实现。

![](https://www.youtube.com/watch?v=hqhfhXzQkdk)

::: tip EXAMPLE
上面视频教程中显示的 Unity 项目在 [UI 示例](/zh/guide/samples#ui) 中可用。
:::

从头开始创建新预制件时，请确保附加实现您要覆盖的 UI 接口的组件。此组件应附加到预制件的根对象。

所有 UI 接口都存储在 `Naninovel.UI` 命名空间下：

| 接口 | 对应的 UI |
| --- | --- |
| IBacklogUI | 打印机积压日志。 |
| ILoadingUI | 游戏加载时显示的面板。 |
| IMovieUI | 用于托管电影的 UI。 |
| ISaveLoadUI | 用于保存和加载游戏的面板。 |
| ISceneTransitionUI | 处理场景过渡（[@trans] 命令）。 |
| ISettingsUI | 用于更改游戏设置的面板。 |
| ITitleUI | 游戏的标题（主）菜单。 |
| IExternalScriptsUI | 外部脚本浏览器 UI（社区模组功能）。 |
| IVariableInputUI | 用于将任意文本分配给自定义状态变量的输入表单（由 [@input] 命令使用）。 |
| IConfirmationUI | 用于确认重要命令的 UI 面板（例如，退出到标题菜单或删除保存的游戏槽时）。 |
| ICGGalleryUI | 可解锁的 [CG 画廊](/zh/guide/unlockable-items#cg-画廊) 项目浏览器。 |
| ITipsUI | 可解锁的 [提示](/zh/guide/unlockable-items#提示) 浏览器。 |
| IRollbackUI | 状态回滚功能的指示器。 |
| IContinueInputUI | 位于 UI 堆栈底部的全屏不可见 UI 层，用于在单击或触摸时激活 `continue input` 触发器。 |
| IToastUI | 用于自动隐藏弹出通知（又名“toast”）的通用 UI；可以使用 [@toast] 命令从剧本脚本中使用。 |

为了使 UI 支持可见性（唤醒时可见、淡入淡出时间）和交互选项（禁用交互），还要将 `Canvas Group` 组件附加到同一对象。

如果您可以使用 C# 脚本并想要覆盖 UI 的默认逻辑，[创建一个新组件](https://docs.unity3d.com/Manual/CreatingAndUsingScripts)，实现 `IManagedUI` 接口（可以从 `CustomUI` 继承组件以满足所有接口要求）并附加创建的自定义组件。检查 `Naninovel/Runtime/UI` 文件夹以获取内置 UI 的参考实现。以下是自定义 UI 组件的最小实现示例：

```csharp
using Naninovel.UI;

public class MyCustomUI : CustomUI
{

}
```

## Unity 事件上的播放脚本

创建自定义 UI 时，您可能希望执行命令或开始播放特定的剧本脚本以响应某些事件（例如，[按钮单击](https://docs.unity3d.com/Manual/script-Button.html)）。

将 `Play Script` 组件添加到游戏对象，然后选择现有剧本脚本或直接在文本区域字段中编写命令。然后，从另一个组件路由 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html) 以调用 `Play Script` 组件上的 `Play()` 方法。当在播放模式下触发事件时，将执行脚本。下面的示例在单击按钮时隐藏自定义 UI。

![](https://i.gyazo.com/5f56fbddc090919cc71f68e82bb1713f.png)

您还可以使用 `{arg}` 表达式在脚本中文本中引用 Unity 事件参数。支持的参数类型为：`string`、`int`、`float` 和 `bool`。下面的示例演示了当布尔 Unity 事件为 `true` 时执行相机抖动并播放声音效果，当为 `false` 时播放背景音乐。

![](https://i.gyazo.com/78e9fa27d6561f8f8aced76bbeb4b542.png)

::: tip EXAMPLE
您可以在 [UI 示例](/zh/guide/samples#ui) 中找到使用 `Play Script` 组件的示例。该组件用于 "Content/UI/Calendar" 自定义 UI 预制件内的 "CloseButton" 游戏对象上。
:::

## UI Toolkit

Unity 的新 UI 创作解决方案 — [UI Toolkit](https://docs.unity3d.com/Packages/com.unity.ui@latest) — 开箱即不受支持，但可以通过实现 `IManagedUI` 接口的适配器与 Naninovel 一起使用。在 [UI 示例](/zh/guide/samples#ui) 中找到此类适配器的示例。

::: warning
UI Toolkit 仍处于早期开发阶段，与默认 UI 解决方案 (uGUI) 相比缺少一些功能。除非您是高级开发人员并准备好解决所有相关问题，否则我们不建议使用它。请注意，我们将无法提供任何关于在 Naninovel 中使用 UI Toolkit 的支持或指导。
:::
