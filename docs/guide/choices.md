# Choices

The feature allows to present a number of choices to the user and re-route script execution depending on the choice the user makes.

![Choices](/guide/choices.png)

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


Choice handler actors are used to process the `@choice` actions. You can add, edit and remove choice handlers using the choice manager accessible via `Naninovel -> Resources -> Choice Handlers` context menu.


Choice handlers behavior can be configured using `Naninovel -> Configuration -> Choice Handlers` context menu; for available options see [configuration guide](/guide/configuration.md#choice-handlers).
