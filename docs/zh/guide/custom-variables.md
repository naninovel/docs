# 自定义变量

自定义变量功能允许你创建用户定义的变量，用来控制 Naninovel 脚本的条件执行或驱动其他系统。例如，可以根据玩家过去做出的选择来决定接下来播放哪个 Naninovel 脚本（剧情分支）；另一个常见的场景是制作玩家状态界面（如分数、金钱、资源等），这些数值会随着玩家在游戏中的选择动态变化。

::: info 注意
变量名必须以字母开头，只能包含拉丁字母、数字和下划线。示例：`name`、`Char1Score`、`my_score`。变量名 **不区分大小写**，例如 `myscore` 与 `MyScore` 被视为相同变量。
:::

自定义变量可以通过 Naninovel 脚本中的 [@set] 与 [@if] 指令创建、修改和使用，也可以在 C# 代码中通过 `ICustomVariableManager` [引擎服务](/zh/guide/engine-services) 操作。

例如，以下脚本指令会根据玩家的选择为 `score` 自定义变量赋予不同的值：

```nani
@choice "I'm humble, one is enough..." set:score=1
@choice "Two, please." set:score=2
@choice "I'll take your entire stock!" set:score=999
```

而下面这个示例则会根据 `score` 变量的值重新分支执行脚本：

```nani
@goto MainRoute if:"score > 1 && score <= 900"
@goto BadEnd if:score>900
```

请参阅 [@set] 与 [@if] 指令的 API 参考以查看更多示例。

所有自定义变量都会随游戏自动保存。默认情况下，变量存储在 **本地作用域**。这意味着当玩家在一次游玩过程中为变量赋值后，如果希望变量能在多次游戏中保持（即存储在 **全局作用域**），请在变量名前添加 `G_` 或 `g_` 前缀，例如：`G_FinishedMainRoute` 或 `g_total_score`。全局变量通常用于记录元信息或累计数据，例如玩家完成特定路线的次数或所有通关的总得分。

你可以在 “Custom Variables” 配置菜单中预定义全局或本地变量并指定其初始值。

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

全局预定义变量会在游戏首次启动时初始化，而本地变量会在每次重置游戏状态时重新初始化。请注意：配置菜单中的值字段应填写有效的脚本表达式（而不是纯文本字符串）。

::: tip
若想创建一个“只增加一次”的全局计数器（例如在回滚或重开游戏后不再重复递增），可以使用 `HasPlayed()` [表达式函数](/zh/guide/script-expressions#expression-functions)。
```nani
@set g_GlobalCounter++ if:!HasPlayed()
```
:::

## 注入变量

可以通过花括号 `{}` 在 Naninovel 脚本参数中内联（注入）自定义变量。

下面这个脚本示例会显示一个输入字段界面，让玩家输入任意文本；提交后，该文本会被赋值到指定的自定义变量中：

```nani
; 允许玩家输入任意文本并将其赋值给 `name` 变量。
@input name summary:"Choose your name."

; 然后你可以在 Naninovel 脚本中注入该 `name` 变量。
Archibald: Greetings, {name}!

; ……或在 set 与条件表达式中使用它。
@set score+=3 if:name="Felix"
```

::: tip
若要让角色名称动态变化，请使用 [显示名称](/zh/guide/characters#显示名称) 功能。
:::

你可以在任何参数值中注入自定义变量，只要该类型兼容即可。例如，无法将字符串（文本）赋值给整数（数字）参数。

```nani
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:50,{PlayerTint}

; ...and this will execute just fine.
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## 默认赋值

默认赋值允许仅在变量尚未被赋值的情况下为其指定一个值。这在你希望确保变量拥有初始值、但又不想覆盖已存在值时非常有用。

若要执行默认赋值，请在 [@set] 指令中使用 `?=` 运算符：

```nani
; 声明并为 `name` 变量赋初始值。
@set name?="Alex"
; 此处不会重新赋值，因为变量已经存在。
@set name?="John"
```

这在入口或初始化脚本中声明全局变量时尤其方便，无需通过编辑器配置菜单：

```nani
; 声明并将两个用于追踪路线完成状态的变量设为 false。
; 当同一脚本再次执行（例如游戏再次启动时），
; 这些变量不会被重新赋值。
@set g_ClearedRouteX?=false
@set g_ClearedRouteY?=false
```

## 变量事件

在构建 [自定义 UI](/zh/guide/user-interface#ui-customization) 或其他系统时，你可能希望在变量值发生变化时监听并响应事件。例如，在创建角色状态界面时，希望文本能自动更新以反映变量的最新值。通常这类行为需要通过 C# 脚本实现，但也可以使用 `Variable Events` 组件。该组件会在指定变量的值发生变化时触发 Unity 事件。

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

::: tip 示例
参见 [地图示例](/zh/guide/samples#地图)，其中展示了如何使用变量触发器来控制地图位置的可访问性。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 变量调试（Variables Debug）

在游戏运行时，可以查看并修改所有现有变量的值，以便调试。

打开 [开发控制台](/zh/guide/development-console)，输入 `var` 指令即可打开变量编辑窗口。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

当修改变量值时，会出现一个 “SET” 按钮；点击它即可应用修改。  

当游戏运行过程中变量被改变时，变量列表会自动更新。

## 在 C# 中使用自定义变量

可以通过 `ICustomVariableManager` [引擎服务](/zh/guide/engine-services) 在 C# 中访问自定义变量。

要获取或设置变量值，请分别使用 `GetVariableValue` 与 `SetVariableValue` 方法。例如，假设存在一个名为 “MyVarName” 的字符串变量，以下代码将读取其值，拼接 “Hello!” 并将结果重新写回：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
var value = vars.GetVariableValue("MyVarName").String;
value += "Hello!";
vars.SetVariableValue("MyVarName", new(value));
```

请注意使用 `.String` 属性来获取变量的实际值。这是因为变量类型可能是三种之一：`String`、`Numeric` 或 `Boolean`。类型在变量首次被赋值时确定：

```nani
; 为变量 `foo` 赋字符串值 “Hello World!”
@set foo="Hello World!"
; 在表达式中使用该字符串值
@if foo="Hello World!"

; 为变量 `bar` 赋数值 42
@set bar=42
; 在表达式中使用该数值
@if bar>12

; 为变量 `baz` 赋布尔值 true
@set baz=true
; 在表达式中使用该布尔值
@if baz
```

—or in C#:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

// 为变量 `foo` 赋字符串 “Hello World!”
vars.SetVariableValue("foo", new("Hello World!"));
// 访问该字符串值
if (vars.GetVariableValue("foo").String == "Hello World!")

// 为变量 `bar` 赋数值 42
vars.SetVariableValue("bar", new(42));
// 访问该数值
if (vars.GetVariableValue("bar").Number > 12)

// 为变量 `baz` 赋布尔值 true
vars.SetVariableValue("baz", new(true));
// 访问该布尔值
if (vars.GetVariableValue("baz").Boolean)
```

若要在 C# 中检查变量类型，请使用 `.Type` 属性：

```csharp
var value = vars.GetVariableValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // 现在可以安全地访问 `.Number` 值
```

或者使用相应的 “Try...” 重载方法：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

vars.TryGetVariableValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"我的浮点数变量值: {floatValue}");

vars.TryGetVariableValue<int>("MyIntVarName", out var intValue);
Debug.Log($"我的整数变量值: {intValue}");

vars.TryGetVariableValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"我的布尔变量值: {boolValue}");

floatValue += 10.5f;
vars.TrySetVariableValue("MyFloatVarName", floatValue);

intValue = -55;
vars.TrySetVariableValue("MyIntVarName", intValue);

boolValue = !boolValue;
vars.TrySetVariableValue("MyBoolVarName", boolValue);
```
