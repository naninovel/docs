# 文本打印机

文本打印机是用于呈现可以随时间显示（打印）的文本消息的 actor。

可以使用 `Naninovel -> Configuration -> Printers` 上下文菜单配置打印机的行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#printers)。可以使用 `Naninovel -> Resources -> Printers` 上下文菜单访问打印机的资源管理器。

在剧本脚本中，文本打印机主要通过 [@print] 和 [@printer] 命令控制：

```nani
; 将使 "Dialogue" 打印机成为默认打印机
@printer Dialogue

; 将使 "Fullscreen" 打印机成为默认打印机
@printer Fullscreen

; 将使用默认打印机打印该短语
@print text:"Lorem ipsum dolor sit amet."

; 与上面相同，但使用通用文本语句
Lorem ipsum dolor sit amet.

; 与上面相同，但与角色 "Felix" 关联
Felix: Lorem ipsum dolor sit amet.
```

请注意，即使内置打印机是作为 UI 实现的，它们仍然是 actor，并且所有与 actor 相关的可见性更改（显示/隐藏动画）都使用相应命令或 actor 配置中设置的持续时间；例如，[@showPrinter] 命令的 `time` 参数控制显示动画的持续时间，如果未指定，则使用打印机 actor 配置属性 `Change Visibility Duration` 作为默认持续时间；在这种情况下，忽略打印机 UI 预制件根目录下的 `Fade Time` 属性。

## 自动前进文本

自动前进功能允许脚本在等待输入（单击以继续）事件时自动继续执行。

![](https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4)

等待用户输入或 `[-]` 命令会停止脚本执行，直到用户激活 `Continue` 输入；它们通常用于打印文本消息之后。在自动前进模式下，`[-]` 命令将改为停止脚本执行一段时间，然后完成，允许执行下一个命令。停止时间取决于最后打印的文本消息的长度，并由 "Print speed" 游戏设置进一步修改。

可以使用 `AutoPlay` 输入（独立输入模块默认为 `A` 键）或控制面板中的 "AUTO" 按钮切换自动前进模式。

## 文本跳过

文本跳过功能允许快进执行 [@print] 命令，从而有效地跳过文本显示（打印）过程。

![](https://i.gyazo.com/9605a5c8cd1911217350d77712f47e7d.mp4)

可以使用 `Skip` 输入（独立输入模块默认为 `Ctrl` 键）或控制面板中的 "SKIP" 按钮切换跳过模式。

默认情况下，跳过模式仅在执行过去已经执行过的命令时可用；例如，如果用户尚未阅读将要打印的文本，则跳过模式将不可用。这可以在游戏设置中使用 "Skip mode" 设置进行更改。

## 打印机积压日志

打印机积压日志是一项功能，允许用户重新阅读以前打印的文本、查看选定的选项、重播语音行以及（可选）回滚到记录的消息。

![](https://i.gyazo.com/cf9c11c242907e0eae7f5f1b4e2b9f38.mp4)

可以通过激活 `ShowBacklog` 输入（独立输入模块默认为 `L` 键）或按控制面板中的 "LOG" 按钮在主游戏循环期间随时显示积压日志。

可以通过附加到预制件根目录的组件自定义各种积压日志 UI 属性；有关每个属性控制内容的详细信息，请参阅属性的工具提示。

![](https://i.gyazo.com/40e44a4ed69f75fa5fb9c36cdae6226a.png)

有关如何自定义和配置 UI 的更多信息，请参阅 [内置 UI 自定义指南](/zh/guide/gui#修改内置-ui)。

可以通过在打印机 actor 配置中禁用 `Add To Backlog` 属性来防止特定文本打印机将消息添加到积压日志中。启用 `Split Backlog Messages` 属性时，添加到积压日志的消息将拆分为单独的记录。

![](https://i.gyazo.com/9f0155dff068dbe1fd821e9007cf4a5a.png)

## 消息模板

您可以使用消息模板自动化文本消息的附加处理。处理是在运行时使用 [@format] 命令或在编辑器中通过打印机面板 UI 的 `Default Templates` 属性为每个文本打印机单独配置的。例如，下面是内置 `Fullscreen` 打印机的默认格式模板：

![](https://i.gyazo.com/24774230ec66a5eb783fbe148b5c96d4.png)

您可以指定任何文本格式标签或字符，并使用 `%TEXT%` 替换为消息文本，使用 `%AUTHOR%` 替换为作者显示名称。例如，考虑以下模板：`“%TEXT%” — <i>%AUTHOR%</i>` — 它将打印的消息用引号括起来，后面跟着一个破折号和斜体作者姓名；例如，使用此类模板处理的 `Kohaku: Lorem ipsum.` 将导致：

![](https://i.gyazo.com/53b5ba0f426afc847e51d843ffd6e808.png)

分配的模板按顺序应用，`Author` 属性允许根据打印消息的作者过滤应用的模板。指定作者（角色 actor）ID 以使模板仅适用于该特定作者，指定 `+` 以使其适用于任何有作者的消息，指定 `-` 以使其适用于无作者的消息，或指定 `*` 以将其应用于任何消息。

## Dialogue 打印机

Dialogue 打印机在具有灵活高度的窗口内呈现文本。它们最初占据屏幕大小的三分之一左右，并在内容需要更多空间时增加高度。Dialogue 打印机还在文本窗口上方的标签中显示关联的角色名称。

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## Wide 打印机

Wide 打印机与 Dialogue 打印机非常相似，只是面板布局针对宽显示屏进行了一些更改。Wide 打印机还支持 [角色头像](/zh/guide/characters#头像纹理) 功能。

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## Fullscreen 打印机

Fullscreen 打印机在具有静态大小的窗口内呈现文本。它们占据大部分屏幕大小，旨在呈现大量文本，又名 "NVL" 模式。

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

默认情况下，Fullscreen 打印机不会在每个连续的打印命令上重置文本；相反，根据需要使用 [@resetText] 命令清除打印机的内容。可以通过在打印机 actor 配置菜单中启用 `Auto Reset` 来更改此设置。

默认情况下，由 Fullscreen 打印机处理的每个打印命令都会在打印的文本之前添加两个换行符（除非打印机的当前内容为空）。可以通过在打印机 actor 配置菜单中将 `Auto Line Break` 设置为零来禁用此功能。

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

下面是使用 Fullscreen 打印机的示例。

```nani
; 激活 Fullscreen 打印机。
@printer Fullscreen

; 以下行将打印在同一窗口中，由 2 个换行符分隔。
Lorem ipsum dolor sit amet. Proin ultricies in leo id scelerisque.
Praesent vel orci luctus, tincidunt nisi et, fringilla arcu. In a metus orci.
Maecenas congue nunc quis lectus porttitor, eget commodo massa congue.

; 清除打印机的内容。
@resetText

; 打印更多行。
Morbi ultrices dictum diam, in gravida neque vulputate in.
...
```

## Chat 打印机

Chat 打印机在窗口中以气泡形式呈现文本，内容可垂直滚动，类似于移动通讯应用。它不逐个字符地显示打印的消息，而是在显示效果期间显示“作者正在输入”动画，然后立即显示打印的消息。Chat 打印机支持 [角色头像](/zh/guide/characters#头像纹理) 功能。

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

要在 Chat 打印机内嵌入选项，请参阅 [ChatReply](/zh/guide/choices#chatreply-选项处理程序) 选项处理程序。您还可以通过 `Chat Printer Panel` 组件上的 `Choice Handler Id` 属性指定自定义处理程序。

## Bubble 打印机

Bubble 打印机可用于漫画/连环画风格的文本呈现，也称为“语音气泡”。

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

内置的 Bubble 打印机支持两种外观："Left" 和 "Right"，可根据其相对于角色的位置对齐打印机的方向。

```nani
@printer Bubble.Left pos:42,80 !visible time:0
@show Bubble
Misaki: Aliquam lobortis!
@char Nanikun.Happy
@printer Bubble.Right pos:53,55 !visible time:0
@show Bubble
Nanikun: Integer nec maximus elit, eget posuere risus.
```

要一次显示多个 Bubble（或任何其他）打印机，请添加自定义打印机。

### 气泡锚点

广泛使用 Bubble 打印机时，每次都手动指定其位置可能会很乏味。相反，使用 actor 锚点让 Naninovel 自动将气泡与其各自的角色对齐。

要启用此功能，请在 [角色 actor](/zh/guide/characters) 内指定锚点位置。您有两个选择：

1. 在角色元数据中，使用 `Anchors` 列表并添加带有 `Bubble` ID 和 actor 游戏对象内的本地位置的记录。
2. 如果角色是预制件（例如，分层、通用或 Live2D），请在预制件内创建一个空游戏对象，附加 `Actor Anchor` 组件并将 `Bubble` 分配为锚点 ID。

正确配置后，Naninovel 不仅会将打印机定位在锚点上方，而且当它们溢出屏幕时还会翻转它们。您可以为每个角色指定多个锚点，以便根据打印机是否翻转进行更精确的对齐。以下是支持的锚点 ID：

| 锚点 ID | 描述 |
|----------------------|----------------------------------------------------------|
| `Bubble` | 当没有其他锚点适合时的默认或后备锚点。 |
| `Bubble/TopLeft` | 当气泡在左上角对齐时使用。 |
| `Bubble/Top` | 当气泡在顶部边缘对齐时使用。 |
| `Bubble/TopRight` | 当气泡在右上角对齐时使用。 |
| `Bubble/Left` | 当气泡在左边缘对齐时使用。 |
| `Bubble/Right` | 当气泡在右边缘对齐时使用。 |
| `Bubble/BottomLeft` | 当气泡在左下角对齐时使用。 |
| `Bubble/Bottom` | 当气泡在底部边缘对齐时使用。 |
| `Bubble/BottomRight` | 当气泡在右下角对齐时使用。 |

您不必指定所有这些：Naninovel 会选择最合适的那个，即使缺少精确匹配。例如，如果左上对齐但缺少 `Bubble/TopLeft`，它将检查 `Bubble/Left`，然后检查 `Bubble/Top`，最后回退到 `Bubble`。
下面是一个指定四个锚点的示例 — 每个角落一个：

![](https://i.gyazo.com/4bebc7823d44f2c02d0521d17de806e4.png)

::: tip EXAMPLE
在我们的 [示例项目](/zh/guide/samples) 中的 `Content/Characters` 下查看 `Hiyori` 和 `Senko` Live2D 角色，了解通过角色元数据和预制件内部设置气泡锚点的示例。
:::

构建自定义 Bubble 打印机时，可以在 `Floating Printer` 属性下配置翻转和对齐行为。有关每个属性如何影响行为的更多信息，请参阅工具提示。

![](https://i.gyazo.com/f37ff4c135cb29c68122881ec02b45a6.png)

使用带锚点的自动对齐时，有时您可能希望手动定位气泡。您可以使用 [@printer] 命令来执行此操作 — 当命令指定显式位置时，自动对齐将暂时禁用。要重新启用它，请使用 `anchor!` 标志：

```nani
; 禁用自动对齐并手动定位气泡
@printer Bubble pos:50,50
...
; 重新启用自动对齐
@printer Bubble anchor!
```

## 添加自定义打印机

您可以基于内置模板添加自定义文本打印机，也可以从头开始创建新打印机。例如，让我们自定义内置的 `Dialogue` 模板。

使用 `Create -> Naninovel -> Text Printers -> Dialogue` 资产上下文菜单在 Naninovel 包之外的某处创建对话预制件，例如在 `Assets/TextPrinters` 文件夹中。

编辑预制件：更改字体、纹理、添加动画等。有关可用 UI 构建工具的更多信息，请参阅 [uGUI 的 Unity 文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。在 [UI 自定义指南](/zh/guide/gui#ui-自定义) 中还有一些关于使用 uGUI 的教程视频和示例项目。

使用打印机的管理器 GUI 将预制件公开给引擎资源，可以使用 `Naninovel -> Resources -> Printers` 上下文菜单访问该 GUI。使用 `+`（加号）按钮添加新记录，输入 actor ID（可以与预制件名称不同），然后双击记录以打开 actor 设置。将打印机预制件拖放到 `Resource` 字段。

![](https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4)

您现在可以通过 [@printer] 命令激活新文本打印机并指定您在管理器中设置的 actor ID 来使用它。

```nani
@printer MyNewPrinter
```

::: tip EXAMPLE
查看 [演示项目](/zh/guide/getting-started#demo-project) 以获取有关添加自定义打印机的示例。预制件存储为 `Assets/Prefabs/CustomPrinter.prefab`。
:::

也可以通过手动实现 `ITextPrinterActor` 接口从头开始创建打印机。有关更多信息，请参阅 [自定义 actor 实现](/zh/guide/custom-actor-implementations) 指南。

## 文本显示效果

打印文本消息的显示进度由 `Revealable Text` 组件维护，该组件包装了 Unity 的 TMPro Text 并支持所有相同的功能。为此，使用了独立组件，例如 `Reveal Clipped`，它根据当前的显示进度限制最大可见字符。大多数内置打印机还应用了 `Reveal Fader` 组件，该组件为显示的字符添加渐变不透明度淡入淡出。

![](https://i.gyazo.com/cb76ab871fe4691646e968b2c49d0a13.png)

要更改显示效果强度（淡入淡出延伸多远），请更改 `Length` 属性。

当 `Slack Opacity` 小于 1 时，最后一次追加之前打印的文本的不透明度将在 `Slack Duration` 秒内淡入到指定值（这在内置 `Fullscreen` 打印机中默认启用）。

![](https://i.gyazo.com/29017ea20e8b7b95c3f7f25658b645f9.mp4)

当文本打印机具有恒定尺寸并且无法适应不同的消息长度或字体大小时，请将 TMPro 的文本溢出模式设置为 "page" 并添加 `Reveal Paginator` 组件，该组件会将当前显示的页面与显示进度同步。在内置 `Fullscreen` 打印机中查找示例设置。

## 文本样式

可以通过放置在文本内的富文本标签或使用 [@format] 命令应用各种文本样式：

```nani
; 以粗体打印 "Lorem"，以蓝色和斜体打印 "sit"。
Kohaku: <b>Lorem</b> ipsum <color=#0000FF><i>sit</i></color> amet.
```

有关可用标签，请参阅 [TMPro 富文本文档](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/RichText)。

::: tip
如果您想对特定角色或打印机创作的所有消息应用特定的文本格式或样式，请查看 [消息模板](/zh/guide/text-printers#消息模板) 功能。
:::

## 注音 (Furigana)

Naninovel 的 `Naninovel TMPro Text` 组件（`Revealable Text` 基于它）通过自定义 `<ruby>` 标签提供对 [注音](https://en.wikipedia.org/wiki/Ruby_character) 字符的支持。将应在其上方放置注音字符的文本用注音标签括起来，并在标签内指定注音文本，例如：

```nani
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet.
```
— 在运行时打印消息时，"VERY" 注音文本将出现在 "ipsum" 单词的正上方。

![](https://i.gyazo.com/ec5eb47c3cf0951ccb589fe49c144418.png)

::: info NOTE
当将 `<ruby>` 与其他标签结合使用时，请最后指定注音标签以防止格式问题，例如：

```nani
Lorem <tip="TipID"><ruby="VERY">ipsum</ruby></tip> dolor sit amet.
```
:::

您可以通过更改打印机预制件中使用的 `Naninovel TMPro Text` 组件的属性来额外控制注音文本的大小和垂直行偏移。

默认情况下，当注音文本插入打印消息时，行高会增加以补偿新内容。为确保所有行（无论是否有注音文本）的高度相等，请禁用 `Add Ruby Line Height` 属性并增加默认行高。

![](https://i.gyazo.com/6b4d9d41438dfc36309a6dc04682dbf5.png)

以下是注音标签的视频演示。

![](https://www.youtube.com/watch?v=aWdq7YxIxkE)

## 从右到左 (阿拉伯语) 文本

可以在所有内置打印机中启用对 RTL 文本显示效果的支持。

![](https://i.gyazo.com/38b9ec2bbf18dc6ee469c3fb452eae29.mp4)

要在打印机中使用 RTL 文本，请执行以下操作：
1. 从任何内置模板创建自定义文本打印机。
2. 设置打印机内部 `Revealable Text` 组件中的 `Enable RTL Editor` 属性。
3. 在同一组件上（在 "Naninovel Settings" 下拉列表下）启用 `Fix Arabic Text` 属性。

![](https://i.gyazo.com/3eec751d0c85da8f9cfb20a6fe6902bb.png)

不要忘记使用 [兼容的字体](https://fonts.google.com/?subset=arabic&sort=popularity) 和图集配置；这是一个例子：

```
Font Size: Auto Sizing
Font padding: 5
Packing Method: Optimum
Atlas res: 1024x1024
Character Set: Unicode Range (Hex) with this Sequence:
20-7E,600-603,60B-615,61B,61E-61F,621-63A,640-65E,660-6DC,6DF-6E8,6EA-6FF,750-76D,FB50-FBB1,FBD3-FBE9,FBFC-FBFF,FC5E-FC62,FD3E-FD3F,FDF2,FDFC,FE80-FEFC
Font Render Mode: Distance Field 16
```

::: tip EXAMPLE
有关设置支持从右到左（阿拉伯语）文本的自定义 text mesh pro 打印机的完整示例，请参阅 [RTL 示例](/zh/guide/samples#rtl)。
:::

::: info NOTE
Unity 原生不支持阿拉伯语文本。考虑对应该支持阿拉伯语的文本标签（打印机除外）使用 `Naninovel TMPro Text` 组件。
:::

## CJK 语言

中文、日语和韩语有许多独特的符号，而游戏中通常只需要一小部分。为了优化生成的字体图集大小，TMPro 有一个选项可以指定为其构建 SDF 纹理的字符集。

![](https://i.gyazo.com/cdd1dc10d872d6bcb4d44c14c61df588.png)

要查找 Naninovel 将显示哪些字符，请使用可通过 `Naninovel -> Tools -> Character Extractor` 编辑器菜单访问的 Character Utility。

![](https://i.gyazo.com/706613a08aa2519964ccd98bd12a288f.png)

该工具将检查指定文件夹（包括所有子文件夹）中的剧本脚本和管理文本文档，因此您将获得 Naninovel 向玩家显示的所有文本的字符，包括所有打印文本、UI 标签、可解锁提示等。

::: tip EXAMPLE
查看 [本地化示例](/zh/guide/samples#本地化)，了解如何为日语区域设置使用自定义 TMPro 字体图集。选择日语时字体会自动切换，选择其他语言时会切换回默认图集。
:::

## 文本显示声音

对于支持显示效果的内置打印机（目前为 `Dialogue`、`Fullscreen` 和 `Wide`），您可以选择设置显示字符时播放的 SFX。

按照上面的“添加自定义打印机”指南创建基于任何内置打印机的自定义打印机，然后找到附加到预制件根对象的 `Revealable Text Printer Panel` 组件，并使用 `Chars SFX` 属性设置显示字符时要播放的 SFX。可用选项的实际列表基于您通过 `Naninovel -> Resources -> Audio` 菜单添加的音频资源。

下图表示一种设置，其中 "Keystroke2" SFX 将用于空格，"Explosion" 用于字符 `D`、`d`、`F`、`1`、`4`、`9` 和 `*`，`%` 字符不播放 SFX，所有其他字符播放 "Keystroke1"。

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

或者，您可以在角色配置中设置 `Message Sound`，以便在显示该角色为消息作者的文本时播放特定于角色的声音（无论哪个文本打印机正在打印消息）。

文本显示声音播放非常频繁（取决于消息显示速度），并且在连续播放相同声音时会被裁剪，因此请确保相应的音频剪辑非常短且清晰（开头没有任何暂停或静音）。

如果显示声音不适合您（例如，声音不够短，无法在每个字符显示时播放），请考虑使用 `TextPrinterManager` [引擎服务](/zh/guide/engine-services) 的 `OnPrintTextStarted` 和 `OnPrintTextFinished` 事件来相应地开始/停止循环声音。

## 显示事件

可以挂钩显示特定字符时的事件以执行任意操作。使用 `<@...>` 标签在打印文本中指定应调用事件的位置。例如，要在显示 "dolor" 后触发带有 "foo" 有效负载的显示事件：

```nani
Lorem ipsum dolor<@foo> sit amet.
```

使用附加到打印机预制件的可显示文本对象的 `Event Broadcaster` 组件来侦听事件。所有内置打印机均已附加该组件，因此您只需连接侦听器即可。

![](https://i.gyazo.com/b0fad2439f2b2136a3b3c13f84f365d2.png)

内置打印机还启用了 **Play Command** 选项。这将使组件尝试解析并执行事件主体（`@` 之后的部分）作为命令。例如，以下将在显示 "dolor" 时着色背景：

```nani
Lorem ipsum dolor<@back tint:blue> sit amet.
```

您可以使用事件标签代替 [内联命令](/zh/guide/scenario-scripting#命令内联) 将它们公开给 [本地化文档](/zh/guide/localization#脚本本地化)，允许翻译人员根据所选区域设置覆盖执行的命令。

## 等待输入标签

如果您经常使用 `<@wait i>` 而不是 `[-]` 等待输入命令只是为了将它们公开给本地化文档，请考虑改用 `<->` 等待输入标签 — 它的工作方式相同，但键入更短。

```nani
; 与 'Lorem[-] ipsum' 相同，但等待输入
; 命令将公开给本地化文档。
Lorem<-> ipsum
```

## 显示表达式

在某些情况下，可能需要在生成的本地化文档中包含 [脚本表达式](/zh/guide/script-expressions) 或在语言（区域设置）更改时强制重新评估表达式。

该过程类似于 [显示事件](/zh/guide/text-printers#显示事件)，但使用 `:` 标签代替 `@`：

```nani
Lorem ipsum <:random(t_text1, t_text2)> sit amet.
```

— 每次将文本分配给打印机时（包括语言更改时），都会重新评估 `random(t_text1, t_text2)` 表达式，从而使 `t_text1` 和 `t_text2` [脚本文本变量](/zh/guide/managed-text#脚本文本) 与当前活动区域设置同步。表达式也将包含在本地化文档中，允许为每种特定语言更改它。

显示表达式对于允许翻译人员更改注入值的顺序也很有用，因为语言对各种词性的顺序/优先级有不同的规则是很常见的：

```nani
Hello, <:MC>! How's <:AC> doing?
```

— 在这里，`MC` 和 `AC` 变量（可能包含玩家指定的角色名称）都将暴露在生成的本地化文档中，以便翻译人员在必要时能够更改它们的顺序。

::: warning
避免在改变或依赖游戏状态的表达式中使用此功能，因为它可能会导致未定义的行为。例如，考虑一个表达式，其结果取决于局部变量 `foo`，而包含此表达式的消息在某个时刻被打印并保留在积压日志中。如果玩家更改区域设置，表达式将使用 `foo` 在更改区域设置时的任何值重新评估，这可能与最初打印时不同。
:::

## 选择标签

[显示表达式](/zh/guide/text-printers#显示表达式) 的一个常见用例是将它们用作选择器。例如，您可能希望包含池中的随机文本或取决于玩家选择的内容，例如依赖于代词的措辞。

如果这在您的场景中很普遍，那么每次重复完整的表达式语法可能会变得乏味。在这种情况下，请考虑使用选择标签：

```nani
; 选择一种随机颜色。
我最喜欢的颜色是 </red/blue/green>。

; 基于用户选择进行选择。
选择您的代词。
@choice "He/Him" set:selector=0
@choice "She/Her" set:selector=1
@choice "They/Them" set:selector=2
...
</He/She/They> </was/was/were> magnificent.
```

注意 `</x/y>` 标签 — 这些是选择器标签。`/` 字符之间的文本称为选项。默认情况下，将返回随机选项。但是，如果您将 `selector` 变量设置为索引，标签将改为返回具有该索引（从零开始）的选项。

如果您需要更灵活的选择逻辑，请创建一个带有 `select` 别名的自定义 [表达式函数](/zh/guide/script-expressions#添加自定义函数)，并使其接受 `params string[]` 并返回 `string`。每当编译选择器标签时，它都会使用您的函数来评估结果。下面是自定义选择函数的示例，其中第一个选项指定选择类型，如果第一个选项为空，则回退到随机选择：

```cs
[ExpressionFunction("select")]
public static string Select (params string[] args)
{
    var kind = args[0];
    var options = args[1..];
    return kind switch {
        "p" => SelectPronoun(options),
        "t" => SelectTemper(options),
        _ => options[Random.Range(0, options.Length)]
    };
}
```

然后您可以在场景中如下使用它：

```nani
; 基于代词选择。
</p/his/her/their>

; 基于脾气选择。
</t/smiling/frowning/poker face>

; 随机选择。
<//green/red>
```

选择器标签也暴露给本地化文档，允许翻译人员根据需要调整结构以适应目标文化。
