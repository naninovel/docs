# サポート

エンジンで困ったことがあったら、まずは [ガイド](/ja/guide/) と、その問題に関係する [コマンドリファレンス](/ja/api/) のトピックを参照してください。またよくある質問については [FAQ](/ja/faq/) を参照してください。

エンジンが意図したとおりに動作していない場合は、最新バージョンを実行しているかどうかを確認してください。Unity editorの [アセットストアウィンドウ](https://docs.unity3d.com/Manual/AssetStore.html) からメインパッケージをアップデートできます。エンジン拡張機能を使用する場合は、最新のパッケージをダウンロードしてインポートします:

- [NaninovelLive2D](https://github.com/Naninovel/Live2D/raw/master/NaninovelLive2D.unitypackage)
- [NaninovelPlayMaker](https://github.com/Naninovel/PlayMaker/raw/master/NaninovelPlayMaker.unitypackage)
- [NaninovelAdventureCreator](https://github.com/Naninovel/AdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage)

更新しても問題が解決しない場合は、プロジェクトから `Naninovel` フォルダを削除し、アセットストアから再インポートして、パッケージを再インストールしてみてください。エンジンを更新するときは、[リリースページ](https://github.com/Naninovel/Documentation/releases) で指定されているアップグレード手順に従ってください。

## Issue Tracker

上記の手順で問題を解決できなかった場合は、[issue tracker](https://github.com/Naninovel/Documentation/issues?q=is%3Aissue+label%3Abug) を確認してください。すでにその問題に取り組んでいるかもしれません。

## コミュニティフォーラム

専用の [Naninovelフォーラム](https://forum.naninovel.com) へ参加してみてください。ここではユーザーがお互いに開発のトラブルを解決し、ベストプラクティスを共有し、プロジェクトを紹介したりしています。あなたが直面している問題は、すでに他のユーザーによって既に解決されているかも知れません。そうでなければ、いつでも助けを求めることができます。

## Unity サポート

Unityを使ってNaninovel特有の目標を達成する方法は、いくつかのチュートリアル動画とサンプルプロジェクトで紹介しています。ただしUnityの組み込みツールについては、追加のガイダンスや直接サポートは提供していません。

Unityは、膨大な機能を備えたスタンドアロン製品です。独自のドキュメント、サポートサービス、広大なコミュニティがあり、10年以上にわたって数多くの学習資料を提供しています。通常、質問や問題がある場合は、チュートリアル動画、ガイド、またはフォーラムのスレッドで簡単に見つけることができます。もし稀にそれでも見つからない場合は、いつでも [Unity フォーラム](https://forum.unity.com)、[Q&A サービス](https://answers.unity.com/questions/ask.html) で質問するか、公式の [サポートサービス](https://unity.com/support-services) を利用できます。

## 開発者向けサポート

::: warn
開発者サポートは、Naninovel固有のトピックのみに限定され、英語またはロシア語で提供しています。Unity関連（uGUIでのUIの構築、Addressableシステムのセットアップ、C# スクリプトの記述など）については、[上記の情報](/ja/support/#unity-サポート)を参照してください。
:::

直接開発者サポートを受けるには、Naninovel Discordサーバー([discord.gg/BfkNqem](https://discord.gg/BfkNqem)) に参加し、次の登録フォームを使用してアセットのコピーを登録してください: [naninovel.com/register](https://naninovel.com/register/)。 登録後、サーバーで自動的に "Verified User" の役割が取得され、 `#support` チャネルにアクセスできます。

<iframe src="https://discordapp.com/widget?id=545676116871086080&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>

**開発者からの回答は最大24時間かかります** (場合によってはもっと)。そのため:
 - 問題について明確で簡潔な説明と、再現方法の段階的な手順を提供してください。
 - 使用しているNaninovelとUnityのバージョン、対象プラットフォーム（Android、iOS、WebGLなど）、およびエディターを実行しているオペレーティングシステム（Windows、Mac、またはLinux）を明記してください。
 - 問題についてのエラーやワーニングが含まれた[ログファイル](https://docs.unity3d.com/Manual/LogFiles.html) を添付してください。

[再現プロジェクト](/ja/support/#再現プロジェクト) を添付すると、より問題を早く特定して修正できる可能性があります。

## 再現プロジェクト

問題を報告する際、"再現" プロジェクトの共有をお願いする場合があります。再現プロジェクトは、問題を再現するために必要な **最小限の変更** と追加のアセットのみを含むクリーンな新しいUnityプロジェクトです。

以下の手順に従って、複製プロジェクトを作成および共有します:

1. 新しいUnityプロジェクトを作成します。[現在のNaninovelリリース](https://github.com/Naninovel/Documentation/releases) でサポートされているUnityバージョンを使用していることを確認してください。
2. Asset Storeから最新のNaninovelバージョンをインポートします（プレリリースバージョンがある場合は、代わりにそれを使用してください）。
3. 必要なアセットを追加し、プロジェクトを変更して問題を再現します。**Naninovelスクリプトはできるだけ短くして**、**問題を再現するのに必要な** アセットだけを追加してください。
4. プロジェクトディレクトリ内にテキストファイル（.txt）を作成し、問題を再現する手順を段階ごとに（英語）で記述します。例:

```
1. Open scene "SampleScene".
2. Enter play mode in the editor.
3. Start a new game.
4. Play through to the line number 15.
5. Save and load the game.
```

次に、期待した動作と実際に起きたことを記述します。 例:

```
Expected: Music "Ambient" should start playing.
Actual: No music is playing.
```

5. Unityエディターを閉じ、プロジェクトディレクトリ内のすべてのファイルとフォルダーを削除します。ただし、作成した指示テキストファイルと `Assets`、`Packages`、および `ProjectSettings` フォルダーは残します。**必ず `Library` フォルダーを削除してください。** 多くの自動生成ファイルが含まれており、プロジェクトのサイズが大幅に増加するためです。
6. プロジェクトフォルダーをアーカイブ（zip）し、それをGoogleドライブにアップロードするか、Discordのプライベートメッセージに添付します。

複製プロジェクトは必ずプライベートメッセージでのみ共有してください。個人のデータや著作権で保護された資産の漏洩を防ぐため、 **プロジェクトを公共のチャネルで共有しないでください。**
