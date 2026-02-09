# インテグレーションの方法

Naninovelは従来のビジュアルノベルゲームに重点を置いており、そのテンプレートとして最適に機能しますが、既存のプロジェクトとエンジンを統合することも可能です。3Dアドベンチャーゲーム、RPG、またはその他のジャンルのゲームを作成している場合でも、Naninovelを組み込みのダイアログシステムとして使用できます。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

Naninovelをカスタムプロジェクトと統合する方法は複数あります。特定の実装は、プロジェクトのタイプと達成したい内容によって異なります。以下のドキュメントでは、Naninovelをスタンドアロンゲームと「ペアリング」するのに役立つさまざまな構成オプションとAPIをリストします。続行する前に、[エンジンアーキテクチャ](/ja/guide/engine-architecture) を参照して、概念的な動作をよりよく理解してください。

::: tip EXAMPLE
Naninovelが3Dアドベンチャーゲームの組み込みダイアログシステムとしても、スタンドアロンのノベルモードとしても使用されている [インテグレーションサンプル](/ja/guide/samples#インテグレーション) を確認してください。
:::

## 手動初期化

エンジン構成メニューの `Initialize On Application Load` オプションが有効になっている場合、エンジンサービスはアプリケーションの起動時に自動的に初期化されます。

![](https://i.gyazo.com/6349692c2e2036e908e41c3d89509102.png)

ノベルモードでゲームを開始したくない限り、C#から静的な `RuntimeInitializer.Initialize()` メソッドを呼び出すか、シーン内のGameObjectに `Runtime Initializer` コンポーネントを追加して、必要なときに手動でエンジンを初期化する必要があります。後者の場合、Unityでシーンがロードされたときにエンジンが初期化されます。

以下は、MonoBehaviourスクリプトからの手動初期化の例です。

```csharp
using Naninovel;
using UnityEngine;

public class MyScript : MonoBehaviour
{
    private async void Start ()
    {
        await RuntimeInitializer.Initialize();
    }
}
```

`Scene Independent` を無効にすると、すべてのNaninovel関連オブジェクトは、エンジンが初期化されたUnityシーンの一部になります。シーンがアンロードされると、エンジンは破棄されます。

エンジンサービスをリセット（およびほとんどの占有リソースを破棄）するには、`IStateManager` サービスの `ResetState()` メソッドを使用します。これは、エンジンを再初期化せずにノベルモードに戻ることができる状態で、一時的に別のゲームプレイモードに切り替えるときに役立ちます。

すべてのエンジンサービスを破棄し、メモリからNaninovelを完全に削除するには、`Engine.Destroy()` 静的メソッドを使用します。

## エンジンAPIへのアクセス

エンジンの初期化手順は非同期であるため、自動初期化が有効になっている場合でも、Unityがシーンをロードした直後（たとえば、`Awake`、`Start`、`OnEnable` MonoBehaviourメソッド内）にエンジンAPIが利用できない場合があります。

エンジンが現在利用可能かどうかを確認するには、`Engine.Initialized` プロパティを使用します。`Engine.OnInitializationFinished` イベントを使用すると、初期化手順が完了した後にアクションを実行できます。例：

```csharp
public class MyScript : MonoBehaviour
{
    private void Awake ()
    {
        // ここではエンジンが初期化されていない可能性があるため、最初に確認してください。
        if (Engine.Initialized) DoMyCustomWork();
        else Engine.OnInitializationFinished += DoMyCustomWork;
    }

    private void DoMyCustomWork ()
    {
        // エンジンはここで初期化されており、APIを使用しても安全です。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## シナリオスクリプトの再生

指定されたパスのシナリオスクリプトをプリロードして再生するには、`IScriptPlayer` サービスの `LoadAndPlay(ScriptPath)` メソッドを使用します。エンジンサービスを取得するには、`Engine.GetService<TService>()` 静的メソッドを使用します。ここで、`TService` は取得するサービスのタイプ（インターフェイス）です。たとえば、次はスクリプトプレイヤーサービスを取得し、`Script001` という名前のスクリプトをプリロードして再生します。

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.MainTrack.LoadAndPlay("Script001");
```

ノベルモードを終了してメインゲームモードに戻るときは、現在Naninovelによって使用されているすべてのリソースをアンロードし、エンジンサービスを停止することをお勧めします。これには、`IStateManager` サービスの `ResetState()` メソッドを使用します。

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### スクリプトアセットの参照

カスタムシステムでシナリオスクリプトアセットを参照したい場合（たとえば、ダイアログやカットシーンを再生するため）、スクリプトパスを直接保存するのは、ファイルの場所と名前に依存するため脆弱であることに注意してください。

代わりに、アセット参照（GUID）を使用してください。関連するファイルが移動または名前変更されても、参照は変更されません。GUIDからスクリプトパスを解決するには、`ScriptAssets.GetPath` メソッドを使用します。Naninovelは `ScriptAssetRef` プロパティドロワーも提供しており、便宜上、スクリプトアセットをシリアル化されたフィールドに直接割り当てることができます。

以下は、プレイヤーがトリガーに衝突したときに指定されたスクリプトの再生を開始する [インテグレーションサンプル](/ja/guide/samples#インテグレーション) のコンポーネントです。

```cs
public class DialogueTrigger : MonoBehaviour
{
    [ScriptAssetRef]
    public string ScriptRef;
    public string Label;

    private void OnTriggerEnter (Collider other)
    {
        var player = Engine.GetService<IScriptPlayer>();
        var path = ScriptAssets.GetPath(ScriptRef);
        player.MainTrack.LoadAndPlayAtLabel(path, Label).Forget();
    }
}
```

エディタでは、スクリプトアセットを `Script Ref` フィールドにドラッグアンドドロップでき、スクリプトファイルが移動または名前変更されても参照はそのまま残ります。

![](https://i.gyazo.com/cd634c628a0a116397f6ecef837a10b0.png)

## タイトルメニューの無効化

エンジンが初期化されると、組み込みのタイトルメニュー実装が自動的に表示されますが、独自のタイトルメニューがある可能性があります。[UIのカスタマイズ機能](/ja/guide/gui#uiのカスタマイズ) を使用して、組み込みのタイトルメニューを変更、置換、または完全に削除できます。メニューは、UIリソースの `Title UI` の下にリストされています。

## エンジンオブジェクトレイヤー

構成メニューを介して、エンジンが作成するすべてのオブジェクト（UI関連を除く）に特定の [レイヤー](https://docs.unity3d.com/Manual/Layers.html) を割り当てることができます。

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

これにより、エンジンのカメラは [カリングマスク](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) を使用して、指定されたレイヤー上のオブジェクトのみをレンダリングするようになります。

エンジンによって管理されるUIオブジェクトのレイヤーを変更するには、UI構成メニューの `Objects Layer` オプションを使用します。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## テクスチャへのレンダリング

カメラ構成メニューでカスタムカメラプレハブを割り当てることにより、エンジンのカメラを画面ではなくカスタム [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) にレンダリングさせることができます（およびその他のカメラ関連設定を変更できます）。

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## モードの切り替え

プロジェクトに大きく依存しますが、以下はカスタムコマンドを介して「アドベンチャー」モードと「ノベル」モードの切り替えを実装する方法を示す（インテグレーションサンプルに基づく）抽象的な例です。

::: code-group

```csharp [SwitchToNovelMode.cs]
[Alias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptPath;
    public StringParameter Label;

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. キャラクター制御を無効にします。
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. カメラを切り替えます。
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. 指定されたスクリプトをロードして再生します（割り当てられている場合）。
        if (Assigned(ScriptPath))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.MainTrack.LoadAndPlayAtLabel(ScriptPath, Label);
        }

        // 4. Naninovel入力のミュートを解除します。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = false;
    }
}
```

```csharp [SwitchToAdventureMode.cs]
[Alias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. Naninovel入力をミュートします。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = true;

        // 2. スクリプトプレイヤーを停止します。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.MainTrack.Stop();

        // 3. 状態をリセットします。
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetState();

        // 4. カメラを切り替えます。
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. キャラクター制御を有効にします。
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

:::

その後、コマンドはシナリオスクリプトで使用できます。

```nani
; アドベンチャーモードに切り替えます。
@adventure
```

— またはC#で直接（例：`OnTrigger` Unityイベント内）：

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptPath = "Script001" };
	switchCommand.Execute().Forget();
}
```

## その他のオプション

エンジンを他のシステムと統合するときに役立つ機能は他にも多数あります（状態のアウトソーシング、サービスのオーバーライド、カスタムシリアル化、リソースおよび構成プロバイダーなど）。詳細については、ガイドの残りの部分を確認してください。利用可能な [構成オプション](/ja/guide/configuration) も調査することを検討してください。一部の機能はガイドに記載されていない場合がありますが、統合に役立つ場合があります。

一部のエンジンAPIまたはシステムに拡張性が欠けており、統合のためにソースコードの変更が必要であると感じた場合は、[サポートにお問い合わせください](/ja/support/#naninovel-support)。改善を検討します。

::: tip EXAMPLE
Naninovelが3Dアドベンチャーゲームの組み込みダイアログと、切り替え可能なスタンドアロンノベルモードの両方として使用されている [インテグレーションサンプル](/ja/guide/samples#インテグレーション) を確認してください。
:::
