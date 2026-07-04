# 变量

剧本变量允许您创建用户指定的值、修改这些值，并使用它们来驱动剧本脚本和其他系统中的条件执行。例如，变量可用于根据玩家做出的决定，在多个要播放的剧本脚本（剧本路线）中选择其一。另一个常见用途是根据游戏过程中做出的选择来追踪玩家数据（例如分数、金钱、资源）。

::: info NOTE
变量名称应以字母开头，并且只能包含字母、数字和下划线，例如：`score`、`Char1Score`、`my_score`。名称不区分大小写，这意味着您可以创建名为 `myscore` 的变量，之后用 `MyScore` 引用它，反之亦然。
:::

您可以使用 [@set] 命令（以及某些其他命令的参数）创建和修改变量，并在任何具有表达式上下文的参数中使用它们，例如 [@if] 和 [@while] 的主参数。以下脚本会根据 `score` 的值重新路由执行流程：

```nani
; 创建 'score' 变量。
@set score=0

; 在某个时刻，根据玩家选择修改变量。
@choice "Good Decision" set:score++
@choice "Bad Decision" set:score--
...

; 稍后，使用变量进行条件执行。
@if score is above 10
    @goto GoodEnd
@else
    @goto BadEnd
```
— 可在 [@set] 命令参考中查看更多变量用法示例。

::: tip
`score is above 10` 表达式使用的是 `is above` 别名，而不是 `>` 运算符；如果您更喜欢运算符，也可以写成 `@if score > 10`。有关支持语法的更多信息，请参阅[剧本表达式指南](/zh/guide/expressions#运算符别名)。
:::

## 注入变量

即使命令参数不是表达式上下文，也可以使用大括号将变量注入其中：

```nani
; 分配 3 个变量。
@set posX=0, posY=0.5, time=1.5

; 将它们注入到 'char' 命令的参数中。
@char Kohaku pos:{posX},{posY} time:{time}
```

普通文本行中也可以这样做：

```nani
; 提示玩家输入文本并将其分配给 `name` 变量。
@input name summary:"Choose your name."

; 注入已分配的 `name` 变量。
Archibald: Greetings, {name}!
```

::: tip
要让角色名称动态变化，请使用[显示名称](/zh/guide/characters#显示名称)功能。
:::

只要参数类型允许，您就可以将变量注入任何参数值。例如，不能把字符串（文本）分配给数值参数。

```nani
@set yPos=0.1, tint="lightblue"

; 以下会产生错误，因为 `tint` 不是数字。
@char Kohaku pos:50,{tint}

; ...而这会正常执行。
@char Kohaku pos:50,{yPos} tint:{tint}
```

## 元变量

默认情况下，剧本变量是当前游戏会话的局部变量：如果您在游玩过程中为变量赋值，而玩家随后开始新游戏，或加载另一个尚未赋值该变量的存档栏位，该值将会丢失。此行为适用于大多数变量类型。如果您希望将变量与游戏会话“解耦”，请在使用 [@set] 命令初始化变量时使用 `meta!` 标志：

```nani
@set myMetaVariable=0 meta!
```

元变量适合追踪独立于单个游戏会话之上的“元”信息，例如路线完成情况、累计游戏统计数据或成就：

```nani
; 定义用于追踪 'X' 和 'Y' 路线完成情况的变量。
@set completeRouteX, completeRouteY to:false meta!
...

; 稍后在脚本中，当 'X' 路线完成时。
@set completeRouteX=true

; 现在你可以在 Title 脚本中显示特别内容。
@if completeRouteX and completeRouteY
    @showUI TrueRouteTitle
@else
    @showUI DefaultTitle
```

::: tip
如果您想要一个只递增一次的元计数器（即使重复游玩，例如回滚后或重启游戏后，也不会再次递增），请使用 `hasPlayed()` [表达式查询](/zh/guide/expressions#表达式查询)：
```nani
@set metaCounter=0 meta!
...
@set metaCounter++ unless:hasPlayed()
```
:::

## 变量作用域

可以通过在变量名称前添加作用域名称和一个点，将剧本变量分组到某个作用域下：

```nani
@set stats.strength=1
@set stats.agility=3

@if stats.agility is above stats.strength
    ...
```

当多个系统需要相同的短变量名时，作用域变量很有用，例如 `route.complete`、`stats.complete` 或 `quest.complete`。

使用 [@set](/zh/api/#set) 命令分配多个变量时，可以使用 `scope` 参数为每个变量应用相同的作用域：

```nani
@set strength, intellect, agility to:0 scope:stats
@set stats.agility++
```

## 局部变量

以点开头的变量名称是其所在剧本脚本文件的局部变量：

```nani
@set .count=0
@while .count is below 10
    @set .count++
    Current count: {.count}
```

每个剧本脚本都有自己的局部作用域，因此一个脚本中的 `.count` 不会与另一个脚本中的 `.count` 冲突。局部变量适合用于脚本内部计数器、临时路线状态，以及不需要项目级名称的辅助值。

## 默认赋值

默认赋值只会在变量尚未有值时为剧本变量赋值。当您想确保变量拥有初始值，但又不想在它已经设置时覆盖它，这会很有用。

要执行默认赋值，可以使用 `?=` 运算符，或在使用 [@set] 命令时添加 `init!` 标志：

```nani
; 使用默认值 0 初始化 'foo'。
@set foo?=0
; 使用默认值初始化这三个变量。
@set foo=0, bar=false, baz="" init!
```

使用 `meta!` 或 `const!` 标志会自动隐含默认赋值，因此不需要再与它们一起指定 `?=` 运算符：

```nani
; 声明并将 'false' 赋给这两个用于追踪路线完成情况的变量。
; 当同一个脚本再次播放时（例如在下一次开始游戏时），
; 这些变量不会被重新赋值。
@set clearedRouteX, clearedRouteY to:false meta!
```

## 变量事件

构建[自定义 UI](/zh/guide/gui#ui-自定义) 或其他系统时，您可能希望在变量值更改时做出反应。例如，在创建角色统计界面时，您可能希望文本根据变量更新。常规做法是使用 C# 脚本，但也可以使用 `Variable Events` 组件。当指定名称的变量发生变化时，此组件会调用 Unity 事件。

![](https://i.gyazo.com/a8ad226b7a50110584551ae81179c709.png)

::: tip EXAMPLE
可在[地图示例](/zh/guide/samples#地图)中查看使用变量触发器驱动地图位置可用性的示例。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 变量调试

游戏运行时，您可以查看和修改所有现有变量以进行调试。

使用 `~` 键打开开发控制台，然后输入 `var` 命令打开变量编辑器窗口。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

修改列表中变量的值时，会出现一个 "SET" 按钮；按下它即可应用更改。

当剧本变量在游戏运行时发生变化，变量列表会自动更新。

## 在 C# 中使用剧本变量

剧本变量可通过 `IVariableManager` [引擎服务](/zh/guide/engine-services) 在 C# 中访问。

要创建新变量，请使用 `AddVariable` 方法：

```csharp
var vars = Engine.GetService<IVariableManager>();
// 创建值为 'Hello World!' 的 'myVar' 字符串变量。
vars.AddVariable(new("myVar", new("Hello World!")));
```

要创建元变量或常量变量，请指定类型：

```csharp
// 创建用于追踪路线完成情况的 boolean 元变量。
vars.AddVariable(new("clearedRouteX", new(false), VariableKind.Meta));
```

要获取和设置变量值，请分别使用 `GetValue` 和 `SetValue` 方法。例如，假设存在名为 `myVar` 的剧本字符串变量，下面的代码会获取其值，向其追加 "Hello!"，然后将修改后的值设置回去：

```csharp
var value = vars.GetValue("myVar").String;
value += "Hello!";
vars.SetValue("myVar", new(value));
```

请注意，在获取变量的实际值时使用了 `.String` 属性。变量可以是三种类型之一：`String`、`Numeric` 或 `Boolean`。类型由变量在剧本脚本中首次赋值时决定：

```nani
; 为 'foo' 变量分配 'Hello World!' 字符串值
@set foo="Hello World!"
; 在表达式中使用字符串值
@if foo is "Hello World!"

; 为 'bar' 变量分配数值 42
@set bar=42
; 在表达式中使用数值
@if bar is above 12

; 为 'baz' 变量分配 boolean 值 true
@set baz=true
; 在表达式中使用 boolean 值
@if baz
```

或在 C# 中：

```csharp
var vars = Engine.GetService<IVariableManager>();

// 为 'foo' 变量分配 'Hello World!' 字符串值
vars.SetValue("foo", new("Hello World!"));
// 访问分配的字符串值
if (vars.GetValue("foo").String == "Hello World!")

// 为 'bar' 变量分配数值 42
vars.SetValue("bar", new(42));
// 访问分配的数值
if (vars.GetValue("bar").Number > 12)

// 为 'baz' 变量分配 boolean 值 true
vars.SetValue("baz", new(true));
// 访问分配的 boolean 值
if (vars.GetValue("baz").Boolean)
```

要在 C# 中检查剧本变量的类型，请使用值上的 `.Type` 属性：

```csharp
var value = vars.GetValue("bar");
if (value.Type == VariableValueType.Numeric)
    if (value.Number > 12) // 现在可以安全地访问 '.Number' 值
```

或者，使用其中一个 `Try...` 重载：

```csharp
vars.TryGetValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"My float variable value: {floatValue}");

vars.TryGetValue<int>("MyIntVarName", out var intValue);
Debug.Log($"My integer variable value: {intValue}");

vars.TryGetValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"My boolean variable value: {boolValue}");

floatValue += 10.5f;
vars.TrySetValue("MyFloatVarName", floatValue);

intValue = -55;
vars.TrySetValue("MyIntVarName", intValue);

boolValue = !boolValue;
vars.TrySetValue("MyBoolVarName", boolValue);
```

请注意，如果对已存在的变量调用 `AddVariable`，或对不存在的变量调用 `SetValue`，都会抛出异常。如果您不想每次都检查 `VariableExists`，可以使用 `UpsertValue` 辅助方法；如果变量不存在，它会自动创建新变量，如果变量已存在，则只更新其值：

```csharp
// 如果 'foo' 存在，则将其设为 42；
// 否则使用默认值 42 创建 'foo'。
vars.UpsertValue("foo", new(42));
```
