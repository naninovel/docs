# Script Expressions

When writing naninovel scripts, you can inject expression constructs to command parameter values and generic text lines using curly braces `{}`:

```
One plus two equals {1 + 2}.
```

— will print "One plus two equals 3" when running the script.

You can use any math and logical operators, as well as all the math functions from the [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) and [System.Math](https://docs.microsoft.com/en-us/dotnet/api/system.math#methods) namespaces:

```
@char Kohaku scale:{Pow(Cosh(33.5), 3) % Log(0.5)}
```
— will scale character with ID "Kohaku" to the reminder from dividing hyperbolic cosine of 33.5 angle increased to power of 3 by natural logarithm of 0.5.

The expression is evaluated at the moment the command is executed, which allows using [custom variables](/ru/guide/custom-variables.md) inside the expressions:

```
@input color summary:"What's your favorite color?"
@stop
{color}, huh? { color == "orange" ? "Mine too!" : "I see..."}
```

— will show an input UI allowing player to input their favorite color, assigning it to `color` custom variable, then print the inputted color, followed by either "Mine too!" in case it's "orange", or "I see...".

To distinguish a plain text value from a variable name, wrap the value in double quotes `"`:

```
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```
In case you wish to include the double quotes in the expression, escape them **twice**:

```
Saying { \\"Stop the car\\" } was a mistake.
```

Script expressions used in [@set] and [@if] commands (as well as `set` and `if` parameters in other commands), doesn't require curly braces:

```
@set randomScore=Random(-100,100)
@goto EpicLabel if:Abs(randomScore)>=50
```

Though, just like with all the other parameter values, in case you wish to use spaces inside the expressions, you should wrap them in double quotes:

```
@set "randomScore = Random(-100, 100)"
@goto EpicLabel if:"Abs(randomScore) >= 50"
```

To print curly braces inside a generic text line and prevent them from being recognized as an expression start and end literals, escape the braces with backslashes, eg:

```
Some text \{ text inside braces \}
```

— will print "Some text { text inside braces }" in-game.

## Expression Functions

The following functions can also be used inside the script expressions.

<div class="config-table">

Signature | Description | Example
--- | --- | ---
Random (*System.Double* min, *System.Double* max) | Return a random float number between min [inclusive] and max [inclusive]. | `Random(0.1, 0.85)`
Random (*System.Int32* min, *System.Int32* max) | Return a random integer number between min [inclusive] and max [inclusive]. | `Random(0, 100)`
Random (*System.String[]* args) | Return a string chosen from one of the provided strings. | `Random("Foo", "Bar", "Foobar")`
CalculateProgress () | Return a float number in 0.0 to 1.0 range, representing how many unique commands were ever executed compared to the total number of commands in all the available naninovel scripts. 1.0 means the player had `read through` or `seen` all the available game content. Make sure to enable `Count Total Commands` in the script configuration menu before using this function. | `CalculateProgress()`

</div>

## Adding Custom Functions

It's possible to add custom expression functions by assigning `ExpressionFunctions` attribute to a static C# class. All the public methods of this class with compatible signatures will then automatically become available in the script expressions. 

Compatible signatures are the ones that take and return [simple](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/value-types#simple-types) and string types, as well as arrays of those types (with `params` keyword).

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
Another example of adding custom expression functions to check whether an item exists in an inventory can be found in the [inventory example project on GitHub](https://github.com/Elringus/NaninovelInventory).

Specifically, the custom functions are implemented via [InventoryFunctions.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryFunctions.cs) runtime script.
:::



