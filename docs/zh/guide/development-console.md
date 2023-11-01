# 开发控制台

开发控制台用于通过游戏内UI执行静态C＃方法。
Development console is used to execute static C# methods via in-game UI.

要在游戏运行时显示控制台用户界面，请确保在引擎配置中启用了开发控制台，然后按`~`（波浪号）键。如果您在使用默认按键时遇到问题（例如，在Mac OS上的Unity编辑器中），则可以通过 `Toggle Console Key` 属性进行更改。


![Engine Configuration](https://i.gyazo.com/bc56a837c03d198e2d8141bdebc2e696.png)

要将C＃方法公开给控制台，请`ConsoleCommand`向静态方法添加属性。该属性具有可选的字符串参数，允许设置快捷调用，如下：


```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

在控制台中，键入完整的方法名称或快捷调用（如果已应用），然后`Enter`键以执行该方法。


![](https://i.gyazo.com/bd41a9a8fff91eb575b235a6b641dcce.mp4)

当前可以使用以下命令：

命令 | 描述
--- | ---
nav | 切换naninovel脚本导航器UI。
debug | 切换[naninovel脚本调试](/zh/guide/naninovel-scripts#脚本Debug) 窗口。
var | 切换[自定义变量编辑器](/zh/guide/custom-variables#变量debug) 窗口。
purge | 使用[Google云端硬盘](/zh/guide/resource-providers#google-drive) 加载器时，将清除下载的资源缓存。
play | 开始执行当前加载的naninovel脚本。
stop | 暂停当前​​加载的naninovel脚本的执行。
rewind (int) | 将当前加载的naninovel脚本回退到提供的行索引。该行应为命令或常规文本。当倒退时，该行应存在于回滚堆栈中。
reload | 对当前播放的naninovel脚本执行 [热重载](/zh/guide/naninovel-scripts#热加载) 。仅在Unity编辑器中生效。

## 执行命令

你可以通过开发控制台调用脚本命令。就像在naninovel脚本中一样输入命令字符串，它将立即执行。其他情况下，这对于调试自定义状态变量可能很有用。例如，你可以使用以下命令打印任何自定义变量的当前值：

```
@print {VariableName}
```
— 将使用默认打印机打印 `VariableName` 的值。

![](https://www.youtube.com/watch?v=wcgTGro0_SE)
