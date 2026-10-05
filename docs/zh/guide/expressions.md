# 表达式

编写剧本脚本时，您可以使用大括号 `{}` 将表达式结构注入到命令参数值和通用文本行中：

```nani
一加二等于 {1 + 2}。
```

— 运行脚本时将打印“一加二等于 3”。

您可以使用任何数学和逻辑运算符，以及 [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) 结构体中的一些数学函数：

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```

— 将 ID 为“Kohaku”的角色的缩放设置为 33.5 的余弦（取 3 次方）除以 0.5 的自然对数所得的余数。

表达式在命令执行时求值，因此可以在表达式内使用 [剧本变量](/zh/guide/variables)：

```nani
@input color summary:"你最喜欢的颜色是什么？"
{color}，是吗？ { color == "orange" ? "我也是！" : (color == "black" ? "那太令人沮丧了。" : "我明白了...") }
```

— 将显示一个输入 UI，允许玩家输入他们最喜欢的颜色，将其赋给 `color` 剧本变量，然后打印输入的颜色，如果它是“orange”，则后面跟着“我也是！”，如果是“black”，则后面跟着“那太令人沮丧了。”，否则后面跟着“我明白了...”。

要将纯文本值与变量名区分开，请将该值用双引号 `"` 括起来：

```nani
这只是纯文本：{ "score" }。
这是 "score" 变量的值：{ score }。
```

如果您希望在表达式中包含双引号，请转义它们：

```nani
说 { \"停车\" } 是个错误。
```

在 [@set] 和 [@if] 命令（以及其他命令中的 `set` 和 `if` 参数）中使用的脚本表达式不需要大括号：

```nani
@set randomScore = random(-100, 100)
@goto #EpicLabel if: abs(randomScore) >= 50
```

要在通用文本行内打印大括号并防止它们被识别为表达式分隔符，请使用反斜杠转义大括号，例如：

```nani
一些文本 \{ 大括号内的文本 \}
```

— 将在游戏中打印“一些文本 { 大括号内的文本 }”。

## 运算符别名

您可以在表达式中使用别名来代替编程运算符，例如：

```nani
@if a = "foo" | b != "bar" ? x : y
```

— 也可以写成：

```nani
@if a is "foo" or b is not "bar" then x else y
```

以下是可用别名的对应表：

| 运算符 | 别名           |
|--------|----------------|
| `=`    | `is`           |
| `!`    | `not`          |
| `!=`   | `is not`       |
| `&`    | `and`          |
| `\|`   | `or`           |
| `?`    | `then`         |
| `:`    | `else`         |
| `>`    | `is above`     |
| `<`    | `is below`     |
| `>=`   | `is at least`  |
| `<=`   | `is at most`   |

## 表达式查询

以下查询也可以在剧本表达式中使用。

<div class="config-table">

| 签名 | 描述 | 示例 |
| --- | --- | --- |
| random(min, max) | 返回 min（含）和 max（含）之间的随机整数。 | `random(0, 100)` |
| random(min, max) | 返回 min（含）和 max（含）之间的随机小数。 | `random(0.5, 1.5)` |
| random(args) | 返回从指定字符串中选出的一个字符串。 | `random("foo", "bar", "baz")` |
| calculateProgress() | 返回 0.0 到 1.0 范围内的剧本完成率，其中 1.0 表示所有脚本命令至少执行了一次。 | `calculateProgress()` |
| isUnlocked(id) | 检查具有指定 ID 的可解锁项当前是否已解锁。 | `isUnlocked("Tips/MyTip")` |
| hasPlayed() | 检查当前播放的命令以前是否播放过。 | `hasPlayed()` |
| hasPlayed(scriptPath) | 检查具有指定路径的脚本以前是否播放过。 | `hasPlayed("MyScript")` |
| getName(characterId) | 返回具有指定 ID 的角色 Actor 的作者名称。 | `getName("Kohaku")` |
| pow(num, pow) | 返回 num 的 pow 次幂。 | `pow(2, 3)` |
| sqrt(num) | 返回 num 的平方根。 | `sqrt(2)` |
| cos(num) | 返回 num（以弧度表示的角度）的余弦值。 | `cos(3.14)` |
| sin(num) | 返回 num（以弧度表示的角度）的正弦值。 | `sin(1.57)` |
| log(num) | 返回指定数值的自然对数（以 e 为底）。 | `log(0.5)` |
| abs(num) | 返回 num 的绝对值。 | `abs(0.5)` |
| max(nums) | 返回两个或多个值中的最大值。 | `max(1, 10, -9)` |
| min(nums) | 返回两个或多个值中的最小值。 | `min(1, 10, -9)` |
| round(num) | 返回四舍五入到最接近整数的 num。 | `round(0.9)` |
| approx(a, b) | 比较两个浮点值，如果它们相近则返回 true。 | `approx(0.15, 0.15)` |
| approx(a, b) | 比较两个字符串，忽略大小写。 | `approx("abc", "ABC")` |

</div>

## 添加自定义查询

可以通过将 `ExpressionQuery` 特性应用于公共静态 C# 方法来添加自定义表达式查询；该方法必须具有兼容的签名，之后将自动在剧本表达式中可用。

仅支持 [简单](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) 类型和字符串类型作为参数和返回类型。也可以使用单个可变参数（`params` 关键字）；不支持将可变参数与其他参数混合使用。

```csharp
public static class CustomQueries
{
    [ExpressionQuery("toLower")]
    [Doc("Returns the provided string with all characters converted to lower-case.")]
    public static string ToLower (string content) => content.ToLower();

    [ExpressionQuery("add")]
    [Doc("Returns the sum of the provided numbers.", examples: "add(1, 2)")]
    public static int Add (int a, int b) => a + b;

    [ExpressionQuery("mod")]
    [Doc("Returns the remainder resulting from dividing the provided numbers.")]
    public static double Modulus (double a, double b) => a % b;

    [ExpressionQuery("pick")]
    [Doc("Returns a string randomly chosen from one of the provided strings.")]
    public static string Pick (params string[] args)
    {
        if (args == null || args.Length == 0)
            return default;

        var randomIndex = UnityEngine.Random.Range(0, args.Length);
        return args[randomIndex];
    }
}
```

`ExpressionQuery` 特性接受一个可选的别名，而查询的文档则通过 `Doc` 特性指定：

- **Alias** 默认情况下，方法名称用作查询标识符（在脚本中引用查询的方式）；分配别名以更改标识符。
- **Summary** IDE 扩展和故事编辑器中显示的文档。
- **Remarks** IDE 扩展和故事编辑器中显示的附加信息（可选）。
- **Examples** IDE 扩展和故事编辑器中显示的使用示例（可选）。

::: tip EXAMPLE
在 [库存示例](/zh/guide/samples#库存) 中可以找到添加自定义表达式查询以检查库存中是否存在物品的另一个示例。具体来说，自定义查询通过 `Scripts/Runtime/Inventory/InventoryQueries.cs` 运行时脚本实现。
:::

## 参数上下文

与命令参数类似，查询参数可以应用上下文特性，以使其自动补全并由 [IDE 扩展](/zh/guide/ide-extension) 进行诊断。

例如，您可以将查询参数与枚举关联：

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomQueries
{
    [ExpressionQuery]
    public static bool IsComplete ([EnumContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(name, out var quest);
        // 运行自定义逻辑以检查 'quest' 是否完成
        return false;
    }
}
```

— IDE 将确保为 `name` 参数提供的值有效并提供补全。

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

您还可以使用其他上下文，例如 Actor、资源、端点等。例如，下面是内置的 `getName()` 查询，它接受 Actor ID 并返回其显示名称。应用 `ActorContext` 后，它将补全项目中可用的 Actor ID：

```cs
[ExpressionQuery("getName")]
public static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

另一个示例，它将补全可解锁项 ID：

```cs
[ExpressionQuery("isUnlocked")]
public static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

在 [IDE 指南](/zh/guide/ide-extension#ide-特性) 中查找更多示例和可用上下文。
