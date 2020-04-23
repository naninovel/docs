# Text Printers

Text printers are actors used to present text messages, that can be revealed (printed) over time.

Printers' behavior can be configured using `Naninovel -> Configuration -> Printers` context menu; for available options see [configuration guide](/guide/configuration.md#printers). The printers' resources manager can be accessed using `Naninovel -> Resources -> Printers` context menu.

In naninovel scripts, text printers are mostly controlled with [@print] and [@printer] commands:

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

Be aware, that even though the built-in printers are implemented as UIs, they're still actors and all the actor-related visibility changes (show/hide animations) use durations set either in the corresponding commands or actor configuration: eg, `time` parameter of [@showPrinter] command controls show animation duration and when it's not specified, `Change Visibility Duration` printer actor configuration property is used as a default duration; `Fade Time` property found on the root of the printer UI prefab is ignored in this case.

## Auto-Advance Text

Auto-advance feature allows to automatically continue script execution when handling [`i`](/api/#i) commands. 

<video class="video" loop autoplay><source src="https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4 " type="video/mp4"></video>

Wait for user input or "i" commands halt script execution until user activates a `Continue` input and are typically used after printing-out a text message. When in auto-advance mode, "i" commands will instead halt script execution for a period of time and then finish, allowing execution of the following command. Halt period depends on the length of the last printed text message and further modified by "Print speed" game setting.

Auto-advance mode can be toggled using `AutoPlay` input (`A` key by default for standalone input module) or "AUTO" button in the control panel.

## Text Skipping

Text skipping feature allows to fast-forward execution of the [@print] commands, effectively skipping text revealing (printing) process. 

<video class="video" loop autoplay><source src="https://i.gyazo.com/9605a5c8cd1911217350d77712f47e7d.mp4" type="video/mp4"></video>

Skip mode can be toggled using `Skip` input (`Ctrl` key by default for standalone input module) or "SKIP" button in the control panel.

By default, skip mode is only available while executing commands that was already executed in the past; e.g. if the user hadn't already read the text that is going to be printed, skip mode won't be available. This can be changed in the game settings using "Skip mode" setting.

## Printer Backlog

Printer backlog is a feature allowing user to re-read previously printed text. 

<video class="video" loop autoplay><source src="https://i.gyazo.com/4bde6752b676aa1acedb54d2af075ced.mp4" type="video/mp4"></video>

Backlog can be shown at any time during main game loop by activating `ShowBacklog` input (`L` key by default for standalone input module) or pressing "LOG" button in the control panel.

## Dialogue Printer

Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## Wide Printer

Wide printers are very like dialogue printers, except for some changes in the panel layout tailored for wide displays. Wide printers also support [character avatars](/guide/characters.md#avatar-textures) feature.

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## Fullscreen Printer

Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text, aka "NVL" mode.

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

Fullscreen printers won't reset text by default on each consequent print command; instead, use [@resetText] command to clear contents of the printer when required. This can be changed by enabling `Auto Reset` in the printer actor configuration menu.

Each print command handled by a fullscreen printer will prepend 2 line breaks before the printed text by default (except when current content of the printer is empty). This can be disabled in the printer actor configuration menu by setting `Auto Line Break` to zero.

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

Below is an example on using fullscreen printer.

```
; Activate fullscreen printer.
@printer Fullscreen

; Following lines will be printed in the same window, separated by two line breaks.
Lorem ipsum dolor sit amet. Proin ultricies in leo id scelerisque. 
Praesent vel orci luctus, tincidunt nisi et, fringilla arcu. In a metus orci. 
Maecenas congue nunc quis lectus porttitor, eget commodo massa congue.

; Clear contents of the printer.
@resetText

; Print more lines.
Morbi ultrices dictum diam, in gravida neque vulputate in. 
...
```

## Chat Printer

Chat printer presents text inside message bubbles framed in a window with vertically-scrollable content, resembling a mobile messager app. Instead of revealing the printed message character by character, it shows "author is typing" animation for the duration of the reveal effect and then instantly shows the printed message. Chat printer supports [character avatars](/guide/characters.md#avatar-textures) feature.

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

When using generic text lines and [@print] commands, the text in the target printer will reset (clear) by default. In case with chat printers, this will remove all the messages when a new one is added, which may not be desirable in most cases. Setting `reset` parameter to *false* will prevent clearing the printer, eg:

```
@print "Orci varius natoque penatibus." author:Kohaku reset:false
@print "Integer ullamcorper fringilla ipsum a scelerisque." author:Yuko reset:false
```

— will print two messages without resetting the printer.

## Bubble Printer

Bubble printers can be used for a manga/comic style of text presentation. 

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

The built-in bubble printer supports two appearances: "Left" and "Right", which can be used to align the direction of the printer based on which side it's positioned relative to the character.

```
@printer Bubble.Left pos:42,80 visible:false time:0
@show Bubble wait:false
Misaki: Aliquam lobortis!
@char Nanikun.Happy wait:false
@printer Bubble.Right pos:53,55 visible:false time:0
@show Bubble wait:false
Nanikun: Integer nec maximus elit, eget posuere risus.
```

To display more than one bubble (or any other) printer at a time, add custom printers.

## Adding Custom Printers

You can add custom text printers based on the built-in templates or create new printers from scratch. For example, let's customize the built-in `Dialogue` template. 

Use `Create -> Naninovel -> Text Printers -> Dialogue` asset context menu to create a dialogue prefab somewhere outside of the Naninovel package, e.g. at the `Assets/TextPrinters` folder. 

Edit the prefab: change font, textures, add animations, etc. For more information on the available UI building tools, check the [Unity documentation](https://docs.unity3d.com/Packages/com.unity.ugui@latest).

Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with `Naninovel -> Resources -> Printers` context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double click the record to open actor settings. Drag-drop printer prefab to the `Resource` field.

<video class="video" loop autoplay><source src="https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4" type="video/mp4"></video>

You can now use the new text printer by activating it via [@printer] command and specifying actor ID you've set in the manager.

```
@printer MyNewPrinter
```

It's also possible to create a printer from scratch by manually implementing `ITextPrinterActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations.md) for more information.

When modifying text component, be aware, that line hight less than 1.0 is not supported (rendered lines will overlap in this case, making it impossible to apply reveal effect). Consider editing the text font itself to reduce vertical clearing.

## Text Reveal Effect

By default, a gradient fade effect is applied when printing out the text messages. If, however, you prefer the more conventional "typewriter" style, you can disable the fade effect by disabling `Slide Clip Rect` and setting `Reveal Fade Width` property in `Revealable Text` component to zero. `Revealable Text` components are applied to the text objects in some of the built-in printers; eg, you can find it attached to `Fullscreen/Content/Printer/Text` game object of a `Fullscreen` printer prefab.

![](https://i.gyazo.com/ab848f3c1c56921634b9d2b872e7c0cb.png)

## Text Reveal Sounds

For the built-in printers, that support revealing effect (currently, `Dialogue`, `Fullscreen` and `Wide`) you can optionally set SFX to be played when the characters are revealed. 

Follow the "Adding Custom Printers" guide above to create a custom printer based on any of the built-in ones, then find `Revealable Text Printer Panel` component attached to the root object of the prefab and use `Reveal Sfx` property to set the SFX to be played when a character is revealed. The actual list of the available options is based on the audio resources you've added via the `Naninovel -> Resources -> Audio` menu.

You can also use `Chars SFX` list property to map multiple SFXs to specific characters. The following illustration represents setup, where "Keystroke2" SFX will be played for spaces, "Explosion" for characters `D`, `d`, `F`, `1`, `4`, `9`, and `*`, no SFX will be played for `%` character and "Keystroke1" will be played for all the other characters.

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

Alternatively, you can set `Message Sound` in the character configuration menus to play character-specific sounds when the text is revealed while that character is the author of the message (no matter which text printer is printing that message). In case both `Message Sound` of the message's author and `Reveal Sfx` of the default printer are assigned, `Message Sound` will be played instead of the printer's default `Reveal SFX`. `Chars SFX`, when configured, will always be played, no matter if `Message Sound` of the author is specified or not.

The text reveal sounds are played very often (depending on the message reveal speed) and are clipped when same sound is played in consequence, so make sure the corresponding audio clips are very short and sharp (without any pause/silence at the beginning).

In case the reveal sounds are not working for you (eg, the sound is not short enough to play it on each char reveal), consider using `OnPrintTextStarted` and `OnPrintTextFinished` events of the `TextPrinterManager` [engine service](/guide/engine-services.md) to start/stop looping the sound accordingly. Those events are also exposed to PlayMaker, in case you prefer a [visual scripting](/guide/playmaker.md) solution.

## TextMesh Pro

Naninovel supports [TextMesh Pro](https://assetstore.unity.com/packages/essentials/beta-projects/textmesh-pro-84126) via built-in `TMProFullscreen`, `TMProDialogue`, `TMProWide` and `TMProBubble` printers implemented with the TMPro UI text components.

![](https://i.gyazo.com/bb143607ce79e5a28d89052c7f9fb07c.png)

Before using the TMPro printers, make sure you have TextMesh Pro installed in your Unity project. TextMesh Pro can be installed via package manager accessible via `Window -> Package Manager` menu.

You can select the TMPro printers to route all the print commands to them using [@printer] command in naninovel scripts:

```
; Activate dialogue TMPro printer
@printer TMProDialogue
; Print text using the activated printer
Hello World!
```

When creating custom TextMesh Pro font assets or materials, don't forget to apply `Naninovel/RevealableTMProText` shader to the font material, otherwise text reveal effect won't work.

![](https://i.gyazo.com/18e112ba90cad84f44f0b78db0db303a.png)

## Text Styles

Various text styles can be applied via rich text tags placed right inside the text or using [@style] command.

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
