# Script Expressions

When writing naninovel scripts, you can inject expression constructs to command parameter values and generic text lines using curly braces `{}`:

```nani
One plus two equals {1 + 2}.
```

— will print "One plus two equals 3" when running the script.

You can use any math and logical operators, as well as some math functions from the [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) namespace:

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```
— will scale character with ID "Kohaku" to the reminder from dividing cosine of 33.5 angle increased to power of 3 by natural logarithm of 0.5.

The expression is evaluated at the moment the command is executed, which allows using [custom variables](/guide/custom-variables) inside the expressions:

```nani
@input color summary:"What's your favorite color?"
@stop
{color}, huh? { color == "orange" ? "Mine too!" : (color == "black" ? "That's depressing." : "I see...") }
```

— will show an input UI allowing player to input their favorite color, assigning it to `color` custom variable, then print the inputted color, followed by either "Mine too!" in case it's "orange", "That's depressing." in case it's "black" or "I see..." in the other cases.

To distinguish a plain text value from a variable name, wrap the value in double quotes `"`:

```nani
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```
In case you wish to include the double quotes in the expression, escape them:

```nani
Saying { \"Stop the car\" } was a mistake.
```

Script expressions used in [@set] and [@if] commands (as well as `set` and `if` parameters in other commands), doesn't require curly braces:

```nani
@set randomScore=random(-100,100)
@goto EpicLabel if:abs(randomScore)>=50
```

Though, just like with all the other parameter values, in case you wish to use spaces inside the expressions, you should wrap them in double quotes:

```nani
@set "randomScore = random(-100, 100)"
@goto EpicLabel if:"abs(randomScore) >= 50"
```

To print curly braces inside a generic text line and prevent them from being recognized as an expression start and end literals, escape the braces with backslashes, eg:

```nani
Some text \{ text inside braces \}
```

— will print "Some text { text inside braces }" in-game.

## Expression Functions

The following functions can also be used inside the script expressions.

<div class="config-table">

Signature | Description | Example
--- | --- | ---
random(min, max) | Return a random integer number between min [inclusive] and max [inclusive]. | `random(0, 100)`
random(args) | Return a string chosen from one of the specified strings. | `random("foo", "bar", "baz")`
calculateProgress() | Returns scenario completion ratio, in 0.0 to 1.0 range, where 1.0 means all the script lines were executed at least once. | `calculateProgress()`
isUnlocked(id) | Checks whether an unlockable item with the specified ID is currently unlocked. | `isUnlocked("Tips/MyTip")`
hasPlayed() | Checks whether currently played command has ever been played before. | `hasPlayed()`
hasPlayed(scriptPath) | Checks whether script with the specified path has ever been played before. | `hasPlayed("MyScript")`
getName(characterId) | Returns author name of a character actor with the specified ID. | `getName("Kohaku")`
pow(num, pow) | Returns num raised to power. | `pow(2, 3)`
sqrt(num) | Returns square root of num. | `sqrt(2)`
cos(num) | Returns the cosine of angle. | `cos(180)`
sin(num) | Returns the sine of angle. | `sin(90)`
log(num) | Returns the natural (base e) logarithm of a specified number. | `log(0.5)`
abs(num) | Returns the absolute value of f. | `abs(0.5)`
max(nums) | Returns largest of two or more values. | `max(1, 10, -9)`
min(nums) | Returns the smallest of two or more values. | `min(1, 10, -9)`
round(num) | Returns num rounded to the nearest integer. | `round(0.9)`
approx(a, b) | Compares two floating point values and returns true if they are similar. | `approx(0.15, 0.15)`

</div>

## Adding Custom Functions

It's possible to add custom expression functions by assigning `ExpressionFunction` attribute to a public static C# method with compatible signatures, which will then automatically become available in script expressions.

Only [simple](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) and string types are supported as argument and return types. It's also possible to use a single variadic (`params` keyword) argument; mixing a variadic with other arguments is not supported.

```csharp
public static class CustomFunctions
{
	// Returns the provided string with all characters converted to lower-case.
	[ExpressionFunction("toLower")]
    public static string ToLower (string content) => content.ToLower();

    // Returns the sum of the provided numbers.
    [ExpressionFunction("add")]
    public static int Add (int a, int b) => a + b;

    // Returns the remainder resulting from dividing the provided numbers.
    [ExpressionFunction("mod")]
    public static double Modulus (double a, double b) => a % b;

    // Returns a string randomly chosen from one of the provided strings.
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

The `ExpressionFunction` attribute has following optional parameters:

- **Alias** By default, method name is used as function identifier (the way function is referenced in scripts); assign alias to change the identifier.
- **Summary** Documentation shown in IDE extension and visual editor.
- **Remarks** Additional information shown in IDE extension and visual editor.
- **Example** Usage examples shown in IDE extension and visual editor.

::: tip EXAMPLE
Another example of adding custom expression functions to check whether an item exists in an inventory can be found in the [inventory example project on GitHub](https://github.com/naninovel/samples/tree/main/unity/inventory).

Specifically, the custom functions are implemented via [InventoryFunctions.cs](https://github.com/naninovel/samples/blob/main/unity/inventory/Assets/NaninovelInventory/Runtime/InventoryFunctions.cs) runtime script.
:::

## Parameter Context

Similar to command parameters, function parameters may have context attributes applied to make them auto-complete and diagnosed by the [IDE extension](/guide/ide-extension).

For example, you can associate function parameter with an enum:

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomFunctions
{
	[ExpressionFunction]
    public static bool IsComplete ([ConstantContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(content, out var quest);
        // run custom logic to check if 'quest' is complete
    }
}
```

— IDE will make sure supplied values for `quest` parameter are valid and provide completion.

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

You can as well use other contexts, such as actors, resources, endpoints and others. For example, below is the built-in `getName()` function, which takes an actor ID and returns its display name. With `ActorContext` applied, it'll complete over actor IDs available in the project:

```cs
[ExpressionFunction]
static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

Another example, which will complete on unlockable IDs:

```cs
[ExpressionFunction]
static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

Find more examples and available contexts in the [IDE guide](/guide/ide-extension#ide-attributes).
