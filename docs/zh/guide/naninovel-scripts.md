# Naninovel 脚本

Naninovel 脚本是扩展名为 `.nani` 的文本文件，用于控制场景中发生的事件。脚本资源可通过 `Create -> Naninovel -> Naninovel Script` 菜单创建。你可以使用内置的 [可视化编辑器](#可视化编辑器)，或使用任意外部文本编辑器（如 Microsoft Word、Google Docs 或 [VS Code](https://code.visualstudio.com)）打开并编辑它们。

![?class=when-dark](https://i.gyazo.com/0051c3b96de4854d665e6bf9aba6bbd1.png)
![?class=when-light](https://i.gyazo.com/4172fee457fb4c1f473ffeb0516b83ca.png)

Naninovel 脚本中的每一行都代表一个语句，它可以是指令、普通文本、标签或注释。语句的类型由行首的字符标识决定：

| 字符标识 | 语句类型                  |
|:--------:|---------------------------|
|    @     | [指令](#指令行)           |
|    #     | [标签](#标签行)           |
|    ;     | [注释](#注释行)           |

当行首未出现上述任意标识符时，该行将被视为 [普通文本行](#普通文本行) 语句。

::: tip
你可以通过 [编译器本地化](/zh/guide/localization#compiler-localization) 功能，修改所有预定义的编译器元素，如控制字符、指令标识符、常量等。换言之，几乎所有在编写脚本时需要输入的内容都可以自定义。
:::

## 指令行

当一行以 `@` 开头时，该行会被视为指令语句。指令表示一个控制场景中行为的操作，例如：更换背景、移动角色或加载另一个 Naninovel 脚本。

### 指令标识符

在指令标识符 `@` 之后，需要紧跟一个指令名。该指令名可以是实现该指令的 C# 类名，或通过 `Alias` 特性定义的指令别名。

例如，用于自动保存游戏的 [@save] 指令，是由 `AutoSave` C# 类实现的。该类应用了 `[Alias("save")]` 特性，因此你既可以在脚本中使用 `@save`，也可以使用 `@AutoSave` 来调用同一个指令。

指令标识符不区分大小写；以下几种写法都是有效的，且都会调用相同的 `AutoSave` 指令：

```nani
@save
@Save
@AutoSave
@autosave
```

### 指令参数

大多数指令都带有若干参数，用于定义该指令的具体效果。参数是一个键值对表达式，位于指令标识符之后，并以冒号（`:`）分隔。参数标识符（键）可以是指令实现类中对应字段的名称，或通过 `CommandParameter` 特性（Attribute）的 `alias` 属性定义的别名。

```nani
@commandId paramId:paramValue
```

以 [@hideChars] 指令为例，该指令用于隐藏场景中所有可见的角色。其使用方式如下：

```nani
@hideChars
```

你可以使用 `time` *Decimal* 参数来控制角色淡出并完全隐藏（从场景中移除）所需的时间，例如：

```nani
@hideChars time:5.5
```

这将使角色在 5.5 秒内逐渐淡出，然后从场景中完全移除。

### 参数类型

根据指令参数的不同，它可以接受以下几种值类型：

| 类型        | 描述                                                                                                                                                                                                                    |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **string**  | 简单字符串值，例如：`LoremIpsum`。若字符串中包含空格，请务必使用双引号包裹，例如：`"Lorem ipsum dolor sit amet."`。                                                                                                     |
| **integer** | 整数值（不包含小数部分），例如：`1`、`150`、`-25`。                                                                                                                                                                      |
| **decimal** | 带小数点的数值，例如：`1.0`、`12.08`、`-0.005`。                                                                                                                                                                        |
| **boolean** | 逻辑值，可为 `true` 或 `false`。多数情况下可以使用 [布尔标志（Boolean Flags）](/zh/guide/naninovel-scripts#boolean-flags) 代替输入 `true` 或 `false`，例如：`@camera ortho! !wait` 等价于 `@camera ortho:true wait:false`。 |
| **named**   | 由名称和上述任一类型的值组成的命名值，名称与值之间用句点分隔。例如命名整数：`foo.8`、`bar.-20`。                                                                                                                        |
| **list**    | 由逗号分隔的多个同类型值组成的列表。例如字符串列表：`foo,bar,"Lorem ipsum."`；或小数列表：`12,-8,0.105,2`。                                                                                                             |

### 无名参数

大多数指令都带有一个 “无名参数”。当参数可以在不显式指定名称的情况下使用时，就被视为无名参数。

例如，[@bgm] 指令需要一个无名参数，用于指定要播放的音乐曲目名称：

```nani
@bgm PianoTheme
```

此处的 `"PianoTheme"` 是 `BgmPath` *String* 参数的值。

每个指令最多只能有一个无名参数，并且它必须始终位于所有其他参数之前。

### 可选与必选参数

大多数指令参数是 *可选的*。这意味着它们要么有预定义的默认值，要么在指令执行时并非必需。例如，当 [@resetText] 指令在未指定任何参数的情况下使用时，它会重置默认文本输出窗的内容；但你也可以指定特定的打印机 ID，例如：`@resetText printer:Dialogue`。

不过，有些参数是 *必需的*，必须显式指定，否则指令将无法执行。

### 指令 API 参考

要查看所有可用指令的列表（包括摘要、参数和使用示例），请参阅 [指令 API 参考](/api/)。

## 注释行

当一行以分号（`;`）开头时，该行会被视为注释语句。在解析脚本时，注释行会被引擎完全忽略。你可以使用注释行为自己或团队中的其他成员添加备注或说明，以便在编写 Naninovel 脚本时更好地协作。

```nani
; 以下指令将自动保存游戏。
@save
```

在本指南的后续章节中，我们将使用注释行来为示例 NaniScript 代码片段添加说明。

## 普通文本行

为便于在脚本中编写大量文本，Naninovel 提供了普通文本行的语法。当一行未以任何预定义的语句标识符开头时，该行会被视为普通文本语句。

```nani
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

你可以在普通文本行的开头添加一个作者 ID，并使用冒号加空格（`: `）分隔，以将显示的文本与对应的 [角色](/zh/guide/characters) 关联：

```nani
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

当你在脚本中频繁切换角色外观并显示文本时，为了减少输入量，可以在作者 ID 之后直接指定外观名称：

```nani
Felix.Happy: Lorem ipsum dolor sit amet.
```

上述这一行等价于以下两行：

```nani
@char Felix.Happy
Felix: Lorem ipsum dolor sit amet.
```

### 指令内联

有时你可能希望在文本逐字显示（打印）过程中，在特定字符之前或之后执行某个指令。例如：当某个单词被打印出来时，角色更换表情；或在描述某个事件的同时播放特定音效。指令内联功能正是为此设计的。

所有指令（包括 [内置指令](/api/) 和 [自定义指令](/zh/guide/custom-commands)）都可以通过方括号（`[ ]`）语法内联到普通文本行中。

```nani
Felix: Lorem ipsum[char Felix.Happy pos:0.75] dolor sit amet, consectetur adipiscing elit.[-] Aenean tempus eleifend ante, ac molestie metus condimentum quis.[-][br 2] Morbi nunc magna, consequat posuere consectetur in, dapibus consectetur lorem. Duis consectetur semper augue nec pharetra.
```

请注意，内联指令的语法与普通指令几乎完全相同，只是省略了开头的 `@`，并将指令主体包裹在方括号内。基本上，你可以将任意指令行直接内联到普通文本中，它会产生相同的效果，只是触发的时机会根据其在文本中的位置而不同。

在底层实现中，普通文本行会被解析为一系列带有内联索引的独立指令；文本的逐字打印由 [@print] 指令完成。例如，以下普通文本行：

```nani
Lorem ipsum[char Felix.Happy pos:75 wait!] dolor sit amet.
```

—— 实际上在引擎内部会被处理为一系列独立的指令序列：

```nani
@print "Lorem ipsum" !waitInput
@char Felix.Happy pos:75 wait!
@print " dolor sit amet." !reset
```

若要在普通文本行中实际显示方括号，请使用反斜杠进行转义，例如：

```nani
Some text \[ text inside brackets \]
```

—— 这将在游戏中显示为 “Some text [ text inside brackets ]”。

若要在文本显示完毕后跳过等待玩家输入，可在行末添加 `[>]`：

```nani
; 打印以下这行文本后将不会进入等待输入状态
; （玩家无需确认提示即可继续阅读）。
Lorem ipsum dolor sit amet.[>]
```

### 通用参数

在某些情况下，你可能希望为整行或部分普通文本设置或修改 [@print] 指令的参数。可以使用仅在普通文本行中可用的特殊指令 `<` 来实现此目的：

```nani
; 以下这行文本将由 Kohaku 和 Yuko 两位角色共同发表，
; 同时文本输出窗上的显示名称将显示为 “All Together”。
Kohaku,Yuko: How low hello![< as:"All Together"]

; 句子的前半部分将以 50% 的速度打印，
; 而后半部分将以 250% 的速度打印，并且不会进入等待状态。
Lorem ipsum[< speed:0.5] dolor sit amet.[< speed:2.5 nowait!]
```

该指令会将指定的参数应用到紧接在它之前的最后一行文本上，无论在 `<` 与该文本之间是否存在其他内联指令。

```nani
; 即使参数被放置在内联指令 [-] 之后，
; 打印速度仍然会应用于 “Lorem ipsum” 部分。
Lorem ipsum[-][< speed:0.5] dolor sit amet.
```

### 空白符分界

当普通文本行以空白字符（如空格或制表符）开头或结尾时，可以使用显式分界来标识文本实际的开始或结束位置，这在使用嵌套结构时尤其有用。

可使用 `[]`（空的内联指令）来标记普通文本行的边界：

```nani
; 打印结果为 “Some text  continuation.”（中间包含两个空格）
@group
    ; 确保行尾的空白符被保留。
    Some text []
    ; 确保行首的空白符被保留。
    [] continuation.[< join!]
```

## 标签行

标签用于在 Naninovel 脚本中通过 [@goto] 指令进行跳转时作为“锚点”。要定义一个标签，请在行首使用 `#` 符号并紧跟标签名称：

```nani
# Epilogue
```

随后，你可以使用 [@goto] 指令“跳转”到该标签所在的行：

```nani
@goto ScriptPath#Epilogue
```

当 [@goto] 指令与目标标签位于同一个脚本中时，可以省略脚本路径：

```nani
@goto #Epilogue
```

### 演出脚本根目录

使用导航指令时指定的“锚点”被称为 *端点（Endpoint）*。端点由两部分组成：**脚本路径** 和 **标签**。标签是可选的；当省略时，端点将被视为指向脚本的起始位置。脚本路径指的是 Naninovel 演出脚本的路径（不含 `.nani` 扩展名），其位置是相对于 *演出脚本根目录* 的。

演出脚本根目录是项目中存放所有演出脚本文件的顶级目录。例如，以下是一个 Unity 项目的目录结构示例：

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

在此示例中，演出脚本根目录为 `Assets/Scenario`。若要跳转到脚本文件 `Assets/Scenario/RouteX/SceneX.nani`，应使用以下端点：`RouteX/SceneX`。

::: tip
如果你不想在指定端点时包含目录路径——完全没问题！请参阅下文介绍的 [相对端点语法](/zh/guide/naninovel-scripts#relative-endpoints) 和 [通配符端点语法](/zh/guide/naninovel-scripts#wildcard-endpoints)。
:::

当你创建或移动演出脚本时，Naninovel 会自动检测演出脚本根目录。你可以在 Naninovel 的脚本配置菜单中查看当前的根目录设置。

![](https://i.gyazo.com/57515d699182ed09033e7284d1b58c46.png)

### 端点语法

Naninovel 支持四种端点语法格式，在某些情况下可以让路径表达更简洁。

#### 标准端点

这是默认的语法格式，包含从 [演出脚本根目录](/zh/guide/naninovel-scripts#scenario-root) 开始到目标脚本的完整路径。该语法始终可用，并且不依赖当前脚本的位置，但需要包含指向目标脚本的所有目录路径：

```nani
; 跳转到脚本 'Assets/Scenario/Prologue.nani' 的起始位置。
@goto Prologue
; 跳转到脚本 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' 中的标签 'Action'。
@goto CommonRoute/Day1/Scene1#Action
```

#### 本地端点

此语法仅在跳转到当前脚本内的标签时可用。它不包含演出脚本路径，仅指定标签名称：

```nani
; 跳转到当前脚本中的标签 'Action'。
@goto #Action
```

#### 相对端点

相对路径语法可用于简化端点写法，使路径相对于当前脚本进行映射：

```nani
; 假设当前所在脚本为 'Assets/Scenario/CommonRoute/Day1/Scene1.nani'，
; 跳转到同一目录下的 'Scene2.nani' 文件。
@goto ./Scene2
; 跳转到上一级目录中的 'Day2/Scene1.nani' 文件。
@goto ../Day2/Scene1
; 跳转到上两级目录中的 'RouteX/SceneX.nani' 文件。
@goto ../../RouteX/SceneX
```

#### 通配符端点

如果你完全不想在路径中包含目录，可以使用通配符路径，只需指定脚本名称即可。但请注意，该方式仅在脚本名称唯一时有效——也就是说，项目中不能存在其他同名脚本文件，无论它们位于哪个目录中：

```nani
; 跳转到名为 'Prologue.nani' 的脚本文件，无论其位于何处。
@goto */Prologue
; 此指令会报错，因为项目中存在多个名为 'Scene1.nani' 的脚本文件。
@goto */Scene1
; 此指令可正常工作，因为在 'Day1' 目录下只有一个名为 'Scene1.nani' 的脚本文件。
@goto */Day1/Scene1
```

## 布尔标志

布尔标志可作为布尔类型参数值的快捷写法，例如：

```nani
; 使角色 Kohaku 可见。
@char Kohaku visible!
; 等价于：
@char Kohaku visible:true

; 使角色 Kohaku 不可见。
@char Kohaku !visible
; 等价于：
@char Kohaku visible:false

; 内联指令同样支持布尔标志语法。
Lorem ipsum[shake Camera ver! !wait] dolor sit amet.
; 等价于：
Lorem ipsum[shake Camera ver:true wait:false] dolor sit amet.
```

唯一需要使用完整布尔形式的情况，是当你希望通过 [脚本表达式](/zh/guide/script-expressions) 动态计算布尔值时，例如：

```nani
; 若 “score” 变量的值大于 10，则使 Kohaku 角色可见。
@char Kohaku visible:{score>10}
```

—— 或当布尔参数是无名参数时，例如：

```nani
; 使用无名参数关闭摄像机观察模式。
@look false
```

不过，在后一种情况下，你也可以为无名参数指定 ID，从而仍可使用布尔标志：

```nani
; 使用布尔标志关闭摄像机观察模式。
@look !enable
```

## 条件执行

虽然脚本默认是按线性顺序执行的，但你可以使用所有指令都支持的 `if` 或 `unless` 参数来实现分支逻辑。

```nani
; 若 `level` 变量为数字且大于 9000，则添加该选项。
@choice "It's over 9000!" if:level>9000

; 若 `dead` 变量为 false（布尔值），则执行打印指令。
@print "I'm still alive." if:!dead

; 同上，但写法更简洁。
@print "I'm still alive." unless:dead

; 若 `glitch` 为 true 或随机函数 Random(1, 10) 返回值大于等于 5，
; 则执行 `@spawn` 指令。
@spawn GlitchCamera if:{ glitch || Random(1, 10) >= 5 }

; 若 `score` 的值在 7 到 13 之间，或 `lucky` 变量为 true，
; 则加载 `LuckyEnd` 脚本。
@goto LuckyEnd if:{ (score >= 7 && score <= 13) || lucky }

; 你也可以在内联指令中使用条件表达式。
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; 若在表达式中使用双引号，请记得进行转义。
@print {remark} if:remark=="Saying \"Stop the car\" was a mistake."
```

### 条件块

可以使用 [@if] 和 [@else] 指令定义多行的条件代码块（可[嵌套](/zh/guide/naninovel-scripts#nesting)使用）：

```nani
; 根据变量 "score" 的值打印不同的文本：
;   当 score < 6 时：打印 “You've failed. Try again!”
;   当 score > 8 时：打印 “You've passed the test.” 和 “Brilliant!”
;   当 score > 7 时：打印 “You've passed the test.” 和 “Impressive!”
;   其他情况：打印 “You've passed the test.” 和 “Good job!”
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

也可以在普通文本行中使用条件块。不同于缩进结构，这种情况下需使用 [@endif] 指令标记条件块的结束：

```nani
; 根据变量 "score" 的值打印不同的文本：
;   当 score < 6 时：打印 “Test result: Failed.”
;   当 score > 8 时：打印 “Test result: Perfect!”
;   其他情况：打印 “Test result: Passed.”
Test result:[if score>8] Perfect![else if:score>6] Passed.[else] Failed.[endif]
```

要指定反向条件，可使用 [@unless] 指令：

```nani
; 当变量 "dead" 为 false 时打印 “You're still alive!”，
; 否则打印 “You're done.”。
@unless dead
    You're still alive!
@else
    You're done.

; 根据变量 "score" 的值打印不同的文本：
;   当 score ≥ 10 时：打印 “Test result: Passed.”
;   当 score < 10 时：打印 “Test result: Failed.”
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

::: info
有关条件表达式及可用运算符的更多信息，请参阅 [脚本表达式](/zh/guide/script-expressions) 指南。
:::

## 嵌套结构

某些指令（如 [@if]、[@choice]、[@while] 等）支持通过缩进的方式将其他指令或普通文本行与其关联：

```nani
@if score>10
    @bgm Victory
    Good job, you've passed the test!
```

—— 在此示例中，[@bgm] 指令及其后的普通文本行都隶属于 [@if] 指令。

支持此特性的指令被称为 *嵌套宿主*。在 C# 中，这类指令通过实现 `Command.INestedHost` 接口来区分。宿主指令可以控制其嵌套指令的执行方式、是否执行以及执行顺序。

每种宿主指令在执行嵌套指令时都有其特定行为。例如，[@if] 指令在条件不满足时会跳过嵌套指令，而 [@choice] 指令则会在玩家选择对应选项后执行其嵌套的指令：

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

注意嵌套块的缩进方式：每一级缩进必须为 **4个空格**。使用制表符（Tab）或其他数量的空格将被忽略。你可以嵌套任意层级的代码块，只需保持一致的 4 空格缩进即可。

有时，你可能希望将多个指令归为同一个宿主指令下执行。例如，使用 [@random] 指令随机执行其中一组指令。在这种情况下，可以使用 [@group] 指令进行分组：

```nani
; @random 指令会从嵌套的行中随机选择一条执行，但不会执行其子级指令。
; 因此这里使用 @group 指令来将多行指令归为一组，使 @random 指令能够随机执行整个指令组。
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## 异步执行

某些指令会在一段时间内执行。例如，[ @hide ] 指令会在设定的时间内让指定的 Actor 淡出，淡出持续时间可通过 `time` 参数调整。例如，以下场景：

```nani
@hide Kohaku
@show Yuko
```

—— 当运行该脚本时，你会注意到 Yuko 角色会在 Kohaku 开始淡出时同时淡入。这是因为默认情况下，所有异步指令都不会被等待执行完毕：`@show` 会在 `@hide` 开始淡出 Kohaku 的同时启动 Yuko 的淡入。

如果希望在异步指令执行完成后再继续后续脚本，可使用 `wait` 参数：

```nani
@hide Kohaku wait!
@show Yuko
```

—— 现在，Yuko 将在 Kohaku 完全淡出后才开始淡入。

通常情况下，会同时使用多个异步指令来布置场景，然后等待它们全部执行完毕。为简化此过程，可以使用 [@await] 指令：

```nani
; 并行执行所有嵌套的指令行，并等待它们全部完成。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
; 以下这行将在上述所有指令执行完毕后再执行。
It starts raining...
```

### 并行播放

虽然单个指令默认是异步执行的，但在某些情况下，你可能希望让一组指令在主剧情之外并行运行，以独立的控制流与播放状态执行。

使用 [@async] 指令可以让嵌套的指令行在专用的脚本轨道上执行，并与主播放流程同时进行。常见的用例包括在剧情正常推进的同时，在后台播放组合动画或视觉效果：

```nani
; 在淡出音乐的同时，让摄像机缓慢地穿过三个预设位置。
@async
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!

; 下方的文本将在上述动画独立运行的同时打印显示。
...
```

—— 或让一组指令以循环的方式持续运行：

```nani
@async loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }

; 上述动画将在循环中持续播放，而下方的文本会同时打印显示。
Watch out!
```

即使在动画播放过程中保存或加载游戏，系统也会恢复当时的播放状态，并从保存时的位置继续动画。回滚功能同样有效。

### 异步任务

在上面的循环示例中，你可能会疑惑：该如何停止循环？或者，如果我们希望等待一个非循环的异步场景块执行完再继续后续内容，该怎么做？这时就可以使用 **异步任务**！

可以在 [@async] 指令中使用可选的无名参数来为该异步任务指定名称。之后，你可以通过 [@stop] 或 [@await] 指令，使用该名称来停止（取消）或等待该任务：

```nani
; 启动名为 “Quake” 的异步任务。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }

...

; 在适当的时机停止该任务。
@stop Quake
```

同样地，你也可以等待异步任务完成：

```nani
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!

...

; 在重置摄像机之前，确保平移动画已完成。
@await CameraPan
@camera offset:0,0 zoom:0
```

你也可以使用 `complete!` 标志立即强制任务完成，而无需等待剩余的执行时间：

```nani
; 立即完成摄像机动画并重置。
@await CameraPan complete!
@camera offset:0,0 zoom:0 time:0
```

::: tip

建议将常用的动画或其他异步任务封装在单独的脚本中，之后可以通过 [@gosub] 指令在其他脚本中复用这些逻辑：

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
    @wait { random(3,10) }
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

在某些高级用例中，你可能希望将多个并行运行的轨道与主轨道或彼此进行同步。这时可以使用 [@sync] 指令来实现：

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; 60 秒后，如果 “Boom” 异步任务未被停止，
    ; 下方的 @sync 指令将强制将主轨道同步至此处，
    ; 随后跳转至 “BadEnd” 演出脚本。
    @sync
    @goto BadEnd

; 模拟一系列拆弹谜题。
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; “Boom” 异步任务被停止，主轨道将继续正常执行。
@stop Boom
The bomb is defused!
```

—— 如果我们没有在 “Boom” 异步线程中使用 [@sync] 指令，那么 [@goto] 指令会在异步轨道上执行，而主轨道仍会继续向下执行，结果就是 “BadEnd” 演出脚本与主剧情会同时运行。[@sync] 指令的作用是强制将目标轨道（默认是主轨道）移动到其所在的行，并销毁当前宿主轨道，从而实质上实现“用目标轨道替换宿主轨道”的效果。

## 标题脚本

标题脚本是一种特殊的 Naninovel 脚本，可在脚本配置菜单中进行指定。当设置后，它会在显示标题界面（主菜单）时自动播放。标题脚本可用于布置标题场景的内容，如背景、音乐、特效等。

此外，标题脚本还可用于在玩家点击 “NEW GAME”、“EXIT” 或任意存档槽以加载游戏时触发指令。以下是一个标题脚本的示例：

```nani
; 进入主菜单时执行以下指令。
; 注意：这些指令不会被等待，因此标题界面会同时显示。
@back MainMenuBackground time:3
@bgm MainMenuMusic
@spawn Rain
@stop

# OnNewGame
; 当玩家点击 “NEW GAME” 时执行以下指令。
; 注意：`stopBgm` 指令会被等待，以确保音乐在加载新游戏前完全停止。
@sfx NewGameSoundEffect
@stopBgm
@stop

# OnLoad
; 当玩家加载存档时执行以下指令。
@sfx LoadGameEffect
@wait 0.5
@stop

# OnExit
; 当玩家点击 “EXIT” 时执行以下指令。
@sfx ExitGameEffect
@wait 1.5
@stop
```

## 可视化编辑器

你可以使用可视化脚本编辑器来编辑 Naninovel 脚本。选中一个脚本资源后，可视化编辑器会自动在 `Inspector` 窗口中打开。

![](https://i.gyazo.com/ba57b9f78116e57408125325bdf66be9.mp4)

要在脚本中添加新行，可以在希望插入的位置右键点击，或按下 `Ctrl+Space`（可在输入配置菜单中更改快捷键）并选择要添加的行或指令类型。要调整行的顺序，可拖动其左侧的行号；要删除某行，右键点击并选择 “Remove”。

当你通过可视化编辑器修改了脚本后，Inspector 顶部的脚本路径上方会出现星号（`*`），表示该资源已修改但尚未保存。按下 `Ctrl+S` 即可保存更改。若在未保存的情况下尝试选择其他资源，会弹出提示窗口，允许你选择保存或放弃当前修改。

如果你在外部编辑器中更新了脚本，可视化编辑器会自动同步修改，从而能让你在文本编辑器与可视化编辑器间无缝切换。若自动同步未生效，请确保 Unity 编辑器菜单中 `Edit -> Preferences -> General` 里的 `Auto Refresh` 选项已启用。

在播放模式下，你可以使用可视化编辑器查看当前正在播放的脚本行，并通过右键菜单或按住 `Shift` 点击行号的方式回退播放进度。

![](https://i.gyazo.com/b6e04d664ce4b513296b378b7c25be03.mp4)

当前正在播放的行会以绿色高亮显示；当脚本因等待玩家输入而暂停时，对应行会以黄色高亮显示。

你可以在脚本配置菜单中自定义编辑器的行为和外观。

![](https://i.gyazo.com/7d29e700e87223c4c94143d50380c474.png)

![](https://www.youtube.com/watch?v=9UmccF9R9xI)

## 脚本图

当你在项目中使用大量脚本或编写非线性剧情时，拥有一个故事流程的可视化表示会非常有帮助。这时就可以使用脚本图工具。

![](https://i.gyazo.com/0dd3ec2393807fb03d501028e1526895.mp4)

可通过编辑器菜单 `Naninovel -> Script Graph` 打开脚本图窗口。你可以像其他编辑器面板一样将其停靠在 Unity 界面中。

该工具会自动构建所有通过编辑器资源菜单（`Naninovel -> Resources -> Scripts`）注册的 Naninovel 脚本的图形表示（节点），并展示它们之间的连接关系。

连接线是根据以下指令生成的：  
- [@goto]  
- [@gosub]  
- [@choice]（当带有 `goto` 参数时）

若指令中包含条件表达式（`if` 参数），节点上对应的端口会以黄色高亮显示，当鼠标悬停在端口上时，可查看具体的条件表达式。

你可以双击节点或点击端口来打开脚本资源并在可视化编辑器中查看。点击端口时，编辑器会自动滚动至对应标签所在的行（若标签存在）。

节点位置可随意拖动调整，关闭图形窗口或退出 Unity 时，节点布局会自动保存，并在下次打开时恢复。你也可以手动点击 “Save” 按钮保存，或点击 “Auto Align” 按钮重置所有节点位置。

当你修改脚本或新增脚本后，点击 “Rebuild Graph” 按钮以同步更新。

若脚本顶部包含 [注释行](/zh/guide/naninovel-scripts#comment-lines)，对应的图形节点将显示这些注释作为摘要（Synopsis）。若不希望显示摘要，可在脚本配置菜单中取消勾选 “Show Synopsis” 选项。

![](https://i.gyazo.com/15682b202d37ad8f12b0f839063a530f.png)

## 热重载

在播放模式下，你可以直接编辑脚本（无论是通过可视化编辑器还是外部文本编辑器），并让修改立即生效，而无需重新启动游戏。该功能由脚本配置中的 `Hot Reload Scripts` 属性控制，默认已启用。

当你在当前播放行之前修改、添加或删除行时，系统会自动回滚到被修改的行，以防止状态不一致。

如果热重载功能未生效，请确保以下设置已正确配置：  
- `Auto Refresh` 已启用。  
- `Script Changes While Playing` 设置为 `Recompile And Continue Playing`。  

这两个选项可在 Unity 编辑器菜单 `Edit -> Preferences -> General` 中找到。

![](https://i.gyazo.com/5d433783e1a12531c79fe6be80c92da7.png)

若希望手动触发当前正在播放的 Naninovel 脚本的热重载（例如在 Unity 外部编辑脚本或在构建版本中运行时），可使用 `reload` [控制台指令](/zh/guide/development-console)。

## IDE 支持

::: tip
译注：IDE即集成开发环境的缩写，常用于软件开发，比如Visual Studio、WebStorm、Rider、Xcode这些都算是IDE。这里其实主要指的是由微软开发的轻量化且更贴近 “文本编辑器” 的免费开发工具 Visual Studio Code。强烈建议开发中使用VSC + Naninovel扩展，语法高亮等诸多特性可极大提高演出录入、制作效率。
:::

借助语法高亮、错误检查、自动补全和交互式文档等 IDE 功能，你可以在编写脚本时显著提升效率。  

我们为免费且开源的 [VS Code 编辑器](https://code.visualstudio.com)（支持 Windows、macOS 与 Linux）开发了一个扩展插件，该插件为 NaniScript 语法提供了必要的 IDE 支持。

![](https://i.gyazo.com/b1f5c6845c04d1b18b2196aa29ea6c19.png)

有关如何安装和使用此扩展的详细说明，请参阅 [IDE 扩展指南](/zh/guide/ide-extension)。

## 脚本调试

在处理大型 Naninovel 脚本时，每次都从头开始播放来测试脚本的特定部分会非常麻烦。

你可以使用 [开发者控制台](/zh/guide/development-console)，即时将当前播放的脚本“回退”到任意一行：

```
rewind 12
```

—— 这条指令会从当前脚本的第 12 行开始播放；你也可以用同样的方式向前或向后回退。  

在游戏运行时打开控制台，请先确保已在引擎配置中启用控制台，然后按下 `~` 键（可在配置中修改），若在触摸设备上运行，则可通过多点触控（同时触摸 3 个或更多点）来打开控制台。

若想查看当前正在播放的脚本及其行号，可使用调试窗口：在开发者控制台中输入 `debug` 并按下 `Enter` 键即可显示。

![Scripts Debug](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

当前播放的脚本路径、行号及指令（或内联指令）索引会显示在窗口标题栏中。当启用 [自动语音](/zh/guide/voicing#auto-voicing) 功能时，对应语音文件的名称也会显示在窗口中。  

你可以通过拖动标题栏来移动调试窗口的位置。点击 “Stop” 按钮可暂停脚本执行；当脚本暂停后，点击 “Play” 按钮可继续执行。点击 “Close” 按钮即可关闭调试窗口。

调试窗口在编辑器与构建版本（运行时）中均可使用。

---

## 文本标识

某些功能（如 [脚本本地化](/zh/guide/localization#scripts-localization) 和 [自动语音](/zh/guide/voicing#auto-voicing)）需要将 Naninovel 演出脚本中的文本与其他资源（如翻译文本或语音文件）进行关联。例如：在显示文本时播放对应语音，或在多语言版本中显示翻译后的文本。要实现这种关联，必须为每段文本分配一个唯一标识符（ID）。

默认情况下，Naninovel 会在导入脚本资源时，根据文本内容的哈希值自动生成标识符。这在文本未被修改时工作良好；但一旦修改了文本，其哈希值会发生变化，所有关联（如自动语音或翻译）将会失效，需要重新映射语音文件或重新翻译已更改的文本。

为防止在编辑文本时导致关联丢失，可以使用编辑器菜单中的 `Naninovel/Tools/Text Identifier` 工具。该工具会自动为演出脚本中每个可本地化文本生成并写入唯一 ID。生成后的文本会在每个可本地化参数后附加标识符，例如：

```nani
Kohaku: Hey!|#1|[-] What's up?|#2|
@choice "Option 1|#3|"
@choice "Option 2|#4|"
```

—— 只要你不删除或修改这些 ID，文本与资源之间的关联就不会被破坏。为减少干扰，IDE 扩展与可视化编辑器会将这些文本 ID 以较暗的颜色显示。

文本标识工具会确保生成的所有文本 ID 在当前脚本文档中唯一，并且不会与历史版本中使用过的 ID 重复。为此，工具会在 `NaninovelData/ScriptRevisions` 编辑器资源中保存最新的修订版本号信息。  

每当你删除带有文本 ID 的行时，可以放心该 ID 不会被自动分配给其他位置（除非你手动指定它）。

### 已识别文本引用

在某些特殊情况下，你可能希望**有意重复使用**某个可本地化文本的标识符。  
例如，当你在 C# 中创建一个指令实例，并希望复用脚本中已定义的本地化参数时。

如果你直接为 `LocalizableTextParameter` 参数赋值，Naninovel 会警告存在重复的文本 ID。此时应改用参数的 `Ref()` 实例方法来引用原有文本：

```cs
var myPrintCommand = new PrintText();
myPrintCommand.AuthorLabel = printFromScript.AuthorLabel.Ref();
```

要在演出脚本中引用现有的本地化文本，请在标识符后添加 `&` 符号：

```nani
; 显示一个包含 “Some Text” 的选项，然后打印相同的文本。
@choice "Some Text|#SOMEID|"
@print |#&SOMEID|
```

## Fountain 剧本语法

[Fountain](https://fountain.io) 是一种用于以纯文本方式编写、编辑与共享剧本的标记语法。它被多款专业编剧软件所支持，例如 [Highland](https://highland2.app)、[Final Draft](https://www.finaldraft.com) 与 [Scrivener](https://www.literatureandlatte.com/scrivener)。

![](https://i.gyazo.com/a4efc6cd882a12799f548ecf1dde4824.png)

Naninovel 提供了一个工具，可将 `.fountain` 文档转换为 `.nani` 脚本。这使你可以在兼容 Fountain 的软件中撰写项目的初始剧本，之后再导入 Naninovel 继续开发。

可通过编辑器菜单 `Naninovel -> Tools -> Fountain Screenplay` 打开该工具，选择源 `.fountain` 文档、指定生成 `.nani` 文件的输出文件夹，然后点击 “Convert Screenplay” 即可完成转换。

![](https://i.gyazo.com/2cf71e3a5b2713ba14838f1e28bb498d.png)

Fountain 中的 [Action](https://fountain.io/syntax#section-action) 与 [Dialogue](https://fountain.io/syntax#section-dialogue) 段落会被转换为 [普通文本行](/zh/guide/naninovel-scripts.html#generic-text-lines)，而其他语法结构则会被转换为 [注释行](/zh/guide/naninovel-scripts.html#comment-lines)。

![](https://i.gyazo.com/e6d3231993fc11eb664d2c9a70c8a87a.png)

若希望将剧本拆分为多个 `.nani` 脚本，可使用 Fountain 的 [Section](https://fountain.io/syntax#section-sections) 标记。例如，以下剧本示例：

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

它将会被转换为如下结构的 Naninovel 脚本文件，并按文件夹进行组织：

- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
