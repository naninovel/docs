# 自定义变量

自定义变量功能允许创建用户指定的变量，修改它们，并使用它们来驱动剧本脚本或其他系统的条件执行。例如，可以使用自定义变量根据玩家做出的决定选择要播放的多个剧本脚本之一（剧本路线）。另一个常见用途是根据整个游戏中做出的选择来跟踪玩家统计数据（例如，分数、金钱、资源）。

::: info NOTE
变量名称应以字母开头，并且只能包含拉丁字符、数字和下划线，例如 `name`、`Char1Score`、`my_score`。名称不区分大小写，例如 `myscore` 等于 `MyScore`。
:::

可以通过 [@set] 和 [@if] 命令在剧本脚本中创建、修改和使用自定义变量，也可以在 C# 中使用 `ICustomVariableManager` [引擎服务](/zh/guide/engine-services) 进行这些操作。

例如，以下脚本命令根据玩家的选择为 `score` 自定义变量分配不同的值：

```nani
@choice "我很谦虚，一个就够了..." set:score=1
@choice "请来两个。" set:score=2
@choice "我要拿走你所有的存货！" set:score=999
```

以下是根据 `score` 的值重新路由脚本执行：

```nani
@goto MainRoute if: score > 1 & score <= 900
@goto BadEnd if: score > 900
```

所有自定义变量都会随游戏自动保存。默认情况下，变量是游戏会话本地的：也就是说，如果你在游玩过程中为某个变量赋值，而玩家随后开始新游戏，或加载另一个没有为该变量赋值的存档栏位，那么该值将会丢失。这种行为对大多数类型的变量都很有用。如果你希望将某个变量与游戏会话 "解绑"，请在使用 [@set] 命令初始化它时使用 `meta!` 标志。元变量可用于表示元信息或累积信息，例如玩家完成某条路线的次数，或跨多个周目的总分。

你可以在 "Custom Variables" 配置菜单中，为预定义的自定义变量（包括元变量和普通变量）设置初始值。

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

元预定义变量会在应用程序首次启动时初始化，而普通变量会在每次状态重置时初始化。请注意，菜单中的值字段需要填写有效的脚本表达式，而不是原始值字符串。

::: tip
如果你需要一个只递增一次的元计数器（即使重复游玩，例如在回滚后或重启游戏后，也不会再次递增），请使用 `hasPlayed()` [表达式查询](/zh/guide/script-expressions#表达式函数)：

```nani
@set metaCounter=0
...
@set metaCounter++ if:!hasPlayed()
```

## 注入变量

您可以使用大括号将自定义变量注入（内联）到剧本脚本参数值中。

以下脚本显示了一个输入字段 UI，用户可以在其中输入任意文本。提交后，输入的文本将分配给指定的自定义变量。

```nani
; 允许用户输入任意文本并将其分配给 `name` 变量。
@input name summary:"选择您的名字。"

; 然后，您可以在剧本脚本中注入分配的 `name` 变量。
Archibald: 问候，{name}！

; ...或在 set 和条件表达式中使用它。
@set score+=3 if:name="Felix"
```

::: tip
要使角色名称动态化，请使用 [显示名称](/zh/guide/characters#显示名称) 功能。
:::

只要类型允许，您就可以将自定义变量注入到任何参数值中。例如，您不能将字符串（文本）分配给数字参数。

```nani
@set PlayerName="Felix", PlayerYPosition=0.1, PlayerTint="lightblue"

; 以下将产生错误，因为 `PlayerTint` 不是数字。
@char {PlayerName} pos:50,{PlayerTint}

; ...这将执行得很好。
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## 默认分配

默认分配仅在变量尚未具有值时才将值分配给自定义变量。当您希望确保变量具有初始值但不想在其已设置时覆盖它时，这很有用。

要执行默认分配，请在 [@set] 命令中使用 `?=` 运算符：

```nani
; 声明并为 'name' 变量分配初始值。
@set name?="Alex"
; 变量不会在此处重新分配，因为它已设置。
@set name?="John"
```

当你使用 `meta!` 或 `const!` 标志时，会自动隐含默认赋值，因此无需显式指定 `?=` 运算符：

```nani
; 声明并将 'false' 赋给这两个用于追踪路线完成情况的变量。
; 当同一个脚本再次被执行时（例如，在下一次开始游戏时），
; 这些变量不会被再次赋值。
@set clearedRouteX, clearedRouteY to:false meta!
```

## 变量事件

构建 [自定义 UI](/zh/guide/gui#ui-自定义) 或其他系统时，您可能希望在变量值更改时对事件做出反应。例如，在创建角色统计屏幕时，您可能希望文本随变量更新。虽然传统方法使用 C# 脚本，但您也可以使用 `Variable Events` 组件。当具有指定名称的变量更改时，此组件会调用 Unity 事件。

![](https://i.gyazo.com/a8ad226b7a50110584551ae81179c709.png)

::: tip EXAMPLE
在 [地图示例](/zh/guide/samples#地图) 中查找使用变量触发器来驱动地图位置可用性的示例。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 变量调试

在游戏运行时，您可以查看和更改所有现有变量以进行调试。

使用 `~` 键打开开发控制台，然后输入 `var` 命令以打开变量编辑器窗口。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

当更改列表中变量的值时，会出现一个 "SET" 按钮；按下它以应用更改。

当自定义变量在游戏运行时更改时，变量列表会自动更新。

## 在 C# 中使用自定义变量

可以通过 `ICustomVariableManager` [引擎服务](/zh/guide/engine-services) 在 C# 中访问自定义变量。

要获取和设置变量值，请分别使用 `GetVariableValue` 和 `SetVariableValue` 方法。例如，假设存在名为 `MyVarName` 的自定义字符串变量，下面的代码检索其值，向其追加 "Hello!"，并将修改后的值设置回去：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
var value = vars.GetVariableValue("MyVarName").String;
value += "Hello!";
vars.SetVariableValue("MyVarName", new(value));
```

请注意在检索变量的实际值时使用 `.String` 属性。变量可以是三种类型之一：`String`、`Numeric` 或 `Boolean`。类型是在剧本脚本中最初分配变量时确定的：

```nani
; 为 'foo' 变量分配 'Hello World!' 字符串值
@set foo="Hello World!"
; 在表达式中使用字符串值
@if foo="Hello World!"

; 为 'bar' 变量分配数值 42
@set bar=42
; 在表达式中使用数值
@if bar>12

; 为 'baz' 变量分配布尔值 true
@set baz=true
; 在表达式中使用布尔值
@if baz
```

—或在 C# 中：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

// 为 'foo' 变量分配 'Hello World!' 字符串值
vars.SetVariableValue("foo", new("Hello World!"));
// 访问分配的字符串值
if (vars.GetVariableValue("foo").String == "Hello World!")

// 为 'bar' 变量分配数值 42
vars.SetVariableValue("bar", new(42));
// 访问分配的数值
if (vars.GetVariableValue("bar").Number > 12)

// 为 'baz' 变量分配布尔值 true
vars.SetVariableValue("baz", new(true));
// 访问分配的布尔值
if (vars.GetVariableValue("baz").Boolean)
```

要在 C# 中检查变量的类型，请使用值上的 `.Type` 属性：

```csharp
var value = vars.GetVariableValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // 现在可以安全地访问 '.Number' 值
```

或者，使用 `Try...` 重载之一：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

vars.TryGetVariableValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"My float variable value: {floatValue}");

vars.TryGetVariableValue<int>("MyIntVarName", out var intValue);
Debug.Log($"My integer variable value: {intValue}");

vars.TryGetVariableValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"My boolean variable value: {boolValue}");

floatValue += 10.5f;
vars.TrySetVariableValue("MyFloatVarName", floatValue);

intValue = -55;
vars.TrySetVariableValue("MyIntVarName", intValue);

boolValue = !boolValue;
vars.TrySetVariableValue("MyBoolVarName", boolValue);
```
