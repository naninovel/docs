# 互換性

## Unityバージョン

サポートされているUnityバージョン: `6.0` および `6.3` LTSリリース（最新のパッチを適用）。

非LTS（テック、ベータ、およびアルファ）リリースはサポートされていません。将来のUnityリリースに関する問題は、次のNaninovelバージョンで対処されます。過去のNaninovelバージョンと互換性のあるUnityリリースは [リリースノート](https://pre.naninovel.com/releases) に記載されています。

## プラットフォーム

ランタイムは、プラットフォーム固有のAPI、プリコンパイルされたネイティブライブラリ、またはサードパーティの依存関係を使用しません。その結果、NaninovelはUnityがターゲットにできるすべてのプラットフォームと互換性があることが期待されます。ただし、これはネイティブプラットフォーム機能を利用しないことも意味するため、VR/XRなどの特殊なプラットフォームで最適なユーザーエクスペリエンスを得るには、一部の機能を適応させる必要がある場合があります。

::: info NOTE
Unityは [ゲームコンソール](https://unity.com/how-to/develop-console-video-games-unity)（PlayStation、Xbox、Switch）をサポートしていますが、小規模な開発者にとってはプロセスが困難な場合があります。パブリッシングパートナーをお探しの場合は、Naninovelプロジェクトを幅広いプラットフォームに移植した実績のある [Sometimes You](https://porting.games) をお勧めします。
:::

## レンダーパイプライン

Universal Render Pipeline (URP) と従来の組み込みレンダーパイプライン (BiRP) の両方が完全にサポートされています。High-Definition Render Pipeline (HDRP) は積極的にテストされておらず、推奨されません。ほとんどのNaninovel機能はHDRPで動作しますが、[@trans]、[@glitch]、[@bokeh] コマンドなどの一部のレンダリング固有の機能は、HDRPではそのままでは動作しない場合があります。

## GUI

UI Toolkitは [アダプター](/ja/guide/gui#ui-toolkit) と共に使用できますが、推奨されておらず、組み込みUIシステムではサポートされていません。すべての組み込みUIと基盤となるスクリプトは、Unityのデフォルトの [uGUIシステム](https://docs.unity3d.com/Packages/com.unity.ugui@latest) を使用して作成されています。すべてのテキストは、組み込みの [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) コンポーネントに基づいています。

## Input System

Unityの [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) はデフォルトでサポートされています。レガシーなInput Managerはサポートされていません。カスタム入力システム（Rewiredなど）は、`IInputManager` エンジンサービスを [オーバーライド](/ja/guide/engine-services#組み込みサービスのオーバーライド) することで実装できます。

## マネージドコードストリッピング

「Medium」および「High」の [マネージドバイトコードストリッピング](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) プロファイルはサポートされていません。ストリッピングを無効にするか、デフォルトで選択されている「Low」プロファイルを使用する必要があります。

## 例外

「Publishing Settings」の `Enable Exceptions` オプション（デフォルトで選択）には、少なくとも「Explicitly Thrown Exceptions Only」レベルが必要です。「None」レベルはサポートされていません。この設定は [WebGLビルド](https://docs.unity3d.com/Manual/webgl-building) にのみ適用されます。

## ストーリーエディター

組み込みの [ストーリーエディター](/ja/guide/editor#組み込みモード) には、少なくともWindows 10（x86-64 CPU）、macOS 14（Apple Silicon CPU）、または新しいWebKitGTKランタイムを備えたx86-64のLinuxが必要です。サポートされていないプラットフォームでも、[Webバージョン](https://naninovel.com/editor) のストーリーエディターを使用できます。
