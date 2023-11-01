# Choices

The feature allows to present a number of choices to the user and re-route script execution depending on the choice the user makes.

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

Use [@choice] commands followed by the choice summary and (optional) `goto` path to add choices from the naninovel scripts:

```nani
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[skipInput]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:.Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript.LabelName
@stop
```

Value of the `goto` parameter is the path to re-route into when users selects the corresponding choice. It's specified in the following format: *ScriptName*.*LabelName*. When label name is omitted, provided script will be played from the start; when script name is omitted, a label in the currently played script will be referenced:

```nani
; Loads and starts playing a naninovel script with the name `Script001` from the start
goto:Script001

; Save as above, but start playing from the label `AfterStorm`
goto:Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script
goto:.Epilogue
```

When `goto` parameter is not specified, current script will continue executing from the next line.

Choice handler actors are used to process the [@choice] commands. You can add, edit and remove choice handlers using the choice manager accessible via `Naninovel -> Resources -> Choice Handlers` context menu.

Choice handlers behavior can be configured using `Naninovel -> Configuration -> Choice Handlers` context menu; for available options see [configuration guide](/guide/configuration.md#choice-handlers).

## Choice Button

The [@choice] command accepts an optional `button` parameter specifying a path (relative to a "Resources" folder) to custom prefab representing the choice option object. 

```nani
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
```
— here we use a choice handler supporting positioning to represent a point of interest on an improvised map, where the `button` parameter is pointing to a prefab consisting of a button wrapped over an image. The prefab is stored at `Assets/Resources/MapButtons/Home.prefab`.

To create a choice button prefab from template, use `Create -> Naninovel -> Choice Button` asset context menu.

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

If you don't want to store the choice button prefabs in `Resources` folder or need to localize them, set a custom loader in choice handler configuration menu and use any of the available [resource providers](/guide/resource-providers).

![](https://i.gyazo.com/9b50d543b5a6843b13b415c3c2ae9641.png)

When `button` parameter of the [@choice] command is not specified, default button prefab is used.

To change choice button used by default, create a [custom choice handler](/guide/choices.md#adding-custom-choice-handlers) and assign the prefab to `Default Button Prefab` property of `Choice Handler Panel` component or use a custom component.

![](https://i.gyazo.com/0972b2725ed043d050804d3833a83b73.png)

To use a different text component for the choice text, use `On Summary Text Changed` [Unity event](https://docs.unity3d.com/Manual/UnityEvents) of the choice button component.

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## ButtonList Choice Handler
Button list handler is used by default. It stores the choice buttons inside a horizontal layout panel and ignores the `pos` parameter of the [@choice] command.

## ButtonArea Choice Handler
In contrast to button list, button area doesn't enforce any specific layout and allows manually setting positions of the added choice buttons via `pos` parameter. For example, here is one way to make an interactive map with choice commands and button area handler:

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:.ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto .Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto .Map
```

:::example
Find a more advanced implementation of interactive map with Naninovel in the Map example project on GitHub: [github.com/Naninovel/Map](https://github.com/Naninovel/Map).

[!4987b1c53cd275f3fa56b533f53f3d8c]
:::

## ChatReply Choice Handler

Used by [chat text printer](/guide/text-printers.md#chat-printer) to represent reply choices. Example:

```nani
@printer Chat
Kohaku: Where're you right now?
@choice "Play dumb" handler:ChatReply do:"Yuko: ¯\_(ツ)_/¯"
@choice "Answer" handler:ChatReply do:"Yuko: school. preping for the festival"
@stop
```

[!338f8519b3a1656059a407fe0232b376]

## Adding Custom Choice Handlers

You can add custom choice handlers based on the built-in templates or create new handlers from scratch. For example, let's customize the built-in `ButtonArea` template. 

Use `Create -> Naninovel -> Choice Handler -> ButtonArea` asset context menu to create a button area handler prefab somewhere outside of the Naninovel package, e.g. at the `Assets/ChoiceHandlers` folder. 

Edit the handler: change font, textures, add animations, etc. For more information on the available UI building tools, check the [Unity documentation](https://docs.unity3d.com/Packages/com.unity.ugui@latest).

Expose the handler to engine resources using choice handler manager GUI, which can be accessed with `Naninovel -> Resources -> Choice Handlers` editor context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double click the record to open actor settings. Drag-drop handler prefab to the `Resource` field.

[!cb3a0ff7f22b22cec6546acb388719fc]

You can now use the new choice handler by specifying its ID in `handler` parameter of the [@choice] commands.

```nani
@choice "Choice summary text." handler:MyNewHandler
```

::: example
Find an example on creating a custom choice handler with a particle system in the following project on GitHub: [github.com/Naninovel/CustomUIExample](https://github.com/Naninovel/CustomUIExample).
:::

It's also possible to create a choice handler from scratch by manually implementing `IChoiceHandlerActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations.md) for more information.
