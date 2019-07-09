# Choices

The feature allows to present a number of choices to the user and re-route script execution depending on the choice the user makes.

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

Use [`@choice`](/api/#choice) commands followed by the choice summary and (optional) `goto` path to add choices from the naninovel scripts:

```
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[skipInput]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:.Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript.LabelName
@stop
```

Value of the `goto` parameter is the path to re-route into when users selects the corresponding choice. It's specified in the following format: *ScriptName*.*LabelName*. When label name is omitted, provided script will be played from the start; when script name is omitted, a label in the currently played script will be referenced:

```
; Loads and starts playing a naninovel script with the name `Script001` from the start
goto:Script001

; Save as above, but start playing from the label `AfterStorm`
goto:Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script
goto:.Epilogue
```

When `goto` parameter is not specified, current script will continue executing from the next line.

Choice handler actors are used to process the [`@choice`](/api/#choice) commands. You can add, edit and remove choice handlers using the choice manager accessible via `Naninovel -> Resources -> Choice Handlers` context menu.

Choice handlers behavior can be configured using `Naninovel -> Configuration -> Choice Handlers` context menu; for available options see [configuration guide](/guide/configuration.md#choice-handlers).

## Choice Button

The [`@choice`](/api/#choice) command accepts an optional `button` parameter specifying a path (relative to a "Resources" folder) to custom prefab representing the choice option object. 

```
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
```
— here we use a choice handler supporting positioning to represent a point of interest on an improvised map, where the `button` parameter is pointing to a prefab consisting of a button wrapped over an image. The prefab is stored at `Assets/Resources/MapButtons/Home.prefab`.

The choice button prefab should have a [Button](https://docs.unity3d.com/Manual/script-Button.html) and `ChoiceHandlerButton` components attached to the root object; check out `Naninovel/Prefabs/ChoiceHandlers/ChoiceHandlerButton.prefab` default choice handler button prefab for the reference implementation or just duplicate and build your own using it as a foundation.

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

When the `button` parameter is not specified a default button prefab will be used.

## ButtonList Choice Handler
Button list handler is used by default. It stores the choice buttons inside a horizontal layout panel and ignores the `pos` parameter of the [`@choice`](/api/#choice) command.

## ButtonArea Choice Handler
In contrast to button list, button area doesn't enforce any specific layout and allows manually setting positions of the added choice buttons via `pos` parameter. For example, here is one way to make an interactive map with choice commands and button area handler:

```
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

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/cNRNgk5HhKQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Adding Custom Choice Handlers

You can customize the built-in choice handlers in any way you wish or create new handlers from scratch. For example, let's customize the built-in ButtonArea choice handler. 

All the built-in handler prefabs are stored inside `Naninovel/Resources/Naninovel/ChoiceHandlers` folder. While you can directly edit the prefab and immediately get the result, consider duplicating it and adding as a separate handler to avoid issues when updating Naninovel package in the future. 

Duplicate (Ctrl/Cmd+D) `ButtonArea.prefab` and move it outside of the Naninovel package, e.g. to `Assets/ChoiceHandlers` folder. 

Edit the handler: change font, textures, add animations, etc. 

Expose the handler to engine resources using choice handler manager GUI, which can be accessed with `Naninovel -> Resources -> Choice Handlers` context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double click the record to open actor settings. Drag-drop handler prefab to the `Resource` field.

<video class="video" loop autoplay><source src="https://i.gyazo.com/cb3a0ff7f22b22cec6546acb388719fc.mp4" type="video/mp4"></video>

You can now use the new choice handler by specifying its ID in `handler` parameter of the [`@choice`](/api/#choice) commands.

```
@choice "Choice summary text." handler:MyNewHandler
```

It's also possible to create a choice handler from scratch by manually implementing `IChoiceHandlerActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations.md) for more information.