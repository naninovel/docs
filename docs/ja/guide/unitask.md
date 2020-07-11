# UniTask

[UniTask](https://github.com/Cysharp/UniTask) はオープンソース（MITライセンス）のライブラリで、Unity向けのより効率的な [タスクベースの非同期プログラミング](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) 実装を提供します ([.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)と比較して)。最適化の性質と使用例の詳細については、[ライブラリ作成者による記事](https://medium.com/@neuecc/a1ff0766029)を参照してください。

Naninovelの非同期メソッドはすべて UniTask で構築されています。パブリックAPIを使用するには（たとえば、カスタムコマンドやエンジンサービスの実装を追加するため）、ライブラリをUnityプロジェクトにインストールする必要があります。Naninovelには、UniTask のコピーがバンドルされています。ライブラリがすでにインストールされている場合は、競合を防ぐために `Naninovel/ThirdParty/UniTask` を削除します。
