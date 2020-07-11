# Bolt

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) は、プログラマーとデザイナーにとって柔軟性の高い、Unityの高度なビジュアルスクリプトソリューションです。

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

## 設定

Boltパッケージをダウンロードし、自身の Naninovel プロジェクトにインストールします。**Bolt v2 推奨** なぜなら以前のバージョンはAOTプラットフォームでジェネリックをサポートしていないためです（NaninovelコアAPIはジェネリックを広範囲に使用しています）。

次に、Bolt用の Naninovel APIを公開する必要があります。 `Tools/Bolt/Extractor...` から抽出ツールを開きます:

![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

 "Namespaces" タブに新しいネームスペースレコードを追加します。リストから "Naninovel" を探し、"Hierarchy" にチェックを入れ、 "Fast Extract" をクリックします:

![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

完了です。これで Naninovel C# API を Bolt の図で使用できます。

![](https://i.gyazo.com/080106d574ea894f62ea79b7dd904ab2.png)

::: example
サンプルプロジェクトはGitHubで入手できます: [github.com/Elringus/NaninovelBolt](https://github.com/Elringus/NaninovelBolt)。Naninovel と Bolt のパッケージはプロジェクトと一緒に配布されていないため、初めて開く際にコンパイルエラーが発生します。アセットストアからパッケージをインポートして、問題を解決してください。
:::
