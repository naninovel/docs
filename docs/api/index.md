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
wait | Boolean | Whether the script player should wait for the async command to finish execution before executing the next one. Has no effect when the command is executed instantly.

</div>

::: note
This API reference is valid for [Naninovel v1.13](https://github.com/Elringus/NaninovelWeb/releases).
:::

## animate

#### Summary
Animate properties of the actors with the specified IDs via key frames.  Key frames for the animated parameters are delimited with `|` literals.

#### Remarks
Be aware, that this command searches for actors with the provided IDs over all the actor managers,  and in case multiple actors with the same ID exist (eg, a character and a text printer), this will affect only the first found one.  <br /><br />  When running the animate commands in parallel (`wait` is set to false) the affected actors state can mutate unpredictably.  This could cause unexpected results when rolling back or performing other commands that affect state of the actor. Make sure to reset  affected properties of the animated actors (position, tint, appearance, etc) after the command finishes or use `@animate CharacterId`  (without any args) to stop the animation prematurely.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | IDs of the actors to animate.
loop | Boolean | Whether to loop the animation; make sure to set `wait` to false when loop is enabled,  otherwise script playback will loop indefinitely.
appearance | String | Appearances to set for the animated actors.
transition | String | Type of the [transition effect](/guide/transition-effects.md) to use when animating appearance change (crossfade is used by default).
visibility | String | Visibility status to set for the animated actors.
posX | String | Position values over X-axis (in 0 to 100 range, in percents from the left border of the screen) to set for the animated actors.
posY | String | Position values over Y-axis (in 0 to 100 range, in percents from the bottom border of the screen) to set for the animated actors.
posZ | String | Position values over Z-axis (in world space) to set for the animated actors; while in ortho mode, can only be used for sorting.
rotation | String | Rotation values (over Z-axis) to set for the animated actors.
scale | String | Scale values (uniform) to set for the animated actors.
tint | String | Tint colors to set for the animated actors.  <br /><br />  Strings that begin with `#` will be parsed as hexadecimal in the following way:  `#RGB` (becomes RRGGBB), `#RRGGBB`, `#RGBA` (becomes RRGGBBAA), `#RRGGBBAA`; when alpha is not specified will default to FF.  <br /><br />  Strings that do not begin with `#` will be parsed as literal colors, with the following supported:  red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta.
easing | String | Names of the easing functions to use for the animations.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.
time | String | Duration of the animations per key, in seconds.  When a key value is missing, will use one from a previous key.  When not assigned, will use 0.35 seconds duration for all keys.

</div>

#### Example
```nani
; Animate `Kohaku` actor over three animation steps (key frames),
; changing positions: first step will take 1, second — 0.5 and third — 3 seconds.
@animate Kohaku posX:50|0|85 time:1|0.5|3

; Start loop animations of `Yuko` and `Kohaku` actors; notice, that you can skip
; key values indicating that the parameter shouldn't change during the animation step.
@animate Kohaku,Yuko loop:true appearance:Surprise|Sad|Default|Angry transition:DropFade|Ripple|Pixelate posX:15|85|50 posY:0|-25|-85 scale:1|1.25|1.85 tint:#25f1f8|lightblue|#ffffff|olive easing:EaseInBounce|EaseInQuad time:3|2|1|0.5 wait:false
...
; Stop the animations.
@animate Yuko,Kohaku loop:false

; Start a long background animation for `Kohaku`.
@animate Kohaku posX:90|0|90 scale:1|2|1 time:10 wait:false
; Do something else while the animation is running.
...
; Here we're going to set a specific position for the character,
; but the animation could still be running in background, so reset it first.
@animate Kohaku
; Now it's safe to modify previously animated properties.
@char Kohaku pos:50 scale:1
```

## append

#### Summary
Appends provided text to a text printer.

#### Remarks
The entire text will be appended immediately, without triggering reveal effect or any other side-effects.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Text</span> | String | The text to append.
printer | String | ID of the printer actor to use. Will use a a default one when not provided.
author | String | ID of the actor, which should be associated with the appended text.

</div>

#### Example
```nani
; Print first part of the sentence as usual (gradually revealing the message),
; then append the end of the sentence at once.
Lorem ipsum
@append " dolor sit amet."
```

## arrange

#### Summary
Arranges specified characters by X-axis.  When no parameters provided, will execute an auto-arrange evenly distributing visible characters by X-axis.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">CharacterPositions</span> | List&lt;Named&lt;Decimal&gt;&gt; | A collection of character ID to scene X-axis position (relative to the left screen border, in percents) named values.  Position 0 relates to the left border and 100 to the right border of the screen; 50 is the center.
look | Boolean | When performing auto-arrange, controls whether to also make the characters look at the scene origin (enabled by default).
time | Decimal | Duration (in seconds) of the arrangement animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
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
Backgrounds are handled a bit differently from characters to better accommodate traditional VN game flow.  Most of the time you'll probably have a single background actor on scene, which will constantly transition to different appearances.  To remove the hassle of repeating same actor ID in scripts, it's possible to provide only  the background appearance and transition type (optional) as a nameless parameter assuming `MainBackground`  actor should be affected. When this is not the case, ID of the background actor can be explicitly provided via the `id` parameter.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">AppearanceAndTransition</span> | Named&lt;String&gt; | Appearance (or [pose](/guide/backgrounds.md#poses)) to set for the modified background and type of a [transition effect](/guide/transition-effects.md) to use.  When transition is not provided, a cross-fade effect will be used by default.
pos | List&lt;Decimal&gt; | Position (relative to the screen borders, in percents) to set for the modified actor.  Position is described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen.  Use Z-component (third member, eg `,,10`) to move (sort) by depth while in ortho mode.
id | String | ID of the actor to modify; specify `*` to affect all visible actors.
appearance | String | Appearance (or pose) to set for the modified actor.
transition | String | Type of the [transition effect](/guide/transition-effects.md) to use (crossfade is used by default).
params | List&lt;Decimal&gt; | Parameters of the transition effect.
dissolve | String | Path to the [custom dissolve](/guide/transition-effects.md#custom-transition-effects) texture (path should be relative to a `Resources` folder).  Has effect only when the transition is set to `Custom` mode.
visible | Boolean | Visibility status to set for the modified actor.
position | List&lt;Decimal&gt; | Position (in world space) to set for the modified actor.  Use Z-component (third member) to move (sort) by depth while in ortho mode.
rotation | List&lt;Decimal&gt; | Rotation to set for the modified actor.
scale | List&lt;Decimal&gt; | Scale to set for the modified actor.
tint | String | Tint color to set for the modified actor.  <br /><br />  Strings that begin with `#` will be parsed as hexadecimal in the following way:  `#RGB` (becomes RRGGBB), `#RRGGBB`, `#RGBA` (becomes RRGGBBAA), `#RRGGBBAA`; when alpha is not specified will default to FF.  <br /><br />  Strings that do not begin with `#` will be parsed as literal colors, with the following supported:  red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur

; Tint all visible backgrounds on scene.
@back id:* tint:#ffdc22

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
Plays or modifies currently played [BGM (background music)](/guide/audio.md#background-music) track with the provided name.

#### Remarks
Music tracks are looped by default.  When music track name (BgmPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">BgmPath</span> | String | Path to the music track to play.
intro | String | Path to the intro music track to play once before the main track (not affected by the loop parameter).
volume | Decimal | Volume of the music track.
loop | Boolean | Whether to play the track from beginning when it finishes.
fade | Decimal | Duration of the volume fade-in when starting playback, in seconds (0.0 by default);  doesn't have effect when modifying a playing track.
group | String | Audio mixer [group path](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) that should be used when playing the audio.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Starts playing a music track with the name `Sanctuary` in a loop
@bgm Sanctuary

; Same as above, but fades-in the volume over 10 seconds and plays only once
@bgm Sanctuary fade:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5

; Plays `BattleThemeIntro` once and then immediately `BattleThemeMain` in a loop.
@bgm BattleThemeMain intro:BattleThemeIntro
```

## br

#### Summary
Adds a line break to a text printer.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Count</span> | Integer | Number of line breaks to add.
printer | String | ID of the printer actor to use. Will use a default one when not provided.
author | String | ID of the actor, which should be associated with the appended line break.

</div>

#### Example
```nani
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
offset | List&lt;Decimal&gt; | Local camera position offset in units by X,Y,Z axes.
roll | Decimal | Local camera rotation by Z-axis in angle degrees (0.0 to 360.0 or -180.0 to 180.0).  The same as third component of `rotation` parameter; ignored when `rotation` is specified.
rotation | List&lt;Decimal&gt; | Local camera rotation over X,Y,Z-axes in angle degrees (0.0 to 360.0 or -180.0 to 180.0).
zoom | Decimal | Relative camera zoom (orthographic size or field of view, depending on the render mode), in 0.0 (no zoom) to 1.0 (full zoom) range.
ortho | Boolean | Whether the camera should render in orthographic (true) or perspective (false) mode.
toggle | List&lt;String&gt; | Names of the components to toggle (enable if disabled and vice-versa). The components should be attached to the same game object as the camera.  This can be used to toggle [custom post-processing effects](/guide/special-effects.md#camera-effects).
set | List&lt;Named&lt;Boolean&gt;&gt; | Names of the components to enable or disable. The components should be attached to the same game object as the camera.  This can be used to explicitly enable or disable [custom post-processing effects](/guide/special-effects.md#camera-effects).  Specified components enabled state will override effect of `toggle` parameter.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the camera configuration settings.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Offset over X-axis (pan) the camera by -3 units and offset over Y-axis by 1.5 units
@camera offset:-3,1.5

; Set camera in perspective mode, zoom-in by 50% and move back by 5 units
@camera ortho:false offset:,,-5 zoom:0.5

; Set camera in orthographic mode and roll by 10 degrees clock-wise
@camera ortho:true roll:10

; Offset, zoom and roll simultaneously animated over 5 seconds
@camera offset:-3,1.5 zoom:0.5 roll:10 time:5

; Instantly reset camera to the default state
@camera offset:0,0 zoom:0 rotation:0,0,0 time:0

; Toggle `FancyCameraFilter` and `Bloom` components attached to the camera
@camera toggle:FancyCameraFilter,Bloom

; Set `FancyCameraFilter` component enabled and `Bloom` disabled
@camera set:FancyCameraFilter.true,Bloom.false
```

## char

#### Summary
Modifies a [character actor](/guide/characters.md).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">IdAndAppearance</span> | Named&lt;String&gt; | ID of the character to modify (specify `*` to affect all visible characters) and an appearance (or [pose](/guide/characters.md#poses)) to set.  When appearance is not provided, will use either a `Default` (is exists) or a random one.
look | String | Look direction of the actor; supported values: left, right, center.
avatar | String | Name (path) of the [avatar texture](/guide/characters.md#avatar-textures) to assign for the character.  Use `none` to remove (un-assign) avatar texture from the character.
pos | List&lt;Decimal&gt; | Position (relative to the screen borders, in percents) to set for the modified actor.  Position is described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen.  Use Z-component (third member, eg `,,10`) to move (sort) by depth while in ortho mode.
id | String | ID of the actor to modify; specify `*` to affect all visible actors.
appearance | String | Appearance (or pose) to set for the modified actor.
transition | String | Type of the [transition effect](/guide/transition-effects.md) to use (crossfade is used by default).
params | List&lt;Decimal&gt; | Parameters of the transition effect.
dissolve | String | Path to the [custom dissolve](/guide/transition-effects.md#custom-transition-effects) texture (path should be relative to a `Resources` folder).  Has effect only when the transition is set to `Custom` mode.
visible | Boolean | Visibility status to set for the modified actor.
position | List&lt;Decimal&gt; | Position (in world space) to set for the modified actor.  Use Z-component (third member) to move (sort) by depth while in ortho mode.
rotation | List&lt;Decimal&gt; | Rotation to set for the modified actor.
scale | List&lt;Decimal&gt; | Scale to set for the modified actor.
tint | String | Tint color to set for the modified actor.  <br /><br />  Strings that begin with `#` will be parsed as hexadecimal in the following way:  `#RGB` (becomes RRGGBB), `#RRGGBB`, `#RGBA` (becomes RRGGBBAA), `#RRGGBBAA`; when alpha is not specified will default to FF.  <br /><br />  Strings that do not begin with `#` will be parsed as literal colors, with the following supported:  red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Shows character with ID `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:45,10

; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0

; Tint all visible characters on scene.
@char * tint:#ffdc22
```

## choice

#### Summary
Adds a [choice](/guide/choices.md) option to a choice handler with the specified ID (or default one).

#### Remarks
When `goto`, `gosub` and `do` parameters are not specified, will continue script execution from the next script line.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">ChoiceSummary</span> | String | Text to show for the choice.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
button | String | Path (relative to a `Resources` folder) to a [button prefab](/guide/choices.md#choice-button) representing the choice.  The prefab should have a `ChoiceHandlerButton` component attached to the root object.  Will use a default button when not provided.
pos | List&lt;Decimal&gt; | Local position of the choice button inside the choice handler (if supported by the handler implementation).
handler | String | ID of the choice handler to add choice for. Will use a default handler if not provided.
goto | Named&lt;String&gt; | Path to go when the choice is selected by user;  see [@goto] command for the path format.
gosub | Named&lt;String&gt; | Path to a subroutine to go when the choice is selected by user;  see [@gosub] command for the path format. When `goto` is assigned this parameter will be ignored.
set | String | Set expression to execute when the choice is selected by user;  see [@set] command for syntax reference.
do | List&lt;String&gt; | Script commands to execute when the choice is selected by user;  don't forget to escape commas inside list values to prevent them being treated as delimiters.  The commands will be invoked in order after `set`, `goto` and `gosub` are handled (if assigned).
play | Boolean | Whether to automatically continue playing script from the next line,  when neither `goto` nor `gosub` parameters are specified.  Has no effect in case the script is already playing when the choice is processed.
show | Boolean | Whether to also show choice handler the choice is added for;  enabled by default.
time | Decimal | Duration (in seconds) of the fade-in (reveal) animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or ...?[skipInput]
@choice "Continue"
@choice "Load another script from start" goto:AnotherScript
@choice "Load another script from \"MyLabel\" label" goto:AnotherScript.MyLabel
@choice "Goto to \"MySub\" subroutine in another script" gosub:AnotherScript.MySub
@stop

; You can also set custom variables based on choices.
@choice "I'm humble, one is enough..." set:score++
@choice "Two, please." set:score=score+2
@choice "I'll take the entire stock!" set:karma--;score=999

; Play a sound effect and arrange characters when choice is picked
@choice "Arrange" do:"@sfx Click, @arrange k.10\,y.55"

; Print a text line corresponding to the picked choice
@choice "Ask about color" do:"What's your favorite color?"
@choice "Ask about age" do:"How old are you?"
@choice "Keep silent" do:"..."
@stop

; Following example shows how to make an interactive map via `@choice` commands.
; For this example, we assume, that inside a `Resources/MapButtons` folder you've
; stored prefabs with `ChoiceHandlerButton` component attached to their root objects.
# Map
@back Map
@hidePrinter
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

## clearBacklog

#### Summary
Removes all the messages from [printer backlog](/guide/text-printers.md#printer-backlog).

#### Example
```nani
@clearBacklog
```

## clearChoice

#### Summary
Removes all the choice options in the choice handler with the provided ID (or in default one, when ID is not specified;  or in all the existing handlers, when `*` is specified as ID) and (optionally) hides it (them).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">HandlerId</span> | String | ID of the choice handler to clear. Will use a default handler if not provided.  Specify `*` to clear all the existing handlers.
hide | Boolean | Whether to also hide the affected choice handlers.

</div>

#### Example
```nani
; Add choices and remove them after a set time (in case the player didn't pick one).
# Start
You have 2 seconds to respond![skipInput]
@choice "Cats" goto:.PickedChoice
@choice "Dogs" goto:.PickedChoice
@wait 2
@clearChoice
Too late!
@goto .Start
# PickedChoice
Good!
```

## despawn

#### Summary
Destroys an object spawned with [@spawn] command.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Commands.DestroySpawned.IParameterized` interface, will pass the specified `params` values before destroying the object;  if the component implements `Naninovel.Commands.DestroySpawned.IAwaitable` interface, command execution will wait for  the async completion task returned by the implementation before destroying the object.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Name (path) of the prefab resource to destroy.  A [@spawn] command with the same parameter is expected to be executed before.
params | List&lt;String&gt; | Parameters to set before destroying the prefab.  Requires the prefab to have a `Naninovel.Commands.DestroySpawned.IParameterized` component attached the root object.

</div>

#### Example
```nani
; Given a "@spawn Rainbow" command was executed before
@despawn Rainbow
```

## else

#### Summary
Marks a branch of a conditional execution block,  which is always executed in case conditions of the opening [@if] and all the preceding [@elseif] (if any) commands are not met.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

## elseIf

#### Summary
Marks a branch of a conditional execution block,  which is executed in case own condition is met (expression is evaluated to be true), while conditions of the opening [@if]  and all the preceding [@elseif] (if any) commands are not met.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | A [script expression](/guide/script-expressions.md), which should return a boolean value.

</div>

## endIf

#### Summary
Closes an [@if] conditional execution block.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

## finishTrans

#### Summary
Finishes scene transition started with [@startTrans] command;  see the start command reference for more information and usage examples.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Transition</span> | String | Type of the [transition effect](/guide/transition-effects.md) to use (crossfade is used by default).
params | List&lt;Decimal&gt; | Parameters of the transition effect.
dissolve | String | Path to the [custom dissolve](/guide/transition-effects.md#custom-transition-effects) texture (path should be relative to a `Resources` folder).  Has effect only when the transition is set to `Custom` mode.
easing | String | Name of the easing function to use for the modification.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.
time | Decimal | Duration (in seconds) of the transition. Default value: 0.35 seconds.

</div>

## gosub

#### Summary
Navigates naninovel script playback to the provided path and saves that path to global state;  [@return] commands use this info to redirect to command after the last invoked gosub command.  Designed to serve as a function (subroutine) in a programming language, allowing to reuse a piece of naninovel script.  Useful for invoking a repeating set of commands multiple times.

#### Remarks
It's possible to declare a gosub outside of the currently played script and use it from any other scripts;  by default state reset won't happen when you're loading another script to play a gosub or returning back to  prevent delays and loading screens. Be aware though, that all the resources referenced in gosub script will be  held until the next state reset.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | Path to navigate into in the following format: `ScriptName.LabelName`.  When label name is omitted, will play provided script from the start.  When script name is omitted, will attempt to find a label in the currently played script.
reset | List&lt;String&gt; | When specified, will reset the engine services state before loading a script (in case the path is leading to another script).  Specify `*` to reset all the services, or specify service names to exclude from reset.  By default, the state does not reset.

</div>

#### Example
```nani
; Navigate the playback to the label `VictoryScene` in the currently played script,
; executes the commands and navigates back to the command after the `gosub`.
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
Navigates naninovel script playback to the provided path.  When the path leads to another (not the currently played) naninovel script, will also [reset state](/api/#resetstate)  before loading the target script, unless [Reset On Goto](https://naninovel.com/guide/configuration.html#state) is disabled in the configuration.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | Path to navigate into in the following format: `ScriptName.LabelName`.  When label name is omitted, will play provided script from the start.  When script name is omitted, will attempt to find a label in the currently played script.
reset | List&lt;String&gt; | When specified, will control whether to reset the engine services state before loading a script (in case the path is leading to another script):<br />  - Specify `*` to reset all the services, except the ones with `Goto.DontReset` attribute.<br />  - Specify service type names (separated by comma) to exclude from reset; all the other services will be reset, including the ones with `Goto.DontReset` attribute.<br />  - Specify `-` to force no reset (even if it's enabled by default in the configuration).<br /><br />  Notice, that while some services have `Goto.DontReset` attribute applied (eg, `CustomVariableManager`) and are not reset by default, they should still be specified when excluding other services from reset; see the below example on excluding audio manager.<br />  Be aware, that excluding a service from reset will leave related resources in memory; find more details in the [engine services guide](/guide/engine-services.md#reset-on-goto).

</div>

#### Example
```nani
; Loads and starts playing a naninovel script with the name `Script001` from the start.
@goto Script001

; Save as above, but start playing from the label `AfterStorm`.
@goto Script001.AfterStorm

; Navigates the playback to the label `Epilogue` in the currently played script.
@goto .Epilogue

; Load Script001, but don't reset audio (playing tracks won't be interrupted)
; and custom variable manager services.
@goto Script001 reset:IAudioManager,ICustomVariableManager
```

## hide

#### Summary
Hides (makes invisible) actors (character, background, text printer, choice handler, etc) with the specified IDs.  In case multiple actors with the same ID found (eg, a character and a printer), will affect only the first found one.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | IDs of the actors to hide.
time | Decimal | Duration (in seconds) of the fade animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Given an actor with ID `SomeActor` is visible, hide (fade-out) it over 3 seconds.
@hide SomeActor time:3

; Hide `Kohaku` and `Yuko` actors.
@hide Kohaku,Yuko
```

## hideAll

#### Summary
Hides (removes) all the actors (eg characters, backgrounds, text printers, choice handlers, etc) on scene.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
time | Decimal | Duration (in seconds) of the fade animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
@hideAll
```

## hideChars

#### Summary
Hides (removes) all the visible characters on scene.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
time | Decimal | Duration (in seconds) of the fade animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
@hideChars
```

## hidePrinter

#### Summary
Hides a text printer.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | ID of the printer actor to use. Will use a default one when not provided.
time | Decimal | Duration (in seconds) of the hide animation.  Default value for each printer is set in the actor configuration.

</div>

#### Example
```nani
; Hide a default printer.
@hidePrinter
; Hide printer with ID `Wide`.
@hidePrinter Wide
```

## hideUI

#### Summary
Makes [UI elements](/guide/user-interface.md#ui-customization) with the specified names invisible.  When no names are specified, will stop rendering (hide) the entire UI (including all the built-in UIs).

#### Remarks
When hiding the entire UI with this command and `allowToggle` parameter is false (default), user won't be able to re-show the UI  back with hotkeys or by clicking anywhere on the screen; use [@showUI] command to make the UI visible again.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">UINames</span> | List&lt;String&gt; | Name of the UI elements to hide.
allowToggle | Boolean | When hiding the entire UI, controls whether to allow the user to re-show the UI with hotkeys or by clicking anywhere on the screen (false by default).  Has no effect when hiding a particular UI.
time | Decimal | Duration (in seconds) of the hide animation.  When not specified, will use UI-specific duration.

</div>

#### Example
```nani
; Given a custom `Calendar` UI, the following command will hide it.
@hideUI Calendar

; Hide the entire UI, won't allow user to re-show it
@hideUI
...
; Make the UI visible again
@showUI

; Hide the entire UI, but allow the user to toggle it back
@hideUI allowToggle:true

; Simultaneously hide built-in `TipsUI` and custom `Calendar` UIs.
@hideUI TipsUI,Calendar
```

## i

#### Summary
Holds script execution until user activates a `continue` input.  Shortcut for `@wait i`.

#### Example
```nani
; User will have to activate a `continue` input after the first sentence
; for the printer to continue printing out the following text.
Lorem ipsum dolor sit amet.[i] Consectetur adipiscing elit.
```

## if

#### Summary
Marks the beginning of a conditional execution block.  Should always be closed with an [@endif] command.  For usage examples see [conditional execution](/guide/naninovel-scripts.md#conditional-execution) guide.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | A [script expression](/guide/script-expressions.md), which should return a boolean value.

</div>

## input

#### Summary
Shows an input field UI where user can enter an arbitrary text.  Upon submit the entered text will be assigned to the specified custom variable.

#### Remarks
Check out this [video guide](https://youtu.be/F9meuMzvGJw) on usage example.  <br /><br />  To assign a display name for a character using this command consider [binding the name to a custom variable](/guide/characters.html#display-names).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">VariableName</span> | String | Name of a custom variable to which the entered text will be assigned.
summary | String | An optional summary text to show along with input field.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
value | String | A predefined value to set for the input field.
play | Boolean | Whether to automatically resume script playback when user submits the input form.

</div>

#### Example
```nani
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

## lipSync

#### Summary
Allows to force-stop the lip sync mouth animation for a character with the provided ID; when stopped, the animation  won't start again, until this command is used again to allow it.  The character should be able to receive the lip sync events (currently generic and Live2D implementations only).  See [characters guide](/guide/characters.md#lip-sync) for more information on lip sync feature.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">CharIdAndAllow</span> | Named&lt;Boolean&gt; | Character ID followed by a boolean (true or false) on whether to halt or allow the lip sync animation.

</div>

#### Example
```nani
; Given auto voicing is disabled and lip sync is driven by text messages,
; exclude punctuation from the mouth animation.
Kohaku: Lorem ipsum dolor sit amet[lipSync Kohaku.false]... [lipSync Kohaku.true]Consectetur adipiscing elit.
```

## loadScene

#### Summary
Loads a [Unity scene](https://docs.unity3d.com/Manual/CreatingScenes.html) with the provided name.  Don't forget to add the required scenes to the [build settings](https://docs.unity3d.com/Manual/BuildSettings.html) to make them available for loading.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">SceneName</span> | String | Name of the scene to load.
additive | Boolean | Whether to load the scene additively, or unload any currently loaded scenes before loading the new one (default).  See the [load scene documentation](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html) for more information.

</div>

#### Example
```nani
; Load scene "MyTestScene" in single mode
@loadScene MyTestScene
; Load scene "MyTestScene" in additive mode
@loadScene MyTestScene additive:true
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
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | ID of the unlockable item. Use `*` to lock all the registered unlockable items.

</div>

#### Example
```nani
@lock CG/FightScene1
```

## look

#### Summary
Activates/disables camera look mode, when player can offset the main camera with input devices  (eg, by moving a mouse or using gamepad analog stick).  Check [this video](https://youtu.be/rC6C9mA7Szw) for a quick demonstration of the command.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
enable | Boolean | Whether to enable or disable the camera look mode. Default: true.
zone | List&lt;Decimal&gt; | A bound box with X,Y sizes in units from the initial camera position,  describing how far the camera can be moved. Default: 5,3.
speed | List&lt;Decimal&gt; | Camera movement speed (sensitivity) by X,Y axes. Default: 1.5,1.
gravity | Boolean | Whether to automatically move camera to the initial position when the look input is not active  (eg, mouse is not moving or analog stick is in default position). Default: false.

</div>

#### Example
```nani
; Activate camera look mode with default parameters
@look

; Activate camera look mode with custom parameters
@look zone:6.5,4 speed:3,2.5 gravity:true

; Disable camera look mode and reset camera offset
@look enabled:false
@camera offset:0,0
```

## movie

#### Summary
Plays a movie with the provided name (path).

#### Remarks
Will fade-out the screen before playing the movie and fade back in after the play.  Playback can be canceled by activating a `cancel` input (`Esc` key by default).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">MovieName</span> | String | Name of the movie resource to play.

</div>

#### Example
```nani
; Given an "Opening" video clip is added to the movie resources, plays it
@movie Opening
```

## print

#### Summary
Prints (reveals over time) specified text message using a text printer actor.

#### Remarks
This command is used under the hood when processing generic text lines, eg generic line `Kohaku: Hello World!` will be  automatically transformed into `@print "Hello World!" author:Kohaku` when parsing the naninovel scripts.<br />  Will reset (clear) the printer before printing the new message by default; set `reset` parameter to *false* or disable `Auto Reset` in the printer actor configuration to prevent that and append the text instead.<br />  Will make the printer default and hide other printers by default; set `default` parameter to *false* or disable `Auto Default` in the printer actor configuration to prevent that.<br />  Will wait for user input before finishing the task by default; set `waitInput` parameter to *false* or disable `Auto Wait` in the printer actor configuration to return as soon as the text is fully revealed.<br />

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Text</span> | String | Text of the message to print.  When the text contain spaces, wrap it in double quotes (`"`).  In case you wish to include the double quotes in the text itself, escape them.
printer | String | ID of the printer actor to use. Will use a default one when not provided.
author | String | ID of the actor, which should be associated with the printed message.
speed | Decimal | Text reveal speed multiplier; should be positive or zero. Setting to one will yield the default speed.
reset | Boolean | Whether to reset text of the printer before executing the printing task.  Default value is controlled via `Auto Reset` property in the printer actor configuration menu.
default | Boolean | Whether to make the printer default and hide other printers before executing the printing task.  Default value is controlled via `Auto Default` property in the printer actor configuration menu.
waitInput | Boolean | Whether to wait for user input after finishing the printing task.  Default value is controlled via `Auto Wait` property in the printer actor configuration menu.
br | Integer | Number of line breaks to prepend before the printed text.  Default value is controlled via `Auto Line Break` property in the printer actor configuration menu.
fadeTime | Decimal | Controls duration (in seconds) of the printers show and hide animations associated with this command.  Default value for each printer is set in the actor configuration.
voiceId | String | Used by voice map utility to differentiate print commands with equal text within the same script.

</div>

#### Example
```nani
; Will print the phrase with a default printer.
@print "Lorem ipsum dolor sit amet."

; To include quotes in the text itself, escape them.
@print "Saying \"Stop the car\" was a mistake."

; Reveal message with half of the normal speed and
; don't wait for user input to continue.
@print "Lorem ipsum dolor sit amet." speed:0.5 waitInput:false
```

## printer

#### Summary
Modifies a [text printer actor](/guide/text-printers.md).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">IdAndAppearance</span> | Named&lt;String&gt; | ID of the printer to modify and the appearance to set.  When ID or appearance are not provided, will use default ones.
default | Boolean | Whether to make the printer the default one.  Default printer will be subject of all the printer-related commands when `printer` parameter is not specified.
hideOther | Boolean | Whether to hide all the other printers.
pos | List&lt;Decimal&gt; | Position (relative to the screen borders, in percents) to set for the modified printer.  Position is described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen.
visible | Boolean | Whether to show or hide the printer.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Will make `Wide` printer default and hide any other visible printers.
@printer Wide

; Will assign `Right` appearance to `Bubble` printer, make is default,
; position at the center of the screen and won't hide other printers.
@printer Bubble.Right pos:50,50 hideOther:false
```

## processInput

#### Summary
Allows halting and resuming user input processing (eg, reacting to pressing keyboard keys).  The effect of the action is persistent and saved with the game.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">InputEnabled</span> | Boolean | Whether to enable input processing of all the samplers.
set | List&lt;Named&lt;Boolean&gt;&gt; | Allows muting and un-muting individual input samplers.

</div>

#### Example
```nani
; Halt input processing of all the samplers
@processInput false

; Resume input processing of all the samplers
@processInput true

; Mute `Rollback` and `Pause` inputs and un-mute `Continue` input
@processInput set:Rollback.false,Pause.false,Continue.true
```

## purgeRollback

#### Summary
Prevents player from rolling back to the previous state snapshots.

#### Example
```nani
; Prevent player from rolling back to try picking another choice.

@choice "One" goto:.One
@choice "Two" goto:.Two
@stop

# One
@purgeRollback
You've picked one.

# Two
@purgeRollback
You've picked two.
```

## resetState

#### Summary
Resets state of the [engine services](https://naninovel.com/guide/engine-services.html) and unloads (disposes)  all the resources loaded by Naninovel (textures, audio, video, etc); will basically revert to an empty initial engine state.

#### Remarks
The process is asynchronous and is masked with a loading screen ([ILoadingUI](https://naninovel.com/guide/user-interface.html#ui-customization)).  <br /><br />  When [Reset On Goto](https://naninovel.com/guide/configuration.html#state) is disabled in the configuration, you can use this command  to manually dispose unused resources to prevent memory leak issues.  <br /><br />  Be aware, that this command can not be undone (rewound back).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Exclude</span> | List&lt;String&gt; | Names of the [engine services](https://naninovel.com/guide/engine-services.html) (interfaces) to exclude from reset.  Consider adding `ICustomVariableManager` to preserve the local variables.
only | List&lt;String&gt; | Names of the [engine services](https://naninovel.com/guide/engine-services.html) (interfaces) to reset;  other services won't be affected. Doesn't have effect when the nameless (exclude) parameter is assigned.

</div>

#### Example
```nani
; Reset all the services.
@resetState

; Reset all the services except custom variable and audio managers,
; allowing currently played audio tracks continue playing.
@resetState ICustomVariableManager,IAudioManager

; Reset only the `ICharacterManager` and `IBackgroundManager` services.
@resetState only:ICharacterManager,IBackgroundManager
```

## resetText

#### Summary
Resets (clears) the contents of a text printer.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | ID of the printer actor to use. Will use a default one when not provided.

</div>

#### Example
```nani
; Clear the content of a default printer.
@resetText
; Clear the content of a printer with ID `Fullscreen`.
@resetText Fullscreen
```

## return

#### Summary
Attempts to navigate naninovel script playback to a command after the last used [@gosub].  See [@gosub] command summary for more info and usage examples.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
reset | List&lt;String&gt; | When specified, will reset the engine services state before returning to the initial script  from which the gosub was entered (in case it's not the currently played script).  Specify `*` to reset all the services, or specify service names to exclude from reset.  By default, the state does not reset.

</div>

## save

#### Summary
Automatically save the game to a quick save slot.

#### Example
```nani
@save
```

## set

#### Summary
Assigns result of a [script expression](/guide/script-expressions.md) to a [custom variable](/guide/custom-variables.md).

#### Remarks
Variable name should be alphanumeric (latin characters only) and can contain underscores, eg: `name`, `Char1Score`, `my_score`;  the names are case-insensitive, eg: `myscore` is equal to `MyScore`. If a variable with the provided name doesn't exist, it will be automatically created.  <br /><br />  It's possible to define multiple set expressions in one line by separating them with `;`. The expressions will be executed in sequence by the order of declaration.  <br /><br />  Custom variables are stored in **local scope** by default. This means, that if you assign some variable in the course of gameplay  and player starts a new game or loads another saved game slot, where that variable wasn't assigned — the value will be lost.  If you wish to store the variable in **global scope** instead, prepend `G_` or `g_` to its name, eg: `G_FinishedMainRoute` or `g_total_score`.  <br /><br />  In case variable name starts with `T_` or `t_` it's considered a reference to a value stored in 'Script' [managed text](/guide/managed-text.md) document.  Such variables can't be assigned and mostly used for referencing localizable text values.  <br /><br />  You can get and set custom variables in C# scripts via `CustomVariableManager` [engine service](/guide/engine-services.md).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | Set expression.  <br /><br />  The expression should be in the following format: `VariableName=ExpressionBody`, where `VariableName` is the name of the custom  variable to assign and `ExpressionBody` is a [script expression](/guide/script-expressions.md), the result of which should be assigned to the variable.  <br /><br />  It's also possible to use increment and decrement unary operators, eg: `@set foo++`, `@set foo--`.

</div>

#### Example
```nani
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

; If `foo` is a number, add 1 to its value
@set foo++

; If `foo` is a number, subtract 1 from its value
@set foo--

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
Plays or modifies currently played [SFX (sound effect)](/guide/audio.md#sound-effects) track with the provided name.

#### Remarks
Sound effect tracks are not looped by default.  When sfx track name (SfxPath) is not specified, will affect all the currently played tracks.  When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start),  but the specified parameters (volume and whether the track is looped) will be applied.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | Path to the sound effect asset to play.
volume | Decimal | Volume of the sound effect.
loop | Boolean | Whether to play the sound effect in a loop.
fade | Decimal | Duration of the volume fade-in when starting playback, in seconds (0.0 by default);  doesn't have effect when modifying a playing track.
group | String | Audio mixer [group path](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) that should be used when playing the audio.
time | Decimal | Duration (in seconds) of the modification. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop and fades-in over 30 seconds
@sfx Rain loop:true fade:30

; Changes volume of all the played SFX tracks to 75% over 2.5 seconds and disables looping for all of them
@sfx volume:0.75 loop:false time:2.5
```

## sfxFast

#### Summary
Plays an [SFX (sound effect)](/guide/audio.md#sound-effects) track with the provided name.  Unlike [@sfx] command, the clip is played with minimum delay and is not serialized with the game state (won't be played after loading a game, even if it was played when saved).  The command can be used to play various transient audio clips, such as UI-related sounds (eg, on button click with [`Play Script` component](/guide/user-interface.md#play-script-on-unity-event)).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | Path to the sound effect asset to play.
volume | Decimal | Volume of the sound effect.
restart | Boolean | Whether to start playing the audio from start in case it's already playing.
additive | Boolean | Whether to allow playing multiple instances of the same clip; has no effect when `restart` is enabled.
group | String | Audio mixer [group path](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) that should be used when playing the audio.

</div>

#### Example
```nani
; Plays an SFX with the name `Click` once
@sfxFast Click

; Same as above, but allow concurrent playbacks of the same clip
@sfxFast Click restart:false
```

## show

#### Summary
Shows (makes visible) actors (character, background, text printer, choice handler, etc) with the specified IDs.  In case multiple actors with the same ID found (eg, a character and a printer), will affect only the first found one.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | IDs of the actors to show.
time | Decimal | Duration (in seconds) of the fade animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Given an actor with ID `SomeActor` is hidden, reveal (fade-in) it over 3 seconds.
@show SomeActor time:3

; Show `Kohaku` and `Yuko` actors.
@show Kohaku,Yuko
```

## showPrinter

#### Summary
Shows a text printer.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | ID of the printer actor to use. Will use a default one when not provided.
time | Decimal | Duration (in seconds) of the show animation.  Default value for each printer is set in the actor configuration.

</div>

#### Example
```nani
; Show a default printer.
@showPrinter
; Show printer with ID `Wide`.
@showPrinter Wide
```

## showUI

#### Summary
Makes [UI elements](/guide/user-interface.md) with the specified prefab names visible.  When no names are specified, will reveal the entire UI (in case it was hidden with [@hideUI]).

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">UINames</span> | List&lt;String&gt; | Name of the UI prefab to make visible.
time | Decimal | Duration (in seconds) of the show animation.  When not specified, will use UI-specific duration.

</div>

#### Example
```nani
; Given you've added a custom UI with prefab name `Calendar`,
; the following will make it visible on the scene.
@showUI Calendar

; Given you've hide the entire UI with @hideUI, show it back
@showUI

; Simultaneously reveal built-in `TipsUI` and custom `Calendar` UIs.
@showUI TipsUI,Calendar
```

## skip

#### Summary
Allows to enable or disable script player "skip" mode.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Enable</span> | Boolean | Whether to enable (default) or disable the skip mode.

</div>

#### Example
```nani
; Enable skip mode
@skip
; Disable skip mode
@skip false
```

## skipInput

#### Summary
Can be used in generic text lines to prevent activating `wait for input` mode when the text is printed.

#### Example
```nani
; Script player won't wait for `continue` input before executing the `@sfx` command.
And the rain starts.[skipInput]
@sfx Rain
```

## slide

#### Summary
Slides (moves between two positions) an actor (character, background, text printer or choice handler) with the provided ID and optionally changes actor visibility and appearance.  Can be used instead of multiple [@char] or [@back] commands to reveal or hide an actor with a slide animation.

#### Remarks
Be aware, that this command searches for an existing actor with the provided ID over all the actor managers,  and in case multiple actors with the same ID exist (eg, a character and a text printer), this will affect only the first found one.  Make sure the actor exist on scene before referencing it with this command;  eg, if it's a character, you can add it on scene imperceptibly to player with `@char CharID visible:false time:0`.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">IdAndAppearance</span> | Named&lt;String&gt; | ID of the actor to slide and (optionally) appearance to set.
from | List&lt;Decimal&gt; | Position in scene space to slide the actor from (slide start position).  Described as follows: `0,0` is the bottom left, `50,50` is the center and `100,100` is the top right corner of the screen; Z-component (depth) is in world space.  When not provided, will use current actor position in case it's visible and a random off-screen position otherwise (could slide-in from left or right borders).
<span class="command-param-required" title="Required parameter: parameter should always be specified">to</span> | List&lt;Decimal&gt; | Position in scene space to slide the actor to (slide finish position).
visible | Boolean | Change visibility status of the actor (show or hide).  When not set and target actor is hidden, will still automatically show it.
easing | String | Name of the easing function to use for the modifications.  <br /><br />  Available options: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  When not specified, will use a default easing function set in the actor's manager configuration settings.
time | Decimal | Duration (in seconds) of the slide animation. Default value: 0.35 seconds.

</div>

#### Example
```nani
; Given `Jenna` actor is not currently visible, reveal it with an `Angry` appearance
; and slide to the center of the screen from either left or right border of the screen.
@slide Jenna.Angry to:50

; Given `Sheba` actor is currently visible,
; hide and slide it out of the screen over the left border.
@slide Sheba to:-10 visible:false

; Slide `Mia` actor from left-center side of the screen to the right-bottom
; over 5 seconds using `EaseOutBounce` animation easing.
@slide Sheba from:15,50 to:85,0 time:5 easing:EaseOutBounce
```

## spawn

#### Summary
Instantiates a prefab or a [special effect](/guide/special-effects.md);  when performed over an already spawned object, will update the spawn parameters instead.

#### Remarks
If prefab has a `UnityEngine.MonoBehaviour` component attached the root object, and the component implements  a `Naninovel.Commands.Spawn.IParameterized` interface, will pass the specified `params` values after the spawn;  if the component implements `Naninovel.Commands.Spawn.IAwaitable` interface, command execution will wait for  the async completion task returned by the implementation.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | Name (path) of the prefab resource to spawn.
params | List&lt;String&gt; | Parameters to set when spawning the prefab.  Requires the prefab to have a `Naninovel.Commands.Spawn.IParameterized` component attached the root object.

</div>

#### Example
```nani
; Given an `Rainbow` prefab is assigned in spawn resources, instantiate it.
@spawn Rainbow
```

## startTrans

#### Summary
Begins scene transition masking the real scene content with anything that is visible at the moment (except the UI).  When the new scene is ready, finish with [@finishTrans] command.

#### Remarks
The UI will be hidden and user input blocked while the transition is in progress.  You can change that by overriding the `ISceneTransitionUI`, which handles the transition process.<br /><br />  For the list of available transition effect options see [transition effects](/guide/transition-effects.md) guide.

#### Example
```nani
; Transition Felix on sunny day with Jenna on rainy day
@char Felix
@back SunnyDay
@fx SunShafts
@startTrans
; The following modifications won't be visible until we finish the transition
@hideChars time:0
@char Jenna time:0
@back RainyDay time:0
@stopFx SunShafts params:0
@fx Rain params:,0
; Transition the initially captured scene to the new one with `DropFade` effect over 3 seconds
@finishTrans DropFade time:3
```

## stop

#### Summary
Stops the naninovel script execution.

#### Example
```nani
Show the choices and halt script execution until the player picks one.
@choice "Choice 1"
@choice "Choice 2"
@stop
We'll get here after player will make a choice.
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
fade | Decimal | Duration of the volume fade-out before stopping playback, in seconds (0.35 by default).

</div>

#### Example
```nani
; Fades-out the `Promenade` music track over 10 seconds and stops the playback
@stopBgm Promenade fade:10

; Stops all the currently played music tracks
@stopBgm
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
fade | Decimal | Duration of the volume fade-out before stopping playback, in seconds (0.35 by default).

</div>

#### Example
```nani
; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds.
@stopSfx Rain fade:15

; Stops all the currently played sound effect tracks
@stopSfx
```

## stopVoice

#### Summary
Stops playback of the currently played voice clip.

## style

#### Summary
Permanently applies [text styles](/guide/text-printers.md#text-styles) to the contents of a text printer.

#### Remarks
You can also use rich text tags inside text messages to apply the styles selectively.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">TextStyles</span> | List&lt;String&gt; | Text formatting tags to apply. Angle brackets should be omitted, eg use `b` for &lt;b&gt; and `size=100` for &lt;size=100&gt;. Use `default` keyword to reset the style.
printer | String | ID of the printer actor to use. Will use a default one when not provided.

</div>

#### Example
```nani
; Print first two sentences in bold red text with 45px size,
; then reset the style and print the last sentence using default style.
@style color=#ff0000,b,size=45
Lorem ipsum dolor sit amet.
Cras ut nisi eget ex viverra egestas in nec magna.
@style default
Consectetur adipiscing elit.

; Print starting part of the sentence normally, but the last one in bold.
Lorem ipsum sit amet. <b>Consectetur adipiscing elit.</b>
```

## title

#### Summary
Resets engine state and shows `ITitleUI` UI (main menu).

#### Example
```nani
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
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | ID of the unlockable item. Use `*` to unlock all the registered unlockable items.

</div>

#### Example
```nani
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
group | String | Audio mixer [group path](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) that should be used when playing the audio.
authorId | String | ID of the character actor this voice belongs to.  When provided and [per-author volume](/guide/voicing.md#author-volume) is used, volume will be adjusted accordingly.

</div>

## wait

#### Summary
Holds script execution until the specified wait condition.

#### Parameters

<div class="config-table">

ID | Type | Description
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">WaitMode</span> | String | Wait conditions:<br />  - `i` user press continue or skip input key;<br />  - `0.0` timer (seconds);<br />  - `i0.0` timer, that is skip-able by continue or skip input keys.

</div>

#### Example
```nani
; "ThunderSound" SFX will play 0.5 seconds after the shake background effect finishes.
@fx ShakeBackground
@wait 0.5
@sfx ThunderSound

; Print first two words, then wait for user input before printing the remaining phrase.
Lorem ipsum[wait i] dolor sit amet.
; You can also use the following shortcut (@i command) for this wait mode.
Lorem ipsum[i] dolor sit amet.

; Start an SFX, print a message and wait for a skip-able 5 seconds delay, then stop the SFX.
@sfx Noise loop:true
Jeez, what a disgusting noise. Shut it down![wait i5][skipInput]
@stopSfx Noise
```

