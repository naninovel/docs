# 托管文本

托管文本功能允许管理（替换）整个Naninovel中使用的各种文本元素，例如游戏中的UI和使用本地化文档显示角色名称。

要生成托管文本文档，通过`Naninovel -> Tools -> Managed Text` 菜单打开托管文本工具。

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

使用"Select"（选择）按钮，选择要存储托管文本文件的路径（默认应该为： `Resources/Naninovel/Text` ），然后点击 "Generate" 生成按钮来创建文件。

可以通过 `Create -> Naninovel -> Managed Text` 来创建自定义托管文本文件。

托管文本文档中的每一行都是以下格式的表达式：Path：Value，其中Path是文本变量的路径，而Value是该变量的值。例如，以下是“ DefaultUI”文档的默认内容，其中包含内置UI的记录：

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

你可以编辑所有值，更改将在下次运行时应用。

开启 `Delete Unused` 属性会移除托管文本文件中没有过被`ManagedTextProvider`和`ManagedText`源码中引用的条目。

## 托管文本加载器

可以通过 `ManagedTextProvider` 组件不用代码，将任意Unity物体和托管文本相关联；
在该物体挂载该组件，定义类别（包含该记录的文件名），键值（文本内该记录的名字）并使用 `OnValueChanged` 事件绑定该值到游戏物体。

以下是将"MyCustomDocument"文本文件中 "MyCustomText" 的值绑定到Unity的 "Text" 组件的示例：

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

 `ManagedTextProvider`  组件用于自定义UI时，文本打字机，选择处理，使用托管文本工具生成时，对应记录会自动生成（这些UI已在配置菜单配置）；其他情况就需要自己手动添加记录了。

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## 托管文本变量

托管文本记录也可和源码中的变量绑定。在任意C#代码中的静态字符串（string）字段前添加 `ManagedText` 标记。该值就会在引擎初始化的时候覆写托管文本中的配置值。

以下是C#中使用该功能来为文本标签进行赋值的示例：

```csharp
using Naninovel;
using UnityEngine.UI;

// 继承UI的Text组件Inheriting our class from the Unity's text component, so we can use it as one.
public class CustomLabel : Text
{
    //"CustomLabel.LabelText"的值会和托管文本值关联到下面的值，并会在地区选择改变时更新。
    [ManagedText("MyCustomUI")] // "MyCustomUI" 是保存该文本值的托管文本文件名
    public static string LabelText = "Default Value"; // "Default Value" 为默认值

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // 将当前托管文本内的值赋值到该文本对象

        // 运行时，当地区选择改变时，更新该值
        Engine.GetService<ILocalizationManager>().OnLocaleChanged += _ => text = LabelText;
    }
}
```

## 脚本获取托管文本值

可以直接从naninovel脚本获取托管文本值。当脚本中需要使用部分值，或是做本地化的时候会很方便。

创建名为“script”的托管文本，为里面的条目添加 `T_` 或 `t_` 前缀。现在就可以在脚本表达式中引用该值了；如下为托管文本内容示例：

```
T_Greeting1: Hey!
T_Greeting2: Hello!
T_Greeting3: Hi!
``` 

— 你可以在脚本像如下引用:

```nani
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

当然，"Script" 也可以像其他托管文本一样的方式来做本地化；当用户改变地区设置的时候，文本就会自动从相应的本地化文本中获取值。

## 本地化

托管文本本地化过程类似于naninovel脚本：
Managed text localization process resemble the one for naninovel scripts: 

1. `Resources/Naninovel/Text` 文件夹中生成（创建，编辑）所需的托管文本文档。
2. 在语言环境文件夹(`Resources/Naninovel/Localization/{Locale}`，`{Locale}`是目标语言环境的标记）中运行本地化实用程序。
3. 托管文本文档的本地化文档将出现在相应的语言环境文件夹中。对它们进行对应语言的添加或编辑翻译。

要更新托管文本和其对应的本地文件，在`Resources/Naninovel/Text` 目录运行本地化实用程序，然后选择`Resources/Naninovel/Localization/{Locale}` 文件夹。他们会尝试保存所有已有的修改（托管文本记录和其翻译），因此你不必每次都重头开始编辑所有内容。

有关如何使用本地化实用程序的更多信息，请参见[本地化](/zh/guide/localization.md) 。

 ::: example
 可以参考本地化示例（包含托管文本）[示例工程](/zh/guide/getting-started.md#Demo-工程示例)。 如果你在自己的项目中遇到问题，请用做参考。
:::