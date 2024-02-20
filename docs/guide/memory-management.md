# Memory Management

Some script commands require loading resources in order to work: audio clips for [@bgm], character prefab and/or appearance textures for [@char], video clip for [@movie] and so on. Naninovel takes care of pre-/loading and unloading most of the resources. Default behaviour is based on `Resource Policy` setting found in resource provider configuration.

![](https://i.gyazo.com/1344beb404abb7026cc0fe8998496334.png)

## Conservative Policy

## Optimistic Policy

## Lazy Policy

Below is a summary of the policies:

| Policy       |             Memory Usage             |             CPU Usage             | Loading Screens                                   | Rollback                                         |
|--------------|:------------------------------------:|:---------------------------------:|---------------------------------------------------|--------------------------------------------------|
| Lazy         |   <span class="txt-ok">Low</span>    | <span class="txt-err">High</span> | <span class="txt-ok">None</span>                  | <span class="txt-err">Always slow</span>         |
| Conservative | <span class="txt-warn">Medium</span> |  <span class="txt-ok">Low</span>  | <span class="txt-err">On goto, unless held</span> | <span class="txt-warn">Fast inside script</span> |
| Optimistic   |  <span class="txt-err">High</span>   |  <span class="txt-ok">Low</span>  | <span class="txt-warn">None until released</span> | <span class="txt-ok">Fast until released</span>  |

## Unloading Resources

In some cases Naninovel won't be able to automatically unload resources. Specifically, layered, diced sprite, generic, Live2D and Spine actors all require a monolith prefab in order to represent any of the appearances making it impossible to independently load resources per appearance. To prevent memory leaks, unload such resources manually in one of the ways described below.

### Remove Individual Actors

Use [@hide] command with `remove` parameter to hide and dispose specific actors. Applicable when some actors are expected to live across scripts.

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; We expect `LayeredBackground` to survive when `NextScript` is loaded,
; but both characters should be disposed.
@hide GenericCharacter,DicedCharacter remove:true
@goto NextScript
```

### Remove All Actors

Use [@hideAll] with `remove` parameter to hide and dispose all the existing actors (including text printers and choice handlers) or [@resetState] with `only` parameter to immediately dispose actors of specific type: `ICharacterManager` for character and `IBackgroundManager` for backgrounds. Applicable when all actors or actors of specific type are not expected to survive script loading.

```nani
...
@goto NextScript
; Dispose all the existing backgrounds.
@resetState only:IBackgroundManager
```

### Reset On Goto

In case you don't need any [engine service](/guide/engine-services) state to persist between scripts (including currently played music, special effects, etc), enable `Reset On Goto` in state configuration. This way all the services will automatically dispose associated resources when navigating between naninovel scripts and you won't have to use any special commands to unload the resources.

## Lifetime Management

Resource provider manager keeps track of the references to the loaded resources and dispose (unload) the resources when they're not used ("held") by any users ("holders").

The mechanism is most prominent in script commands. For example, let's assume you want to play a background music with a custom command. The audio player will require an audio clip asset (resource) to play, so we need to preload and "hold" the asset before the command is executed and release it after:

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async UniTask PreloadResourcesAsync ()
    {
        await audio.AudioLoader.LoadAndHoldAsync(MusicName, this);
    }

    public void ReleasePreloadedResources ()
    {
        audio.AudioLoader.Release(MusicName, this);
    }

    public override async UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        await audio.PlayBgmAsync(MusicName, asyncToken: asyncToken);
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
