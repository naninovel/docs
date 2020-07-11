# レンダーパイプライン

Unity の [Scriptableレンダーパイプライン](https://docs.unity3d.com/Manual/render-pipelines.html) (URP と HDRP) は、いくつかの制限と追加設定により対応しています。

::: warn
SRPは、（Unityの公式の主張にもかかわらず）まだプロダクションに対応できておらず、デフォルトのレンダリングシステムと比較して多くの機能が欠けています。上級ユーザーで潜在的な技術的な問題や制限を解決できる場合を除き、レンダーパイプラインの使用はお勧めしません。
:::

## 設定

選択したSRPをインストールして構成する方法については、[公式ドキュメント](https://docs.unity3d.com/Manual/render-pipelines.html) を参照してください。

URPとHDRPはどちらも複数のカメラをサポートしていないため、カメラコンフィグメニューの `Use UI Camera` を無効にする必要があります（デフォルトで有効）。

![](https://i.gyazo.com/5b70d18f028d27124bd8f4a25b2df47c.png)

HDRPで実行している場合は、カラースペースをリニアに変更します（HDRPは、デフォルトで設定されているガンマモードをサポートしていません）。

![](https://i.gyazo.com/2c053a6e3d79f080469787b7f09ee8f3.png)

## 制限

組み込みのエフェクトと機能の一部（Depth Of Field、Digital Glitch、[@startTrans] 、 [@finishTrans] コマンドなど）は、必要なレンダリング機能がないため、SRPでは機能しません。さまざまなハックにより、Naninovelのソースコードやパッケージコンテンツを変更せずに、欠落しているエフェクトや機能のほとんどを置き換えて使用することが可能です。そのようなエンジンの拡張についての詳細は、 [特殊エフェクトガイド](/ja/guide/special-effects.md#カスタムエフェクトの追加) と [カスタムコマンド](/ja/guide/custom-commands.md) をご覧ください。
