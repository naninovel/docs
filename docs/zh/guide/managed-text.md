# 管理文本

管理文本功能允许通过可本地化文档管理（替换）整个 Naninovel 中使用的各种文本元素，例如游戏内 UI 字符串和角色的显示名称。

要生成管理文本文档，请使用可通过 `Naninovel -> Tools -> Managed Text` 编辑器上下文菜单访问的管理文本工具。

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

使用 "Select" 按钮，选择存储管理文本文档的路径（默认为 `Resources/Naninovel/Text`），然后按 "Generate" 创建文档。

您还可以使用 `Create -> Naninovel -> Managed Text` 资产上下文菜单创建自定义管理文本文档。

管理文本文档中的每一行都是以下格式的条目：*Path*: *Value*，其中 *Path* 是文本变量的路径，*Value* 是该变量的值。例如，这是 "DefaultUI" 文档的默认内容，其中包含内置 UI 的记录：

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

您可以编辑这些值，更改将在下次运行时应用。

启用 `Delete Unused` 选项将删除管理文本文档中未通过 `ManagedTextProvider` 组件或源代码中的 `ManagedText` 属性直接引用的记录（稍后会详细介绍）。

::: tip
要在管理文本值中插入换行符，请使用 `<br>` 标签，TMPro 文本开箱即支持该标签。
:::

## 管理文本提供者

可以通过 `ManagedTextProvider` 组件将任意 Unity 游戏对象绑定到管理文本记录，而无需任何脚本；将组件添加到游戏对象，指定 `Category`（文档名称）、`Key`（文档内的记录名称）并使用 `OnValueChanged` 事件将值绑定到游戏对象属性。

下面是将存储在 "MyCustomDocument" 文档中键为 "MyCustomText" 的管理文本记录绑定到 Unity `Text` 组件的示例。

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

当在自定义 UI、文本打印机或选项处理程序中使用 `ManagedTextProvider` 组件时，使用管理文本工具时将自动生成相应的记录（前提是在配置菜单中分配了资源）；对于其他情况，您必须手动添加记录。

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## 管理文本变量

也可以将管理文本记录绑定到源代码中的变量。为此，请将 `ManagedText` 属性添加到静态字符串字段。该字段的值将在引擎初始化时被管理文本文档中指定的值覆盖。

下面是在 C# 脚本中使用管理文本变量来本地化文本标签的示例。

```csharp
using Naninovel;
using UnityEngine.UI;

// 继承自 Unity 的 Text 组件，以便我们可以像使用它一样使用它。
public class CustomLabel : Text
{
    // "CustomLabel.LabelText" 管理文本记录的值将在引擎初始化时分配给
    // 下面的变量，并在区域设置更改时更新。
    [ManagedText("foo")] // "foo" 是记录的文档名称。
    public static string LabelText = "bar"; // "bar" 是默认值。

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // 将当前记录值分配给标签。

        var l10n = Engine.GetService<ILocalizationManager>();
        // 当用户在运行时更改区域设置时更新标签。
        l10n.OnLocaleChanged += _ => text = LabelText;
    }
}
```

## 脚本文本

您可以直接从剧本脚本引用管理文本值。当您希望脚本表达式使用可本地化文本时，这很有用。

创建一个名为 `Script` 的管理文本文档，并使用带有 `T_` 或 `t_` 前缀的键添加记录。假设在 `Script` 管理文本文档中有以下记录：

```
T_Greeting1: 嘿！
T_Greeting2: 你好！
T_Greeting3: 嗨！
```

—您可以使用以下方式引用这些值：

```nani
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

`Script` 管理文本文档可以像其他文档一样进行本地化；当用户选择另一个区域设置时，文本将自动从相应的本地化文档中引用。

## 本地化

管理文本本地化遵循与剧本脚本类似的工作流程：

1. 在 `Resources/Naninovel/Text` 文件夹中生成（创建/编辑）所需的管理文本文档。
2. 在区域设置文件夹（`Resources/Naninovel/Localization/{Locale}`，其中 `{Locale}` 是目标区域设置标签）中运行本地化实用程序。
3. 源管理文本文档的本地化文档将出现在相应的区域设置文件夹中。使用它们来添加或编辑翻译。

要更新管理文本文档及其对应的本地化副本，请首先在 `Resources/Naninovel/Text` 文件夹中运行生成管理文本实用程序，然后在 `Resources/Naninovel/Localization/{Locale}` 中运行本地化实用程序。默认情况下，这两个实用程序都将尝试保留任何现有的修改（管理文本记录及其翻译），因此您不必在每次更新时重写所有内容。

有关如何使用本地化实用程序的更多信息，请参阅 [本地化](/zh/guide/localization)。

::: tip EXAMPLE
在 [本地化示例](/zh/guide/samples#本地化) 中查找本地化设置示例（包括管理文本）。如果您在自己的项目中设置本地化时遇到问题，请将其用作参考。
:::

## 自定义文档

您可以根据自定义需求创建任意数量的管理文本文档，并在引擎初始化时在 C# 中使用它们。这些自定义文档的功能与上面讨论的内置类型相同：您可以在 C# 和剧本脚本中访问它们，通过 `ManagedTextProvider` 组件检索记录，自动生成本地化文档等。

通过 `Resources/Naninovel/Text` 文件夹下的 `Create -> Naninovel -> Managed Text` 资产上下文菜单创建一个新的自定义管理文本文档（或通过您选择的资源提供者公开它）。然后可以通过 C# 中的 `ITextManager` 引擎服务访问该文档。下面是访问名为 `Custom` 且内容为 `Foo: Bar` 的自定义文档中的记录的示例。

```cs
var manager = Engine.GetService<ITextManager>();
// 文档必须在访问之前加载；
// 通常在自定义系统初始化期间执行一次。
await manager.DocumentLoader.Load("Custom");
var document = manager.GetDocument("Custom");
var record = document.Get("Foo");
Debug.Log($"Key: {record.Key} Value: {record.Value}");
```
