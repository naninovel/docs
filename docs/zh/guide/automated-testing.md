# 自动化测试

在处理大型项目和/或有多个团队成员修改场景脚本或游戏逻辑时，确保游戏在发布前能够正常运行是至关重要的。由于游戏具有交互性，通常需要大量的手动测试；但对于较简单的视觉小说类型项目，可以实现测试过程的自动化。

Naninovel 在 `Naninovel.E2E` 命名空间下提供了一系列工具，用于在游戏运行时构建端到端（E2E）测试，通过模拟用户交互序列实现自动化测试。结合 [Unity 的测试工具](https://docs.unity3d.com/Packages/com.unity.test-framework@latest)，你可以在编辑器、目标设备或持续集成（CI）环境中运行自动化测试套件。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## 入门指南

通过 `Window -> General -> Test Runner` 菜单打开 “Test Runner” 选项卡，并按照指示设置播放模式测试；更多信息请参考 [UTF 指南](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/workflow-create-playmode-test.html)。请确保引用了 Naninovel 的 common、runtime 和 E2E 程序集，以便访问所需的 API。以下是测试程序集设置示例：

![](https://i.gyazo.com/8b8cb5c916987d941cce8abf6daf131b.png)

如果 Naninovel 是作为 UPM 包安装的，你可能还需要在项目的 `Packages/manifest.json` 中将其 [设为可测试状态](https://docs.unity3d.com/Manual/cus-tests.html#tests)，例如：

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

这些测试是异步运行的，因此你需要使用 `[UnityTest]` 属性，并让测试方法返回 `IEnumerator`；例如，下面是一个简单的方法，用来确保玩家可以开始新游戏：

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E()
    .Once(() => Engine.GetService<IUIManager>().GetUI<ITitleUI>().Visible)
    .Click("NewGameButton")
    .Ensure(() => Engine.GetService<IScriptPlayer>().Playing);
```

脚本编译完成后，前往 Test Runner 选项卡，找到新添加的测试。运行后，它会等待直到 `ITitleUI` 出现，然后尝试找到并点击附加在 “NewGameButton” 对象上的按钮，并确认脚本已开始播放。如果任意步骤失败，测试将立即停止，并在 Unity 的 Test Runner 中以红叉标记相应记录。

::: warning
在运行测试之前，请在引擎配置中禁用 “Initialize On Application Load”（启动时自动初始化）。若希望在正常使用时保留自动初始化功能，可在主场景中的游戏对象上添加 `Runtime Initializer` 组件。关于引擎初始化的更多信息，请参阅 [相关指南](/guide/integration-options#manual-initialization)。
:::

## 快捷方式

为了帮助你编写更简洁的测试套件，可以使用 [static-import](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#static-modifier) 引入 `Naninovel.E2E.Shortcuts` 类；该类包含多种有用的快捷方法，使测试代码更简洁、更易读。例如，下面是使用快捷方式重写后的测试示例：

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E().StartNew().Ensure(Playing);
```

## 测试套件配置

尽管端到端测试应尽可能接近真实的使用场景，但你仍需要调整一些参数，以使测试更具实用性。例如，你可能并不希望在每次玩家需要点击以继续阅读时都手动指定“点击”序列；同样，各种效果（如 UI 淡入淡出或相机动画）在实际播放中会耗时，但在测试中等待这些效果完成并没有意义。

要在运行测试时专门配置引擎，可使用 `E2E` 实例上提供的各种 `With` 方法。例如，以下示例将重写时间缩放（timescale）和文字显示延迟（reveal delay），以使所有效果快速执行，并在每次请求时自动激活继续输入：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E()
    .WithConfig<ScriptPlayerConfiguration>(c => c.SkipTimeScale = 999)
    .WithConfig<TextPrintersConfiguration>(c => c.MaxRevealDelay = 0)
    .With(() => Service<IScriptPlayer>().OnWaitingForInput += _ => Input("Continue").Activate(1))
```

—— 由于这是常见的配置，可以通过 `WithFastForward` 扩展方法来实现：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E().WithFastForward()
```

另一种常见的场景是设置一个干净的引擎状态，这样在每个测试开始运行时，全局状态、设置和游戏状态都不会受到之前测试运行或游戏会话中存储数据的影响。

你可能还希望将测试专用数据存储在内存中，以避免其被序列化到磁盘。这些都可以通过 `WithTransientState` 扩展方法实现；此外，该方法还允许指定初始的全局状态和设置状态：

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

—— 上述示例会以干净状态初始化引擎，模拟游戏首次启动；但同时会将全局变量 `g_completedX` 和 `g_completedY` 设为 true。

## 组合交互序列

在测试分支剧情时，你可能会发现自己需要重复编写相似的交互序列，以覆盖玩家可能完成它们的多种路径。为了减少样板代码，序列对象实现了 `ISequence` 接口，而该接口可被所有测试 API 接受。借此，你可以将常用的交互序列存储在变量中，并在其他更通用的序列中组合调用。

下面是一个示例测试，用于确保当玩家完成 Common、X 和 Y 路线后，标题菜单中会显示 “TrueRoute” UI：

```csharp
[UnityTest]
public IEnumerator WhenXYRoutesCompleteTrueUnlocks () => new E2E()
    .WithTransientState().WithFastForward()
    .StartNew().Play(CommonX, RouteX)
    .StartNew().Play(CommonY, RouteY)
    .Once(InTitle).Ensure(() => UI("TrueRoute").Visible);

ISequence CommonX => Play(D1QuickX, D2TowardX, D3LooseHP);
ISequence CommonY => Play(D1QuickY, D2TowardY, D3LooseX);

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

—— 注意，在上例中，第 1～3 天的公共路线中通往 “X” 或 “Y” 路线的选项序列分别被组合为 `CommonX` 和 `CommonY` 变量，而它们又在实际的测试方法中被组合使用。

## 引用选项

如上所示，在测试中可以通过类似 `d1-qte-x` 这样的字符串引用选项。这些字符串是场景脚本中自定义的 [文本标识符](/guide/naninovel-scripts#text-identification)。即使在启用了稳定文本标识（stable text identification）的情况下，你仍然可以在脚本中定义自定义文本 ID，并且系统会保留它们。例如，考虑以下场景脚本：

```nani
@choice "Choice 1|#my-id-for-choice-1|"
@choice "Choice 2|#my-id-for-choice-2|"
```

—— 在此示例中，我们将第一个选项分配了 ID `my-id-for-choice-1`，第二个选项分配了 `my-id-for-choice-2`；实际的 ID 可以是任意字符串，只需确保它们在脚本内是唯一的即可。现在，你可以在测试中通过这些已分配的 ID 来引用这些选项：

```csharp
Once(Choosing).Choose("my-id-for-choice-2")
```

::: tip 示例
[E2E 示例](/guide/samples#e2e) 展示了大部分可用的快捷方式、扩展方法以及测试场景。
:::

## 覆盖率

检查脚本中的某一行或指令是否在测试过程中被执行是很有帮助的。在编写测试时，你希望确保玩家能够真正看到所有可用的内容。当所有测试通过后仍有指令未被执行时，可能意味着剧情逻辑存在问题，或测试套件尚不完整。

默认情况下，当所有 E2E 测试结束后，覆盖率报告会被输出到控制台中：

![](https://i.gyazo.com/95beca8fb15948d5ea8645d9d199e957.png)

—— 第一行显示总体覆盖率，即所有场景脚本中已执行指令数与总指令数的比例。下面的各行显示每个脚本的覆盖情况；若某个脚本中存在未覆盖的指令，还会显示包含这些指令的行号。

如果你希望禁用覆盖率统计，可以在 `E2E` 构造函数中关闭 `Cover` 选项，例如：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E(new Options { Cover = false })
```
