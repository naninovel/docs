# 紹介

::: warning
これはドキュメントの翻訳版です。情報が正しくないか、古い場合があります。関連する最新のバージョンは、[元のドキュメントを参照](/guide/)してください。
:::

Naninovelは [Unityゲームエンジン](https://unity.com/ja) 用の拡張機能です。 C#フレームワークとエディター機能で構成され、[ビジュアルノベルゲーム](https://ja.wikipedia.org/wiki/%E3%83%93%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB%E3%83%8E%E3%83%99%E3%83%AB) 開発をサポートします。

![](https://www.youtube.com/watch?v=lRxIKDU9z4k)

::: info NOTE
NaninovelはUnityで実現できることを制限しませんが、一部の組み込み機能を正しく動作させるためにはいくつか要件(サポートされているバージョンのUnity、プロジェクトコンフィグ、対象プラットフォーム)があります。詳細は [互換性についてのページ](/ja/guide/compatibility) を参照してください。
:::

このエンジンを初めて使用する場合は、まず [スタートガイド](/ja/guide/getting-started) をお読みください。
特定のトピックについて探したい場合は、ウェブサイト上部の検索ボックスをご利用ください。また、
よくある質問については [FAQ](/ja/faq/) をご覧ください。利用可能な全てのスクリプトコマンド、パラメーター、使用例は [APIリファレンス](/ja/api/)に記載されています。 必要な情報が見つからない場合は、お気軽に [サポートへご連絡](/ja/support/#開発者向けサポート) ください。

## 機能

以下は、Naninovelが提供する機能の一部です。

* [ドキュメントベースのスクリプト](/ja/guide/naninovel-scripts)
  * [一般テキスト](/ja/guide/naninovel-scripts#一般テキスト)
  * [ラベル](/ja/guide/naninovel-scripts#ラベル)
  * [コマンドのインライン化](/ja/guide/naninovel-scripts#コマンドのインライン化)
  * [ビジュアルエディター](/ja/guide/naninovel-scripts#ビジュアルエディター)
  * [ホットリロード](/ja/guide/naninovel-scripts#ホットリロード)
  * [IDE サポート (シンタックスハイライト, オートコンプリート, etc)](/ja/guide/naninovel-scripts#ide-サポート)
* [テキストプリンター](/ja/guide/text-printers)
  * [ダイアログ](/ja/guide/text-printers#ダイアログプリンター)
  * [フルスクリーン](/ja/guide/text-printers#フルスクリーンプリンター)
  * [チャット](/ja/guide/text-printers#チャットプリンター)
  * [吹き出し](/ja/guide/text-printers#吹き出しプリンター)
  * [TextMesh Pro 対応](/ja/guide/text-printers.html#textmesh-pro)
  * [ルビ (振り仮名) 対応](/ja/guide/text-printers.html#テキストスタイル)
* [キャラクター](/ja/guide/characters)
  * [スプライトキャラクター](/ja/guide/characters#スプライトキャラクター)
  * [分解スプライトキャラクター](/ja/guide/characters#分解スプライトキャラクター)
  * [キャラクター差分](/ja/guide/characters#キャラクター差分)
  * [一般キャラクター](/ja/guide/characters#一般キャラクター)
  * [Live2D キャラクター](/ja/guide/characters#live2d-キャラクター)
  * [キャラクター専用メッセージカラー](/ja/guide/characters#メッセージカラー)
  * [口パク](/ja/guide/characters#口パク)
* [背景](/ja/guide/backgrounds)
  * [スプライト背景](/ja/guide/backgrounds#スプライト背景)
  * [動画背景](/ja/guide/backgrounds#動画背景)
  * [レイヤー背景](/ja/guide/backgrounds#レイヤー背景)
  * [一般背景](/ja/guide/backgrounds#一般背景)
  * [シーン背景](/ja/guide/backgrounds#シーン背景)
* [トランジションエフェクト](/ja/guide/transition-effects)
* [遠近カメラモード](https://youtu.be/rC6C9mA7Szw)
* [特殊エフェクト (FX システム)](/ja/guide/special-effects)
* [バックグラウンドミュージック (BGM)](/ja/guide/audio#バックグラウンドミュージック)
* [効果音 (SFX)](/ja/guide/audio#効果音)
* [カメラアニメーション](/ja/api/#カメラ)
* [ボイスと自動ボイス再生](/ja/guide/voicing)
* [動画](/ja/guide/movies)
* [選択肢](/ja/guide/choices)
* [カスタム変数](/ja/guide/custom-variables)
* [選択やり直し](https://youtu.be/HJnOoUrqHis)
* [スクリプト表記](/ja/guide/script-expressions)
* [ゲーム内変数入力](/ja/api/#入力)
* [条件分岐](/ja/api/#if)
* [セーブロードシステム](/ja/guide/save-load-system)
* [ダイナミックリソース (メモリー) マネジメント](https://youtu.be/cFikLjfeKyc)
* [ゲーム設定](/ja/guide/game-settings)
* [CGギャラリー](/ja/guide/unlockable-items#CGギャラリー)
* [Tips収集](/ja/guide/unlockable-items#tips)
* [クロスプラットフォーム入力](/ja/guide/input-processing)
* [テキストバックログ](/ja/guide/text-printers#テキストバックログ)
* [スキップ機能](/ja/guide/text-printers#スキップ機能)
* [自動読み進み機能](/ja/guide/text-printers#自動読み進み機能)
* [UI切替](/ja/guide/user-interface#UI切替)
* [適合性のあるUIレイアウト](/ja/guide/user-interface#適合性のあるUIレイアウト)
* [カスタムUI](/ja/guide/user-interface#カスタムUI)
* [テキスト管理](/ja/guide/managed-text)
* [ローカライズ](/ja/guide/localization)
  * [スクリプトのローカライズ](/ja/guide/localization#スクリプトのローカライズ)
  * [リソースのローカライズ](/ja/guide/localization#リソースのローカライズ)
* [コミュニティMod](/ja/guide/community-modding)
* [開発コンソール](/ja/guide/development-console)
* [スクリプトのレビューとデバッグ](/ja/guide/naninovel-scripts#スクリプトデバッグ)
* [カスタムコマンド](/ja/guide/custom-commands)
* [カスタムアクターの実装](/ja/guide/custom-actor-implementations)
* [Google Drive 連携](/ja/guide/resource-providers#google-drive)
* [ビジュアルスクリプティング](/ja/guide/visual-scripting)
