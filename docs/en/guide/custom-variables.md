# Custom Variables

The Custom Variables feature allows you to create user-specified variables, modify them, and use them to drive conditional execution in scenario scripts and other systems. For example, custom variables can be used to select one of multiple scenario scripts to play (scenario routes) based on decisions the player has made. Another common use is tracking player stats (e.g., scores, money, resources) based on choices made throughout the game.

::: info NOTE
Variable names should start with a letter and may contain only letters, numbers and underscores, for example: `score`, `Char1Score`, `my_score`. Names are case-insensitive, meaning you can create a variable named `myscore` and later refer to it as `MyScore` and vice versa.
:::

You can create and modify variables with the [@set] command (and some parameters of other commands) and use them in any parameter with an expression context, such as the nameless parameters of [@if] and [@while]. For example, the following script reroutes execution based on the value of `score`:

```nani
; Create a 'score' variable.
@set score=0

; At some point, modify the variable based on player choice.
@choice "Good Decision" set:score++
@choice "Bad Decision" set:score--
...

; Later, use the variable for conditional execution.
@if score is above 10
    @goto GoodEnd
@else
    @goto BadEnd
```
— find more examples of various ways to use the variables in the [@set] command reference.

::: tip
The `score is above 10` expression is using the `is above` alias instead of the `>` operator; if you prefer the operators, you can write the command as `@if score > 10`. Find more information about the supported syntax in the [script expressions guide](/guide/script-expressions#operator-aliases).
:::

## Injecting Variables

Even if a command parameter is not of an expression context, you can still inject variables into it using curly braces:

```nani
; Assign 3 custom variables.
@set posX=0, posY=0.5, time=1.5

; Inject them into the parameters of the 'char' command.
@char Kohaku pos:{posX},{posY} time:{time}
```

This is possible inside generic text lines as well:

```nani
; Prompt the player to enter text and assign it to the `name` variable.
@input name summary:"Choose your name."

; Inject the assigned `name` variable.
Archibald: Greetings, {name}!
```

::: tip
To make character names dynamic, use the [display name](/guide/characters#display-names) feature.
:::

You can inject custom variables into any parameter value as long as the parameter type allows it. For example, you can't assign a string (text) to a numeric parameter.

```nani
@set yPos=0.1, tint="lightblue"

; The following will produce an error, as `tint` is not a number.
@char Kohaku pos:50,{tint}

; ...and this will execute just fine.
@char Kohaku pos:50,{yPos} tint:{tint}
```

## Meta Variables

By default, variables are local to the current game session: when you assign a variable during gameplay and the player starts a new game or loads another save slot where that variable wasn't assigned, the value will be lost. This behavior is useful for most variable types. If you wish to "uncouple" a variable from game sessions, use the `meta!` flag when initializing it with the [@set] command:

```nani
@set myMetaVariable=0 meta!
```

Meta variables are useful for tracking information that is "meta" to individual game sessions, such as route completion, cumulative game stats, or achievements:

```nani
; Define the variables to track 'X' and 'Y' routes completion.
@set completeRouteX, completeRouteY to:false meta!
...

; Somewhere later in the scripts, when the 'X' route is complete.
@set completeRouteX=true

; Now you can show something special in the Title script.
@if completeRouteX and completeRouteY
    @showUI TrueRouteTitle
@else
    @showUI DefaultTitle
```

::: tip
If you want a meta counter that increments only once (even when re-played, e.g., with rollback or after restarting the game), use the `hasPlayed()` [expression query](/guide/script-expressions#expression-query):
```nani
@set metaCounter=0 meta!
...
@set metaCounter++ unless:hasPlayed()
```
:::

## Default Assignment

Default assignment assigns a value to a custom variable only if the variable doesn't already have one. This is useful when you want to ensure a variable has an initial value but don't want to overwrite it if it's already set.

To perform a default assignment, either use the `?=` operator or add the `once!` flag when using the [@set] command:

```nani
; Initialize 'foo' with the default value of 0.
@set foo?=0
; Initialize the three variables with default values.
@set foo=0, bar=false, baz="" once!
```

Using the `meta!` or `const!` flags automatically implies default assignment, so you don't have to specify the `?=` operator with them:

```nani
; Declare and assign 'false' to both variables tracking route completion.
; When the same script is played again (e.g., on a subsequent game start),
; the variables won't be re-assigned.
@set clearedRouteX, clearedRouteY to:false meta!
```

## Variable Events

When building a [custom UI](/guide/gui#ui-customization) or other systems, you may want to react when a variable's value changes. For example, when creating a character stats screen, you might want the text to update based on the variables. While the conventional approach is to use a C# script, you can also use the `Variable Events` component. This component invokes Unity events when a variable with a specified name changes.

![](https://i.gyazo.com/a8ad226b7a50110584551ae81179c709.png)

::: tip EXAMPLE
Find an example of using variable triggers to drive availability of map locations in the [map sample](/guide/samples#map).

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## Variables Debug

While the game is running, you can view and change all existing variables for debugging purposes.

Open the development console with the `~` key and enter the `var` command to open the variables editor window.

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

When changing the value of a variable in the list, a "SET" button appears; press it to apply the changes.

The variable list updates automatically when custom variables change while the game is running.

## Using Custom Variables in C#

Custom variables can be accessed in C# via the `ICustomVariableManager` [engine service](/guide/engine-services).

To create a new variable, use the `AddVariable` method:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
// Create a 'myVar' string variable with 'Hello World!' value.
vars.AddVariable(new("myVar", new("Hello World!")));
```

To create a meta or constant variable, specify the type:

```csharp
// Create a boolean meta variable to track route completion.
vars.AddVariable(new("clearedRouteX", new(false), CustomVariableKind.Meta));
```

To get and set variable values, use the `GetValue` and `SetValue` methods, respectively. For example, given that a custom string variable named `myVar` exists, the code below retrieves its value, appends "Hello!" to it, and sets the modified value back:

```csharp
var value = vars.GetValue("myVar").String;
value += "Hello!";
vars.SetValue("myVar", new(value));
```

Note the use of the `.String` property when retrieving the actual value of the variable. A variable can be one of three types: `String`, `Numeric`, or `Boolean`. The type is determined when the variable is initially assigned in scenario scripts:

```nani
; Assign 'foo' variable with a 'Hello World!' string value
@set foo="Hello World!"
; Use the string value in expression
@if foo is "Hello World!"

; Assign 'bar' variable with a numeric value of 42
@set bar=42
; Use the numeric value in expression
@if bar is above 12

; Assign 'baz' variable with a boolean value of true
@set baz=true
; Use the boolean value in expression
@if baz
```

—or in C#:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

// Assign 'foo' variable with a 'Hello World!' string value
vars.SetValue("foo", new("Hello World!"));
// Access the assigned string value
if (vars.GetValue("foo").String == "Hello World!")

// Assign 'bar' variable with a numeric value of 42
vars.SetValue("bar", new(42));
// Access the assigned numeric value
if (vars.GetValue("bar").Number > 12)

// Assign 'baz' variable with a boolean value of true
vars.SetValue("baz", new(true));
// Access the assigned boolean value
if (vars.GetValue("baz").Boolean)
```

To check the type of a variable in C#, use the `.Type` property on the value:

```csharp
var value = vars.GetValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // it's now safe to access the '.Number' value
```

Alternatively, use one of the `Try...` overloads:

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

Note that an exception will be thrown if you attempt to call `AddVariable` for a variable that already exists or call `SetValue` for a variable that doesn't exist. If you don't want to check `VariableExists` each time, use the `UpsertValue` helper method - it'll automatically create a new variable if it doesn't exist or just update the value if it does:

```csharp
// If 'foo' exists — set it to 42;
// otherwise create 'foo' with the default value of 42.
vars.UpsertValue("foo", new(42));
```
