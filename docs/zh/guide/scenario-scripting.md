# Naninovel 脚本

剧本脚本是扩展名为 `.nani` 的文本文档，可让您控制场景中发生的事情。脚本资产是通过 `Create -> Naninovel -> Scenario Script` 资产上下文菜单创建的。您可以使用内置的 [故事编辑器](/zh/guide/editor) 或您选择的外部文本或代码编辑器（例如 Microsoft Word、Google Docs 或 [VS Code](/zh/guide/ide-extension)）打开和编辑它们。

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

剧本脚本中的每一行都代表一条语句，它可以是命令、通用文本、导航标签或注释。语句的类型由放在行首的符号决定：

| 符号 | 语句 |
|:------:|---------------------------|
| @ | [命令](#命令行动) |
| # | [标签](#标签行) |
| ; | [注释](#注释行) |

当行首不存在上述任何符号时，它被视为 [通用文本](#通用文本行) 语句。

::: tip
可以通过 [编译器本地化](/zh/guide/localization#编译器本地化) 功能更改所有预定义的编译器工件，例如符号、命令标识符、常量以及基本上您在编写脚本时必须输入的任何内容。
:::

## 命令行动

如果一行以 `@` 符号开头，则被视为命令语句。命令代表控制场景中发生的事情的单个操作；例如，它可用于更改背景、移动角色或加载另一个剧本脚本。

### 命令标识符

紧跟在命令符号之后，需要一个命令标识符。这可以是实现该命令的 C# 类的名称，也可以是命令的别名（当通过 `Alias` 属性应用于类时）。

例如，[@save] 命令（用于自动保存游戏）由 `AutoSave` C# 类实现。实现类还应用了 `[Alias("save")]` 属性，因此您可以在脚本中使用 `@save` 和 `@AutoSave` 语句来调用此命令。

命令标识符不区分大小写；以下所有语句均有效并将调用相同的 `AutoSave` 命令：

```nani
@save
@Save
@AutoSave
@autosave
```

### 命令参数

大多数命令都有许多定义命令效果的参数。参数是在命令标识符之后定义的键值表达式，并用冒号 (`:`) 分隔。参数标识符（键）可以是命令实现类的相应参数字段的名称，也可以是参数的别名（当通过 `CommandParameter` 属性的 `alias` 属性应用时）。

```nani
@commandId paramId:paramValue
```

考虑 [@hideAll] 命令，该命令用于隐藏场景中所有可见的 actor。它可以如下使用：

```nani
@hideAll
```

您可以使用 `time` *decimal* 参数来控制 actor 在完全隐藏之前淡出多长时间：

```nani
@hideAll time:5.5
```

这将使 actor 淡出 5.5 秒，然后完全不可见。

### 参数值类型

根据命令参数，它可能需要以下值类型之一：

| 类型 | 描述 |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string | 一个简单的字符串值，例如：`LoremIpsum`。当字符串包含空格时，不要忘记将其用双引号引起来，例如：`"Lorem ipsum dolor sit amet."`。 |
| integer | 非分数的数字；整数，例如：`1`、`150`、`-25`。 |
| decimal | 带有由点分隔的分数的小数，例如：`1.0`、`12.08`、`-0.005`。 |
| boolean | 可以有两个可能的值之一：`true` 或 `false`。您可以使用 [布尔标志](/zh/guide/scenario-scripting#布尔标志) 而不是键入 `true` 和 `false`，例如：`@hideAll wait!` 而不是 `@hideAll wait:true`。 |
| named | 由点分隔的键值对，带有字符串键和上述类型之一的值。例如命名整数：`foo.8`、`bar.-20`。 |
| list | 上述类型之一的值的逗号分隔列表。例如字符串列表：`foo,bar,"Lorem ipsum."`，对于十进制列表：`12,-8,0.105,2`。 |

### 无名参数

有些命令有一个无名参数。当参数可以在不指定其标识符（名称）的情况下使用时，它被视为无名参数。

例如，[@bgm] 命令需要一个指定要播放的音频资源路径的无名参数：

```nani
@bgm PianoTheme
```

这里的 "PianoTheme" 是 `BgmPath` *string* 参数的值。

每个命令只能有一个无名参数，并且应始终在任何其他参数之前指定它。

### 可选和必选参数

许多命令参数是 *可选的*。这意味着它们要么具有预定义的值，要么不需要任何值即可执行命令。例如，当使用 [@resetText] 命令而不指定任何参数时，它将重置默认打印机的文本，但您也可以像这样设置特定的打印机 ID：`@resetText printer:Dialogue`。

然而，某些参数对于命令的执行是 *必选的*，应始终指定。如果您忘记分配此类参数，我们的 [VS Code](/zh/guide/ide-extension) 扩展将会警告您。

### 标准命令

有关开箱即用的所有标准命令的列表，包括其摘要、参数和使用示例，请参阅 [API 参考](/zh/api/)。

## 注释行

当一行以分号符号 (`;`) 开头时，它被视为 *注释* 语句。注释在运行时完全被引擎忽略。使用注释为自己或处理剧本脚本的其他团队成员添加注释或说明。

```nani
; 以下命令将自动保存游戏。
@save
```

我们将在指南的其余部分使用注释来注释示例 NaniScript 片段。

## 通用文本行

为了更轻松地编写包含大量文本的脚本，使用了通用文本行。当一行不以任何语句符号开头时，它被视为 *通用文本*：

```nani
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

可以在通用文本行的开头指定作者 ID，用冒号后跟空格 (`: `) 分隔，以将打印的文本与 [角色 actor](/zh/guide/characters) 相关联：

```nani
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

为了在不断更改与打印文本关联的角色外观时节省一些输入，您还可以在作者 ID 后指定外观：

```nani
Felix.Happy: Lorem ipsum dolor sit amet.
```

上面的行等同于以下两行：

```nani
@char Felix.Happy
Felix: Lorem ipsum dolor sit amet.
```

### 命令内联

有时，您可能希望在显示（打印）文本消息时执行命令，无论是在特定字符之后还是之前。例如，actor 可能会在打印特定单词时改变其外观（表情），或者特定的声音效果可能会在打印消息中间描述的某个事件发生时播放。命令内联功能允许处理类似这样的情况。

所有命令（[标准](/zh/api/) 和 [自定义](/zh/guide/custom-commands)）都可以使用方括号 (`[ ]`) 内联（注入）到通用文本行中：

```nani
Felix: Lorem[char Felix.Happy pos:0.5] ipsum![sfx Explosion] Dolor sit amet.
```

请注意，内联命令语法与常规命令完全相同，只是省略了 `@` 符号并且命令主体包裹在方括号中。本质上，您可以获取任何命令行，将其内联到通用文本中，它将具有相同的效果，但根据其在文本消息中的位置在不同的时刻生效。

在底层，通用文本行被解析为由内联索引标识的各个命令；文本使用 [@print] 命令打印。

例如，以下通用文本行：

```nani
Lorem ipsum[char Felix.Happy pos:75 wait!] dolor sit amet.
```

— 实际上由引擎处理为一系列单独的命令：

```nani
@print "Lorem ipsum" !waitInput
@char Felix.Happy pos:75 wait!
@print " dolor sit amet." !reset
```

要在通用文本行中实际打印方括号，请使用反斜杠转义它们，例如：

```nani
Some text \[ text inside brackets \]
```

— 将在游戏中打印 `Some text [ text inside brackets ]`。

要在显示文本行后跳过等待输入，请附加 `[>]`：

```nani
; 打印以下行后，等待输入将不会激活
; （玩家无需确认提示即可继续阅读）。
Lorem ipsum dolor sit amet.[>]
```

### 通用参数

在某些情况下，您可能希望为特定部分或整个通用文本行修改或分配 [@print] 参数。使用特殊的 `<` 命令，仅在通用行中可用，允许您这样做：

```nani
; 该行将由 Kohaku 和 Yuko actors 创作，
; 但打印机上的显示名称将显示 'All Together'。
Kohaku,Yuko: Hello![< as:"All Together"]

; 第一部分以 50% 的速度打印，
; 第二部分以 250% 的速度打印且不等待。
Lorem[< speed:0.5] world![< speed:2.5 nowait!]
```

该命令将指定的参数应用于放置在它之前的最后一个文本行，即使其他命令内联在 `<` 和文本之间：

```nani
; 速度仍然适用于 "Hello" 部分，
; 即使参数位于内联命令之后。
Hello[-][< speed:0.5] world!
```

### 空白分隔符

如果通用文本行以空白（例如空格或制表符）开头或结尾，显式界定要打印的内容实际开始或结束的位置可能会很有用。这在使用嵌套时尤为重要。

使用 `[]`（空的内联命令）作为通用文本行边界的分隔符：

```nani
; 打印 "Some text  continuation."（中间有 2 个空格）
@group
    ; 保留第一部分末尾的空白。
    Some text []
    ; 保留第二部分开头的空白。
    [] continuation.[< join!]
```

## 标签行

标签用作使用 [@goto] 命令导航剧本脚本的“锚点”。要定义标签，请以 `#` 符号开头，后跟标签名称：

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

### 剧本根目录

您使用导航命令指定的“锚点”称为 *endpoints（端点）*。端点由两部分组成：*script path（脚本路径）* 和 *label（标签）*。标签是可选的；省略时，假定端点指向脚本的开头。脚本路径是指相对于 *scenario root（剧本根目录）* 的剧本文件路径（不带 `.nani` 扩展名）。

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
如果您不想在指定端点时包含目录，则不必这样做！查看下面解释的 [相对](/zh/guide/scenario-scripting#相对端点) 和 [通配符](/zh/guide/scenario-scripting#通配符端点) 端点语法。
:::

当您创建或移动剧本文件时，会自动检测剧本根目录。您可以在脚本配置菜单中查看当前根目录。

![?width=715](https://i.gyazo.com/ff701bf560bd56948957b5ad887e3420.png)

### 端点语法

Naninovel 支持四种类型的端点语法，允许您在某些情况下编写更简洁的路径。

#### 规范端点

这是默认语法，包含从 [剧本根目录](/zh/guide/scenario-scripting#剧本根目录) 开始的脚本完整路径。它始终受支持且不依赖于当前脚本的位置，但需要包含直到目标脚本的所有目录：

```nani
; 导航到 'Assets/Scenario/Prologue.nani' 脚本的开头。
@goto Prologue
; 导航到 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' 脚本中的
; 'Action' 标签。
@goto CommonRoute/Day1/Scene1#Action
```

#### 本地端点

仅当导航到当前脚本内的标签时才支持此语法。它仅包含标签：

```nani
; 导航到当前脚本中的 'Action'。
@goto #Action
```

#### 相对端点

相对路径通过映射相对于当前脚本的路径来简化端点语法：

```nani
; 假设我们在 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' 中，
; 导航到同一目录中的 'Scene2.nani' 文件。
@goto ./Scene2
; 导航到父目录中的 'Scene1.nani' 文件。
@goto ../Day2/Scene1
; 导航到当前目录之上两级的 'RouteX' 目录中的
; 'SceneX.nani' 文件。
@goto ../../RouteX/SceneX
```

#### 通配符端点

如果您想避免在路径中包含目录，可以使用通配符路径，仅指定脚本名称。这仅在脚本名称在整个项目中唯一时才有效：

```nani
; 导航到 'Prologue.nani' 脚本，无论它位于何处。
@goto */Prologue
; 这将导致错误，因为有多个 'Scene1.nani' 文件。
@goto */Scene1
; 这有效，因为 'Day1' 文件夹下只有一个 'Scene1.nani' 文件。
@goto */Day1/Scene1
```

## 布尔标志

使用 *boolean flags（布尔标志）* 作为布尔参数值的快捷方式，例如：

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
Lorem ipsum[shake Camera ver! !wait] dolor sit amet.
; 等同于：
Lorem ipsum[shake Camera ver:true wait:false] dolor sit amet.
```

使用完整布尔形式的唯一原因是当您想通过 [脚本表达式](/zh/guide/script-expressions) 动态评估值时，例如：

```nani
; 如果 "score" 变量高于 10，则使 Kohaku 可见。
@char Kohaku visible:{score>10}
```

— 或者当布尔参数无名时，例如：

```nani
; 使用无名参数禁用相机观看模式。
@look false
```

在后一种情况下，您还可以指定无名参数的 ID 并仍然使用标志：

```nani
; 使用布尔标志禁用相机观看模式。
@look !enable
```

## 条件执行

默认情况下，脚本线性执行，但您可以使用所有命令都支持的 `if` 或 `unless` 参数引入分支。

```nani
; 如果 "level" 大于 9000，则添加该选项。
@choice "It's over 9000!" if:level>9000

; 如果 "dead" 为 false，则执行打印命令。
@print "I'm still alive." if:!dead

; 相同但更简洁。
@print "I'm still alive." unless:dead

; 如果 "insane" 为 true 或者 1 到 10 范围内的 random 函数
; 返回 5 或更多，则执行 "@glitch" 命令。
@glitch if:{ insane | random(1, 10) >= 5 }

; 如果 "score" 在 7 到 13 之间或者 "lucky" 为 true，
; 则导航到 "LuckyEnd" 脚本。
@goto LuckyEnd if:{ (score >= 7 & score <= 13) | lucky }

; 内联命令中的条件。
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; 转义表达式中的双引号。
@print {remark} if:remark="Saying \"Stop the car\" was a mistake."
```

### 条件块

您可以使用 [@if] 和 [@else] [嵌套](/zh/guide/scenario-scripting#嵌套) 多行条件块：

```nani
; 根据 "score" 变量打印文本行：
; "You've failed. Try again!" - 当 score 低于 6 时。
; "You've passed the test." 和 "Brilliant!" - 当 score 高于 8 时。
; "You've passed the test." 和 "Impressive!" - 当 score 高于 7 时。
; "You've passed the test." 和 "Good job!" - 其他情况。
@if score>6
    You've passed the test.
    @if score>8
        Brilliant!
    @else if:score>7
        Impressive!
    @else
        Good job!
@else
    You've failed. Try again!
```

条件块也可以在文本行内内联使用，并用 [@endif] 标记结束：

```nani
; 根据 "score" 变量打印文本行：
; "Test result: Failed." - 当 score 低于 6 时。
; "Test result: Perfect!" - 当 score 高于 8 时。
; "Test result: Passed." - 其他情况。
Test result:[if score>8] Perfect![else if:score>6] Passed.[else] Failed.[endif]
```

要指定反向条件，请使用 [@unless]：

```nani
; 如果 dead 为 false，则打印 "You're still alive!"，否则打印 "You're done."
@unless dead
    You're still alive!
@else
    You're done.

; 根据 "score" 变量打印文本行：
; "Test result: Passed." - 当 score 为 10 或更高时。
; "Test result: Failed." - 当 score 低于 10 时。
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

::: info
在 [脚本表达式](/zh/guide/script-expressions) 指南中查找有关条件表达式和可用运算符的更多信息。
:::

## 嵌套

诸如 [@if]、[@choice]、[@while] 等命令以及其他几个命令支持通过缩进将其他命令和通用文本行与它们相关联：

```nani
@if score>10
    @bgm Victory
    Good job, you've passed the test!
```

在这里，[@bgm] 命令和后面的通用文本行与 [@if] 命令相关联。

支持此功能的命令称为 *nested hosts（嵌套宿主）*。在 C# 中，这些命令实现了 `Command.INestedHost` 接口。宿主命令控制执行哪些嵌套命令、是否执行以及以什么顺序执行。

每个宿主命令在执行嵌套命令时都有自己的行为。例如，如果未满足条件，[@if] 会跳过嵌套命令，而 [@choice] 仅在玩家选择关联选项时才执行嵌套命令：

```nani
@if score>10
    Good job, you've passed the test!
    @bgm Victory
    @spawn Fireworks
@else if:attempts>100
    You're hopeless... Need help?
    @choice "Yeah, please!"
        @set score+=10
        @goto #BeginTest
    @choice "I'll keep trying."
        @goto #BeginTest
@else
    You've failed. Try again!
    @goto #BeginTest
```

请注意嵌套块是如何缩进的：每个级别正好使用 **4 个空格**。制表符或其他空格长度将被忽略。任何深度的嵌套块都是可能的；只需每级增加 4 个空格的缩进。

要将多个命令分组到单个宿主下，请使用 [@group] 命令：

```nani
; random 命令选择其嵌套行之一，但忽略嵌套行的
; 任何子项。这里使用 group 命令将多行组合在一起
; 以便 random 命令一起执行它们。
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## 异步执行

某些命令可能会随着时间的推移执行。例如，[@hide] 命令将在设定的时间内淡出指定的 actor，该时间可以通过 `time` 参数更改。考虑以下场景：

```nani
@hide Kohaku
@show Yuko
```

— 播放时，您会注意到 Yuko actor 会在 Kohaku 淡出的同时开始淡入。这是因为，默认情况下，所有异步命令都不会被等待：[@show] 将在 [@hide] 开始淡出 Kohaku 后立即开始淡入 Yuko。

如果您想等待异步命令完成后再继续播放，请使用 `wait` 参数：

```nani
@hide Kohaku wait!
@show Yuko
```

— 现在 Yuko 只有在 Kohaku 完全淡出后才会开始淡入。

通常使用多个异步命令来设置场景，然后等待它们全部完成。为了简化该过程，请使用 [@await] 命令：

```nani
; 并发运行嵌套行并等待它们全部完成。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
; 以下行将在上述所有操作完成后执行。
It starts raining...
```

### 并发播放

虽然单个命令默认是异步执行的，但在某些情况下，您可能希望编排一系列命令与主剧本并行运行，并具有独立的控制流和播放状态。

使用 [@async] 命令使嵌套行在专用脚本轨道上执行，与主播放例程并发。常见用例包括在场景照常进行时在后台运行复合动画：

```nani
; 在淡出音乐的同时将相机缓慢平移到三个点。
@async
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!

; 下面的文本在上面的动画独立运行时打印。
...
```

— 或者在循环中运行一系列命令：

```nani
@async loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

; 上面的动画循环运行，而下面的文本正在打印。
Watch out!
```

即使在动画进行过程中保存并加载游戏，它也会恢复当前的播放状态并从保存时的点继续动画。回滚也将起作用。

### 异步任务

在上面的循环示例中，您可能会想：我们应该如何停止循环？或者如果我们想等待一个非循环的异步剧本块完成后再继续怎么办？异步任务来救援！使用 [@async] 命令的可选无名参数为命令执行的异步任务指定一个名称，稍后您可以将其与 [@stop] 或 [@await] 命令一起使用来停止（取消）或等待任务：

```nani
; 启动 'Quake' 异步任务。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

...

; 在某个时刻停止任务。
@stop Quake
```

同样，您可以等待异步任务：

```nani
@async CameraPan
    @camera offset:4,1 zoom: 0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!

...

; 在重置相机之前，确保平移动画已完成。
@await CameraPan
@camera offset:0,0 zoom:0
```

如果您不想等待任务的剩余持续时间，您还可以使用 `complete!` 标志强制任务立即完成：

```nani
; 完成相机动画并立即重置它。
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

在某些高级情况下，您可能希望将并发运行的轨道相互结合（同步）或与主轨道结合。[@sync] 命令可以做到这一点：

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; 60 秒后，如果 'Boom' 任务未停止，
    ; 下面的 @sync 命令将强制将主轨道移动到这里，
    ; 然后导航到 'BadEnd' 脚本。
    @sync
    @goto BadEnd

; 模拟一系列拆弹谜题。
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; 'Boom' 异步任务已停止，因此主轨道
; 将继续执行而不受干扰。
@stop Boom
The bomb is defused!
```

— 如果我们没有在 `Boom` 异步线程中使用 [@sync] 命令，则 [@goto] 命令将在异步轨道上执行，而主轨道将继续进一步执行，因此我们最终会让 `BadEnd` 和主剧本并发运行。[@sync] 所做的是强制将目标轨道（默认为主轨道）移动到使用它的行并处理宿主轨道，本质上是将宿主轨道与目标轨道交换。

## 文本识别

诸如 [脚本本地化](/zh/guide/localization#脚本本地化) 和 [自动配音](/zh/guide/voicing#自动配音) 之类的功能需要将剧本脚本中编写的文本与其他资源相关联 — 例如，显示翻译后的文本而不是原始文本，或在打印文本时播放语音剪辑。为了使其工作，必须为每个此类文本分配一个唯一标识符。

默认情况下，Naninovel 在导入脚本资产时通过其内容哈希自动识别所有可本地化的文本。只要您不修改文本，这就可以正常工作。如果您确实修改了它，关联将会中断：您需要重新映射自动语音剪辑或重新翻译更改后的文本语句。

为了防止在编辑文本时关联中断，请使用可通过 `Naninovel -> Tools -> Text Identifier` 编辑器菜单访问的文本识别实用程序；它将自动生成并向剧本脚本中的每个可本地化文本写入唯一 ID。剧本文本将向每个可本地化参数附加标识符，例如：

```nani
Kohaku: Hey!|#1|[-] What's up?|#2|
@choice "Option 1|#3|"
@choice "Option 2|#4|"
```

只要您不删除或更改 ID，关联就不会中断。为了减少文本 ID 的干扰，IDE 扩展和故事编辑器以暗色渲染它们。

该实用程序确保所有生成的文本 ID 都是唯一的，并且以前未在脚本中使用过。为了跟踪这一点，它将修订号存储在 `NaninovelData/ScriptRevisions` 编辑器资产中。每当您删除带有分配文本 ID 的行时，您可以确信此 ID 不会突然出现在其他地方（除非您手动添加它）。

### 识别的文本参考

在极少数情况下，您可能希望故意复制可本地化的文本标识符 — 例如，当在 C# 中创建命令实例时，该实例应重用脚本中指定的本地化参数。

如果您只分配 `LocalizableTextParameter` 值，Naninovel 将警告重复的文本 ID。相反，请使用参数的 `Ref()` 实例方法：

```cs
var print = new PrintText();
print.AuthorLabel = otherPrint.AuthorLabel.Ref();
```

要引用剧本脚本中现有的本地化文本，请将 `&` 附加到标识符：

```nani
; 显示带有 "Some Text" 的选项，然后打印相同的文本。
@choice "Some Text|#SOMEID|"
@print |#&SOMEID|
```

## 标题脚本

标题脚本是在脚本配置菜单中分配的特殊剧本脚本。分配后，它会在引擎初始化后或使用 [@title] 命令或游戏内各种菜单中的 "Title" 按钮退出到标题菜单时自动播放。标题脚本可用于设置标题屏幕场景：背景、音乐、效果、显示标题 UI 等。

该脚本还可用于在玩家单击 "NEW GAME"、"EXIT" 或任何保存槽以在标题 UI 内加载游戏时调用命令。以下是标题脚本的示例。

```nani
; 设置标题菜单外观。
@back MainMenuBackground
@bgm MainMenuMusic
@spawn Rain
@show TitleUI
@stop

# OnNewGame
; 以下命令将在玩家单击 "NEW GAME" 时执行。
; 请注意，等待 "stopBgm" 命令，以便音乐
; 在新游戏开始加载之前完全停止。
@sfx NewGameSoundEffect
@stopBgm wait!
@stop

# OnLoad
; 以下命令将在玩家加载保存的游戏时执行。
@sfx LoadGameEffect
@wait 0.5
@stop

# OnExit
; 以下命令将在玩家单击 "EXIT" 时执行。
@sfx ExitGameEffect
@wait 1.5
@stop
```

## Fountain

[Fountain](https://fountain.io) 是一种标记语法，用于以人类可读的文本编写和共享剧本。它受到 [Highland](https://highland2.app)、[Final Draft](https://www.finaldraft.com) 和 [Scrivener](https://www.literatureandlatte.com/scrivener) 等编剧软件的支持。

Naninovel 提供了一个将 `.fountain` 文档转换为 `.nani` 脚本的工具，因此您可以在兼容 Fountain 的软件中起草项目的初始剧本，然后将其移至 Naninovel。

从编辑器菜单打开工具：`Naninovel -> Tools -> Fountain Screenplay`。选择源 `.fountain` 文档和生成的 `.nani` 文件的输出文件夹，然后单击 "Convert Screenplay"。

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

它将被转换为组织到文件夹中的以下剧本脚本：

- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
