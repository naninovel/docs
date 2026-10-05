# 状態管理

Naninovelが実行時に生成および使用するすべての永続データは、次の3つのカテゴリに分類されます。

- ゲーム状態
- グローバル状態
- ユーザー設定

データはJSON形式にシリアル化され、プラットフォーム固有の [永続データディレクトリ](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) の下にバイナリ `.nson`（デフォルト）またはテキスト `.json` セーブスロットファイルとして保存されます。WebGLでは、最新のブラウザーのセキュリティポリシーにより、シリアル化されたデータは代わりに [IndexedDB](https://en.wikipedia.org/wiki/Indexed_Database_API) に保存されます。

シリアル化の動作は、ゲームのセーブ、グローバル状態、およびユーザー設定に対して独立してシリアル化ハンドラーによって制御されます。デフォルトでは、ユニバーサルシリアル化ハンドラーが使用されます。ほとんどの場合、非同期の [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) を使用して、ローカルファイルシステムにスロットファイルを読み書きします。ただし、一部のプラットフォーム（ゲームコンソールなど）では、.NET IO APIが使用できないため、ユニバーサルハンドラーはUnityのクロスプラットフォーム [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) にフォールバックします。

シリアル化ハンドラー、セーブフォルダーへのパス、許可されるセーブスロットの最大数、およびその他の関連パラメーターは、状態構成メニューから変更できます。

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

## ゲーム状態

ゲーム状態は、ゲームのセーブスロットごとに異なるデータであり、プレイヤーの進行状況に関連するエンジンサービスやその他のオブジェクトの状態を記述します。例としては、現在再生中のシナリオスクリプトとそのスクリプト内で再生されたスクリプトコマンドのインデックス、現在表示されているキャラクターとそのシーン上の位置、現在再生中の背景音楽トラック名とその音量などがあります。

現在のゲーム状態を特定のセーブスロットにセーブまたはロードするには、次のように `IStateManager` エンジンサービスを使用します。

```csharp
// 状態マネージャーのインスタンスを取得します。
var stateManager = Engine.GetService<IStateManager>();

// 現在のゲームセッションを `mySaveSlot` スロットにセーブします。
await stateManager.SaveGame("mySaveSlot");
// `mySaveSlot` スロットからゲームセッションをロードします。
await stateManager.LoadGame("mySaveSlot");

// スロット名を指定せずにクイックセーブ・ロードメソッドを使用することもできます。
await stateManager.QuickSave();
await stateManager.QuickLoad();
```

セーブ・ロードAPIは [非同期](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) であることに注意してください。同期メソッドからAPIを呼び出す場合は、`IStateManager.OnGameSaveFinished` および `IStateManager.OnGameLoadFinished` を使用して完了イベントをサブスクライブします。

## グローバル状態

一部のデータは、ゲームセッションをまたいで保持される必要があります。たとえば、「既読テキストのスキップ」機能では、どのシナリオスクリプトコマンドが少なくとも1回実行されたか（つまり、プレイヤーがすでに「見た」か）をエンジンが保存する必要があります。このようなデータは単一の「グローバル」セーブスロットに保存され、ゲームのセーブ・ロード操作には依存しません。

グローバル状態は、エンジンの初期化時に自動的にロードされます。`IStateManager` を使用して、いつでもグローバル状態を保存できます。

```csharp
await stateManager.SaveGlobal();
```

## ユーザー設定

言語、音量、テキスト速度などのユーザー設定は、グローバル状態と同様に単一のセーブスロットに保存されます。設定ファイルは、ユーザーが希望する場合に値を変更できるように、`Binary Save Files` が有効な場合でも常にテキスト `.json` として保存されます。

ユーザー設定は、エンジンの初期化時に自動的にロードされます。`IStateManager` を使用して、いつでも設定を保存できます。

```csharp
await stateManager.SaveSettings();
```

## セーブファイル

ファイルシステムにアクセスできるプラットフォームでユニバーサルシリアル化ハンドラーが使用される場合、すべての状態はUnityの [永続データディレクトリ](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 下の `Saves` フォルダーに書き込まれます。たとえば、会社名が `Foo` でゲームタイトルが `Bar` の場合、パスは次のようになります。

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

フォルダーには次のファイルが含まれます。`###` はスロット番号です。

| ファイル                | デフォルトの上限 | 内容                                 |
|-------------------------|------------------|--------------------------------------|
| `GameSave###.nson`      | 99               | セーブスロットのゲーム状態。         |
| `GameQuickSave###.nson` | 18               | クイックセーブスロットのゲーム状態。 |
| `GameAutoSave###.nson`  | 18               | オートセーブスロットのゲーム状態。   |
| `GlobalSave.nson`       | 1                | グローバル状態。                     |
| `Settings.json`         | 1                | ユーザー設定。                       |

デフォルトのスロット上限では、フォルダーには最大137個のファイルが含まれます。ゲーム状態ファイルのサイズは、主にカメラ構成の `Thumbnail Resolution` と状態構成の `Saved Rollback Steps` によって決まります。

`Binary Save Files` が無効な場合、ゲーム状態とグローバル状態のファイルの拡張子は `.nson` ではなく `.json` になります。フォルダー名、ファイル名、およびスロット上限は、状態構成で変更できます。

Unityエディターでは、ファイルは代わりにNaninovelデータフォルダー（デフォルトでは `Assets/NaninovelData`）の `.nani/Transient/Saves` 下に保存されます。

::: tip
[Steam Auto-Cloud](https://partner.steamgames.com/doc/features/cloud#steam_auto-cloud) などのクラウドセーブサービスでは、`Saves` フォルダーのみを同期してください。永続データディレクトリ内のその他のファイルは、そのデバイスでのみ使用されるものです。`Settings.json` にはグラフィック品質や入力バインディングなどのデバイス固有のオプションが含まれるため、同期対象を `.nson` ファイルに限定することを検討してください。Steamworksのドキュメントには、Unityゲーム向けにパスを構成する [例](https://partner.steamgames.com/doc/features/cloud#example) があります。
:::

## カスタム状態

カスタムオブジェクトの状態処理を `IStateManager` に委任すると、プレイヤーがセーブしたときにエンジンのすべてのデータとともにセーブスロットにシリアル化され、ゲームがロードされたときに逆シリアル化されるようになります。組み込みの状態関連機能（ロールバックなど）も、カスタム状態でそのまま機能します。

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

ゲーム状態がロードされた後にカスタムオブジェクトが作成される場合は、`IStateManager.Game` を使用して最後にロードされた状態にアクセスし、手動で逆シリアル化メソッドを呼び出します。

```csharp
private async void Start ()
{
    if (stateManager.Game is { } state)
        await DeserializeState(state);
}
```

::: tip EXAMPLE
カスタム構造体のリストを使用してインベントリUIのゲーム状態をセーブ・ロードする、カスタム状態のより高度な使用例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタム状態のシリアル化/逆シリアル化は `Scripts/Runtime/Inventory/UI/InventoryUI.cs` に実装されています。
:::

エンジンのグローバル状態および設定状態にアクセスして、カスタムデータをそれらと一緒に保存することもできます。ゲームセッションに固有であり、セーブ/ロードイベントのサブスクライブが必要なゲーム状態とは異なり、グローバル状態および設定状態のオブジェクトはシングルトンであり、状態マネージャーのプロパティを介して直接アクセスできます。

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

状態オブジェクトは型によってインデックス付けされます。場合によっては、同じ型のオブジェクトインスタンスが複数あり、それぞれが独自の状態を持つことがあります。`GetState` と `SetState` の両方のメソッドでは、そのようなオブジェクトを区別するためにオプションの `instanceId` 引数を指定できます。例：

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

デフォルトでは、ユニバーサルシリアル化ハンドラーが選択されている場合、エンジンの状態（ゲームのセーブ、グローバル状態、設定）は、非同期 [System.IO](https://docs.microsoft.com/en-us/dotnet/api/system.io) を介して、または一部のプラットフォームのフォールバックとしてUnityのクロスプラットフォーム [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) を使用してシリアル化されます。シリアル化の方法をカスタマイズするには、カスタムハンドラーを使用します。

カスタムハンドラーを追加するには、ゲームのセーブスロット、グローバル状態、および設定に対してそれぞれ `ISaveSlotManager<GameStateMap>`、`ISaveSlotManager<GlobalStateMap>`、および `ISaveSlotManager<SettingsStateMap>` インターフェースを実装します（それぞれに独自の実装クラスが必要です）。

実装には、`StateConfiguration` と `string` 引数を持つパブリックコンストラクタが必要です。1つ目は状態構成オブジェクトで、2つ目はセーブフォルダーへのパスです。必要に応じて、カスタム実装で引数を無視できます。

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
