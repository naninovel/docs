# エンジンアーキテクチャー

エンジンは、**シーン独立性** と **サービス指向** という原則を念頭に置いて設計されています。

## シーン独立性

Unityの設計はシーンとプレハブの構成の使用を促進しますが、ビジュアルノベルを開発する場合にはあまり実用的ではありません。Naninovelシステムは、[MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) に直接バインドされていないか、[永続的な](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) ルート [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html) にアタッチされています。

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

環境に応じて、次のルートオブジェクトが使用されます。
- ランタイム（ビルドおよびエディタプレイモード）用の `Naninovel<Runtime>`
- エディタ（プレイモード外）用の `Naninovel<Editor>`

必要なすべてのゲームオブジェクトは、[RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) メソッドを介して、アプリケーションの起動時（プレイモードに入った直後、またはビルドの実行直後）に自動的かつ非同期に実行されるエンジン初期化時に作成されます。初期化シナリオをカスタマイズするには、[手動初期化ガイド](/ja/guide/integration-options#手動初期化) を参照してください。

::: info NOTE
シーンに依存しない設計がプロジェクトで機能しない場合は、エンジン構成メニューの `Scene Independent` オプションを無効にしてください。すべてのNaninovel関連オブジェクトはアクティブなUnityシーンの一部になり、シーンがアンロードされると破棄されます。
:::

## サービス指向

エンジンの機能のほとんどは、エンジンサービスを介して実装されています。エンジンサービスは、シナリオスクリプトの実行、アクターの管理、ゲーム状態の保存とロードなどの特定のジョブを処理する `IEngineService` インターフェイスの実装です。

エンジンシステムと対話する必要がある場合は、通常、エンジンサービスを使用します。静的メソッド `Engine.GetService<TService>()` を使用してサービスへの参照を取得できます。ここで、`TService` は必要なサービスのインターフェイスタイプです。たとえば、`IScriptPlayer` サービスを取得するには：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
現在利用可能なすべてのエンジンサービスのリストと、それらをオーバーライドまたはカスタムサービスを追加する方法については、[エンジンサービスガイド](/ja/guide/engine-services) を参照してください。

## ハイレベルコンセプト

次のUML図は、エンジンアーキテクチャのハイレベルな概念を示しています。図内のすべてのクラス名とインターフェイス名は `Naninovel` 名前空間の下に整理されていることに注意してください。たとえば、`Engine` クラスを参照するには、`Naninovel.Engine` を使用するか、[名前空間を含める](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces) 必要があります。

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
