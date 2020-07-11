# 互換性

## Unity バージョン

サポートしている最小の Unity バージョンは **2019.4** です。これは Naninovel v1.x リリースを通して変わりません。[TECH stream](https://blogs.unity3d.com/2018/04/09/new-plans-for-unity-releases-introducing-the-tech-and-long-term-support-lts-streams/) からの新しいリリースへの対応は、beta版ではなくなってから追加されます。

制作リスクを最小にするために、最新の [2019 LTS stream](https://unity3d.com/unity/qa/lts-releases?version=2019.4) を利用することを推奨します。

## プラットフォーム

すべてのエンジン機能はクロスプラットフォームAPIを使用して実装されており、Unityが対象とするすべてのプラットフォームと互換性があると考えています。

以下のプラットフォームは互換性をテスト済みです:
* スタンドアロン: PC, Mac, Linux
* WebGL
* iOS
* Android
* UWP (IL2CPP scripting backend only)

## レンダーパイプライン

Unity の [Scriptableレンダーパイプライン](https://docs.unity3d.com/Manual/render-pipelines.html) (URP と HDRP) は、いくつかの制限と追加設定により対応しています。詳細は [レンダーパイプラインガイド](/ja/guide/render-pipelines.md) を参照してください。

## マネージコードストリッピング

[マネージコードストリッピング](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) の "Medium" と "High" 設定はサポートしていません。ストリッピングを無効にするか、デフォルトの "Low" 設定を使用します。
