# Playmaker

[PlayMaker](https://assetstore.unity.com/packages/tools/visual-scripting/playmaker-368) is a popular visual scripting tool for Unity specifically designed to be friendly for non-programmers.

![](https://i.gyazo.com/0a5b219b059fd61c85d225e903d77857.png)

::: info NOTE
Extensions for third-party products serve mostly as examples on how you can integrate Naninovel with other tools. They contain bare minimum functionality and may become incompatible due to changes in third-party product. Please do not consider these extensions part of Naninovel: we are not providing any support or help on using them with Naninovel beyond the scope of sample projects.
:::

## Setup

Install PlayMaker following instructions from the [official manual](https://hutonggames.fogbugz.com/default.asp?W11).

Download and import [PlayMaker extension package](https://github.com/naninovel/samples/raw/main/unity/playmaker/NaninovelPlayMaker.unitypackage).

The custom Naninovel actions should appear in the PlayMaker actions browser under "Naninovel" category.

![](https://i.gyazo.com/a40b0b7b21c73d3b5f64b005085198ea.png)

## Usage

The following video demonstrates using PlayMaker FSM (finite state machine) to initialize Naninovel engine, preload and play a scenario script.

![](https://www.youtube.com/watch?v=N856vi18XVU)

### Events

Some of the essential Naninovel events can be automatically routed to PlayMaker FSMs. For this, create a global [user event](https://hutonggames.fogbugz.com/default.asp?W148) with an appropriate name and use it inside an FSM. Following are the available event names:

- `Naninovel/Engine/OnInitialized`
- `Naninovel/ScriptPlayer/OnPlay`
- `Naninovel/ScriptPlayer/OnStop`
- `Naninovel/StateManager/OnGameSaveStarted`
- `Naninovel/StateManager/OnGameSaveFinished`
- `Naninovel/StateManager/OnGameLoadStarted`
- `Naninovel/StateManager/OnGameLoadFinished`
- `Naninovel/TextPrinterManager/OnPrintTextStarted`
- `Naninovel/TextPrinterManager/OnPrintTextFinished`
- `Naninovel/LocalizationManager/OnLocaleChanged`

It's also possible to broadcast custom PlayMaker events from naninovel scripts using `@playmaker` command:

```nani
@playmaker EventName
```

— will invoke a global user event named "EventName" in all the active FSMs on scene.

The command also allows sending events to specific FSMs by using `fsm` and `object` parameters. The first parameter allows specifying FSM names, which should receive the event, eg:

```nani
@playmaker EventName fsm:Fsm1,Fsm2
```

— will invoke an event named "EventName" for FSMs with name "Fsm1" and "Fsm2".

When `object` parameter is specified, the event will only be sent to FSMs, that are applied to game objects, which has corresponding names, eg:

```nani
@playmaker EventName object:Obj1,Obj2
```

— will invoke an event named "EventName" for all the FSMs, that are attached to game objects with names "Obj1" and "Obj2".

You can as well combine `fsm` and `object` parameters to farther filter the FSMs, that should receive the event.

### Global Variables

It's possible to access a global PlayMaker variable in Naninovel scripts with the following custom [expression functions](/guide/script-expressions.html#expression-functions) available in the extension package:
 - `GetPlayMakerGlobalVariable("variableName")` — retrieves a variable of a simple type (int, float, string, etc) with the "variableName" name
 - `GetPlayMakerGlobalArray("variableName", arrayIndex)` — retrieves a value stored at "arrayIndex" index of an array variable with the "variableName" name

Given you have a "Score" integer and "FinishedRoutes" bool array global PlayMaker variables, you can use them in Naninovel scripts as follow:
```nani
Felix: My score is {GetPlayMakerGlobalVariable("Score")}.

@if GetPlayMakerGlobalArray("FinishedRoutes",2)
    Third route (second array index) is completed.
@else
    Not yet.
@endif
```

To assign a PlayMaker's global variable value from Naninovel script, use `@pset` command as following:

```nani
; Assign "10" to PlayMaker's integer global variable named "Score".
@pset name:Score value:10

; Assign "Banana" at 10th index of "Groceries" PlayMaker's global array.
@pset name:Groceries index:10 value:Banana
```

## IDE Extension

To add IDE support for playmaker-specific commands distributed with the extension package (eg, `@playmaker`), see the [guide on generating metadata for custom commands](/guide/custom-commands#ide-metadata).
