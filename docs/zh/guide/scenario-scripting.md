# 剧本脚本

剧本脚本是扩展名为 `.nani` 的文本文档，用于控制场景中发生的事情。要创建脚本资产，请在资产上下文菜单中选择 `Create -> Naninovel -> Scenario Script`。您可以使用内置的 [故事编辑器](/zh/guide/editor) 打开和编辑脚本，也可以使用自己喜欢的外部文本或代码编辑器，例如 Microsoft Word、Google Docs 或 [VS Code](/zh/guide/ide-extension)。

![?class=when-dark](https://i.gyazo.com/9ffce86c54b5bfc5497dd50fa59a637e.png)
![?class=when-light](https://i.gyazo.com/6f5a92d83eb2071ac06cbb72c2d0579e.png)

剧本脚本中的每一行都代表一条语句，它可以是命令、通用文本、导航标签或注释。语句的类型由放在行首的符号决定：

| 符号 | 语句 |
|:------:|---------------------------|
| @ | [命令](#命令行) |
| # | [标签](#标签行) |
| ; | [注释](#注释行) |

当行首不存在上述任何符号时，它被视为 [通用文本](#通用文本行) 语句。

::: tip
通过 [编译器本地化](/zh/guide/localization#编译器本地化) 功能，可以更改编译器中所有预定义的内容，包括符号、命令标识符、常量，以及编写脚本时需要输入的几乎所有内容。
:::

## 命令行

以 `@` 符号开头的行会被视为命令语句。每条命令代表一个控制场景的操作，例如更改背景、移动角色或加载另一个剧本脚本。

### 命令标识符

命令符号之后应紧跟命令标识符。它可以是实现该命令的 C# 类的名称，也可以是命令的别名（如果已通过 `Alias` 特性为该类指定了别名）。

例如，[@save] 命令（用于自动保存游戏）由 `AutoSave` C# 类实现。实现类还应用了 `[Alias("save")]` 特性，因此您可以在脚本中使用 `@save` 和 `@AutoSave` 语句来调用此命令。

命令标识符不区分大小写；以下所有语句均有效并将调用相同的 `AutoSave` 命令：

```nani
@save
@Save
@AutoSave
@autosave
```

### 命令参数

大多数命令都有若干参数，用于指定命令的效果。参数写在命令标识符之后，由键和值组成，两者用冒号（`:`）分隔。参数标识符就是其中的键，可以使用命令实现类中对应参数字段的名称。如果已通过 `Alias` 特性为该字段指定别名，也可以使用该别名。

```nani
@commandId paramId:paramValue
```

以 [@hideAll] 命令为例，该命令用于隐藏场景中所有可见 Actor。它可以如下使用：

```nani
@hideAll
```

您可以使用 `time` *number* 参数来控制 Actor 在完全隐藏之前淡出多长时间：

```nani
@hideAll time:5.5
```

这将使 Actor 在 5.5 秒内逐渐淡出，直至完全不可见。

### 参数值类型

不同的命令参数需要以下值类型之一：

| 类型 | 描述 |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string | 一个简单的字符串值，例如：`LoremIpsum`。当字符串包含空格时，不要忘记将其用双引号引起来，例如：`"Lorem ipsum dolor sit amet."`。 |
| number | 数值，可以是整数或小数，例如：`1`、`-25`、`1.0`、`-0.005`。 |
| boolean | 取值为 `true` 或 `false`。您可以使用 [布尔标志](/zh/guide/scenario-scripting#布尔标志) 来代替 `true` 和 `false`，例如，用 `@hideAll wait!` 代替 `@hideAll wait:true`。 |
| named | 由点分隔的键值对，带有字符串键和上述类型之一的值。例如，命名数值：`foo.8`、`bar.-20`。 |
| list | 以逗号分隔的上述类型之一的值列表。例如，字符串列表：`foo,bar,"Lorem ipsum."`；数值列表：`12,-8,0.105,2`。 |

### 主参数

有些命令允许省略某个参数的标识符（名称），直接写出参数值。这样的参数称为主参数。

例如，[@bgm] 命令需要一个指定要播放的音频资源路径的主参数：

```nani
@bgm PianoTheme
```

这里的“PianoTheme”是 `path` *string* 参数的值。

每个命令只能有一个主参数，并且应始终在任何其他参数之前指定它。

### 可选和必需参数

许多命令参数是*可选的*，因为它们已有预定义的值，或无需指定值也能执行命令。例如，使用 [@resetText] 命令时不指定任何参数，就会重置默认打印机的文本。若要重置特定打印机的文本，可以指定其 ID，例如 `@resetText Dialogue`。

然而，某些参数对于命令的执行是*必需的*，应始终指定。如果您忘记指定此类参数，我们的 [VS Code](/zh/guide/ide-extension) 扩展将会警告您。

### 标准命令

有关开箱即用的所有标准命令的列表，包括其摘要、参数和使用示例，请参阅 [API 参考](/zh/api/)。

## 注释行

以分号（`;`）开头的行会被视为*注释*语句。引擎在运行时会完全忽略注释。您可以用注释为自己或其他编写剧本脚本的团队成员留下备注或说明。

```nani
; 以下命令将自动保存游戏。
@save

@save ; 您也可以在命令行内添加注释。

# Label ; 也可以在标签行内添加注释。

天地[shake ; 也可以在内联命令中添加注释]玄黄，宇宙洪荒。[; ...包括空的内联命令。]
```

我们将在指南的其余部分使用注释来说明示例 NaniScript 片段。

## 通用文本行

为了更轻松地编写包含大量文本的脚本，可以使用通用文本行。当一行不以任何语句符号开头时，它被视为*通用文本*：

```nani
天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。
```

在通用文本行开头写入作者 ID，再用冒号和一个空格（`: `）将其与正文分隔，即可将打印的文本关联到 [角色 Actor](/zh/guide/characters)：

```nani
Felix: 天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。
```

如果需要频繁更改与打印文本关联的角色外观，您也可以直接在作者 ID 后指定外观，以减少输入：

```nani
Felix.Happy: 天地玄黄，宇宙洪荒。
```

上面的行等同于以下两行：

```nani
@char Felix.Happy
Felix: 天地玄黄，宇宙洪荒。
```

### 命令内联

显示（打印）文本消息时，您可能希望在特定字符显示之前或之后执行命令。例如，Actor 可能会在打印特定单词时改变其外观（表情），或者配合打印消息中间描述的某个事件播放特定的音效。命令内联功能可以处理这类情况。

所有命令（[标准](/zh/api/) 和 [自定义](/zh/guide/custom-commands)）都可以使用方括号（`[ ]`）内联（插入）到通用文本行中：

```nani
Felix: 天地[char Felix.Happy pos:50]玄黄！[sfx Explosion]宇宙洪荒。
```

内联命令的语法与常规命令完全相同，只需省略 `@` 符号，并用方括号包裹命令主体。任何命令行都可以内联到通用文本中，效果保持不变，执行时机则取决于它在文本消息中的插入位置。

引擎在内部会将通用文本行解析为一系列命令，并用内联索引标识每条命令；其中的文本由 [@print] 命令打印。

例如，以下通用文本行：

```nani
天地玄黄，[char Felix.Happy pos:75 wait!]宇宙洪荒。
```

— 实际上由引擎处理为一系列单独的命令：

```nani
@print "天地玄黄，" !waitInput
@char Felix.Happy pos:75 wait!
@print "宇宙洪荒。" !reset
```

要在通用文本行中实际打印方括号，请使用反斜杠转义它们，例如：

```nani
一些文本 \[ 方括号内的文本 \]
```

— 将在游戏中打印 `一些文本 [ 方括号内的文本 ]`。

要在显示文本行后跳过等待输入，请在行尾附加 `[>]`：

```nani
; 打印以下行后，等待输入将不会激活
; （玩家无需确认提示即可继续阅读）。
天地玄黄，宇宙洪荒。[>]
```

### 通用参数

在某些情况下，您可能希望为通用文本行的特定部分或整行修改或指定 [@print] 参数。为此，请使用仅在通用文本行中可用的特殊 `<` 命令：

```nani
; 该行的作者将是 Kohaku 和 Yuko 两个 Actor，
; 但打印机上的显示名称将显示“大家”。
Kohaku,Yuko: 你好！[< as:"大家"]

; 第一部分以 50% 的速度打印，
; 第二部分以 250% 的速度打印且不等待。
你好[< speed:0.5]，世界！[< speed:2.5 nowait!]
```

该命令会将指定的参数应用于它前面的最后一段文本。即使 `<` 与这段文本之间还插入了其他内联命令，也不影响参数的作用范围：

```nani
; 速度仍然适用于“你好”部分，
; 即使参数位于内联命令之后。
你好[-][< speed:0.5]，世界！
```

### 空白分隔符

如果通用文本行的开头或结尾包含空白（例如空格或制表符），可以用分隔符明确标出要打印的内容从哪里开始、到哪里结束。这在使用嵌套时尤为重要。

使用 `[]`（空的内联命令）作为通用文本行边界的分隔符：

```nani
; 打印“Some text  continuation.”（中间有 2 个空格）
@group
    ; 保留第一部分末尾的空白。
    Some text []
    ; 保留第二部分开头的空白。
    [] continuation.[< join!]
```

## 标签行

标签用作使用 [@goto] 命令导航剧本脚本的“锚点”。要定义标签，请在行首使用 `#` 符号，后跟标签名称：

```nani
# Epilogue
```

然后，您可以使用 [@goto] 命令导航到该行：

```nani
@goto ScriptPath#Epilogue
```

当 [@goto] 命令和目标标签都在同一个脚本中时，可以省略脚本路径：

```nani
@goto #Epilogue
```

`#` 分隔符前后的空白是可选的，脚本名称和标签名称均可包含空格。以下端点格式均有效：

```nani
@goto Script#Label
@goto Script #Label
@goto Script# Label
@goto Script # Label
@goto Multi Word Script # Multi Word Label
```

### 剧本根目录

您使用导航命令指定的“锚点”称为*端点*（endpoint）。端点由两部分组成：*脚本路径*（script path）和*标签*（label）。标签是可选的；省略时，假定端点指向脚本的开头。脚本路径是指相对于*剧本根目录*（scenario root）的剧本文件路径（不带 `.nani` 扩展名）。

剧本根目录是项目中存储所有剧本文件的顶级目录。例如，考虑 Unity 项目中的以下目录结构：

```
Assets
└── Scenario/
    ├── Prologue.nani
    ├── CommonRoute/
    │   ├── Day1/
    │   │   ├── Scene1.nani
    │   │   └── Scene2.nani
    │   └── Day2/
    │       └── Scene1.nani
    └── RouteX/
        └── SceneX.nani
```

在这种情况下，剧本根目录是 `Assets/Scenario` 目录。要导航到 `Assets/Scenario/RouteX/SceneX.nani` 脚本文件，请使用以下端点：`RouteX/SceneX`。

::: tip
指定端点时，也可以省去目录部分。具体方法请参阅下文介绍的 [相对](/zh/guide/scenario-scripting#相对端点) 和 [通配符](/zh/guide/scenario-scripting#通配符端点) 端点语法。
:::

当您创建或移动剧本文件时，会自动检测剧本根目录。您可以在脚本配置菜单中查看当前根目录。

![?width=715](https://i.gyazo.com/ff701bf560bd56948957b5ad887e3420.png)

### 端点语法

Naninovel 支持四种类型的端点语法，允许您在某些情况下编写更简洁的路径。

#### 规范端点

这是默认语法，包含从 [剧本根目录](/zh/guide/scenario-scripting#剧本根目录) 开始的脚本完整路径。它始终受支持且不依赖于当前脚本的位置，但需要包含直到目标脚本的所有目录：

```nani
; 导航到“Assets/Scenario/Prologue.nani”脚本的开头。
@goto Prologue
; 导航到“Assets/Scenario/CommonRoute/Day1/Scene1.nani”脚本中的
; “Action”标签。
@goto CommonRoute/Day1/Scene1#Action
```

#### 本地端点

仅当导航到当前脚本内的标签时才支持此语法。它仅包含标签：

```nani
; 导航到当前脚本中的“Action”。
@goto #Action
```

#### 相对端点

相对路径以当前脚本的位置为基准来指定目标位置，让端点的写法更简洁：

```nani
; 假设我们在“Assets/Scenario/CommonRoute/Day1/Scene1.nani”中，
; 导航到同一目录中的“Scene2.nani”文件。
@goto ./Scene2
; 导航到当前目录之上一级的“Day2”目录中的“Scene1.nani”文件。
@goto ../Day2/Scene1
; 导航到当前目录之上两级的“RouteX”目录中的
; “SceneX.nani”文件。
@goto ../../RouteX/SceneX
```

#### 通配符端点

如果您想避免在路径中包含目录，可以使用通配符路径，仅指定脚本名称。这仅在脚本名称在整个项目中唯一时才有效：

```nani
; 导航到“Prologue.nani”脚本，无论它位于何处。
@goto */Prologue
; 这将导致错误，因为有多个“Scene1.nani”文件。
@goto */Scene1
; 这样可行，因为“Day1”下只有一个“Scene1.nani”文件。
@goto */Day1/Scene1
```

## 布尔标志

*布尔标志*（boolean flag）是布尔参数值的简写形式，例如：

```nani
; 使 Kohaku 角色可见。
@char Kohaku visible!
; 等同于：
@char Kohaku visible:true

; 使 Kohaku 角色不可见。
@char Kohaku !visible
; 等同于：
@char Kohaku visible:false

; 内联命令也支持标志。
天地玄黄，[shake Camera ver! !wait]宇宙洪荒。
; 等同于：
天地玄黄，[shake Camera ver:true wait:false]宇宙洪荒。
```

只有在以下情况下才需要使用完整的布尔形式：您想通过 [剧本表达式](/zh/guide/expressions) 动态计算该值时，例如：

```nani
; 如果“score”变量高于 10，则使 Kohaku 可见。
@char Kohaku visible:{score>10}
```

— 或者当布尔参数为主参数时，例如：

```nani
; 使用主参数禁用摄像机观看模式。
@look false
```

在后一种情况下，您还可以指定主参数的 ID 并仍然使用标志：

```nani
; 使用布尔标志禁用摄像机观看模式。
@look !enable
```

## 条件执行

默认情况下，脚本按顺序执行。若要添加分支，可以使用 `if` 或 `unless` 参数；所有命令都支持这两个参数。

```nani
; 如果“level”大于 9000，则添加该选项。
@choice "超过 9000 了！" if: level above 9000

; 如果“dead”为 false，则执行打印命令。
@print "我还活着。" if: not dead

; 相同但更简洁。
@print "我还活着。" unless:dead

; 如果“insane”为 true 或者 1 到 10 范围内的 random 函数
; 返回 5 或更多，则执行“@glitch”命令。
@glitch if: insane or random(1, 10) is at least 5

; 如果“score”在 7 到 13 之间或者“lucky”为 true，
; 则导航到“LuckyEnd”脚本。
@goto LuckyEnd if: (score is at least 7 and score is at most 13) or lucky

; 也可以改用布尔运算符（结果与上面相同）。
@goto LuckyEnd if: (score >= 7 & score <= 13) | lucky

; 内联命令中的条件。
天地玄黄，宇宙洪荒。[sfx Applause if:score>=10]日月盈昃，辰宿列张。

; 转义表达式中的双引号。
@print {remark} if: remark = "Saying \"Stop the car\" was a mistake."
```

### 条件块

您可以使用 [@if] 和 [@else] [嵌套](/zh/guide/scenario-scripting#嵌套) 多行条件块：

```nani
; 根据“score”变量打印文本行：
; “你失败了。再试一次！” - 当 score 为 6 或更低时。
; “你通过了测试。”和“太棒了！” - 当 score 高于 8 时。
; “你通过了测试。”和“令人印象深刻！” - 当 score 高于 7 时。
; “你通过了测试。”和“干得好！” - 其他情况。
@if score is above 6
    你通过了测试。
    @if score is above 8
        太棒了！
    @or score is above 7
        令人印象深刻！
    @else
        干得好！
@else
    你失败了。再试一次！
```

条件块也可以直接内联到文本行中，此时使用 [@endif] 标记块的结束位置：

```nani
; 根据“score”变量打印文本行：
; “测试结果：失败。” - 当 score 为 6 或更低时。
; “测试结果：完美！” - 当 score 高于 8 时。
; “测试结果：通过。” - 其他情况。
测试结果：[if score>8]完美！[or score>6]通过。[else]失败。[endif]
```

要指定反向条件，请使用 [@unless]：

```nani
; 如果 dead 为 false，则打印“你还活着！”，否则打印“你完了。”
@unless dead
    你还活着！
@else
    你完了。

; 根据“score”变量打印文本行：
; “测试结果：通过。” - 当 score 为 10 或更高时。
; “测试结果：失败。” - 当 score 低于 10 时。
测试结果：[unless score<10]通过。[else]失败。[endif]
```

::: info NOTE
有关条件表达式和可用运算符的更多信息，请参阅 [剧本表达式](/zh/guide/expressions) 指南。
:::

## 嵌套

[@if]、[@choice]、[@while] 等命令支持通过缩进，将其他命令和通用文本行关联到自身：

```nani
@if score > 10
    @bgm Victory
    干得好，你通过了测试！
```

在这里，[@bgm] 命令和后面的通用文本行与 [@if] 命令相关联。

支持此功能的命令称为*嵌套宿主*（nested host）。在 C# 中，这些命令实现了 `Command.INestedHost` 接口。宿主命令控制执行哪些嵌套命令、是否执行以及以什么顺序执行。

每个宿主命令在执行嵌套命令时都有自己的行为。例如，如果未满足条件，[@if] 会跳过嵌套命令，而 [@choice] 仅在玩家选择关联选项时才执行嵌套命令：

```nani
@if score > 10
    干得好，你通过了测试！
    @bgm Victory
    @spawn Fireworks
@or attempts > 100
    你真是没救了... 需要帮助吗？
    @choice "是的，拜托了！"
        @set score+=10
        @goto #BeginTest
    @choice "我会继续尝试。"
        @goto #BeginTest
@else
    你失败了。再试一次！
    @goto #BeginTest
```

注意嵌套块的缩进方式：每一级使用恰好 **4 个空格**。或者，您也可以使用**单个制表符**；其他空格数量或空白字符不会被识别为缩进。任意深度的嵌套块都是可以的——只需每级增加 4 个空格或一个制表符即可。

要将多个命令分组到单个宿主下，请使用 [@group] 命令：

```nani
; random 命令选择其嵌套行之一，但忽略嵌套行的
; 任何子级。这里使用 group 命令将多行组合在一起
; 以便 random 命令一起执行它们。
@random
    @group
        @back tint:red
        涂成红色。
    @group
        @back tint:black
        涂成黑色。
```

## 异步执行

某些命令的执行可能会持续一段时间。例如，[@hide] 命令将在设定的时间内淡出指定的 Actor，该时间可以通过 `time` 参数更改。考虑以下示例：

```nani
@hide Kohaku
@show Yuko
```

— 播放时，Yuko Actor 会在 Kohaku 淡出的同时开始淡入。这是因为默认情况下，脚本不会等待异步命令完成后再继续：[@show] 将在 [@hide] 开始淡出 Kohaku 后立即开始淡入 Yuko。

如果您想等待异步命令完成后再继续播放，请使用 `wait` 参数：

```nani
@hide Kohaku wait!
@show Yuko
```

— 现在 Yuko 只有在 Kohaku 完全淡出后才会开始淡入。

常见的做法是使用多个异步命令来设置场景，然后等待它们全部完成。为了简化该过程，请使用 [@await] 命令：

```nani
; 并发运行嵌套行并等待它们全部完成。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
; 下面的行将在上述所有操作完成后执行。
开始下雨了...
```

### 并发播放

单个命令默认会异步执行。在某些情况下，您可能还希望让一系列命令拥有独立的控制流和播放状态，与主剧本并行运行。

使用 [@async] 命令可使嵌套行在专用脚本轨道上执行，与主播放流程并发运行。常见用例包括在剧本照常推进的同时在后台运行复合动画：

```nani
; 在淡出音乐的同时，让摄像机缓慢平移经过三个点。
@async
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!

; 当上面的动画独立运行时，下面的文本会打印出来。
...
```

— 或者在循环中运行一系列命令：

```nani
@async loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

; 在下面的文本打印期间，上面的动画会循环运行。
小心！
```

即使在动画进行过程中保存并加载游戏，它也会恢复当前的播放状态，并从保存时的位置继续播放动画。回滚同样可以正常工作。

### 异步任务

如果您想停止上例中的循环，或等待一个不循环的异步剧本块完成后再继续，就可以使用异步任务。通过 [@async] 命令的可选主参数，为该命令执行的异步任务命名。之后，将这个名称传给 [@stop] 或 [@await] 命令，即可停止（取消）任务或等待任务完成：

```nani
; 启动“Quake”异步任务。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

...

; 在某个时刻停止任务。
@stop Quake
```

同样，您也可以等待异步任务完成：

```nani
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!

...

; 在重置摄像机之前，确保平移动画已完成。
@await CameraPan
@camera offset:0,0 zoom:0
```

如果您不想等待任务的剩余持续时间，您还可以使用 `complete!` 标志强制任务立即完成：

```nani
; 完成摄像机动画并立即重置它。
@await CameraPan complete!
@camera offset:0,0 zoom:0 time:0
```

::: tip

考虑将常见动画或其他异步任务封装在单独的脚本中，然后您可以使用 [@gosub] 命令从其他脚本中重用该脚本：

::: code-group

```nani [SomeScript.nani]
@gosub FX#Quake
...
@stop Quake

@gosub FX#CameraPan
...
@await CameraPan
```

```nani [FX.nani]
# Quake
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }
@return

# CameraPan
@async CameraPan
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!
@return
```

:::

### 同步轨道

在一些进阶用法中，您可能需要将并发运行的轨道相互连接（同步），或将它们与主轨道连接。这时可以使用 [@sync] 命令：

```nani
你有 60 秒的时间拆除炸弹！

@async Boom
    @wait 60
    ; 60 秒后，如果“Boom”任务未停止，
    ; 下面的 @sync 命令将强制主轨道移动到此处，
    ; 然后导航到“BadEnd”脚本。
    @sync
    @goto BadEnd

; 模拟一系列拆弹谜题。
拆弹谜题 1。
拆弹谜题 2。
拆弹谜题 3。

; “Boom”异步任务已停止，因此主轨道
; 将继续执行而不中断。
@stop Boom
炸弹已拆除！
```

— 如果我们没有在 `Boom` 异步任务中使用 [@sync] 命令，则 [@goto] 命令将在异步轨道上执行，而主轨道将继续向下执行，因此最终 `BadEnd` 和主剧本会并发运行。[@sync] 所做的是强制将目标轨道（默认为主轨道）移动到该命令所在的行并销毁宿主轨道，本质上是用目标轨道替换宿主轨道。

## 文本标识

诸如 [脚本本地化](/zh/guide/localization#脚本本地化) 和 [自动配音](/zh/guide/voicing#自动配音) 之类的功能需要将剧本脚本中编写的文本与其他资源相关联——例如，用于代替原文显示的译文，或在打印文本时播放的语音剪辑。为此，必须为每个此类文本分配一个唯一标识符。

默认情况下，Naninovel 在导入脚本资产时通过内容哈希自动标识所有可本地化的文本。只要您不修改文本，这就可以正常工作。如果您确实修改了它，关联将会断开：您需要重新映射自动配音剪辑或重新翻译更改后的文本语句。

要在编辑文本后保留关联，请从 `Naninovel -> Tools -> Text Identifier` 编辑器菜单打开并使用文本标识实用程序。它会为剧本脚本中的每段可本地化文本自动生成并写入唯一 ID。如下例所示，每个可本地化参数的末尾都会附加标识符：

```nani
Kohaku: 嘿！|#1|[-]最近怎么样？|#2|
@choice "选项 1|#3|"
@choice "选项 2|#4|"
```

只要您不删除或更改 ID，关联就不会断开。为了减少文本 ID 的干扰，IDE 扩展和故事编辑器以暗色渲染它们。

该实用程序确保生成的每个文本 ID 都是唯一的，且从未在该脚本中使用过。为此，它会在 `NaninovelData/ScriptRevisions` 编辑器资产中保存修订号，用来跟踪 ID 的使用。即使删除了已分配文本 ID 的行，这个 ID 也不会在其他位置被重新使用，除非您手动添加它。

### 已标识文本的引用

在极少数情况下，您可能希望有意重复使用某个可本地化文本的标识符——例如，在 C# 中创建命令实例，而该实例需要重用脚本中指定的本地化参数时。

如果您只是简单地为 `LocalizableTextParameter` 赋值，Naninovel 将发出文本 ID 重复的警告。请改用静态方法 `CommandParameter.Ref()`：

```cs
var print = new PrintText();
print.AuthorLabel = CommandParameter.Ref(otherPrint.AuthorLabel);
```

要在剧本脚本中引用现有的本地化文本，请在标识符前加上 `&`：

```nani
; 显示带有“一些文本”的选项，然后打印相同的文本。
@choice "一些文本|#SOMEID|"
@print |#&SOMEID|
```

## 标题脚本

标题脚本是一种特殊的剧本脚本，可在脚本配置菜单中分配。分配后，它会在引擎初始化后自动播放，也会在通过 [@title] 命令或游戏内各种菜单中的“Title”按钮返回标题菜单时自动播放。您可以用标题脚本布置标题屏幕场景，例如设置背景、音乐和效果，以及显示标题 UI。

该脚本还可用于在玩家单击标题 UI 内的“NEW GAME”、“EXIT”或任一存档槽（以加载游戏）时调用命令。以下是标题脚本的示例。

```nani
; 设置标题菜单外观。
@back MainMenuBackground
@bgm MainMenuMusic
@spawn Rain
@showUI TitleUI
@stop

# OnNewGame
; 以下命令将在玩家单击“NEW GAME”时执行。
; 请注意，这里会等待“stopBgm”命令完成，以便音乐
; 在新游戏开始加载之前完全停止。
@sfx NewGameSoundEffect
@stopBgm wait!
@stop

# OnLoad
; 以下命令将在玩家加载存档时执行。
@sfx LoadGameEffect
@wait 0.5
@stop

# OnExit
; 以下命令将在玩家单击“EXIT”时执行。
@sfx ExitGameEffect
@wait 1.5
@stop
```

## Fountain

[Fountain](https://fountain.io) 是一种标记语法，用于以可直接阅读的文本形式编写和共享剧本。[Highland](https://highland2.app)、[Final Draft](https://www.finaldraft.com) 和 [Scrivener](https://www.literatureandlatte.com/scrivener) 等编剧软件都支持这种语法。

Naninovel 提供了一个将 `.fountain` 文档转换为 `.nani` 脚本的工具，因此您可以在兼容 Fountain 的软件中起草项目的初始剧本，然后将其移至 Naninovel。

从编辑器菜单打开工具：`Naninovel -> Tools -> Fountain Screenplay`。选择源 `.fountain` 文档和生成的 `.nani` 文件的输出文件夹，然后单击“Convert Screenplay”。

Fountain 的 [Action](https://fountain.io/syntax#section-action) 和 [Dialogue](https://fountain.io/syntax#section-dialogue) 段落转换为 [通用文本行](/zh/guide/scenario-scripting#通用文本行)；其他语法结构表示为 [注释行](/zh/guide/scenario-scripting#注释行)。如果您想将剧本拆分为多个 `.nani` 脚本，请使用 Fountain 的 [Section](https://fountain.io/syntax#section-sections) 标记。例如，考虑以下剧本：

```
# Episode 1
## Scene 1
...
## Scene 2
...
# Episode 2
## Scene 1
...
```

它将被转换为以下按文件夹组织的剧本脚本：

- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
