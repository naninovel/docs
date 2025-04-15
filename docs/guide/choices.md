# Choices

The feature allows to present a number of choices to the user and re-route script execution depending on the choice the user makes.

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

Use [@choice] commands followed by the choice summary and (optional) `goto` path to add choices from the naninovel scripts:

```nani
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[< skip!]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:#Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript#LabelName
@stop
```

Value of the `goto` parameter is the path to re-route (jump) into when users selects the corresponding choice. It's specified in the following format: *ScriptPath*.*LabelName*. When label name is omitted, provided script will be played from the start; when script path is omitted, a label in the currently played script will be referenced:

```nani
; Starts playing naninovel `Script001` script from the start.
goto:Script001

; Save as above, but start playing from the label `AfterStorm`.
goto:Script001#AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script.
goto:#Epilogue
```

::: info NOTE
Find more about labels in the [scripts guide](/guide/naninovel-scripts#label-lines).
:::

When `goto` parameter is not specified, current script will continue executing from the next line.

Choice handler actors are used to process the [@choice] commands. You can add, edit and remove choice handlers using the choice manager accessible via `Naninovel -> Resources -> Choice Handlers` context menu.

Choice handlers behavior can be configured using `Naninovel -> Configuration -> Choice Handlers` context menu; for available options see [configuration guide](/guide/configuration#choice-handlers).

Check the following video tutorial for an overview of the choice handlers.

![](https://www.youtube.com/watch?v=cOREgtJak3A)

## Nested Callback

When the consequence of picking a choice is small (eg, you may just want to print a couple of sentences), it's impractical to designate a label and use `goto` or `gosub` parameters. Instead, [nest](/guide/naninovel-scripts#nesting) commands to execute when the choice is picked:

```nani
@choice "Ask about color"
    Kohaku: What's your favorite color?
    Yuko: Magenta.
@choice "Ask about age"
    Kohaku: How old are you?
    @shake Yuko
    Yuko: Why?
@choice "Keep silent"
    Kohaku: ...
    Awkward silence fell.
@stop
```

Any level of nesting is supported:

```nani
@choice "Ask about age"
    Kohaku: How old are you?
    @shake Yuko
    Yuko: Why?
    @choice "Insist"
        Kohaku: Just asking. Is that a secret?
        Yuko.Angry: It is!
    @choice "Give up"
        Kohaku: Never mind, forget about that.
        @char Yuko.Relieved
    @stop
@choice "Keep silent"
    ...
@stop
```

::: info NOTE
Nested choice callback is not compatible with `goto`, `gosub`, `set` and `play` parameters. Instead of specifying them as parameters, use the appropriate commands inside the nested block: [@goto] instead of `goto` parameter, [@set] instead of `set` parameter and so on.
:::

## Choice Button

The [@choice] command accepts an optional `button` parameter specifying a path (relative to a "Resources" folder) to custom prefab representing the choice option object.

```nani
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:#HomeScene
```

— here we use a choice handler supporting positioning to represent a point of interest on an improvised map, where the `button` parameter is pointing to a prefab consisting of a button wrapped over an image. The prefab is stored at `Assets/Resources/MapButtons/Home.prefab`.

To create a choice button prefab from template, use `Create -> Naninovel -> Choice Button` asset context menu.

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

If you don't want to store the choice button prefabs in `Resources` folder or need to localize them, set a custom loader in choice handler configuration menu and use any of the available [resource providers](/guide/resource-providers).

![](https://i.gyazo.com/9b50d543b5a6843b13b415c3c2ae9641.png)

When `button` parameter of the [@choice] command is not specified, default button prefab is used.

To change choice button used by default, create a [custom choice handler](/guide/choices#adding-custom-choice-handlers) and assign the prefab to `Default Button Prefab` property of `Choice Handler Panel` component or use a custom component.

![](https://i.gyazo.com/0972b2725ed043d050804d3833a83b73.png)

To use a different text component for the choice text, use `On Summary Text Changed` [Unity event](https://docs.unity3d.com/Manual/UnityEvents) of the choice button component.

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## Locked Choice

A common use case with choices is to make one locked/disabled or otherwise not available for player to pick based on a condition. For example, you may wish to restrict player access to a particular story branch in case a condition was not met prior to the choice.

While it's possible to implement this with a choice button parameter outlined above, the use case is pretty common, so Naninovel has a dedicated way to make this work with `lock` parameter of [@choice] command:

```nani
; Make choice disabled/locked when 'score' variable is below 10.
@choice "Secret option" lock:{score<10}
```

Built-in choice button has `On Lock` event invoked each time choice is added, which will set the underlying button's `Interactible` property, making it interactable when the choice is not locked and vice-versa. You can override or extend the behaviour by attaching a custom handler to `On Lock` event or by overriding `HandleLockChanged` method of the choice button class.

![](https://i.gyazo.com/ec5ef74ec9af1aa46a18d89bd34d866f.png)

## ButtonList Choice Handler

Button list handler is used by default. It stores the choice buttons inside a horizontal layout panel and ignores the `pos` parameter of the [@choice] command.

## ButtonArea Choice Handler

In contrast to button list, button area doesn't enforce any specific layout and allows manually setting positions of the added choice buttons via `pos` parameter. For example, here is one way to make an interactive map with choice commands and button area handler:

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:#HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:#ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto #Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto #Map
```

::: tip EXAMPLE
Find a more advanced implementation of interactive map with Naninovel in the [map sample](/guide/samples#map).

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## ChatReply Choice Handler

Used by [chat text printer](/guide/text-printers#chat-printer) to represent reply choices. Example:

```nani
@printer Chat
Kohaku: Where're you right now?
@choice "Play dumb" handler:ChatReply
    Yuko: ¯\_(ツ)_/¯
@choice "Answer" handler:ChatReply
    Yuko: school. preping for the festival
@stop
```

![](https://i.gyazo.com/338f8519b3a1656059a407fe0232b376.mp4)

## Adding Custom Choice Handlers

You can add custom choice handlers based on the built-in templates or create new handlers from scratch. For example, let's customize the built-in `ButtonArea` template.

Use `Create -> Naninovel -> Choice Handler -> ButtonArea` asset context menu to create a button area handler prefab somewhere outside the Naninovel package, e.g. at the `Assets/ChoiceHandlers` folder.

Edit the handler: change font, textures, add animations, etc. For more information on the available UI building tools, check the [Unity documentation](https://docs.unity3d.com/Packages/com.unity.ugui@latest).

Expose the handler to engine resources using choice handler manager GUI, which can be accessed with `Naninovel -> Resources -> Choice Handlers` editor context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double click the record to open actor settings. Drag-drop handler prefab to the `Resource` field.

![](https://i.gyazo.com/cb3a0ff7f22b22cec6546acb388719fc.mp4)

You can now use the new choice handler by specifying its ID in `handler` parameter of the [@choice] commands.

```nani
@choice "Choice summary text." handler:MyNewHandler
```

::: tip EXAMPLE
Find an example on creating a custom choice handler with a particle system in the [UI sample](/guide/samples#ui).
:::

It's also possible to create a choice handler from scratch by manually implementing `IChoiceHandlerActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations) for more information.
