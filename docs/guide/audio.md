# Audio

Background music (BGM) and sound effects (SFX) are covered in this article; for the voices see [voicing guide](/guide/voicing.md).

To add, edit or remove BGM and SFX resources use audio resources manager accessible via `Naninovel -> Resources -> Audio`. You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

![](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

In case you have a lot of audio files and it's inconvenient to assign them via editor menu, it's possible to just drop them at `Resources/Naninovel/Audio` folder and they'll automatically be available in the scripts. You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in naninovel scripts. Eg, audio clip stored as `Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` can be referenced in scripts as `Music/Ambient/Noise002`.

It's also possible to use [addressable asset system](/guide/resource-providers.md#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "MainTheme.wav" BGM, assign the clip asset following address: `Naninovel/Audio/MainTheme`. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

::: warn
Audio assets not assigned via resources manager won't be available in various editor dropdowns, such as the one used to select `Message Sound` for a character actor.
::: 

Audio playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

## Background Music

Use [@bgm] command followed by the clip name to control the music playback in naninovel scripts:

```nani
; Starts playing a music track with the name `Sanctuary` in a loop
@bgm Sanctuary

; Same as above, but fades-in the volume over 10 seconds and plays only once
@bgm Sanctuary fade:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5
```

Music tracks are looped by default. When music track name is not specified in [@bgm] command, all the currently played tracks will be affected. When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start), but the specified parameters (volume and whether the track is looped) will be applied.

It's possible to play an intro followed by a loop with `intro` parameter, eg:

```nani
; Playes `BattleThemeIntro` once and then immediately `BattleThemeMain` in a loop.
@bgm BattleThemeMain intro:BattleThemeIntro
```

To stop a playing music track, use [@stopBgm] command followed by clip name. When clip name is not specified, the command will stop all the currently played tracks.

```nani
; Fades-out the `Promenade` music track over 10 seconds and stops the playback
@stopBgm Promenade fade:10

; Stops all the currently played music tracks
@stopBgm
```

## Sound Effects

Use [@sfx] and [@stopSfx] commands followed by the clip name to control playback of the sound effects in naninovel scripts:

```nani
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@sfx Rain loop:true

; Changes volume of all the played SFX tracks to 75% over 2.5 seconds and disables looping for all of them
@sfx volume:0.75 loop:false time:2.5
```

Sound effect tracks are not looped by default. When sfx track name is not specified in [@sfx] command, all the currently played tracks will be affected. When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start), but the specified parameters (volume and whether the track is looped) will be applied.

To stop a playing sound effect (no matter looped or not), use [@stopSfx] command followed by clip name. When clip name is not specified, the command will stop all the currently played SFX tracks.

```nani
; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds.
@stopSfx Rain fade:15

; Stops all the currently played sound effect tracks
@stopSfx
```

## Audio Mixer

Naninovel uses an [audio mixer](https://docs.unity3d.com/Manual/AudioMixer.html) asset when playing the audio to separate BGM, SFX and voice channels.

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

It's possible to assign a custom mixer asset, change groups used for each audio channel and volume control handlers (exposed parameter names) in the audio configuration menu. When no custom mixer assets assigned, a default one will be used.

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

To play an audio via a custom mixer group, specify group path with `group` parameter available in [@bgm], [@sfx] and [@voice] commands.

```nani
; Play `Noise` audio resource in loop via `Master/Ambient` mixer group.
@sfx Noise loop:true group:Master/Ambient

; Play `ScaryVoice` voice resource via `Master/Reverb` mixer group.
@voice ScaryVoice group:Master/Reverb
```

Groups are retrieved with `FindMatchingGroups(groupPath)` method of the currently assigned audio mixer asset; see [Unity documentation](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) for more information on the expected path format. In case multiple groups are associated with the provided path, the first one will be used to play the audio.

In C# scripts, currently used audio mixer can be retrieved via `IAudioManager` [engine service](/guide/engine-services.md).

```csharp
var audioManager = Engine.GetService<IAudioManager>();
var audioMixer = audioManager.AudioMixer;
```

