# 統合オプション

Naninovelは従来のビジュアルノベルゲームに重点を置いており、そのテンプレートとして最適に機能しますが、既存のプロジェクトとエンジンを統合することも可能です。3Dアドベンチャーゲーム、RPG、またはその他のジャンルのゲームを作成している場合でも、Naninovelをドロップインのダイアログシステムとして使用できます。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

Naninovelをカスタムプロジェクトと統合する方法は複数あります。具体的な実装は、プロジェクトの種類と達成したい内容によって異なります。以下のドキュメントでは、Naninovelをスタンドアロンゲームと「ペアリング」するのに役立つさまざまな構成オプションとAPIを挙げます。先に進む前に、[エンジンアーキテクチャ](/ja/guide/engine-architecture) を参照して、概念的な動作をよりよく理解してください。

::: tip EXAMPLE
Naninovelが3Dアドベンチャーゲームのドロップインのダイアログシステムとしても、スタンドアロンのノベルモードとしても使用されている [統合サンプル](/ja/guide/samples#ダイアログモード) を確認してください。
:::

## 手動初期化

エンジン構成メニューの `Initialize On Application Load` オプションが有効になっている場合、エンジンサービスはアプリケーションの起動時に自動的に初期化されます。

![](https://i.gyazo.com/5cb8ba25304f7c80d0af23859bc9286f.png)

ゲームをノベルモードで開始したい場合を除き、C#から静的な `RuntimeInitializer.Initialize()` メソッドを呼び出すか、シーン内のゲームオブジェクトに `Runtime Initializer` コンポーネントを追加して、必要なときに手動でエンジンを初期化する必要があります。後者の場合、Unityでシーンがロードされたときにエンジンが初期化されます。

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

エンジンサービスをリセット（および占有しているリソースの大部分を破棄）するには、`IStateManager` サービスの `ResetState()` メソッドを使用します。これは、エンジンを再初期化せずにノベルモードに戻れるようにしたまま、一時的に別のゲームプレイモードに切り替える場合に役立ちます。

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

指定されたパスのシナリオスクリプトをプリロードして再生するには、`IScriptPlayer` サービスの `MainTrack` に対して `LoadAndPlay(scriptPath)` メソッドを使用します。エンジンサービスを取得するには、`Engine.GetService<TService>()` 静的メソッドを使用します。ここで、`TService` は取得するサービスの型（インターフェース）です。たとえば、次のコードはスクリプトプレイヤーサービスを取得し、`Script001` という名前のスクリプトをプリロードして再生します。

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.MainTrack.LoadAndPlay("Script001");
```

ノベルモードを終了してメインゲームモードに戻るときは、現在Naninovelによって使用されているすべてのリソースをアンロードし、エンジンサービスを停止したい場合が多いでしょう。これには、`IStateManager` サービスの `ResetState()` メソッドを使用します。

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### スクリプトアセットの参照

カスタムシステムでシナリオスクリプトアセットを参照したい場合（たとえば、会話やカットシーンを再生するため）、スクリプトパスを直接保存する方法は、ファイルの場所と名前に依存するため壊れやすいことに注意してください。

代わりに、アセット参照（GUID）を使用してください。関連するファイルが移動または名前変更されても、参照は変更されません。GUIDからスクリプトパスを解決するには、`ScriptAssets.GetPath` メソッドを使用します。Naninovelは `ScriptAssetRef` プロパティドロワーも提供しており、利便性のために、スクリプトアセットをシリアル化されたフィールドに直接割り当てることができます。

以下は、シリアル化されたスクリプト参照の例です。プレイヤーがトリガーに衝突すると、参照がスクリプトパスに解決され、そのスクリプトが再生されます。

```cs
[ScriptAssetRef]
public string ScriptRef;

private void OnTriggerEnter (Collider other)
{
    var path = ScriptAssets.GetPath(ScriptRef);
    var player = Engine.GetService<IScriptPlayer>();
    player.MainTrack.LoadAndPlay(path).Forget();
}
```

`Dialogue Events` などの組み込みコンポーネントも同じ属性を使用しています。スクリプトアセットを `Script` フィールドにドラッグアンドドロップすると、スクリプトファイルが移動または名前変更されても参照はそのまま残ります。

![](https://i.gyazo.com/e6d96c7de99fabd16cf4a74d8a485469.png)

## タイトルメニューの無効化

初期化後、エンジンはスクリプト構成メニューの `Title Script` に割り当てられたスクリプト（デフォルトでは `Title`）を再生し、デフォルトの [タイトルスクリプト](/ja/guide/scenario-scripting#タイトルスクリプト) は `@showUI TitleUI` コマンドで組み込みのタイトルメニューを表示します。独自のタイトルメニューがある場合は、タイトルスクリプトの割り当てを解除するか、スクリプトからこのコマンドを削除してください。また、[UIのカスタマイズ機能](/ja/guide/gui#uiのカスタマイズ) を使用して、組み込みのタイトルメニューを変更、置換、または完全に削除することもできます。このメニューは、UIリソースに `TitleUI` という名前で登録されています。

## エンジンオブジェクトレイヤー

構成メニューを介して、エンジンが作成するすべてのオブジェクト（UI関連を除く）に特定の [レイヤー](https://docs.unity3d.com/Manual/Layers.html) を割り当てることができます。

![](https://i.gyazo.com/b27cdf9e3f5d9e7b25bbc4cbb37afe04.png)

また、これによりエンジンのカメラは [カリングマスク](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) を使用して、指定されたレイヤー上のオブジェクトのみをレンダリングするようになります。

エンジンによって管理されるUIオブジェクトのレイヤーを変更するには、UI構成メニューの `Objects Layer` オプションを使用します。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## テクスチャへのレンダリング

カメラ構成メニューの `Main Camera` オプションにカスタムカメラプレハブを割り当てることにより、エンジンのカメラを画面ではなくカスタム [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) にレンダリングさせることができます（その他のカメラ関連設定も変更できます）。

![](https://i.gyazo.com/e302efafe6136a0d949defe17f6bc625.png)

## モードの切り替え

ゲームとNaninovelを切り替える（たとえば、「アドベンチャー」モードと「ノベル」モードを切り替える）には、静的な `Dialogue` クラスを使用します。`Dialogue.Enter()` は、エンジンがまだ初期化されていない場合は初期化し、Naninovelのレンダリングと入力処理を有効にします。一方、`Dialogue.Exit()` はエンジンの状態をリセットし、それらを無効にします。`Dialogue.EnterAndPlay()` はダイアログモードに入り、指定されたパスのシナリオスクリプトを再生します。`Dialogue.EnterAndPlayAsset()` は、[スクリプトアセットの参照](/ja/guide/integration-options#スクリプトアセットの参照) を使用して同じことを行います。

```csharp
await Dialogue.EnterAndPlay("Script001");
...
await Dialogue.Exit();
```

先にダイアログモードに入っていない場合、終了しても何も起こりません。現在の状態は `Dialogue.Active` プロパティで確認できます。切り替えに反応する（たとえば、ダイアログ中にゲームのキャラクター操作をブロックする）には、`Dialogue.OnEntered` および `Dialogue.OnExited` イベントを使用します。

シナリオスクリプトでは、[@enterDialogue] および [@exitDialogue] コマンドを使用します。

```nani
; アドベンチャーモードに切り替えます。
@exitDialogue
```

同じAPIは、`Dialogue Events` コンポーネントを介してC#なしでも利用できます。Unityイベントからその `EnterDialogue` および `ExitDialogue` メソッドを呼び出し、`Script` と `Label` を割り当ててモードに入るときにシナリオスクリプトを再生し、`Dialogue Entered` および `Dialogue Exited` イベントで切り替えに反応できます。設定済みのダイアログトリガーを追加するには、シーン内のゲームオブジェクトを右クリックし、`Naninovel -> Dialogue` を選択します。作成されたオブジェクトは `Dialogue Events` と `Trigger Events` コンポーネントを組み合わせたもので、後者は設定された制約（衝突、レイキャスト、ポインターホバー、入力）が満たされるとダイアログに入ります。例については、[スタートガイド](/ja/guide/getting-started#ダイアログモード) を参照してください。

[統合サンプル](/ja/guide/samples#ダイアログモード) では、各NPCにこのような `Dialogue` オブジェクトがあり、スクリプトとラベルが割り当てられています。トリガーは、プレイヤーキャラクターがそのコライダーに入り、割り当てられた入力を行うとアクティブになります。プレイヤーオブジェクトの下にある `Dialogue Events` コンポーネントは、ダイアログモードがアクティブな間、キャラクター操作をブロックし、`Camera Events` コンポーネントは `SetupBaseCamera` メソッドでNaninovelのカメラをシーンのカメラの上にスタックするため、カメラを切り替える必要はありません。会話のスクリプトは [@exitDialogue] で終了します。ノベルモードは [@goto] で移動する通常のシナリオスクリプトであり、同じコマンドで終了します。

## その他のオプション

エンジンを他のシステムと統合するときに役立つ機能は他にも多数あります（状態のアウトソーシング、サービスのオーバーライド、カスタムシリアル化、リソースおよび構成プロバイダーなど）。詳細については、ガイドの残りの部分を確認してください。利用可能な [構成オプション](/ja/guide/configuration) も調べてみてください。ガイドで説明されていなくても、統合に役立つ機能があるかもしれません。

一部のエンジンAPIまたはシステムに拡張性が欠けており、統合のためにソースコードの変更が必要であると感じた場合は、[サポートにお問い合わせください](/ja/support/)。改善を検討します。

::: tip EXAMPLE
Naninovelが3Dアドベンチャーゲームのドロップインのダイアログシステムと、切り替え可能なスタンドアロンのノベルモードの両方として使用されている [統合サンプル](/ja/guide/samples#ダイアログモード) を確認してください。
:::
