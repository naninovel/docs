# State Management

All the persistent data generated and used by Naninovel at runtime is divided intro three categories:

- Game state
- Global state
- User settings

The data is serialized to JSON format and stored as either binary `.nson` (default) or text `.json` (can be switched in state configuration menu) save slot files under a platform-specific [persistent data directory](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html). Under WebGL platform, due to LFS security policy in modern web-browsers, the serialized data is stored over the [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) instead.

Instead of local files, it's possible to store state slots in key-value [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) database by selecting corresponding serialization handlers in the configuration menu.

Path to the save folder, maximum allowed amount of the save slots and file names can be modified via the state configuration menu.

![](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

## Game State

Game state is the data that varies per game save slot, describing state of the engine services and other objects in relation to the player progress with the game. The examples of the game state data are: currently played naninovel script and index of the played script command within the script, currently visible characters and their positions on scene, currently played background music track name and its volume and so on.

To save or load current game state to specific save slot, use `IStateManager` engine service as follows:

```csharp
// Get instance of a state manager.
var stateManager = Engine.GetService<IStateManager>();

// Save current game session to `mySaveSlot` slot.
await stateManager.SaveGameAsync("mySaveSlot");
// Load game session from `mySaveSlot` slot.
await stateManager.LoadGameAsync("mySaveSlot");

// You can also use quick save-load methods without specifying the slot names.
await stateManager.QuickSaveAsync();
await stateManager.QuickLoadAsync();
```
Notice, that the save-load API is [asynchronous](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/). In case you're invoking the API from synchronous methods, use `IStateManager.OnGameSaveFinished` and `IStateManager.OnGameLoadFinished` for subscribing to the completion events.

## Global State

Some data, however, should be persistent across the game sessions. For example, "Skip Read Text" feature requires the engine to store data describing which naninovel script commands were executed at least once (meaning the player has already "seen" them). The data like this is stored in a single "global" save slot and doesn't depend on the game save-load operations.

The global state is loaded automatically on engine initialization. You can save the global state at any time using `IStateManager` as follows:

```csharp
await stateManager.SaveGlobalStateAsync();
```

## User Settings

Similar to the global state, user settings data (display resolution, language, sound volume, etc) is stored in a single save slot, but treated a bit differently by default: the generated save file is placed outside of the "Saves" folder and formatted in a readable fashion, so that user can modify the values if they wish. 

The user settings are loaded automatically on engine initialization. You can save the settings at any time using `IStateManager` as follows:

```csharp
await stateManager.SaveSettingsAsync();
```

## Custom State

It's possible to delegate state handling of your custom objects to `IStateManager`, so that they will serialize to the save slots with all the engine's data when player saves the game and deserialize back when the game is loaded. All the built-in state-related features (eg, rollback) will also work out of the box with the custom state.

Following example demonstrates delegating state handling of "MyCustomBehaviour" component.

```csharp
using UniRx.Async;
using UnityEngine;
using Naninovel;

public class MyCustomBehaviour : MonoBehaviour
{
    [System.Serializable]
    private class GameState 
    { 
    	public bool MyCustomBool;
    	public string MyCustomString;
    }

    private bool myCustomBool;
    private string myCustomString;
    private IStateManager stateManager;

    private void Awake ()
    {
        stateManager = Engine.GetService<IStateManager>();
    }

    private void OnEnable ()
    {
        stateManager.AddOnGameSerializeTask(SerializeState);
        stateManager.AddOnGameDeserializeTask(DeserializeState);
    }

    private void OnDisable ()
    {
        stateManager.RemoveOnGameSerializeTask(SerializeState);
        stateManager.RemoveOnGameDeserializeTask(DeserializeState);
    }

    private void SerializeState (GameStateMap stateMap)
    {
        var state = new GameState() {
            MyCustomBool = myCustomBool,
            MyCustomString = myCustomString
        };
        stateMap.SetState(state);
    }

    private UniTask DeserializeState (GameStateMap stateMap)
    {
        var state = stateMap.GetState<GameState>();
        if (state is null) return UniTask.CompletedTask;

        myCustomBool = state.MyCustomBool;
        myCustomString = state.MyCustomString;
        return UniTask.CompletedTask;
    }
}
```

::: example
A more advanced example of using custom state with a list of custom structs to save-load game state of an inventory UI can be found in the [inventory example project on GitHub](https://github.com/Naninovel/Inventory). Specifically, de-/serialization of the custom state is implemented in [InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L246) custom UI.
:::

It's also possible to access global and settings state of the engine to store custom data with them. Unlike game state, which is specific to game sessions and require subscribing to save/load events, global and settings state objects are singletons and can be directly accessed via properties of the state manager.

```csharp
[System.Serializable]
class MySettings
{ 
    public bool MySettingsBool; 
}

[System.Serializable]
class MyGlobal
{ 
    public string MyGlobalString; 
}

MySettings MySettings
{
    get => stateManager.SettingsState.GetState<MySettings>();
    set => stateManager.SettingsState.SetState<MySettings>(value);
}

MyGlobal MyGlobal
{
    get => stateManager.GlobalState.GetState<MyGlobal>();
    set => stateManager.GlobalState.SetState<MyGlobal>(value);
}
```

The state objects are indexed by type, while in some cases you may have multiple object instances of the same type each with their own individual state. Both `GetState` and `SetState` methods allows providing an optional `instanceId` argument to discriminate such objects, eg:

```csharp
[System.Serializable]
class MonsterState
{ 
    public int Health; 
}

var monster1 = stateMap.GetState<MonsterState>("1");
var monster2 = stateMap.GetState<MonsterState>("2");
```

## Custom Serialization Handlers

By default, the engine state (game saves, global state, settings) is serialized to local file system via cross-platform IO API. However, in some cases platform-specific implementations are not available out of the box. Eg, Nintendo decided to restrict access to the Switch native libraries, making it impossible to support the platform in third-party solutions. For such cases, Naninovel allows to provide custom serialization handlers.

::: tip
Naninovel has a built-in `PlayerPrefs` serialization handler, which uses Unity's [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) API to persist the save data. While it's not optimal for storing large amounts of data, it could work with consoles out of the box, so you won't have to implement your own handler.
:::

To add a custom handler, implement `ISaveSlotManager<GameStateMap>`, `ISaveSlotManager<GlobalStateMap>`, `ISaveSlotManager<SettingsStateMap>` interfaces for the game save slots, global state and settings respectively (each should have its own implementing class).

Implementation should have a compatible public constructor: `public CustomSlotManager (StateConfiguration config, string savesFolderPath)`, where `config` is an instance of state configuration object and `savesFolderPath` is the path to saves folder (you're free to ignore that path and use one you see fit).

::: warn
When adding custom implementation types under a non-predefined assembly (via [assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html)), add the assembly name to the `Type Assemblies` list found in the engine configuration menu. Otherwise, the engine won't be able to locate your custom types.
:::

Below is an example of a dummy settings serialization handler, which is doing nothing but logs when any of its methods are invoked.

```csharp
using Naninovel;
using System;
using UniRx.Async;
using UnityEngine;

public class CustomSettingsSlotManager : ISaveSlotManager<SettingsStateMap>
{
    public event Action OnBeforeSave;
    public event Action OnSaved;
    public event Action OnBeforeLoad;
    public event Action OnLoaded;

    public bool Loading => false;
    public bool Saving => false;

    public CustomSettingsSlotManager (StateConfiguration config, string savesFolderPath)
    {
        Debug.Log($"Ctor({savesFolderPath})");
    }

    public bool AnySaveExists () => true;

    public bool SaveSlotExists (string slotId) => true;

    public void DeleteSaveSlot (string slotId)
    {
        Debug.Log($"DeleteSaveSlot({slotId})");
    }

    public void RenameSaveSlot (string sourceSlotId, string destSlotId)
    {
        Debug.Log($"RenameSaveSlot({sourceSlotId},{destSlotId})");
    }

    public UniTask SaveAsync (string slotId, SettingsStateMap data)
    {
        OnBeforeSave?.Invoke();
        Debug.Log($"SaveAsync({slotId})");
        OnSaved?.Invoke();
        return UniTask.CompletedTask;
    }

    public UniTask<SettingsStateMap> LoadAsync (string slotId)
    {
        OnBeforeLoad?.Invoke();
        Debug.Log($"LoadAsync({slotId})");
        OnLoaded?.Invoke();
        return UniTask.FromResult(new SettingsStateMap());
    }

    public UniTask<SettingsStateMap> LoadOrDefaultAsync (string slotId)
    {
        return LoadAsync(slotId);
    }
}
```

::: note
You can pick any name for your custom serialization handler, `CustomSettingsSlotManager` is just an example.
:::

When a custom handler is implemented, it'll appear in the state configuration menu, where you can set it instead of the built-in one.

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)

