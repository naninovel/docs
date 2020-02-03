# Naninovel Scripts

Naninovel scripts are text documents (`.nani` extension) where you control what happens on scenes. Script assets are created with `Create -> Naninovel -> Naninovel Script` asset context menu. You can open and edit them with the built-in [visual editor](#visual-editor) or with an external text editor of your choice, like Notepad, TextEdit or [Atom](https://atom.io).

![](https://i.gyazo.com/f552c2ef323f9ec1171eba72e0c55432.png)

Each line in a naninovel script represents a statement, which can be a command, generic text, label or a comment. Type of the statement is determined by the literal that is placed at the start of the line:

Literal | Statement Type 
:---: | --- 
@ | [Command](#command-lines)
# | [Label](#label-lines)
; | [Comment](#comment-lines)

When none of the above literals are present at the start of the line, it's considered a [generic text](#generic-text-lines) statement.

## Command Lines

Line is considered a command statement if it starts with a `@` literal. Command represents a single operation, that controls what happens on the scene; eg, it can be used to change a background, move a character or load another naninovel script.

### Command Identifier

Right after the command literal a command identifier is expected. This could either be name of the C# class that implements the command or the command's alias (if it's applied via `CommandAlias` attribute). 

For example, [`@save`](/api/#save) command (used to auto-save the game) is implemented via the `AutoSave` C# class. The implementing class also has a `[CommandAlias("save")]` attribute applied, so you can use both `@save` and `@AutoSave` statements in the script to invoke this command. 

Command identifiers are case-insensitive; all the following statements are valid and will invoke the same `AutoSave` command:

```
@save
@Save
@AutoSave
@autosave
``` 

### Command Parameters

Most of the commands have a number of parameters that define the effect of the command. Parameter is a key-value expression defined after the command literal separated by a column (`:`). Parameter identifier (key) could be either name of the corresponding parameter field of the command implementation class or the parameter's alias (if defined via `alias` property of `CommandParameter` attribute).
```
@commandId paramId:paramValue 
```

Consider a [`@hideChars`](/api/#hidechars) command, which is used to hide all visible characters on the scene. It could be used as follows:

```
@hideChars
```
You can use a `time` *Decimal* parameter here to control for how long the characters will fade-out before becoming completely hidden (removed from scene):

```
@hideChars time:5.5
```

This will make the characters to fade-out for 5.5 seconds, before completely removing them from scene.

You can also use a `wait` *Boolean* parameter to specify whether next command should be executed immediately after or wait for the completion of the current command:

```
@hideChars time:5.5 wait:false
@hidePrinter
```
This will hide the text printer right after characters will begin to fade-out. If `wait` would be `true` or not specified, the printer would be hidden only when the `@hideChars` complete the execution.

### Parameter Value Types

Depending on the command parameter, it could expect one of the following value types: 

Type | Description
--- | ---
String | A simple string value, eg: `LoremIpsum`. Don't forget to wrap the string in double quotes in case it contain spaces, eg: `"Lorem ipsum dolor sit amet."`.
Integer | A number which is not a fraction; a whole number, eg: `1`, `150`, `-25`.
Decimal | A decimal number with fraction delimited by a dot, eg: `1.0`, `12.08`, `-0.005`.
Boolean | Can have one of two possible values: `true` or `false` (case-insensitive).
Named<> | A name string associated with a value of one of the above types. The name part is delimited by a dot. Eg for *Named&lt;Integer&gt;*: `foo.8`, `bar.-20`.
List<>| A comma-separated list of values of one of the above types. Eg for *List&lt;String&gt;*: `foo,bar,"Lorem ipsum."`, for *List&lt;Decimal&gt;*: `12,-8,0.105,2`

### Nameless Parameters

Most of the commands have a nameless parameter. A parameter is considered nameless when it could be used without specifying its name. 

For example, a [`@bgm`](/api/#bgm) command expects a nameless parameter specifying the name of the music track to play:

```
@bgm PianoTheme
```
"PianoTheme" here is the value of the "BgmPath" *String* parameter.

There could be only one nameless parameter per command and it should always be specified before any other parameters.

### Optional and Required Parameters

Most of the command parameters are *optional*. It means they either have a predefined value or just doesn't require any value in order for the command to be executed. For example, when a [`@resetText`](/api/#resettext) command is used without specifying any parameters it will reset text of a default printer, but you can also set a specific printer ID like this: `@resetText pinter:Dialogue`.

Some parameters however are *required* in order for the command to execute and should always be specified.

### Commands API Reference

For the list of all the currently available commands with a summary, parameters and usage examples see [commands API reference](/api/). 

## Generic Text Lines

To make writing scripts with large amounts of text more comfortable generic text lines are used. Line is considered a generic text statement if doesn't start with any of the predefined statement literals:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

An author ID can be specified at the start of a generic text line separated by a column (`:`) to associate printed text with a [character actor](/guide/characters.md):

```
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

To save some typing when constantly changing character appearances associated with printed text, you can also specify appearance after the author ID:

```
Felix.Happy: Lorem ipsum dolor sit amet.
```

The above line is equal to the following two:

```
@char Felix.Happy wait:false
Felix: Lorem ipsum dolor sit amet.
```

Any number of commands can be inlined to generic text statements using square brackets (`[`,`]`):

```
Felix: Lorem ipsum[char Felix.Happy pos:0.75 wait:false] dolor sit amet, consectetur adipiscing elit.[i] Aenean tempus eleifend ante, ac molestie metus condimentum quis.[i][br 2] Morbi nunc magna, consequat posuere consectetur in, dapibus consectetur lorem. Duis consectetur semper augue nec pharetra.[skipInput]
```

Under the hood, generic text statements are parsed into individual commands; text is printed with [`@print`](/api/#print) command.

## Label Lines

Labels are used as "anchors" when navigating the naninovel scripts with [`@goto`](/api/#goto) commands. To define a label, use a `#` literal at the start of the line followed with label name:

```
# Epilogue
```

You can then use a [`@goto`](/api/#goto) command to "jump" to that line:

```
@goto ScriptName.Epilogue
```

In case you're using [`@goto`](/api/#goto) command from within the same script where the label is defined, you can omit the script name:

```
@goto .Epilogue
```


## Comment Lines

When line starts with a semicolon literal (`;`) it's considered a comment statement. Comment lines are completely ignored by the engine when scripts are parsed. You can use comment lines to add notes or annotations for yourself or other team members who work with naninovel scripts.

```
; The following command will auto-save the game.
@save
```

## Conditional Execution

While the script are executed in a linear fashion by default, you can introduce branching using `if` parameters supported by all the commands.

```
; If `level` value is a number and is greater than 9000, add the choice.
@choice "It's over 9000!" if:level>9000

; If `dead` variable is a bool and equal to `false`, execute the print command.
@print text:"I'm still alive." if:!dead

; If `glitch` is a bool and equals `true` or random function in 1 to 10 range 
; returns 5 or more, execute `@spawn` command.
@spawn GlitchCamera if:"glitch || Random(1, 10) >= 5"

; If `score` value is in 7 to 13 range or `lucky` variable is a bool and equals 
; `true`, load `LuckyEnd` script.
@goto LuckyEnd if:"(score >= 7 && score <= 13) || lucky"

; You can also use conditionals in the inlined commands.
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; When using double quotes inside the expression itself, 
; don't forget to double-escape them.
@print {remark} if:remark=="Saying \\"Stop the car\\" was a mistake."
```

It's also possible to specify multi-line conditional blocks with [`@if`](/api/#if), [`@else`](/api/#else), [`@elseif`](/api/#elseif) and [`@endif`](/api/#endif) commands.

```
@if score>10
	Good job, you've passed the test!
	@bgm Victory
	@spawn Fireworks
@elseif attempts>100
	You're hopeless... Need help?
	@choice "Yeah, please!" goto:.GetHelp
	@choice "I'll keep trying." goto:.BeginTest
	@stop
@else
	You've failed. Try again!
	@goto .BeginTest
@endif
```

Note that tabs here are completely optional and used just for better readability.

The same works for generic text lines:

```
Lorem ipsum dolor sit amet. [if score>10]Duis efficitur imperdiet nunc. [else]Vestibulum sit amet dolor non dolor placerat vehicula.[endif]
```

For more information on the conditional expression format and available operators see the [script expressions](/guide/script-expressions.md) guide.

## Visual Editor

You can use visual script editor to edit the naninovel scripts. Select a script asset and you'll see the visual editor automatically open in the inspector window.

<video class="video" loop autoplay><source src="https://i.gyazo.com/e1f40ff0fb7898e11afa0f058bb6ed6d.mp4" type="video/mp4"></video>

To add a new line to the script, either right-click the place, where you want to insert the line, or press `Ctrl+Space` (you can change the default key bindings in the input configuration menu) and select the desired line or command type. To re-order lines, drag them using their number labels. To remove a line, right-click it and choose "Remove".

When you've changed the script using visual editor, you'll see an asterisk (`*`) over the script name in the inspector header. That means the asset is dirty and need to be saved; press `Ctrl+S` to save the asset. In case you'll attempt to select another asset while the script is dirty, a dialogue window will pop-up allowing to either save or revert the changes.

The visual editor will automatically sync edited script if you update it externally, so you can seamlessly work with the scripts in both text and visual editors. In case auto-sync is not working, make sure `Auto Refresh` is enabled in the `Edit -> Preferences -> General` Unity editor menu.

During the playmode, you can use visual editor to track which script line is currently being played and right-click a line to rewind the playback. This feature requires the script to have equal resource ID (when assigned in the resources manager menu) and asset name.

<video class="video" loop autoplay><source src="https://i.gyazo.com/b6e04d664ce4b513296b378b7c25be03.mp4" type="video/mp4"></video>

Currently played line will be highlighted with green color; when script playback is halted due waiting for user input, played line will be highlighted with yellow instead.

It's possible to edit the script during playmode (via both visual and external editors) and have the changes applied immediately (without game restart) when `Hot Reload Scripts` option is enabled in the scripts configuration. When modifying, adding or removing a line before the currently played one, state rollback will automatically happen to the modified line to prevent state inconsistency.

You can tweak the editor behavior and looks in the scripts configuration menu.

![](https://i.gyazo.com/ddd3ed7cb728d24980863e3830f4ed8d.png)

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/9UmccF9R9xI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## IDE Support

IDE features, like syntax highlighting, error checking, auto-completion and interactive documentation may significantly increase productivity when writing naninovel scripts. We've made an extension for a free and open-source [Atom editor](https://atom.io) (available for Windows, MacOS and Linux), which provides the essential IDE support for NaniScript syntax.

![](https://i.gyazo.com/12f40d4c5b41667ec456dd743c16de50.png)

To use the extension:

1. Install Atom editor
2. Install [language-naniscript](https://atom.io/packages/language-naniscript) extension
3. Install [atom-ide-ui](https://atom.io/packages/atom-ide-ui) extension (required for our extension to provide some of the features)
4. Restart the Atom editor
5. Open a folder with naninovel scripts (opening a single file won't activate the extension)

Check the following video tutorial on activating and using the extension.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/njKxsjtewzA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Support for other editors is possible in the future; check [the issue on GitHub](https://github.com/Elringus/NaninovelWeb/issues/56#issuecomment-492987029) for more information.

## Scripts Debug

When working with large naninovel scripts, it could become tedious to always play them from start in order to check how things work in particular parts of the script. 

Using [development console](/guide/development-console.md) you can instantly "rewind" currently played script to an arbitrary line:

```
rewind 12
```

— will start playing current script from the 12th line; you can rewind forward and backward in the same way. To open the console while game is running, make sure the console is enabled in the engine configuration and press `~` key.

To find out which script and line is currently playing, use debug window: type `debug` in the development console and press `Enter` to show the window.

![Scripts Debug](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

Currently played script name, line number and command (inline) index are displayed in the title of the window. When [auto voicing](/guide/voicing.md#auto-voicing) feature is enabled, name of the corresponding voice clip will also be displayed. You can re-position the window by dragging it by the title. "Stop" button will halt script execution; when script player is stopped "Play" button will resume the execution. You can close the debug window by pressing the "Close" button.

Debug window is available in both editor and player builds.
