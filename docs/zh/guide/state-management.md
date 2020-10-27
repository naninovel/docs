# 状态管理

所有运行时由Naninovel生成的持久化数据可分为以下三类：
- 游戏状态
- 全局状态
- 用户设置

该数据存储为JSON格式，类型为`.nson`二进制文件（默认）或 `.json` 文本（可在配置菜单中更改），游戏存档文件在特定平台[持久化数据目录](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 。在WebGL平台下，由于现代浏览器的LFS安全策略，序列化数据存储在[索引数据库](https://en.wikipedia.org/wiki/Indexed_Database_API) 。

除开本地文件，也可将状态存储于键值的[PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) 中，需在配置菜单中选择相应的序列化处理器。

存储路径，保存栏位和文件名最大长度可在配置菜单中修改。

![](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

## 游戏状态

游戏状态是对应每个游戏保存栏位的数据，记述了引擎服务状态，各种游戏物体和玩家游戏进度的关系。比如存储的数据有：当前运行脚本和当前执行到的序号，当前可见的角色和在场景中的为hi当前播放的bgm和音量等等。

要保存加载某个保存栏位的数据，使用`IStateManager`相关服务如下：

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

注意，保存加载是[异步进行](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) 。如果你想同步的方式调用该API，使用`IStateManager.OnGameSaveFinished` 和 `IStateManager.OnGameLoadFinished` 来订阅完成事件。

## 全局状态

部分数据，应在游戏过程中始终被记录存储。比如"Skip Read Text"（跳过已读文本），需要引擎记录哪些脚本是至少运行过一次的（意味着玩家至少已经看过）。这类数据存储于单独的全局状态保存位，并不会受到游戏的读取加载操作的影响。

全局状态会在引擎初始化时自动加载。你可以通过`IStateManager`手动随时存储全局状态如下：

```csharp
await stateManager.SaveGlobalStateAsync();
```

## 用户设置

和全局数据类似，用户设置数据（显示分辨率，语言，音量，等）存储于单独保存位，但和默认处理方式略有不同：生成保存文件和游戏状态保存目录不同，并且为可读文件格式，如有需要用户可以自己修改对应值。 

用户设置会在引擎初始化时自动加载。你可以通过`IStateManager`手动随时存储全局状态如下：

```csharp
await stateManager.SaveSettingsAsync();
```

## 自定义状态

你也可以将你的自定义物体信息外包给`IStateManager`来完成存储，它会将其他引擎数据和你的自定义状态序列化存储在一起，并在加载时恢复应有状态。

以下示例为如何使用C#脚本来执行加载读取操作：

```csharp
using UniRx.Async;
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

    private void SerializeState (GameStateMap stateMap)
    {
        var state = new GameState() {
            MyCustomBoolVariable = myCustomBoolVariable,
            MyCustomStringVariable = myCustomStringVariable
        };
        stateMap.SetState(state);
    }

    private UniTask DeserializeState (GameStateMap stateMap)
    {
        var state = stateMap.GetState<GameState>();
        if (state is null) return UniTask.CompletedTask;

        myCustomBoolVariable = state.MyCustomBoolVariable;
        myCustomStringVariable = state.MyCustomStringVariable;
        return UniTask.CompletedTask;
    }
}
```

::: example

更加进阶的自定义状态示例，是基于背包UI的状态读取加载[GitHub背包状态存储加载示例](https://github.com/Naninovel/Inventory)。

[InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L238) 运行时脚本中实现了自定义状态的反序列化；UI自定义状态存储的通过[InventorySlotState.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventorySlotState.cs) 实现。
:::

## 自定义序列化处理器

默认情况下，引擎数据（游戏存档，全局状态，设置等）通过跨平台IO序列化存储到本地文件。部分平台不支持直接对本地进行写入，比如任天堂NS，所以第三方的存储解决方案不被支持，这种时候引擎允许对序列化处理进行相应定制，以满足各种平台的特性。

要添加自定义处理器，需要继承`ISaveSlotManager<GameStateMap>`, `ISaveSlotManager<GlobalStateMap>`，`ISaveSlotManager<SettingsStateMap>`接口，
分别对应，游戏存储，全局状态，设置状态（每个接口对应单独类）。

实现接口类，都应该有个公开构造方法：`public CustomSlotManager (StateConfiguration config, string savesFolderPath)`， `config` 为配置物体的实例，`savesFolderPath`为存储路径（按你喜好填写）。

以下为设置相关的序列化处理器，不会有任何实际操作，只在调用时输出信息：

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
你可以使用任何名字来命名你的自定义序列化处理器，`CustomSettingsSlotManager`名字只是个示例。
:::

当自定义的处理器设置完成，它会出现状态配置菜单，你可以在此启用它而非内置的。

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)

