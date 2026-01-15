# State Management

All the persistent data generated and used by Naninovel at runtime is divided intro three categories:

- Game state
- Global state
- User settings

The data is serialized to JSON format and stored as either binary `.nson` (default) or text `.json` save slot files under a platform-specific [persistent data directory](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html). Under WebGL platform, due to LFS security policy in modern web-browsers, the serialized data is stored over the [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) instead.

The serialization behaviour is controlled by serialization handlers independently for game saves, global state and user settings. By default, universal serialization handlers are used. In most cases, they will use asynchronous [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) to read and write the slot files to the local file system. However, on some platforms (eg, consoles) the .NET IO APIs are not available, in which case the universal handlers will fallback to Unity's cross-platform [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html).

Serialization handlers, path to the save folder, maximum allowed amount of the save slots and other related parameters can be modified via the state configuration menu.

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

## Game State

Game state is the data that varies per game save slot, describing state of the engine services and other objects in relation to the player progress with the game. The examples of the game state data are: currently played scenario script and index of the played script command within the script, currently visible characters and their positions on scene, currently played background music track name and its volume and so on.

To save or load current game state to specific save slot, use `IStateManager` engine service as follows:

```csharp
// Get instance of a state manager.
var stateManager = Engine.GetService<IStateManager>();

// Save current game session to `mySaveSlot` slot.
await stateManager.SaveGame("mySaveSlot");
// Load game session from `mySaveSlot` slot.
await stateManager.LoadGame("mySaveSlot");

// You can also use quick save-load methods without specifying the slot names.
await stateManager.QuickSave();
await stateManager.QuickLoad();
```
Notice, that the save-load API is [asynchronous](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/). In case you're invoking the API from synchronous methods, use `IStateManager.OnGameSaveFinished` and `IStateManager.OnGameLoadFinished` for subscribing to the completion events.

## Global State

Some data, however, should be persistent across the game sessions. For example, "Skip Read Text" feature requires the engine to store data describing which scenario script commands were executed at least once (meaning the player has already "seen" them). The data like this is stored in a single "global" save slot and doesn't depend on the game save-load operations.

The global state is loaded automatically on engine initialization. You can save the global state at any time using `IStateManager` as follows:

```csharp
await stateManager.SaveGlobalState();
```

## User Settings

Similar to the global state, user settings data (display resolution, language, sound volume, etc) is stored in a single save slot, but treated a bit differently by default: the generated save file is placed outside of the "Saves" folder and formatted in a readable fashion, so that user can modify the values if they wish.

The user settings are loaded automatically on engine initialization. You can save the settings at any time using `IStateManager` as follows:

```csharp
await stateManager.SaveSettings();
```

## Custom State

It's possible to delegate state handling of your custom objects to `IStateManager`, so that they will serialize to the save slots with all the engine's data when player saves the game and deserialize back when the game is loaded. All the built-in state-related features (eg, rollback) will also work out of the box with the custom state.

Following example demonstrates delegating state handling of "MyCustomBehaviour" component.

```csharp
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
        var state = new GameState {
            MyCustomBool = myCustomBool,
            MyCustomString = myCustomString
        };
        stateMap.SetState(state);
    }

    private Awaitable DeserializeState (GameStateMap stateMap)
    {
        var state = stateMap.GetState<GameState>();
        if (state is null) return Async.Completed;

        myCustomBool = state.MyCustomBool;
        myCustomString = state.MyCustomString;
        return Async.Completed;
    }
}
```

In case your custom object is created after the game state is loaded, use `LastGameState` to access the last loaded state and manually invoke the deserialize method:

```csharp
private async void Start ()
{
    if (stateManager.LastGameState is { } state)
        await DeserializeState(state);
}
```

::: tip EXAMPLE
A more advanced example of using custom state with a list of custom structs to save-load game state of an inventory UI can be found in the [inventory sample](/guide/samples#inventory). Specifically, de-/serialization of the custom state is implemented in `Scripts/Runtime/Inventory/UI/InventoryUI.cs` custom UI.
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

By default, when universal serialization handlers are selected, the engine state (game saves, global state, settings) is serialized either via asynchronous [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) or with Unity's cross-platform [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) as a fallback for some platforms. To customize the serialization scenario, use custom handlers.

To add a custom handler, implement `ISaveSlotManager<GameStateMap>`, `ISaveSlotManager<GlobalStateMap>`, `ISaveSlotManager<SettingsStateMap>` interfaces for the game save slots, global state and settings respectively (each should have its own implementing class).

Implementation is expected to have a public constructor with `StateConfiguration` and `string` arguments, where the first one is an instance of state configuration object and second is the path to saves folder; you're free to ignore the arguments in your custom implementation.

Below is an example of a custom settings serialization handler, which is doing nothing but logs when any of its methods are invoked.

```csharp
using Naninovel;
using System;
using UnityEngine;

public class CustomSettingsSlotManager : ISaveSlotManager<SettingsStateMap>
{
    public event Action<string> OnBeforeSave;
    public event Action<string> OnSaved;
    public event Action<string> OnBeforeLoad;
    public event Action<string> OnLoaded;
    public event Action<string> OnBeforeDelete;
    public event Action<string> OnDeleted;
    public event Action<string, string> OnBeforeRename;
    public event Action<string, string> OnRenamed;

    public bool Loading => false;
    public bool Saving => false;

    public CustomSettingsSlotManager (StateConfiguration config, string saveDir)
    {
        Debug.Log($"Ctor({saveDir})");
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

    public Awaitable Save (string slotId, SettingsStateMap data)
    {
        Debug.Log($"Save({slotId})");
        return Async.Completed;
    }

    public Awaitable<SettingsStateMap> Load (string slotId)
    {
        Debug.Log($"Load({slotId})");
        return Async.Result(new SettingsStateMap());
    }

    public Awaitable<SettingsStateMap> LoadOrDefault (string slotId)
    {
        return Load(slotId);
    }
}
```

::: info NOTE
You can pick any name for your custom serialization handler, `CustomSettingsSlotManager` is just an example.
:::

When a custom handler is implemented, it'll appear in the state configuration menu, where you can set it instead of the built-in one.

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)
