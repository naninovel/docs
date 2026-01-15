# Audio

To add, edit or remove background music (BGM) and sound effect (SFX) resources use audio resources manager accessible via `Naninovel -> Resources -> Audio`. You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

::: tip
Choose file formats that are most comfortable for your development workflow. When building the project, Unity will automatically convert all the source resources (textures, audio, video, etc) to the formats most suitable for the target platform, so it won't make a difference in which format you originally store the resources in the project. Find more information on how Unity manages project assets in the [official documentation](https://docs.unity3d.com/Manual/AssetWorkflow).
:::

In case you have a lot of audio files and it's inconvenient to assign them via editor menu, it's possible to just drop them at `Resources/Naninovel/Audio` folder, and they'll automatically be available in the scripts. You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in scenario scripts. Eg, audio clip stored as `Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` can be referenced in scripts as `Music/Ambient/Noise002`.

It's also possible to use [addressable asset system](/guide/resource-providers#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "MainTheme.wav" BGM, assign the clip asset following address: `Naninovel/Audio/MainTheme`. Be aware that the addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

::: warning
Audio assets not assigned via resources manager won't be available in various editor dropdowns, such as the one used to select `Message Sound` for a character actor.
:::

Audio playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration#audio).

## Background Music

Use the [@bgm] command followed by the clip name to control the music playback in scenario scripts:

```nani
; Starts playing a music track with the name "Sanctuary" in a loop.
@bgm Sanctuary

; Same as above, but fades-in the volume over 10 seconds and plays only once.
@bgm Sanctuary fade:10 !loop

; Changes volume of all the played music tracks to 50% over 2.5 seconds
; and makes them play in a loop.
@bgm volume:0.5 loop! time:2.5
```

Music tracks are looped by default. When a music track name is not specified in the [@bgm] command, all currently played tracks will be affected. When invoked for a track that is already playing, the track won't restart, but the specified parameters (volume and whether the track is looped) will be applied.

It's possible to play an intro followed by a loop with the `intro` parameter, e.g.:

```nani
; Plays "BattleThemeIntro" once and then "BattleThemeMain" in a loop.
@bgm BattleThemeMain intro:BattleThemeIntro
```

To stop a playing music track, use the [@stopBgm] command followed by the clip name. When a clip name is not specified, the command will stop all currently played tracks.

```nani
; Fades-out the "Promenade" music track over 10 seconds and stops the playback.
@stopBgm Promenade fade:10

; Stops all the currently played music tracks.
@stopBgm
```

## Sound Effects

Use the [@sfx] and [@stopSfx] commands followed by the clip name to control playback of sound effects in scenario scripts:

```nani
; Plays an SFX with the name "Explosion" once.
@sfx Explosion

; Plays an SFX with the name "Rain" in a loop.
@sfx Rain loop!

; Changes volume of all the played SFX tracks to 75% over 2.5
; seconds and disables looping for all of them.
@sfx volume:0.75 !loop time:2.5
```

Sound effect tracks are not looped by default. When an SFX track name is not specified in the [@sfx] command, all currently played tracks will be affected. When invoked for a track that is already playing, the track won't restart, but the specified parameters (volume and whether the track is looped) will be applied.

To stop a playing sound effect (looped or not), use the [@stopSfx] command followed by the clip name. When a clip name is not specified, the command will stop all currently played SFX tracks.

```nani
; Stop playing an SFX with the name "Rain", fading-out for 15 seconds.
@stopSfx Rain fade:15

; Stops all the currently played sound effect tracks.
@stopSfx
```

## Audio Mixer

Naninovel uses an [audio mixer](https://docs.unity3d.com/Manual/AudioMixer.html) asset when playing the audio to separate BGM, SFX and voice channels.

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

It's possible to assign a custom mixer asset, change groups used for each audio channel, and change volume control handlers (exposed parameter names) in the audio configuration menu. When no custom mixer asset is assigned, a default one will be used.

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

To play audio via a custom mixer group, specify a group path with the `group` parameter available in [@bgm], [@sfx] and [@voice] commands.

```nani
; Play "Noise" audio resource in loop via "Master/Ambient" mixer group.
@sfx Noise loop! group:Master/Ambient

; Play "ScaryVoice" voice resource via "Master/Reverb" mixer group.
@voice ScaryVoice group:Master/Reverb
```

Groups are retrieved with `FindMatchingGroups(groupPath)` method of the currently assigned audio mixer asset; see [Unity documentation](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) for more information on the expected path format. In case multiple groups are associated with the provided path, the first one will be used to play the audio.

## Custom Audio Backend

Unity allows replacing its built-in audio backend with custom solutions, such as [FMOD](https://www.fmod.com) and [Wwise](https://www.audiokinetic.com/en/wwise/). To support this, we've ensured that Naninovel's `IAudioManager` interface doesn't depend on the default audio backend (for example, it doesn't reference `AudioClip`, `AudioSource`, etc.). This allows you to [override the service](/guide/engine-services#overriding-built-in-services) and use a custom audio backend without modifying the engine's source code.

Below is a minimal example of such an override for FMOD.

```cs
[InitializeAtRuntime(@override: typeof(AudioManager))]
public class FMODAudioManager : IAudioManager
{
    // Assuming FMOD resource loading is managed externally.
    public IResourceLoader AudioLoader { get; } = new NullResourceLoader();

    // Assuming FMOD's lifecycle is managed externally.
    public Awaitable InitializeService () => Async.Completed;
    public void DestroyService () { }

    public Awaitable PlaySfx (string path, ...)
    {
        // Resolve the FMOD's event reference from the path and play it.
    }

    public AudioMixerGroup GetGroup (string groupPath)
    {
        // It's OK to return null or otherwise ignore unsupported features.
        return null;
    }

    // Other APIs...
}
```
