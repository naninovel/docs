# Custom Variables

Custom variables feature allows creating user-specified variables, modify and use them to drive conditional execution of naninovel scripts or other systems. For example, custom variables can be used to select one of the multiple naninovel scripts to play (scenario routes), based on the decisions player has made in the past. Another frequently used scenario is player stats screen (eg, scores, money, resources etc), based on the choices the player makes throughout the game.

::: info NOTE
Variable name should start with a letter and can contain only latin characters, numbers and underscores, eg: `name`, `Char1Score`, `my_score`; the names are case-insensitive, eg: `myscore` is equal to `MyScore`.
:::

Custom variables can be created, modified and used both in naninovel scripts via [@set] and [@if] commands and in the C# scripts using `ICustomVariableManager` [engine service](/guide/engine-services).

For example, the following script command will assign a different value to `score` custom variable, based on the choice:

```nani
@choice "I'm humble, one is enough..." set:score=1
@choice "Two, please." set:score=2
@choice "I'll take your entire stock!" set:score=999
```

And the following one will re-route the script execution based on the value of the `score` variable:

```nani
@goto MainRoute if:"score > 1 && score <= 900"
@goto BadEnd if:score>900
```

See the API reference on [@set] and [@if] commands for more examples.

All the custom variables are automatically saved with the game. By default, the variables are stored in **local scope**. This means, that if you assign some variable in the course of gameplay and player starts a new game or loads another saved game slot, where that variable wasn't assigned — the value will be lost. This is useful for the most type of variables. If, however, you wish to store the variable in **global scope**, prepend `G_` or `g_` to its name, eg: `G_FinishedMainRoute` or `g_total_score`. Global variables can be used to indicate some meta or total information, for example, the number of times player has finished some route or a total score based on all the playthroughs.

You can set pre-defined custom variables (both global and local) with initial values in the "Custom Variables" configuration menu.

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

Global pre-defined variables are initialized on first application start, while the locals do so on each state reset. Notice, that the value field in the menu expects a valid script expression and not a raw value string.

::: tip
In case you want to make a kind of global counter, that will only increment once, even when re-played (eg, with rollback or after restarting the game), use `HasPlayed()` [expression function](/guide/script-expressions#expression-functions):
```nani
@set g_GlobalCounter++ if:!HasPlayed()
```
:::

## Injecting Variables

It's possible to inject (inline) custom variable to naninovel script parameter values using the curly braces.

The following script will show an input field UI where user can enter an arbitrary text. Upon submit the entered text will be assigned to the specified custom variable.

```nani
; Allow user to enter an arbitrary text and assign it to `name` variable.
@input name summary:"Choose your name."

; You can then inject the assigned `name` variable in naninovel scripts.
Archibald: Greetings, {name}!

; ...or use it inside set and conditional expressions.
@set score+=3 if:name="Felix"
```

::: tip
To make character names dynamic, use [display name](/guide/characters#display-names) feature.
:::

You can inject the custom variables to any parameter values as long as the type allows. Eg, you can't assign a string (text) to an integer (number) parameter.

```nani
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:50,{PlayerTint}

; ...and this will execute just fine.
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## Default Assignment

Default assignment allows assigning a value to a custom variable only if the variable doesn't already have one. This is useful when you want to ensure a variable has an initial value, but don't want to overwrite it if it's already set.

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

## Variable Triggers

When building a [custom UI](/guide/user-interface#ui-customization) or other systems, you may want to listen for (react to) events when a variable's value changes. For example, when creating a character stats screen, you might want the text to update with the variables. While the conventional way to implement such behavior is by using a C# script, you can also use the `Custom Variable Trigger` component. This component will invoke Unity events when a variable with a specified name changes.

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

::: tip EXAMPLE
Find example on using variable triggers to drive availability of map locations in the [map sample](/guide/samples#map).

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## Variables Debug

While the game is running, it's possible to view all the existing variables and change their values for debugging purposes.

Open [development console](/guide/development-console) and enter `var` command to open the variables editor window.

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

When changing the value of a variable in the list, a "SET" button will appear, which you can press to apply the changes.

The variable list is automatically updated when the custom variables are changed while running the game.

## Using Custom Variables in C#

Custom variables can be accessed in C# via the `ICustomVariableManager` [engine service](/guide/engine-services).

To get and set variable values, use the `GetVariableValue` and `SetVariableValue` methods respectively. For example, given that a custom string variable named "MyVarName" exists, the code below retrieves its value, appends the string "Hello!" to it and sets the modified value back:

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
var value = vars.GetVariableValue("MyVarName").String;
value += "Hello!";
vars.SetVariableValue("MyVarName", new(value));
```

Notice the use of `.String` property when retrieving the actual value of the variable. This is because a variable can be one of three types: `String`, `Numeric`, or `Boolean`. The type is determined when the variable is initially assigned in the scenario scripts:

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

To check the type of variable in C#, use `.Type` property on the value:

```csharp
var value = vars.GetVariableValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // it's now safe to access '.Number' value
```

Alternatively, use one of the "Try..." overloads:

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
