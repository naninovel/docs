# エンジンサービス

エンジン機能のほとんどは、エンジンサービスを介して実装されます。 エンジンサービスは `IEngineService` インターフェースの実装であり、naninovelスクリプトの実行、アクターの管理、ゲームのセーブロードなど、特定のジョブを処理します。

エンジンシステムとやり取りする場合は、エンジンサービスを使用することをお勧めします。エンジンサービスへの参照は、静的メソッド `Engine.GetService<TService>()` で取得できます。ここで `TService` は、参照するサービスのタイプ（インターフェース）です。 たとえば、 `IScriptPlayer` サービスを取得するには:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

以下のサービスが利用可能です:

サービスインターフェース | 説明
--- | ---
IBackgroundManager | [背景](/ja/guide/backgrounds) アクターの管理
ICharacterManager | [キャラクター](/ja/guide/characters) アクターの管理
IChoiceHandlerManager | [選択肢ハンドラー](/ja/guide/choices) アクターの管理
ITextPrinterManager | [テキストプリンター](/ja/guide/text-printers) アクターの管理
IAudioManager | オーディオ: [SFX](/ja/guide/audio#効果音)、 [BGM](/ja/guide/audio#background-music)、 [ボイス](/ja/guide/voicing)の管理
IInputManager | ユーザー [入力処理](/ja/guide/input-processing)の管理
ILocalizationManager| [ローカライズ](/ja/guide/localization) アクティビティの管理
ITextManager | [テキスト管理](/ja/guide/managed-text) 機能を制御
IMoviePlayer | [ムービー](/ja/guide/movies) 再生を制御
IScriptManager | [Naninovel スクリプト](/ja/guide/naninovel-scripts) リソースの管理
IScriptPlayer | [Naninovel スクリプト](/ja/guide/naninovel-scripts) 実行を制御
ICameraManager | シーンのレンダリングに必要なカメラやその他のシステムを管理
IResourceProviderManager | `IResourceProvider` オブジェクトを管理
IStateManager | `IEngineService`関連の永続的なデータの逆シリアル化を処理。 [セーブロードシステム](/ja/guide/save-load-system) ゲームステートにAPIを提供。
IUIManager | `IManagedUI` オブジェクトを管理し、[カスタムUI](/ja/guide/user-interface#カスタムUI) 機能を制御
ICustomVariableManager | [カスタム変数](/ja/guide/custom-variables) へのアクセスと編集を可能にする
ISpawnManager | [@spawn] コマンドで生成されたオブジェクトを管理
IUnlockableManager | [収集アイテム](/ja/guide/unlockable-items) (CGやムービーギャラリー, tipsなど) を管理

サービスの組み込み実装は、 `Naninovel/Runtime` に格納されているランタイムソースコードにあります。

## カスタムサービスの追加

新しいカスタムエンジンサービスを追加するには、`IEngineService` インターフェースを実装し、実装クラスに `InitializeAtRuntime` 属性を追加します。実装のインスタンスはエンジンの初期化中に自動的に作成され、`Engine.GetService<TService>()` APIを介して利用できるようになります。

`InitializeAtRuntime` 属性の `InitializationPriority` 引数を使用して、他のサービスの前後にカスタムサービスを強制的に初期化できます。値を小さくすると、初期化キュー内の他のサービスの前にプッシュされます。逆も同様です。

自動的にインスタンス化するには、サービス実装に互換性のあるコンストラクター（またはデフォルトのコンストラクター）が必要です。以下の引数（任意の順序）を使用できます:

- 任意の数の他のサービス (`IEngineService`-派生)
- 任意の数の構成オブジェクト (`Configuration`-派生)
- Unityの "MonoBehavior" プロキシーオブジェクト (`IEngineBehaviour`-派生)

コンストラクタで他のサービスを使用するのは安全ではないので、注意してください。代わりに、 `InitializeServiceAsync` メソッドで他のサービスを使用する必要がある初期化アクティビティを実行します。サービスにアクセスするときに必要なサービスが確実に初期化されるようにするには、それらをサービスコンストラクターにリストします（初期化キューは、コンストラクターの引数に基づいてトポロジ的にソートされます）。

カスタムサービスに永続的なステートがあり、他のエンジンサービスで非/シリアル化したい場合は、  `IStatefulService<TState>` インターフェイスを実装します。ここで、`TState` は、`GameStateMap`、`GlobalStateMap`、または `SettingsStateMap`です。これはステートをゲームセッション固有のもの、グローバルステートまたは、設定で保存するかによって決まります。必要に応じて、1つのサービスに3つすべてのインターフェースを実装することができます。さまざまなタイプのエンジン状態の詳細については、[ステート管理ガイド](/ja/guide/state-management)を参照してください。

以下は、いくつかの使用上の注意を伴うカスタムエンジンサービス実装の例です:

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime]
public class CustomService : IEngineService
{
    private readonly InputManager inputManager;
    private readonly ScriptPlayer scriptPlayer;

    public CustomService (InputManager inputManager, ScriptPlayer scriptPlayer)
    {
        // サービスはここではまだ初期化されていない可能性があるため、
        // 使用しないでください。
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public UniTask InitializeServiceAsync ()
    {
    	// ここでサービスを初期化します。
        // これで、コンストラクターでリクエストされたサービスを使用しても安全です。
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        // ここでサービスステートをリセットします。
    }

    public void DestroyService ()
    {
        // サービスを停止し、使用されているリソースをここで解放します。
    }
}
```

前述のサービスの場合、次の方法でエンジンAPIを介して取得できます:

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
アイテムのリソースとインベントリUIの構成を管理するカスタムエンジンサービスを追加する別の例は、[GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) にあります。

具体的には、カスタムエンジンサービスは [InventoryManager.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryManager.cs)  ランタイムスクリプトを介して実装されます。
:::

## 組み込みサービスの上書き

すべての組み込みサービスは、エンジンのソースコード内のインターフェイスを介して参照されるため、カスタム実装で入れ替えることができます。

カスタムサービスは上記と同じ方法で追加しますが、`IEngineService` の代わりに具象エンジンインターフェースを実装し、`InitializeAtRuntime` 属性で上書きするタイプ（インターフェースではなく実装タイプ）を指定します。すると、組み込みサービスの代わりにカスタム実装が初期化されます。

以下は、ダミーの `IInputManager` 実装の例です。これは何もしませんが、いずれかのメソッドが呼び出されるとログに記録します。

```csharp
using Naninovel;
using Naninovel.UI;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime(@override: typeof(InputManager))]
public class CustomInputManager : IInputManager
{
    public InputConfiguration Configuration { get; }
    public bool ProcessInput { get; set; }

    public CustomInputManager (InputConfiguration config)
    {
        Configuration = config;
    }

    public UniTask InitializeServiceAsync ()
    {
        Debug.Log("CustomInputManager::InitializeServiceAsync()");
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        Debug.Log("CustomInputManager::ResetService()");
    }

    public void DestroyService ()
    {
        Debug.Log("CustomInputManager::DestroyService()");
    }

    public IInputSampler GetSampler (string bindingName)
    {
        Debug.Log($"CustomInputManager::GetSampler({bindingName})");
        return default;
    }

    public void AddBlockingUI (IManagedUI ui, params string[] allowedSamplers)
    {
        Debug.Log($"CustomInputManager::AddBlockingUI({ui.GetType().Name})");
    }

    public void RemoveBlockingUI (IManagedUI ui)
    {
        Debug.Log($"CustomInputManager::RemoveBlockingUI({ui.GetType().Name})");
    }
}
```

これで、`Engine.GetService<IInputManager>()` から入力マネージャーが要求されると、組み込みの `Naninovel.InputManager` ではなく、カスタム実装が提供されます。
