# 状態管理

Naninovelが実行時に生成および使用するすべての永続データは、次の3つのカテゴリに分類されます。

- ゲームの状態
- グローバル状態
- ユーザー設定

データはJSON形式にシリアル化され、プラットフォーム固有の [永続データディレクトリ](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) の下にバイナリ `.nson`（デフォルト）またはテキスト `.json` セーブスロットファイルとして保存されます。WebGLでは、最新のブラウザのセキュリティポリシーにより、シリアル化されたデータは代わりに [IndexedDB](https://en.wikipedia.org/wiki/Indexed_Database_API) に保存されます。

シリアル化の動作は、ゲームのセーブ、グローバル状態、およびユーザー設定に対して独立してシリアル化ハンドラーによって制御されます。デフォルトでは、ユニバーサルシリアル化ハンドラーが使用されます。ほとんどの場合、非同期の [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) を使用して、ローカルファイルシステムにスロットファイルを読み書きします。ただし、一部のプラットフォーム（コンソールなど）では、.NET IO APIが使用できないため、ユニバーサルハンドラーはUnityのクロスプラットフォーム [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) にフォールバックします。

シリアル化ハンドラー、セーブフォルダへのパス、許可されるセーブスロットの最大数、およびその他の関連パラメータは、状態構成メニューから変更できます。

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

## ゲームの状態

ゲームの状態は、ゲームのセーブスロットごとに異なるデータであり、プレイヤーの進行状況に関連するエンジンサービスやその他のオブジェクトの状態を記述します。例としては、現在再生中のシナリオスクリプトとスクリプト内の再生されたスクリプトコマンドのインデックス、現在表示されているキャラクターとそのシーン上の位置、現在再生中の背景音楽トラック名とその音量などがあります。

現在のゲーム状態を特定のセーブスロットに保存またはロードするには、次のように `IStateManager` エンジンサービスを使用します。

```csharp
// 状態マネージャーのインスタンスを取得します。
var stateManager = Engine.GetService<IStateManager>();

// 現在のゲームセッションを `mySaveSlot` スロットに保存します。
await stateManager.SaveGame("mySaveSlot");
// `mySaveSlot` スロットからゲームセッションをロードします。
await stateManager.LoadGame("mySaveSlot");

// スロット名を指定せずにクイックセーブ・ロードメソッドを使用することもできます。
await stateManager.QuickSave();
await stateManager.QuickLoad();
```

セーブ・ロードAPIは [非同期](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) であることに注意してください。同期メソッドからAPIを呼び出す場合は、`IStateManager.OnGameSaveFinished` および `IStateManager.OnGameLoadFinished` を使用して完了イベントをサブスクライブします。

## グローバル状態

一部のデータは、ゲームセッション全体で永続的である必要があります。たとえば、「既読テキストのスキップ」機能では、どのシナリオスクリプトコマンドが少なくとも1回実行されたか（つまり、プレイヤーがすでに「見た」か）をエンジンが保存する必要があります。このようなデータは単一の「グローバル」セーブスロットに保存され、ゲームのセーブ・ロード操作には依存しません。

グローバル状態は、エンジンの初期化時に自動的にロードされます。`IStateManager` を使用して、いつでもグローバル状態を保存できます。

```csharp
await stateManager.SaveGlobalState();
```

## ユーザー設定

グローバル状態と同様に、ユーザー設定データ（ディスプレイ解像度、言語、音量など）は単一のセーブスロットに保存されますが、デフォルトでは扱いが異なります。生成されたセーブファイルは「Saves」フォルダの外に配置され、ユーザーが希望する場合に値を変更できるように読み取り可能な形式でフォーマットされます。

ユーザー設定は、エンジンの初期化時に自動的にロードされます。`IStateManager` を使用して、いつでも設定を保存できます。

```csharp
await stateManager.SaveSettings();
```

## カスタムステート

カスタムオブジェクトの状態処理を `IStateManager` に委任できるため、プレイヤーが保存するときにすべてのエンジンのデータとともにセーブスロットにシリアル化され、ゲームがロードされたときに逆シリアル化されます。組み込みの状態関連機能（ロールバックなど）も、カスタム状態でそのまま機能します。

次の例は、`MyCustomBehaviour` コンポーネントの状態処理の委任を示しています。

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

ゲームの状態がロードされた後にカスタムオブジェクトが作成される場合は、`LastGameState` を使用して最後にロードされた状態にアクセスし、手動で逆シリアル化メソッドを呼び出します。

```csharp
private async void Start ()
{
    if (stateManager.LastGameState is { } state)
        await DeserializeState(state);
}
```

::: tip EXAMPLE
カスタム構造体のリストを使用してインベントリUIのゲーム状態を保存・ロードするカスタム状態の使用に関するより高度な例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタム状態の逆シリアル化/シリアル化は `Scripts/Runtime/Inventory/UI/InventoryUI.cs` に実装されています。
:::

エンジンのグローバルおよび設定状態にアクセスして、カスタムデータを保存することもできます。ゲームセッションに固有であり、セーブ/ロードイベントのサブスクライブが必要なゲーム状態とは異なり、グローバルおよび設定状態オブジェクトはシングルトンであり、状態マネージャーのプロパティを介して直接アクセスできます。

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

状態オブジェクトはタイプごとにインデックス付けされます。場合によっては、それぞれが独自の状態を持つ同じタイプの複数のオブジェクトインスタンスがあるかもしれません。`GetState` と `SetState` の両方のメソッドでは、そのようなオブジェクトを区別するためにオプションの `instanceId` 引数を指定できます。

```csharp
[System.Serializable]
class MonsterState
{
    public int Health;
}

var monster1 = stateMap.GetState<MonsterState>("1");
var monster2 = stateMap.GetState<MonsterState>("2");
```

## カスタムシリアル化ハンドラー

デフォルトでは、ユニバーサルシリアル化ハンドラーが選択されている場合、エンジンの状態（ゲームのセーブ、グローバル状態、設定）は、非同期 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) を介して、または一部のプラットフォームのフォールバックとしてUnityのクロスプラットフォーム [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) を使用してシリアル化されます。シリアル化シナリオをカスタマイズするには、カスタムハンドラーを使用します。

カスタムハンドラーを追加するには、ゲームのセーブスロット、グローバル状態、および設定に対してそれぞれ `ISaveSlotManager<GameStateMap>`、`ISaveSlotManager<GlobalStateMap>`、および `ISaveSlotManager<SettingsStateMap>` インターフェイスを実装します（それぞれに独自の実装クラスが必要です）。

実装には、`StateConfiguration` と `string` 引数を持つパブリックコンストラクタが必要です。1つ目は状態構成オブジェクトで、2つ目はセーブフォルダへのパスです。必要に応じて、カスタム実装で引数を無視できます。

以下は、そのメソッドのいずれかが呼び出されたときにログを記録するだけのカスタム設定シリアル化ハンドラーの例です。

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
カスタムシリアル化ハンドラーには任意の名前を選択できます。`CustomSettingsSlotManager` は単なる例です。
:::

カスタムハンドラーが実装されると、状態構成メニューに表示され、組み込みのものの代わりに選択できます。

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)
