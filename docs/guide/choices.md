# Choices

The feature allows to present a number of choices to the user and re-route script execution depending on the choice the user makes.

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

Use [`@choice`](/api/#choice) actions followed by the choice summary and (optional) `goto` path to add choices from the novel scripts:

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
; Loads and starts playing a novel script with the name `Script001` from the start
goto:Script001

; Save as above, but start playing from the label `AfterStorm`
goto:Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script
goto:.Epilogue
```

When `goto` parameter is not specified, current script will continue executing from the next line.

Choice handler actors are used to process the [`@choice`](/api/#choice) actions. You can add, edit and remove choice handlers using the choice manager accessible via `Naninovel -> Resources -> Choice Handlers` context menu.

Choice handlers behavior can be configured using `Naninovel -> Configuration -> Choice Handlers` context menu; for available options see [configuration guide](/guide/configuration.md#choice-handlers).

## Choice Button

The [`@choice`](/api/#choice) action accepts an optional `button` parameter specifying a path (relative to a "Resources" folder) to custom prefab representing the choice option object. 

```
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
```
— here we use a choice handler supporting positioning to represent a point of interest on an improvised map, where the `button` parameter is pointing to a prefab consisting of a button wrapped over an image. The prefab is stored at `Assets/Resources/MapButtons/Home.prefab`.

The choice button prefab should have a [Button](https://docs.unity3d.com/Manual/script-Button.html) and `ChoiceHandlerButton` components attached to the root object; check out `Naninovel/Prefabs/ChoiceHandlers/ChoiceHandlerButton.prefab` default choice handler button prefab for the reference implementation or just duplicate and build your own using it as a foundation.

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

When the `button` parameter is not specified a default button prefab will be used.

## ButtonList Choice Handler
Button list handler is used by default. It stores the choice buttons inside a horizontal layout panel and ignores the `pos` parameter of the [`@choice`](/api/#choice) action.

## ButtonArea Choice Handler
In contrast to button list, button area doesn't enforce any specific layout and allows manually setting positions of the added choice buttons via `pos` parameter. For example, here is one way to make an interactive map with choice actions and button area handler:

```
# Map
@back Map
@hideText
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