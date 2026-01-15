# 自动化测试

在处理大型项目或有多个团队成员修改剧本脚本或游戏逻辑时，在发布前确保游戏正常运行至关重要。由于其交互性质，游戏通常需要大量手动测试；但对于较简单的视觉小说，可以自动化大部分过程。

Naninovel 在 `Naninovel.E2E` 命名空间下提供了工具，通过在游戏运行时组合模拟用户交互序列来帮助构建端到端测试。结合 [Unity 的测试框架](https://docs.unity3d.com/Packages/com.unity.test-framework@latest)，您可以构建在编辑器、目标设备或 CI 中运行的自动化测试套件。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## 快速上手

通过 Unity 编辑器中的 `Window -> General -> Test Runner` 打开 "Test Runner" 选项卡，并按照说明设置播放模式测试；在 [UTF 指南](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/workflow-create-playmode-test.html) 中查找更多信息。确保引用 Naninovel 的 common、runtime 和 E2E 程序集以使所需的 API 可用。下面是测试程序集设置的示例：

![](https://i.gyazo.com/8b8cb5c916987d941cce8abf6daf131b.png)

如果 Naninovel 作为 UPM 包安装，您可能还需要通过项目的 `Packages/manifest.json` [使其可测试](https://docs.unity3d.com/Manual/cus-tests.html#tests)，例如：

```json
{
    "dependencies": {
        "com.elringus.naninovel": "...",
        "other-packages": "..."
    },
    "testables": [
        "com.elringus.naninovel"
    ]
}
```

测试是异步运行的，因此您需要使用 `[UnityTest]` 属性并从测试方法返回 `IEnumerator`。例如，这里有一个简单的方法来确保玩家可以开始新游戏：

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E()
    .Once(() => Engine.GetService<IUIManager>().GetUI<ITitleUI>().Visible)
    .Click("NewGameButton")
    .Ensure(() => Engine.GetService<IScriptPlayer>().Playing);
```

编译后，转到 Test Runner 选项卡并找到新添加的测试。运行时，它将等待 `ITitleUI` 显示，然后尝试查找并单击附加到 `NewGameButton` 对象的按钮，并确保脚本开始播放。如果任何步骤失败，测试将停止，相关记录将在 Test Runner 中标记为红叉。

::: warning
在运行测试之前，请在引擎配置中禁用 "Initialize On Application Load"。要在正常使用期间保留自动初始化，请使用应用于主场景中 GameObject 的 `Runtime Initializer` 组件；在 [指南](/zh/guide/integration-options#手动初始化) 中查找有关引擎初始化的更多信息。
:::

## 快捷方式

为了帮助编写简洁的测试套件，请 [静态导入](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#static-modifier) `Naninovel.E2E.Shortcuts` 类；它包含各种有用的快捷方式，使测试更紧凑、更易于阅读。例如，这是借助快捷方式重写的上述测试：

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E().StartNew().Ensure(Playing);
```

## 套件配置

虽然端到端测试应尽可能接近实际使用场景，但您仍然需要调整各种参数以使测试实用。例如，您可能不想在每次希望玩家单击以继续阅读时都指定单击序列；同样，UI 淡入淡出或相机动画等各种效果在播放期间需要时间，在测试中等待它们是不必要的。

要在运行测试时专门配置引擎，请使用 `E2E` 实例上可用的各种 `With` 方法。例如，下面的代码片段覆盖了时间刻度和显示延迟以使效果运行得非常快，并在每次请求时激活继续输入：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E()
    .WithConfig<ScriptPlayerConfiguration>(c => c.SkipTimeScale = 999)
    .WithConfig<TextPrintersConfiguration>(c => c.MaxRevealDelay = 0)
    .With(() => Service<IScriptPlayer>().OnWaitingForInput += _ => Input("Continue").Activate(1))
```

— 由于这是一种常见配置，可以通过 `WithFastForward` 扩展应用：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E().WithFastForward()
```

另一个常见场景是设置干净的引擎状态，以便每个测试都以不受先前运行或播放会话影响的全局、设置和游戏状态开始。

您可能还希望将特定于测试的数据存储在内存中，以免将其序列化到磁盘。所有这些都可以通过 `WithTransientState` 扩展来完成；此外，该方法允许指定初始全局和设置状态：

```csharp
[UnityTest]
public IEnumerator WhenTrueCompleteTitleBackChanges () => new E2E()
    .WithTransientState(GlobalStateMap.With(
        new CustomVariableManager.GlobalState {
            GlobalVariables = new[] {
                new CustomVariable("g_completedX", CustomVariableScope.Global, new CustomVariableValue(true)),
                new CustomVariable("g_completedY", CustomVariableScope.Global, new CustomVariableValue(true))
            }
        }))
```

— 上面将以干净的状态初始化引擎，模拟第一次游戏启动，但会额外将 `g_completedX` 和 `g_completedY` 全局变量设置为 true。

## 组合序列

在测试分支场景时，您可能会发现自己重复常见的交互序列来描述玩家完成它们的多种可能方式。为了最大限度地减少样板代码，序列对象实现了 `ISequence` 接口，该接口被所有测试 API 接受。使用它，您可以将常见序列存储在变量中，并将它们组合在其他更通用的序列中。

下面是一个示例测试，确保在玩家完成公共、X 和 Y 路线后，标题菜单中显示 "TrueRoute" UI：

```csharp
[UnityTest]
public IEnumerator WhenXYRoutesCompleteTrueUnlocks () => new E2E()
    .WithTransientState().WithFastForward()
    .StartNew().Play(CommonX, RouteX)
    .StartNew().Play(CommonY, RouteY)
    .Once(InTitle).Ensure(() => UI("TrueRoute").Visible);

ISequence CommonX => Play(D1QuickX, D2TowardX, D3LooseHP);
ISequence CommonY => Play(D1QuickY, D2TowardY, D3LooseHP);

ISequence D1QuickX => Once(Choice("d1-qte-x")).Choose("d1-qte-x");
ISequence D1QuickY => Once(Choice("d1-qte-y")).Choose("d1-qte-y");
ISequence D1QuickNone => Once(Choice()).Wait(0.5f);

ISequence D2TowardX => Once(Choosing).Choose("d2-toward-x");
ISequence D2TowardY => Once(Choosing).Choose("d2-toward-y");

ISequence D3LooseHP => Once(Choosing).Choose("d3-loose-hp");
ISequence D3LooseX => Once(Choosing).Choose("d3-loose-x");
ISequence D3LastY => Once(Choosing).Choose("d3-last-y");
ISequence D3LastNah => Once(Choosing).Choose("d3-last-nah");

ISequence RouteX => On(Choosing, Choose(), Var("g_completedX", false));
ISequence RouteY => On(Choosing, Choose(), Var("g_completedY", false));
```

— 请注意导致 "X" 或 "Y" 路线的公共路线第 1-3 天的选择序列是如何组合成 `CommonX` 和 `CommonY` 变量的，而这些变量又是如何在实际测试方法中组合的。

## 引用选项

如上所示，可以通过类似 `d1-qte-x` 的字符串在测试中引用选项。这些是在剧本脚本中分配的自定义 [文本标识符](/zh/guide/scenario-scripting#文本识别) です。即使启用了稳定的文本识别，您仍然可以在脚本中定义自定义文本 ID，系统将保留它们。例如，考虑以下剧本脚本：

```nani
@choice "Choice 1|#my-id-for-choice-1|"
@choice "Choice 2|#my-id-for-choice-2|"
```

— 在这里，我们为第一个选项分配了 `my-id-for-choice-1`，为第二个选项分配了 `my-id-for-choice-2`；实际 ID 可以是任何东西，只要确保它们在脚本中是唯一的即可。您现在可以通过分配的 ID 在测试中引用选项：

```csharp
Once(Choosing).Choose("my-id-for-choice-2")
```

::: tip EXAMPLE
[E2E 示例](/zh/guide/samples#e2e) 展示了大多数可用的快捷方式、扩展和测试场景。
:::

## 覆盖率

检查脚本行或命令是否在测试期间执行可能会有所帮助。在编写测试时，您希望确保玩家确实可以看到所有可用内容。当所有测试通过后仍有命令未执行时，可能表明场景逻辑中存在问题或测试套件不完整。

默认情况下，在所有 E2E 测试完成后，覆盖率报告将记录到控制台：

![](https://i.gyazo.com/95beca8fb15948d5ea8645d9d199e957.png)

— 第一行将覆盖率总结为所有剧本脚本中已覆盖命令数与总命令数的比率。下面的行显示每个脚本的覆盖率；如果脚本有未覆盖的命令，它还会显示包含这些命令的行号。

如果您想禁用覆盖率，请在 `E2E` 构造函数中禁用 `Cover` 选项，例如：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E(new Options { Cover = false })
```
