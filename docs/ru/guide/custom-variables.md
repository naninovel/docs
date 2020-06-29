# Custom Variables

Custom variables feature allows to create user-specified variables, modify and use them to drive conditional execution of naninovel scripts or other systems. For example, custom variables can be used to select one of the multiple naninovel scripts to play (scenario routes), based on the decisions player has made in the past. Another frequently used scenario is player stats screen (eg, scores, money, resources etc), based on the choices the player makes throughout the game.

Custom variables can be created, modified and used both in naninovel scripts via [@set] and [@if] commands and in the C# scripts using `ICustomVariableManager` [engine service](/ru/guide/engine-services.md).

For example, the following script command will assign a different value to `score` custom variable, based on the choice:

```
@choice "I'm humble, one is enough..." set:score=1
@choice "Two, please." set:score=2
@choice "I'll take your entire stock!" set:score=999
```

And the following one will re-route the script execution based on the value of the `score` variable:

```
@goto MainRoute if:"score > 1 && score <= 900"
@goto BadEnd if:score>900
```

See the API reference on [@set] and [@if] commands for more examples.

All the custom variables are automatically saved with the game. By default, the variables are stored in **local scope**. This means, that if you assign some variable in the course of gameplay and player starts a new game or loads another saved game slot, where that variable wasn't assigned — the value will be lost. This is useful for the most type of variables. If, however, you wish to store the variable in **global scope**, prepend `G_` or `g_` to its name, eg: `G_FinishedMainRoute` or `g_total_score`. Global variables can be used to indicate some meta or total information, for example, the number of times player has finished some route or a total score based on all the playthroughs.

You can set pre-defined custom variables (both global and local) with initial values in the "Custom Variables" configuration menu.

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

Global pre-defined variables are initialized on first application start, while the locals do so on each state reset. Notice, that the value field in the menu expects a valid script expression and not a raw value string.

## Injecting Variables

It's possible to inject (inline) custom variable to naninovel script parameter values using the curly braces.

The following script will show an input field UI where user can enter an arbitrary text. Upon submit the entered text will be assigned to the specified custom variable.

```
; Allow user to enter an arbitrary text and assign it to `name` custom state variable
@input name summary:"Choose your name."
; Stop command is required to halt script execution until user submits the input
@stop

; You can then inject the assigned `name` variable in naninovel scripts
Archibald: Greetings, {name}!
{name}: Yo!

; ...or use it inside set and conditional expressions
@set score=score+1 if:name=="Felix"
```

You can inject the custom variables to any parameter values as long as the type allows. Eg, you can't assign a string (text) to an integer (number) parameter.

```
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:50,{PlayerTint} 

; ...and this will execute just fine.
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## Variable Triggers

When building a [custom UI](/ru/guide/user-interface.md#ui-customization) or other systems, you may want to listen (react) for events when a variable value is changed. For example, when building a character stats screen, you want make the text to change with the variables. While the conventional way to implement such behavior would be using a C# script, you can also make use of `Custom Variable Trigger` component. The component will invoke Unity events when a variable with specified name is changed. You can bind compatible commands with those events, such as updating the text values.

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

## Variables Debug

While the game is running it's possible to view all the existing variables and change their values for debugging purposes.

Open [development console](/ru/guide/development-console.md) and enter `var` command to open the variables editor window.

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

When changing value of a variable in the list, a "SET" button will appear, which you can press to apply the changes.

The variables list is automatically updated when the custom variables are changed while running the game.