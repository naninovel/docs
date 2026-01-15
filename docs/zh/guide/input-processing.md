# 输入处理

Naninovel 使用 Unity 的 [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) 来监听以下操作。

| 名称 | 键盘+鼠标 | 手柄 | 描述 |
|:---|:---|:---|:---|
| Submit | Enter | Button South | 通用确认意图，例如接受提示或提交输入表单。 |
| Cancel | Escape | Button East | 通用拒绝意图，例如拒绝提示或退出菜单。 |
| Delete | Delete | Button North | 通用删除意图，例如删除选定的存档槽位。 |
| Navigate | Arrow Keys | D-Pad, Left Stick | 通用导航意图，例如连续选择存档槽位。 |
| Scroll | Scroll Wheel, Page Up/Down | Right Stick | 通用滚动意图，例如滚动积压日志。 |
| Page | | Left Trigger <-> Right Trigger | 通用分页意图，例如在存档-加载菜单中更改页面。 |
| Tab | | Left Bumper <-> Right Bumper | 通用切换标签页意图，例如在设置菜单中切换标签页。 |
| Continue | Enter, Scroll Wheel (Y+) | Button South | 禁用等待输入模式（打印消息时激活）以继续脚本播放。 |
| Pause | Backspace | Start | 显示暂停界面。 |
| Skip | Ctrl | Button West | 在激活操作（按住按钮）时启用[跳过模式](/zh/guide/text-printers#文本跳过)（快进）。 |
| ToggleSkip | Tab | Right Stick Press | 切换（如果禁用则永久启用，反之亦然）跳过模式。 |
| SkipMovie | Escape | Button East | 跳过（取消）当前正在播放的[电影](/zh/api/#movie)。 |
| AutoPlay | A | Button East | 切换[自动播放模式](/zh/guide/text-printers#自动前进文本)，其中等待输入模式在设定的延迟后自动禁用。 |
| ToggleUI | Space | Button North | 切换整个 UI 层的[可见性](/zh/guide/gui#ui-切换)（隐藏/显示）。 |
| ShowBacklog | L | Right Bumper | 切换[积压日志 UI](/zh/guide/text-printers#打印机积压日志) 可见性。 |
| Rollback | B, Scroll Wheel (Y-) | Left Bumper | 向后倒带脚本。 |
| CameraLook | Mouse Delta | Right Stick | 在 [@look] 模式下移动摄像机。 |
| ToggleConsole | ` | | 切换开发控制台。 |

## 自定义输入

您可以通过在 `Naninovel -> Configuration -> Input` 上下文菜单中分配自定义 `Input Actions` 资产来配置默认操作并添加新操作。将相关操作保留在 `Naninovel` 映射下，以便引擎检测到它们。默认输入操作资产可以通过 `Create -> Naninovel -> Input -> Controls` 资产菜单创建——在创建自己的资产时请随意将其作为参考。

![](https://i.gyazo.com/8ef1cc7eccac5cbc9e88016e2b1271f6.png)

::: tip 示例
在[库存示例](/zh/guide/samples#库存-inventory)中可以找到添加自定义输入绑定以切换库存 UI 的示例。具体来说，`Scripts/Runtime/Inventory/UI/InventoryUI.cs` 运行时脚本中使用了自定义 "ToggleInventory" 操作。另一个示例——[输入重新绑定示例](/zh/guide/samples#输入重绑定)——实现了重新绑定 UI，允许玩家更改默认控件。
:::

使用自定义输入操作时，建议同时使用在同一配置菜单中分配的自定义 `Event System`，然后将自定义输入操作资产分配给附加到事件系统预制件的 Input System UI Input Module 组件的 `Actions Asset` 属性。这是各种 UI 相关功能正常工作所必需的。您可以通过 `Create -> Naninovel -> Input -> Event System` 创建适用于 Naninovel 的默认事件系统预制件。

![](https://i.gyazo.com/b1f99bb8e2cea14ec9f97c78b91d313a.png)

::: tip
为防止带有修饰符的操作（例如 `Tab` 和 `Page`）触发使用相同绑定但不带修饰符的其他操作（例如 `Navigate`），请在输入系统包类别下的项目设置中启用 `Enable Input Consumption` 选项。
:::

## 适应输入模式

默认情况下，所有内置 UI 将根据上次活动的输入设备适应当前输入模式（鼠标和键盘、手柄或触摸）。例如，如果玩家使用鼠标与游戏交互，但在某个时刻按下了手柄上的按钮，UI 将切换到手柄输入模式。

![](https://i.gyazo.com/a2f38246d7eee8d75d7f3f6660a092ed.mp4)

您可以通过取消选中输入配置菜单中的 `Detect Input Mode` 选项来禁用该功能。

引擎初始化后激活的默认输入模式由输入管理器根据目标平台评估：

- Consoles -> Gamepad
- Mobiles -> Touch
- Others -> Mouse

### 鼠标

在此模式下，UI 将禁用所有底层 [Selectable](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Selectable.html) 对象的导航。这是为了防止按钮在被鼠标点击时转换为“选中”状态。

此外，如果在 `Custom UI`（或派生）组件中分配了 `Button Controls` 对象，它将被启用，而 `Keyboard Controls` 和 `Gamepad Controls` 将被禁用。这允许仅在关联的输入模式处于活动状态时保持特定于鼠标输入模式的按钮（例如，“关闭”按钮）和控件图例（例如，手柄按钮标签）可见。

### 手柄

手柄模式将重新启用导航（如果在鼠标模式下被禁用），以便玩家可以使用 D-Pad 或左摇杆导航可选对象。

分配后，`Gamepad Controls` 图例将被启用，而其他（按钮和键盘）将被禁用。

::: tip
如果您想自定义手柄图例图标，请查看 [Xelu 的免费控制器提示](https://thoseawesomeguys.com/prompts/)。
:::

此外，在手柄模式下显示模态 UI 时，将聚焦第一个活动的可选对象，以防止焦点卡在先前选定的对象上。可以通过显式分配自定义 UI 或派生组件的 `Focus Object` 来更改此行为，在这种情况下，UI 不会尝试自动查找焦点对象。

### 键盘

当按下键盘导航（箭头）键时激活。其他键不会激活此模式，因为它们在鼠标模式下用作热键。

除此之外，它的工作原理与手柄模式相同，只是显示的控件图例不同。

### 触摸

在触摸模式下，Naninovel 默认不会对托管 UI 执行任何特殊更改。但是，您可以通过覆盖 `CustomUI` 组件的 `HandleInputModeChanged` 方法来添加特定于触摸的行为。

要为特定 UI 禁用适应输入模式功能，请取消选中 `Custom UI`（或派生）组件的 `Adapt To Input Mode` 选项。要全局禁用该功能，请使用输入配置中的 `Detect Input Mode` 选项。

## 自定义输入后端

Naninovel 允许使用自定义输入解决方案，例如 [Rewired](https://guavaman.com/projects/rewired/)，而不是 Unity 的内置输入系统。引擎仅在 `InputManager` 类中的几个虚方法内使用默认输入系统 API，并且引用是条件编译的，确保即使删除了默认输入模块也不会发生编译错误。

要使引擎使用自定义输入解决方案，请[覆盖](/zh/guide/engine-services#覆盖内置服务) `InputManager` 引擎服务并覆盖所需的虚方法。
