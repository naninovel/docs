# 紹介

::: warn
これはドキュメントの翻訳版です。情報が正しくないか、古い場合があります。関連する最新のバージョンは、[元のドキュメントを参照](/guide/)してください。
:::

Naninovelは [Unityゲームエンジン](https://unity.com/ja) 用の拡張機能です。 C#フレームワークとエディター機能で構成され、[ビジュアルノベルゲーム](https://ja.wikipedia.org/wiki/%E3%83%93%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB%E3%83%8E%E3%83%99%E3%83%AB) 開発をサポートします。

[!!lRxIKDU9z4k]

::: note
NaninovelはUnityで実現できることを制限しませんが、一部の組み込み機能を正しく動作させるためにはいくつか要件(サポートされているバージョンのUnity、プロジェクトコンフィグ、対象プラットフォーム)があります。詳細は [互換性についてのページ](/ja/guide/compatibility.md) を参照してください。
:::

このエンジンを初めて使用する場合は、まず [スタートガイド](/ja/guide/getting-started.md) をお読みください。
特定のトピックについて探したい場合は、ウェブサイト上部の検索ボックスをご利用ください。また、
よくある質問については [FAQ](/ja/faq/) をご覧ください。利用可能な全てのスクリプトコマンド、パラメーター、使用例は [APIリファレンス](/ja/api/)に記載されています。 必要な情報が見つからない場合は、お気軽に [サポートへご連絡](/ja/support/#開発者向けサポート) ください。

## 機能

以下は、Naninovelが提供する機能の一部です。

* [ドキュメントベースのスクリプト](/ja/guide/naninovel-scripts.md)
  * [一般テキスト](/ja/guide/naninovel-scripts.md#一般テキスト)
  * [ラベル](/ja/guide/naninovel-scripts.md#ラベル)
  * [コマンドのインライン化](/ja/guide/naninovel-scripts.md#コマンドのインライン化)
  * [ビジュアルエディター](/ja/guide/naninovel-scripts.md#ビジュアルエディター)
  * [ホットリロード](/ja/guide/naninovel-scripts.md#ホットリロード)
  * [IDE サポート (シンタックスハイライト, オートコンプリート, etc)](/ja/guide/naninovel-scripts.md#ide-サポート)
* [テキストプリンター](/ja/guide/text-printers.md)
  * [ダイアログ](/ja/guide/text-printers.md#ダイアログプリンター)
  * [フルスクリーン](/ja/guide/text-printers.md#フルスクリーンプリンター)
  * [チャット](/ja/guide/text-printers.md#チャットプリンター)
  * [吹き出し](/ja/guide/text-printers.md#吹き出しプリンター)
  * [TextMesh Pro 対応](/ja/guide/text-printers.html#textmesh-pro)
  * [ルビ (振り仮名) 対応](/ja/guide/text-printers.html#テキストスタイル)
* [キャラクター](/ja/guide/characters.md)
  * [スプライトキャラクター](/ja/guide/characters.md#スプライトキャラクター)
  * [分解スプライトキャラクター](/ja/guide/characters.md#分解スプライトキャラクター)
  * [キャラクター差分](/ja/guide/characters.md#キャラクター差分)
  * [一般キャラクター](/ja/guide/characters.md#一般キャラクター)
  * [Live2D キャラクター](/ja/guide/characters.md#live2d-キャラクター)
  * [キャラクター専用メッセージカラー](/ja/guide/characters.md#メッセージカラー)
  * [口パク](/ja/guide/characters.md#口パク)
* [背景](/ja/guide/backgrounds.md)
  * [スプライト背景](/ja/guide/backgrounds.md#スプライト背景)
  * [動画背景](/ja/guide/backgrounds.md#動画背景)
  * [レイヤー背景](/ja/guide/backgrounds.md#レイヤー背景)
  * [一般背景](/ja/guide/backgrounds.md#一般背景)
  * [シーン背景](/ja/guide/backgrounds.md#シーン背景)
* [トランジションエフェクト](/ja/guide/トランジションエフェクト.md)
* [遠近カメラモード](https://youtu.be/rC6C9mA7Szw)
* [特殊エフェクト (FX システム)](/ja/guide/特殊エフェクト.md)
* [バックグラウンドミュージック (BGM)](/ja/guide/audio.md#バックグラウンドミュージック)
* [効果音 (SFX)](/ja/guide/audio.md#効果音)
* [カメラアニメーション](/ja/api/#カメラ)
* [ボイス収録と自動ボイス収録](/ja/guide/voicing.md)
* [動画](/ja/guide/movies.md)
* [選択肢](/ja/guide/choices.md)
* [カスタム変数](/ja/guide/custom-variables.md)
* [選択やり直し](https://youtu.be/HJnOoUrqHis)
* [スクリプト表記](/ja/guide/script-expressions.md)
* [ゲーム内変数入力](/ja/api/#入力)
* [条件分岐](/ja/api/#if)
* [セーブロードシステム](/ja/guide/save-load-system.md)
* [ダイナミックリソース (メモリー) マネジメント](https://youtu.be/cFikLjfeKyc)
* [ゲーム設定](/ja/guide/game-settings.md)
* [CGギャラリー](/ja/guide/unlockable-items.md#CGギャラリー)
* [Tips収集](/ja/guide/unlockable-items.md#tips)
* [クロスプラットフォーム入力](/ja/guide/input-processing.md)
* [テキストバックログ](/ja/guide/text-printers.md#テキストバックログ)
* [スキップ機能](/ja/guide/text-printers.md#スキップ機能)
* [自動読み進み機能](/ja/guide/text-printers.md#自動読み進み機能)
* [UI切替](/ja/guide/user-interface.md#UI切替)
* [適合性のあるUIレイアウト](/ja/guide/user-interface.md#適合性のあるUIレイアウト)
* [カスタムUI](/ja/guide/user-interface.md#カスタムUI)
* [テキスト管理](/ja/guide/managed-text.md)
* [ローカライズ](/ja/guide/localization.md)
  * [スクリプトのローカライズ](/ja/guide/localization.md#スクリプトのローカライズ)
  * [リソースのローカライズ](/ja/guide/localization.md#リソースのローカライズ)
* [コミュニティMod](/ja/guide/community-modding.md)
* [開発コンソール](/ja/guide/development-console.md)
* [スクリプトのレビューとデバッグ](/ja/guide/naninovel-scripts.md#スクリプトデバッグ)
* [カスタムコマンド](/ja/guide/custom-commands.md)
* [カスタムアクターの実装](/ja/guide/custom-actor-implementations.md)
* [Google Drive 連携](/ja/guide/resource-providers.md#google-drive)
* [ビジュアルスクリプティング](/ja/guide/playmaker.md)
