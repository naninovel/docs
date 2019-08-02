# Text Printers

Text printers are actors used to present self-revealing text messages to the user. 

Printers' behavior can be configured using `Naninovel -> Configuration -> Printers` context menu; for available options see [configuration guide](/guide/configuration.md#printers). The printers' resources manager can be accessed using `Naninovel -> Resources -> Printers` context menu.

In naninovel scripts, text printers are mostly controlled with [`@print`](/api/#print) and [`@printer`](/api/#printer) commands:

```
; Will make the `Dialogue` printer default
@printer Dialogue

; Will make the `Fullscreen` printer default
@printer Fullscreen

; Will print the phrase using a default printer
@print text:"Lorem ipsum dolor sit amet."

; The same as above, but using generic text statement
Lorem ipsum dolor sit amet.

; The same as above, but associated with character "Felix"
Felix: Lorem ipsum dolor sit amet.
```

## Dialogue Printer

Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## Fullscreen Printer

Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text. 

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

## Wide Printer

Wide printers are very like dialogue printers, except for some changes in the panel layout tailored for wide displays. Wide printers also support [character avatars](/guide/characters.md#avatar-textures) feature.

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## Chat Printer

Chat printer presents text inside message bubbles framed in a window with vertically-scrollable content, resembling a mobile messager app. Instead of revealing the printed message character by character, it shows "author is typing" animation for the duration of the reveal effect and then instantly shows the printed message. Chat printer supports [character avatars](/guide/characters.md#avatar-textures) feature.

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

When using generic text lines and [`@print`](/api/#print) commands, the text in the target printer will reset (clear) by default. In case with chat printers, this will remove all the messages when a new one is added, which may not be desirable in most cases. Setting `reset` parameter to *false* will prevent clearing the printer, eg:

```
@print "Orci varius natoque penatibus." author:Kohaku reset:false
@print "Integer ullamcorper fringilla ipsum a scelerisque." author:Yuko reset:false
```

— will print two messages without resetting the printer.

## Adding Custom Printers

You can customize the built-in text printers in any way you wish or create new printers from scratch. For example, let's customize the built-in dialogue printer. 

All the built-in printer prefabs are stored inside `Naninovel/Resources/Naninovel/TextPrinters` folder. While you can directly edit the prefab and immediately get the result, consider duplicating it and adding as a separate printer to avoid issues when updating Naninovel package in the future. 

Duplicate (Ctrl/Cmd+D) `Dialogue.prefab` and move it outside of the Naninovel package, e.g. to `Assets/Printers` folder. 

Edit the prefab: change font, textures, add animations, etc. 

Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with `Naninovel -> Resources -> Printers` context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double click the record to open actor settings. Drag-drop printer prefab to the `Resource` field.

<video class="video" loop autoplay><source src="https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4" type="video/mp4"></video>

You can now use the new text printer by activating it via [`@printer`](/api/#printer) command and specifying actor ID you've set in the manager.

```
@printer MyNewPrinter
```

It's also possible to create a printer from scratch by manually implementing `ITextPrinterActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations.md) for more information.

## Text Reveal Effect

By default, a gradient fade effect is applied when printing out the text messages. If, however, you prefer the more conventional "typewriter" style, you can disable the fade effect by disabling `Slide Clip Rect` and setting `Reveal Fade Width` property in `Revealable Text` component to zero. `Revealable Text` components are applied to the text objects in some of the built-in printers; eg, you can find it attached to `Fullscreen/Content/Printer/Text` gameobject of `Naninovel/Resources/Naninovel/TextPrinters/Fullscreen` printer prefab.

![](https://i.gyazo.com/ab848f3c1c56921634b9d2b872e7c0cb.png)

## Text Reveal Sounds

For the built-in printers, that support revealing effect (currently, `Dialogue`, `Fullscreen` and `Wide`) you can optionally set SFX to be played when the characters are revealed. 

Follow the "Adding Custom Printers" guide above to create a custom printer based on any of the built-in ones, then find `Revealable Text Printer Panel` component attached to the root object of the prefab and use `Reveal Sfx` property to set the SFX to be played when a character is revealed. The actual list of the available options is based on the audio resources you've added via the `Naninovel -> Resources -> Audio` menu.

You can also use `Chars SFX` list property to map multiple SFXs to specific characters. The following illustration represents setup, where "Keystroke2" SFX will be played for spaces, "Explosion" for characters `D`, `d`, `F`, `1`, `4`, `9`, and `*`, no SFX will be played for `%` character and "Keystroke1" will be played for all the other characters.

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

Alternatively, you can set `Message Sound` in the character configuration menus to play character-specific sounds when the text is revealed while that character is the author of the message (no matter which text printer is printing that message). In case both `Message Sound` of the message's author and `Reveal Sfx` of the default printer are assigned, `Message Sound` will be played instead of the printer's default `Reveal SFX`. `Chars SFX`, when configured, will always be played, no matter if `Message Sound` of the author is specified or not.

The text reveal sounds are played very often (depending on the message reveal speed) and are clipped when same sound is played in consequence, so make sure the corresponding audio clips are very short and sharp (without any pause/silence at the beginning).

## TextMesh Pro

Naninovel supports [TextMesh Pro](https://assetstore.unity.com/packages/essentials/beta-projects/textmesh-pro-84126) via built-in `TMProFullscreen`, `TMProDialogue` and `TMProWide` printers implemented with the TMPro UI text components.

![](https://i.gyazo.com/bb143607ce79e5a28d89052c7f9fb07c.png)

Before using the TMPro printers, make sure you have TextMesh Pro installed in your Unity project. TextMesh Pro can be installed via package manager accessible via `Window -> Package Manager` menu.

You can select the TMPro printers to route all the print commands to them using [`@printer`](/api/#printer) command in naninovel scripts:

```
; Activate dialogue TMPro printer
@printer TMProDialogue
; Print text using the activated printer
Hello World!
```

When creating custom TextMesh Pro font assets or materials, don't forget to apply `Naninovel/RevealableTMProText` shader to the font material, otherwise text reveal effect won't work.

![](https://i.gyazo.com/18e112ba90cad84f44f0b78db0db303a.png)

## Text Styles

Various text styles can be applied via rich text tags placed right inside the text or using [`@style`](/api/#style) command.

The default (non-TMPro) text printers are based on [Unity's text rendering system](https://docs.unity3d.com/Manual/script-Text.html) and support basic text styling like color, size, bold, italic, etc. Refer to [guide on text tags](https://docs.unity3d.com/Manual/StyledText.html) for more info.

TextMesh Pro printers support a wide range of additional text tags. See the [official documentation](http://digitalnativestudios.com/textmeshpro/docs/rich-text/) for more info. 

Support for [ruby](https://en.wikipedia.org/wiki/Ruby_character) (furigana) characters is additionally provided by the Naninovel's TextMesh Pro printers via custom `<ruby>` tag. Wrap the text above which the ruby characters should be placed with the ruby tag and specify the ruby text inside the tag, eg:

```
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet. 
```
— "VERY" ruby text will appear right above "ipsum" word when the message is printed at runtime.

You can additionally control the size and vertical line offset of the ruby text by changing properties of `RevealableTMProText` component attached to the printer prefabs.

![](https://i.gyazo.com/7e1e927c144f30353baaab2ac7b643c7.png)

Below is a video demonstration of the ruby tags in action.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/aWdq7YxIxkE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
