# Scenario Scripting

Scenario scripts are text documents with a `.nani` extension that let you control what happens in scenes. Script assets are created via the `Create -> Naninovel -> Scenario Script` asset context menu. You can open and edit them using the built-in [Story Editor](/guide/editor) or an external text or code editor of your choice, such as Microsoft Word, Google Docs, or [VS Code](/guide/ide-extension).

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

Each line in a scenario script represents a statement, which can be a command, generic text, navigation label, or comment. The type of statement is determined by the symbol placed at the start of the line:

| Symbol | Statement                 |
|:------:|---------------------------|
|   @    | [Command](#command-lines) |
|   #    | [Label](#label-lines)     |
|   ;    | [Comment](#comment-lines) |

When none of the above symbols is present at the start of the line, it is considered a [generic text](#generic-text-lines) statement.

::: tip
It is possible to change all pre-defined compiler artifacts, such as symbols, command identifiers, constants, and essentially anything you have to type while authoring scripts, via the [compiler localization](/guide/localization#compiler-localization) feature.
:::

## Command Lines

A line is considered a command statement if it starts with the `@` symbol. A command represents a single operation that controls what happens in the scene; for example, it can be used to change a background, move a character, or load another scenario script.

### Command Identifier

Right after the command symbol, a command identifier is expected. This can be either the name of the C# class that implements the command or the command's alias (when applied to the class via the `Alias` attribute).

For example, the [@save] command (used to auto-save the game) is implemented by the `AutoSave` C# class. The implementing class also has the `[Alias("save")]` attribute applied, so you can use both `@save` and `@AutoSave` statements in the script to invoke this command.

Command identifiers are case-insensitive; all the following statements are valid and will invoke the same `AutoSave` command:

```nani
@save
@Save
@AutoSave
@autosave
```

### Command Parameters

Most commands have a number of parameters that define the effect of the command. A parameter is a key-value expression defined after the command identifier and separated by a colon (`:`). The parameter identifier (key) can be either the name of the corresponding parameter field of the command implementation class or the parameter's alias (when applied via the `alias` property of the `CommandParameter` attribute).

```nani
@commandId paramId:paramValue
```

Consider the [@hideAll] command, which is used to hide all visible actors in the scene. It can be used as follows:

```nani
@hideAll
```

You can use the `time` *decimal* parameter to control how long the actors will fade out before becoming completely hidden:

```nani
@hideAll time:5.5
```

This will make the actors fade out for 5.5 seconds before they are completely invisible.

### Parameter Value Types

Depending on the command parameter, it can expect one of the following value types:

| Type    | Description                                                                                                                                                                                                              |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string  | A simple string value, eg: `LoremIpsum`. Do not forget to wrap the string in double quotes when it contains spaces, eg: `"Lorem ipsum dolor sit amet."`.                                                                 |
| integer | A number that is not a fraction; a whole number, eg: `1`, `150`, `-25`.                                                                                                                                                  |
| decimal | A decimal number with a fraction delimited by a dot, eg: `1.0`, `12.08`, `-0.005`.                                                                                                                                       |
| boolean | Can have one of two possible values: `true` or `false`. You can use [boolean flags](/guide/scenario-scripting#boolean-flags) instead of typing `true` and `false`, eg: `@hideAll wait!` instead of `@hideAll wait:true`. |
| named   | A key-value pair delimited by a dot with a string key and value of one of the above types. Eg for a named integer: `foo.8`, `bar.-20`.                                                                                   |
| list    | A comma-separated list of values of one of the above types. Eg for a string list: `foo,bar,"Lorem ipsum."`, for a decimal list: `12,-8,0.105,2`.                                                                         |

### Nameless Parameters

Some commands have a nameless parameter. A parameter is considered nameless when it can be used without specifying its identifier (name).

For example, the [@bgm] command expects a nameless parameter specifying the path of an audio resource to play:

```nani
@bgm PianoTheme
```

"PianoTheme" here is the value of the `BgmPath` *string* parameter.

There can be only one nameless parameter per command, and it should always be specified before any other parameters.

### Optional and Required Parameters

Many command parameters are *optional*. This means they either have a predefined value or do not require any value for the command to be executed. For example, when the [@resetText] command is used without specifying any parameters, it will reset the text of the default printer, but you can also set a specific printer ID like this: `@resetText printer:Dialogue`.

Some parameters, however, are *required* for the command to execute and should always be specified. Our [VS Code](/guide/ide-extension) extension will warn you if you forget to assign such a parameter.

### Standard Commands

For a list of all standard commands available out of the box, including their summaries, parameters, and usage examples, see the [API reference](/api/).

## Comment Lines

When a line starts with the semicolon symbol (`;`), it is considered a *comment* statement. Comments are completely ignored by the engine at runtime. Use comments to add notes or annotations for yourself or other team members working with scenario scripts.

```nani
; The following command will auto-save the game.
@save

@save ; You can also place comments inside command lines.

# Label ; And inside label lines.

Lorem [shake ; And inside inlined commands] ipsum. [; ...including empty ones.]
```

We will use comments throughout the rest of the guide to annotate sample NaniScript snippets.

## Generic Text Lines

To make writing scripts with large amounts of text easier, generic text lines are used. A line is considered *generic text* when it does not start with any of the statement symbols:

```nani
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

An author ID can be specified at the start of a generic text line, separated by a colon followed by a space (`: `), to associate the printed text with a [character actor](/guide/characters):

```nani
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

To save some typing when constantly changing character appearances associated with printed text, you can also specify an appearance after the author ID:

```nani
Felix.Happy: Lorem ipsum dolor sit amet.
```

The above line is equivalent to the following two lines:

```nani
@char Felix.Happy
Felix: Lorem ipsum dolor sit amet.
```

### Command Inlining

Sometimes, you may want to execute a command while revealing (printing) a text message, either right after or before a specific character. For example, an actor might change their appearance (expression) when a specific word is printed, or a particular sound effect could be played in reaction to some event described in the middle of a printed message. The command inlining feature allows handling cases like this.

All commands (both [standard](/api/) and [custom](/guide/custom-commands)) can be inlined (injected) into generic text lines using square brackets (`[ ]`):

```nani
Felix: Lorem[char Felix.Happy pos:0.5] ipsum![sfx Explosion] Dolor sit amet.
```

Notice that the inlined command syntax is exactly the same as a regular command, except the `@` symbol is omitted and the command body is wrapped in square brackets. Essentially, you can take any command line, inline it into generic text, and it will have the same effect, but at a different moment depending on its position inside the text message.

Under the hood, generic text lines are parsed into individual commands identified by an inline index; the text is printed with the [@print] command.

For example, the following generic text line:

```nani
Lorem ipsum[char Felix.Happy pos:75 wait!] dolor sit amet.
```

— is actually handled by the engine as a sequence of individual commands:

```nani
@print "Lorem ipsum" !waitInput
@char Felix.Happy pos:75 wait!
@print " dolor sit amet." !reset
```

To actually print square brackets within a generic text line, escape them with backslashes, e.g.:

```nani
Some text \[ text inside brackets \]
```

— will print `Some text [ text inside brackets ]` in-game.

To skip waiting for input after a text line is revealed, append `[>]`:

```nani
; After printing following line waiting for input won't activate
; (player won't have to confirm prompt to continue reading).
Lorem ipsum dolor sit amet.[>]
```

### Generic Parameters

In some cases, you may want to modify or assign [@print] parameters for specific parts or the whole generic text line. Use the special `<` command, available only in generic lines, which allows you to do just that:

```nani
; The line will be authored by Kohaku and Yuko actors,
; but the display name on the printer will show 'All Together'.
Kohaku,Yuko: Hello![< as:"All Together"]

; First part printed at 50% speed,
; second part at 250% speed without waiting.
Lorem[< speed:0.5] world![< speed:2.5 nowait!]
```

The command applies the specified parameters to the last text line placed before it, even if other commands are inlined between the `<` and the text:

```nani
; Speed still applies to "Hello" part,
; even though the parameters are after an inlined command.
Hello[-][< speed:0.5] world!
```

### White Space Delimiters

In cases when a generic text line starts or ends with whitespace (e.g., a space or tab), it can be useful to explicitly delimit where the content to be printed actually begins or ends. This is especially important when using nesting.

Use `[]` (an empty inlined command) as a delimiter for generic text line boundaries:

```nani
; Print "Some text  continuation." (with 2 spaces between)
@group
    ; Preserve whitespace at the end of the first part.
    Some text []
    ; Preserve whitespace at the start of the second part.
    [] continuation.[< join!]
```

## Label Lines

Labels are used as "anchors" for navigating scenario scripts with [@goto] commands. To define a label, start a line with the `#` symbol followed by the label name:

```nani
# Epilogue
```

You can then use the [@goto] command to navigate to that line:

```nani
@goto ScriptPath#Epilogue
```

When both the [@goto] command and the target label are in the same script, you can omit the script path:

```nani
@goto #Epilogue
```

### Scenario Root

The "anchors" you specify with navigation commands are called *endpoints*. An endpoint consists of two parts: *script path* and *label*. The label is optional; when omitted, the endpoint is assumed to point to the start of the script. The script path refers to the scenario file's path (without the `.nani` extension), relative to the *scenario root*.

The scenario root is the top-level directory where all scenario files are stored in the project. For example, consider the following directory structure in a Unity project:

```
Assets
└── Scenario/
    ├── Prologue.nani
    ├── CommonRoute/
    │   ├── Day1/
    │   │   ├── Scene1.nani
    │   │   └── Scene2.nani
    │   └── Day2/
    │       └── Scene1.nani
    └── RouteX/
        └── SceneX.nani
```

In this case, the scenario root is the `Assets/Scenario` directory. To navigate to the `Assets/Scenario/RouteX/SceneX.nani` script file, use the following endpoint: `RouteX/SceneX`.

::: tip
If you prefer not to include directories when specifying endpoints, you don’t have to! Check the [relative](/guide/scenario-scripting#relative-endpoints) and [wildcard](/guide/scenario-scripting#wildcard-endpoints) endpoint syntaxes explained below.
:::

The scenario root is detected automatically when you create or move scenario files. You can check the current root in the script configuration menu.

![?width=715](https://i.gyazo.com/ff701bf560bd56948957b5ad887e3420.png)

### Endpoint Syntax

Naninovel supports four types of endpoint syntax, allowing you to write more concise paths in some cases.

#### Canonical Endpoints

This is the default syntax, containing the full path to the script starting from the [scenario root](/guide/scenario-scripting#scenario-root). It is always supported and does not depend on the location of the current script, but requires including all directories up to the target script:

```nani
; Navigate to the start of the 'Assets/Scenario/Prologue.nani' script.
@goto Prologue
; Navigate to the 'Action' label in
; 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' script.
@goto CommonRoute/Day1/Scene1#Action
```

#### Local Endpoints

This syntax is supported only when navigating to a label inside the current script. It includes only the label:

```nani
; Navigate to 'Action' in the current script.
@goto #Action
```

#### Relative Endpoints

Relative paths simplify endpoint syntax by mapping paths relative to the current script:

```nani
; Given we're inside 'Assets/Scenario/CommonRoute/Day1/Scene1.nani',
; navigate to the 'Scene2.nani' file in the same directory.
@goto ./Scene2
; Navigate to the 'Scene1.nani' file in the parent directory.
@goto ../Day2/Scene1
; Navigate to the 'SceneX.nani' file inside the 'RouteX' directory
; two levels above the current one.
@goto ../../RouteX/SceneX
```

#### Wildcard Endpoints

If you want to avoid including directories in the paths, you can use wildcard paths, specifying only the script name. This works only if the script name is unique across the project:

```nani
; Navigate to the 'Prologue.nani' script, wherever it is located.
@goto */Prologue
; This will result in an error because there are multiple 'Scene1.nani' files.
@goto */Scene1
; This works because there is only one 'Scene1.nani' file under 'Day1' folder.
@goto */Day1/Scene1
```

## Boolean Flags

Use *boolean flags* as shortcuts for boolean parameter values, for example:

```nani
; Make Kohaku character visible.
@char Kohaku visible!
; Equivalent to:
@char Kohaku visible:true

; Make Kohaku character invisible.
@char Kohaku !visible
; Equivalent to:
@char Kohaku visible:false

; Inlined commands support the flags as well.
Lorem ipsum[shake Camera ver! !wait] dolor sit amet.
; Equivalent to:
Lorem ipsum[shake Camera ver:true wait:false] dolor sit amet.
```

The only reasons to use the full boolean form are when you want to evaluate the value dynamically via a [script expression](/guide/script-expressions), e.g.:

```nani
; Make Kohaku visible if the "score" variable is above 10.
@char Kohaku visible:{score>10}
```

— or when a boolean parameter is nameless, e.g.:

```nani
; Disable camera look mode with a nameless parameter.
@look false
```

In the latter case, you can also specify the ID of the nameless parameter and still use the flag:

```nani
; Disable camera look mode with a boolean flag.
@look !enable
```

## Conditional Execution

By default, scripts execute linearly, but you can introduce branching using `if` or `unless` parameters, supported by all commands.

```nani
; If "level" is greater than 9000, add the choice.
@choice "It's over 9000!" if:level>9000

; If "dead" is false, execute the print command.
@print "I'm still alive." if:!dead

; Same but more concise.
@print "I'm still alive." unless:dead

; If "insane" is true or the random function in 1 to 10 range
; returns 5 or more, execute the "@glitch" command.
@glitch if: insane | random(1, 10) >= 5

; If "score" is between 7 and 13 or "lucky" is true,
; navigate to the "LuckyEnd" script.
@goto LuckyEnd if: (score >= 7 & score <= 13) | lucky

; Conditionals in inlined commands.
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; Escape double quotes in expressions.
@print {remark} if: remark = "Saying \"Stop the car\" was a mistake."
```

### Conditional Blocks

You can [nest](/guide/scenario-scripting#nesting) multiline conditional blocks using [@if] and [@else]:

```nani
; Print text line(s) depending on "score" variable:
; "You've failed. Try again!" - when score is below 6.
; "You've passed the test." and "Brilliant!" - when score is above 8.
; "You've passed the test." and "Impressive!" - when score is above 7.
; "You've passed the test." and "Good job!" - otherwise.
@if score > 6
    You've passed the test.
    @if score > 8
        Brilliant!
    @else if: score > 7
        Impressive!
    @else
        Good job!
@else
    You've failed. Try again!
```

Conditional blocks can also be used inline within text lines, marking the end with [@endif]:

```nani
; Print text line depending on "score" variable:
; "Test result: Failed." - when score is below 6.
; "Test result: Perfect!" - when score is above above 8.
; "Test result: Passed." - otherwise.
Test result:[if score>8] Perfect![else if:score>6] Passed.[else] Failed.[endif]
```

To specify an inverse condition, use [@unless]:

```nani
; Prints "You're still alive!" if dead is false, otherwise "You're done."
@unless dead
    You're still alive!
@else
    You're done.

; Print text line depending on "score" variable:
; "Test result: Passed." - when score is 10 or above.
; "Test result: Failed." - when score is below 10.
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

::: info
Find more about conditional expressions and available operators in the [script expressions](/guide/script-expressions) guide.
:::

## Nesting

Commands such as [@if], [@choice], [@while], and several others support associating other commands and generic text lines with them via indentation:

```nani
@if score>10
    @bgm Victory
    Good job, you've passed the test!
```

Here, the [@bgm] command and the following generic text line are associated with the [@if] command.

Commands that support this feature are known as *nested hosts*. In C#, these commands implement the `Command.INestedHost` interface. Host commands control which nested commands are executed, whether they are executed, and in what order.

Each host command has its own behavior when executing nested commands. For example, [@if] skips nested commands if the condition is not met, while [@choice] executes nested commands only when the player selects the associated choice:

```nani
@if score>10
    Good job, you've passed the test!
    @bgm Victory
    @spawn Fireworks
@else if:attempts>100
    You're hopeless... Need help?
    @choice "Yeah, please!"
        @set score+=10
        @goto #BeginTest
    @choice "I'll keep trying."
        @goto #BeginTest
@else
    You've failed. Try again!
    @goto #BeginTest
```

Notice how nested blocks are indented: each level uses exactly **4 spaces**. Tabs or other space lengths will be ignored. Nested blocks of any depth are possible; just increase the indentation by 4 spaces per level.

To group several commands under a single host use [@group] command:

```nani
; The random command chooses one of its nested lines, but ignores any children
; of the nested lines. The group command is used here to combine multiple lines
; so that the random command executes them together.
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## Async Execution

Some commands may execute over time. For example, the [@hide] command will fade out the specified actor over the course of a set time, which can be changed with the `time` parameter. Consider the following scenario:

```nani
@hide Kohaku
@show Yuko
```

— when played, you'll notice that the Yuko actor would start fading in at the same time Kohaku is fading out.  This is because, by default, all async commands are not awaited: [@show] will start fading in Yuko right after [@hide] starts fading out Kohaku.

If you'd like to wait for an async command to complete before proceeding with the playback, use the `wait` parameter:

```nani
@hide Kohaku wait!
@show Yuko
```

— now Yuko will start fading in only after Kohaku is completely faded out.

It's common to use multiple async commands to set up a scene and then wait until they all finish.  To simplify the process, use the [@await] command:

```nani
; Run the nested lines concurrently and wait until they all finish.
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
; Following line will execute after all the above is finished.
It starts raining...
```

### Concurrent Playback

While individual commands are executed asynchronously by default, in some cases you may want to orchestrate a chain of commands to run in parallel with the main scenario, with an independent control flow and playback state.

Use the [@async] command to make the nested lines execute on a dedicated script track, concurrently with the main playback routine.  Common use cases include running composite animations in the background while the scenario progresses as usual:

```nani
; Pan the camera slowly across three points while fading the music.
@async
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!

; The text below prints while the animation above runs independently.
...
```

— or run a chain of commands in a loop:

```nani
@async loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

; The animation above runs in a loop while the text below is printing.
Watch out!
```

Even if the game is saved and loaded while the animation is in progress, it will restore the current playback state and continue the animation from the point where it was at the time of saving. Rollback will work as well.

### Async Tasks

In the loop example above, you may wonder: how are we supposed to stop the loop? Or what if we'd like to await a non-looped async scenario block to finish before proceeding? Async tasks to the rescue! Use the optional nameless parameter of the [@async] command to specify a name for the async task executed by the command, which you can use later with the [@stop] or [@await] commands to either stop (cancel) or await the task:

```nani
; Start the 'Quake' async task.
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

...

; At some point stop the task.
@stop Quake
```

Similarly, you can await async tasks:

```nani
@async CameraPan
    @camera offset:4,1 zoom: 0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!

...

; Before resetting the camera, make sure the pan animation is finished.
@await CameraPan
@camera offset:0,0 zoom:0
```

You can also force a task to complete instantly with the `complete!` flag if you don't want to wait for the remaining duration of the task:

```nani
; Complete the camera animation and reset it instantly.
@await CameraPan complete!
@camera offset:0,0 zoom:0 time:0
```

::: tip

Consider encapsulating common animations or other async tasks in a separate script, which you can then reuse from other scripts with the [@gosub] command:

:::  code-group

```nani [SomeScript.nani]
@gosub FX#Quake
...
@stop Quake

@gosub FX#CameraPan
...
@await CameraPan
```

```nani [FX.nani]
# Quake
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }
@return

# CameraPan
@async CameraPan
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!
@return
```

:::

### Synchronizing Tracks

In some advanced cases, you may want to join (synchronize) concurrently running tracks with each other or with the main track. The [@sync] command can do just that:

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; After 60 seconds, if the 'Boom' task is not stopped,
    ; the @sync command below will forcefully move the main
    ; track here, which will then navigate to the 'BadEnd' script.
    @sync
    @goto BadEnd

; Simulating a series of bomb-defuse puzzles.
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; The 'Boom' async task is stopped, so the main track
; will continue executing without interruption.
@stop Boom
The bomb is defused!
```

— if we didn't use the [@sync] command in our `Boom` async thread, the [@goto] command would be executed on the async track, while the main track would continue executing further, so we'd end up with both `BadEnd` and the main scenario running concurrently. What [@sync] does is forcefully move the target track (the main one by default) to the line where it's used and dispose of the host track, essentially swapping the host track with the target one.

## Text Identification

Features like [script localization](/guide/localization#scripts-localization) and [auto voicing](/guide/voicing#auto-voicing) require associating text written in scenario scripts with other resources — for example, translated text to show instead of the original, or a voice clip to play when the text is printed. For this to work, each such text must be assigned a unique identifier.

By default, Naninovel automatically identifies all localizable text by its content hash when importing script assets. This works fine as long as you don't modify the text. If you do modify it, associations will break: you'll need to re-map auto-voice clips or re-translate changed text statements.

To prevent associations from breaking when editing text, use the text identification utility accessible via `Naninovel -> Tools -> Text Identifier` editor menu; it will auto-generate and write unique IDs to each localizable text in the scenario scripts. The scenario text will have identifiers appended to each localizable parameter, e.g.:

```nani
Kohaku: Hey!|#1|[-] What's up?|#2|
@choice "Option 1|#3|"
@choice "Option 2|#4|"
```

As long as you don't remove or change the IDs, the associations won't break. To make text IDs less distracting, the IDE extension and the Story Editor render them in a dim color.

The utility ensures that all generated text IDs are unique and have not been used before in the script. To track this, it stores the revision numbers in the `NaninovelData/ScriptRevisions` editor asset. Whenever you remove a line with an assigned text ID, you can be confident that this ID won't suddenly appear elsewhere (unless you add it manually).

### Identified Text References

In some rare cases you may want to intentionally duplicate a localizable text identifier — for example, when creating an instance of a command in C# that should reuse the localized parameter specified in a script.

If you simply assign the `LocalizableTextParameter` value, Naninovel will warn about duplicate text IDs. Instead, use the parameter's `Ref()` instance method:

```cs
var print = new PrintText();
print.AuthorLabel = otherPrint.AuthorLabel.Ref();
```

To reference an existing localized text inside a scenario script, append `&` to the identifier:

```nani
; Show choice with "Some Text" and then print the same text.
@choice "Some Text|#SOMEID|"
@print |#&SOMEID|
```

## Title Script

Title script is a special scenario script assigned in the script configuration menu. When assigned, it's automatically played after the engine is initialized or when exiting to the title menu with the [@title] command or with "Title" buttons inside various in-game menus. Title script can be used to set up the title screen scene: background, music, effects, show the Title UI, etc.

The script can also be used to invoke commands when the player clicks "NEW GAME", "EXIT", or any of the save slots to load a game inside the Title UI. Below is an example of a title script.

```nani
; Set up the title menu look.
@back MainMenuBackground
@bgm MainMenuMusic
@spawn Rain
@show TitleUI
@stop

# OnNewGame
; Following commands will be executed when player clicks "NEW GAME".
; Notice that the "stopBgm" command is awaited, so that the music
; is fully stopped before the new game begins to load.
@sfx NewGameSoundEffect
@stopBgm wait!
@stop

# OnLoad
; Below commands will be executed when player loads a saved game.
@sfx LoadGameEffect
@wait 0.5
@stop

# OnExit
; Below commands will be executed when player clicks "EXIT".
@sfx ExitGameEffect
@wait 1.5
@stop
```

## Fountain

[Fountain](https://fountain.io) is a markup syntax for writing and sharing screenplays in human-readable text. It's supported by screenwriting software such as [Highland](https://highland2.app), [Final Draft](https://www.finaldraft.com), and [Scrivener](https://www.literatureandlatte.com/scrivener).

Naninovel provides a tool to convert `.fountain` documents to `.nani` scripts so you can draft the initial scenario for your project in Fountain-compatible software and then move it into Naninovel.

Open the tool from the editor menu: `Naninovel -> Tools -> Fountain Screenplay`. Select the source `.fountain` document and an output folder for the generated `.nani` files, then click "Convert Screenplay".

Fountain's [Action](https://fountain.io/syntax#section-action) and [Dialogue](https://fountain.io/syntax#section-dialogue) paragraphs are converted to [generic text lines](/guide/scenario-scripting.html#generic-text-lines); other syntax constructs are represented as [comment lines](/guide/scenario-scripting.html#comment-lines). If you'd like to split the screenplay into multiple `.nani` scripts, use Fountain's [Section](https://fountain.io/syntax#section-sections) markup. For example, consider the following screenplay:

```
# Episode 1
## Scene 1
...
## Scene 2
...
# Episode 2
## Scene 1
...
```

It will be converted into the following scenario scripts, organized into folders:

- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
