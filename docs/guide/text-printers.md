# Text Printers

Text printers are actors used to present text messages, that can be revealed (printed) over time.

Printers' behavior can be configured using `Naninovel -> Configuration -> Printers` context menu; for available options see [configuration guide](/guide/configuration#printers). The printers' resources manager can be accessed using `Naninovel -> Resources -> Printers` context menu.

In naninovel scripts, text printers are mostly controlled with [@print] and [@printer] commands:

```nani
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

![](https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4)

Wait for user input or "i" commands halt script execution until user activates a `Continue` input and are typically used after printing-out a text message. When in auto-advance mode, "i" commands will instead halt script execution for a period of time and then finish, allowing execution of the following command. Halt period depends on the length of the last printed text message and further modified by "Print speed" game setting.

Auto-advance mode can be toggled using `AutoPlay` input (`A` key by default for standalone input module) or "AUTO" button in the control panel.

## Text Skipping

Text skipping feature allows to fast-forward execution of the [@print] commands, effectively skipping text revealing (printing) process.

![](https://i.gyazo.com/9605a5c8cd1911217350d77712f47e7d.mp4)

Skip mode can be toggled using `Skip` input (`Ctrl` key by default for standalone input module) or "SKIP" button in the control panel.

By default, skip mode is only available while executing commands that was already executed in the past; e.g. if the user hadn't already read the text that is going to be printed, skip mode won't be available. This can be changed in the game settings using "Skip mode" setting.

## Printer Backlog

Printer backlog is a feature allowing user to re-read previously printed text, revise selected choices, replay voiced lines and (optionally) rollback to the logged messages.

![](https://i.gyazo.com/cf9c11c242907e0eae7f5f1b4e2b9f38.mp4)

Backlog can be shown at any time during main game loop by activating `ShowBacklog` input (`L` key by default for standalone input module) or pressing "LOG" button in the control panel.

Various backlog UI properties are customizable via component attached to the root of the prefab; see tooltips of the properties for details on what each of them controls.

![](https://i.gyazo.com/40e44a4ed69f75fa5fb9c36cdae6226a.png)

Consult [built-in UI customization guide](/guide/user-interface#modifying-built-in-ui) for more info now how to customize and configure the UI.

It's possible to prevent specific text printers from adding messages to the backlog by disabling `Add To Backlog` property in the printer actor configuration. When `Split Backlog Messages` property is enabled, all the messages added to the backlog will be split (displayed as separate records).

![](https://i.gyazo.com/9f0155dff068dbe1fd821e9007cf4a5a.png)

## Message Templates

It's possible to automate additional processing for text messages with message templates. The processing is configured individually for each text printer at runtime with [@format] commands or in editor via `Default Templates` property of the printer panel UI. For example, below is the default formatting template of the built-in `Fullscreen` printer:

![](https://i.gyazo.com/24774230ec66a5eb783fbe148b5c96d4.png)

You can specify any text formatting tags or characters and use `%TEXT%` to be replaced with the message text and `%AUTHOR%` with the author display name. For example, consider the following template: `“%TEXT%” — <i>%AUTHOR%</i>` — it will wrap the printed message in quotes followed by a dash and author name in italics; for example, `Kohaku: Lorem ipsum.` processed with such template will result in:

![](https://i.gyazo.com/53b5ba0f426afc847e51d843ffd6e808.png)

The assigned templates are applied in order and `Author` property allows filtering applied templates based on the author of the printed messages. Specify an author (character actor) ID to make the template applicable only for the specific author, `+` to make it applicable for any authored messages, `-` — for un-authored messages or `*` to apply it for any messages.

## Dialogue Printer

Dialogue printers present text inside windows with a flexible height. They initially take about a third of the screen size and will increase the height when the content requires more space. Dialogue printers also expose associated character name in a label above the text window.

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## Wide Printer

Wide printers are very like dialogue printers, except for some changes in the panel layout tailored for wide displays. Wide printers also support [character avatars](/guide/characters#avatar-textures) feature.

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## Fullscreen Printer

Fullscreen printers present text inside windows with a static size. They take most of the screen size and are indented for presenting large amounts of text, aka "NVL" mode.

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

Fullscreen printers won't reset text by default on each consequent print command; instead, use [@resetText] command to clear contents of the printer when required. This can be changed by enabling `Auto Reset` in the printer actor configuration menu.

Each print command handled by a fullscreen printer will prepend 2 line breaks before the printed text by default (except when current content of the printer is empty). This can be disabled in the printer actor configuration menu by setting `Auto Line Break` to zero.

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

Below is an example on using fullscreen printer.

```nani
; Activate fullscreen printer.
@printer Fullscreen

; Following lines will be printed in the same window, separated by 2 breaks.
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

Chat printer presents text inside message bubbles framed in a window with vertically-scrollable content, resembling a mobile messager app. Instead of revealing the printed message character by character, it shows "author is typing" animation for the duration of the reveal effect and then instantly shows the printed message. Chat printer supports [character avatars](/guide/characters#avatar-textures) feature.

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

To embed choices inside the chat printer, see [ChatReply](/guide/choices#chatreply-choice-handler) choice handler. You can also specify custom handler via `Choice Handler Id` property found on `Chat Printer Panel` component.

## Bubble Printer

Bubble printers can be used for a manga/comic style of text presentation.

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

The built-in bubble printer supports two appearances: "Left" and "Right", which can be used to align the direction of the printer based on which side it's positioned relative to the character.

```nani
@printer Bubble.Left pos:42,80 !visible time:0
@show Bubble
Misaki: Aliquam lobortis!
@char Nanikun.Happy
@printer Bubble.Right pos:53,55 !visible time:0
@show Bubble
Nanikun: Integer nec maximus elit, eget posuere risus.
```

To display more than one bubble (or any other) printer at a time, add custom printers.

::: tip
It could be tedious to manually specify positions for aligning bubble printers with the associated actors. Check [the topic on our forum](https://forum.naninovel.com/viewtopic.php?t=647) for an example on automating the ordeal.
:::

## Adding Custom Printers

You can add custom text printers based on the built-in templates or create new printers from scratch. For example, let's customize the built-in `Dialogue` template.

Use `Create -> Naninovel -> Text Printers -> Dialogue` asset context menu to create a dialogue prefab somewhere outside the Naninovel package, e.g. at the `Assets/TextPrinters` folder.

Edit the prefab: change font, textures, add animations, etc. For more information on the available UI building tools consult [Unity documentation for uGUI](https://docs.unity3d.com/Packages/com.unity.ugui@latest). There are also a couple of tutorial videos and an example project on working with uGUI in the [UI customization guide](/guide/user-interface#ui-customization).

Expose the prefab to engine resources using the printer's manager GUI, which can be accessed with `Naninovel -> Resources -> Printers` context menu. Add a new record using `+` (plus) button, enter actor ID (can differ from the prefab name) and double-click the record to open actor settings. Drag-drop printer prefab to the `Resource` field.

![](https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4)

You can now use the new text printer by activating it via [@printer] command and specifying actor ID you've set in the manager.

```nani
@printer MyNewPrinter
```

::: tip EXAMPLE
Check out [demo project](/guide/getting-started#demo-project) for an example on adding a custom printer. The prefab is stored as `Assets/Prefabs/CustomPrinter.prefab`.
:::

It's also possible to create a printer from scratch by manually implementing `ITextPrinterActor` interface. See the guide on [custom actor implementations](/guide/custom-actor-implementations) for more information.

## Text Reveal Effect

Reveal progress of printed text messages is maintained by `Revealable Text` component, which wraps Unity's TMPro Text and supports all the same features. By itself, however, the component doesn't apply any reveal effects. For this standalone components are used, such as `Reveal Clipped`, which limits maximum visible characters in accordance with the current reveal progress. Most built-in printers also have `Reveal Fader` component applied, which adds gradient opacity fade to the revealed characters.

![](https://i.gyazo.com/cb76ab871fe4691646e968b2c49d0a13.png)

To change the reveal effect intensity (how far the fade stretches), change `Length` property.

When `Slack Opacity` is below 1, opacity of the text printed before the last append will fade to the specified value over `Slack Duration` seconds (enabled by default in built-in `Fullscreen` printer).

![](https://i.gyazo.com/29017ea20e8b7b95c3f7f25658b645f9.mp4)

When text printer has constant dimensions and can't accommodate varying message length and/or font size, set TMPro's text overflow mode to "page" and add `Reveal Paginator` component, which will sync currently displayed page with the reveal progress. Find example setup in `Fullscreen` built-in printer.

## Text Styles

Various text styles can be applied via rich text tags placed right inside the text or using [@style] command. See the [official documentation](http://digitalnativestudios.com/textmeshpro/docs/rich-text/) for more info.

## Ruby (Furigana)

Support for [ruby](https://en.wikipedia.org/wiki/Ruby_character) characters is provided by Naninovel's `Naninovel TMPro Text` component (`Revealable Text` is based on it) via custom `<ruby>` tag. Wrap the text above which the ruby characters should be placed with the ruby tag and specify the ruby text inside the tag, eg:

```nani
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet.
```
— "VERY" ruby text will appear right above "ipsum" word when the message is printed at runtime.

![](https://i.gyazo.com/ec5eb47c3cf0951ccb589fe49c144418.png)

::: info NOTE
When combining `<ruby>` with other tags, specify ruby tag first to prevent formatting issues, eg:

```nani
Lorem <ruby="VERY"><tip="TipID">ipsum</tip></ruby> dolor sit amet.
```
:::

You can additionally control the size and vertical line offset of the ruby text by changing properties of `Naninovel TMPro Text` component used in the printer prefabs.

By default, when a ruby text is inserted to the printed message, line height is increased to compensate for the new content. To ensure equal height for all lines (both with and without ruby text), disable `Add Ruby Line Height` property and increase default line height.

![](https://i.gyazo.com/6b4d9d41438dfc36309a6dc04682dbf5.png)

Below is a video demonstration of the ruby tags in action.

![](https://www.youtube.com/watch?v=aWdq7YxIxkE)

## Right to Left (Arabic) Text

Supports for RTL text reveal effect can be enabled in all the built-in printers.

![](https://i.gyazo.com/38b9ec2bbf18dc6ee469c3fb452eae29.mp4)

To use RTL text in a printer, do the following:
1. Create custom text printer from any built-in template.
2. Set `Enable RTL Editor` property in `Revealable Text` component inside the printer.
3. Enable `Fix Arabic Text` property on the same component (under "Naninovel Settings" dropdown).

![](https://i.gyazo.com/3eec751d0c85da8f9cfb20a6fe6902bb.png)

Don't forget to use a [compatible font](https://fonts.google.com/?subset=arabic&sort=popularity) and atlas configuration; here is an example:

```
Font Size: Auto Sizing
Font padding: 5
Packing Method: Optimum
Atlas res: 1024x1024
Character Set: Unicode Range (Hex) with this Sequence:
20-7E,600-603,60B-615,61B,61E-61F,621-63A,640-65E,660-6DC,6DF-6E8,6EA-6FF,750-76D,FB50-FBB1,FBD3-FBE9,FBFC-FBFF,FC5E-FC62,FD3E-FD3F,FDF2,FDFC,FE80-FEFC
Font Render Mode: Distance Field 16
```

::: tip EXAMPLE
For a complete example on setting up custom text mesh pro printer with right-to-left (Arabic) text support, see [Naninovel RTL project on GitHub](https://github.com/naninovel/samples/tree/main/unity/rtl).
:::

::: info NOTE
Unity doesn't natively support Arabic text. Consider using `Naninovel TMPro Text` component for text labels (other than printers) that should support Arabic.
:::

## CJK Languages

Chinese, Japanese and Korean languages have lots of unique symbols, while only a small subset is usually required in the game. To optimize generated font atlases size, TMPro has an option to specify the character set for which to build the SDF textures.

![](https://i.gyazo.com/cdd1dc10d872d6bcb4d44c14c61df588.png)

To find which characters will be displayed by Naninovel, use Character Utility accessible via `Naninovel -> Tools -> Character Extractor` editor menu.

![](https://i.gyazo.com/706613a08aa2519964ccd98bd12a288f.png)

The tool will inspect both scenario scripts and managed text documents in the specified folder (including all the sub-folders), so you'll get the chars for all the text ever displayed to the player by Naninovel, including all the printed text, UI labels, unlockable tips, etc.

::: tip EXAMPLE
Check the [GitHub project](https://github.com/naninovel/samples/tree/main/unity/localization) for an example on using custom TMPro font atlas for Japanese locale. The font automatically switched when Japanese language is selected and switched back to the default atlas when other languages are selected.
:::

## Text Reveal Sounds

For the built-in printers, that support revealing effect (currently, `Dialogue`, `Fullscreen` and `Wide`) you can optionally set SFX to be played when the characters are revealed.

Follow the "Adding Custom Printers" guide above to create a custom printer based on any of the built-in ones, then find `Revealable Text Printer Panel` component attached to the root object of the prefab and use `Reveal Sfx` property to set the SFX to be played when a character is revealed. The actual list of the available options is based on the audio resources you've added via the `Naninovel -> Resources -> Audio` menu.

You can also use `Chars SFX` list property to map multiple SFXs to specific characters. The following illustration represents setup, where "Keystroke2" SFX will be played for spaces, "Explosion" for characters `D`, `d`, `F`, `1`, `4`, `9`, and `*`, no SFX will be played for `%` character and "Keystroke1" will be played for all the other characters.

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

Alternatively, you can set `Message Sound` in the character configuration menus to play character-specific sounds when the text is revealed while that character is the author of the message (no matter which text printer is printing that message). In case both `Message Sound` of the message's author and `Reveal Sfx` of the default printer are assigned, `Message Sound` will be played instead of the printer's default `Reveal SFX`. `Chars SFX`, when configured, will always be played, no matter if `Message Sound` of the author is specified or not.

The text reveal sounds are played very often (depending on the message reveal speed) and are clipped when same sound is played in consequence, so make sure the corresponding audio clips are very short and sharp (without any pause/silence at the beginning).

In case the reveal sounds are not working for you (eg, the sound is not short enough to play it on each char reveal), consider using `OnPrintTextStarted` and `OnPrintTextFinished` events of the `TextPrinterManager` [engine service](/guide/engine-services) to start/stop looping the sound accordingly.

## Reveal Events

It's possible to hook for events when specific character is revealed to perform arbitrary actions. Designate the place in printed text where event should be invoked with `<@...>` tags. For example, to trigger reveal event with "foo" payload after "dolor" is revealed:

```nani
Lorem ipsum dolor<@foo> sit amet.
```

Use `Event Broadcaster` component attached to the revealable text object of printer prefab to listen for event. All the built-in printers have the component already attached, so you just have to wire a listener.

![](https://i.gyazo.com/b0fad2439f2b2136a3b3c13f84f365d2.png)

Built-in printers also have **Play Command** option enabled. This will make the component attempt to parse and execute event body (the part after `@`) as command. For example, following will tint background when "dolor" is revealed:

```nani
Lorem ipsum dolor<@back tint:blue> sit amet.
```

You can use event tags instead of [inlined commands](/guide/naninovel-scripts#command-inlining) to expose them to [localization documents](/guide/localization#scripts-localization) allowing translators override executed commands based on selected locale.

## Reveal Expressions

In some cases, it may be required to include [script expressions](/guide/script-expressions) to the generated localization documents or force expression re-evaluation when language (locale) is changed.

The process is similar to [reveal events](/guide/text-printers#reveal-events), but instead of `@` use `:` tag:

```nani
Lorem ipsum <:random(t_text1, t_text2)> sit amet.
```

— `random(t_text1, t_text2)` expression will be re-evaluated each time the text is assigned to printer, including instances when language is changed, making `t_text1` and `t_text2` [script text variables](/guide/managed-text#script-text) in sync with the currently active locale. The expression will as well be included to the localization documents allowing to change it for each specific language.

Reveal expressions are also useful to allow translators change order of the injected values, as it's common for languages to have different rules on the order/precedence of various speech parts:

```nani
Hello, <:MC>! How's <:AC> doing?
```

— here, both `MC` and `AC` variables (presumably containing player-specified character names) will be exposed in the generated localization document, so that translators would be able to change their order, when necessary.

::: warning
Refrain from using this feature with expressions that mutate or depend on game state, as it may cause undefined behaviour. For example, consider an expression, which result depends on a local variable `foo`, while a message with this expression was printed at some point and is kept in backlog. Should player change locale, the expression will be re-evaluated using whatever value `foo` has at the time locale is changed, which may be different from the time when it was initially printed.
:::
