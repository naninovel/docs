# Text Printers

Text printers are novel actors used to present self-revealing text messages to the user. 

Printers' behavior can be configured using `Naninovel -> Configuration -> Printers` context menu; for available options see [configuration guide](/guide/configuration.md#printers). The printers' resources manager can be accessed using `Naninovel -> Resources -> Printers` context menu.

In novel scripts, text printers are mostly controlled with [`@print`](/api/#print) and [`@printer`](/api/#printer) actions.

## Dialogue Printer

Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.

![Dialogue Printer](/guide/dialogue-printer.png)

## Fullscreen Printer

Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text. 

![Fullscreen Printer](/guide/fullscreen-printer.png)

## Adding Custom Printers

You can customize the built-in text printers in any way you wish or create new printers from scratch. For example, let's customize the built-in dialogue printer. 

All the built-in printer prefabs and related components are stored inside `Naninovel/Prefabs/TextPrinters` folder. While you can directly edit the `Dialogue` prefab and immediately get the result, consider duplicating it and adding as a separate printer to avoid issues when updating the Naninovel package in the feature. 

Duplicate (Ctrl/Cmd+D) the `Naninovel/Prefabs/TextPrinters/Dialogue.prefab` prefab and move it outside of the Naninovel package, e.g. to a `Assets/Printers` folder. 

Edit the prefab: change font, textures, add animations, etc. 

Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with `Naninovel -> Resources -> Printers` context menu. Add new record using the `+` (plus) button, enter the printer actor name (can differ from the prefab name) and double click the record to open actor settings. Drag-drop printer prefab to the `Resource` field.

Now you can use the new text printer by activating it via [`@printer`](/api/#printer) action and specifying the printer actor name you've set in the manager.


