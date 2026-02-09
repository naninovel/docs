# 選択肢

この機能により、プレイヤーにいくつかの選択肢を提示し、選択された選択肢に応じてスクリプトの実行を再ルーティングできます。

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

[@choice] コマンドに続けて選択肢の概要とオプションの `goto` パスを使用して、シナリオスクリプトから選択肢を追加します。

```nani
; テキストを表示し、すぐに選択肢を表示します。
このスクリプトの実行を続けますか、それとも別のスクリプトをロードしますか？[>]
@choice "次の行から続ける"
@choice "指定したラベルから続ける" goto:#Labelname
@choice "別のスクリプトを最初からロードする" goto:AnotherScript
@choice "別のスクリプトをラベルからロードする" goto:AnotherScript#LabelName
```

`goto` パラメータが指定されていない場合、現在のスクリプトは次の行から実行を続けます。

選択肢ハンドラーアクターは、[@choice] コマンドを処理するために使用されます。`Naninovel -> Resources -> Choice Handlers` コンテキストメニューからアクセスできる選択マネージャーを使用して、選択肢ハンドラーを追加、編集、削除できます。

選択肢ハンドラーの動作は、`Naninovel -> Configuration -> Choice Handlers` コンテキストメニューを使用して構成できます。利用可能なオプションについては、[構成ガイド](/ja/guide/configuration#選択肢ハンドラー) を参照してください。

選択肢ハンドラーの概要については、次のビデオチュートリアルを確認してください。

![](https://www.youtube.com/watch?v=cOREgtJak3A)

## ネストされたコールバック

選択肢を選択した結果が小さい場合（たとえば、数文を表示するだけの場合）、ラベルを指定して `goto` または `gosub` パラメータを使用するのは非実用的です。代わりに、選択肢が選択されたときに実行するコマンドを [ネスト](/ja/guide/scenario-scripting#ネスト) します。

```nani
@choice "色について尋ねる"
    Kohaku: 好きな色は何？
    Yuko: マゼンタ。
@choice "年齢について尋ねる"
    Kohaku: 何歳？
    @shake Yuko
    Yuko: なんで？
@choice "黙っている"
    Kohaku: ...
    気まずい沈黙が流れた。
```

任意のレベルのネストがサポートされています。

```nani
@choice "年齢について尋ねる"
    Kohaku: 何歳？
    @shake Yuko
    Yuko: なんで？
    @choice "主張する"
        Kohaku: 聞いただけだよ。秘密なの？
        Yuko.Angry: そうよ！
    @choice "あきらめる"
        Kohaku: 気にしないで、忘れて。
        @char Yuko.Relieved
@choice "黙っている"
    ...
```

::: info NOTE
ネストされた選択肢コールバックは、`goto`、`gosub`、`set`、および `play` パラメータと互換性がありません。これらをパラメータとして指定する代わりに、ネストされたブロック内で適切なコマンドを使用してください：`goto` パラメータの代わりに [@goto]、`set` パラメータの代わりに [@set] など。
:::

## 選択肢ボタン

[@choice] コマンドは、選択肢オプションオブジェクトを表すカスタムプレハブへのパス（"Resources" フォルダからの相対パス）を指定するオプションの `button` パラメータを受け入れます。

```nani
@choice handler:ButtonArea button:Home pos:-300,-300 goto:#HomeScene
```

— ここでは、配置をサポートする選択肢ハンドラーを使用して、即席のマップ上の関心ポイントを表しています。`button` パラメータは、画像の上にラップされたボタンで構成されるプレハブを指します。プレハブは `Assets/Resources/Naninovel/ChoiceButtons/Home.prefab` に保存されています。

テンプレートから選択肢ボタンプレハブを作成するには、`Create -> Naninovel -> Choice Button` アセットコンテキストメニューを使用します。

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

選択肢ボタンプレハブを `Resources` フォルダに保存したくない場合や、ローカライズする必要がある場合は、選択肢ハンドラー構成メニューでカスタムローダーを設定し、利用可能な [リソースプロバイダー](/ja/guide/resource-providers) のいずれかを使用してください。

![](https://i.gyazo.com/9b50d543b5a6843b13b415c3c2ae9641.png)

[@choice] コマンドの `button` パラメータが指定されていない場合、デフォルトのボタンプレハブが使用されます。

デフォルトで使用される選択肢ボタンを変更するには、[カスタム選択肢ハンドラー](/ja/guide/choices#カスタム選択肢ハンドラーの追加) を作成し、`Choice Handler Panel` コンポーネントの `Default Button Prefab` プロパティにプレハブを割り当てるか、カスタムコンポーネントを使用します。

![](https://i.gyazo.com/0972b2725ed043d050804d3833a83b73.png)

選択肢テキストに別のテキストコンポーネントを使用するには、選択肢ボタンコンポーネントの `On Summary Text Changed` [Unityイベント](https://docs.unity3d.com/Manual/UnityEvents) を使用します。

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## ロックされた選択肢

選択肢の一般的な使用例は、条件に基づいて1つのオプションをロック/無効にするか、プレイヤーが利用できないようにすることです。たとえば、選択の前に条件が満たされなかった場合、特定のストーリー分岐へのプレイヤーのアクセスを制限したい場合があります。

これは選択肢ボタンパラメータ（上記で概説）で実装可能ですが、使用例が一般的であるため、Naninovelには [@choice] コマンドの `lock` パラメータを使用してこれを機能させる専用の方法があります。

```nani
; 'score' 変数が10未満の場合、選択肢を無効/ロックします。
@choice "秘密のオプション" lock:score<10
```

組み込みの選択肢ボタンには、選択肢が追加されるたびに呼び出される `On Lock` イベントがあります。これにより、基になるボタンの `Interactible` プロパティが設定され、選択肢がロックされていない場合は対話可能になり、その逆も同様になります。`On Lock` イベントにカスタムハンドラーをアタッチするか、選択肢ボタンクラスの `HandleLockChanged` メソッドをオーバーライドすることで、動作をオーバーライドまたは拡張できます。

![](https://i.gyazo.com/ec5ef74ec9af1aa46a18d89bd34d866f.png)

## ButtonList選択肢ハンドラー

ボタンリストハンドラーはデフォルトで使用されます。選択肢ボタンを水平レイアウトパネル内に保存し、[@choice] コマンドの `pos` パラメータを無視します。

## ButtonArea選択肢ハンドラー

ボタンリストとは対照的に、ボタンエリアは特定のレイアウトを強制せず、`pos` パラメータを介して追加された選択肢ボタンの位置を手動で設定できます。たとえば、選択肢コマンドとボタンエリアハンドラーを使用してインタラクティブマップを作成する1つの方法は次のとおりです。

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:#HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:#ShopScene

# HomeScene
@back Home
Home, sweet home!
@goto #Map

# ShopScene
@back Shop
キュウリを忘れないで！
@goto #Map
```

::: tip EXAMPLE
[マップサンプル](/ja/guide/samples#マップ) で、Naninovelを使用したインタラクティブマップのより高度な実装を見つけてください。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## ChatReply選択肢ハンドラー

[チャットテキストプリンター](/ja/guide/text-printers#chatプリンター) によって返信の選択肢を表すために使用されます。例：

```nani
@printer Chat
Kohaku: 今どこにいるの？
@choice "とぼける" handler:ChatReply
    Yuko: ¯\_(ツ)_/¯
@choice "答える" handler:ChatReply
    Yuko: 学校。文化祭の準備中
```

## カスタム選択肢ハンドラーの追加

組み込みテンプレートに基づいてカスタム選択肢ハンドラーを追加したり、ゼロから新しいハンドラーを作成したりできます。たとえば、組み込みの `ButtonArea` テンプレートをカスタマイズしてみましょう。

`Create -> Naninovel -> Choice Handler -> ButtonArea` アセットコンテキストメニューを使用して、Naninovelパッケージの外部（例：`Assets/ChoiceHandlers` フォルダ）にボタンエリアハンドラープレハブを作成します。

ハンドラーを編集します：フォント、テクスチャの変更、アニメーションの追加など。利用可能なUI構築ツールの詳細については、[Unityドキュメント](https://docs.unity3d.com/Packages/com.unity.ugui@latest) を確認してください。

`Naninovel -> Resources -> Choice Handlers` エディタコンテキストメニューからアクセスできる選択肢ハンドラーマネージャーGUIを使用して、ハンドラーをエンジンリソースに公開します。`+`（プラス）ボタンを使用して新しいレコードを追加し、アクターID（プレハブ名とは異なる場合があります）を入力し、レコードをダブルクリックしてアクター設定を開きます。ハンドラープレハブを `Resource` フィールドにドラッグアンドドロップします。

これで、[@choice] コマンドの `handler` パラメータでIDを指定することで、新しい選択肢ハンドラーを使用できます。

```nani
@choice "選択肢の概要テキスト。" handler:MyNewHandler
```

::: tip EXAMPLE
[UIサンプル](/ja/guide/samples#ui) で、パーティクルシステムを使用してカスタム選択肢ハンドラーを作成する例を見つけてください。
:::

`IChoiceHandlerActor` インターフェイスを手動で実装して、ゼロから選択肢ハンドラーを作成することも可能です。詳細については、[カスタムアクターの実装](/ja/guide/custom-actor-implementations) に関するガイドを参照してください。
