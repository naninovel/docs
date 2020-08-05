# 背景

 [キャラクター](/ja/guide/characters.md) とは異なり、背景はシーンの *back* レイヤーを表すために使用されるアクターです。ロケーション、シーン、ランドスケープ、その他常にキャラクターの *背後に* 表示される必要があるものです。

背景アクターは、名前、外観、可視性、および形状（位置、回転、スケール）で定義されます。 外観、可視性、形状は、時間をかけて変化させることもできます。

背景の動作は、コンテキストメニュー `Naninovel -> Configuration -> Backgrounds` から設定できます。使用可能なオプションについては、 [コンフィグガイド](/ja/guide/configuration.md#backgrounds)を参照してください。背景のリソースマネージャーは、コンテキストメニュー `Naninovel -> Resources -> Backgrounds` からアクセスできます。

![](https://i.gyazo.com/cccd08280dac72d199ea3465bc167a22.gif)

大量の背景がありエディターメニューから割り当てるのが大変な場合は、 `Resources/Naninovel/Backgrounds` フォルダーに、対応するアクターIDのフォルダでグループ分けしてドロップすることもできます。たとえば、 "MainBackground" IDを持つ背景アクターの外観を追加するには、テクスチャ（スプライト）を  `Resources/Naninovel/Backgrounds/MainBackground` フォルダーに保存すると、自動的にスクリプトで使用できるようになります。

必要に応じて、外観リソースをサブフォルダで整理できます。 その場合、naninovelスクリプトで参照するにはスラッシュ (`/`) を使用します。 たとえば、 `Resources/Naninovel/Backgrounds/MainBackground/Events/CG251` に保存された外観テクスチャは、`Events/CG251` でスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers.md#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。たとえば、 "Beach" の外観を "MainBackground" で公開するには、次のアドレスにクリップアセットを割り当てます: `Naninovel/Backgrounds/MainBackground/Beach`。 addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

naninovel スクリプトでは、背景は基本的に [@back] コマンドで操作します:

```nani
; メイン背景の外観に `River` を設定。
@back River

; 上記に加えてトランジションエフェクト `RadialBlur` を使用。
@back River.RadialBlur
```

従来のビジュアルノベルゲームの仕組みに合わせ、背景の扱いはキャラクターとは少し異なります。ほとんどの場合、シーンに背景アクターが一つ存在し、都度変化します。スクリプトで同じアクターIDを繰り返す手間を省くために、背景の外観とトランジションの種類（オプション）のみを無名パラメーターとして記述することができます。これは `MainBackground` アクターを使用するものとみなされます。それ以外の場合、背景アクターのIDを `id` パラメータで明示的に指定できます。

```nani
; `Night` と `Day` の外観（ビデオクリップ）を持つバックグラウンドアクター `CityVideo` があるとします。
; `Day` のクリップを動画背景として再生。
@back Day id:CityVideo

; 波及エフェクトを使用して `Night` クリップに切り替える。
@back Night.Ripple id:CityVideo

; 動画背景を隠す。
@hide CityVideo
```

メインの背景アクターレコードは、デフォルトで背景リソースマネージャーに作成され、名前を変更したり削除したりすることはできません。ただし、メイン背景のパラメーター（実装、ピボット、PPUなど）は自由に変更できます。

## ポーズ

全ての背景には `Poses` プロパティがあり、ステート (ポーズ) の名前を指定できます。

ポーズ名を [@back] コマンドの外観として使用すると、コマンドパラメーターで個別に指定する代わりに、ポーズステートで指定されたすべてのパラメーターを一度に適用できます。

```nani
; `Day` ポーズがメインの背景として定義されているとして、
; ポーズステートで指定されたすべてのパラメータを適用します。
@back Day

; 上記に加えて、`City` ID の背景アクターを3秒かけて `DropFade` トランジションで表示します。
@back Day id:City transition:DropFade time:3
```

ポーズを外観として使用する場合でも、個々のパラメータは上書きできます。例：

```nani
; `Day` ポーズがメインの背景として定義されているとして、
; ポーズステートで指定されたすべてのパラメータを色味を除いて適用します。
; 色味はコマンドで上書きします。
@back Day tint:#ff45cb
```

## スプライト背景

背景アクターのスプライト実装は、最も一般的でシンプルです。背景の外観は単一の[スプライト](https://docs.unity3d.com/Manual/Sprites)アセットで表します。スプライトのソースとして、 `.jpg` または `.png` 画像が使用できます。


## 動画背景

動画の背景は、[ビデオクリップ](https://docs.unity3d.com/Manual/class-VideoClip) アセットを使用して外観を表します。

動画背景はエディターGUIからのみ操作できます。

各プラットフォームでサポートされている動画形式については [動画ソースについてのUnityドキュメント](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html) を参照してください。

参考までに、WebGLデモで使用されている背景動画クリップの詳細なビデオパラメータを以下に示します。

~~~
コンテナ : MPEG-4
コンテナプロフィール : Base Media
コンテナコーデックID : isom (isom/iso2/avc1/mp41)
フォーマット : AVC
フォーマット/情報 : Advanced Video Codec
フォーマットプロフィール : High@L4
フォーマット設定, CABAC : Yes
フォーマット設定, RefFrames : 4 frames
コーデックID : avc1
コーデックID/情報 : Advanced Video Coding
ビットレート : 3 196 kb/s
横幅 : 1 920 pixels
高さ : 1 080 pixels
ディスプレイアスペクト比 : 16:9
フレームレートモード : Constant
フレームレート : 25.000 FPS
カラースペース : YUV
クロマサブサンプリング : 4:2:0
ビット深度 : 8 bits
スキャンの種類 : Progressive
ライティングライブラリ : x264 core 148 r2795 aaa9aa8
エンコーディング設定 : cabac=1 / ref=3 / deblock=1:0:0 / analyse=0x3:0x113 / me=hex / subme=7 / psy=1 / psy_rd=1.00:0.00 / mixed_ref=1 / me_range=16 / chroma_me=1 / trellis=1 / 8x8dct=1 / cqm=0 / deadzone=21,11 / fast_pskip=1 / chroma_qp_offset=-2 / threads=12 / lookahead_threads=2 / sliced_threads=0 / nr=0 / decimate=1 / interlaced=0 / bluray_compat=0 / constrained_intra=0 / bframes=3 / b_pyramid=2 / b_adapt=1 / b_bias=0 / direct=1 / weightb=1 / open_gop=0 / weightp=2 / keyint=250 / keyint_min=25 / scenecut=40 / intra_refresh=0 / rc_lookahead=40 / rc=crf / mbtree=1 / crf=23.0 / qcomp=0.60 / qpmin=0 / qpmax=69 / qpstep=4 / ip_ratio=1.40 / aq=1:1.00
~~~

そしてこちらがこのビデオクリップのUnityインポート設定です。

![](https://i.gyazo.com/9e6a9cc0bd79bca2c0e8e35666fbdc7f.png)

対象のプラットフォームによっては、ビデオクリップのインポート設定でトランスコーディングを有効にする必要がある場合があります。

::: example
シームレスなループが上手くいかないようなら、動画の開始フレームと終了フレームが完全に同じで、互換性のあるエンコーディング設定になっていることを確認してください。[動画をループするサンプルプロジェクト](https://github.com/Elringus/VideoLoop) を参考にしてください。
:::

WebGLでは、ビデオプレーヤーはストリーミングモードでのみ機能するため、WebGLプレーヤーのビルド時にすべてのビデオリソースは `Assets/StreamingAssets/Backgrounds` フォルダーにコピーされます。 **StreamingAssets** フォルダーもビルド出力ディレクトリに表示されます。ビルドを公開するときに必ず保存し、お使いのWebサーバーがこのフォルダーからのデータの読み取りを許可しているかどうか確認してください。

## レイヤー背景

レイヤー化された実装により、複数のスプライト（レイヤー）から背景を作成し、実行時にnaninovelスクリプトで個別に切り替えることができます。

レイヤー背景のプレハブを作るには、コンテキストメニューの `Create -> Naninovel -> Background -> Layered` アセットを使用してください。[プレハブ編集モード](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) に入ってレイヤーを作成します。いくつかのレイヤーとグループがデフォルトで作成されます。そのまま使用するか、削除して独自のものを追加できます。

レイヤー背景は [キャラクター差分](/ja/guide/characters.md#キャラクター差分) とよく似ています。naninovelスクリプトで設定および制御する方法の詳細については、このドキュメントを参照してください。

[@back] コマンドの名前のないパラメーターは、外観とトランジションの種類を想定しています（[@char] コマンドのようにIDと外観ではないことに注意してください）。そのため、次のようにレイヤー構成式を指定します:

```nani
; 背景アクター "LayeredForest" に対して
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## 一般背景

一般背景は、最も柔軟な背景アクターの実装です。これは、ルートオブジェクトに紐付けられた  `BackgroundActorBehaviour` コンポーネントを追加済みのプレハブをベースにしています。外観の変更と他のすべての背景パラメータは、[Unityイベント](https://docs.unity3d.com/Manual/UnityEvents.html) としてルーティングされ、下層のオブジェクトの動作を任意に実装できます。

![](https://i.gyazo.com/d8f86c83decfb3c40c8d23602214a743.png)

テンプレートから一般背景プレハブを作成するには、コンテキストメニューから `Create -> Naninovel -> Background -> Generic` を使用してください。

一般背景は一般キャラクターとよく似ています。実際の利用例として、アニメーション3Dモデルを一般キャラクターとして設定するチュートリアル動画をご覧ください。

[!!HPxhR0I1u2Q]

## シーン背景

シーン背景の実装を利用して [Unityシーン](https://docs.unity3d.com/Manual/CreatingScenes) を背景にできます。

シーン背景はエディターGUIからのみ操作できます。シーンのアセットはプロジェクトフォルダーの `Assets/Scenes` に保存されている必要があります。


最初に、 `Assets/Scenes` フォルダー内に新しいシーンを作成（または既存のシーンを移動）し、少なくとも1つの[カメラ](https://docs.unity3d.com/ScriptReference/Camera.html) があることを確認します。 シーン背景をロードすると、Naninovelはシーンの最初のカメラにレンダリングテクスチャを割り当てます。次に、レンダリングテクスチャが背景スプライトに割り当てられ、Naninovelシーンスペース内のシーンの背景を表します。このようにして、シーン背景は他の背景やキャラクターアクターと共存でき、すべての背景トランジションエフェクトやさまざまな表示アスペクト比に対応しています。

同時に読み込まれる可能性のある他のシーンのオブジェクトと重ならないように（たとえば、単一のnaninovelスクリプトから参照する場合）、シーンオブジェクトはワールドスペース内に配置してください。さらに、シーン背景オブジェクトがグローバルスペースの起点 (`x0 y0 z0`) の近くに配置されている場合は、Naninovelのメインカメラでレンダリングされる可能性があります。これを防ぐには、すべてのシーンオブジェクトをグローバル起点から離すか、`Configuration -> Engine -> Override Objects Layer` で [レイヤー](https://docs.unity3d.com/Manual/Layers.html) を使用して Naninovel 関連のオブジェクトを分離します。

シーンのセットアップが完了したら、 `Naninovel -> Configuration -> Backgrounds` メニューから新しい背景アクターを作成し、 `SceneBackground` 実装を選択して、シーンアセットをアクターリソースに追加します。

![](https://i.gyazo.com/d69159ab4d93793022018fa8d244f1aa.png)

シーン背景アクターにリソースを割り当てる場合、対応するシーンアセットが [ビルド設定](https://docs.unity3d.com/Manual/BuildSettings.html) に自動的に追加されます。シーンアセットがビルドに追加されないエラーが発生した場合は、手動で追加してみてください。

これで [@back] コマンドを使って作成したシーン背景アクターを管理できます。例:

```nani
@back SceneName id:ActorId
```
