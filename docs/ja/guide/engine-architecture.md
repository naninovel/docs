# エンジンアーキテクチャー

このエンジンは次の原則を念頭に設計されています: **シーンからの独立** と **サービス指向**。

## シーンから独立

Unityの設計はシーンとプレハブ構成を促進できますが、ビジュアルノベルを開発する場合はあまり実用的ではありません。

全ての Naninovel システムは、[MonoBehaviour]( https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) に直接バインドされていないか、[persistent]( https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) ルート [ゲームオブジェクト]( https://docs.unity3d.com/ScriptReference/GameObject.html) に紐づいています。

![](https://i.gyazo.com/9805e2ce450bc486a007cdc001f8ae13.png)

環境に応じて、次のルートオブジェクトが使用されます:
- `Naninovel<Runtime>` ランタイム用 (ビルドとエディターのプレイモードで);
- `Naninovel<Editor>` エディター用 (プレイモード外で).

必要なすべてのゲームオブジェクトは、エンジンの初期化時に作成されます。これは [RuntimeInitializeOnLoadMethod]( https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) を介して、アプリケーションの起動時に（プレイモードに入ったりビルドを実行した直後に）自動的かつ非同期に実行されます。
この動作を変更するには、エンジンの設定で `Initialize On Application Load` プロパティを無効にし、手動で `RuntimeInitializer` （ランタイムの場合）または `EditorInitializer`（エディターの場合）クラスを使用して初期化を呼び出します。

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

初期化プロセスは非同期なので、 `InitializeAsync()` メソッドを呼び出すときに [async-await approach](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) を使用するか、静的な `Engine.OnInitialized` イベントをサブスクライブします。

すべてのエンジンシステムを完全に無効にしてメモリから削除するには、静的メソッド `Engine.Destroy()` を使用します。

## サービス指向

エンジン機能のほとんどは、エンジンサービスを介して実装されます。 エンジンサービスは `IEngineService` インターフェースの実装であり、naninovelスクリプトの実行、アクターの管理、ゲームのセーブロードなど、特定のジョブを処理します。

エンジンシステムとやり取りする場合は、エンジンサービスを使用することをお勧めします。エンジンサービスへの参照は、静的メソッド `Engine.GetService<TService>()` で取得できます。ここで `TService` は、参照するサービスのタイプ（インターフェース）です。 たとえば、 `IScriptPlayer` サービスを取得するには:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
[エンジンサービスガイド](/ja/guide/engine-services.md) で、現在利用可能なすべてのエンジンサービスのリストと、カスタムサービスを上書き/追加する方法を見ることができます。

## High-Level Concept

次のUML図は、エンジンアーキテクチャの高レベルの概念を示しています。図のすべてのクラスとインターフェースの名前は `Naninovel` ネームスペース以下で整理されています。たとえば `Engine` クラスを参照するには `Naninovel.Engine` または[ネームスペースを含めて](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces) ください。

<object style="width:100%; max-width:699px" data="/engine-design.svg" type="image/svg+xml"></object>
