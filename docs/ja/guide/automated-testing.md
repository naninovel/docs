# 自動テスト

大規模なプロジェクトに取り組んでいる場合や、複数のチームメンバーがシナリオスクリプトやゲームプレイロジックを変更している場合、公開前にゲームが正常に機能することを確認することが不可欠です。インタラクティブな性質のため、ゲームは多くの場合、多大な手動テストを必要としますが、単純なビジュアルノベルでは、プロセスの大部分を自動化できます。

Naninovelは、ゲームの実行中にシミュレートされたユーザーインタラクションのシーケンスを作成することで、エンドツーエンドのテストを構築するのに役立つツールを `Naninovel.E2E` 名前空間で提供します。[UnityのTest Framework](https://docs.unity3d.com/Packages/com.unity.test-framework@latest) と組み合わせると、エディタ、ターゲットデバイス、またはCIで実行される自動テストスイートを構築できます。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## スタートガイド

Unityエディタの `Window -> General -> Test Runner` から「Test Runner」タブを開き、指示に従ってプレイモードテストをセットアップします。詳細については、[UTFガイド](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/workflow-create-playmode-test.html) を参照してください。必要なAPIを利用できるようにするために、Naninovelのcommon、runtime、およびE2Eアセンブリを参照してください。以下は、テストアセンブリのセットアップ例です。

![](https://i.gyazo.com/8b8cb5c916987d941cce8abf6daf131b.png)

NaninovelがUPMパッケージとしてインストールされている場合は、プロジェクトの `Packages/manifest.json` を介して [テスト可能にする](https://docs.unity3d.com/Manual/cus-tests.html#tests) 必要がある場合があります。例：

```json
{
    "dependencies": {
        "com.elringus.naninovel": "...",
        "other-packages": "..."
    },
    "testables": [
        "com.elringus.naninovel"
    ]
}
```

テストは非同期で実行されるため、`[UnityTest]` 属性を使用し、テストメソッドから `IEnumerator` を返す必要があります。たとえば、プレイヤーが新しいゲームを開始できることを確認する簡単なメソッドは次のとおりです。

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E()
    .Once(() => Engine.GetService<IUIManager>().GetUI<ITitleUI>().Visible)
    .Click("NewGameButton")
    .Ensure(() => Engine.GetService<IScriptPlayer>().Playing);
```

コンパイル後、Test Runnerタブに移動し、新しく追加されたテストを見つけます。実行すると、`ITitleUI` が表示されるまで待機し、`NewGameButton` オブジェクトにアタッチされたボタンを見つけてクリックしようとし、スクリプトの再生が開始されたことを確認します。いずれかのステップが失敗すると、テストは停止し、関連するレコードはTest Runnerで赤い十字でマークされます。

::: warning
テストを実行する前に、エンジン構成で「Initialize On Application Load」を無効にしてください。通常の使用中に自動初期化を維持するには、メインシーンのGameObjectに適用された `Runtime Initializer` コンポーネントを使用します。エンジンの初期化の詳細については [ガイド](/ja/guide/integration-options#手動初期化) を参照してください。
:::

## ショートカット

簡潔なテストスイートを作成するのを助けるために、`Naninovel.E2E.Shortcuts` クラスを [静的インポート](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#static-modifier) します。これには、テストをよりコンパクトで読みやすくするためのさまざまな便利なショートカットが含まれています。たとえば、上記のテストをショートカットを使用して書き直したものは次のとおりです。

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E().StartNew().Ensure(Playing);
```

## スイート構成

エンドツーエンドテストは可能な限り実際の使用シナリオに近い必要がありますが、テストを実用的にするためにさまざまなパラメータを調整する必要があります。たとえば、プレイヤーが読み続けるためにクリックすることが期待されるたびにクリックシーケンスを指定したくないでしょう。同様に、UIのフェードやカメラアニメーションなどのさまざまな効果は再生中に時間がかかりますが、テストでそれらを待つ必要はありません。

テストの実行時に特化してエンジンを構成するには、`E2E` インスタンスで使用可能なさまざまな `With` メソッドを使用します。たとえば、以下のスニペットは、タイムスケールと表示遅延をオーバーライドしてエフェクトを非常に高速に実行し、要求されるたびに続行入力をアクティブにします。

```csharp
[UnityTest]
public IEnumerator Test () => new E2E()
    .WithConfig<ScriptPlayerConfiguration>(c => c.SkipTimeScale = 999)
    .WithConfig<TextPrintersConfiguration>(c => c.MaxRevealDelay = 0)
    .With(() => Service<IScriptPlayer>().OnWaitingForInput += _ => Input("Continue").Activate(1))
```

— これは一般的な構成であるため、`WithFastForward` 拡張機能を介して適用できます。

```csharp
[UnityTest]
public IEnumerator Test () => new E2E().WithFastForward()
```

もう1つの一般的なシナリオは、各テストが、以前の実行やプレイセッションの影響を受けないグローバル、設定、およびゲーム状態で開始されるように、クリーンなエンジン状態を設定することです。

また、テスト固有のデータをメモリに保存して、ディスクにシリアル化されないようにすることもできます。これらはすべて `WithTransientState` 拡張機能で実行できます。さらに、このメソッドでは初期のグローバルおよび設定状態を指定できます。

```csharp
[UnityTest]
public IEnumerator WhenTrueCompleteTitleBackChanges () => new E2E()
    .WithTransientState(GlobalStateMap.With(
        new CustomVariableManager.GlobalState {
            GlobalVariables = new[] {
                new CustomVariable("g_completedX", CustomVariableScope.Global, new CustomVariableValue(true)),
                new CustomVariable("g_completedY", CustomVariableScope.Global, new CustomVariableValue(true))
            }
        }))
```

— 上記は、最初のゲーム起動をシミュレートしてクリーンな状態でエンジンを初期化しますが、さらに `g_completedX` および `g_completedY` グローバル変数をtrueに設定します。

## シーケンスの作成

分岐シナリオをテストする場合、プレイヤーがそれらを完了するための多くの可能な方法を記述するために、一般的な相互作用シーケンスを繰り返すことがあります。ボイラープレートを最小限に抑えるために、シーケンスオブジェクトは `ISequence` インターフェイスを実装しており、すべてのテストAPIで受け入れられます。これを使用すると、一般的なシーケンスを変数に格納し、他のより一般的なシーケンス内で構成できます。

以下は、プレイヤーが共通、X、およびYルートを完了した後にタイトルメニューに「TrueRoute」UIが表示されることを確認するサンプルテストです。

```csharp
[UnityTest]
public IEnumerator WhenXYRoutesCompleteTrueUnlocks () => new E2E()
    .WithTransientState().WithFastForward()
    .StartNew().Play(CommonX, RouteX)
    .StartNew().Play(CommonY, RouteY)
    .Once(InTitle).Ensure(() => UI("TrueRoute").Visible);

ISequence CommonX => Play(D1QuickX, D2TowardX, D3LooseHP);
ISequence CommonY => Play(D1QuickY, D2TowardY, D3LooseHP);

ISequence D1QuickX => Once(Choice("d1-qte-x")).Choose("d1-qte-x");
ISequence D1QuickY => Once(Choice("d1-qte-y")).Choose("d1-qte-y");
ISequence D1QuickNone => Once(Choice()).Wait(0.5f);

ISequence D2TowardX => Once(Choosing).Choose("d2-toward-x");
ISequence D2TowardY => Once(Choosing).Choose("d2-toward-y");

ISequence D3LooseHP => Once(Choosing).Choose("d3-loose-hp");
ISequence D3LooseX => Once(Choosing).Choose("d3-loose-x");
ISequence D3LastY => Once(Choosing).Choose("d3-last-y");
ISequence D3LastNah => Once(Choosing).Choose("d3-last-nah");

ISequence RouteX => On(Choosing, Choose(), Var("g_completedX", false));
ISequence RouteY => On(Choosing, Choose(), Var("g_completedY", false));
```

— 「X」または「Y」ルートにつながる共通ルートの1〜3日目の選択肢シーケンスが `CommonX` および `CommonY` 変数にどのように構成され、それらが実際のテストメソッド内でどのように構成されているかに注目してください。

## 選択肢の参照

上記のように、テスト内の選択肢は `d1-qte-x` などの文字列を介して参照できます。これらは、シナリオスクリプトで割り当てられたカスタム [テキスト識別子](/ja/guide/scenario-scripting#テキスト識別) です。安定したテキスト識別が有効になっている場合でも、スクリプトでカスタムテキストIDを定義でき、システムによって保持されます。たとえば、次のシナリオスクリプトを考えてみましょう。

```nani
@choice "Choice 1|#my-id-for-choice-1|"
@choice "Choice 2|#my-id-for-choice-2|"
```

— ここでは、最初の選択肢に `my-id-for-choice-1` を、2番目の選択肢に `my-id-for-choice-2` を割り当てました。実際のIDは何でもかまいませんが、スクリプト内で一意であることを確認してください。これで、割り当てられたIDを介してテストで選択肢を参照できます。

```csharp
Once(Choosing).Choose("my-id-for-choice-2")
```

::: tip EXAMPLE
[E2Eサンプル](/ja/guide/samples#e2e) は、利用可能なショートカット、拡張機能、およびテストシナリオのほとんどを示しています。
:::

## カバレッジ

テスト中にスクリプト行またはコマンドが実行されたかどうかを確認すると役立つ場合があります。テストを作成するときは、プレイヤーが実際にすべての利用可能なコンテンツを見ることができることを確認したいでしょう。すべてのテストに合格した後にコマンドが実行されない場合は、シナリオロジックの問題または不完全なテストスイートを示している可能性があります。

デフォルトでは、すべてのE2Eテストが終了した後、カバレッジレポートがコンソールにログ出力されます。

![](https://i.gyazo.com/95beca8fb15948d5ea8645d9d199e957.png)

— 最初の行は、すべてのシナリオスクリプトのコマンド総数に対するカバーされたコマンドの比率としてカバレッジを要約しています。下の行はスクリプトごとのカバレッジを示しています。スクリプトにカバーされていないコマンドがある場合、それらのコマンドを含む行番号も表示されます。

カバレッジを無効にする場合は、`E2E` コンストラクタで `Cover` オプションを無効にします。例：

```csharp
[UnityTest]
public IEnumerator Test () => new E2E(new Options { Cover = false })
```
