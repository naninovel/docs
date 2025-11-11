# 受管文本

受管文本功能允许通过可本地化的文档来管理（或替换） Naninovel 中使用的各种文本元素，例如游戏内的 UI 文本与角色显示名称。

要生成受管文本文档，可通过 Unity 菜单 `Naninovel -> Tools -> Managed Text` 打开受管文本工具。

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

点击 “Select” 按钮选择存储受管文本文档的路径（默认应为 `Resources/Naninovel/Text`），然后按下 “Generate” 按钮以生成文档。

你也可以通过 `Create -> Naninovel -> Managed Text` 菜单创建自定义的受管文本文档。

受管文本文档中的每一行都是以下格式的表达式：*Path*: *Value*，其中 *Path* 为文本变量路径，*Value* 为该变量的值。例如，以下为 “DefaultUI” 文档的默认内容，其中包含了内置 UI 的文本记录：

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

你可以直接编辑这些值，修改将在下次运行时生效。

启用 `Delete Unused` 属性后，将删除那些未被 `ManagedTextProvider` 组件或源代码中的 `ManagedText` 属性直接引用的记录（下文将详细说明）。

::: tip
要在受管文本的值中插入换行符，请使用 `<br>` 标签；该标签可被 TMPro 文本系统直接识别。
:::

## 受管文本提供器

可通过 `ManagedTextProvider` 组件在无需编写脚本的情况下，将任意 Unity 游戏对象与受管文本记录绑定。  
在目标对象上添加 `ManagedTextProvider` 组件，指定 **Category**（文档名称）与 **Key**（记录键名），然后使用 `OnValueChanged` 事件将文本值绑定到对象的属性上。

以下示例展示了如何将 “MyCustomDocument” 文档中键为 “MyCustomText” 的记录绑定到 Unity 的 “Text” 组件上：

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

当 `ManagedTextProvider` 组件用于自定义 UI、文本打印器或选项处理器时，使用受管文本工具生成文档时将自动包含对应记录（前提是这些资源已在配置菜单中指定）；其他情况下则需手动添加记录。

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## 受管文本变量

你也可以在源代码中将静态字符串变量与受管文本记录绑定。为此，在静态字符串字段上添加 `ManagedText` 特性。当引擎初始化时，字段的值将被受管文本文档中对应的值覆盖。

以下示例展示了如何在 C# 脚本中使用受管文本变量以实现文本标签的本地化：

```csharp
using Naninovel;
using UnityEngine.UI;

// 继承自 Unity 的文本组件，因此可以直接作为普通文本组件使用。
public class CustomLabel : Text
{
    // “CustomLabel.LabelText” 受管文本记录的值将在引擎初始化时赋给下方变量，
    // 并在切换语言（locale）时自动更新。
    [ManagedText("foo")] // “foo” 是该记录所属文档的名称。
    public static string LabelText = "bar"; // “bar” 是默认值。

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // 将当前记录值赋给文本标签。

        var l10n = Engine.GetService<ILocalizationManager>();
        // 当用户在运行时切换语言时，更新文本标签。
        l10n.OnLocaleChanged += _ => text = LabelText;
    }
}
```

## 脚本文本

可以在 Naninovel 剧本中直接获取受管文本的值。这在需要在脚本表达式中使用本地化文本时非常实用。

创建名为 “Script” 的受管文本文档，并添加以 `T_` 或 `t_` 为前缀的键名记录。之后即可在剧本表达式中引用这些值。例如，若在 “Script” 受管文本文档中包含以下记录：

```
T_Greeting1: Hey!
T_Greeting2: Hello!
T_Greeting3: Hi!
```

— 即可在剧本中通过以下方式引用这些值：

```nani
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

“Script” 受管文本文档可以像其他文档一样进行本地化；当用户选择另一种语言时，文本将自动从相应的本地化文档中引用。

## 本地化

受管文本的本地化流程与 Naninovel 剧本的本地化类似：

1. 在 `Resources/Naninovel/Text` 文件夹中生成（创建或编辑）所需的受管文本文档。  
2. 在目标语言的本地化文件夹中运行本地化工具（`Resources/Naninovel/Localization/{Locale}`，其中 `{Locale}` 为目标语言标识）。  
3. 源受管文本文档的本地化文件将出现在对应的语言文件夹中，可在其中添加或编辑翻译内容。

若需更新受管文本文档及其对应的本地化版本，请先在 `Resources/Naninovel/Text` 文件夹中运行生成受管文本工具，再在 `Resources/Naninovel/Localization/{Locale}` 文件夹中运行本地化工具。两种工具在默认情况下都会尽量保留现有修改（包括文本记录及翻译），因此每次更新时无需从头开始重新编写。

有关如何使用本地化工具的更多信息，请参阅 [Localization](/zh/guide/localization)。

::: tip 示例
在 [本地化示例](/zh/guide/samples#localization) 中可以找到一个包含受管文本的本地化设置示例，可在你自己的项目中遇到问题时作为参考。
:::

## 自定义文档

你可以根据需要创建任意数量的自定义受管文本文档，并在引擎初始化后于 C# 中使用。这些自定义文档的功能与上述内置类型相同：你可以在 C# 和 Naninovel 剧本中访问它们，通过 `Managed Text Provider` 组件获取记录，自动生成本地化文档，等等。

通过 `Create -> Naninovel -> Managed Text` 菜单，在 `Resources/Naninovel/Text` 文件夹中创建新的自定义受管文本文档（或通过自定义资源提供器公开它）。生成后，该文档可通过 C# 中的 `ITextManager` 引擎服务访问。以下示例展示了如何访问名为 `Custom` 的自定义文档中内容为 `Foo: Bar` 的记录。

```cs
var manager = Engine.GetService<ITextManager>();
// 文档必须在访问前加载；
// 通常在自定义系统初始化时执行一次。
await manager.DocumentLoader.Load("Custom");
var document = manager.GetDocument("Custom");
var record = document.Get("Foo");
Debug.Log($"Key: {record.Key} Value: {record.Value}");
```
