# 开发控制台

开发控制台用于通过游戏内的 UI 执行静态 C# 方法。要启用或禁用此功能，请在引擎配置中使用 `Enable Development Console` 属性。若只希望在开发（调试）版本中保留该功能，请在同一配置菜单中启用 `Debug Only Console` 选项。

在游戏运行时显示控制台 UI，请确保已启用开发控制台，并按下 `~`（波浪号）键。可以在输入配置中的 `ToggleConsole` 绑定项下更改该按键。

要将某个 C# 方法暴露给控制台，请在静态方法上添加 `ConsoleCommand` 特性（attribute）。该特性带有一个可选的字符串参数，可用于设置快捷指令：

```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

在控制台中，输入完整的方法名或其快捷指令（若已设置），然后按下 `Enter` 键即可执行该方法。

![](https://i.gyazo.com/bd41a9a8fff91eb575b235a6b641dcce.mp4)

当前可用的指令如下：

指令 | 说明
--- | ---
nav | 切换 Naninovel 脚本导航器 UI。
debug | 切换 [Naninovel 脚本调试](/guide/naninovel-scripts#scripts-debug) 窗口。
var | 切换 [自定义变量编辑器](/guide/custom-variables#variables-debug) 窗口。
play | 开始执行当前加载的 Naninovel 脚本。
stop | 停止执行当前加载的 Naninovel 脚本。
rewind (int) | 将当前加载的 Naninovel 脚本回退到指定的行索引。该行必须是指令或普通文本。在回退时，该行应存在于回滚堆栈中。
reload | 对当前正在播放的场景脚本执行 [热重载](/guide/naninovel-scripts#hot-reload)。

## 执行指令

你可以通过开发控制台调用脚本指令。像在 Naninovel 脚本中一样输入指令字符串，它将立即执行。在某些情况下，这对于调试自定义状态变量非常有用。例如，你可以使用以下指令打印任意自定义变量的当前值：

```nani
@print {VariableName}
```

— 将使用默认打印机输出 `VariableName` 的值。

![](https://www.youtube.com/watch?v=wcgTGro0_SE)
