# キャラクター

キャラクターアクターはシーンの中で[背景](/ja/guide/backgrounds.md) の上に存在するアクターです。

キャラクターアクターは、名前、外観、可視性、および形状（位置、回転、スケール）および視線の向きで定義されます。外観、可視性、変形、および視線の向きを時間をかけて変化させることもできます。

キャラクターの動きはコンテキストメニューの `Naninovel -> Configuration AM-> Characters` で設定できます。利用可能なオプションについては [コンフィグガイド](/ja/guide/configuration.md#characters) をご覧ください。キャラクターのリソースマネージャーはコンテキストメニューの `Naninovel -> Resources -> Characters` からアクセスできます。

![Add Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

キャラクターや外観が大量にありエディターメニューから割り当てるのが大変な場合は、`Resources/Naninovel/Characters` フォルダーに、対応するアクターIDのフォルダでグループ分けしてドロップすることもできます。たとえば、 "Kohaku" IDを持つキャラクターアクターの外観を追加するには、テクスチャ（スプライト）を `Resources/Naninovel/Characters/Kohaku` フォルダーに保存すると、自動的にスクリプトで使用できるようになります。

必要に応じて、外観リソースをサブフォルダで整理できます。 その場合、naninovelスクリプトで参照するにはスラッシュ (`/`) を使用します。 たとえば、`Resources/Naninovel/Characters/Kohaku/Casual/Angry` に保存された外観テクスチャは、 `Casual/Angry` でスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers.md#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。例えば、"Happy" の外観を "Kohaku" キャラクターで公開するには, 次のアドレスにテクスチャアセットを割り当てます: `Naninovel/Characters/Kohaku/Happy`. addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

naninovel スクリプトでは、キャラクターは基本的に [@char] コマンドで操作します:

```nani
; `Sora` という名前のキャラクターをデフォルトの外観で表示。
@char Sora

; 同様に、外観に `Happy` を設定。
@char Sora.Happy

; 上記と同じですが、キャラクターを画面の左端から45％、下端から10％の位置に配置します。
; また、左を向かせます。
@char Sora.Happy look:left pos:45,10
```

## ポーズ

各キャラクターは名前の付いたステート（ポーズ）を指定できる `Poses` プロパティを持っています。

![](https://i.gyazo.com/5b022d32eddb3e721ed036c96f662f5d.png)

ポーズ名を [@char] コマンドの外観として使用すると、コマンドパラメーターで個別に指定する代わりに、ポーズステートで指定されたすべてのパラメーターを一度に適用できます。

```nani
; `SuperAngry` ポーズが `Kohaku` キャラクターに定義されているとして、
; ポーズステートで指定されたすべてのパラメータを適用します。
@char Kohaku.SuperAngry

; 上記を3秒かけて `DropFade` トランジションで表示します。
@char Kohaku.SuperAngry transition:DropFade time:3
```

ポーズを外観として使用する場合でも、個々のパラメータは上書きできます。例：

```nani
; `SuperAngry` ポーズが `Kohaku` キャラクターに定義されているとして、
; ポーズステートで指定されたすべてのパラメータを色味を除いて適用します。
; 色味はコマンドで上書きします。
@char Kohaku.SuperAngry tint:#ff45cb
```

## 表示名

キャラクター設定では、特定のキャラクターの `Display Name` を設定できます。 設定すると、キャラクターのIDではなく、プリンター名ラベルのUIに表示名が表示されます これにより、スペースや特殊文字（IDでは不可）を含むキャラクター名を使用できます。

ローカライズするには、[テキスト管理](/ja/guide/managed-text) で "CharacterNames" を使用します。このドキュメントは、テキスト管理リソースの生成タスクを実行すると自動的に作成されます。"CharacterNames" ドキュメントの値は、オリジナルロケールの場合、キャラクターメタデータに設定された値を上書きしません。

naninovelスクリプトでは、表示名をカスタム変数と紐付け、ゲーム全体で動的に変更することができます。表示名を紐付けるには、キャラクターコンフィグメニューでカスタム変数の名前を中括弧で囲み指定します。

![](https://i.gyazo.com/9743061df462bd809afc45bff20bbb6d.png)

これでスクリプトで変数の値を変更できます。これにより、表示名も変更されます:

```nani
@set PlayerName="Mistery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

名前の紐付け機能を使うと、 [@input] コマンドでプレイヤーに表示名を入力させることもできます:

```nani
@input PlayerName summary:"Choose your name."
@stop
Player: You can call me {PlayerName}.
```

## メッセージカラー

キャラクターコンフィグで `Use Character Color` が有効だと、表示テキストと名前ラベルを指定した色に変更できます。対応するキャラクターIDが [@print] コマンドか一般テキストで指定されている場合に適応されます。

以下の動画で表示名とメッセージカラーの使い方を解説しています。

[!!u5B5s-X2Bw0]

## アバターテクスチャ

[@char] コマンドの `avatar` パラメーターを使って、キャラクターにアバターテクスチャを設定できます。アバターは、キャラクターに紐付けられたテキストメッセージを表示するときに、対応できるテキストプリンターで表示されます。現在、 `Wide` と `Chat` のテキストプリンターのみがアバター機能をサポートしています。

![](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

任意のアバターを使用するには、まずアバターリソースに追加し、名前を付ける必要があります。キャラクターコンフィグメニューの `Avatar Resources` プロパティで行うことができます。

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

::: note
アバター名は任意に設定することができ、既存のキャラクターIDや外観を含める必要はありません。アバターをキャラクターに関連付けて自動的に表示したい場合には必要です。
:::

これで、次のように特定のアバターテクスチャを表示できます。:

```nani
@char CharacaterId avatar:AvatarName
```

キャラクターにデフォルトのアバターを設定するには、アバターテクスチャリソースの名前を `CharacterID/Default` にしてください。例えば、ID `Kohaku` のキャラクターにデフォルトのアバターを設定するには、アバターリソースに `Kohaku/Default` という名前を付けます。

アバターを特定のキャラクターの外観に紐付けることもできます。これにより、キャラクターの外観が変わると、アバターも自動的に変更されます。そのためにはアバターリソースの名前を次の形式にします: `CharacterID/CharacterAppearance`。この `CharacterAppearance` はアバターリソースをマップする外観の名前です。

**アバターはキャラクターの外観と直接繋がっておらず** シーンにキャラクターを表示する方法ではないことに注意してください。キャラクターのリソースマネージャーで設定された外観は、シーン内での実際のキャラクター表示です。アバターは独立した機能で、対応しているテキストプリンターに任意の画像を"挿入"するものです。

 [@char] コマンドの `visible` パラメータを `false` に設定することで、キャラクターのアバターのみをテキストプリンター内に表示しキャラクター自体は非表示にすることができます。例:
```nani
@char CharacaterId visible:false
```

キャラクター自体を非表示にしたままでアバターを常に変更したい場合は、キャラクターの設定メニューで `Auto Show On Modify` を無効にすることを検討してください。無効にすると、非表示にするときに `visible:false` を指定してキャラクターのパラメーターを変更する必要はありません。

## 話者の強調

キャラクターコンフィグで有効にすると、最後に表示されたメッセージによって話しているキャラクターを色付けします。

[!!gobowgagdyE]

## 口パク

[一般](/ja/guide/characters.md#一般キャラクター) と [Live2D](/ja/guide/characters.md#live2d-キャラクター) のキャラクター実装では、いわゆる "口パク" を利用できます。イベントを送ることで、表示メッセージを発しているキャラクターの口パクアニメーションを動作させることが出来ます。

[!!fx_YS2ZQGHI]

[自動ボイス再生](/ja/guide/voicing.md#自動ボイス再生) 機能が有効になっていると、口パクイベントはボイスオーバーによって起動します。それ以外の場合は、表示テキストメッセージによってイベントがアクティブになります。後者の場合、手動で口パクを開始または停止したい場合があると思います（句読点のときに口パクアニメーションを停止する時など）。その場合は、[@lipSync] コマンドを使用してください。

口パクを設定する方法について詳しくは、 [一般](/ja/guide/characters.md#一般キャラクター) と [Live2D](/ja/guide/characters.md#live2d-キャラクター) のキャラクター実装についてのドキュメントをご覧ください。

## プリンターのリンク

`Linked Printer` プロパティを使用して、 [テキストプリンター](/ja/guide/text-printers.md) をキャラクターに関連付けることができます。

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

リンクされていると、そのキャラクターが発しているメッセージと関連付けられたプリンターが自動的に使用されます。

[@print] コマンド（一般テキストを表示するときに内部で使用される）は、関連付けられたプリンターをデフォルト状態にし、他の可視プリンターをデフォルトで非表示にします。プリンターがキャラクターにリンクされている場合、print コマンドは、今表示されているデフォルトのテキストプリンターを自動的に変更し、対応するキャラクターに関連付けられたテキストを表示します。プリンタアクターのコンフィグメニューで `Auto Default` プロパティを無効にすることで、この動作を防ぐことができます。無効になっている場合は、 [@printer] コマンドで、手動でデフォルトのプリンターの表示/非表示を切り替える必要があります。

## スプライトキャラクター

キャラクターアクターのスプライト実装は最も一般的で簡単です。一連の [スプライト](https://docs.unity3d.com/Manual/Sprites) アセットを使用して、キャラクターの外観を表します。[Unityでサポートされている形式](https://docs.unity3d.com/Manual/ImportingTextures) の画像（テクスチャ）をスプライトのソースにできます。

## 分解スプライトキャラクター

オープンソースの [SpriteDicing](https://github.com/Elringus/SpriteDicing) パッケージを使用した `DicedSpriteCharacter` 実装で、キャラクタースプライトのテクスチャを再利用することで、ビルド時の容量とテクスチャーのメモリを大きく削減することができます。

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

[Unityパッケージマネージャー](https://docs.unity3d.com/Manual/upm-ui.html) でパッケージをインストールします: パッケージマネージャーを開く (Window -> Package Manager)、 "+" ボタンをクリック、 "Add package from git URL" を選択、入力欄に `https://github.com/Elringus/SpriteDicing.git#package` と入力し、 "Add" をクリック。

[!b54e9daa9a483d9bf7f74f0e94b2d38a]

キャラクターの外観を含む `DicedSpriteAtlas` アセットは、分解スプライトキャラクターのリソースとして使用されます。各外観は、アトラスに含まれている分解スプライトに名前でマップされます。

分解スプライトキャラクターのメタデータプロパティの一部（たとえば、ユニットあたりのピクセル数、ピボット）はアトラスアセットによって制御されます。一方、キャラクターコンフィグの値は、実際のスプライトを表示するためのレンダーテクスチャに適用されます。アトラスプロパティを変更するときは、変更を有効にするため再ビルドしてください。

![](https://i.gyazo.com/3765726bd326bb7a8a03a653f458cd3d.png)

以下のビデオガイドでは、分解スプライトアトラスの作成と構成、作成したアトラスに基づく新しい分解キャラクターの追加、naninovelスクリプトからのキャラクターの制御について説明しています。

[!!6PdOAOsnhio]

## キャラクター差分

レイヤー実装で複数のスプライト（レイヤー）からキャラクターを作成し、実行時にnaninovelスクリプトで、個別またはグループごとに切り替えることができます。

キャラクター差分プレハブの作成は、コンテキストメニューの `Create -> Naninovel -> Character -> Layered` で行います。[プレハブ編集モード](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) に入りレイヤーを作成します。デフォルトでは、いくつかのレイヤーとグループが作成されます。そのまま使用するか、削除して独自のものを追加できます。

[スプライトレンダラー](https://docs.unity3d.com/Manual/class-SpriteRenderer.html) コンポーネントを持つルートプレハブオブジェクトの子ゲームオブジェクトは、*レイヤー* と見なされます。他のオブジェクトは *グループ* と見なされます。グループ内にレイヤーを配置すると、naninovelスクリプトの一つの式であるレイヤーを選択したり、グループ内のすべてのレイヤーを無効/有効にしたりできます（詳細は後ほど）。

一部のレイヤーをデフォルトで非表示にするには、（ゲームオブジェクトではなく）スプライトレンダラーコンポーネントを無効にします。

プレハブの上に表示される白いフレームは、実行時にレンダーテクスチャにレンダリングされるアクターキャンバスを示しています。テクスチャメモリの浪費を防ぎ、かつアンカーを正しく機能させるため、レイヤーとグループを移動して、フレーム内の空白を最小限に抑えてください。

![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

ブジェクトを拡大縮小して、アクターのデフォルトサイズを微調整できます。

キャラクター差分を Photoshop で作成している場合は、Unity の [PSD Importer package](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) をご検討ください。これは、レイヤーとポジションを全て保持したキャラクタープレハブを自動的に生成します。レイヤー階層を保持するには、インポート設定で `Use Layer Grouping` オプションを必ず有効にしてください。

必ず作成した差分プレハブをキャラクターリソース (`Naninovel -> Resources -> Characters`) に追加してください。 "Naninovel.LayeredCharacter" 実装を選択し、リソースレコード設定時に "Resource" フィールドへプレハブをドロップしてください。

差分キャラクターを naninovel スクリプトで操作するには、他のキャラクター実装と同じように [@char] コマンドを使います。違いは外観の設定の仕方のみです: 単一のIDの代わりに *レイヤー構成式* を使います。式には3つの種類があります:

 - グループ内の1つのレイヤーを有効にする: `group>layer`
 - レイヤーを有効にする: `group+layer`
 - レイヤーを無効にする: `group-layer`

たとえば、 "Miho" のキャラクターを考えてみましょう。 "Miho" は "Body" グループを持っていて "Uniform"、 "SportSuit"、 "Pajama" の3つのレイヤーが含まれています。"Uniform" レイヤーを有効にして他のレイヤーをすべて無効にするには、次のコマンドを記述します:

```nani
@char Miho.Body>Uniform
```

グループ内の他のレイヤーに影響を与えずにレイヤーを有効または無効にするには、 ">" の代わりに "+" と "-" をそれぞれ使用します。また、複数の構成式をコンマで分割して指定することもできます:

```nani
; メガネを有効に、帽子を無効にし、感情は "Cool" を選択。
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

グループ外のレイヤー（ルートプレハブの子オブジェクト）を選択するには、グループの部分をスキップします。例:

```nani
; "Halo" レイヤーオブジェクトがルートプレハブの下にあり、それを無効にする。
@char CharId.-Halo
```

構成式でレイヤー名を省略することで、グループ内のすべてのレイヤーに適用させることもできます（さらに、select式を使用すると隣接レイヤーに適用されます）:

```nani
; "Body/Decoration" グループ内のレイヤーを全て無効にする。
@char CharId.Body/Decoration-

; 存在する全てのレイヤーを有効にする。
@char CharId.+

; それぞれ複数のレイヤーを含んだ `Poses/Light` と `Poses/Dark` グループがあるとして、
; `Light` グループ内の全てのスプライトを有効に、 `Dark` グループの全てのレイヤーを無効にする。
@char CharId.Poses/Light>
```

上記の式は、ターゲットグループの直下の子だけでなく、基になるグループに含まれるすべてのレイヤーに再帰的に影響します。

外観が指定されていない場合（たとえば、事前に外観を設定せずに `@char CharId`）、デフォルトの外観が使用されます。キャラクター差分のデフォルトの外観は、レイヤー化されたプレハブのエディターでの見え方と同じです。

以下の動画は、キャラクター差分を設定してnaninovelコマンドで操作するデモです。

[!!Bl3kXrg8tiI]

::: note
動画で表示されている `@char Miho.Shoes>` コマンドは実際には "Shoes"グループ（すべての隣接グループを無効にしています）を選択し、非表示にしていません。グループを非表示にする正しいコマンドは `@char Miho.Shoes-` です。
:::

`Layered Actor Behaviour` コンポーネントの `Composition Map` プロパティから、コンポジション式をキーにマップすることが可能です:

![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— これでキーを使用して、レイヤー化されたアクターの外観を指定できます:

```nani
; `Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey` を適用する。
@char Miho.Uniform
; `Hair/Back>Straight,Hair/Front>Straight` を適用する。
@char Miho.StraightHair
```

キャラクター差分プレハブを編集する際は、マップレコードを右クリックして "Preview Composition" を選択すると、マップされた構成式をプレビューできます。

![](https://i.gyazo.com/9fb0aeccf4f33245d9f975592ee86dbc.gif)

レイヤーオブジェクトは実行時にUnityカメラで直接レンダリングされないことに注意してください。代わりに、コンポジション（外観）が一時的なレンダリングテクスチャに変わるたびに1回レンダリングされ、Naninovelカメラから見えるカスタムメッシュに送られます。この設定は、半透明のオーバードローを防ぎ、トランジションアニメーション効果をサポートするために必要です。

## 一般キャラクター

一般キャラクターは、最も柔軟なキャラクターアクターの実装です。これは、ルートオブジェクトに紐付けられた  `CharacterActorBehaviour` コンポーネントを追加済みのプレハブをベースにしています。外観の変更と他のすべてのキャラクターパラメータは、[Unityイベント](https://docs.unity3d.com/Manual/UnityEvents.html) としてルーティングされ、下層のオブジェクトの動作を任意に実装できます。

![](https://i.gyazo.com/9f799f4152782afb6ab86d3c494f4cc4.png)

テンプレートから一般キャラクタープレハブを作成するには、コンテキストメニューから `Create -> Naninovel -> Character -> Generic` を使用してください。

一般キャラクターで口パク機能を利用するには、 `CharacterActorBehaviour` コンポーネントの `On Started Speaking` と `On Finished Speaking` Unityイベントを使用してください。そのキャラクターが表示メッセージを話始める時（またはメッセージが完全に表示された時）イベントが呼び出され、そのキャラクターの口パクアニメーションの開始や停止などのカスタムロジックをトリガーできます。これはUIの `On Show` イベントと `On Hide` イベントの仕組みに似ています。 [UIカスタマイズガイド](/ja/guide/user-interface.md#カスタムUIの追加)でカスタムアニメーションの駆動に使用する方法を見つけてください。

次の動画は、3Dリグモデルを一般キャラクターとして設定し、[Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) コンポーネントでリグアニメーションの外観の変更をルーティングする例です。

[!!HPxhR0I1u2Q]

Unityの `Animator` コンポーネントは、ゲームオブジェクトが同じフレームで有効化/無効化されると、 `SetTrigger` の登録に失敗する可能性があります。`GameObject.SetActive` で可視状態を変更する場合（上記のチュートリアルで示しています）は、代わりにレンダラーで子オブジェクトを有効/無効にすることを検討してください。

## Live2D キャラクター

Live2D キャラクターの実装は、[Live2D Cubism](https://www.live2d.com) 2Dモデリングとアニメーションソフトで制作されたアセットを使用します。

利用するには、始めに [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity) をインストールする必要があります。インストール方法や使い方は、公式のLive2Dドキュメントをご覧ください。

その後 [Live2D 拡張パッケージ](https://github.com/Naninovel/Live2D/raw/master/NaninovelLive2D.unitypackage) をダウンロードします。

実装に使用される Live2D モデルプレハブには、ルートオブジェクトに紐付けられた `Live2DController` コンポーネントが必要です。外観の変更は、[SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) コマンドの外観がトリガー名であるため、アニメーターコンポーネントにルーティングされます。たとえば、Live2Dキャラクタープレハブ "Kaori" があり、"Surprise" という名前のトリガーを呼び出したい場合は、次のコマンドを使用します:

```nani
@char Kaori.Surprise
```

上記のコマンドは、プレハブに紐付けられたアニメーターコントローラーで "Surprise" 引数を指定して [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) を呼び出すのみです。基礎となる [animator](https://docs.unity3d.com/Manual/Animator) ステートマシンは自分で作成する必要があります。

::: warn
Cubism SDK for Unity 最新バージョンは `Animator` コンポーネントと直接連携しています。これまで Cubism 2.x で使われていた式とポーズは [非推奨](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression) となっており、Live2D用 Naninovel 拡張機能ではサポートしていません。
:::

Live2Dの `CubismLookController` および `CubismMouthController` コンポーネントが存在し、Live2Dモデルプレハブに設定されている場合、`Live2DController` で任意にキャラクターの視線の向きと口のアニメーション（口パク機能）を制御できます。

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)


設定方法の詳細は Live2D ドキュメントの [視線の追従](https://docs.live2d.com/cubism-sdk-tutorials/lookat) と [口パク](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) を参照してください。

`Live2DController` は Live2DモデルをUnityにインポートするときに自動的に作成されるLive2D モデルプレハブ内に、 "Drawables" ゲームオブジェクトがあると想定しています。コントローラは [@char] コマンドの "scale" パラメータに沿って、実行時にこのゲームオブジェクトをスケーリングします。したがって、エディターで設定したローカルスケールの値は無視されます。Live2D プレハブで初期スケールを設定するには、[この動画のように](https://youtu.be/rw_Z69z0pAg?t=353) 親ゲームオブジェクトのスケーリングを使用してください。

次のビデオガイドでは、 Cubism Editor からの Live2D キャラクターのエクポートプレハブの設定、簡単なアニメーターステートマシンの作成、naninovelスクリプトでのキャラクターの操作について解説しています。

[!!rw_Z69z0pAg]

::: example
[GitHubのサンプルプロジェクト](https://github.com/Naninovel/Live2D) で Naninovel で Live2D キャラクターを扱っているので、参考にしてください。Naninovel と Live2D SDK パッケージはプロジェクトと一緒に配布されていないため、初めて開く際にコンパイルエラーが発生します。アセットストアから Naninovel パッケージをインポートし、ウェブサイトから Live2D Cubism SDK をインポートして問題を解決してください。
:::
