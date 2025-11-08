# 文本输出窗

::: tip
译注：原文为 Text Printer（文本打印机），虽然符合程序设计上的抽象思维，但不太符合制作具体且易于通过词面意义理解的思维。故这里翻译成文本输出窗，下文 “文本输出窗” 与Text Printer（文本打印机）、“输出窗” 与Printer（打印机）等效。
:::

文本输出窗是用于显示文本消息的演出元素，可以逐字显现（打印）文本内容。

输出窗的行为可通过 `Naninovel -> Configuration -> Printers` 上下文菜单进行配置；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#printers)。输出窗资源管理器可通过 `Naninovel -> Resources -> Printers` 上下文菜单访问。

在 Naninovel 脚本中，文本输出窗主要通过 [@print] 和 [@printer] 指令控制：

```nani
; 将 `Dialogue` 输出窗设为默认  
@printer Dialogue

; 将 `Fullscreen` 输出窗设为默认  
@printer Fullscreen

; 使用默认输出窗显示文本
@print text:"Lorem ipsum dolor sit amet."

; 与上相同，但使用通用文本语句  
Lorem ipsum dolor sit amet.

; 与上相同，但关联角色 “Felix”
Felix: Lorem ipsum dolor sit amet.
```

请注意，尽管内置输出窗是以 UI 实现的，但它们依然是演出元素（Actor），所有与可见性相关的动画（显示/隐藏）都遵循指令或演出元素配置中指定的持续时间。例如，[@showPrinter] 指令的 `time` 参数控制显示动画的持续时间，若未指定，则使用输出窗元素配置中的 `Change Visibility Duration` 属性作为默认持续时间；此时输出窗 UI 预制体根节点上的 `Fade Time` 属性将被忽略。

## 自动前进文本

自动前进功能可在执行 [`i`](/api/#i) 指令时自动继续脚本执行。

![](https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4)

等待用户输入或 “i” 指令通常会暂停脚本执行，直到用户触发 `Continue` 输入，常用于显示文本消息后暂停。在自动前进模式下，“i” 指令会根据文本长度暂停一段时间后自动继续执行。暂停时长由上一条输出文本的长度决定，并受游戏设置中的“文字显示速度”影响。

可使用 `AutoPlay` 输入（默认按键为 `A`）或控制面板中的 “AUTO” 按钮切换自动前进模式。

## 跳过文本

文本跳过功能可加速执行 [@print] 指令，从而跳过文字逐字显现过程。

![](https://i.gyazo.com/9605a5c8cd1911217350d77712f47e7d.mp4)

可使用 `Skip` 输入（默认按键为 `Ctrl`）或控制面板中的 “SKIP” 按钮启用或关闭跳过模式。

默认情况下，仅当执行已读过的指令时才可启用跳过模式；例如，当用户尚未阅读即将显示的文本时，跳过模式将不可用。可在游戏设置中通过 “Skip mode” 选项修改此行为。

## 输出窗历史回看

输出窗历史回看允许用户重新查看已输出的文本、复查选项、重听语音，甚至（可选地）回滚至已记录的消息。

![](https://i.gyazo.com/cf9c11c242907e0eae7f5f1b4e2b9f38.mp4)

在游戏主循环期间，可随时通过 `ShowBacklog` 输入（默认按键为 `L`）或控制面板中的 “LOG” 按钮打开历史回看。

历史回看 UI 的多项属性可通过预制体根节点上的组件自定义，具体控制内容请参考属性提示信息。

![](https://i.gyazo.com/40e44a4ed69f75fa5fb9c36cdae6226a.png)

更多关于自定义与配置 UI 的内容，请参阅 [内置 UI 自定义指南](/zh/guide/user-interface#modifying-built-in-ui)。

可通过在输出窗元素配置中禁用 `Add To Backlog` 属性，防止特定输出窗将消息添加至历史回看。启用 `Split Backlog Messages` 属性后，所有日志中的消息将被分割（分别显示为独立记录）。

![](https://i.gyazo.com/9f0155dff068dbe1fd821e9007cf4a5a.png)

## 消息模板

可使用消息模板自动化文本消息的额外处理。每个文本输出窗可通过 [@format] 指令在运行时单独配置，或在编辑器的输出窗面板 UI 中设置 `Default Templates` 属性。以下为内置 `Fullscreen` 输出窗的默认格式模板：

![](https://i.gyazo.com/24774230ec66a5eb783fbe148b5c96d4.png)

你可以在模板中使用任意文本格式化标签或字符，并用 `%TEXT%` 代表消息文本，`%AUTHOR%` 代表作者显示名。例如模板：`“%TEXT%” — <i>%AUTHOR%</i>` 会将文本消息包裹在引号中，并在后方以斜体显示作者名。例如 `Kohaku: Lorem ipsum.` 经过此模板处理后将呈现如下效果：

![](https://i.gyazo.com/53b5ba0f426afc847e51d843ffd6e808.png)

模板按顺序应用，且可通过 `Author` 属性基于作者过滤：指定作者（角色演出元素）ID 可使模板仅作用于该角色，`+` 表示作用于所有带作者的消息，`-` 表示作用于无作者的消息，`*` 表示作用于所有消息。

## 对话输出窗

对话输出窗在具有可变高度的窗口中显示文本。其初始高度约占屏幕三分之一，当内容增加时会自动扩展。对话输出窗还会在文本窗口上方显示角色姓名。

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## 宽屏输出窗

宽屏输出窗与对话输出窗类似，但在布局上针对宽屏幕进行了优化。此外，它们还支持 [角色头像](/zh/guide/characters#avatar-textures) 功能。

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## 全屏输出窗

全屏输出窗在固定大小的窗口中显示文本，占据大部分屏幕空间，适合显示大量文本，也称 “NVL 模式”（或 “小说模式”）。

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

全屏输出窗默认不会在每条连续的输出指令后自动清空文本；如需清除内容，请使用 [@resetText] 指令。可在输出窗演出元素配置中启用 `Auto Reset` 选项以改变此行为。

每条输出指令默认会在文本前自动添加两个换行符（除非输出窗当前内容为空）。可在演出元素配置中将 `Auto Line Break` 设置为 0 以禁用该功能。

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

以下是使用全屏输出窗的示例：

```nani
; 激活全屏输出窗。
@printer Fullscreen

; 以下文本行将在同一个窗口中显示，之间以两个换行符分隔。
Lorem ipsum dolor sit amet. Proin ultricies in leo id scelerisque.
Praesent vel orci luctus, tincidunt nisi et, fringilla arcu. In a metus orci.
Maecenas congue nunc quis lectus porttitor, eget commodo massa congue.

; 清空输出窗内容。
@resetText

; 继续输出更多文本。
Morbi ultrices dictum diam, in gravida neque vulputate in.
...
```

## 聊天输出窗

聊天输出窗在带有可垂直滚动内容的窗口中，以消息气泡的形式显示文本，风格类似于手机聊天应用。与逐字显现文本不同，它会先显示“作者正在输入”的动画（持续时间取决于输出速度），然后立即显示完整消息。聊天输出窗支持 [角色头像](/zh/guide/characters#avatar-textures) 功能。

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

若要在聊天输出窗中嵌入选项，请参阅 [ChatReply](/zh/guide/choices#chatreply-choice-handler) 选项处理器。你也可以通过 `Chat Printer Panel` 组件中的 `Choice Handler Id` 属性指定自定义的选项处理器。

## 气泡输出窗

气泡输出窗可用于漫画/连环画风格的文本展示。

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

内置的气泡输出窗提供两种外观：“Left” 与 “Right”，可根据角色所在位置的左右方向来对齐输出窗的显示位置。

```nani
@printer Bubble.Left pos:42,80 !visible time:0
@show Bubble
Misaki: Aliquam lobortis!
@char Nanikun.Happy
@printer Bubble.Right pos:53,55 !visible time:0
@show Bubble
Nanikun: Integer nec maximus elit, eget posuere risus.
```

要同时显示多个气泡输出窗（或其他类型输出窗），可以添加自定义输出窗。

::: tip
手动为气泡输出窗对齐关联角色的位置可能比较繁琐。可参考 [Wiki 教程](https://discord.com/channels/545676116871086080/1369981077958955079) 了解如何自动化该过程。
:::

## 添加自定义输出窗

你可以基于内置模板添加自定义文本输出窗，或从零开始创建新的输出窗。例如，下面演示如何自定义内置的 `Dialogue` 模板。

通过 `Create -> Naninovel -> Text Printers -> Dialogue` 资源菜单创建一个对话输出窗预制体，建议将其放置在 Naninovel 包之外的文件夹中，例如 `Assets/TextPrinters`。

然后编辑该预制体：修改字体、贴图、添加动画等。有关可用的 UI 构建工具，请参考 [Unity uGUI 官方文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。在 [UI 自定义指南](/zh/guide/user-interface#ui-customization) 中还提供了若干视频教程与示例项目，可作为参考。

使用输出窗资源管理器 GUI 将该预制体暴露给引擎资源。可通过 `Naninovel -> Resources -> Printers` 菜单打开输出窗资源管理器。点击 `+`（加号）按钮添加新记录，输入元素 ID（可与预制体名称不同），双击该记录以打开输出窗元素设置，并将输出窗预制体拖放到 `Resource` 字段中。

![](https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4)

现在，你可以在脚本中通过 [@printer] 指令激活该新输出窗，并指定在资源管理器中设置的元素 ID 以使用它。

```nani
@printer MyNewPrinter
```
::: tip 示例
可参考 [演示项目](/zh/guide/getting-started#demo-project)，了解如何添加自定义输出窗。  
示例预制体存储于 `Assets/Prefabs/CustomPrinter.prefab`。
:::

你也可以通过手动实现 `ITextPrinterActor` 接口从零开始创建输出窗。更多信息请参阅 [自定义演员实现指南](/zh/guide/custom-actor-implementations)。

## 文本显现效果

输出文本的显现进度由 `Revealable Text` 组件控制。该组件封装了 Unity 的 TMPro 文本对象，并支持其所有特性。但 `Revealable Text` 本身不会应用显现效果，通常需结合其他独立组件使用，例如 `Reveal Clipped`，它会根据当前显现进度限制可见字符的最大数量。多数内置输出窗还应用了 `Reveal Fader` 组件，用于为显现的文字添加渐变透明度淡入效果。

![](https://i.gyazo.com/cb76ab871fe4691646e968b2c49d0a13.png)

若要调整显现效果的强度（即渐变淡入范围），请修改 `Length` 属性。

当 `Slack Opacity` 低于 1 时，在追加新文本后，之前输出的文字会在 `Slack Duration` 秒内逐渐淡出至指定透明度。该功能在内置的 `Fullscreen` 输出窗中默认启用。

![](https://i.gyazo.com/29017ea20e8b7b95c3f7f25658b645f9.mp4)

当文本输出窗尺寸固定，无法适应变化的消息长度或字体大小时，请将 TMPro 文本的溢出模式（Overflow Mode）设置为 “page”，并添加 `Reveal Paginator` 组件，使当前显示页与显现进度同步。可在内置 `Fullscreen` 输出窗中查看示例设置。

## 文本样式

可以通过在文本中嵌入富文本标签（Rich Text Tags）或使用 [@format] 指令来应用各种文本样式：

```nani
; 输出文本，其中 “Lorem” 为加粗样式，“sit” 为蓝色斜体。  
Kohaku: <b>Lorem</b> ipsum <color=#0000FF><i>sit</i></color> amet.
```

有关可用的富文本标签，请参阅 [TMPro 富文本文档](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/RichText)。

::: tip
如果希望为某个特定角色或输出窗的所有文本消息统一应用特定的格式或样式，请参考 [消息模板](/zh/guide/text-printers#message-templates) 功能。
:::

## 注音文本

Naninovel 的 `Naninovel TMPro Text` 组件（`Revealable Text` 基于该组件）通过自定义 `<ruby>` 标签支持 [注音（ruby characters）](https://en.wikipedia.org/wiki/Ruby_character)。将需要显示注音的文字放入 `<ruby>` 标签中，并在标签内指定注音文本，例如：

```nani
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet.
```
—— 当消息在运行时输出时，注音文本 “VERY” 将显示在单词 “ipsum” 的正上方。

![](https://i.gyazo.com/ec5eb47c3cf0951ccb589fe49c144418.png)

::: info 注意
当 `<ruby>` 标签与其他富文本标签组合使用时，请优先编写 `<ruby>` 标签，以避免格式冲突，例如：

```nani
Lorem <ruby="VERY"><tip="TipID">ipsum</tip></ruby> dolor sit amet.
```
:::

你还可以通过修改输出窗预制体中 `Naninovel TMPro Text` 组件的属性，来自定义注音文字的大小与垂直偏移量。

默认情况下，当在文本中插入注音内容时，文本行高会自动增加以容纳新内容。若希望所有行（无论是否包含注音）保持相同高度，请禁用 `Add Ruby Line Height` 属性，并适当增加默认行高。

![](https://i.gyazo.com/6b4d9d41438dfc36309a6dc04682dbf5.png)

以下视频展示了 `<ruby>` 标签的实际效果：

![](https://www.youtube.com/watch?v=aWdq7YxIxkE)

## 从右到左文本

所有内置输出窗均支持从右到左（RTL）文本的显现效果。

![](https://i.gyazo.com/38b9ec2bbf18dc6ee469c3fb452eae29.mp4)

要在输出窗中使用 RTL 文本，请按以下步骤操作：

1. 基于任意内置模板创建一个自定义文本输出窗。  
2. 在输出窗内部的 `Revealable Text` 组件中启用 `Enable RTL Editor` 属性。  
3. 在同一组件的 “Naninovel Settings” 下拉菜单中启用 `Fix Arabic Text` 属性。

![](https://i.gyazo.com/3eec751d0c85da8f9cfb20a6fe6902bb.png)

别忘了使用 [兼容的字体](https://fonts.google.com/?subset=arabic&sort=popularity) 并正确配置字体图集；以下为示例：

```
Font Size: Auto Sizing
Font padding: 5
Packing Method: Optimum
Atlas res: 1024x1024
Character Set: Unicode Range (Hex) with this Sequence:
20-7E,600-603,60B-615,61B,61E-61F,621-63A,640-65E,660-6DC,6DF-6E8,6EA-6FF,750-76D,FB50-FBB1,FBD3-FBE9,FBFC-FBFF,FC5E-FC62,FD3E-FD3F,FDF2,FDFC,FE80-FEFC
Font Render Mode: Distance Field 16
```

::: tip 示例
若要查看完整的自定义 TextMeshPro 输出窗并支持从右到左（阿拉伯语）文本的设置示例，请参阅 [RTL 示例](/zh/guide/samples#rtl)。
:::

::: info 注意
Unity 原生并不支持阿拉伯语文本。对于需要支持阿拉伯语显示的文本标签（非输出窗部分），建议使用 `Naninovel TMPro Text` 组件。
:::

## 中日韩（CJK）语言支持

中文、日文与韩文拥有大量独特字符，而游戏中通常只会用到其中一小部分。为优化生成的字体图集（Font Atlas）大小，TMPro 提供了自定义字符集以构建 SDF 纹理的功能。

![](https://i.gyazo.com/cdd1dc10d872d6bcb4d44c14c61df588.png)

若想获取 Naninovel 游戏中实际使用的字符集，可通过 `Naninovel -> Tools -> Character Extractor` 打开字符提取工具（Character Utility）。

![](https://i.gyazo.com/706613a08aa2519964ccd98bd12a288f.png)

该工具会扫描指定文件夹中的所有场景脚本与文本资源（包括子文件夹），从而提取出游戏中玩家可能看到的所有字符，包括输出文本、UI 标签、可解锁提示等。

::: tip 示例
请参阅 [本地化示例](/zh/guide/samples#localization)，了解如何为日语语言环境使用自定义 TMPro 字体图集。当选择日语时会自动切换至日语字体图集，切换回其他语言时则恢复默认字体图集。
:::

## 文本显现音效

对于支持文字显现效果的内置输出窗（目前包括 `Dialogue`、`Fullscreen` 与 `Wide`），你可以为文字显现过程设置音效（SFX）。

按照上文“添加自定义输出窗”的步骤，基于任意内置输出窗创建一个自定义输出窗，然后在预制体根对象上找到 `Revealable Text Printer Panel` 组件，使用 `Chars SFX` 属性设置文字显现时播放的音效。音效选项来源于你通过 `Naninovel -> Resources -> Audio` 菜单添加的音频资源。

下图展示了一个示例配置：空格字符播放 “Keystroke2”，字符 `D`、`d`、`F`、`1`、`4`、`9` 与 `*` 播放 “Explosion”，字符 `%` 不播放音效，其余所有字符播放 “Keystroke1”。

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

此外，你还可以在角色配置菜单中设置 `Message Sound`，当该角色为消息作者时，不论使用哪种输出窗，其文字显现时都会播放角色专属的音效。

文字显现音效播放频率极高（取决于文字显现速度），当同一音效连续播放时会被裁剪，因此应确保音频片段短促、清晰（开头无静音）。

若文字显现音效未按预期播放（例如音效太长无法在每个字符播放一次），可考虑使用 `TextPrinterManager` [引擎服务](/zh/guide/engine-services) 的 `OnPrintTextStarted` 与 `OnPrintTextFinished` 事件，在文本输出窗开始与结束时手动启动或停止循环播放音效。

## 显现事件

你可以在特定字符显现时挂钩事件，以执行任意自定义操作。可在输出文本中使用 `<@...>` 标签指定事件触发位置。例如，在单词 “dolor” 显现后触发携带 “foo” 载荷的显现事件：

```nani
Lorem ipsum dolor<@foo> sit amet.
```

可通过附加在输出窗预制体中可显现文本对象上的 `Event Broadcaster` 组件来监听事件。所有内置输出窗均已预装该组件，因此你只需绑定相应的监听器即可。

![](https://i.gyazo.com/b0fad2439f2b2136a3b3c13f84f365d2.png)

内置输出窗还启用了 **Play Command** （执行指令）选项。启用后，组件会尝试将事件体（即 `@` 之后的部分）解析并执行为指令。例如，以下示例会在 “dolor” 显现时为背景着色：

```nani
Lorem ipsum dolor<@back tint:blue> sit amet.
```

你可以使用事件标签来替代 [内联指令](/zh/guide/naninovel-scripts#command-inlining)，以便将它们暴露给 [本地化文档](/zh/guide/localization#scripts-localization)，从而允许翻译人员根据所选语言修改需要执行的指令。

## 等待输入标签

如果你经常使用 `<@wait i>` 而非 `[-]` 等待输入指令，只是为了让它能被本地化文档识别，可以考虑使用 `<->` 等待输入标签 —— 它具有相同功能，但书写更简短。

```nani
; 与 “Lorem[-] ipsum” 效果相同，  
; 但该等待输入指令将会暴露给本地化文档。  
Lorem<-> ipsum
```

## 显现表达式

在某些情况下，可能需要将 [脚本表达式](/zh/guide/script-expressions) 包含到生成的本地化文档中，或在语言（区域设置）更改时强制重新计算表达式。

其用法与 [显现事件](/zh/guide/text-printers#reveal-events) 类似，但使用 `:` 标签而非 `@` 标签：

```nani
Lorem ipsum <:random(t_text1, t_text2)> sit amet.
```

—— `random(t_text1, t_text2)` 表达式将在每次文本被分配到输出窗时重新计算，包括语言（区域设置）更改时。这会使 `t_text1` 与 `t_text2` 这类 [脚本文本变量](/zh/guide/managed-text#script-text) 与当前激活的语言环境保持同步。此外，该表达式也会被包含在本地化文档中，从而允许为不同语言单独调整。

显现表达式还可帮助译者改变插值变量的顺序，因为不同语言在语法结构和表达顺序上往往存在差异：

—— 在此示例中，`MC` 与 `AC` 两个变量（通常为玩家自定义的角色姓名）都将暴露在生成的本地化文档中，从而使翻译者在需要时可调整它们的顺序。

::: warning
请避免在依赖或修改游戏状态的表达式中使用此功能，否则可能导致未定义行为。例如，若某个表达式的结果依赖于本地变量 `foo`，而带有该表达式的文本消息曾被输出并保存在日志中，当玩家切换语言时，该表达式将基于当时 `foo` 的当前值重新计算，这可能与最初输出时的值不同，从而导致显示不一致。
:::

## 选择标签

[显现表达式](/zh/guide/text-printers#reveal-expressions) 的常见用法之一是将其用作选择器。例如，你可能希望从多个文本中随机选择一个，或根据玩家的选择（如人称代词）显示不同的措辞。

如果这种模式在剧本中频繁使用，每次都编写完整的表达式语法会显得繁琐。此时可考虑使用 **选择标签（select tag）**：

```nani
; 选择随机颜色。
My favourite color is </red/blue/green>.

; 基于玩家选择。
Select your pronouns.
@choice "He/Him" set:selector=0
@choice "She/Her" set:selector=1
@choice "They/Them" set:selector=2
...
</He/She/They> </was/was/were> magnificent.
```

请注意 `</x/y>` 标签 —— 它们即为选择器标签。位于 `/` 之间的文本称为选项。默认情况下，系统会随机返回一个选项。但如果你将变量 `selector` 设置为某个索引值，则标签会返回对应索引（从零开始）的选项。

若需更灵活的选择逻辑，可创建一个自定义的 [表达式函数](/zh/guide/script-expressions#adding-custom-functions)，并为其设置别名 `select`。该函数应接受 `params string[]` 参数并返回一个 `string`。当选择器标签被解析时，将自动调用该函数以计算结果。

以下是一个自定义选择函数示例：第一个选项用于指定选择方式；若第一个选项为空，则默认执行随机选择。

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

你可以在场景脚本中如下使用该功能：

```nani
; 基于代词进行选择。  
</p/his/her/their>

; 基于性格（脾气）进行选择。  
</t/smiling/frowning/poker face>

; 随机选择。  
<//green/red>
```

选择器标签同样会暴露给本地化文档，从而允许译者根据目标语言与文化进行相应调整。
