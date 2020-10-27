# 脚本表达式

编写naninovel脚本时，可以使用花括号将表达式构造注入命令参数值和通用文本行{}：

```nani
One plus two equals {1 + 2}.
```

— 执行时会打印 "One plus two equals 3" 。

你可以使用任何数学和逻辑运算符，以及[UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) 和[System.Math](https://docs.microsoft.com/en-us/dotnet/api/system.math#methods) 命名空间中的所有数学函数：


```nani
@char Kohaku scale:{Pow(Cosh(33.5), 3) % Log(0.5)}
```

— 将ID为 “Kohaku” 的角色缩放值为后面数学运算的结果值。

在执行命令时对表达式进行求值，允许在表达式内部使用 [自定义变量](/zh/guide/custom-variables.md) ：

```nani
@input color summary:"What's your favorite color?"
@stop
{color}, huh? { color == "orange" ? "Mine too!" : "I see..."}
```

— 显示输入框，允许玩家输入喜欢的颜色，将其绑定至 `color` 自定义变量，如果输入值等于 "orange" ，输出 "Mine too!" 否则输出 "I see..." 。

要将纯文本值与变量名区分开，请将值用双引号引起来 `"` ：

```nani
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```
如果您希望在表达式中包含双引号，请对其进行两次转义：
```nani
Saying { \\"Stop the car\\" } was a mistake.
```

 [@set] 和 [@if] 命令中使用的脚本表达式（以及其他命令中的set和if参数）不需要大括号：

```nani
@set randomScore=Random(-100,100)
@goto EpicLabel if:Abs(randomScore)>=50
```

但是，与所有其他参数值一样，如果希望在表达式内部使用空格，则应将其用双引号引起来：

```nani
@set "randomScore = Random(-100, 100)"
@goto EpicLabel if:"Abs(randomScore) >= 50"
```

要在通用文本行内打印花括号并防止将其识别为表达式的开始和结束文字，请使用反斜杠对花括号进行转义，例如：

```nani
Some text \{ text inside braces \}
```

— 将在游戏中打印出 "Some text { text inside braces }" 。

## 表达式函数

以下函数也可以在脚本表达式中使用。

<div class="config-table">

函数名 | 描述 | 示例
--- | --- | ---
Random (*System.Double* min, *System.Double* max) | 返回介于最小值[包含]和最大值[包含]之间的随机浮点数。 | `Random(0.1, 0.85)`
Random (*System.Int32* min, *System.Int32* max) | 返回介于min [包含]和max [包含]之间的随机整数。 | `Random(0, 100)`
Random (*System.String[]* args) | 返回从提供的字符串之一中选择的字符串。 | `Random("Foo", "Bar", "Foobar")`
CalculateProgress () | 返回一个介于0.0到1.0范围内的浮点数，表示已经执行命令和Naninovel中总的可执行命令数量的占比关系。 1.0 代表玩家全部 `read through` （浏览）或 `seen` （看）过了所有游戏内容。使用此功能之前，请确保在脚本配置菜单中启用 `Count Total Commands` 。 | `CalculateProgress()`

</div>

## 添加自定义函数

通过将 `ExpressionFunctions` 属性分配给静态C＃类，可以添加自定义表达式函数。此类具有兼容签名的所有公共方法将自动在脚本表达式中可用。

兼容的签名是采用和返回[简单](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/value-types#simple-types) 和字符串类型的签名，以及这些类型的数组（带有 `params` 关键字）。

```csharp
[Naninovel.ExpressionFunctions]
public static class CustomFunctions
{
	// Returns the provided string with all characters converted to lower-case.
    public static string ToLower (string content) => content.ToLower();

    // Returns the sum of the provided numbers.
    public static int Add (int a, int b) => a + b;

    // Returns a string randomly chosen from one of the provided strings.
    public static string Random (params string[] args) 
	{
		if (args == null || args.Length == 0) 
			return default;
        
        var randomIndex = UnityEngine.Random.Range(0, args.Length);
		return args[randomIndex];
	} 
}
```

::: example
[背包示例](https://github.com/Naninovel/Inventory) 为演示添加自定义表达式，来判断某个道具是否在背包里。

另外，命令实现存储在[InventoryFunctions.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryFunctions.cs) 目录中。
:::