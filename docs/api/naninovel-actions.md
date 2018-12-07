---
sidebar: auto
---

# Naninovel.Actions

## choice

Adds a choice option to an active (or default) `Naninovel.IChoiceHandlerActor`.

## br

Adds a line break to the text in active printer.

## arrange

## save

## if

Will execute `Naninovel.Actions.Goto` and/or `Naninovel.Actions.SetCustomVariable` actions when the provided expression is true.

```@if varName=someString goto:Script001.Start
            @if varName=1 set:someVarName+1 goto:Script002
            @if varName>10 set:varName=0
            @if varName>=25 goto:Script003
            @if varName!=2 goto:Script004
```

## title

Loads default engine state and shows `Naninovel.UI.ITitleUI`.

## Goto

## hide

## hideAll

## hideChars

## HideText

## ModifyActor<TActor, TState, TManager>

## back

Modifies a `Naninovel.IBackgroundActor`.

Backgrounds are handled a bit differently from characters. Most of the time we'll only have  one background actor on scene, which will constantly transition to different appearances.  To free the user from always repeating one actor name in scripts, we allow to just  provide background name (appearance) and transition type as a nameless param and assume that  `main` actor should be affected. When this is not the case, the name of the actor can be explicitly  provided via the `Naninovel.Actions.ModifyActor`3.Name` parameter.

## char

Modifies a `Naninovel.ICharacterActor`.

## ModifyOrthoActor<TActor, TState, TManager>

## ModifyText

## NovelAction

Represents a `Naninovel.NovelScript` action.

## bgm

## movie

## sfx

## voice

## print

Resets the active printer, prints text message and waits for user input.

Will cancel the printing (reveal the text at once) on `Naninovel.InputManager.Continue` and `Naninovel.InputManager.Skip`.  Will attempt to play corresponding voice clip (when `Naninovel.AudioManager.AutoVoicingEnabled` is enabled).  Will add printed message to the `Naninovel.UI.IBacklogUI` (when available).

## ResetText

Clears printed text of active printer.

## printer

Set printer with provided name active and de-activates all the others.

## set

Assigns a value to a custom variable.

```@set varName=someString
            @set varName=1
            @set varName+10
            @set varName-25
            @set varName*2
```

## style

Applies text style to the active printer.

## ShowText

## skipInput

Next call to `Naninovel.NovelScriptPlayer.EnableWaitingForInput` will be ignored.

## Spawn

Spawns a prefab stored in project resources.

## fx

Spawns a special effect prefab stored in `./Resources/Naninovel/FX` resources folder.

## Stop

## StopBgm

## StopSfx

## StopVoice

## Wait

Holds script execution until:  input (string)         - user press continue or skip input key  number (int or float)  - timer (seconds)

## i

Holds script execution until user press continue input key.  Shortcut for @wait input.

