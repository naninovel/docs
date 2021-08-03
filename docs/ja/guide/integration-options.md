# インテグレーションの方法

Naninovel は典型的なビジュアルノベルゲームのための用途を想定していますが、エンジンは既存のプロジェクトと連携できるように設計されています。 3Dアドベンチャーゲーム、RPG、または他のジャンルのゲームを作成している場合でも、一時的な会話システムとして Naninovel を使用できます。

[!b1b6042db4a91b3a8cee74236b33c17c]

Naninovelをカスタムプロジェクトと連携する方法はいくつかあります。具体的な実装は、プロジェクトの種類と、Naninovelで実現したいことによって異なります。以下のドキュメントは、Naninovelをスタンドアロンゲームと"ペアリング"するのに役立つさまざまな構成オプションとAPIをリストしています。続行する前に、[エンジンアーキテクチャ](/ja/guide/engine-architecture.md) を見て、概念レベルでの動作をよく理解してください。

::: example
[サンプルプロジェクト](/ja/guide/integration-options.md#サンプルプロジェクト) をご覧ください。ここでは、Naninovelが3Dアドベンチャーゲームの一時的なダイアログと、スタンドアロンのノベルモードとして使われてます。切り替え可能です。
:::

## 手動初期化

おそらく最初にするべきことは、エンジンコンフィグメニューの `Initialize On Application Load` オプションを無効にすることです。

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

有効になっていると、エンジンサービスはアプリケーションの起動時に自動的に初期化されます。ゲームをノベルモードで開始する場合を除き、実際に必要なときにエンジンを手動で初期化することをお勧めします。

組み込みのサービスAPIを使用する前に、静的な非同期の `RuntimeInitializer.InitializeAsync()` メソッド（またはカスタムスクリプト）を使用して、実行時にエンジンを初期化してください。エンジンが初期化されているかどうかは、`Engine.Initialized` プロパティで確認できます。`Engine.Initialized` イベントを使用して、初期化完了イベントを受け取ってください。

エンジンサービスをリセットするには（そして占有されているリソースのほとんどを破棄するには）、 `IStateManager` サービスの `ResetStateAsync()` メソッドを使用します。これは、一時的に他のゲームプレイモードに切り替えたとき、エンジンを再初期化せずにノベルモードに戻ることができるので便利です。

すべてのエンジンシステムを完全に無効にしてメモリから削除するには、静的メソッド `Engine.Destroy()` を使用します。

## Naninovel スクリプトの再生

特定の名前のnaninovelスクリプトをプリロードして再生するには、 `IScriptPlayer` サービスの `PreloadAndPlayAsync(ScriptName)` メソッドを使用します。エンジンサービスへの参照は、静的メソッド `Engine.GetService<TService>()` で取得できます。ここで `TService` は、参照するサービスのタイプ（インターフェース）です。たとえば、次の例ではスクリプトプレーヤーサービスを取得し、"Script001" という名前のスクリプトをプリロードして再生します:

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

ノベルモードを終了してメインゲームモードに戻る場合、Naninovelが現在使用しているすべてのリソースをアンロードし、すべてのエンジンサービスを停止する必要があります。これには、 `IStateManager` サービスの `ResetStateAsync()` メソッドを使用します:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetStateAsync();
```

## タイトルメニューの無効化

組み込みのタイトルメニューは、エンジンが初期化されるときに自動的に表示されますが、ほとんどの場合、独自のタイトルメニューを使いたいと思います。[カスタムUI機能](/ja/guide/user-interface.md#カスタムUI)を使用して組み込みのタイトルメニューを変更または完全に置き換えるか、エンジンコンフィグメニューの `Show Title UI` をオフにして無効にすることができます。

## エンジンオブジェクトレイヤー
コンフィグメニューからエンジンに、作成するすべてのオブジェクト（UI関連を除く）に特定の[レイヤー](https://docs.unity3d.com/Manual/Layers.html) を割り当てさせることができます。

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

これにより、エンジンのカメラが [カリングマスク](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) を使用して、指定したレイヤーのオブジェクトのみをレンダリングするようになります。

エンジンが管理するUIオブジェクトのレイヤーを変更するには、UI設定メニューの `Objects Layer` オプションを使用します。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## テクスチャにレンダリング

カメラ設定メニューでカスタムカメラプレハブを割り当てることにより、画面（と他のカメラ関連の設定変更）の代わりにエンジンのカメラレンダーをカスタム [レンダーテクスチャ](https://docs.unity3d.com/ScriptReference/RenderTexture.html) にレンダリングできます。 。

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## Switching Modes

これはプロジェクトに大きく依存しますが、以下はカスタムコマンドを使用して "adventure" モードと "novel" モードの切り替えを実装する大まかな例です。前述の連携プロジェクトに基づいています。

```csharp
[CommandAlias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptName;
    public StringParameter Label;

    public override async UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        // 1. キャラクターコントロールを無効にします。
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. カメラを切り替え。
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. 指定したスクリプトをロードして再生（割り当てられている場合）。
        if (Assigned(ScriptName))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.PreloadAndPlayAsync(ScriptName, label: Label);
        }

        // 4. Naninovel入力を有効にします。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = true;
    }
}
```

```csharp
[CommandAlias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        // 1. Naninovel入力を無効にします。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = false;

        // 2. スクリプトプレーヤーを停止。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.Stop();

        // 3. ステートをリセット。
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetStateAsync();

        // 4. カメラを切り替え。
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. キャラクターコントロールを有効にします。
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

これでこのコマンドがnaninovel スクリプトで使用できるようになります:

```nani
; アドベンチャーモードに切り替え。
@adventure
```

— または C# から直接（たとえば、 `OnTrigger` Unityイベントで）:

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptName = "Script001" };
	switchCommand.ExecuteAsync().Forget();
}
```

## 他のオプション

他にも複数の機能（ステートのアウトソーシング、サービスの上書き、カスタムのシリアル化、リソースおよび構成プロバイダーなど）があり、エンジンを別のシステムと連携するときに役立ちます。詳細については、以降のガイドを確認してください。利用可能な [コンフィグレーションオプション](/ja/guide/configuration.md) も調べてみてください。一部の機能はガイドに記載されていませんが、インテグレーションには役立ちます。

エンジンAPIまたはシステムに拡張性がなく、連携にはソースコードの変更が必要だと思われる場合は、[開発者に連絡](/ja/support/#開発者向けサポート) してください。改善を検討します。

## サンプルプロジェクト

3Dアドベンチャーゲームの一時的なダイアログと、スタンドアロンのノベルモードとして Naninovelを利用したサンプルプロジェクトは [GitHub にあります](https://github.com/Naninovel/IntegrationExample)。[Git clientでリポジトリをクローン](https://help.github.com/ja/github/creating-cloning-and-archiving-repositories/cloning-a-repository) するか [zipファイルをダウンロード](https://github.com/Naninovel/Demo/archive/master.zip) することができます。

::: warn
プロジェクトに Naninovel パッケージは含まれないため、初めて開く際はコンパイルエラーが発生します。問題を解決するには、アセットストアから Naninovel をインポートします。
:::

プロジェクト固有のサンプルスクリプトは全て、`Assets/Runtime` フォルダーに保存されています。

Naninovelは、`MainScene` シーンにある `SetupGame` ゲームオブジェクトに接続された`Runtime/SetupGame.cs` スクリプトを介して手動で初期化されます（エンジンコンフィグメニューで自動初期化は無効になっています）。

`Runtime/DialogueTrigger.cs` スクリプトはトリガーのコンポーネントとして使用され、プレーヤーがトリガーコライダーにヒットしたときにダイアログモードに切り替えます。

`Runtime/SwitchToNovelMode.cs` カスタムコマンドは、C# と naninovel スクリプトからノベルモードに切り替えるときに使用されます。

`Runtime/SwitchToAdventureMode.cs` カスタムコマンドは、ノベルモードからアドベンチャーに切り替えるときに使用されます。
