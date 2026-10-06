# エンジンアーキテクチャ

エンジンは、**シーン独立性**と**サービス指向**という原則を念頭に置いて設計されています。

## シーン独立性

Unityの設計ではシーンの使用とプレハブの組み合わせが推奨されていますが、ビジュアルノベルを開発する場合にはあまり実用的ではありません。Naninovelのシステムは、[MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) に直接バインドされていないか、[永続的な](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) ルート [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html) にアタッチされています。

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

環境に応じて、次のルートオブジェクトが使用されます。
- ランタイム（ビルドおよびエディターのプレイモード）用の `Naninovel<Runtime>`
- エディター（プレイモード外）用の `Naninovel<Editor>`

必要なすべてのゲームオブジェクトは、[RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) メソッドを介して、アプリケーションの起動時（プレイモードに入った直後、またはビルドの実行直後）に自動的かつ非同期に実行されるエンジンの初期化時に作成されます。初期化の流れをカスタマイズするには、[手動初期化ガイド](/ja/guide/integration-options#手動初期化) を参照してください。

::: info NOTE
シーンに依存しない設計がプロジェクトに合わない場合は、エンジン構成メニューの `Scene Independent` オプションを無効にしてください。その場合、すべてのNaninovel関連オブジェクトはアクティブなUnityシーンの一部になり、シーンがアンロードされると破棄されます。
:::

## サービス指向

エンジンの機能のほとんどは、エンジンサービスを介して実装されています。エンジンサービスは、シナリオスクリプトの実行、アクターの管理、ゲーム状態のセーブとロードなどの特定の処理を担当する `IEngineService` インターフェースの実装です。

エンジンシステムとやり取りする必要がある場合は、通常、エンジンサービスを使用します。静的メソッド `Engine.GetService<TService>()` を使用してサービスへの参照を取得できます。ここで、`TService` は必要なサービスのインターフェース型です。たとえば、`IScriptPlayer` サービスを取得するには次のようにします。

```cs
var player = Engine.GetService<IScriptPlayer>();
player.MainTrack.Stop();
```

現在利用可能なすべてのエンジンサービスのリストと、それらをオーバーライドしたりカスタムサービスを追加したりする方法については、[エンジンサービスガイド](/ja/guide/engine-services) を参照してください。

## ハイレベルコンセプト

次のUML図は、エンジンアーキテクチャのハイレベルな概念を示しています。図内のすべてのクラス名とインターフェース名は `Naninovel` 名前空間の下に整理されていることに注意してください。たとえば、`Engine` クラスを参照するには、`Naninovel.Engine` と記述するか、[名前空間をインポート](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces) します。

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
