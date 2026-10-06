# Expressions

When writing scenario scripts, you can inject expression constructs into command parameter values and generic text lines using curly braces `{}`:

```nani
One plus two equals {1 + 2}.
```

— will print "One plus two equals 3." when running the script.

You can use any math and logical operators, as well as some math functions from the [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) struct:

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```

— will scale the character with ID "Kohaku" to the remainder of dividing the cosine of 33.5 (raised to the power of 3) by the natural logarithm of 0.5.

The expression is evaluated at the moment the command is executed, which allows using [scenario variables](/guide/variables) inside the expressions:

```nani
@input color summary:"What's your favorite color?"
{color}, huh? { color == "orange" ? "Mine too!" : (color == "black" ? "That's depressing." : "I see...") }
```

— will show an input UI allowing the player to enter their favorite color, assigning it to the `color` scenario variable, then print the entered color followed by either "Mine too!" if it's "orange", "That's depressing." if it's "black" or "I see..." otherwise.

To distinguish a plain text value from a variable name, wrap the value in double quotes `"`:

```nani
This is just plain text: { "score" }.
And this is the value of the "score" variable: { score }.
```

If you wish to include double quotes inside the expression, escape them:

```nani
Saying { \"Stop the car\" } was a mistake.
```

Scenario expressions used in [@set] and [@if] commands (as well as the `set` and `if` parameters in other commands) do not require curly braces:

```nani
@set randomScore = random(-100, 100)
@goto #EpicLabel if: abs(randomScore) >= 50
```

To print curly braces inside a generic text line and prevent them from being recognized as expression delimiters, escape the braces with backslashes, eg:

```nani
Some text \{ text inside braces \}
```

— will print "Some text { text inside braces }" in-game.

## Operator Aliases

Instead of programming operators, you can use aliases in the expressions, for example:

```nani
@if a = "foo" | b != "bar" ? x : y
```

— can be written like this:

```nani
@if a is "foo" or b is not "bar" then x else y
```

Below is the map of the available aliases:

| Operator | Alias         |
|----------|---------------|
| `=`      | `is`          |
| `!`      | `not`         |
| `!=`     | `is not`      |
| `&`      | `and`         |
| `\|`     | `or`          |
| `?`      | `then`        |
| `:`      | `else`        |
| `>`      | `is above`    |
| `<`      | `is below`    |
| `>=`     | `is at least` |
| `<=`     | `is at most`  |

## Expression Queries

The following queries can also be used inside scenario expressions.

<div class="config-table">

Signature | Description | Example
--- | --- | ---
random(min, max) | Returns a random integer number between min [inclusive] and max [inclusive]. | `random(0, 100)`
random(min, max) | Returns a random decimal number between min [inclusive] and max [inclusive]. | `random(0.5, 1.5)`
random(args) | Returns a string randomly chosen from the specified strings. | `random("foo", "bar", "baz")`
calculateProgress() | Returns the scenario completion ratio, in the 0.0 to 1.0 range, where 1.0 means all the script commands were executed at least once. | `calculateProgress()`
isUnlocked(id) | Checks whether an unlockable item with the specified ID is currently unlocked. | `isUnlocked("Tips/MyTip")`
hasPlayed() | Checks whether the currently played command has ever been played before. | `hasPlayed()`
hasPlayed(scriptPath) | Checks whether a script with the specified path has ever been played before. | `hasPlayed("MyScript")`
getName(characterId) | Returns the author name of a character actor with the specified ID. | `getName("Kohaku")`
pow(num, pow) | Returns num raised to the power of pow. | `pow(2, 3)`
sqrt(num) | Returns the square root of num. | `sqrt(2)`
cos(num) | Returns the cosine of num (an angle in radians). | `cos(3.14)`
sin(num) | Returns the sine of num (an angle in radians). | `sin(1.57)`
log(num) | Returns the natural (base e) logarithm of a specified number. | `log(0.5)`
abs(num) | Returns the absolute value of num. | `abs(0.5)`
max(nums) | Returns the largest of two or more values. | `max(1, 10, -9)`
min(nums) | Returns the smallest of two or more values. | `min(1, 10, -9)`
round(num) | Returns num rounded to the nearest integer. | `round(0.9)`
approx(a, b) | Compares two floating-point values and returns true if they are similar. | `approx(0.15, 0.15)`
approx(a, b) | Compares two strings ignoring case. | `approx("abc", "ABC")`

</div>

## Adding Custom Queries

It's possible to add custom expression queries by annotating a public static C# method with the `ExpressionQuery` attribute; the method must have a compatible signature and will then automatically become available in scenario expressions.

Only [simple](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) and string types are supported as argument and return types. It's also possible to use a single variadic (`params` keyword) argument; mixing a variadic with other arguments is not supported.

```cs
public static class CustomQueries
{
    [ExpressionQuery("toLower")]
    [Doc("Returns the provided string with all characters converted to lowercase.")]
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

The `ExpressionQuery` attribute accepts an optional alias, while the documentation of the query is specified with the `Doc` attribute:

- **Alias** By default, the method name is used as the query identifier (the way the query is referenced in scripts); assign an alias to change the identifier.
- **Summary** Documentation shown in the IDE extension and Story Editor.
- **Remarks** Additional information shown in the IDE extension and Story Editor (optional).
- **Examples** Usage examples shown in the IDE extension and Story Editor (optional).

::: tip EXAMPLE
Another example of adding custom expression queries to check whether an item exists in an inventory can be found in the [inventory sample](/guide/samples#inventory). Specifically, the custom queries are implemented via the `Scripts/Runtime/Inventory/InventoryQueries.cs` runtime script.
:::

## Parameter Context

Similar to command parameters, query parameters may have context attributes applied to make them auto-complete and be diagnosed by the [IDE extension](/guide/ide-extension).

For example, you can associate a query parameter with an enum:

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomQueries
{
    [ExpressionQuery]
    public static bool IsComplete ([EnumContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(name, out var quest);
        // run custom logic to check if "quest" is complete
        return false;
    }
}
```

— the IDE will make sure supplied values for the `name` parameter are valid and provide completion.

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

You can also use other contexts, such as actors, resources, endpoints and others. For example, below is the built-in `getName()` query, which takes an actor ID and returns its display name. With `ActorContext` applied, it'll complete over actor IDs available in the project:

```cs
[ExpressionQuery("getName")]
public static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

Another example, which will complete on unlockable IDs:

```cs
[ExpressionQuery("isUnlocked")]
public static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

Find more examples and available contexts in the [IDE guide](/guide/ide-extension#ide-attributes).
