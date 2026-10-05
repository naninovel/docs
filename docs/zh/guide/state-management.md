# 状态管理

Naninovel 在运行时生成和使用的所有持久数据分为三类：

- 游戏状态
- 全局状态
- 用户设置

数据序列化为 JSON 格式，并作为二进制 `.nson`（默认）或文本 `.json` 存档槽文件存储在特定于平台的 [持久数据目录](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 下。在 WebGL 上，由于现代浏览器的安全策略，序列化数据改为存储在 [IndexedDB](https://en.wikipedia.org/wiki/Indexed_Database_API) 中。

序列化行为由序列化处理程序针对游戏存档、全局状态和用户设置分别控制。默认情况下，使用通用序列化处理程序。在大多数情况下，它们将使用异步 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) 在本地文件系统中读写存档槽文件。但是，在某些平台（例如游戏主机）上，.NET IO API 不可用，在这种情况下，通用处理程序会回退到 Unity 的跨平台 [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html)。

序列化处理程序、存档文件夹的路径、允许的最大存档槽数量和其他相关参数可以通过状态配置菜单进行修改。

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

## 游戏状态

游戏状态是因游戏存档槽而异的数据，描述与玩家进度相关的引擎服务和其他对象的状态。示例包括：当前播放的剧本脚本以及该脚本中所播放命令的索引、当前可见的角色及其在场景中的位置、当前播放的背景音乐曲目名称及其音量等。

要将当前游戏状态保存到特定存档槽或从中加载，请按如下方式使用 `IStateManager` 引擎服务：

```csharp
// 获取状态管理器的实例。
var stateManager = Engine.GetService<IStateManager>();

// 将当前游戏会话保存到 `mySaveSlot` 存档槽。
await stateManager.SaveGame("mySaveSlot");
// 从 `mySaveSlot` 存档槽加载游戏会话。
await stateManager.LoadGame("mySaveSlot");

// 您也可以使用快速存档和快速加载方法，无需指定存档槽名称。
await stateManager.QuickSave();
await stateManager.QuickLoad();
```

请注意，保存和加载 API 是 [异步的](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)。如果您从同步方法调用 API，请使用 `IStateManager.OnGameSaveFinished` 和 `IStateManager.OnGameLoadFinished` 订阅完成事件。

## 全局状态

某些数据需要跨游戏会话持久保存。例如，“跳过已读文本”功能要求引擎存储哪些剧本脚本命令至少执行过一次（即玩家已经“看过”它们）。此类数据存储在单个“全局”存档槽中，不依赖于游戏的保存和加载操作。

全局状态在引擎初始化时自动加载。您可以随时使用 `IStateManager` 保存全局状态：

```csharp
await stateManager.SaveGlobal();
```

## 用户设置

用户设置（例如语言、音量和文本速度）与全局状态类似，存储在单个存档槽中。即使启用了 `Binary Save Files`，设置文件也始终保存为文本 `.json`，以便用户可以根据需要修改值。

用户设置在引擎初始化时自动加载。您可以随时使用 `IStateManager` 保存设置：

```csharp
await stateManager.SaveSettings();
```

## 存档文件

在可访问文件系统的平台上使用通用序列化处理程序时，所有状态都会写入 Unity [持久数据目录](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 下的 `Saves` 文件夹。例如，如果公司名称是 `Foo` 且游戏标题是 `Bar`，路径将是：

::: code-group

```text [Windows]
C:/Users/User/AppData/LocalLow/Foo/Bar/Saves
```

```text [macOS]
~/Library/Application Support/unity.Foo.Bar/Saves
```

```text [Linux]
~/.config/unity3d/Foo/Bar/Saves
```

```text [iOS]
/var/mobile/Containers/Data/Application/<guid>/Documents/Saves
```

```text [Android]
/storage/emulated/0/Android/data/<package>/files/Saves
```

:::

该文件夹包含以下文件，其中 `###` 是存档槽编号：

| 文件                    | 默认上限 | 内容                   |
|-------------------------|----------|------------------------|
| `GameSave###.nson`      | 99       | 存档槽的游戏状态。     |
| `GameQuickSave###.nson` | 18       | 快速存档槽的游戏状态。 |
| `GameAutoSave###.nson`  | 18       | 自动存档槽的游戏状态。 |
| `GlobalSave.nson`       | 1        | 全局状态。             |
| `Settings.json`         | 1        | 用户设置。             |

使用默认的存档槽上限时，该文件夹最多包含 137 个文件。游戏状态文件的大小主要取决于摄像机配置中的 `Thumbnail Resolution` 和状态配置中的 `Saved Rollback Steps`。

禁用 `Binary Save Files` 时，游戏状态和全局状态文件的扩展名为 `.json` 而不是 `.nson`。文件夹名称、文件名称和存档槽上限可以在状态配置中更改。

在 Unity 编辑器中，文件改为存储在 Naninovel 数据文件夹（默认为 `Assets/NaninovelData`）的 `.nani/Transient/Saves` 下。

::: tip
云存档服务（例如 [Steam Auto-Cloud](https://partner.steamgames.com/doc/features/cloud#steam_auto-cloud)）应仅同步 `Saves` 文件夹；持久数据目录中的其他文件仅供本设备使用。可以考虑将同步范围限制为 `.nson` 文件，因为 `Settings.json` 包含特定于设备的选项，例如图形质量和输入绑定。Steamworks 文档中有为 Unity 游戏配置路径的 [示例](https://partner.steamgames.com/doc/features/cloud#example)。
:::

## 自定义状态

您可以将自定义对象的状态处理委托给 `IStateManager`，以便它们在玩家保存游戏时与引擎的所有数据一起序列化到存档槽，并在加载游戏时反序列化回来。内置的状态相关功能（例如回滚）也同样适用于自定义状态，开箱即用。

以下示例演示了委托 `MyCustomBehaviour` 组件的状态处理。

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

如果您的自定义对象是在加载游戏状态后创建的，请使用 `IStateManager.Game` 访问最后加载的状态并手动调用反序列化方法：

```csharp
private async void Start ()
{
    if (stateManager.Game is { } state)
        await DeserializeState(state);
}
```

::: tip EXAMPLE
在 [库存示例](/zh/guide/samples#库存) 中可以找到一个更高级的示例：使用包含自定义结构体列表的自定义状态来保存和加载库存 UI 的游戏状态。具体来说，自定义状态的序列化/反序列化在 `Scripts/Runtime/Inventory/UI/InventoryUI.cs` 中实现。
:::

您还可以访问引擎的全局状态和设置状态，随其一起存储自定义数据。与特定于游戏会话并需要订阅保存/加载事件的游戏状态不同，全局状态和设置状态对象是单例，可以直接通过状态管理器的属性访问。

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
    get => stateManager.Settings.GetState<MySettings>();
    set => stateManager.Settings.SetState<MySettings>(value);
}

MyGlobal MyGlobal
{
    get => stateManager.Global.GetState<MyGlobal>();
    set => stateManager.Global.SetState<MyGlobal>(value);
}
```

状态对象按类型索引。在某些情况下，您可能有同一类型的多个对象实例，每个实例都有自己的状态。`GetState` 和 `SetState` 方法都允许提供可选的 `instanceId` 参数来区分此类对象，例如：

```csharp
[System.Serializable]
class MonsterState
{
    public int Health;
}

var monster1 = stateMap.GetState<MonsterState>("1");
var monster2 = stateMap.GetState<MonsterState>("2");
```

## 自定义序列化处理程序

默认情况下，当选择通用序列化处理程序时，引擎状态（游戏存档、全局状态、设置）通过异步 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) 序列化，或者在某些平台上回退到 Unity 的跨平台 [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html)。要自定义序列化方案，请使用自定义处理程序。

要添加自定义处理程序，请分别为游戏存档槽、全局状态和设置实现 `ISaveSlotManager<GameStateMap>`、`ISaveSlotManager<GlobalStateMap>` 和 `ISaveSlotManager<SettingsStateMap>` 接口（每个都应该有自己的实现类）。

实现应具有带有 `StateConfiguration` 和 `string` 参数的公共构造函数，其中第一个是状态配置对象，第二个是存档文件夹的路径；如果需要，您可以在自定义实现中忽略这些参数。

下面是一个自定义设置序列化处理程序的示例，它仅在其任何方法被调用时记录日志。

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
您可以为自定义序列化处理程序选择任何名称；`CustomSettingsSlotManager` 只是一个示例。
:::

实现自定义处理程序后，它会出现在状态配置菜单中，您可以在其中选择它来代替内置处理程序。

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)
