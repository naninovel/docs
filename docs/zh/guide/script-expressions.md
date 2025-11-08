# 脚本表达式

在编写 naninovel 脚本时，你可以使用花括号 `{}` 将表达式插入到命令参数值或通用文本行中：

```nani
One plus two equals {1 + 2}.
```

— 运行脚本时将打印 “One plus two equals 3”。

你可以使用任意数学与逻辑运算符，以及来自 [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) 命名空间的一些数学函数：

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```
— 将把 ID 为 “Kohaku” 的角色缩放至角度 33.5 的余弦值的三次方再除以 0.5 的自然对数所得的余数。

表达式会在命令执行的那一刻被求值，因此可以在表达式中使用[自定义变量](/zh/guide/custom-variables)：

```nani
@input color summary:"What's your favorite color?"
{color}, huh? { color == "orange" ? "Mine too!" : (color == "black" ? "That's depressing." : "I see...") }
```

— 会显示一个输入界面，让玩家输入自己喜欢的颜色，并将其赋值给 `color` 自定义变量，然后打印输入的颜色；如果颜色是 “orange”，则输出 “Mine too!”；若是 “black”，则输出 “That's depressing.”；其他情况则输出 “I see...”。

若要区分纯文本值与变量名，请将文本值用双引号 `"` 包裹起来：

```nani
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```
若希望在表达式中包含双引号，请对其进行转义：

```nani
Saying { \"Stop the car\" } was a mistake.
```

在 [@set] 和 [@if] 命令中使用的脚本表达式（以及其他命令中的 `set` 和 `if` 参数）不需要使用花括号：

```nani
@set randomScore=random(-100,100)
@goto #EpicLabel if:abs(randomScore)>=50
```

不过，与所有其他参数值一样，如果表达式中包含空格，请将整个表达式用双引号包裹起来：

```nani
@set "randomScore = random(-100, 100)"
@goto #EpicLabel if:"abs(randomScore) >= 50"
```

若要在通用文本行中打印花括号而不被识别为表达式的起止符，请使用反斜杠进行转义，例如：

```nani
Some text \{ text inside braces \}
```

— 将在游戏中打印 “Some text { text inside braces }”。

## 表达式函数

以下函数也可在脚本表达式中使用。

<div class="config-table">
函数签名 | 描述 | 示例  
--- | --- | ---  
random(min, max) | 返回介于最小值（含）与最大值（含）之间的随机整数。 | `random(0, 100)`  
random(min, max) | 返回介于最小值（含）与最大值（含）之间的随机浮点数。 | `random(0.5, 1.5)`  
random(args) | 从指定字符串中随机返回一个。 | `random("foo", "bar", "baz")`  
calculateProgress() | 返回剧情完成进度比例，范围为 0.0 到 1.0，1.0 表示所有脚本行至少被执行过一次。 | `calculateProgress()`  
isUnlocked(id) | 检查指定 ID 的可解锁项目当前是否已解锁。 | `isUnlocked("Tips/MyTip")`  
hasPlayed() | 检查当前执行的命令是否曾被执行过。 | `hasPlayed()`  
hasPlayed(scriptPath) | 检查指定路径的脚本是否曾被执行过。 | `hasPlayed("MyScript")`  
getName(characterId) | 返回指定 ID 角色的显示名称。 | `getName("Kohaku")`  
pow(num, pow) | 返回 num 的 pow 次方。 | `pow(2, 3)`  
sqrt(num) | 返回 num 的平方根。 | `sqrt(2)`  
cos(num) | 返回角度的余弦值。 | `cos(180)`  
sin(num) | 返回角度的正弦值。 | `sin(90)`  
log(num) | 返回指定数字的自然对数（以 e 为底）。 | `log(0.5)`  
abs(num) | 返回 f 的绝对值。 | `abs(0.5)`  
max(nums) | 返回两个或多个值中的最大值。 | `max(1, 10, -9)`  
min(nums) | 返回两个或多个值中的最小值。 | `min(1, 10, -9)`  
round(num) | 返回四舍五入后的整数值。 | `round(0.9)`  
approx(a, b) | 比较两个浮点数，若相近则返回 true。 | `approx(0.15, 0.15)`  

</div>

## 添加自定义函数

可以通过为具有兼容签名的公共静态 C# 方法添加 `ExpressionFunction` 特性，来自定义表达式函数。这样的方法将会自动在脚本表达式中可用。

仅支持 [简单类型](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) 与字符串类型作为参数和返回类型。此外，还可以使用单个可变参数（`params` 关键字）；但不可将可变参数与其他参数混合使用。

```csharp
public static class CustomFunctions
{
    // 返回将提供的字符串全部转换为小写后的结果。
	[ExpressionFunction("toLower")]
    public static string ToLower (string content) => content.ToLower();

    // 返回提供数字的总和。
    [ExpressionFunction("add")]
    public static int Add (int a, int b) => a + b;

    // 返回两个数字相除所得的余数。
    [ExpressionFunction("mod")]
    public static double Modulus (double a, double b) => a % b;

    // 从提供的字符串中随机返回一个字符串。
    [ExpressionFunction("random")]
    public static string Random (params string[] args)
	{
		if (args == null || args.Length == 0)
			return default;

        var randomIndex = UnityEngine.Random.Range(0, args.Length);
		return args[randomIndex];
	}
}
```

`ExpressionFunction` 特性包含以下可选参数：

- **Alias（别名）** 默认情况下，方法名会被用作函数标识符（即在脚本中引用函数的方式）；可通过此参数修改标识符。
- **Summary（概要）** 在 IDE 扩展与可视化编辑器中显示的函数说明。
- **Remarks（备注）** 在 IDE 扩展与可视化编辑器中显示的附加信息。
- **Example（示例）** 在 IDE 扩展与可视化编辑器中显示的使用示例。

::: tip 示例
另一个关于添加自定义表达式函数（用于检测物品是否存在于物品栏中）的例子，可在 [inventory 示例](/zh/guide/samples#inventory) 中找到。具体实现位于运行时代码 `Scripts/Runtime/Inventory/InventoryFunctions.cs` 中。
:::

## 参数上下文

与命令参数类似，函数参数也可以应用上下文属性，以便在 [IDE 扩展](/zh/guide/ide-extension) 中获得自动补全和诊断支持。

例如，可以将函数参数与枚举类型关联：

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomFunctions
{
	[ExpressionFunction]
    public static bool IsComplete ([ConstantContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(content, out var quest);
        // 运行自定义逻辑以检查 'quest' 是否已完成
    }
}
```

— IDE 会确保为 `quest` 参数提供的值是有效的，并提供自动补全功能。

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

你同样可以使用其他上下文类型，例如角色（actors）、资源（resources）、端点（endpoints）等。例如，下面展示的是内置函数 `getName()`，它接收一个角色 ID 并返回该角色的显示名称。应用 `ActorContext` 后，IDE 将会根据项目中可用的角色 ID 自动提供补全建议。

```cs
[ExpressionFunction]
static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

另一个示例是可以在可解锁项ID 上提供自动补全的函数:

```cs
[ExpressionFunction]
static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

更多示例和可用的上下文类型，请参阅 [IDE 指南](/zh/guide/ide-extension#IDE-属性)。
