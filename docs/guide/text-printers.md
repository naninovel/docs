# Text Printers

Text printers are novel actors used to present self-revealing text messages to the user. 

Printers' behavior can be configured using `Naninovel -> Configuration -> Printers` context menu; for available options see [configuration guide](/guide/configuration.md#printers). The printers' resources manager can be accessed using `Naninovel -> Resources -> Printers` context menu.

In novel scripts, text printers are mostly controlled with [`@print`](/api/#print) and [`@printer`](/api/#printer) actions:

```
; Will activate `Dialogue` printer
@printer Dialogue

; Will active `Fullscreen` printer
@printer Fullscreen

; Will print the infamous phrase using active printer
@print text:"Lorem ipsum dolor sit amet."

; The same as above, but using generic text statement
Lorem ipsum dolor sit amet.

; The same as above, but associated with character "Felix"
Felix: Lorem ipsum dolor sit amet.
```

## Dialogue Printer

Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.

![Dialogue Printer](/guide/dialogue-printer.png)

## Fullscreen Printer

Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text. 

![Fullscreen Printer](/guide/fullscreen-printer.png)

## Wide Printer

Wide printers are very like dialogue printers, except the control panel being at the right and aligned vertically. Wide printers also support characters avatar feature.

![Wide Printer](https://i.gyazo.com/f921ab4ef864aea6980a5c6be6743494.png)

## Chat Printer

Chat printer presents text inside message bubbles framed in a window with vertically-scrollable content, resembling a mobile messager app. Instead of revealing the printed message character by character, it shows "author is typing" animation for the duration of the reveal effect and then instantly shows the printed message. Chat printer supports characters avatar feature.

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

## Adding Custom Printers

You can customize the built-in text printers in any way you wish or create new printers from scratch. For example, let's customize the built-in dialogue printer. 

All the built-in printer prefabs and related components are stored inside `Naninovel/Prefabs/TextPrinters` folder. While you can directly edit the `Dialogue` prefab and immediately get the result, consider duplicating it and adding as a separate printer to avoid issues when updating the Naninovel package in the feature. 

Duplicate (Ctrl/Cmd+D) the `Naninovel/Prefabs/TextPrinters/Dialogue.prefab` prefab and move it outside of the Naninovel package, e.g. to a `Assets/Printers` folder. 

Edit the prefab: change font, textures, add animations, etc. 

Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with `Naninovel -> Resources -> Printers` context menu. Add new record using the `+` (plus) button, enter the printer actor name (can differ from the prefab name) and double click the record to open actor settings. Drag-drop printer prefab to the `Resource` field.

Now you can use the new text printer by activating it via [`@printer`](/api/#printer) action and specifying the printer actor name you've set in the manager.

## Text Reveal Effect

By default, a gradient fade effect is applied when printing out the text messages. If, however, you prefer the more conventional "typewriter" style, you can disable the fade effect by disabling `Slide Clip Rect` and setting `Reveal Fade Width` and `Reveal Fade Duration` properties in `Novel Text` component to zero. `Novel Text` components are used in both default printers; eg, you can find it attached to `Fullscreen/Content/Printer/Text` gameobject of the `Naninovel/Prefabs/TextPrinters/Fullscreen` printer prefab.

![](https://i.gyazo.com/3434d39dcaf6b501d3f3640fda84bf80.png)

## TextMesh Pro

Naninovel supports [TextMesh Pro](https://assetstore.unity.com/packages/essentials/beta-projects/textmesh-pro-84126) via a standalone extension package, that contains a fullscreen and dialogue printers implemented with the TMPro UI text components.

First, download the latest version of the package using the link below: [github.com/Elringus/NaninovelTMPro/raw/master/NaninovelTMPro.unitypackage](https://github.com/Elringus/NaninovelTMPro/raw/master/NaninovelTMPro.unitypackage).

Before importing the package, make sure you have TextMesh Pro installed in your Unity project. TextMesh Pro can be installed via package manager accessible via `Window -> Package Manager` menu.

Import the package, open Naninovel printers configuration menu `Naninovel -> Configuration -> Printers`, click "Manage Printers" and then replace the built-in resources for the "Dialogue" and "Fullscreen" printers with the prefabs from the extension package; TMPro printer prefabs can be found inside `NaninovelTMPro/Prefabs` folder. 

![](https://i.gyazo.com/f9979fa459b5884b88d00bc606da6121.gif)

When creating custom TextMesh Pro font assets, don't forget to apply `Naninovel/NovelFontTMPro` shader, otherwise the text reveal effect won't work.

![](https://i.gyazo.com/c82a336dc01c6d95c8af034ad31eea8d.png)