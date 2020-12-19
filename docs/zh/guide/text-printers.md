# 文本打字机

文本打印机是用于随时间显示文字的演出元素。

文本打印机表现可以在菜单`Naninovel -> Configuration -> Printers`中配置。可用选项参考[配置说明](/zh/guide/configuration.md#文本打字机)。 资源配置管理在`Naninovel -> Resources -> Printers` 菜单内。

在脚本中，文本打印机，大多由[@print] 和 [@printer]命令控制：


```nani
; 会将普通对话打字机设为默认
@printer Dialogue

; 会将全屏打字机设为默认
@printer Fullscreen

; 按默认格式打印“”内的文本
@print text:"Lorem ipsum dolor sit amet."

; 同上效果，书写格式不同。
Lorem ipsum dolor sit amet.

;同上效果，但是会关联名字"Felix"
Felix: Lorem ipsum dolor sit amet.
```

注意，虽然内置文本打印机作为UI生效，但它仍然是演出元素，并且所有可见的演出元素相关的改变（显示/隐藏动画）都可以在相应命令中或演出元素配置中使用持续时间设置，比如： [@showPrinter]参数`time`，用于控制动画时长，不定义时`Change Visibility Duration`就会使用默认配置。在预制体中的配置，如 `Fade Time变淡时间` 属性则在打字机的UI预制体中配置。


## 自动显示文本

该特性会在使用 [`i`](/zh/api/#i) 命令时，自动执行脚本。


[!e6f58f861fa18bd62591db9794e7641b]

使用 [`i`](/zh/api/#i) 命令可以停止脚本执行，当玩家由键入输入操作时继续执行。一般在文本中间插入使用。停止间隔时长取决于之前显示的文本长度，以及游戏中的 "Print speed"设置。

使用 `AutoPlay` 输入（默认PC为A键），或者游戏中的控制栏的"AUTO"键切换。

简单说这个命令就是用来自己控制自动播放文本节奏的。

## 跳过文本

跳过文本特性，能够快速执行[@print] 命令，显著加快文本显示速度。

[!9605a5c8cd1911217350d77712f47e7d]

跳过功能能够通过控制面板上的 "SKIP" 按钮或`Ctrl`键（PC默认配置）来开启。

默认情况下，跳过只会跳过已经执行过的文本。比如：如果玩家没有度过将要打印的文本，该功能就会不可用。该设置可以在游戏内的 "Skip mode" 设置中修改。

## 对话回顾

对话回顾时允许玩家回顾之前已读文本内容的功能。

[!4bde6752b676aa1acedb54d2af075ced]

玩家可以通过控制面板的"LOG"按钮或`L`键（PC默认配置）来开启。

## 对话打字机

对话打字机会把文本内容显示在自适应高度的窗口内。该窗口默认会占用全屏三分之一的高度，并且会随着文本量自己增加高度。它会在上方的小窗口关联相关内容的说话人如下。

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## 宽屏打字机

宽屏打字机和对话打字机很类似，仅仅时面板布局调整为宽屏布局，但时支持[人物头像](/zh/guide/characters.md#头像贴图)特性。

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## 全屏打字机

全屏打字机会将内容显示在固定窗口大小中。它会占用屏幕中的大部分空间，显示大量的文本，即是“视觉小说”模式。


![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

全屏打字机，不会按[@print]自动清空内容，可以使用[@resetText] 来按需清空。该设置可以在打字机元素的配置菜单中开启`Auto Reset`来改变。

每个[@print]命令后的内容都会自动被两个空行分割（如下图，除开当前文本内容为空的情况）。该设置可以在打字机元素的配置菜单中开启`Auto Line Break`数值来控制想要的空行数量。

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

以下是使用全屏打字机的示例：

```nani
; 将全屏打字机设为默认。
@printer Fullscreen

; 以下内容将会在同一个窗口显示，由两个空行分割。
Lorem ipsum dolor sit amet. Proin ultricies in leo id scelerisque. 
Praesent vel orci luctus, tincidunt nisi et, fringilla arcu. In a metus orci. 
Maecenas congue nunc quis lectus porttitor, eget commodo massa congue.

; 清空当前窗口
@resetText

; 继续输入显示更多文字行
Morbi ultrices dictum diam, in gravida neque vulputate in. 
...
```

## 聊天窗口打字机

聊天窗口打字机，是像手机APP一样按照聊天气泡垂直滚动，来显示文本内容的。除了显示角色对话，还会在文字显示的时候显示"author is typing"（正在输入）提示。该特性支持[人物头像](/zh/guide/characters.md#头像贴图)特性 。


![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

当使用通用文本行和[@print]命令是，打字机都会默认清空之前的文本。在聊天窗口打字机下也是一样。但这并不符合大多数情况。设置`reset`参数为*false*就可以避免清空之前的文本。如下所示：


```nani
@print "Orci varius natoque penatibus." author:Kohaku reset:false
@print "Integer ullamcorper fringilla ipsum a scelerisque." author:Yuko reset:false
```

— 这样两行文本就能同时显示出来了。

## 气泡打字机

该打字机可用于呈现漫画，画册的文本呈现。

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

内置气泡有左右两种表现，可根据人物立绘方向来决定使用哪一种。


```nani
@printer Bubble.Left pos:42,80 visible:false time:0
@show Bubble wait:false
Misaki: Aliquam lobortis!
@char Nanikun.Happy wait:false
@printer Bubble.Right pos:53,55 visible:false time:0
@show Bubble wait:false
Nanikun: Integer nec maximus elit, eget posuere risus.
```

要同屏显示多个气泡，需要添加自定义打字机，参考下一小节。


## 添加自定义打字机

你可以根据内置模板或者从零开始创建自己的打字机。现在我们以内置的普通对话打字机为例来添加一个自定义打字机。
You can add custom text printers based on the built-in templates or create new printers from scratch. For example, let's customize the built-in `Dialogue` template. 

使用菜单`Create -> Naninovel -> Text Printers -> Dialogue`创建新的对话预制体存放在Naninovel的目录之外。比如：`Assets/TextPrinters`目录下。
Use `Create -> Naninovel -> Text Printers -> Dialogue` asset context menu to create a dialogue prefab somewhere outside of the Naninovel package, e.g. at the `Assets/TextPrinters` folder. 

编辑该预制体：改变字体，贴图，添加动画，等等。关于uGUI的使用参考[unity的uGUI文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest).和[UI使用引导](/zh/guide/user-interface.md#UI自定义) ，内附示例及演示视频。


在菜单`Naninovel -> Resources -> Printers`下绑定好创建好的预制体。按`+`添加新条目，输入该打字机元素的ID，然后双击该条目来打开该打字机的相关配置，将预制体拖拽到`Resource`处。


[!3f51881fa554720b7a4092dca42fd15e]

现在你就可以通过[@printer] 命令加你定义的ID来调用该打字机了，如下：


```nani
@printer 你定义的ID
```

::: 示例
也可参考[演示项目](/zh/guide/getting-started.md#演示项目) ，该打字机存储在`Assets/Prefabs/PimpedPrinter.prefab`。在Kohaku-chan使用时调用了。
:::

也可以通过接口`ITextPrinterActor`来从零开始创建你的自定义打字机。相关功能实现参考[自定义元素实现](/zh/guide/custom-actor-implementations.md) 。

当编辑文本组件的时候注意，行高小于 1.0 的时候不支持（渲染行高会覆盖该设置，导致不能应用出现效果）。考虑修改文本字体来减少行间距。

## 文本显示效果

默认的，文字显示使用的渐入渐隐效果，如果你想使用更传统的的文字效果，你可以关闭`Slide Clip Rect` 将`Revealable Text`中的`Reveal Fade Width`属性设置为0.
`Revealable Text` 在部分内置的打字机中使用。比如，你可以在`Fullscreen/Content/Printer/Text`游戏物体中找到`全屏打字机`的预制体。


![](https://i.gyazo.com/ab848f3c1c56921634b9d2b872e7c0cb.png)

## 文字出现音效

内置打字机，`对话打字机`，`全屏打字机`，`宽屏打字机`支持显示效果，你也可以选择设置声效，在角色显示的时候播放。


按照“添加自定义打字机”说明添加基于内置打字机的自定义打字机时，找到对应预制体的`Revealable Text Printer Panel`组件，在`Reveal Sfx`属性中配置需要的声效。该声效的内的选项配置，在`Naninovel -> Resources -> Audio`中添加。

你也可以通过`Chars SFX`列表来为特定角色设置多种音效。下图为演示，"Keystroke2"为非角色情况下播放的（如旁白）；`D`， `d`， `F`， `1`， `4`， `9`， 和 `*`角色播放"Explosion"；`%`对应的为无音效播放；其他所有角色则会播放"Keystroke1" 。

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

另外，你也可以通过设置角色配置菜单内的`Message Sound`，来为特定角色的文本显示配置音效，（不受打字机种类限制）。`Message Sound`和打字机内的`Chars SFX`的优先级，前者更高，两者都配置了的情况下，会只播放前者。`Chars SFX`和`Message Sound`的优先级也是前者更高，会优先播放前者的配置音效。

由于显示音效会被经常播放（取决于消息显示速度），同一音效反复播放会影响效果，所以确保你的配置音效简短连续（在开头没有任何停顿或空白）。

如果显示文本声效不工作（比如，声音太长），考虑使用`TextPrinterManager` [引擎支持](/zh/guide/engine-services.md) 的`OnPrintTextStarted`和`OnPrintTextFinished`事件来开始/停止音效循环。这些事件也对playmaker公开，如果你想使用[可视化编程](/zh/guide/playmaker.md)。


## TextMesh Pro

Naninovel 支持 [TextMesh Pro](https://assetstore.unity.com/packages/essentials/beta-projects/textmesh-pro-84126) 通过内置的 `TMProFullscreen`, `TMProDialogue`, `TMProWide` and `TMProBubble` 打字机模板使用TMPro UI text组件来实现。

![](https://i.gyazo.com/bb143607ce79e5a28d89052c7f9fb07c.png)

在使用TMPro的打字机以前，确保通过`Window -> Package Manager`已经导入了TextMesh Pro资源。

你可以使用[@printer]命令，按下面所示来使所有文本调用TMpro打字机：


```nani
; 激活TMpro的对话打字机
@printer TMProDialogue
; 使用上面激活的打字机显示文本
Hello World!
```

在创建TextMesh Pro字体或者材质时，不要忘记在`Naninovel/RevealableTMProText`中应用你的创建资源，否则文本出现效果会不照常工作。

![](https://i.gyazo.com/18e112ba90cad84f44f0b78db0db303a.png)

## 文本风格

多种文本风格，可以通过[@style]命令或者右边内文本标签使用。

默认的内置打字机（非TMpro的），都基于[Unity文字渲染](https://docs.unity3d.com/Manual/script-Text.html) ，支持其所有文字特性，如颜色，大小，加粗，斜体等。可以参考[文本使用引导](https://docs.unity3d.com/Manual/StyledText.html)。

TMpro的打字机支持更多的文字效果，参考[官方手册](http://digitalnativestudios.com/textmeshpro/docs/rich-text/) 。

标注文字的使用是由TMpro的打字机支持，通过`<ruby>` 标签调用，用于在特定文字上方标注相应文字，比如：


```nani
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet. 
```
— "VERY" 标注文字就会在 "ipsum"显示的时候，标注在其上方。

你可以通过打字机预制体的`RevealableTMProText`组件内的属性控制标注文字的垂直偏移，字体大小等。


![](https://i.gyazo.com/7e1e927c144f30353baaab2ac7b643c7.png)

以下是关于标注文字使用的视频演示。

[!!aWdq7YxIxkE]
