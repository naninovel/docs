# セーブロードシステム

セーブロードメニューを使用して、いつでもゲームをセーブ、ロードすることができます。ユーザーは、セーブするスロットを選択したり、以前に使用したスロットを削除したりできます。

[!a7109097f6abbeea16d6fe773bfffb3f]

セーブスロットは `.json` またはバイナリファイル（構成によって異なります）のいずれかにシリアル化されます。ファイル名、スロット上限、ディレクトリ名はコンテキストメニュー `Naninovel -> Configuration -> State` から設定できます。利用可能なオプションについては [コンフィグガイド](/ja/guide/configuration.md#state) をご覧ください。

![State Configuration](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

WebGLでは、セーブスロットはクロスブラウザー [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API) でシリアル化されます。

メニューUIはカスタマイズするか、[カスタムUI](/ja/guide/user-interface.md#カスタムUI) 機能を使って完全に置き換えることができます。

Naninovelには、2つのシリアル化ハンドラーが用意されています: `System.IO` と `UnityEngine.PlayerPrefs` です。前者はスロットを別のファイルとして [persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) に保存します。後者は Unity の [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) API を使用して、スロットを key-value データベースに保存します。ハンドラーはステートコンフィグメニューで選択できます。IO ハンドラーがデフォルトです。特定のプラットフォームでセーブデータの読み取り/書き込みに問題がある場合は、PlayerPrefs に切り替えるか、[カスタムハンドラ](/ja/guide/state-management.md#カスタムシリアル化ハンドラー) の追加を検討してください。

ステートの管理とそのカスタマイズ方法については、[ステート管理ガイド](/ja/guide/state-management.md)を参照してください。
