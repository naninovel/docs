# 用户界面

Naninovel 自带多个内置 UI：标题（主）菜单、游戏设置界面、存档与读档菜单、回顾（backlog）面板、CG 画廊、提示（tips）等。

每个内置 UI 都可以被禁用或自定义；更多信息请参阅 [UI 自定义指南](/zh/guide/gui#ui-customization)。

## 自适应 UI 布局

所有内置 UI 都采用自适应布局实现，这使得界面在不同平台、不同屏幕分辨率下都能保持良好的可用性。

![](https://i.gyazo.com/b6bddf8a0c6f2ba68dcdc1bc65db0c09.mp4)

如果你希望更改 UI 在不同分辨率或宽高比下的自适应方式，或是在制作自定义 UI 时需要配置自适应布局，请参阅 Unity 官方关于 uGUI 的指南与教程，例如：[多分辨率 UI 设计（Designing UI for Multiple Resolutions）](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/HOWTO-UIMultiResolution.html)。

## UI 显示切换（UI Toggling）

UI 显示切换功能允许玩家整体隐藏或显示游戏内界面。

![](https://i.gyazo.com/e267c4ab3654efbfaf611011502de79f.mp4)

触发 `ToggleUI` 输入（默认独立输入模块下为 `Space` 键），
或点击控制面板上的 `HIDE` 按钮，即可隐藏/显示整个 UI。

当 UI 被隐藏时，按下 `Continue` 输入键或点击（触摸）屏幕
也会自动重新显示 UI。

---

## UI 自定义

UI 自定义功能允许你添加自定义界面，或修改、完全替换任何内置界面（如标题菜单、设置菜单、文本打印器、回顾面板等）。

请注意，文本打印器与选项处理器是通过 Actor 接口实现的，它们的自定义方式不同；详情请参阅相应文档：[文本打印器](/zh/guide/text-printers)、[选项处理器](/zh/guide/choices)。

::: warning
在尝试创建自定义 UI 或修改现有 UI 之前，请先熟悉 Unity 的 [UI 系统（uGUI）](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。虽然下文提供了视频教程与示例项目，但请注意我们无法提供有关 Unity 内置 UI 工具的额外支持；详情请参阅 [支持页面](/support/#unity-support)。
:::

要添加自定义 UI 或修改（禁用）内置 UI，请使用编辑器菜单 `Naninovel -> Resources -> UI` 打开 UI 资源管理器。

![](https://i.gyazo.com/b0f00e8431e34e59249b3f59919e3b2c.png)

引擎初始化时，会实例化资源管理器中分配的所有 UI 预制体。

::: info 注意
某些功能（例如 [UI 显示切换](/zh/guide/gui#ui-toggling)）要求 UI 使用 `Screen Space - Camera` 渲染模式。为确保兼容性，请确认自定义 UI 的渲染模式设置正确，且 `Render Camera` 字段为空（UI 管理器会自动分配摄像机）。

![](https://i.gyazo.com/d62bed3ba0c85972b12e759cc7b44c91.png)
:::

要在脚本中显示或隐藏资源管理器中的 UI，请分别使用 [@showUI] 与 [@hideUI] 指令。

### 添加自定义 UI

要添加新的自定义 UI，请通过 `Create -> Naninovel -> Custom UI` 资源菜单创建一个预制体，然后将其添加到 UI 资源列表中。该预制体会在引擎初始化时，与其他 UI 一起被实例化。

以下视频教程演示了如何添加一个带有特殊显示与隐藏动画的自定义日历界面。该日历会根据一个 [自定义变量](/zh/guide/custom-variables) 显示日期，该变量可在 Naninovel 脚本中修改，并会与游戏存档一起保存。当变量值发生变化时，日历会自动更新，整个过程无需编写任何 C# 脚本。

![](https://www.youtube.com/watch?v=wrAm-cwPXy4)

::: tip 示例
上方视频教程所示的 Unity 项目可在 [UI 示例](/zh/guide/samples#ui) 中找到。其中还包括以下示例：带滚动与网页链接的制作人员名单界面、带粒子特效的选项按钮、在文本输出窗中使用表情符号、在聊天输出窗中添加时间戳等。
:::

::: tip 示例
另一个更高级的示例是在 [物品系统示例](/zh/guide/samples#物品系统) 中，展示了如何添加一个带网格布局、分页与拖拽窗口的自定义物品栏 UI。其中与 UI 相关的脚本位于 `Scripts/Runtime/Inventory/UI` 目录，对应的预制体位于 `Content/UI/Inventory` 目录。
:::

当你通过菜单创建新的自定义 UI 预制体时，其根对象上会自动附加一个 `Custom UI` 组件。该组件（更准确地说，是其实现的 `IManagedUI` 接口）是使预制体被引擎识别为 UI 的关键。

![](https://i.gyazo.com/b3149c82bf3a42436903f54f826ad349.png)

`Disable Interaction` 属性可永久禁用 UI 的交互，无论其是否可见。此功能要求在同一对象上存在 `Canvas Group` 组件。

启用 `Visible On Awake` 时，UI 在实例化（即引擎初始化后立即）时将显示；关闭则在启动时保持隐藏。

启用 `Control Opacity` 且同对象附带 `Canvas Group` 组件时，UI 的可见性状态会与组件的 `Alpha` 属性同步，`Fade Time` 控制淡入淡出动画的持续时间（秒）。如果希望实现自定义的显示效果（例如滑入滑出动画而非透明度渐变），请禁用 `Control Opacity`，并使用 `On Show` 与 `On Hide` Unity 事件来响应可见性变化。

若希望支持手柄或键盘在 UI 上的导航，可在 `Focus Object` 字段中指定一个具有交互组件（如 `Button`）的对象。当 UI 变为可见时，该对象将自动获得焦点，从而允许通过手柄或键盘（方向键、摇杆等）进行导航。有关导航行为的设置，请参考 Unity 官方文档 [UI 导航指南](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-SelectableNavigation.html)。

当指定了 `Focus Object` 后，`Focus Mode` 属性可控制何时聚焦该对象：
- **Visibility**：UI 显示后立即聚焦。
- **Navigation**：在玩家激活导航输入（方向键或摇杆）后再聚焦。

`On Show` 与 `On Hide` Unity 事件可挂接自定义处理逻辑以响应 UI 显隐状态变化。例如，可触发 `Animator` 参数来播放自定义动画。

启用 `Hide On Load` 时，在引擎执行加载操作（如加载其他 Naninovel 脚本或返回标题菜单）时，UI 将自动隐藏。

启用 `Save Visibility State` 可使 UI 的显示状态持久化；当玩家读取存档时，UI 将恢复为存档时的可见/隐藏状态。

启用 `Block Input When Visible` 可在 UI 可见时暂停 [输入处理](/zh/guide/input-processing)，以防止玩家在交互过程中触发快捷键（例如继续阅读、隐藏 UI 等）。`Allowed Samplers` 字段可添加例外输入，如将 `ToggleUI` 添加进去，以允许玩家在交互时仍能切换 UI 显示状态。

启用 `Modal UI` 时，UI 可见期间将阻止其他 UI 接收任何交互。此功能与 `Block Input When Visible` 类似，但针对事件驱动交互（鼠标点击、触摸、导航）而非直接输入。

在创建自定义 UI 时，会默认附加以下组件：
- **Canvas Group**：通过更改透明度隐藏 UI，并在需要时禁用交互（由 `Fade Duration` 控制）。
- **Canvas Scaler**：自动根据屏幕分辨率缩放布局。
- **Graphic Raycaster**：允许玩家与 UI 按钮及其他交互元素进行交互。

你可以根据需要自由修改或删除以上任意组件。

### 更改字体

若希望使 [游戏设置](/zh/guide/game-settings) 中的字体与文字大小变更影响到指定的文本元素，可在 `Custom UI` 及其派生组件中使用 `Font Change Configuration` 属性进行设置。

![](https://i.gyazo.com/f8e8b03580940cce72de9e9970512902.png)

配置列表中的每个元素包含以下属性：

属性 | 说明
--- | ---
Object | 含有文本组件的游戏对象；字体更改将作用于该对象。
Include Children | 是否影响此对象的子对象；关闭后仅修改当前对象的文本组件。
Allow Font Change | 是否允许更改该文本组件的字体。
Allow Font Size Change | 是否允许更改该文本组件的字体大小。
Font Sizes | 实际应用于文本组件的字体大小。列表中各项对应字体大小下拉选项的索引：Small → 0、Default → 1、Large → 2、Extra Large → 3（可通过 SettingsUI 修改）。Default 值会被忽略，将使用预制体中初始设置的字体大小。

可通过 `Create -> Naninovel -> Font Sizes` 创建 `Font Sizes` 资源，以在多个 UI 之间共享字体大小配置。

游戏设置菜单中的字体选项可在 UI 配置菜单中设置：

![](https://i.gyazo.com/31a9b81dae56fb114a75e25211d26126.png)

`Font Resource` 应指定到 `TMPro Font` 资源的 [资源路径](/zh/guide/resource-providers)。默认情况下，Naninovel 将通过 Addressable 与项目资源提供器加载字体资源；如需更改加载方式，请使用 `Font Loader`。在默认配置下，最简单的做法是将字体文件放入 `Resources/Naninovel/Fonts` 文件夹中，然后直接使用字体资源名作为路径。更多关于字体创建与配置的信息，请参阅 Unity 的 TextMesh Pro 文档。

若要在 `Custom UI` 之外的对象上（例如选项按钮预制体）更改字体，请使用 `Font Changer` 组件。它提供与 `Font Change Configuration` 相同的配置选项，可应用于任意游戏对象。

### 禁用内置 UI

若要禁用某个内置 UI，只需在 UI 资源列表中删除相应的记录，引擎初始化时将不会实例化该预制体。

### 修改内置 UI

若希望修改现有的内置（默认）UI 预制体，可在包目录 `Naninovel/Prefabs/DefaultUI` 中找到这些资源。

虽然可以直接编辑这些预制体，**但强烈建议不要直接修改内置资源**，以免在更新 Naninovel 包时发生覆盖或兼容性问题。

正确的做法是：通过 `Create -> Naninovel -> Default UI -> ...` 菜单从模板创建新的预制体，或手动复制要修改的预制体（Ctrl/Cmd + D），并将副本移动到项目目录中（包外）。然后在 UI 资源管理器中，将该新建或修改后的预制体分配到相应记录的 `Object` 字段中。

下方视频教程演示了如何覆盖内置的标题（主）菜单，并展示如何使用标题脚本在进入主菜单时添加背景与特效，全程无需编写任何 C# 代码。

![](https://www.youtube.com/watch?v=hqhfhXzQkdk)

::: tip 示例
上方视频教程所示的 Unity 项目可在 [UI 示例](/zh/guide/samples#ui) 中找到。
:::

当你从零创建新的 UI 预制体时，请确保在其根对象上附加一个实现所要覆盖 UI 接口的组件。所有 UI 接口均定义在 `Naninovel.UI` 命名空间下。

接口 | 对应 UI
--- | ---
IBacklogUI | 文本打印回顾面板。
ILoadingUI | 游戏加载时显示的加载界面。
IMovieUI | 用于播放影片的 UI。
ISaveLoadUI | 游戏存档与读取界面。
ISceneTransitionUI | 处理场景过渡（[@trans] 指令）的界面。
ISettingsUI | 游戏设置界面。
ITitleUI | 游戏标题（主）菜单。
IExternalScriptsUI | 外部脚本浏览界面（社区模组功能）。
IVariableInputUI | 用于给自定义状态变量赋值的输入表单（由 [@input] 指令调用）。
IConfirmationUI | 用于确认关键指令的确认对话框（例如退出主菜单或删除存档）。
ICGGalleryUI | 可解锁 [CG 图鉴](/zh/guide/unlockable-items#cg-gallery) 浏览界面。
ITipsUI | 可解锁 [提示条目](/zh/guide/unlockable-items#tips) 浏览界面。
IRollbackUI | 状态回滚功能的指示界面。
IContinueInputUI | 位于 UI 堆栈底部的全屏透明界面，用于接收点击或触摸并触发“继续”输入。
IToastUI | 用于自我隐藏的通用弹出提示（toast）界面，可在脚本中通过 [@toast] 指令调用。

若希望 UI 支持可见性（如“初始可见”“淡入时间”）及交互控制（如“禁用交互”）等功能，请在同一对象上附加 `Canvas Group` 组件。

若熟悉 C# 脚本并希望重写默认 UI 逻辑，可[创建一个新的组件](https://docs.unity3d.com/Manual/CreatingAndUsingScripts)，实现 `IManagedUI` 接口（也可继承自 `CustomUI` 来自动满足接口要求），然后将该自定义组件挂载到 UI 根对象上。

可参考 `Naninovel/Runtime/UI` 文件夹中内置 UI 的示例实现。以下是一个最简自定义 UI 组件的实现示例：

```csharp
using Naninovel.UI;

public class MyCustomUI : CustomUI
{

}
```

## 在 Unity 事件中播放脚本

在创建自定义 UI 时，你可能希望在某些事件（例如 [按钮点击](https://docs.unity3d.com/Manual/script-Button.html)）触发时执行指令或播放特定的 Naninovel 脚本。

为此，可在任意游戏对象上添加 `Play Script` 组件，然后选择一个已有的 Naninovel 脚本，或直接在文本区域中编写指令。接着，从其他组件的 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html) 路由调用该组件的 `Play()` 方法。当事件在播放模式下被触发时，该脚本就会执行。

下图示例展示了当按钮被点击时隐藏自定义 UI：

![](https://i.gyazo.com/5f56fbddc090919cc71f68e82bb1713f.png)

你还可以在脚本文本中使用 `{arg}` 表达式引用 Unity 事件参数。支持的参数类型包括：`string`、`int`、`float` 和 `bool`。

下图示例演示了当布尔型 Unity 事件为 `true` 时执行相机震动并播放音效，当为 `false` 时播放背景音乐：

![](https://i.gyazo.com/78e9fa27d6561f8f8aced76bbeb4b542.png)

::: tip 示例
可在 [UI 示例](/zh/guide/samples#ui) 中找到 `Play Script` 组件的使用例。该组件应用于自定义 UI 预制体 “Content/UI/Calendar” 内的 “CloseButton” 对象。
:::

## UI Toolkit

Unity 新的 UI 方案 —— [UI Toolkit](https://docs.unity3d.com/Packages/com.unity.ui@latest)，并未被 Naninovel 直接支持。但可通过实现 `IManagedUI` 接口的适配器进行集成。可在 [UI 示例](/zh/guide/samples#ui) 中找到此类适配器的示例。

::: warning
UI Toolkit 仍处于早期开发阶段，与默认 UI 系统（uGUI）相比功能尚不完善。除非你是经验丰富的开发者，并准备自行解决可能出现的问题，否则不建议在项目中使用 UI Toolkit。请注意，我们无法为 UI Toolkit 与 Naninovel 的集成提供任何支持或指导。
:::
