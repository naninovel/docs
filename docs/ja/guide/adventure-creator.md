# Adventure Creator

[Adventure Creator](https://www.adventurecreator.org/) では昔ながらの2D、2.5D、3Dアドベンチャーゲームを作ることが出来ます。ストーリー重視のもの、探索、パズル、例えば Monkey Island、Grim Fandango、The Longest Journey、Telltaleの The Walking Dead などです。

![](https://i.gyazo.com/74a12fa535198cb26a87a5037b15a988.jpg)

ACの中でNaninovelを使用して会話シーンを処理したり、NaninovelベースのゲームからACを読み込んでカスタムしたゲームを作ることができます。

## 設定

Adventure Creator と Naninovel を両方インストールします(順番は関係ありません)。

[Adventure Creator extension package](https://github.com/Elringus/NaninovelAdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage) をダウンロードしてインポートします。

ACの設定の中のカスタムアクションに、`NaninovelAdventureCreator/Runtime/Actions` を設定します。カスタムアクションについての詳細は [ACガイド](https://www.adventurecreator.org/tutorials/writing-custom-action) を参照してください。

![](https://i.gyazo.com/59a162751411ec60a7cf5ad89e9a66ec.png)

 "Custom" カテゴリの下に "Play Naninovel Script" アクションが表示されます。

![](https://i.gyazo.com/faf33afa1df8ff98ea04ef9cf1a44f8f.png)

設定によっては、Naninovelオブジェクトに特別なレイヤーを割り当てて、ACカメラでレンダリングされないようにしたり、その逆を行う必要がある場合があります。 これは、Naninovelのエンジンコンフィグウィンドウで設定できます。

![](https://i.gyazo.com/ed765928c0420ec2b1e26d6bf4a66e6c.png)

ACで作成したゲームの会話シーンとして Naninovel を使用する場合は、エンジンコンフィグで `Initialize On Application Load` と `Show Title UI` も無効にするのが望ましいでしょう。

## 使い方

`Play Naninovel Script` のカスタムACアクションを使用して（任意）ACをオフにし、必要な場合 Naninovel エンジンを初期化します。そして指定した Naninovelスクリプトをロードします。 デフォルトでは、ACカメラと Naninovel カメラも自動的に入れ替わりますが、 `Swap Cameras` プロパティを無効にすることで防ぐことができます。

Naninovelスクリプトの `@turnOnAC` カスタムコマンドを使用してACを有効にし、Naninovelエンジンの状態をリセットし（任意）、カメラを元に戻します（任意）。状態のリセットは  `reset` で制御され、カメラの入れ替えは `swapCameras` パラメーターで制御されます。

次の動画は、ACで Naninovel と連携して会話シーンを処理するデモです。

[!!7tOIFZRSAec]

::: example
インテグレーションの例については、 [GitHubプロジェクト](https://github.com/Elringus/NaninovelAdventureCreator) をご覧ください。初めてプロジェクトを開くと、Adventure Creator と Naninovel のパッケージが存在しないのでエラーが発生します。Asset Storeからインポートするだけで、エラーは解消されます。
:::
