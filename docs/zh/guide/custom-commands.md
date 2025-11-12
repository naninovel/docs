# 自定义指令

指令代表一个单独的操作，用于控制场景中发生的事情；例如，它可以用于更换背景、移动角色或加载另一份 naninovel 脚本。定义在 [naninovel 脚本](/zh/guide/naninovel-scripts) 中的参数化指令序列实际上控制了游戏流程。你可以在 [API 参考](/api/) 中找到可用的内置指令。在代码中，所有内置脚本指令的实现都定义在 `Naninovel.Commands` 命名空间下。

## 添加自定义指令

要添加你自己的自定义脚本指令，创建一个继承自 `Command` 的新 C# 类，并实现 `Execute` 抽象方法。创建的类会被引擎自动识别，你就可以在 naninovel 脚本中通过类名或别名（如果已指定）来调用该指令。要为 naninovel 指令指定别名，可在类上添加 `Alias` 属性。

下面是一个自定义指令示例，可以在 naninovel 脚本中通过 `@HelloWorld` 或 `@hello` 调用，以在控制台中输出 “Hello World!”，并且可以接收一个可选的 `name` 参数（例如 `@hello name:Felix`），用来替代 “World” 输出指定的名字。

```csharp
using Naninovel;
using Naninovel.Commands;
using UnityEngine;

[Alias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override UniTask Execute (ExecutionContext ctx)
    {
        if (Assigned(Name)) Debug.Log($"Hello, {Name}!");
        else Debug.Log("Hello World!");
        return UniTask.CompletedTask;
    }
}
```

::: info 注意
每当你修改 C# 指令的实现——例如重命名类、添加或删除参数、更改参数类型或属性时——记得重新导入场景脚本资源（右键点击存放脚本的文件夹并选择 “Reimport”）。这是必要的，因为场景脚本在导入时会被解析和编译（而非运行时），必须与 C# 实现保持同步。
:::

### Execute 方法

`Execute` 是一个异步方法，在脚本播放器执行指令时调用；将指令的主要逻辑写在这里。使用 [引擎服务](/zh/guide/engine-services) 访问引擎的内置系统。当 `Wait` 参数设置为 `true` 时，Naninovel 脚本的执行将暂停，直到该方法返回一个已完成的任务。

### 执行上下文

请注意 `Execute` 方法中提供的 `ExecutionContext ctx` 参数。当执行 [异步操作](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) 时，请务必在每次异步操作后检查 `ctx.Token` 的取消或完成状态，并做出相应响应：

- `AsyncToken.Canceled` 表示引擎已被销毁或重置。在这两种情况下，使用引擎 API 都不再安全，任何状态更改都可能导致未定义行为。当被取消时，指令实现应立即抛出 `AsyncOperationCanceledException`，终止当前正在进行的操作。
- `AsyncToken.Completed` 表示指令应尽快完成所有操作。例如，如果正在播放动画，应立即完成播放，而不考虑其预期持续时间。这通常发生在玩家触发继续输入或开始保存游戏操作时。

```csharp
public override async UniTask Execute (ExecutionContext ctx)
{
    await PerformSomething();
    // 在上面的方法运行期间，引擎可能已被销毁；
    // 如果发生这种情况，以下检查将抛出异常。
    ctx.Token.ThrowIfCanceled();
    // 通过检查后，继续使用引擎 API 是安全的。
    var someUI = Engine.GetService<IUIManager>().GetUI<SomeUI>();
    // 如果请求了完成操作，则立即淡出 UI。
    var fadeDuration = ctx.Token.Completed ? 0 : 5;
    await someUI.ChangeVisibility(false, fadeDuration, ctx.Token);
    // 上面的方法接受异步令牌；此类方法会在内部处理取消，
    // 因此之后无需再次检查。
}
```

执行上下文的另一个成员是正在执行该指令的脚本轨道实例，可通过 `ctx.Track` 访问。当你需要控制播放或调用其他需要轨道引用的引擎 API 时，请使用该轨道实例。例如，像这样停止播放：

```csharp
public override async UniTask Execute (ExecutionContext ctx)
{
    ctx.Track.Stop();
}
```

### 参数类型

要在 naninovel 脚本中公开指令参数，只需在指令类中添加一个公共字段，并使用以下支持的类型之一：

| 字段类型                   | 值类型                 | 脚本示例                             |
|----------------------------|------------------------|--------------------------------------|
| StringParameter            | String                 | `LoremIpsum`, `"Lorem ipsum"`        |
| LocalizableTextParameter   | LocalizableText        | `"Lorem ipsum\|#id\|"`               |
| IntegerParameter           | Int32                  | `10`, `0`, `-1`                      |
| DecimalParameter           | Single                 | `0.525`, `-55.1`                     |
| BooleanParameter           | Boolean                | `true`, `false`                      |
| NamedStringParameter       | NamedString            | `Script001.LabelName`, `.LabelName`  |
| NamedIntegerParameter      | NamedInteger           | `Yuko.5`                             |
| NamedDecimalParameter      | NamedFloat             | `Kohaku.-10.25`                      |
| NamedBooleanParameter      | NamedBoolean           | `Misaki.false`                       |
| StringListParameter        | List&lt;String&gt;     | `Lorem,ipsum,"doler sit amet"`       |
| IntegerListParameter       | List&lt;Int32&gt;      | `10,-1,0`                            |
| DecimalListParameter       | List&lt;Single&gt;     | `0.2,10.5,-88.99`                    |
| BooleanListParameter       | List&lt;Boolean&gt;    | `true,false,true`                    |
| NamedStringListParameter   | List&lt;NamedString&gt;| `Felix.Happy,Jenna.Confidence`       |
| NamedIntegerListParameter  | List&lt;NamedInteger&gt;| `Yuko.5,Misaki.-8`                  |
| NamedDecimalListParameter  | List&lt;NamedFloat&gt; | `Nanikun.88.99,Yuko.-5.1`            |
| NamedBooleanListParameter  | List&lt;NamedBoolean&gt;| `Misaki.false,Kohaku.true`          |

### 参数别名

你可以为字段添加 `[Alias]` 属性，以为该参数指定别名，使其在 naninovel 脚本中引用时可以使用该别名来替代字段名。如果希望将参数设为无名参数，可将别名设置为常量 `NamelessParameterAlias`（空字符串）；请注意，每个指令最多只能有一个无名参数。

```csharp
[Alias(NamelessParameterAlias)]
public StringParameter MyNamelesParameter;
[Alias("myParam")]
public StringParameter MyParameter;
```

```nani
@cmd "value of the nameless param" myParam:"value of 'MyParameter' param"
```

### 必填参数

要使参数成为必填项（当在 naninovel 脚本中未指定该参数时会记录错误），请在字段上应用 `[RequiredParameter]` 属性。若未应用该属性，则该参数被视为可选。

```csharp
[RequiredParameter]
public StringParameter MyRequiredParameter;
```

### 可选参数

当参数不是必填时，它在场景脚本中可能被赋值，也可能未被赋值；可使用 `HasValue` 属性来检查是否已赋值。也可以使用静态方法 `Assigned()`，该方法接收一个参数实例，当该参数不为 null 且已赋值时返回 true。

```csharp
public StringParameter MyOptionalParameter;
...
if (MyOptionalParameter.HasValue) { }
if (Assigned(MyOptionalParameter)) { }
```

### 可本地化指令

若指令中包含可本地化的参数（通常为直接显示给用户的文本），请实现 `Command.ILocalizable` 接口，以便将该指令添加到生成的 [脚本本地化](/zh/guide/localization#scripts-localization) 文档中，并使用 `LocalizableTextParameter` 参数类型。

```csharp
public class PrintText : Command, Command.ILocalizable
{
    public LocalizableTextParameter Text;
}
```

### 可预加载指令

若指令的执行需要加载某些资源，请实现 `Command.IPreloadable` 接口，以便在游戏加载时预加载所需资源。更多信息请参阅 [内存管理](/zh/guide/memory-management) 指南。

```csharp
public class PlayAudioClip : Command, Command.IPreloadable
{
    public StringParameter ClipPath;

    public async UniTask PreloadResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        await ... (load the audio clip here)
    }

    public void ReleasePreloadedResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        ... (unload the clip here)
    }
}
```

注意 `ClipPath.DynamicValue` 检查：当资源名称只有在指令执行时才确定（例如参数包含 [脚本表达式](/zh/guide/script-expressions)）时，将无法在预加载阶段加载该资源，此时应在 `Execute` 方法中加载资源。

### 指令示例

你可以在 `Naninovel/Runtime/Commands` 包目录中找到所有内置指令的实现脚本；在编写自定义指令时可以参考这些实现。

::: tip 示例
另一个添加自定义指令的示例可在 [物品系统示例](/zh/guide/samples#物品系统) 中找到。具体来说，指令实现存储在 `Scripts/Runtime/Inventory/Commands` 目录下。
:::

## 覆盖内置指令

在某些情况下，覆盖 Naninovel 的内置指令是有用的。例如，你可能希望修改 [@print] 指令的工作方式，而不必添加新的自定义指令，以便该更改也能影响 [通用文本行](/zh/guide/naninovel-scripts#generic-text-lines)（通用文本行在底层会被解析为 print 指令）。

要覆盖内置指令，添加一个自定义指令并应用与内置指令相同的别名。在覆盖指令后，重新导入 naninovel 脚本（右键单击存放脚本的文件夹并点击 “Reimport”），以使更改生效。之后，播放 naninovel 脚本时，自定义指令将自动替代内置指令。

下面是一个覆盖内置 [@print] 指令的示例，该指令会在文本显示给玩家之前将打印的文本输出到控制台。

```csharp
[Alias("print")]
public class MyCustomPrintCommand : PrintText
{
    public override UniTask Execute (ExecutionContext ctx)
    {
        Debug.Log(Text);
        return base.Execute(ctx);
    }
}
```

::: tip
指令及其参数可以应用各种上下文属性，以在 IDE 和 Web 编辑器中提供文档、自动补全及高级诊断功能。有关可用属性的信息，请参阅 [IDE 扩展](/zh/guide/ide-extension#ide-attributes) 指南。
:::
