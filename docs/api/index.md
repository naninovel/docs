---
sidebar: auto
---

# API Reference

Novel script actions API reference. Use the side bar to quickly navigate between available actions. Check out the [novel scripts guide](/guide/novel-scripts.md) in case you have no idea what's this all about.

## arrange

#### Summary
Arranges specified characters by X-axis.  When no parameters provided, will execute an auto-arrange evenly distributing visible characters by X-axis.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">CharacterPositions</span> | LiteralMap&lt;Single&gt; | Character name to scene local X-axis position map.  Local scene position 0 relates to the left border and 1 to the right border of the screen; 0.5 is the center.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Evenly distribute all the visible characters
@arrange

; Place character with name `Jenna` 15%, `Felix` 50% and `Mia` 85% away
; from the left border of the screen.
@arrange Jenna.0.15,Felix.0.5,Mia.0.85
```

## back

#### Summary
Modifies a `Naninovel.IBackgroundActor`.

#### Remarks
Backgrounds are handled a bit differently from characters. Most of the time we'll only have  one background actor on scene, which will constantly transition to different appearances.  To free the user from always repeating one actor name in scripts, we allow to just  provide background name (appearance) and transition type as a nameless param and assume that  `main` actor should be affected. When this is not the case, the name of the actor can be explicitly  provided via the `Naninovel.Actions.ModifyActor`3.Name` parameter.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">AppearanceAndTransition</span> | Pair&lt;String, String&gt; | Appearance to set for the modified background and name of the transition effect to use.  When transition is not provided, a cross-fade effect will be used by default.
params | Single[] | Parameters of the transition effect.
pos | Single[] | Position (in scene local space) to set for the modified actor.  Scene space described as follows: x0y0 is at the bottom left and x1y1 is at the top right corner of the screen.
name | String | Name of the actor to modify.
appearance | String | Appearance to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
position | Single[] | Position (in world space) to set for the modified actor.
rotation | Single[] | Rotation to set for the modified actor.
scale | Single[] | Scale to set for the modified actor.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

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
@back name:ExplosionSprite scale:0.3 pos:0.55,0.6 time:0 isVisible:false
@back name:ExplosionSprite
@fx ShakeBackground params:,1
@hide ExplosionSprite
@sfx ExplosionSound volume:1.5
@back name:ExplosionSprite pos:0.65 scale:1
@fx ShakeBackground params:,3
@hide ExplosionSprite
```

## bgm

#### Summary
Plays a BGM (background music) track with the provided name.

#### Remarks
Only one background music track can be played simultaneously and a cross-fade effect  will automatically be applied when switching music tracks. The music will also loop by default.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">BgmPath</span> | String | Path to the music track to play.
fadeTime | Single | Fade duration, in seconds.
loop | Boolean | Whether to play the track from beginning when it finishes.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Fades-in a music track with the name `Sanctuary` and plays it in a loop
@bgm Sanctuary

; Same as above, but fade-in duration is 10 seconds and plays only once
@bgm Sanctuary fadeTime:10 loop:false

; Fades-out and stops any currently played music
@bgm none
```

## br

#### Summary
Adds a line break to the text in active printer.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name">Count</span> | Int32 | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## char

#### Summary
Modifies a `Naninovel.ICharacterActor`.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">NameAndAppearance</span> | Pair&lt;String, String&gt; | Name of the actor to modify and the appearance to set.  When appearance is not provided, will use either a `Default` (is exists) or a random one.
look | String | Look direction of the actor; possible options: left, right, center.
pos | Single[] | Position (in scene local space) to set for the modified actor.  Scene space described as follows: x0y0 is at the bottom left and x1y1 is at the top right corner of the screen.
name | String | Name of the actor to modify.
appearance | String | Appearance to set for the modified actor.
isVisible | Boolean | Visibility status to set for the modified actor.
position | Single[] | Position (in world space) to set for the modified actor.
rotation | Single[] | Rotation to set for the modified actor.
scale | Single[] | Scale to set for the modified actor.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Shows character with name `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:0.45,0.1
```

## choice

#### Summary
Adds a choice option to an active (or default) `Naninovel.IChoiceHandlerActor`.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">ChoiceSummary</span> | String | 
handler | String | Name of the choice handler to add choice for.
goto | Pair&lt;String, String&gt; | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## fx

#### Summary
Spawns a special effect prefab stored in `./Resources/Naninovel/FX` resources folder.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | 
params | String[] | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Shakes an active text printer
@fx ShakePrinter

; Applies a glitch effect to the camera
@fx GlitchCamera
```

## goto

#### Summary
Jumps the novel script playback to the provided path.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | Pair&lt;String, String&gt; | Path to jump into in the following format: `ScriptName.LabelName`.  When label name is ommited, will play provided script from the start.  When script name is ommited, will attempt to find a label in the currently played script.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Loads and starts playing a novel script with the name `Script001` from the start.
@goto Script001

; Save as above, but start playing from the label `AfterStorm`.
@goto Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script.
@goto .Epilogue
```

## hide

#### Summary
Hides (removes from scene) an actor with provided name.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">ActorName</span> | String | Name of the actor to hide.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
@hide ActorName
```

## hideAll

#### Summary
Hides (removes) all the actors (eg characters, backgrounds, text printers, choice handlers, etc) on scene.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
@hideAll
```

## hideChars

#### Summary
Hides (removes) all the visible characters on scene.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
@hideChars
```

## hideText

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## i

#### Summary
Holds script execution until user activates a `continue` input.  Shortcut for `@wait input`.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; User will have to activate a `continue` input after the first sentence
; for the printer to contiue printing out the following text.
Lorem ipsum dolor sit amet.[i] Consectetur adipiscing elit.
```

## if

#### Summary
Will execute `Naninovel.Actions.Goto` and/or `Naninovel.Actions.SetCustomVariable` actions when the provided expression is true.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Expression</span> | String | 
goto | Pair&lt;String, String&gt; | 
set | String | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
@if varName=someString goto:Script001.Start
@if varName=1 set:someVarName+1 goto:Script002
@if varName>10 set:varName=0
@if varName>=25 goto:Script003
@if varName!=2 goto:Script004
```

## movie

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">MovieName</span> | String | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## print

#### Summary
Resets the active printer, prints text message and waits for user input.

#### Remarks
Will cancel the printing (reveal the text at once) on `Naninovel.InputManager.Continue` and `Naninovel.InputManager.Skip`.  Will attempt to play corresponding voice clip (when `Naninovel.AudioManager.AutoVoicingEnabled` is enabled).  Will add printed message to the `Naninovel.UI.IBacklogUI` (when available).

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-required" title="Required parameter: parameter should always be specified">text</span> | String | Text of the message to print.
printer | String | Name of the printer to use.
actor | String | Name of the actor to whom the message belongs.
reset | Boolean | Whether to reset text of the printer before executing the printing task.
waitInput | Boolean | Whether to wait for user input after finishing the printing task.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## printer

#### Summary
Set printer with provided name active and de-activates all the others.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">PrinterName</span> | String | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## resetText

#### Summary
Clears printed text of active printer.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## save

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## set

#### Summary
Assigns a value to a custom variable.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Expression</span> | String | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
@set varName=someString
@set varName=1
@set varName+10
@set varName-25
@set varName*2
```

## sfx

#### Summary
Plays an SFX (sound effect) track with the provided name.

#### Remarks
Multiple sound effects can be played at the same time and they won't loop by default.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">SfxPath</span> | String | Path to the sound effect asset to play.
volume | Single | Volume of the sound effect.
loop | Boolean | Whether to play the sound effect in a loop.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@bgm Rain loop:true
```

## showText

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## skipInput

#### Summary
Next call to `Naninovel.NovelScriptPlayer.EnableWaitingForInput` will be ignored.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; User won't have to activate a `continue` input in order to progress to the `@sfx` action.
And the rain starts.[skipInput]
@sfx Rain
```

## spawn

#### Summary
Spawns a prefab stored in project resources.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">Path</span> | String | 
params | String[] | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## stop

#### Summary
Stops the novel script execution.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## stopBgm

#### Summary
Stops playing a background music.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
fadeTime | Single | Fade-out duration, in seconds.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Fades-out and stops any currently played music
@stopBgm

; Fades-out for 10 seconds and stops any currently played music
@stopBgm fadeTime:10
```

## stopSfx

#### Summary
Stop the playback of a sound effect with the provided name.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">SfxPath</span> | String | Path to the sound effect to stop.
fadeTime | Single | Fade-out duration, in seconds.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds.
@stopSfx Rain fadeTime:15
```

## stopVoice

#### Summary
Stops playback of the currently played voice clip.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## style

#### Summary
Applies text style to the active printer.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">TextStyles</span> | String[] | 
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## title

#### Summary
Loads default engine state and shows `Naninovel.UI.ITitleUI`.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## voice

#### Summary
Plays a voice clip with the provided path.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">VoicePath</span> | String | Path to the voice clip to play.
volume | Single | Volume of the playback.
wait | Boolean | Whether the `Naninovel.NovelScriptPlayer` should wait for the async action execution before playing next action.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

## wait

#### Summary
Holds script execution until the specified wait condition.

#### Parameters
<div class="config-table">

Name | Type | Description
--- | --- | ---
<span class="action-param-nameless action-param-required" title="Nameless parameter: value should be provided after the action identifer without specifying parameter name  Required parameter: parameter should always be specified">WaitMode</span> | String | Wait condition:  input (string) - user press continue or skip input key;  number (int or float)  - timer (seconds).
wait | Boolean | Holds script execution until the specified wait condition.
time | Single | Determines for how long (in seconds) action should execute. Derived actions could (or could not) use this parameter.
if | String | A `Naninovel.Actions.ConditionalFlow` expression, controlling whether this action should execute.

</div>

#### Example
```
; `ThunderSound` SFX will play 0.5 seconds after the shake background effect finishes.
@fx ShakeBackground
@wait 0.5
@sfx ThunderSound
```

