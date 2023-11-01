# 本地化

所有游戏资源（脚本，音频，语音，背景等）都可以本地化为多种语言/文化。

默认情况下，所有游戏资源都会根据*source locale*（源语言环境）来调用。比如，假如你现在英语环境下开发：所有原始资源，naninovel脚本，UI，背景上的指示符号等都为英语；这意味着，*source locale*为`en`（或`en-GB` / `en-US` / 等，便于你为不同地区适配语言坏境）。

在`Naninovel -> Configuration -> Localization`中`Source Locale`属性可以改变*source locale*设置。`Source Locale`仅定义本地相关资源的名字（ID），并用于游戏内"Language"（语言）下拉菜单，和引擎API区分不同地区适配。

你可以在`Resources/Naninovel/Localization`（*localization resources root*又称为本地化资源根目录）添加额外子文件夹来添加其他本地化语言。文件夹命名参考[RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) 。比如，如果要添加德语，创建目录`Resources/Naninovel/Localization/de`。游戏内语言下拉菜单就会自动添加该语言设置。

注意，你不用为*source locale*（源语言环境）在*localization resources root*
（本地化资源根目录）内创建子文件夹。默认所有在此之外的资源都属于*source locale*（源语言环境）范畴。

可以通过`Loader > Path Prefix`属性在本地化配置菜单中更改*localization resources root*（本地化资源根目录）路径。注意，为"Resources"文件夹（而非"Assets"）的相对路径。资源文件夹由Unity 以[特殊方式](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime.html) 处理。你可以在项目里任意位置放多个"Resources"文件夹来达到管理资源的目的。

您可以设置在玩家首次运行游戏时默认选择的语言环境，通过设置本地化配置菜单中`Default Locale`属性。如果未指定该属性，则默认情况下，游戏将在*source locale*（源语言环境）中启动。

![](https://i.gyazo.com/fb50a8c5f5fa6624105f8eeca6a7523e.png)

## 资源本地化

*localization resources root*（本地化资源根目录）存储的是在游戏中本地化设置选择的对应本地化资源。

比如，如果你想替换"city"的主背景外观（背景元素ID为"MainBackground"），此时选择区域选择为"ja-JP"，将资源放入如下路径：
`Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City`。

## 脚本本地化

除了Naninovel脚本和托管文本，上述本地化方案适用于所有资源。这类资源，使用`Naninovel -> Tools -> Localization`里的本地化工具来管理：

![Localization Tool](https://i.gyazo.com/5c6b023cbf4617f44102593f13131571.png)

首先，选择存储生成的本地化资源的语言环境文件夹的路径。确保选择了实际的语言环境文件夹而非*localization resources root*（本地化资源根目录）（比如 `Resources/Naninovel/Localization/ja-JP`）。属性字段下的标签将在选择有效的输出区域设置文件夹时，显示所选本地化目标的名称。

启用"Try update"（“尝试更新”）属性将尝试保留任何当前现有的本地化资源。禁用后，指定路径上的所有现有本地化资源都将丢失。

启用 "Localize text"（“本地化文本”）还将生成[托管文本](/zh/guide/managed-text) 本地化文档。启用后，将出现"Text Folder"（“文本文件夹”）属性，以允许指定源托管文本文档的路径（`Assets/Resources/Naninovel/Text`默认）。可以将路径设置为包含文本文档本地化版本的文件夹，以生成使用非源语言的本地化版本。

按"Generate"（“生成”）按钮创建（更新）本地化资源。

脚本本地化文档由以下格式的语句组成：

```nani
# ID
; Source text
Translation text
```

`# ID` 行是naninovel脚本中源语句的唯一标识符，请勿修改。

`; Source text`是希望翻译的原始文本。这只是一条注释，因此更改此行不会有任何效果。提供它是为了方便。

将实际翻译直接放在带有源文本的注释行之后。可以使用任意数量的行进行翻译，只需确保将它们放在下一`# ID` 行之前。

这是通用文本行的示例翻译：

```nani
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно. Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

如果翻译占用太多空间，可以将其分解为单独的命令：


```nani
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно.
Yuko: Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

应该将源语句中存在的任何内联命令包括在翻译中：

```nani
# b53b395d
; Kohaku: Qui ante molestie sit tempor felis.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Adipiscing elit?[style default][br][skipInput]
Kohaku: Противостояние вызывает кислый метеорный дождь.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Меандр разрушаем?[style default][br][skipInput]
```

::: warning
 **不应该翻译角色ID** （或任何其他元素的 ID）。某些功能（例如，字符高亮和嘴型同步）将出现问题。如果你想翻译文本打字机的显示名字，使用[姓名显示](/zh/guide/characters#显示姓名) 特性。
:::

生成过程完成后，将在本地化工具窗口中显示包含在生成的本地化文档中的总字数（不包括哈希行）。

默认情况下，生成的文档将包含从源naninovel脚本获取的待翻译文本。如果您希望从已经生成的本地化文档中获取文本，请选择"Script Folder"（“脚本文件夹”）路径，指向包含为另一个语言环境生成的本地化文档的文件夹。例如，假设您的来源语言环境是西班牙语。默认情况下，本地化文档将包含西班牙语的源文本。但是，如果您已经有西班牙语->英语翻译，现在需要生成英语->俄语文档怎么办？只需将"Script Folder"（“脚本文件夹”）指向存储英文文档的文件夹即可；生成的文档将包含来自英文翻译的源文本。

::: tip EXAMPLE
您可以在[演示项目](/zh/guide/getting-started#演示项目) 中找到示例本地化设置。如果在自己的项目中设置本地化时遇到问题，请将其用作参考。
:::
