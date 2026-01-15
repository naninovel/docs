# 自定义指令

命令代表控制场景中发生的事情的单个操作；例如，它可以更改背景、移动角色或加载另一个剧本脚本。[剧本脚本](/zh/guide/scenario-scripting) 中定义的参数化命令序列有效地控制游戏流程。您可以在 [API 参考](/zh/api/) 中找到可用的内置命令。在代码中，所有内置脚本命令实现都在 `Naninovel.Commands` 命名空间下定义。

## 添加自定义命令

要添加您自己的自定义脚本命令，请创建一个派生自 `Command` 的新 C# 类并实现 `Execute` 抽象方法。创建的类将自动被引擎拾取，您可以通过类名或别名（如果已分配）从剧本脚本调用该命令。要为 Naninovel 命令分配别名，请将 `Alias` 属性应用于类。

下面是一个自定义命令的示例，可以从剧本脚本中作为 `@HelloWorld` 或 `@hello` 调用以将 "Hello World!" 打印到控制台，并且还可以采用可选的 `name` 参数（例如 `@hello name:Felix`）来问候提供的名称而不是世界。

```csharp
using System;
using Naninovel;
using Naninovel.Commands;
using UnityEngine;

[Serializable, Alias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        if (Assigned(Name)) Debug.Log($"Hello, {Name}!");
        else Debug.Log("Hello World!");
        return Async.Completed;
    }
}
```

::: info NOTE
每当您更改 C# 命令实现时（例如重命名类、添加或删除参数、更改其类型或属性），请记住重新导入剧本脚本资产（右键单击存储脚本的文件夹，然后单击 "Reimport"）。这是必要的，因为剧本脚本是在导入时（而不是在运行时）解析和编译的，并且必须与 C# 实现保持同步。
:::

### Execute 方法

`Execute` 是脚本播放器执行命令时调用的异步方法；将您的命令逻辑保留在那里。使用 [引擎服务](/zh/guide/engine-services) 访问引擎的内置系统。如果 `Wait` 参数设置为 `true`，则剧本脚本执行将暂停，直到此方法返回完成的任务。

### 执行上下文

请注意提供给 `Execute` 方法的 `ExecutionContext ctx` 参数。在执行 [异步操作](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) 时，请务必在每个异步操作后检查 `ctx.Token` 异步令牌是否有取消和完成请求，并做出相应反应：

- `AsyncToken.Canceled` 表示引擎已被销毁或重置。在这两种情况下，使用引擎 API 都不再安全，任何状态突变都会导致未定义的行为。当取消时，命令实现应立即抛出 `AsyncOperationCanceledException`，丢弃任何当前执行的活动。
- `AsyncToken.Completed` 表示命令应尽可能快地完成所有活动。例如，如果您正在运行动画，请立即完成它们，无论其预期持续时间如何。这通常发生在玩家激活继续输入或开始保存游戏操作时。

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    await PerformSomething();
    // 引擎可能在上述方法运行时已被销毁；
    // 如果是这种情况，以下检查将抛出异常。
    ctx.Token.ThrowIfCanceled();
    // 检查后继续使用引擎 API 是安全的。
    var someUI = Engine.GetService<IUIManager>().GetUI<SomeUI>();
    // 如果请求完成，请立即淡出 UI。
    var fadeDuration = ctx.Token.Completed ? 0 : 5;
    await someUI.ChangeVisibility(false, fadeDuration, ctx.Token);
    // 上述方法接受异步令牌；此类方法在内部处理
    // 取消，因此之后无需再次检查。
}
```

执行上下文的另一个成员是执行命令的脚本轨道实例，可通过 `ctx.Track` 访问。每当需要控制播放或调用其他需要轨道的引擎 API 时，请使用轨道实例。例如，像这样停止播放：

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    ctx.Track.Stop();
}
```

### 参数类型

要将命令参数公开给剧本脚本，请向命令类添加具有以下支持类型之一的公共字段：

| 字段类型 | 值类型 | 脚本示例 |
|---------------------------|-----------------------|-------------------------------------|
| StringParameter | String | `LoremIpsum`, `"Lorem ipsum"` |
| LocalizableTextParameter | LocalizableText | `"Lorem ipsum\|#id\|"` |
| IntegerParameter | Int32 | `10`, `0`, `-1` |
| DecimalParameter | Single | `0.525`, `-55.1` |
| BooleanParameter | Boolean | `true`, `false` |
| NamedStringParameter | NamedString | `Script001.LabelName`, `.LabelName` |
| NamedIntegerParameter | NamedInteger | `Yuko.5` |
| NamedDecimalParameter | NamedFloat | `Kohaku.-10.25` |
| NamedBooleanParameter | NamedBoolean | `Misaki.false` |
| StringListParameter | List&lt;String&gt; | `Lorem,ipsum,"doler sit amet"` |
| IntegerListParameter | List&lt;Int32&gt; | `10,-1,0` |
| DecimalListParameter | List&lt;Single&gt; | `0.2,10.5,-88.99` |
| BooleanListParameter | List&lt;Boolean&gt; | `true,false,true` |
| NamedStringListParameter | List&lt;NamedString&gt; | `Felix.Happy,Jenna.Confidence` |
| NamedIntegerListParameter | List&lt;NamedInteger&gt; | `Yuko.5,Misaki.-8` |
| NamedDecimalListParameter | List&lt;NamedFloat&gt; | `Nanikun.88.99,Yuko.-5.1` |
| NamedBooleanListParameter | List&lt;NamedBoolean&gt; | `Misaki.false,Kohaku.true` |

### 参数别名

或者，您可以将 `[Alias]` 属性应用于字段以为参数分配别名，允许在剧本脚本中引用参数时使用它代替字段名称。如果您希望使参数无名，请将 `NamelessParameterAlias` 常量（空字符串）设置为别名；请注意，每个命令只允许一个无名参数。

```csharp
[Alias(NamelessParameterAlias)]
public StringParameter MyNamelessParameter;
[Alias("myParam")]
public StringParameter MyParameter;
```

```nani
@cmd "value of the nameless param" myParam:"value of 'MyParameter' param"
```

### 必选参数

要使参数成为必选参数（当剧本脚本中未指定时会导致记录错误），请将 `[RequiredParameter]` 属性应用于字段。未应用该属性时，参数被视为可选参数。

```csharp
[RequiredParameter]
public StringParameter MyRequiredParameter;
```

### 可选参数

当参数不是必选时，它可能在剧本脚本中分配了值，也可能没有；使用 `HasValue` 属性来测试是否是这种情况。或者，您可以使用 `Assigned()` 静态方法，该方法接受参数实例，并在提供的参数不为空且已分配值时返回 true。

```csharp
public StringParameter MyOptionalParameter;
...
if (MyOptionalParameter.HasValue) { }
if (Assigned(MyOptionalParameter)) { }
```

### 可本地化命令

如果命令具有可以本地化的参数（直接呈现给用户的文本），请实现 `Command.ILocalizable` 接口以将命令添加到生成的 [脚本本地化](/zh/guide/localization#脚本本地化) 文档中，并使用 `LocalizableTextParameter` 参数类型。

```csharp
public class PrintText : Command, Command.ILocalizable
{
    public LocalizableTextParameter Text;
}
```

### 可预加载命令

如果命令执行需要加载一些资源，请实现 `Command.IPreloadable` 接口以在游戏加载时预加载所需的资源。有关更多信息，请参阅 [内存管理](/zh/guide/memory-management) 指南。

```csharp
public class PlayAudioClip : Command, Command.IPreloadable
{
    public StringParameter ClipPath;

    public async Awaitable PreloadResources ()
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

注意 `ClipPath.DynamicValue` 检查：如果仅在执行命令时才知道名称（即参数包含 [脚本表达式](/zh/guide/script-expressions)），我们将无法预加载资源；在这种情况下，应在 `Execute` 方法内加载资源。

### 命令示例

您可以在 `Naninovel/Runtime/Commands` 包文件夹中找到包含所有内置命令实现的脚本；在实现您自己的自定义命令时，请随意将它们用作参考。

::: tip EXAMPLE
在 [库存示例](/zh/guide/samples#库存-inventory) 中可以找到添加自定义命令以添加/删除库存系统项目的另一个示例。具体来说，命令实现存储在 `Scripts/Runtime/Inventory/Commands` 目录下。
:::

## 覆盖内置命令

在某些情况下，覆盖内置 Naninovel 命令可能很有用。例如，您可能希望更改 [@print] 命令的工作方式而不添加自定义命令，以便更改也会影响 [通用文本行](/zh/guide/scenario-scripting#通用文本行)（通用行的文本在底层被解析为打印命令）。

要覆盖内置命令，请添加一个自定义命令并应用内置命令具有的相同别名。覆盖命令后重新导入剧本脚本（右键单击它们存储的文件夹，然后单击 "Reimport"）以使更改生效。然后，在播放剧本脚本时将自动使用自定义命令而不是内置命令。

下面是覆盖内置 [@print] 命令的示例，以便在向玩家显示之前将打印的文本记录到控制台。

```csharp
[Serializable, Alias("print")]
public class MyCustomPrintCommand : PrintText
{
    public override Awaitable Execute (ExecutionContext ctx)
    {
        Debug.Log(Text);
        return base.Execute(ctx);
    }
}
```

::: tip
命令和参数可以应用各种上下文属性，以便在 IDE 和 Web 编辑器中提供文档、自动补全和高级诊断。在 [IDE 扩展](/zh/guide/ide-extension#ide-属性) 指南中查找可用属性。
:::
