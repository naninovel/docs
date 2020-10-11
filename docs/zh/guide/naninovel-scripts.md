# Naninovel 脚本

Naninovel脚本时文本文件 (`.nani` 后缀扩展名) 用于控制场景种的事件发生。脚本创建使用 `Create -> Naninovel -> Naninovel Script` 菜单。你可以使用[内置可视化编辑器](#内置可视化编辑器) 或外置文本编辑器, 比如 Notepad, TextEdit 或者 [VS Code](https://code.visualstudio.com).

![](https://i.gyazo.com/f552c2ef323f9ec1171eba72e0c55432.png)

每行在Naninovel中都代表一句状态表现，包含，命令，普通文本，标签，注释。
表达的类型由每行前面的前缀符号定义，如下所示：


前缀符号 | 表达类型 
:---: | --- 
@ | [命令行](#命令行)
# | [标签行](#标签行)
; | [注释行](#注释行)

当前缀没有任何符号的时候，就被视为[普通内容文本行](#普通内容文本行)。


## 命令行

`@`开头的一行，被视为命令行，代表单个操作，可以用于控制场景中的发生动作，
比如：改变背景，移动人物，或者加载另一个naninovel脚本。


### 命令别名

在命令符号`@`之后应该跟一个命令名，命令名可以是生效的C#类名或者使用`CommandAlias`来注释的别名。

比如，[@save]（用于自动保存游戏的命令）是由C#类`AutoSave`来实际运行生效的，在该类前有用`[CommandAlias("save")]`方式注明，所以你就可以使用`@save`或者`@AutoSave`任一来调用该命令。

命令名不区分大小写，下列所示的表达式，都会调用相同的`AutoSave`自动保存命令：


```nani
@save
@Save
@AutoSave
@autosave
``` 

### 命令参数及参数别名

许多命令都有很多参数，定义了命令产生的各种效果。参数是由参数名加(`:`)组成。同样可以由生效命令类对应参数名字或`CommandParameter`注释的别名调用。

基本格式如下：
```nani
@commandId paramId:paramValue 
@命令名 参数名:参数值
```
如[@hideChars]命令，用于隐藏所有场景中可见角色，有如下使用方式：

```nani
@hideChars
```

你可以使用`time`参数，小数控制在人物完全消失的渐隐时长如下：

```nani
@hideChars time:5.5
```

上面所示效果，人物完全消失前有5.5秒的渐隐效果。

你可以使用`wait`布尔参数控制，下一句话是否立即执行，或是在当前命令执行完成后开始执行，如下：

```nani
@hideChars time:5.5 wait:false
@hidePrinter
```

文本将在人物开始隐藏的时候立即消失，如果参数为`true`或者不设置，文本就会在[@hideChars]执行完成后隐藏。


### 参数值类型

Depending on the command parameter, it could expect one of the following value types: 

类型 | 描述
--- | ---
String | 简单string字符串类型， 如`LoremIpsum`，如果中间有空格，记得加双引号如：`"Lorem ipsum dolor sit amet."。
Integer | 整数类型,如：`1`, `150`, `-25`。
Decimal | 浮点数类型，如：`1.0`, `12.08`, `-0.005`。
Boolean | 布尔值，`true` or `false`不分大小写。
Named<> | 一个名字和上述参数值类型组成的参数类型，，名字部分用点分开，比如： *Named&lt;Integer&gt;*: `foo.8`, `bar.-20`。
List<>|  上述参数值类型组成的参数列表型，由逗号分隔，比如： 字符串类型*List&lt;String&gt;*: `foo,bar,"Lorem ipsum."`, 小数类型，*List&lt;Decimal&gt;*: `12,-8,0.105,2`。

### 无名参数

许多命令，都有无名参数，被视为无名参数的指不用指定参数名字的参数。

比如， [@bgm] 命令，就有一个定义播放音轨的无名参数：

```nani
@bgm PianoTheme
```
"PianoTheme" 在这里就是 "Bgm路径" 的*String* 参数。

每个命令都只有一个无名参数，并且一定要定义在所有其他参数之前。

### 可选和必需参数

大多数命令的参数都是*可选*的，这表示命令执行时，这个参数都有个预设值或者不需要任何值。比如，[@resetText] 不定义任何参数时，它就会重置为默认的printer，但是你也可以定义printer的ID比如：`@resetText printer:Dialogue`。

部分参数是命令执行所必需的，所以确保总是定义正确的。


### 命令API参照


当前可用命令，参数以及示例参考 [命令API参照](/zh/api/). 

## 普通内容文本行

为了让写大量文本的时候更舒适，普通文本行会被自动应用。当一行文本前没有任何预设前缀符号的时候，这行话会被默认为普通文本行，如下：


```nani
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

说话人的ID可以写在内容前面，用(`:`)隔开，这样会自动关联[人物元素](/zh/guide/characters.md)中定义的人物，如下：


```nani
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

参照如下所示，在人物ID后面定义外观，可以同时改变人物的外观：

```nani
Felix.Happy: Lorem ipsum dolor sit amet.
```

上面两行所示和下面所示行的效果等效：

```nani
@char Felix.Happy wait:false
Felix: Lorem ipsum dolor sit amet.
```

### 内联命令执行

有时，你可能会想在文本显示的时候达到某些效果执行相应命令，比如在人物说某些话时，改变表情，或者播放音效，对应剧情中的某些事件发生，内联命令执行的这个特性就是用来解决此类问题。

所有命令，([内置命令](/zh/api/) 和 [用户自定义命令](/zh/guide/custom-commands.md)) 都可以内联到普通文本执行，使用中括号隔开(`[`,`]`)，如下：


```nani
Felix: Lorem ipsum[char Felix.Happy pos:0.75 wait:false] dolor sit amet, consectetur adipiscing elit.[i] Aenean tempus eleifend ante, ac molestie metus condimentum quis.[i][br 2] Morbi nunc magna, consequat posuere consectetur in, dapibus consectetur lorem. Duis consectetur semper augue nec pharetra.
```

需要提醒都是，内联语句的语法都和普通语法相同，除了`@` 被省略了，以及用中括号分割这两点。你可以内联使用任何命令，来得到想要的效果，唯一区别是，执行时机取决于普通文本中的哪个位置。

在内联使用时，普通文本行会被内联执行目录转化为独立的命令行执行，文本由[@print]开始执行，比如如下naninovel脚本：


```nani
Lorem ipsum[char Felix.Happy pos:75 wait:false] dolor sit amet.
```

实际上，被引擎识别为一系列的独立命令：

```nani
@print "Lorem ipsum" waitInput:false
@char Felix.Happy pos:75 wait:false
@print "dolor sit amet."
```

如果要在游戏中显示中括号，如下格式书写:
```nani
Some text \[ text inside brackets \]
```

— 这样会在游戏中这样显示："Some text [ text inside brackets ]" 。

## 标签行

标签是作为使用[@goto]命令跳转到相应位置时候的定位锚点，
要使用标签，在文本行开头使用`#`紧接标签名字：


```nani
# Epilogue
```
你可以使用[@goto]命令跳转到上面这行，如下：


```nani
@goto ScriptName.Epilogue
```

在相同脚本中跳转的时候，可以省略脚本名字，如下：


```nani
@goto .Epilogue
```


## 注释行

由符号(`;`) 开头的行为注释行，会被引擎完全忽略，不执行命令，
你可以用来备注，或是为其他开发成员写注释（呵，为其他人写注释，不存在的）：


```nani
; 如下命令会用于自动保存游戏
@save
```

## 条件执行

虽然脚本是线性流程，你可以使用`if`参数改变执行结构，`if`能被所有命令使用：


```nani
; 如果 `level` 值是数字，并且大于9000，添加该选项 。
@choice "It's over 9000!" if:level>9000

; 如果`dead` 变量值是布尔值，并且为`false`执行print命令。
@print text:"I'm still alive." if:!dead

; 如果 `glitch` 变量值是布尔值，并且为 `true` ，或随机得到值大于5则执行`@spawn。
@spawn GlitchCamera if:"glitch || Random(1, 10) >= 5"

; 如果 `score` 值在 7和13 之间或者`lucky` 布尔值为`true`则加载 `LuckyEnd` 脚本.
@goto LuckyEnd if:"(score >= 7 && score <= 13) || lucky"

; 你也可以在内联命令中使用条件判断
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; 当文本中使用了双引号，使用双斜杠注释掉，如下所示：
@print {remark} if:remark=="Saying \\"Stop the car\\" was a mistake."
```

也可在多行，区块间使使用 [@if], [@else], [@elseif] 和 [@endif] 命令：

```nani
@if score>10
	Good job, you've passed the test!
	@bgm Victory
	@spawn Fireworks
@elseif attempts>100
	You're hopeless... Need help?
	@choice "Yeah, please!" goto:.GetHelp
	@choice "I'll keep trying." goto:.BeginTest
	@stop
@else
	You've failed. Try again!
	@goto .BeginTest
@endif
```

提行分行只是为了方便阅读，普通文本也可使用：

```nani
Lorem ipsum dolor sit amet. [if score>10]Duis efficitur imperdiet nunc. [else]Vestibulum sit amet dolor non dolor placerat vehicula.[endif]
```

更多参考信息和格式操作等参考 [脚本表达式](/zh/guide/script-expressions.md) 。

## 可视化编辑器

你可以使用内置可视化编辑器来编辑naninovel脚本，在资源文件中选中脚本是，属性面板会自动打开相应脚本。

[!ba57b9f78116e57408125325bdf66be9]

在右侧编辑器内按右键insert或者Ctrl+Space以插入新行 (可以之后再输入配置菜单自定义快捷键) 然后选择想要的命令行，过直接输入左边的编号，或是直接拖拽来重新排序已有的行，在右侧编辑器内按右键remove移除已有行。

修改文件会有(*) 符号显示，按Ctrl+S 保存修改，未保存当前文件修改去改动其他脚本时会有提示询问是否保存。

使用其他编译器编译时候注意保存修改，内置编辑器会自动同步修改，所以你可以同时使用文本编辑器和内置可视化编辑器。如果自动同步没有工作，确保菜单中的`Edit -> Preferences -> General`中的`Auto Refresh`打开。

运行时，你可以通过可视化编辑器看到当前执行行，或者右击跳转到相应行。这个功能需要在资源管理菜单内配置的资源ID名字相同。


[!b6e04d664ce4b513296b378b7c25be03]

当前执行的行，会有绿色高亮提示，当脚本执行到会需要等待玩家进行输入操作时，则为黄色提示。

你可以在编辑器菜单中调整其他设置，和视觉表现。


![](https://i.gyazo.com/4b4b2608e7662b02a61b00734910308c.png)

[!!9UmccF9R9xI]

## 脚本可视化

当在进行大量文本的非线性剧本开发时，有可视化表现故事流程会让开发流程变得简单，此时就需要用到可视化编程工具。


[!0dd3ec2393807fb03d501028e1526895]

要使用该工具窗口，打开`Naninovel -> Script Graph` ，你可以将该窗口嵌入任何面板。

该工具会为所有在 (`Naninovel -> Resources -> Scripts`) 绑定过的脚本（用节点表示），自动创建可视化流程表现，并在之间连接。

该工具的连线是根据[@goto]和[@gosub]命令。如果命令中有条件判断 (`if` 参数)，在相应位置鼠标悬停时会有黄色高亮提示。

你可以通过单击小窗口或单个节点打开脚本内置可视化编辑器。
单击小窗口内置可视化编辑器会自动跳转到相应有label标签的地方（如果定义了label的）。

你可以根据需要重新排布节点，当退出该工具活着退出Unity时，都会自动保存相应修改。你也可以通过"Save"按钮手动保存，点击 "Auto Align"按钮重置小窗口位置。

当脚本修改后，或者添加了新脚本，点击"Rebuild Graph"来同步显示。


## 热加载

在运行时，可以实时应用修改（通过内置可视化编辑器或者外置编辑器），
不需要重启运行，这个功能是在脚本配置菜单中`Hot Reload Scripts` 属性控制，默认开启的。

当在当前执行行前面，修改，添加，删除某行时，会自动跳转到修改行开始执行， 避免前后的表现不一致。

如果热加载没工作，请确保，`Edit -> Preferences -> General` 中的
`Auto Refresh`启用，`Script Changes While Playing` 是使用的`Recompile And Continue Playing`选项。


![](https://i.gyazo.com/5d433783e1a12531c79fe6be80c92da7.png)

要手动加载要执行的脚本（比如，编辑脚本在Unity工程外），使用
`reload` [控制台命令](/zh/guide/development-console.md)
该命令只能在编辑器使用，不会在发布后生效。


## IDE支持

IDE特性，比如方法高亮，错误检查，自动补充，文本关联等，能够显著提升编码效率，我们已经提供了免费的开源[VS Code](https://code.visualstudio.com) (支持Windows, MacOS 和 Linux)
扩展，该插件为naninovel提供了关键的IDE特性支持。


![](https://i.gyazo.com/b1f5c6845c04d1b18b2196aa29ea6c19.png)

参考以下视频教程，激活和使用该扩展。

[!!xxx]

其他浏览器支持会在后续添加， 更多信息参考 [the issue on GitHub](https://github.com/Elringus/NaninovelWeb/issues/56#issuecomment-492987029)。

## 脚本Debug

当有大量脚本开发时，要查看脚本某部分的演出效果，从头开始演示肯定会很繁琐。


使用 [开发控制台](/zh/guide/development-console.md) 你可以连续回调到当前的脚本的任意位置：

```
rewind 12
```

—这会跳转到12行，你可以任意向前或者向后跳转，要在游戏时打开控制台，确保引擎配置中控制台为打开，然后按`~` 键（可自行改键），或在触控设备使用多点触控（3点或更多同时点击）呼出。

要查看哪个是执行脚本，在debug窗口输入`debug`然后按`Enter`显示窗口。


![Scripts Debug](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

当前使用的脚本名，行号，内联脚本目录，都会显示在窗口标题上，当[自动语音](/zh/guide/voicing.md#自动语音) 打开时，播放的语音名字也会显示出来。可以点击标题拖拽窗口。 "Stop" 按钮会停止脚本执行，"Play"会重新开始执行，"Close"按钮关闭debug窗口。

debug窗口在编辑器下和发布工程都可以使用。

