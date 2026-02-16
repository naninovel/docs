# Custom Variables

The Custom Variables feature allows creating user-specified variables, modifying them, and using them to drive conditional execution of scenario scripts or other systems. For example, custom variables can be used to select one of multiple scenario scripts to play (scenario routes) based on decisions the player has made. Another common use is tracking player stats (e.g., scores, money, resources) based on choices made throughout the game.

::: info NOTE
Variable names should start with a letter and may contain only Latin characters, numbers, and underscores, e.g., `name`, `Char1Score`, `my_score`. Names are case-insensitive, e.g., `myscore` is equal to `MyScore`.
:::

Custom variables can be created, modified, and used both in scenario scripts via [@set] and [@if] commands and in C# using the `ICustomVariableManager` [engine service](/guide/engine-services).

For example, the following script command assigns different values to the `score` custom variable based on the player's choice:

```nani
@choice "I'm humble, one is enough..." set:score=1
@choice "Two, please." set:score=2
@choice "I'll take your entire stock!" set:score=999
```

And the following re-routes script execution based on the value of `score`:

```nani
@goto MainRoute if: score > 1 & score <= 900
@goto BadEnd if: score > 900
```

All custom variables are automatically saved with the game. By default, variables are stored in the local scope. This means that if you assign a variable during gameplay and the player starts a new game or loads another save slot where that variable wasn't assigned, the value will be lost. This behavior is useful for most variable types. If you wish to store a variable in the global scope, prepend `G_` or `g_` to its name, e.g., `G_FinishedMainRoute` or `g_total_score`. Global variables can indicate meta or cumulative information, such as the number of times the player has finished a route or a total score across playthroughs.

You can set predefined custom variables (both global and local) with initial values in the "Custom Variables" configuration menu.

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

Global predefined variables are initialized on the first application start, while local ones are initialized on each state reset. Note that the value field in the menu expects a valid script expression, not a raw value string.

::: tip
If you want a global counter that increments only once (even when re-played, e.g., with rollback or after restarting the game), use the `HasPlayed()` [expression function](/guide/script-expressions#expression-functions):
```nani
@set g_GlobalCounter++ if:!HasPlayed()
```
:::

## Injecting Variables

You can inject (inline) custom variables into scenario script parameter values using curly braces.

The following script shows an input field UI where a user can enter arbitrary text. Upon submit, the entered text is assigned to the specified custom variable.

```nani
; Allow user to enter an arbitrary text and assign it to `name` variable.
@input name summary:"Choose your name."

; You can then inject the assigned `name` variable in scenario scripts.
Archibald: Greetings, {name}!

; ...or use it inside set and conditional expressions.
@set score+=3 if:name="Felix"
```

::: tip
To make character names dynamic, use the [display name](/guide/characters#display-names) feature.
:::

You can inject custom variables into any parameter values as long as the type allows. For example, you can't assign a string (text) to a numeric parameter.

```nani
@set PlayerName="Felix", PlayerYPosition=0.1, PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:50,{PlayerTint}

; ...and this will execute just fine.
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## Default Assignment

Default assignment assigns a value to a custom variable only if the variable doesn't already have one. This is useful when you want to ensure a variable has an initial value but don't want to overwrite it if it's already set.

To perform a default assignment, use the `?=` operator with the [@set] command:

```nani
; Declare and assign an initial value to the 'name' variable.
@set name?="Alex"
; The variable won't be re-assigned here, because it's already set.
@set name?="John"
```

This is particularly useful for declaring global variables in entry or initialization scripts instead of using the editor configuration menu:

```nani
; Declare and assign 'false' to both variables tracking route completion.
; When the same script is played again (e.g., on a subsequent game start),
; the variables won't be re-assigned.
@set g_ClearedRouteX?=false
@set g_ClearedRouteY?=false
```

## Variable Events

When building a [custom UI](/guide/gui#ui-customization) or other systems, you may want to react to events when a variable's value changes. For example, when creating a character stats screen, you might want the text to update with the variables. While a conventional approach uses a C# script, you can also use the `Variable Events` component. This component invokes Unity events when a variable with a specified name changes.

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

To get and set variable values, use the `GetVariableValue` and `SetVariableValue` methods respectively. For example, given that a custom string variable named `MyVarName` exists, the code below retrieves its value, appends "Hello!" to it, and sets the modified value back:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
var value = vars.GetVariableValue("MyVarName").String;
value += "Hello!";
vars.SetVariableValue("MyVarName", new(value));
```

Note the use of the `.String` property when retrieving the actual value of the variable. A variable can be one of three types: `String`, `Numeric`, or `Boolean`. The type is determined when the variable is initially assigned in scenario scripts:

```nani
; Assign 'foo' variable with a 'Hello World!' string value
@set foo="Hello World!"
; Use the string value in expression
@if foo="Hello World!"

; Assign 'bar' variable with a numeric value of 42
@set bar=42
; Use the numeric value in expression
@if bar>12

; Assign 'baz' variable with a boolean value of true
@set baz=true
; Use the boolean value in expression
@if baz
```

—or in C#:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

// Assign 'foo' variable with a 'Hello World!' string value
vars.SetVariableValue("foo", new("Hello World!"));
// Access the assigned string value
if (vars.GetVariableValue("foo").String == "Hello World!")

// Assign 'bar' variable with a numeric value of 42
vars.SetVariableValue("bar", new(42));
// Access the assigned numeric value
if (vars.GetVariableValue("bar").Number > 12)

// Assign 'baz' variable with a boolean value of true
vars.SetVariableValue("baz", new(true));
// Access the assigned boolean value
if (vars.GetVariableValue("baz").Boolean)
```

To check the type of a variable in C#, use the `.Type` property on the value:

```csharp
var value = vars.GetVariableValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // it's now safe to access '.Number' value
```

Alternatively, use one of the `Try...` overloads:

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
