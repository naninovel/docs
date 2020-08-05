# ムービー

ムービーは `IMovieUI` UIを介してシーンの上で再生される動画で、再生中はスクリプトの実行とユーザー入力処理を停止します。

ムービーの再生を開始する前に、指定されたフェードテクスチャ（デフォルトでは黒一色）へのフェードインが実行されます。再生が終了すると、フェードテクスチャからシーンコンテンツへのフェードアウトが実行されます。

プレーヤーは `Cancel` 入力（スタンドアロン入力モジュールのデフォルトは `Esc`）で映画の再生をスキップできます。バインディングは入力コンフィグメニューで変更できます。

ムービーリソースを追加、編集、削除するには、コンテキストメニュー `Naninovel -> Resources -> Movies` のムービーマネージャーを使用します:

![Manage Movies](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

[Unityでサポートされている](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility) 動画フォーマットはどれも利用できます。

ムービーの再生動作は、コンテキストメニュー `Naninovel -> Configuration -> Movies` から設定できます。利用可能なオプションは、[コンフィグガイド](/ja/guide/configuration.md#movies) をご覧ください。

naninovelスクリプトでムービーを再生するには、[@movie] コマンドに続けてビデオクリップ名を記述します:

```nani
; ムービーリソースに追加済みのビデオクリップ "Opening" を再生する。
@movie Opening
```

デフォルトでは、再生されるビデオは引き伸ばしを防ぐため縦横比を 16:9 に合わせます。この動作は `IMovieUI` UIを [上書き](/ja/guide/user-interface.html#カスタムUI) することで変更できます。 `MovieImage` ゲームオブジェクトに紐付けられた `Aspect Ratio Fitter` コンポーネントは、フィッティング動作を制御します。

![](https://i.gyazo.com/38e8b1fc220d5fedd50f62ab855b2e92.png)

## WebGLでの制限

プラットフォームの制限により、WebGLでのビデオ再生はURIストリーミングモードでのみ可能です。WebGLプレーヤーのビルド時にすべてのビデオリソースは `Assets/StreamingAssets` フォルダーにコピーされます。お使いのWebホスティングが、プレイヤービルドディレクトリからローカルファイルへのアクセスを許可する設定になっているかどうか確認してください。
