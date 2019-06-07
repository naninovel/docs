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
— will scale character with ID "Kohaku" to the reminder from dividing hyperbolic cosine of 33.5 angle increased to power of 3 by natural logarithm of 0.5. *(yes, I'm really bad at figuring out useful examples; please let me know if you have something better in mind)*

The expression is evaluated at the moment the command is executed, which allows using [custom variables](/guide/custom-variables.md) inside the expressions:

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

Script expressions used in [`@set`](/api/#set) and [`@if`](/api/#if) commands (as well as `set` and `if` parameters in other commands), doesn't require curly braces:

```
@set randomScore=Random(-100,100)
@goto EpicLabel if:Abs(randomScore)>=50
```

Though, just like with all the other parameter values, in case you wish to use spaces inside the expressions, you should wrap them in double quotes:

```
@set "randomScore = Random(-100, 100)"
@goto EpicLabel if:"Abs(randomScore) >= 50"
```

## Expression Functions

The following functions can also be used inside the script expressions.

<div class="config-table">

Signature | Description | Example
--- | --- | ---
Random (*System.Double* min, *System.Double* max) | Return a random float number between min [inclusive] and max [inclusive]. | `Random(0.1, 0.85)`
Random (*System.Int32* min, *System.Int32* max) | Return a random integer number between min [inclusive] and max [inclusive]. | `Random(0, 100)`
Random (*System.String[]* args) | Return a string chosen from one of the provided strings. | `Random("Foo", "Bar", "Foobar")`
CalculateProgress () | Return a float number in 0.0 to 1.0 range, representing how many unique commands were ever executed compared to the total number of commands in all the available naninovel scripts. 1.0 means the player had `read through` or `seen` all the available game content. | `CalculateProgress()`

</div>

You can also add your custom expression functions. For this, create a static C# class with a `ExpressionFunctions` attribute and declare methods inside this class. You'll then be able to invoke those methods as the expression functions in naninovel scripts. 

Here is an example of declaring a custom expression function:

```csharp
[Naninovel.ExpressionFunctions]
public static class CustomFunctions
{
    public static string ToLower (string value)
    {
        return value.ToLower();
    }
}
```

And here is an example of using this custom function in the scripts:

```
@set var=ToLower("LOWERED_CAPS")
```

Custom functions can take any number of simple type arguments (strings, integers, doubles, etc) and should also return a simple type. You can use [params](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/params) keyword to specify that function should expect a variable number of arguments; here is an example of built-in "Random" function, which takes an arbitrary number of strings and returns a random one:

```csharp
public static string Random (params string[] args) => args.Random();
```