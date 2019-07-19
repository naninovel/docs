# State Management

All the persistent data generated and used by Naninovel at runtime is divided intro three categories:

- Game state
- Global state
- User settings

The data is serialized to JSON format and stored as save slot `.json` text files on the file system under the game build directory. Under WebGL platform, due to LFS security policy in modern web-browsers, the serialized data is stored over the [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) instead.

Path to the save folder, maximum allowed amount of the save slots and file names can be modified via the state configuration menu.

![](https://i.gyazo.com/01cf958545b590ab40ce19115938e4d7.png)

## Game State

Game state is the data that varies per game save slot, describing state of the engine services and other objects in relation to the player progress with the game. The examples of the game state data are: currently played naninovel script and index of the played script command withing the script, currently visible characters and their positions on scene, currently played background music track name and its volume and so on.

To save or load current game state to specific save slot, use `StateManager` engine service as follows:

```csharp
// Get instance of the state manager.
var stateManager = Engine.GetService<StateManager>();

// Save current game session to `mySaveSlot` slot.
await stateManager.SaveGameAsync("mySaveSlot");
// Load game session from `mySaveSlot` slot.
await stateManager.LoadGameAsync("mySaveSlot");

// You can also use quick save-load methods without specifying the slot names.
await stateManager.QuickSaveAsync();
await stateManager.QuickLoadAsync();
```
Notice, that the save-load API is [asynchronous](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/). In case you're invoking the API from synchronous methods, use `StateManager.OnGameSaveFinished` and `StateManager.OnGameLoadFinished` for subscribing to the completion events.

## Global State

Some data, however, should be persistent across the game sessions. For example, "Skip Read Text" feature requires the engine to store data describing which naninovel script commands were executed at least once (meaning the player has already "seen" them). The data like this is stored in a single "global" save slot and doesn't depend on the game save-load operations.

The global state is loaded automatically on engine initialization. You can save the global state at any time using `StateManager` as follows:

```csharp
await stateManager.SaveGlobalStateAsync();
```

## User Settings

Similar to the global state, user settings data (display resolution, language, sound volume, etc) is stored in a single save slot, but treated a bit differently by default: the generated save file is placed outside of the "Saves" folder and formatted in a readable fashion, so that user can modify the values if he wishes. 

The user settings are loaded automatically on engine initialization. You can save the settings at any time using `StateManager` as follows:

```csharp
await stateManager.SaveSettingsAsync();
```

## Custom State

It's possible to "outsource" state handling of your custom objects to the `StateManager`, so that they will serialize to the save slots with all the engine's data when player saves the game and deserialize back when the game is loaded. 

The following example demonstrates how to subscribe a generic `MonoBehaviour` to the save and load operations: 

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
    private StateManager stateManager;

    private void Awake ()
    {
        stateManager = Engine.GetService<StateManager>();
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

