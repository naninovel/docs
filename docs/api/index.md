---
sidebar: auto
---

# API Reference

Script commands API reference. Use the side bar to quickly navigate between available commands. 

~~Strikethrough~~ indicates a nameless parameter, and **bold** stands for required parameter; other parameters should be considered optional. Consult [naninovel scripts guide](/guide/naninovel-scripts.md) in case you have no idea what's this all about.

The following parameters are supported by all the script commands:

<div class=config-table>

ID | Type | Description
--- | --- | ---
if | String |  A boolean [script expression](/guide/script-expressions.md), controlling whether the command should execute.
wait | Boolean | Whether the script player should wait for the async command execution before playing next action. Has no effect when the command is executed instantly.
time | Decimal | Determines for how long (in seconds) command should execute. While formally supported by all the commands not every command actually use this parameter (eg, execution time of instant commands won't be changed).

</div>

This API reference is valid for [Naninovel v1.7.0-beta](https://github.com/Elringus/NaninovelWeb/releases).

## arrange

#### Summary
Arranges specified characters by X-axis.  When no parameters provided, will execute an auto-arrange evenly distributing visible characters by X-axis.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">CharacterPositions</span> | List&lt;Named&lt;Decimal&gt;&gt; | A collection of character ID to scene X-axis position (relative to the left screen border, in percents) named values.  Position 0 relates to the left border and 100 to the right border of the screen; 50 is the center.

</div>

#### Example
```
; Evenly distribute all the visible characters
@arrange

; Place character with ID `Jenna` 15%, `Felix` 50% and `Mia` 85% away
; from the left border of the screen.
@arrange Jenna.15,Felix.50,Mia.85
```

## back

#### Summary
Modifies a [background actor](/guide/backgrounds.md).

#### Remarks
Backgrounds are handled a bit differently from characters. Most of the time we'll only have  one background actor on scene, which will constantly transition to different appearances.  To free the user from always repeating same actor ID in scripts, we allow to  provide only the background appearance and transition type (optional) as a nameless parameter and assume that  `MainBackground` actor should be affected. When this is not the case, ID of the background actor can be explicitly  provided via the `id` parameter.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">AppearanceAndTransition</span> | Named&lt;String&gt; | Appearance to set for the modified background and name of the [transition effect](/guide/background-transition-effects.md) to use.  When transition is not provided, a cross-fade effect will be used by default.
params | List&lt;Decimal&gt; | Parameters of the transition effect.
dissolve | String | Path to the [custom dissolve](/guide/background-transition-effects.md#custom-transition-effects) texture (path should be relative to a `Resources` folder).  Has effect only when the transition is set to `Custom` mode.
id | String | ID of the actor to modify.
appearance | String | Appearance to set for the modified actor.
pos | List&lt;Decimal&gt; | Position (relative to the screen borders, in percents) to set for the modified actor.  Position is described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen.
scale | List&lt;Decimal&gt; | Scale to set for the modified actor.
position | List&lt;Decimal&gt; | Position (in world space) to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
rotation | List&lt;Decimal&gt; | Rotation to set for the modified actor.
tint | String | Tint color to set for the modified actor.  <br /><br />  Strings that begin with `#` will be parsed as hexadecimal in the following way:  `#RGB` (becomes RRGGBB), `#RRGGBB`, `#RGBA` (becomes RRGGBBAA), `#RRGGBBAA`; when alpha is not specified will default to FF.  <br /><br />  Strings that do not begin with `#` will be parsed as literal colors, with the following supported:  red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.

</div>

#### Example
```
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur

; Given an `ExplosionSound` SFX and an `ExplosionSprite` background, the following
; script sequence will simulate two explosions appearing far and close to the camera.
@sfx ExplosionSound volume:0.1
@back id:ExplosionSprite scale:0.3 pos:55,60 time:0 isVisible:false
@back id:ExplosionSprite
@fx ShakeBackground params:,1
@hide ExplosionSprite
@sfx ExplosionSound volume:1.5
@back id:ExplosionSprite pos:65 scale:1
@fx ShakeBackground params:,3
@hide ExplosionSprite
```

## bgm

#### Summary
Plays or modifies currently played BGM (background music) track with the provided name.

#### Remarks
Music tracks are looped by default.  When music track name (BgmPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">BgmPath</span> | String | Path to the music track to play.
volume | Decimal | Volume of the music track.
loop | Boolean | Whether to play the track from beginning when it finishes.

</div>

#### Example
```
; Fades-in a music track with the name `Sanctuary` over default fade duration and plays it in a loop
@bgm Sanctuary

; Same as above, but fade-in duration is 10 seconds and plays only once
@bgm Sanctuary time:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5
```

## br

#### Summary
Adds a line break to the text in active printer.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Count</span> | Integer | Number of line breaks to add.

</div>

#### Example
```
; Second sentence will be printed on a new line
Lorem ipsum dolor sit amet.[br]Consectetur adipiscing elit.

; Second sentence will be printer two lines under the first one
Lorem ipsum dolor sit amet.[br 2]Consectetur adipiscing elit.
```

## camera

#### Summary
Modifies the main camera, changing offset, zoom level and rotation over time.  Check [this video](https://youtu.be/zy28jaMss8w) for a quick demonstration of the command effect.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
offset | List&lt;Decimal&gt; | Local camera position offset in units by X and Y axis.
rotation | Decimal | Local camera rotation by Z-axis in angle degrees (0.0 to 360.0 or -180.0 to 180.0).
zoom | Decimal | Relatize camera zoom (orthographic size scale), in 0.0 to 1.0 range.
toggle | List&lt;String&gt; | Names of the components to toggle (enable if disabled and vice-versa). The components should be attached to the same gameobject as the camera.  This can be used to toggle [custom post-processing effects](/guide/special-effects.md#camera-effects).
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the camera configuration settings.

</div>

#### Example
```
; Offset over X-axis (pan) the camera by -3 units and offset over Y-axis by 1.5 units
@camera offset:-3,1.5

; Zoom-in the camera by 50%.
@camera zoom:0.5

; Rotate the camera by 10 degrees clock-wise
@camera rotation:10

; All the above simultaneously animated over 5 seconds
@camera offset:-3,1.5 zoom:0.5 rotation:10 time:5

; Instantly reset camera to the default state
@camera offset:0,0 zoom:0 rotation:0 time:0

; Toggle `FancyCameraFilter` and `Bloom` components attached to the camera
@camera toggle:FancyCameraFilter,Bloom
```

## char

#### Summary
Modifies a [character actor](/guide/characters.md).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">IdAndAppearance</span> | Named&lt;String&gt; | ID of the actor to modify and the appearance to set.  When appearance is not provided, will use either a `Default` (is exists) or a random one.
look | String | Look direction of the actor; possible options: left, right, center.
avatar | String | Name (path) of the [avatar texture](/guide/characters.md#avatar-textures) to assign for the character.  Use `none` to remove (un-assign) avatar texture from the character.
id | String | ID of the actor to modify.
appearance | String | Appearance to set for the modified actor.
pos | List&lt;Decimal&gt; | Position (relative to the screen borders, in percents) to set for the modified actor.  Position is described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen.
scale | List&lt;Decimal&gt; | Scale to set for the modified actor.
position | List&lt;Decimal&gt; | Position (in world space) to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
rotation | List&lt;Decimal&gt; | Rotation to set for the modified actor.
tint | String | Tint color to set for the modified actor.  <br /><br />  Strings that begin with `#` will be parsed as hexadecimal in the following way:  `#RGB` (becomes RRGGBB), `#RRGGBB`, `#RGBA` (becomes RRGGBBAA), `#RRGGBBAA`; when alpha is not specified will default to FF.  <br /><br />  Strings that do not begin with `#` will be parsed as literal colors, with the following supported:  red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.

</div>

#### Example
```
; Shows character with ID `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:45,10
```

## choice

#### Summary
Adds a choice option to an active (or default) choice handler actor.

#### Remarks
When `goto` parameter is not specified, will continue script execution from the next script line.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">ChoiceSummary</span> | String | Text to show for the choice.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
button | String | Path (relative to a `Resources` folder) to a [button prefab](/guide/choices.md#choice-button) representing the choice.  The prefab should have a `ChoiceHandlerButton` component attached to the root object.  Will use a default button when not provided.
pos | List&lt;Decimal&gt; | Local position of the choice button inside the choice handler (if supported by the handler implementation).
handler | String | ID of the choice handler to add choice for.
goto | Named&lt;String&gt; | Path to go when the choice is selected by user;  See [`@goto`](/api/#goto) command for the path format.
set | String | Set expression to execute when the choice is selected by user;  see [`@set`](/api/#set) command for syntax reference.

</div>

#### Example
```
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[skipInput]
@choice "Continue" goto:.Continue
@choice "Load another from start" goto:AnotherScript
@choice "Load another from \"MyLabel\"" goto:AnotherScript.MyLabel
@stop

; Following example shows how to make an interactive map via `@choice` commands.
; For this example, we assume, that inside a `Resources/MapButtons` folder you've stored prefabs with `ChoiceHandlerButton` component attached to their root objects.
; Please note, that making a custom choice handler is a more appropriate solution for this, unless you can't (or don't want to) mess with C# scripting.
# Map
@back Map
@hideText
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:.ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto.Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto.Map
```

## clearBacklog

#### Summary
Removes all the messages from [printer backlog](/guide/printer-backlog.md).

#### Example
```
@clearBacklog
```

## despawn

#### Summary
Destroys object spawned with [`@spawn`](/api/#spawn) command.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Commands.DestroySpawned.IParameterized` interface, will pass the specified `params` values before destroying the object;  if the component implements `Naninovel.Commands.DestroySpawned.IAwaitable` interface, command execution will wait for  the async completion task returned by the implementation before destroying the object.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to destroy. Path is relative to a `./Resources` folder, eg  given a `Assets/Resources/FX/Explosion.prefab` asset, use the following path to spawn it: `FX/Explosion`.  A [`@spawn`](/api/#spawn) command with the same path is expected to be executed before.
params | List&lt;String&gt; | Parameters to set before destoying the prefab.  Requires the prefab to have a `Naninovel.Commands.DestroySpawned.IParameterized` component attached the root object.

</div>

#### Example
```
; Given a "@spawn Rainbow" command was executed before
@despawn Rainbow
```

## else

#### Summary
Marks a branch of a conditional execution block,  which is always executed in case conditions of the opening [`@if`](/api/#if) and all the preceding [`@elseif`](/api/#elseif) (if any) commands are not met.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

## elseIf

#### Summary
Marks a branch of a conditional execution block,  which is executed in case own condition is met (expression is evaluated to be true), while conditions of the opening [`@if`](/api/#if)  and all the preceding [`@elseif`](/api/#elseif) (if any) commands are not met.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | A [script expression](/guide/script-expressions.md), which should return a boolean value.

</div>

## endIf

#### Summary
Closes an [`@if`](/api/#if) conditional execution block.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

## fx

#### Summary
Spawns a [special effect](/guide/special-effects.md) prefab stored in `./Resources/Naninovel/FX` resources folder.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to spawn. Path is relative to a `./Resources` folder, eg  given a `Assets/Resources/FX/Explosion.prefab` asset, use the following path to spawn it: `FX/Explosion`.
params | List&lt;String&gt; | Parameters to set when spawning the prefab.  Requires the prefab to have a `Naninovel.Commands.Spawn.IParameterized` component attached the root object.

</div>

#### Example
```
; Shakes an active text printer
@fx ShakePrinter

; Applies a glitch effect to the camera
@fx GlitchCamera
```

## gosub

#### Summary
Jumps the naninovel script playback to the provided path and saves the path to the global state;  [`@return`](/api/#return) commands use this info to redirect to command after the last invoked gosub command.  Resembles a function (subroutine) in a programming language, allowing to reuse a piece of naninovel script.  Useful for invoking a repeating set of commands multiple times.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | Path to jump into in the following format: `ScriptName.LabelName`.  When label name is ommited, will play provided script from the start.  When script name is ommited, will attempt to find a label in the currently played script.

</div>

#### Example
```
; Jumps the playback to the label `VictoryScene` in the currently played script,
; executes the commands and jumps back to the command after the `gosub`.
@gosub .VictoryScene
...
@stop

# VictoryScene
@back Victory
@sfx Fireworks
@bgm Fanfares
You are victorious!
@return

; Another example with some branching inside the subroutine.
@set time=10
; Here we get one result
@gosub .Room
...
@set time=3
; And here we get another
@gosub .Room
...

# Room
@print "It's too early, I should visit this place when it's dark." if:time<21&&time>6
@print "I can sense an ominous presence here!" if:time>21&&time<6
@return
```

## goto

#### Summary
Jumps the naninovel script playback to the provided path.  When the path leads to another (not the currently played) naninovel script, will also [reset state](/api/#resetstate)  before loading the target script, unless [ResetStateOnLoad](https://naninovel.com/guide/configuration.html#state) is disabled in the configuration.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | Path to jump into in the following format: `ScriptName.LabelName`.  When label name is ommited, will play provided script from the start.  When script name is ommited, will attempt to find a label in the currently played script.

</div>

#### Example
```
; Loads and starts playing a naninovel script with the name `Script001` from the start.
@goto Script001

; Save as above, but start playing from the label `AfterStorm`.
@goto Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script.
@goto .Epilogue
```

## hide

#### Summary
Hides (removes from scene) an actor with provided ID.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorName</span> | String | ID of the actor to hide.

</div>

#### Example
```
; Given an actor (eg, character, background, text printer, etc) with ID `SomeActor`
; is currently visible on scene, the following command will hide it.
@hide SomeActor
```

## hideAll

#### Summary
Hides (removes) all the actors (eg characters, backgrounds, text printers, choice handlers, etc) on scene.

#### Example
```
@hideAll
```

## hideChars

#### Summary
Hides (removes) all the visible characters on scene.

#### Example
```
@hideChars
```

## hideText

#### Summary
Hides an active printer.

#### Example
```
@hideText
```

## hideUI

#### Summary
Makes a [managed UI](/guide/ui-customization.md) with the provided prefab name invisible.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">UIPrefabName</span> | String | Name of the managed UI prefab to hide.

</div>

#### Example
```
; Given you've added a custom managed UI with prefab name `Calendar`,
; the following will make it invisible on the scene.
@hideUI Calendar
```

## i

#### Summary
Holds script execution until user activates a `continue` input.  Shortcut for `@wait input`.

#### Example
```
; User will have to activate a `continue` input after the first sentence
; for the printer to contiue printing out the following text.
Lorem ipsum dolor sit amet.[i] Consectetur adipiscing elit.
```

## if

#### Summary
Marks the beginning of a conditional execution block.  Should always be closed with an [`@endif`](/api/#endif) command.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | A [script expression](/guide/script-expressions.md), which should return a boolean value.

</div>

## input

#### Summary
Shows an input field UI where user can enter an arbitrary text.  Upon submit the entered text will be assigned to the specified custom variable.  Check out this [video guide](https://youtu.be/F9meuMzvGJw) on usage example.

#### Remarks
The state of the UI is not serialized when saving the game, so make sure to prevent  player from saving the game when the UI is visible (eg, with `@hideText` command).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">VariableName</span> | String | Name of a custom variable to which the entered text will be assigned.
summary | String | An optional summary text to show along with input field.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
play | Boolean | Whether to automatically resume script playback when user submits the input form.

</div>

#### Example
```
; Allow user to enter an arbitrary text and assign it to `name` custom state variable
@input name summary:"Choose your name."
; Stop command is required to halt script execution until user submits the input
@stop

; You can then inject the assigned `name` variable in naninovel scripts
Archibald: Greetings, {name}!
{name}: Yo!

; ...or use it inside set and conditional expressions
@set score=score+1 if:name=="Felix"
```

## lock

#### Summary
Sets an [unlockable item](/guide/unlockable-items.md) with the provided ID to `locked` state.

#### Remarks
The unlocked state of the items is stored in [global scope](/guide/state-management.md#global-state).<br />  In case item with the provided ID is not registered in the global state map,  the corresponding record will automatically be added.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | ID of the unlockable item. Use `all` to lock all the registered unlockable items.

</div>

#### Example
```
@lock CG/FightScene1
```

## movie

#### Summary
Playes a movie with the provided name (path).

#### Remarks
Will fade-out the screen before playing the movie and fade back in after the play.  Playback can be canceled by activating a `cancel` input (`Esc` key by default).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">MovieName</span> | String | Name of the movie resource to play.

</div>

#### Example
```
; Given an "Opening" video clip is added to the movie resources, plays it
@movie Opening
```

## print

#### Summary
Resets the active printer, prints text message and waits for user input.

#### Remarks
This command is used under the hood when processing generic text lines, eg generic line `Kohaku: Hello World!` will be  automatically tranformed into `@print "Hello World!" actor:Kohaku` when parsing the naninovel scripts.<br />  Will cancel the printing (reveal the text at once) on `Continue` and `Skip` inputs.<br />  Will attempt to play corresponding voice clip when [Auto Voicing](/guide/voicing.html#auto-voicing) feature is enabled.<br />  Will attempt to add the printed message to [printer backlog](/guide/printer-backlog.html).<br />  Will attempt to change tint color of the characters, based on [Speaker Highlight](/guide/characters.html#speaker-highlight) feature.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Text</span> | String | Text of the message to print.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
printer | String | ID of the printer actor to use.
actor | String | ID of the actor, which should be associated with the printed message.
reset | Boolean | Whether to reset text of the printer before executing the printing task.
waitInput | Boolean | Whether to wait for user input after finishing the printing task.

</div>

#### Example
```
; Will print the infamous phrase
@print "Lorem ipsum dolor sit amet."
; To include quotes in the text itself, escape them
@print "Saying \"Stop the car\" was a mistake."
```

## printer

#### Summary
Sets printer with the provided ID active and de-activates all the others.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">PrinterId</span> | String | ID of the printer to activate.

</div>

#### Example
```
; Will activate `Dialogue` printer
@printer Dialogue

; Will active `Fullscreen` printer
@printer Fullscreen
```

## processInput

#### Summary
Allows halting and resuming user input processing (eg, reacting to pressing keyboard keys).  The effect of the action is persistent and saved with the game.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">InputEnabled</span> | Boolean | Whether to enable input processing.

</div>

#### Example
```
; Halt input processing
@processInput false
; Resume input processing
@processInput true
```

## resetState

#### Summary
Resets state of all the [engine services](https://naninovel.com/guide/engine-services.html) and unloads (disposes)  all the resources loaded by Naninovel (textures, audio, video, etc); will basically revert to an empty initial engine state.

#### Remarks
The process is asynchronous and is masked with a loading screen ([ILoadingUI](https://naninovel.com/guide/ui-customization.html)).  <br /><br />  When [ResetStateOnLoad](https://naninovel.com/guide/configuration.html#state) is disabled in the configuration, you can use this command  to manually dispose unused resources to prevent memory leak issues.  <br /><br />  Be aware, that this command can not be undone (rewinded back).

#### Example
```
@resetState
```

## resetText

#### Summary
Clears printed text of active printer.

#### Example
```
@resetText
```

## return

#### Summary
Attempts to jump the naninovel script playback to the command after the last used @gosub.  When the target command is not in the currently played script, will also [reset state](/api/#resetstate)  before loading the target script, unless [ResetStateOnLoad](https://naninovel.com/guide/configuration.html#state) is disabled in the configuration.  See [`@gosub`](/api/#gosub) command summary for more info and usage examples.

## save

#### Summary
Automatically save the game to a quick save slot.

#### Example
```
@save
```

## set

#### Summary
Assigns result of a [script expression](/guide/script-expressions.md) to a [custom variable](/guide/custom-variables.md).

#### Remarks
Variable name should be alphanumeric (latin characters only) and can contain underscores, eg: `name`, `Char1Score`, `my_score`;  the names are case-insensitive, eg: `myscore` is equal to `MyScore`. If a variable with the provided name doesn't exist, it will be automatically created.  <br /><br />  It's possible to define multiple set expressions in one line by separating them with `;`. The expressions will be executed in sequence by the order of declaratation.  <br /><br />  Custom variables are stored in **local scope** by default. This means, that if you assign some variable in the course of gameplay  and player starts a new game or loads another saved game slot, where that variable wasn't assigned — the value will be lost.  If you wish to store the variable in **global scope** instead, prepend `G_` or `g_` to its name, eg: `G_FinishedMainRoute` or `g_total_score`.  <br /><br />  You can get and set custom variables in C# scripts via `CustomVariableManager` [engine service](/guide/engine-services.md).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | Set expression.  <br /><br />  The expression should be in the following format: `VariableName=ExpressionBody`, where `VariableName` is the name of the custom  variable to assign and `ExpressionBody` is a [script expression](/guide/script-expressions.md), the result of which should be assigned to the variable.

</div>

#### Example
```
; Assign `foo` variable a `bar` string value
@set foo="bar"

; Assign `foo` variable a 1 number value
@set foo=1

; Assign `foo` variable a `true` boolean value
@set foo=true

; If `foo` is a number, add 0.5 to its value
@set foo=foo+0.5

; If `angle` is a number, assign its cosine to `result` variable
@set result=Cos(angle)

; Get a random integer between -100 and 100, then raise to power of 4 and assign to `result` variable
@set "result = Pow(Random(-100, 100), 4)"

; Assign `foo` variable value of the `bar` variable, which is `Hello World!`.
; Notice, that `bar` variable should actually exist, otherwise `bar` plain text value will be assigned instead.
@set bar="Hello World!"
@set foo=bar

; Defining multiple set expressions in one line (the result will be the same as above)
@set bar="Hello World!";foo=bar

; It's possible to inject variables to naninovel script command parameters
@set scale=0
# EnlargeLoop
@char Misaki.Default scale:{scale}
@set scale=scale+0.1
@goto .EnlargeLoop if:scale<1

; ..and generic text lines
@set name="Dr. Stein";drink="Dr. Pepper"
{name}: My favourite drink is {drink}!

; When using double quotes inside the expression itself, don't forget to double-escape them
@set remark="Saying \\"Stop the car\\" was a mistake."
```

## sfx

#### Summary
Plays or modifies currently played SFX (sound effect) track with the provided name.

#### Remarks
Sound effect tracks are not looped by default.  When sfx track name (SfxPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | Path to the sound effect asset to play.
volume | Decimal | Volume of the sound effect.
loop | Boolean | Whether to play the sound effect in a loop.

</div>

#### Example
```
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@sfx Rain loop:true

; Changes volume of all the played SFX tracks to 75% over 2.5 seconds and disables looping for all of them
@sfx volume:0.75 loop:false time:2.5
```

## showText

#### Summary
Shows an active or default text printer.

#### Example
```
@showText
```

## showUI

#### Summary
Makes a [managed UI](/guide/ui-customization.md) with the provided prefab name visible.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">UIPrefabName</span> | String | Name of the managed UI prefab to make visible.

</div>

#### Example
```
; Given you've added a custom managed UI with prefab name `Calendar`,
; the following will make it visible on the scene.
@showUI Calendar
```

## skipInput

#### Summary
Next call to `Naninovel.ScriptPlayer.EnableWaitingForInput` will be ignored.

#### Example
```
; User won't have to activate a `continue` input in order to progress to the `@sfx` command.
And the rain starts.[skipInput]
@sfx Rain
```

## spawn

#### Summary
Spawns a prefab stored in project resources.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Commands.Spawn.IParameterized` interface, will pass the specified `params` values after the spawn;  if the component implements `Naninovel.Commands.Spawn.IAwaitable` interface, command execution will wait for  the async completion task returned by the implementation.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to spawn. Path is relative to a `./Resources` folder, eg  given a `Assets/Resources/FX/Explosion.prefab` asset, use the following path to spawn it: `FX/Explosion`.
params | List&lt;String&gt; | Parameters to set when spawning the prefab.  Requires the prefab to have a `Naninovel.Commands.Spawn.IParameterized` component attached the root object.

</div>

#### Example
```
; Given the project contains an `Assets/Resources/Rain.prefab` asset, spawn it
@spawn Rain
```

## stop

#### Summary
Stops the naninovel script execution.

#### Example
```
@stop
```

## stopBgm

#### Summary
Stops playing a BGM (background music) track with the provided name.

#### Remarks
When music track name (BgmPath) is not specified, will stop all the currently played tracks.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">BgmPath</span> | String | Path to the music track to stop.

</div>

#### Example
```
; Fades-out the `Promenade` music track over 10 seconds and stops the playback
@stopBgm Promenade time:10

; Stops all the currently played music tracks
@stopBgm
```

## stopFx

#### Summary
Stops [special effect](/guide/special-effects.md) started with [`@fx`](/api/#fx) command by destroying spawned object of the corresponding FX prefab.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Path to the prefab resource to destroy. Path is relative to a `./Resources` folder, eg  given a `Assets/Resources/FX/Explosion.prefab` asset, use the following path to spawn it: `FX/Explosion`.  A [`@spawn`](/api/#spawn) command with the same path is expected to be executed before.
params | List&lt;String&gt; | Parameters to set before destoying the prefab.  Requires the prefab to have a `Naninovel.Commands.DestroySpawned.IParameterized` component attached the root object.

</div>

#### Example
```
; Given a "Rain" FX was started with "@fx" command
@stopfx Rain
```

## stopSfx

#### Summary
Stops playing an SFX (sound effect) track with the provided name.

#### Remarks
When sound effect track name (SfxPath) is not specified, will stop all the currently played tracks.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | Path to the sound effect to stop.

</div>

#### Example
```
; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds.
@stopSfx Rain fadeTime:15

; Stops all the currently played sound effect tracks
@stopSfx
```

## stopVoice

#### Summary
Stops playback of the currently played voice clip.

## style

#### Summary
Applies text style to the active printer.

#### Remarks
You can still use rich text formatting tags directly, but they will be printed  alongside normal text, which is not desirable in most cases.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">TextStyles</span> | List&lt;String&gt; | Text formatting styles to apply.  Possible options: color hex code (eg, #ffaa00), bold, italic, px text size (eg 45).

</div>

#### Example
```
; Print first sentence in bold red text with 45px size,
; then reset the style and print second sentence using default style.
@style #ff0000,bold,45
Lorem ipsum dolor sit amet.
@style default
Consectetur adipiscing elit.

; Print first sentence normally, but second one in bold and italic;
; then reset the style to the default.
Lorem ipsum sit amet. [style bold,italic]Consectetur adipiscing elit.[style default]
```

## title

#### Summary
Loads default engine state and shows `Naninovel.UI.ITitleUI`.

#### Example
```
@title
```

## unlock

#### Summary
Sets an [unlockable item](/guide/unlockable-items.md) with the provided ID to `unlocked` state.

#### Remarks
The unlocked state of the items is stored in [global scope](/guide/state-management.md#global-state).<br />  In case item with the provided ID is not registered in the global state map,  the corresponding record will automatically be added.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | ID of the unlockable item. Use `all` to unlock all the registered unlockable items.

</div>

#### Example
```
@unlock CG/FightScene1
```

## voice

#### Summary
Plays a voice clip at the provided path.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">VoicePath</span> | String | Path to the voice clip to play.
volume | Decimal | Volume of the playback.

</div>

## wait

#### Summary
Holds script execution until the specified wait condition.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">WaitMode</span> | String | Wait condition:  input (string) - user press continue or skip input key;  number (int or float)  - timer (seconds).

</div>

#### Example
```
; `ThunderSound` SFX will play 0.5 seconds after the shake background effect finishes.
@fx ShakeBackground
@wait 0.5
@sfx ThunderSound
```

