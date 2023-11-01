# UniTask

[UniTask](https://github.com/Cysharp/UniTask) はオープンソース（MITライセンス）のライブラリで、Unity向けのより効率的な [タスクベースの非同期プログラミング](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) 実装を提供します ([.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)と比較して)。最適化の性質と使用例の詳細については、[ライブラリ作成者による記事](https://medium.com/@neuecc/a1ff0766029)を参照してください。

Naninovelの非同期メソッドはすべて UniTask で構築されています。パブリックAPIを使用するには（たとえば、カスタムコマンドやエンジンサービスの実装を追加するため）、ライブラリをUnityプロジェクトにインストールする必要があります。Naninovelには、UniTask のコピーがバンドルされています。ライブラリがすでにインストールされている場合は、競合を防ぐために `Naninovel/ThirdParty/UniTask` を削除します。

## UniTask v2へのアップグレード

NaninovelにはUniTask v1がバンドルされ、使用されています。UniTask v2はより多くの機能を提供し、アロケーションもわずかに少なくなっていますが、不安定であり、頻繁に変更が加えられています。

::: info NOTE
UniTask v2が十分に安定したら、デフォルトでそれを使用する予定です。それまでは、UniTask v2を使用しているプロジェクトの開発者のサポートはできません。
:::

UniTask v2を使用したい場合、Naninovelの自動アップグレードスクリプトを使用してください。これにより、プロジェクト内のUniTask v1のAPIを使用しているすべてのC#スクリプトが変更され、Naninovelディレクトリから `ThirdParty/UniTask` フォルダが削除されます。このスクリプトは、エディターメニューの `Naninovel -> Upgrade -> UniTask v1 to v2` から実行できます。

![](https://i.gyazo.com/36de44973e67e17ba999788b35354f36.png)

スクリプトを実行した後、依存関係を解決するためにUPM経由でUniTask v2をインストールしてください。他の方法でのインストール（例：Unityパッケージのインポート）は、パッケージ固有のプラットフォーム定義が機能しないため、サポートされていません。
