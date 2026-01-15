# エンジンサービス

エンジンの機能のほとんどは、エンジンサービスを介して実装されています。エンジンサービスは、シナリオスクリプトの実行、アクターの管理、ゲーム状態の保存とロードなどの特定のジョブを処理する `IEngineService` インターフェイスの実装です。

エンジンシステムと対話したい場合は、エンジンサービスを使用する可能性が最も高いです。静的メソッド `Engine.GetService<TService>()` を使用してエンジンサービスへの参照を取得できます。ここで `TService` は取得したいサービスのインターフェイスです。たとえば、`IScriptPlayer` サービスを取得するには：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

::: info NOTE
エンジンの初期化手順は非同期であるため、自動初期化が有効になっている場合でも、Unityがシーンをロードした直後（たとえば、`Awake`、`Start`、`OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) メソッド内）にエンジンAPI（`GetService` メソッドなど）が利用できない場合があります。詳細については、[エンジンAPIへのアクセス](/ja/guide/integration-options#エンジンapiへのアクセス) ガイドを参照してください。
:::

現在、次のサービスが利用可能です。

| サービスインターフェイス | 説明 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| IBackgroundManager | [背景](/ja/guide/backgrounds) アクターを管理します。 |
| ICharacterManager | [キャラクター](/ja/guide/characters) アクターを管理します。 |
| IChoiceHandlerManager | [選択肢ハンドラー](/ja/guide/choices) アクターを管理します。 |
| ITextPrinterManager | [テキストプリンター](/ja/guide/text-printers) アクターを管理します。 |
| IAudioManager | オーディオ（[SFX](/ja/guide/audio#sfx効果音)、[BGM](/ja/guide/audio#bgm背景音楽)、[ボイス](/ja/guide/voicing)）を管理します。 |
| IInputManager | ユーザー [入力処理](/ja/guide/input-processing) を管理します。 |
| ILocalizationManager | [ローカライズ](/ja/guide/localization) アクティビティを管理します。 |
| ITextManager | [管理テキスト](/ja/guide/managed-text) 機能を処理します。 |
| IMoviePlayer | [ムービー](/ja/api/#movie) 再生を処理します。 |
| IScriptManager | [シナリオスクリプト](/ja/guide/scenario-scripting) リソースを管理します。 |
| IScriptPlayer | [シナリオスクリプト](/ja/guide/scenario-scripting) の実行を処理します。 |
| ICameraManager | シーンレンダリングに必要なカメラやその他のシステムを管理します。 |
| IResourceProviderManager | `IResourceProvider` オブジェクトを管理します。 |
| IStateManager | `IEngineService` 関連の永続データの逆シリアル化/シリアル化を処理します。ゲーム状態の [保存とロード](/ja/api/#save) のAPIを提供します。 |
| IUIManager | `IManagedUI` オブジェクトを管理し、[UIのカスタマイズ](/ja/guide/gui#uiのカスタマイズ) 機能を処理します。 |
| ICustomVariableManager | [カスタム変数](/ja/guide/custom-variables) へのアクセスを提供し、変更を許可します。 |
| ISpawnManager | [@spawn] コマンドでスポーンされたオブジェクトを管理します。 |
| IUnlockableManager | [アンロック可能アイテム](/ja/guide/unlockable-items)（CGおよびムービーギャラリーアイテム、ヒントなど）を管理します。 |

サービスの組み込み実装は、`Naninovel/Runtime` に保存されているランタイムソースコードで見つけることができます。

## カスタムサービスの追加

新しいカスタムエンジンサービスを追加するには、`IEngineService` インターフェイスを実装し、実装クラスに `InitializeAtRuntime` 属性を追加します。エンジン初期化中に実装のインスタンスが自動的に作成され、`Engine.GetService<TService>()` APIを介して利用可能になります。

`InitializeAtRuntime` 属性の `InitializationPriority` 引数を使用して、他のサービスの前後にカスタムサービスを強制的に初期化できます。値が低いほど、初期化キューの他のサービスよりも前にプッシュされ、逆も同様です。

自動的にインスタンス化されるには、サービス実装に互換性のあるコンストラクタ（またはデフォルトのコンストラクタ）が必要です。次のコンストラクタ引数（順序は問いません）が許可されています。

- 任意の数の他のサービス（`IEngineService` 派生）
- 任意の数の構成オブジェクト（`Configuration` 派生）
- Unity `MonoBehaviour` プロキシオブジェクト（`IEngineBehaviour` 派生）

コンストラクタで他のサービスを使用するのは安全ではないことに注意してください。代わりに、`InitializeService` メソッドで他のサービスを必要とする初期化アクティビティを実行します。アクセス時に必要なサービスが初期化されていることを確認するには、サービスコンストラクタにリストします（初期化キューは、コンストラクタ引数に基づいてトポロジカルソートされます）。

他のエンジンサービスで逆シリアル化/シリアル化したい永続的な状態がカスタムサービスにある場合は、`IStatefulService<TState>` インターフェイスを実装します。ここで、`TState` は、状態をゲームセッション固有、グローバル、または設定データとともに保存するかどうかに応じて、`GameStateMap`、`GlobalStateMap`、または `SettingsStateMap` のいずれかです。必要に応じて、単一のサービスに対して3つのインターフェイスすべてを実装できます。さまざまな種類のエンジン状態の詳細については、[状態管理ガイド](/ja/guide/state-management) を参照してください。

以下は、いくつかの使用上の注意を含むカスタムエンジンサービス実装の例です。

```csharp
using Naninovel;
using UnityEngine;

[InitializeAtRuntime]
public class CustomService : IEngineService
{
    private readonly InputManager inputManager;
    private readonly ScriptPlayer scriptPlayer;

    public CustomService (InputManager inputManager, ScriptPlayer scriptPlayer)
    {
        // ここではサービスがまだ初期化されていない可能性があります。
        // 使用を控えてください。
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public Awaitable InitializeService ()
    {
        // ここでサービスを初期化します。
        // コンストラクタで要求されたサービスを使用しても安全です。
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return Async.Completed;
    }

    public void ResetService ()
    {
        // ここでサービスの状態をリセットします。
    }

    public void DestroyService ()
    {
        // ここでサービスを停止し、使用済みのリソースを解放します。
    }
}
```

これで、次の方法で前述のカスタムサービスにアクセスできます。

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
アイテムリソースとインベントリUIの構成を管理するカスタムエンジンサービスを追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタムエンジンサービスは `Scripts/Runtime/Inventory/InventoryManager.cs` ランタイムスクリプトを介して実装されています。
:::

## 組み込みサービスのオーバーライド

すべての組み込みサービスはエンジンソースコード内のインターフェイスを介して参照されているため、それらのいずれかをカスタム実装と交換することが可能です。

上記と同じ方法でカスタムサービスを追加しますが、`IEngineService` の代わりに具体的なエンジンインターフェイスを実装し、`InitializeAtRuntime` 属性を介してオーバーライドされたタイプ（インターフェイスではなく実装タイプ）を指定します。その後、組み込みのものの代わりにカスタム実装が初期化されます。

以下は、そのメソッドのいずれかが呼び出されたときにログを記録するだけのダミーの `IInputManager` 実装の例です。

```csharp
using Naninovel;
using UnityEngine;

[InitializeAtRuntime(@override: typeof(InputManager))]
public class CustomInputManager : IInputManager
{
    public InputConfiguration Configuration { get; }

    public CustomInputManager (InputConfiguration config)
    {
        Configuration = config;
    }

    public void AddMuter (object muter, IEnumerable<string> allowedIds = null)
    {
        Debug.Log("CustomInputManager::AddMuter()");
    }

    public void RemoveMuter (object muter)
    {
        Debug.Log("CustomInputManager::RemoveMuter()");
    }

    // その他...
}
```

これで、`Engine.GetService<IInputManager>()` を介して入力マネージャーが要求されると、組み込みの `Naninovel.InputManager` の代わりにカスタム実装が使用されます。
