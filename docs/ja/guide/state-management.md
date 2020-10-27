# ステート管理

Naninovelによって実行時に生成および使用されるすべての永続データは、3つのカテゴリに分かれています:

- ゲームステート
- グローバルステート
- ユーザー設定

データはJSON形式にシリアル化され、バイナリの `.nson` (デフォルト) または テキストの `.json` (ステートコンフィグメニューで切り替えられます)に保存されます。セーブスロットファイルはプラットフォーム固有の [永続データディレクトリ](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 以下にあります。WebGLプラットフォームでは、最新のWebブラウザーのLFSセキュリティポリシーにより、シリアル化されたデータは [Indexed DB](https://en.wikipedia.org/wiki/Indexed_Database_API) に保存されます。

設定メニューで対応するシリアル化ハンドラーを選択することで、ローカルファイルの代わりに、key-value [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) データベースにステートスロットを保存できます。

セーブフォルダへのパス、セーブスロットの最大許容量、およびファイル名は、ステートコンフィグメニューで変更できます。

![](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

## ゲームステート

ゲームステートは、ゲームのセーブスロットごとに異なるデータであり、プレーヤーのゲームの進行状況に関連するエンジンサービスやその他のオブジェクトの状態を示します。ゲームステートデータの例: 現在再生さ中のnaninovelスクリプトと、スクリプトで再生中のスクリプトコマンドのインデックス、現在表示されているキャラクターとシーン上の位置、現在再生中のバックグラウンドミュージックトラック名とそのボリュームなどです。

現在のゲームステートを特定のセーブスロットにセーブまたはロードするには、次のように `IStateManager`エンジンサービスを使用します:

```csharp
// ステートマネージャーのインスタンスを取得。
var stateManager = Engine.GetService<IStateManager>();

// 現在のゲームセッションを `mySaveSlot` スロットにセーブ。
await stateManager.SaveGameAsync("mySaveSlot");
// `mySaveSlot` スロットからゲームセッションをロード。
await stateManager.LoadGameAsync("mySaveSlot");

// スロット名を指定せずに、クイックセーブロードメソッドを使用することもできます。
await stateManager.QuickSaveAsync();
await stateManager.QuickLoadAsync();
```

セーブロードAPIは [非同期](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) です。同期メソッドからAPIを呼び出す場合、`IStateManager.OnGameSaveFinished` と `IStateManager.OnGameLoadFinished` を使用してイベント完了へ登録します。

## グローバルステート

ただし一部のデータは、ゲームセッション全体で保持される必要があります。たとえば、"既読テキストをスキップ" 機能では、naninovelスクリプトコマンドが最低1回実行されたかのデータをエンジンで保存する必要があります（つまり、プレーヤーがそれを"読んだ"かどうか）。このようなデータは、単一の "グローバル" セーブスロットに格納され、ゲームのセーブロード操作には依存しません。

グローバルステートは、エンジンの初期化時に自動的にロードされます。 次のように `IStateManager` を使用していつでもグローバル状態を保存できます:

```csharp
await stateManager.SaveGlobalStateAsync();
```

## ユーザー設定

グローバル状態と同様に、ユーザー設定データ（ディスプレイの解像度、言語、音量など）は単一のセーブスロットに保存されますが、デフォルトでは少し異なります。生成された保存ファイルは "Saves" フォルダーの外に配置され、読みやすい形式でフォーマットされています。これによりユーザーは必要に応じて値を変更できます。

ユーザー設定は、エンジンの初期化時に自動的にロードされます。 次のように `IStateManager` を使用していつでもユーザー設定を保存できます:

```csharp
await stateManager.SaveSettingsAsync();
```

## カスタムステート

カスタムオブジェクトのステート処理を `IStateManager` に "アウトソース" することができます。こうするとプレーヤーがゲームをセーブするとき、すべてのエンジンのデータを含むセーブスロットにシリアル化し、ゲームをロードするときに逆シリアル化できるようにすることができます。

次の例は、一般的な `MonoBehaviour` をセーブロード操作にサブスクライブする方法を示しています:

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
インベントリUIでカスタムステートを使用したセーブロードステートの例は、 [GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) にあります。

具体的には、カスタムステートの非/シリアル化は [InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L238) ランタイムスクリプトで実装されています。UIスロットのカスタムステートは [InventorySlotState.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventorySlotState.cs) で実装されています。
:::

## カスタムシリアル化ハンドラー

デフォルトでは、エンジンのステート（ゲームセーブ、グローバルステート、設定）は、クロスプラットフォームのIO APIを介してローカルファイルシステムにシリアル化されます。ただし、プラットフォーム固有の実装がそのままでは利用できない場合があります。たとえば、任天堂はSwitchネイティブライブラリへのアクセスを制限することを決定し、サードパーティでプラットフォームをサポートすることができなくなりました。そのような場合のために、Naninovelはカスタムのシリアル化ハンドラーを提供しています。

カスタムハンドラーを追加するには `ISaveSlotManager<GameStateMap>`、 `ISaveSlotManager<GlobalStateMap>`、 `ISaveSlotManager<SettingsStateMap>` インターフェースをゲームセーブスロット、グローバルステート、設定にそれぞれ実装します（それぞれに独自の実装クラスが必要です）。

実装には互換性のあるパブリックコンストラクターが必要です: `public CustomSlotManager (StateConfiguration config, string savesFolderPath)`、ここで `config` はステート設定オブジェクトのインスタンス、`savesFolderPath` はセーブフォルダーへのパスです（このパスを無視して自身に合うものを使用して構いません）。

以下は、シリアル化ハンドラーのダミー設定の例です。そのメソッドが呼び出されたときにログを記録するだけです。

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
カスタムシリアル化ハンドラーには任意の名前を付けることができます。`CustomSettingsSlotManager` は一例です。
:::

カスタムハンドラーが実装されると、ステートコンフィグメニューに表示されます。これを組み込みハンドラーに代わって設定できます。

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)
