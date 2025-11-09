# 状态管理

Naninovel 在运行时生成和使用的所有持久化数据分为以下三类：

- 游戏状态
- 全局状态
- 用户设置

这些数据会被序列化为 JSON 格式，并以二进制 `.nson`（默认）或文本 `.json` 存档文件的形式存储在特定平台的 [持久化数据目录](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 下。  
在 WebGL 平台上，由于现代浏览器的本地文件系统安全策略（LFS），序列化数据会存储在 [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) 中。

序列化行为由序列化处理器（serialization handlers）独立控制，分别用于游戏存档、全局状态和用户设置。默认情况下，系统使用通用的序列化处理器。  
在大多数情况下，这些处理器会使用异步的 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) API 来读取和写入本地文件系统中的存档文件。  
但在某些平台（如主机平台）上，.NET 的 IO API 可能不可用，此时通用处理器将回退使用 Unity 的跨平台 [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) 机制。

你可以在状态配置菜单中修改序列化处理器、存档文件夹路径、允许的最大存档数量以及其他相关参数。

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

## 游戏状态

游戏状态是每个存档槽独立保存的数据，用于描述引擎服务及其他对象在玩家游戏进度中的状态。例如：当前正在播放的 Naninovel 剧本及其脚本指令索引、当前显示的角色及其在场景中的位置、正在播放的背景音乐名称及音量等。

若要将当前游戏状态保存或加载到指定的存档槽中，可使用 `IStateManager` 引擎服务，如下所示：

```csharp
// 获取状态管理器实例。
var stateManager = Engine.GetService<IStateManager>();

// 将当前游戏会话保存到名为 `mySaveSlot` 的存档槽中。
await stateManager.SaveGame("mySaveSlot");

// 从名为 `mySaveSlot` 的存档槽加载游戏会话。
await stateManager.LoadGame("mySaveSlot");

// 也可以使用快速存档和读取方法，而无需指定存档槽名称。
await stateManager.QuickSave();
await stateManager.QuickLoad();
```

请注意，存档与加载的 API 是 [异步的](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)。如果在同步方法中调用这些 API，可使用 `IStateManager.OnGameSaveFinished` 和 `IStateManager.OnGameLoadFinished` 事件来监听操作完成的回调。

## 全局状态

某些数据需要在多个游戏会话之间保持一致。例如，“跳过已读文本”功能要求引擎记录哪些 Naninovel 剧本指令已被执行过（即玩家已“看过”这些内容）。此类数据会被存储在一个全局存档槽中，与游戏的存档与读档操作无关。

全局状态会在引擎初始化时自动加载。你可以随时通过 `IStateManager` 保存全局状态，如下所示：

```csharp
await stateManager.SaveGlobalState();
```

## 用户设置

与全局状态类似，用户设置数据（显示分辨率、语言、音量等）也存储在单一的存档槽中，但默认情况下会有一些不同的处理方式：生成的存档文件会被放置在 “Saves” 文件夹之外，并以可读格式保存，以便用户在需要时自行修改。

用户设置会在引擎初始化时自动加载。你可以在任意时刻通过 `IStateManager` 保存设置，如下所示：

```csharp
await stateManager.SaveSettings();
```

## 自定义状态

你可以将自定义对象的状态处理委托给 `IStateManager`，这样它们就能与引擎的其他数据一起被序列化到存档槽中，并在玩家加载游戏时自动反序列化恢复。所有内置的状态相关功能（如回滚）同样能无缝适配这些自定义状态。

以下示例展示了如何将 “MyCustomBehaviour” 组件的状态管理交由 `IStateManager` 处理。

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

若你的自定义对象是在游戏状态加载后才创建的，可以通过 `LastGameState` 获取最近加载的游戏状态，并手动调用反序列化方法：

```csharp
private async void Start ()
{
    if (stateManager.LastGameState is { } state)
        await DeserializeState(state);
}
```

::: tip EXAMPLE
一个更高级的示例展示了如何使用自定义结构体列表保存和加载背包 UI 的游戏状态，可参考 [inventory 示例](/zh/guide/samples#inventory)。  
具体实现可见 `Scripts/Runtime/Inventory/UI/InventoryUI.cs`，其中包含自定义状态的序列化与反序列化逻辑。
:::

此外，你也可以访问引擎的全局状态和设置状态来存储自定义数据。与游戏状态不同，这两者是全局单例（singleton）对象，可以通过状态管理器的属性直接访问，而无需订阅保存或加载事件。

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

状态对象是根据类型进行索引的，但在某些情况下，你可能会有多个相同类型的对象实例，每个实例都有自己独立的状态。`GetState` 和 `SetState` 方法都允许提供一个可选的 `instanceId` 参数，以区分这些对象，例如：

```csharp
[System.Serializable]
class MonsterState
{
    public int Health;
}

var monster1 = stateMap.GetState<MonsterState>("1");
var monster2 = stateMap.GetState<MonsterState>("2");
```

## 自定义序列化处理器

默认情况下，当选择通用序列化处理器时，引擎状态（游戏存档、全局状态、设置）会通过异步的 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) 进行序列化，或者在某些平台上使用 Unity 的跨平台 [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) 作为后备方案。若要自定义序列化逻辑，可使用自定义处理器。

要添加自定义处理器，请分别为游戏存档、全局状态和设置实现以下接口：`ISaveSlotManager<GameStateMap>`、`ISaveSlotManager<GlobalStateMap>`、`ISaveSlotManager<SettingsStateMap>`。每个接口都应由独立的类实现。

实现类需具备一个公共构造函数，包含 `StateConfiguration` 和 `string` 两个参数，前者为状态配置对象实例，后者为存档文件夹路径；你可以在自定义实现中选择忽略这些参数。

下面是一个自定义设置序列化处理器的示例，它不会实际执行任何操作，仅在方法被调用时输出日志。

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

    public UniTask Save (string slotId, SettingsStateMap data)
    {
        Debug.Log($"Save({slotId})");
        return UniTask.CompletedTask;
    }

    public UniTask<SettingsStateMap> Load (string slotId)
    {
        Debug.Log($"Load({slotId})");
        return UniTask.FromResult(new SettingsStateMap());
    }

    public UniTask<SettingsStateMap> LoadOrDefault (string slotId)
    {
        return Load(slotId);
    }
}
```

::: info NOTE
你可以为自定义序列化处理器选择任意名称，`CustomSettingsSlotManager` 只是示例。
:::

当自定义处理器实现完成后，它会出现在状态配置菜单中，你可以在其中选择使用它来替代内置处理器。

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)
