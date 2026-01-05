# 输入处理

Naninovel 使用 Unity 的 [输入系统](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) 来监听以下操作。

| 名称            | 键盘+鼠标                    | 手柄                             | 描述                                                                                                                            |
|-----------------|-----------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Submit          | Enter                       | 南键                             | 通用确认操作，例如确认提示或提交输入表单。                                                                                      |
| Cancel          | Escape                      | 东键                             | 通用取消操作，例如拒绝提示或退出菜单。                                                                                          |
| Delete          | Delete                      | 北键                             | 通用删除操作，例如删除选中的存档槽位。                                                                                          |
| Navigate        | 方向键                      | 十字键、左摇杆                   | 通用导航操作，例如在一行存档槽位中移动选择。                                                                                    |
| Scroll          | 滚轮、Page Up/Down          | 右摇杆                           | 通用滚动操作，例如滚动查看回顾记录。                                                                                            |
| Page            |                             | 左扳机 <-> 右扳机                | 通用翻页操作，例如在存档加载菜单中切换页面。                                                                                    |
| Tab             |                             | 左肩键 <-> 右肩键                | 通用切换标签操作，例如在设置菜单中切换选项卡。                                                                                  |
| Continue        | Enter、滚轮上（Y+）         | 南键                             | 关闭“等待输入模式”（打印文本时激活）以继续脚本播放。                                                                          |
| Pause           | Backspace                   | Start                            | 显示暂停菜单。                                                                                                                  |
| Skip            | Ctrl                        | 西键                             | 启动 [跳过模式](/zh/guide/text-printers#text-skipping)（快进），在按住按键时启用。                                                 |
| ToggleSkip      | Tab                         | 右摇杆按压                       | 切换跳过模式（永久开启或关闭）。                                                                                                |
| SkipMovie       | Escape                      | 东键                             | 跳过（取消）当前播放的 [视频](/zh/guide/movies)。                                                                                  |
| AutoPlay        | A                           | 东键                             | 切换 [自动播放模式](/zh/guide/text-printers#auto-advance-text)，在设定延迟后自动关闭“等待输入模式”。                             |
| ToggleUI        | 空格键                      | 北键                             | 切换整个 UI 层的 [可见性](/zh/guide/gui#ui-toggling)（隐藏/显示）。                                                    |
| ShowBacklog     | L                           | 右肩键                           | 切换 [回顾日志界面](/zh/guide/text-printers#printer-backlog) 的可见性。                                                            |
| Rollback        | B、滚轮下（Y-）             | 左肩键                           | 倒回脚本播放进度。                                                                                                              |
| CameraLook      | 鼠标移动                    | 右摇杆                           | 在 [@look] 模式下移动相机。                                                                                                     |
| ToggleConsole   | `（反引号）                 |                                  | 切换 [开发者控制台](/zh/guide/development-console)。                                          |

## 自定义输入

你可以通过在 `Naninovel -> Configuration -> Input` 菜单中分配自定义的 `Input Actions`（输入动作）资源，来配置默认的输入操作或添加新的输入动作。
请将相关动作保存在名为 `Naninovel` 的映射（map）中，以便引擎能够检测到它们。
默认输入动作资源可以通过 `Create -> Naninovel -> Input -> Controls` 菜单创建 —— 在自定义时可以将其作为参考。

![](https://i.gyazo.com/8ef1cc7eccac5cbc9e88016e2b1271f6.png)

::: tip 示例
在 [物品系统示例](/zh/guide/samples#物品系统) 中展示了如何添加用于切换背包 UI 的自定义输入绑定。其中的自定义动作 “ToggleInventory” 在 `Scripts/Runtime/Inventory/UI/InventoryUI.cs` 运行时代码中被使用。另一个示例 —— [输入重绑定示例](/zh/guide/samples#输入重绑定) —— 展示了如何实现一个“按键重绑定 UI”，允许玩家更改默认按键。
:::

当使用自定义输入动作时，建议同时使用在相同配置菜单中分配的自定义 `Event System`（事件系统），并将自定义输入动作资源分配给附加在事件系统预制体上的 Input System UI Input Module 组件的 `Actions Asset` 属性。这对于确保各类 UI 功能正常工作是必要的。可以通过 `Create -> Naninovel -> Input -> Event System` 菜单创建一个与 Naninovel 兼容的默认事件系统预制体。

![](https://i.gyazo.com/b1f99bb8e2cea14ec9f97c78b91d313a.png)

::: tip
若要防止带有修饰键的动作（例如 `Tab` 或 `Page`）触发没有修饰键的同绑定动作（例如 `Navigate`），请在项目设置中 **Input System Package** 分类下启用 `Enable Input Consumption` 选项。
:::

## 自适应输入模式

默认情况下，所有内置的 UI 都会根据最后一次使用的输入设备自动适应当前输入模式（鼠标键盘、手柄或触摸）。例如，当玩家使用鼠标操作游戏时，如果此时按下了手柄上的任意按键，UI 将自动切换到手柄输入模式。

![](https://i.gyazo.com/a2f38246d7eee8d75d7f3f6660a092ed.mp4)

你可以在输入配置菜单中取消勾选 `Detect Input Mode`（检测输入模式）选项来禁用此功能。

引擎初始化后默认激活的输入模式将由输入管理器根据目标平台自动判断：

- **主机平台** → 手柄模式
- **移动平台** → 触摸模式
- **其他平台（如 PC）** → 鼠标键盘模式

### 鼠标模式

在该模式下，UI 会禁用所有底层 [Selectable](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Selectable.html) 对象的导航功能，以防止按钮在鼠标点击时切换为“已选中（selected）”状态。

此外，如果在 `Custom UI`（或其派生组件）中分配了 `Button Controls` 对象，则该对象会被启用，而 `Keyboard Controls` 与 `Gamepad Controls` 会被禁用。这使得可以仅在对应的输入模式激活时，显示与鼠标模式相关的按钮（例如“关闭”按钮）或控制提示（例如手柄按钮图标）。

### 手柄模式（Gamepad）

在手柄模式下，UI 会重新启用导航功能（从鼠标模式切换时恢复），以便玩家能够通过十字键（D-pad）在可选项之间导航。

如果分配了 `Gamepad Controls` 控件提示对象，则该对象会被启用，而其他（鼠标按钮与键盘控件）会被禁用。

::: tip
若想自定义手柄图标样式，可参考 [Xelu 的免费手柄提示素材包](https://thoseawesomeguys.com/prompts/)。
:::

此外，当处于手柄模式并显示模态 UI 时，第一个处于激活状态的可选项会自动获得焦点，以防止焦点停留在之前选中的对象上。若希望修改此行为，可在自定义 UI 或其派生组件中显式指定 `Focus Object`，此时 UI 将不会再自动寻找焦点对象。

### 键盘模式

当玩家按下键盘导航键（方向键）时会激活该模式。其他按键不会触发此模式，因为它们在鼠标模式中被用作快捷键。

除此之外，键盘模式与手柄模式的行为相同，只是显示的控件提示（legend）不同。

### 触摸模式

在触摸模式下，Naninovel 默认不会对受管 UI 执行任何特殊调整。不过，你可以通过重写 `CustomUI` 组件的 `HandleInputModeChanged` 方法，来自定义触摸模式下的特殊行为。

如果想仅对某个特定 UI 禁用输入模式自适应功能，可在 `Custom UI`（或其派生组件）中取消勾选 `Adapt To Input Mode` 选项。若希望全局禁用该功能，请在输入配置菜单中关闭 `Detect Input Mode` 选项。

## 自定义输入后端

Naninovel 支持使用自定义输入系统（例如 [Rewired](https://guavaman.com/projects/rewired/)），以替代 Unity 内置的输入系统。

引擎仅在 `InputManager` 类的少数几个虚方法中调用了默认输入系统 API，这些引用都采用条件编译，因此即使完全移除默认输入模块也不会产生编译错误。

若希望让引擎使用自定义输入方案，可通过 [覆盖内置服务](/zh/guide/engine-services#overriding-built-in-services) 的方式继承并重写 `InputManager` 引擎服务中的相关虚方法。
