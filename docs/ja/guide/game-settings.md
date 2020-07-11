# ゲーム設定

ゲーム設定は、設定メニューからいつでも変更できます。

[!8ef1044cb0b8429298af05e6275ff14d]

ロケールを変更すると、変更を有効にするためにゲームを再起動する必要があります。その他の変更はすぐに有効になります。

設定は、ゲームディレクトリにある `Settings.json` ファイルにシリアル化されます。ファイル名は、コンテキストメニュー `Naninovel -> Configuration -> State` から設定できます。使用可能なオプションについては、[コンフィグガイド](/ja/guide/configuration.md#state) を参照してください。

![State Configuration](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

WebGL では設定はクロスブラウザ [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API) でシリアル化されます。

メニューUIはカスタマイズするか、[カスタムUI](/ja/guide/user-interface.md#カスタムUI) 機能で完全に置き換えることができます。
