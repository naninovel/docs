# 自定义命令

命令代表单个操作，控制这场景中的发生事件。比如，可以用于改变背景，移动角色，或是加载其他脚本。[naninovel 脚本](/zh/guide/naninovel-scripts.md) 定义的参数化命令序列可有效控制游戏流程。您可以在[API参考 ](/zh/api/) 中找到可用的内置命令。在代码中，所有内置脚本命令实现均在 `Naninovel.Commands` 命名空间下定义。

要添加自己的自定义脚本命令，请创建一个C#的新类派生自`Command` 并实现ExecuteAsync抽象方法。引擎将自动选择创建的类，能够通过类名或别名（如果已分配）从naninovel脚本调用命令。要将别名分配给naninovel命令，请将`CommandAlias` 标签应用于该类。

`ExecuteAsync` 是当脚本执行命令时调用的异步方法。使用 [引擎服务](/zh/guide/engine-services.md) 访问引擎内置系统。Naninovel脚本将会暂停，直到该执行方法完成返回 `Wait` 参数为 `true`。

要将命令参数公开给naninovel脚本，请使用一种受支持的类型向命令类添加一个公共字段：

字段类型 | 值类型 | 脚本示例
--- | --- | ---
StringParameter | String | `LoremIpsum`, `"Lorem ipsum"`
IntegerParameter | Int32 | `10`, `0`, `-1`
DecimalParameter | Single | `0.525`, `-55.1`
BooleanParameter | Boolean | `true`, `false`
NamedStringParameter | NamedString |  `Script001.LabelName`, `.LabelName`
NamedIntegerParameter | NamedInteger | `Yuko.5`
NamedDecimalParameter | NamedFloat | `Kohaku.-10.25`
NamedBooleanParameter | NamedBoolean | `Misaki.false`
StringListParameter | List&lt;String> | `Lorem,ipsum,"doler sit amet"`
IntegerListParameter | List&lt;Int32> | `10,-1,0`
DecimalListParameter | List&lt;Single> | `0.2,10.5,-88.99`
BooleanListParameter | List&lt;Boolean> | `true,false,true`
NamedStringListParameter | List&lt;NamedString> | `Felix.Happy,Jenna.Confidence`
NamedIntegerListParameter | List&lt;NamedInteger> | `Yuko.5,Misaki.-8`
NamedDecimalListParameter | List&lt;NamedFloat> | `Nanikun.88.99,Yuko.-5.1`
NamedBooleanListParameter | List&lt;NamedBoolean> | `Misaki.false,Kohaku.true`

另外，您可以将 `[ParameterAlias]`属性应用于字段，作为参数别名，从而在naninovel脚本中引用参数时可以使用别名而不是字段名称。如果想设置为无名参数，则将 `Command.NamelessParameterAlias` 常量（空字符串）设置为别名；请注意，每个命令只允许使用一个无名参数。

要使参数为必需设置的（在naninovel脚本中未指定该参数时会在控制台报错），请将 `[RequiredParameter]` 属性应用于该字段。如果不应用该属性，则该参数被视为可选参数。

所有参数类型都有 `HasValue` 属性，可以使用它来测试是否已在naninovel脚本中分配了参数；（可选）可以使用 `Command.Assigned()` 静态方法，该方法采用参数实例，并在提供的参数不为null并分配了值时返回true。

如果命令的执行需要加载一些资源，实现`Command.IPreloadable` 接口，以在游戏加载时时预加载要使用的资源。

如果命令具有可以本地化的参数（通常直接向用户显示文本），请实现 `Command.ILocalizable` 接口以将命令添加到生成的脚本本地化文档中。

您可以在 `Naninovel/Runtime/Commands`文件夹中找到所有内置命令实现的脚本。在实现自己的自定义命令时，可以随时将它们用作参考。

这是一个自定义命令的示例，可以从naninovel脚本调用该命令 `@HelloWorld` 或 `@hello` 将 `Hello World!` 打印到控制台，还可以使用一个可选 `name` 参数（例如`@hello name:Felix`）来提供名称：

```csharp
using Naninovel.Commands;
using System.Threading;
using UniRx.Async;
using UnityEngine;

[CommandAlias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        if (Assigned(Name))
        {
            Debug.Log($"Hello, {Name}!");
        }
        else
        {
            Debug.Log("Hello World!");
        }

        return UniTask.CompletedTask;
    }
}
```

注意可选 `CancellationToken` 参数。如果调用任何异步方法，请确保检查该值的取消请求，并尽快返回该值。

::: example
关于添加自定义命令来在背包中增加删除道具的示例在[背包示例项目中](https://github.com/Elringus/NaninovelInventory) 。

另外，命令实现存储在[Runtime/Commands](https://github.com/Elringus/NaninovelInventory/tree/master/Assets/NaninovelInventory/Runtime/Commands) 目录中。
:::