# エンジンサービス

エンジンの機能のほとんどは、エンジンサービスを介して実装されています。エンジンサービスは、シナリオスクリプトの実行、アクターの管理、ゲーム状態のセーブとロードなどの特定の処理を担当する `IEngineService` インターフェースの実装です。

エンジンシステムとのやり取りには、通常、エンジンサービスを使用します。静的メソッド `Engine.GetService<TService>()` でエンジンサービスへの参照を取得できます。ここで `TService` は取得したいサービスのインターフェースです。たとえば、`IScriptPlayer` サービスを取得するには次のようにします。

```cs
var player = Engine.GetService<IScriptPlayer>();
player.MainTrack.Stop();
```

::: info NOTE
エンジンの初期化手順は非同期であるため、自動初期化が有効になっている場合でも、Unityがシーンをロードした直後（たとえば、`Awake`、`Start`、`OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) メソッド内）にエンジンAPI（`GetService` メソッドなど）が利用できない場合があります。詳細については、[エンジンAPIへのアクセス](/ja/guide/integration-options#エンジンapiへのアクセス) ガイドを参照してください。
:::

現在、次のサービスが利用可能です。

| サービスインターフェース | 説明 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| IBackgroundManager | [背景](/ja/guide/backgrounds) アクターを管理します。 |
| ICharacterManager | [キャラクター](/ja/guide/characters) アクターを管理します。 |
| IChoiceHandlerManager | [選択肢ハンドラー](/ja/guide/choices) アクターを管理します。 |
| ITextPrinterManager | [テキストプリンター](/ja/guide/text-printers) アクターを管理します。 |
| IAudioManager | オーディオ（[SFX](/ja/guide/audio#sfx-効果音)、[BGM](/ja/guide/audio#bgm-背景音楽)、[ボイス](/ja/guide/voicing)）を管理します。 |
| IInputManager | [入力処理](/ja/guide/input-processing) を管理します。 |
| ILocalizationManager | [ローカライズ](/ja/guide/localization) 関連の処理を管理します。 |
| ICommunityLocalization | [コミュニティローカライズ](/ja/guide/localization#コミュニティローカライズ) のリソースへのアクセスを提供します。 |
| ITextLocalizer | `LocalizableText` の値に対応するローカライズされた文字列を解決します。 |
| ITextManager | [管理テキスト](/ja/guide/managed-text) 機能を処理します。 |
| IMoviePlayer | [ムービー](/ja/api/#movie) の再生を処理します。 |
| IScriptManager | [シナリオスクリプト](/ja/guide/scenario-scripting) のリソースを管理します。 |
| IScriptLoader | シナリオスクリプトに関連付けられたリソースの [ロードとアンロード](/ja/guide/memory-management) を処理します。 |
| IScriptPlayer | [シナリオスクリプト](/ja/guide/scenario-scripting) の実行を処理します。 |
| ICameraManager | シーンレンダリングに必要なカメラやその他のシステムを管理します。 |
| IResourceProviderManager | `IResourceProvider` オブジェクトを管理します。 |
| IStateManager | `IEngineService` 関連の永続データのシリアル化/逆シリアル化を処理し、ゲーム状態を [セーブおよびロード](/ja/api/#save) するAPIを提供します。 |
| IUIManager | `IManagedUI` オブジェクトを管理し、[UIのカスタマイズ](/ja/guide/gui#uiのカスタマイズ) 機能を処理します。 |
| IVariableManager | [シナリオ変数](/ja/guide/variables) へのアクセスと変更の手段を提供します。 |
| ISpawnManager | [@spawn] コマンドでスポーンされたオブジェクトを管理します。 |
| IUnlockableManager | [アンロック可能アイテム](/ja/guide/unlockables)（CGギャラリーやムービーギャラリーのアイテム、ヒントなど）を管理します。 |

サービスの組み込み実装は、`Naninovel/Runtime` に保存されているランタイムソースコードで確認できます。

## カスタムサービスの追加

新しいカスタムエンジンサービスを追加するには、`IEngineService` インターフェースを実装し、実装クラスに `InitializeAtRuntime` 属性を追加します。エンジンの初期化中に実装のインスタンスが自動的に作成され、`Engine.GetService<TService>()` APIを介して利用可能になります。

`InitializeAtRuntime` 属性の `InitializationPriority` 引数を使用して、カスタムサービスが他のサービスより前または後に初期化されるよう強制できます。値が小さいほど初期化キュー内で他のサービスより前に配置され、大きいほど後ろに配置されます。

自動的にインスタンス化されるには、サービス実装に互換性のあるコンストラクター（またはデフォルトのコンストラクター）が必要です。次のコンストラクター引数（順序は問いません）が許可されています。

- 任意の数の他のサービス（`IEngineService` 派生）
- 任意の数の構成オブジェクト（`Configuration` 派生）
- Unityの `MonoBehaviour` プロキシオブジェクト（`IEngineBehaviour` 派生）

コンストラクターで他のサービスを使用するのは安全ではないことに注意してください。代わりに、他のサービスを必要とする初期化処理は `InitializeService` メソッドで実行してください。アクセス時に必要なサービスが確実に初期化されているようにするには、それらをサービスのコンストラクター引数に列挙します（初期化キューは、コンストラクター引数に基づいてトポロジカルソートされます）。

他のエンジンサービスとともにシリアル化/逆シリアル化したい永続的な状態がカスタムサービスにある場合は、`IStatefulService<TState>` インターフェースを実装します。ここで、`TState` は、状態をゲームセッション固有のデータ、グローバルデータ、設定データのどれと一緒に保存するかに応じて、`GameStateMap`、`GlobalStateMap`、`SettingsStateMap` のいずれかになります。必要に応じて、単一のサービスに対して3つのインターフェースすべてを実装できます。さまざまな種類のエンジン状態の詳細については、[状態管理ガイド](/ja/guide/state-management) を参照してください。

以下は、いくつかの使用上の注意を含むカスタムエンジンサービス実装の例です。

```cs
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
        // この時点で、コンストラクターで要求したサービスを安全に使用できます。
        Debug.Log(inputManager.Enabled);
        Debug.Log(scriptPlayer.MainTrack.PlayedScript);
        return Async.Completed;
    }

    public void ResetService ()
    {
        // ここでサービスの状態をリセットします。
    }

    public void DestroyService ()
    {
        // ここでサービスを停止し、使用中のリソースを解放します。
    }
}
```

これで、次の方法で前述のカスタムサービスにアクセスできます。

```cs
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
アイテムリソースとインベントリUIの構成を管理するカスタムエンジンサービスを追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタムエンジンサービスは `Scripts/Runtime/Inventory/InventoryManager.cs` ランタイムスクリプトを介して実装されています。
:::

## 組み込みサービスのオーバーライド

エンジンのソースコードでは、すべての組み込みサービスがインターフェースを介して参照されているため、いずれのサービスもカスタム実装に差し替えることができます。

上記と同じ方法でカスタムサービスを追加しますが、`IEngineService` の代わりに具体的なエンジンインターフェースを実装し、`InitializeAtRuntime` 属性を介してオーバーライドする型（インターフェースではなく実装の型）を指定します。これにより、組み込みのものの代わりにカスタム実装が初期化されます。

以下は、いずれかのメソッドが呼び出されたときにログを出力するだけで他には何もしない、ダミーの `IInputManager` 実装の例です。

```cs
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

    public void AddMuter (object muter, IReadOnlyCollection<string> allowedIds = null)
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
