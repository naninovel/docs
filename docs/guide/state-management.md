# State Management

All the persistent data generated and used by Naninovel at runtime is divided intro three categories:

- Game state
- Global state
- User settings

The data is serialized to JSON format and stored as save slot `.json` text files on the file system under the game build directory. Under WebGL platform, due to LFS security policy in modern web-browsers, the serialized data is stored over the [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) instead.

Path to the save folder, maximum allowed amount of the save slots and file names can be modified via the state configuration menu.

![](https://i.gyazo.com/ed5f97de87615d438f1b28ec7c1140c9.png)

## Game State

Game state is the data that varies per game save slot, describing state of the engine services and other objects in relation to the player progress with the game. The examples of the game state data are: currently played naninovel script and index of the played script command withing the script, currently visible characters and their positions on scene, currently played background music track name and its volume and so on.

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

Similar to the global state, user settings data (display resolution, language, sound volume, etc) is stored in a single save slot, but treated a bit differently by default: the generated save file is placed outside of the "Saves" folder and formatted in a readable fashion, so that user can modify the values if he wishes. 

The user settings are loaded automatically on engine initialization. You can save the settings at any time using `IStateManager` as follows:

```csharp
await stateManager.SaveSettingsAsync();
```

## Custom State

It's possible to "outsource" state handling of your custom objects to a `IStateManager`, so that they will serialize to the save slots with all the engine's data when player saves the game and deserialize back when the game is loaded. 

The following example demonstrates how to subscribe a generic `MonoBehaviour` to the save and load operations.

```csharp
using UnityEngine;
using Naninovel;

public class MyCustomBehaviour : MonoBehaviour
{
    [System.Serializable]
    private class GameState 
    { 
    	public bool MyCustomBoolVariable; 
    	public string MyCustomStringVariable; 
    }

    private bool myCustomBoolVariable;
    private string myCustomStringVariable;
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

    private Task SerializeState (GameStateMap stateMap)
    {
        var state = new GameState() {
            MyCustomBoolVariable = myCustomBoolVariable,
            MyCustomStringVariable = myCustomStringVariable
        };
        stateMap.SetState(state);
        return Task.CompletedTask;
    }

    private Task DeserializeState (GameStateMap stateMap)
    {
        var state = stateMap.GetState<GameState>();
        if (state is null) return Task.CompletedTask;

        myCustomBoolVariable = state.MyCustomBoolVariable;
        myCustomStringVariable = state.MyCustomStringVariable;
        return Task.CompletedTask;
    }
}
```

## Custom Serialization Handlers

By default, the engine state (game saves, global state, settings) is serialized to local file system via cross-platform IO API. However, in some rare cases platform-specific implementations are not available out of the box. Eg, Nintendo decided to restrict access to the Switch native libraries, making it impossible to support the platform in third-party solutions. For such cases, Naninovel allows to provide custom serialization handlers.

To add a custom handler, implement `ISaveSlotManager<GameStateMap>`, `ISaveSlotManager<GlobalStateMap>`, `ISaveSlotManager<SettingsStateMap>` interfaces for the game save slots, global state and settings respectively (each should have its own implementing class).

Implementation should have a compatible public constructor: `public CustomSlotManager (StateConfiguration config, string savesFolderPath)`, where `config` is an instance of state configuration object and `savesFolderPath` is the path to saves folder (you're free to ignore that path and use one you see fit).

Below is an example of a dummy settings serialization handler, which is doing nothing but logs when any of its methods are invoked.

```csharp
using Naninovel;
using System;
using System.Threading.Tasks;
using UnityCommon;
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

    public Task SaveAsync (string slotId, SettingsStateMap data)
    {
        OnBeforeSave?.Invoke();
        Debug.Log($"SaveAsync({slotId})");
        OnSaved?.Invoke();
        return Task.CompletedTask;
    }

    public Task<SettingsStateMap> LoadAsync (string slotId)
    {
        OnBeforeLoad?.Invoke();
        Debug.Log($"LoadAsync({slotId})");
        OnLoaded?.Invoke();
        return Task.FromResult(new SettingsStateMap());
    }

    public Task<SettingsStateMap> LoadOrDefaultAsync (string slotId)
    {
        return LoadAsync(slotId);
    }
}
```

When a custom handler is implemented, it'll appear in the state configuration menu, where you can set it instead of the built-in one.

![](https://i.gyazo.com/10ef2735e9ba85ba0ed71cf9b2c33c0b.png)

