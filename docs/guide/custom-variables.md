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
; Stop is required to halt script execution until user submits the input.
@stop

; You can then inject the assigned `name` variable in naninovel scripts.
Archibald: Greetings, {name}!
{name}: Yo!

; ...or use it inside set and conditional expressions.
@set score+=3 if:name=="Felix"
```

You can inject the custom variables to any parameter values as long as the type allows. Eg, you can't assign a string (text) to an integer (number) parameter.

```nani
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:50,{PlayerTint}

; ...and this will execute just fine.
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## Variable Triggers

When building a [custom UI](/guide/user-interface#ui-customization) or other systems, you may want to listen (react) for events when a variable value is changed. For example, when building a character stats screen, you want make the text to change with the variables. While the conventional way to implement such behavior would be using a C# script, you can also make use of `Custom Variable Trigger` component. The component will invoke Unity events when a variable with specified name is changed. You can bind compatible commands with those events, such as updating the text values.

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

::: tip EXAMPLE
Find example on using variable triggers to drive availability of map locations in the Map example project on GitHub: [github.com/Naninovel/Map](https://github.com/Naninovel/Map).

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## Variables Debug

While the game is running it's possible to view all the existing variables and change their values for debugging purposes.

Open [development console](/guide/development-console) and enter `var` command to open the variables editor window.

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

When changing value of a variable in the list, a "SET" button will appear, which you can press to apply the changes.

The variables list is automatically updated when the custom variables are changed while running the game.

## Using Custom Variables in C#

The custom variables can be accessed in C# via `ICustomVariableManager` [engine service](/guide/engine-services).

To get a variable value use `GetVariableValue(name)` method and `SetVariableValue(name, value)` to set variable value; eg, given a "MyVarName" custom string variable exists, the below code will retrieve it, append "Hello!" string to the value and set it back.

```csharp
var varManager = Engine.GetService<ICustomVariableManager>();
var myValue = varManager.GetVariableValue("MyVarName");
myValue += "Hello!";
varManager.SetVariableValue("MyVarName", myValue);
```

Be aware, that all the custom variable values are stored as strings. If you want to use them as other types (eg, integer, boolean, etc), you have to parse the returned string values to the desired type and cast them back to strings when setting the values. For most common data types extension methods are available, eg:

```csharp
var varManager = Engine.GetService<ICustomVariableManager>();

varManager.TryGetVariableValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"My float variable value: {floatValue}");

varManager.TryGetVariableValue<int>("MyIntVarName", out var intValue);
Debug.Log($"My integer variable value: {intValue}");

varManager.TryGetVariableValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"My boolean variable value: {boolValue}");

floatValue += 10.5f;
varManager.TrySetVariableValue("MyFloatVarName", floatValue);

intValue = -55;
varManager.TrySetVariableValue("MyIntVarName", intValue);

boolValue = !boolValue;
varManager.TrySetVariableValue("MyBoolVarName", boolValue);
```
