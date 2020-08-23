# 输入处理

引擎使用预配置的侦听器处理用户输入。每个输入侦听器均具有以下属性：


属性 | 描述
--- | ---
Name | 输入侦听器的标识符。用于引用其他引擎系统的侦听器。
Always Process | 在输入阻止模式下是否处理输入。例如，播放电影时。
Keys | 激活输入的按键（按钮）列表。
Axes | 激活输入的轴列表（例如，鼠标或游戏手柄模拟杆）。
Swipes | 激活输入的滑动列表（触摸屏）。

有关特定值，请参见Unity的输入指南：[docs.unity3d.com/Manual/ConventionalGameInput](https://docs.unity3d.com/Manual/ConventionalGameInput.html).

您可以使用 `Naninovel -> Configuration -> Input` 菜单配置内置的输入绑定并添加新的侦听器。有关可用选项的信息，请参阅[配置指南](/zh/guide/configuration.md#输入)。

![Manage Input](https://i.gyazo.com/2f97539323c9fc36124e286856a36f84.png)

::: example
[在GitHub上的背包示例项目](https://github.com/Elringus/NaninovelInventory) 可以找到添加自定义输入绑定以切换背包UI的示例。

具体来说，[UI/InventoryUI.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L215) 运行时脚本中使用了自定义“ToggleInventory”的绑定。输入配置菜单下添加了具有相同名称的绑定。
:::

## 游戏手柄和键盘

所有内置功能均可与游戏手柄或键盘输入一起使用。您可以通过上述绑定编辑器菜单删除，更改或添加特定于游戏手柄/键盘的热键绑定。

内置UI也可以通过游戏手柄或键盘进行导航，而无需使用鼠标或触摸输入。在任何模式菜单中（在主要的游戏模式之外，例如，标题菜单，回顾画面等），按导航键（方向键或游戏板上的左操纵杆，键盘上的箭头键）可以在菜单中选择一个按钮。可以在每个UI中使用 `Focus Object` 字段更改第一个聚焦的按钮（游戏对象）。

![](https://i.gyazo.com/809d4c423d1696a075d5fb73370d48fa.png)

使用 `Focus Mode` 属性，可以更改是在UI可见之后还是在按下导航键之后立即聚焦指定的游戏对象。

::: warn
只有在项目中安装了Unity的新输入系统时，才能通过UI进行游戏手柄导航；在下面找到有关输入系统的更多信息。
:::

在主要游戏模式（除用户UI界面外）下，按绑定到Pause输入的按钮（默认情况下键盘键的`Backspace` 和游戏手柄的 `Start` 按钮）以打开暂停菜单，可以在其中保存/加载游戏，打开设置，退出标题，等等

## 输入系统

Naninovel支持Unity的新[输入系统](https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/) ；请参阅[官方文档](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Installation.html)        了解如何安装和启用输入系统的。安装输入系统软件包后（不要忘记在设置中启用新的输入系统），一个 `Input Actions` 属性将出现在输入配置菜单中。

![](https://i.gyazo.com/7c6d767c0f3443e1999fe14917080eb1.png)

将[input actions asset](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/ActionAssets.html?q=input%20actions%20asset) 绑定到该属性，然后创建“Naninovel”动作配置，添加输入动作名，名字和Naninovel内的绑定名字相同。该绑定名字列表可以在相同配置窗口下的 "Control Scheme" 的 "Bindings" 中找到。以下为输入动作配置示例。

![](https://i.gyazo.com/36d1951519e4f671509c7136a83d9958.png)

正确配置后，输入操作将激活Naninovel的绑定。如果要禁用旧版输入处理（在 "Bindings" 列表下设置），请在输入配置菜单下禁用 `Process Legacy Bindings` 属性。

::: warn
触摸和依赖物体的出入操作，仍需要通过传统输入实现，因此不要完全关闭传统输入。除非你打算自己实现这些特性。
:::

默认输入动作配置存储在 `Naninovel/Prefabs/DefaultControls.inputactions`

有关使用新输入系统的更多信息（例如，如何配置特定的绑定或允许玩家在运行时覆盖绑定），请参阅[官方手册](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual) 。