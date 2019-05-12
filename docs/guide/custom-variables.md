# Custom Variables

Custom variables feature allows to create user-specified variables, modify and use them to drive conditional execution of novel scripts or other systems. For example, custom variables can be used to select one of the multiple novel scripts to play (scenario routes), based on the decisions player has made in the past. Another frequently used scenario is player stats screen (eg, scores, money, resources etc), based on the choices the player makes throughout the game.

Custom variables can be created, modified and used both in novel scripts via [`@set`](/api/#set) and [`@if`](/api/#if) actions and in the C# scripts using `CustomVariableManager` [engine service](/guide/engine-services.md).

For example, the following novel action will assign a different value to `score` custom variable, based on the choice:

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

See the API reference on [`@set`](/api/#set) and [`@if`](/api/#if) actions for more examples.

All the custom variables are automatically saved with the game. By default, the variables are stored in **local scope**. This means, that if you assign some variable in the course of gameplay and player starts a new game or loads another saved game slot, where that variable wasn't assigned — the value will be lost. This is useful for the most type of variables. If, however, you wish to store the variable in **global scope**, prepend `G_` or `g_` to its name, eg: `G_FinishedMainRoute` or `g_total_score`. Global variables can be used to indicate some meta or total information, for example, the number of times player has finished some route or a total score based on all the playthroughs.

## Injecting Variables

It's possible to inject (inline) custom variable to novel script parameter values using the curly braces.

The following script will show an input field UI where user can enter an arbitrary text. Upon submit the entered text will be assigned to the specified custom variable.

```
; Allow user to enter an arbitrary text and assign it to `name` custom state variable
@input name summary:"Choose your name."
; Stop action is required to halt script execution until user submits the input
@stop

; You can then inject the assigned `name` variable in novel scripts
Archibald: Greetings, {name}!
{name}: Yo!

; ...or use it inside set and conditional expressions
@set score=score+1 if:name=="Felix"
```

You can inject the custom variables to any parameter values as long as the type allows. Eg, you can't assign a string (text) to an integer (number) parameter.

```
@set PlayerName="Felix"
@set PlayerYPosition=0.1
@set PlayerTint="lightblue"

; The following will produce an error, as `PlayerTint` is not a number.
@char {PlayerName} pos:0.5,{PlayerTint} 

; ...and this will execute just fine.
@char {PlayerName} pos:0.5,{PlayerYPosition} tint:{PlayerTint}
```

## Variable Triggers

When building a [custom UI](/guide/ui-customization.md) or other systems, you may want to listen (react) for events when a variable value is changed. For example, when building a character stats screen, you want make the text to change with the variables. While the conventional way to implement such behavior would be using a C# script, you can also make use of `Custom Variable Trigger` component. The component will invoke Unity events when a variable with specified name is changed. You can bind compatible actions with those events, such as updating the text values.

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png
)

Check out the [video tutorial](https://www.youtube.com/watch?v=jto4Ld-iP7M) on creating a custom calendar UI, which updates values when corresponding custom variables are changed in novel scripts. You can also find the project demonstrated in the video on GitHub: [github.com/Elringus/NaninovelCustomUIExample](https://github.com/Elringus/NaninovelCustomUIExample).