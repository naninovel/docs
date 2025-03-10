﻿# Memory Management

Some script commands require loading resources in order to work: audio clips for [@bgm], character prefab and/or appearance textures for [@char], video clip for [@movie] and so on. Naninovel takes care of pre-/loading and unloading most of the resources. Default behaviour is based on `Resource Policy` setting found in resource provider configuration.

![](https://i.gyazo.com/18330a4aa47a1a2f222ad13e4a3fc85b.png)

## Conservative Policy

The default mode with balanced memory utilization. All the resources required for script execution are preloaded when starting the playback and unloaded when the script has finished playing. Scripts referenced in [@gosub] commands are preloaded as well. Additional scripts can be preloaded by using `hold` parameter of [@goto] command.

Below is a demo on how resources will un-/load under Conservative policy:

::: code-group

```nani [Script1.nani]
Resources from Script1, Script2 and ScriptGosub are loaded here.
Script2 is loaded, because it's navigated to with "@goto hold!".
ScriptGosub is loaded, because "@gosub" are always pre-loaded.

...

Loading screen won't show, because gosub is always pre-loaded.
@gosub ScriptGosub

...

Loading screen won't show, because we're using "hold!".
@goto Script2 hold!
```

```nani [Script2.nani]
Resources from Script1, Script2 and ScriptGosub are all still loaded,
because this script was navigated to with "@goto hold!",
hence it's considered a dependency of Script1.

...

Loading screen will show, because we're not using "hold!".
@goto Script3
```

```nani [Script3.nani]
Resources from Script1, Script2 are now unloaded, while resources
form Script3 (this script) are loaded.
Resources from ScriptGosub are still loaded, because we're using it here.

...

Loading screen won't show, because gosub is always pre-loaded.
@gosub ScriptGosub

...

Loading screen will show, because we're not using "hold!".
@goto Script4
```

```nani [Script4.nani]
All the resources are now unloaded (including ScriptGosub) and only
resources form Script4 (this script) are loaded.

...

@stop
```

```nani [ScriptGosub.nani]
Various resources may be loaded here, depending from which script
we navigated here.

...

Loading screen won't show, as gosubs are always loaded with the script
which navigates to the gosub and are not unloaded until the script unloads.
@return
```

:::

## Optimistic Policy

All the resources required by the played script, as well all resources of all the scripts specified in [@goto] and [@gosub] commands are preloaded and not unloaded unless `release` parameter is specified in [@goto] command. This minimizes loading screens and allows smooth rollback, but requires manually specifying when to unload resources, increasing risk of out of memory exceptions on platforms with strict memory limits, such as mobile devices and web browsers.

Below is a demo of similar set of scripts, but now we're using Optimistic policy:

::: code-group

```nani [Script1.nani]
Resources from Script1, Script2, Script3 and ScriptGosub are all loaded here.
Script4 is not loaded, because it's navigated to with "@goto release!".

...

Loading screen won't show, because gosub is always pre-loaded.
@gosub ScriptGosub

...

Loading screen won't show by default, unless "release!" is specified.
@goto Script2
```

```nani [Script2.nani]
Everyting except Script4 is still loaded.

...

Loading screen won't show by default, unless "release!" is specified.
@goto Script3
```

```nani [Script3.nani]
Everyting except Script4 is still loaded.

...

Loading screen won't show, because gosub is always pre-loaded.
@gosub ScriptGosub

...

Loading screen will now show, because of "release!".
@goto Script4 release!
```

```nani [Script4.nani]
All the resources except Script4 are now unloaded, because we navigated here
with "@goto release!".

...

@stop
```

```nani [ScriptGosub.nani]
Various resources may be loaded here, depending from which script
we navigated here.

...

Loading screen won't show, as gosubs are always loaded with the script
which navigates to the gosub and are not unloaded until the script unloads.
@return
```

:::

## Choosing Policy

Generally, it's recommended to stick with the default "Conservative" policy, as it yields balanced memory usage suitable for all the target platforms, while providing flexibility in "merging" the scripts via `hold!` flags, when necessary.

However, if you exclusively target the more powerful platforms with lots of RAM, like standalone and game consoles, you may choose the "Optimistic" policy to keep large chunks for the resources in memory and minimize loading screens.

Another scenario for the alternative policy is when Naninovel is used as a dialogue system inside a custom game loop. You'll likely have your own resource management system in such cases, and "Optimistic" won't stand in its way, as it'd basically do nothing, outside of keeping all the required resources loaded before playing a script, unless you explicitly use `release!` flags.

Below is a summary of the policies:

| Policy       |             Memory Usage             | Loading Screens                                    | Rollback                                               |
|--------------|:------------------------------------:|----------------------------------------------------|--------------------------------------------------------|
| Conservative | <span class="txt-ok">Balanced</span> | <span class="txt-warn">On goto, unless held</span> | <span class="txt-warn">Fast inside held scripts</span> |
| Optimistic   |  <span class="txt-err">High</span>   | <span class="txt-ok">None, until released</span>   | <span class="txt-ok">Fast until released</span>        |

## Actor Resources

Actors (characters, backgrounds, text printers and choice handlers) are the key entities in Naninovel. Most memory used by actors is associated with their appearances.

### Appearances

Some actor implementations have their appearance mapped 1:1 to a resource: sprite actor appearance is associated with a single texture asset, video actor appearance is a single video clip and so on. This allows Naninovel manage their resources based on specific appearances referenced in scenario scripts. For example, in case only `Happy` and `Sad` appearances of sprite character are used in a given script, only `Happy.png` and `Sad.png` textures will preload before the script is played, no matter how many other appearances character has.

However, layered, diced sprite, generic, Live2D and Spine actors all require monolith prefab in order to represent any of the associated appearances making it impossible to independently load resources. In such cases, Naninovel will preload the whole prefab with all its dependencies and only unload it when the actor is not referenced in any of the commands, no matter which appearances are used.

### Removing Actors

Naninovel will, by default, automatically remove unused actors and destroy associated game objects when unloading script resources. If you'd like to manually dispose the actors, disable `Remove Actors` option in resource provider configuration menu and use [@remove] commands:

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; Given 'Remove Actors' is disabled, "LayeredBackground" won't be
; destroyed when "NextScript" is loaded, but both characters will.
@hide GenericCharacter,DicedCharacter wait!
@remove GenericCharacter,DicedCharacter
@goto NextScript
```

— alternatively, use [@remove] with `*` parameter to dispose all the existing actors (including text printers and choice handlers) or [@resetState] with `only` parameter to immediately dispose actors of specific type: `ICharacterManager` for character and `IBackgroundManager` for backgrounds:

```nani
...
@goto NextScript
; Dispose all the existing backgrounds.
@resetState only:IBackgroundManager
```

## Lifetime Management

Resource provider manager keeps track of the references to the loaded resources and dispose (unload) the resources when they're not used ("held") by any users ("holders").

The mechanism is most prominent in script commands. For example, let's assume you want to play a background music with a custom command. The audio player will require an audio clip asset (resource) to play, so we need to preload and "hold" the asset before the command is executed and release it after:

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async UniTask PreloadResources ()
    {
        await audio.AudioLoader.LoadAndHold(MusicName, this);
    }

    public void ReleasePreloadedResources ()
    {
        audio.AudioLoader.Release(MusicName, this);
    }

    public override async UniTask Execute (AsyncToken asyncToken = default)
    {
        await audio.PlayBgm(MusicName, asyncToken: asyncToken);
    }
}
```

Notice the command implements `Command.IPreloadable` interface. Script player will detect such commands and invoke the preload and unload methods to ensure the assets are ready before the command is executed and released after.

## Sharing Resources

In some cases you may want to share resources between Naninovel and a custom gameplay mode. In case the custom gameplay is implemented independently of Naninovel (the engine is disabled when the custom mode is active), there shouldn't be any issues. However, if both the custom mode and Naninovel are used at the same time, you have to pay attention to how the resources are used.

For example, let's assume you have a Naninovel's sprite background with an appearance texture that is also used as a source for some UI element. At some point Naninovel will attempt to release the texture and it will also disappear in the UI element. That happens, because the engine is not aware, that you're using the texture and it shouldn't be unloaded.

To notify Naninovel, that you're using an asset, use `Hold` method of resource provider service:

```csharp
var resourceManager = Engine.GetService<IResourceProviderManager>();
resourceManager.Hold(asset, holder);
```

Be aware, that while you're holding an asset, it won't be unloaded by Naninovel, so it's up to you to dispose it to prevent memory leaks:

```csharp
var holdersCount = resourceManager.Release(asset, holder);
// In case no one else is holding the asset, we should unload it.
if (holdersCount == 0) Resources.UnloadAsset(asset);
```

"Holder" can be a reference to any object; usually it's the same class that is using the asset. It's used to distinguish the holders and prevent same holder from accidentally holding a resource multiple times.

Below is an example of Unity component, which will prevent Naninovel from ever unloading an asset:

```csharp
using Naninovel;
using UnityEngine;

public class HoldObject : MonoBehaviour
{
    public Object ObjectToHold;

    private async void Start()
    {
        while (!Engine.Initialized) await UniTask.DelayFrame(1);
        Engine.GetService<IResourceProviderManager>().Hold(ObjectToHold, this);
    }
}
```
