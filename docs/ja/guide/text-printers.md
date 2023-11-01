# テキストプリンター

テキストプリンターはテキストメッセージを表示するためのアクターで、時間をかけて表示させることができます。

プリンターの動作はコンテキストメニューの `Naninovel -> Configuration -> Printers` で設定できます。利用可能なオプションについては、[コンフィグガイド](/ja/guide/configuration#printers) をご覧ください。プリンターのリソースマネージャーへは、コンテキストメニューの `Naninovel -> Resources -> Printers` からアクセスできます。

naninovelスクリプトでは、テキストプリンターは基本的に [@print] コマンドと [@printer] コマンドで制御します:

```nani
; `Dialogue` プリンターをデフォルトにする。
@printer Dialogue

; `Fullscreen` プリンターをデフォルトにする。
@printer Fullscreen

; デフォルトのプリンターで文章を表示。
@print text:"Lorem ipsum dolor sit amet."

; 上記を一般テキストで表示。
Lorem ipsum dolor sit amet.

; 上記を キャラクター "Felix" に紐付けて表示。
Felix: Lorem ipsum dolor sit amet.
```

組み込みプリンターはUIとして実装されていますが、それらはアクターです。すべてのアクター関連の可視の変更（アニメーションの表示/非表示）は、対応するコマンドまたはアクター構成で設定された時間が使われます。例えば [@showPrinter] コマンドの `time` パラメータは、アニメーションの表示時間を制御します。指定されていない場合、プリンタアクターコンフィグプロパティの `Change Visibility Duration` がデフォルトの時間になります。この場合、プリンターUIプレハブのルートにある `Fade Time` プロパティは無視されます。

## 自動読み進み機能

自動読み進み機能は、[`i`](/ja/api/#i) コマンドを操作するスクリプトを自動で実行します。

![](https://i.gyazo.com/e6f58f861fa18bd62591db9794e7641b.mp4)

"i" コマンドは、ユーザーが `Continue` 操作を入力をするまで実行が停止されます。これはよくテキストの表示後に使われます。自動読み進みモードでは、"i" コマンドは停止する代わりに一定時間スクリプトの実行を待って完了し、次のコマンドを実行します。待機時間は、直前に表示されたテキストメッセージの長さに依存し、ゲーム設定の "Print speed" にで変更できます。

自動読み進みモードは、 `AutoPlay` 入力（スタンドアロン入力モジュールのデフォルトでは` A`キー）またはコントロールパネルの "AUTO" ボタンを使用して切り替えることができます。

## スキップ機能

テキストスキップ機能により、[@print ]コマンドの実行を早送りして、テキストの表示プロセスを効果的にスキップできます。

![](https://i.gyazo.com/9605a5c8cd1911217350d77712f47e7d.mp4)

スキップモードは、`Skip` 入力（スタンドアロン入力モジュールのデフォルトでは `Ctrl` キー）またはコントロールパネルの "SKIP" ボタンをで切り替えることができます。

デフォルトでは、スキップモードは、過去にすでに実行されたコマンドの実行中にのみ適用されます。例えばユーザーが表示テキストをまだ読んでいない場合、スキップモードは使用できません。 これは、ゲーム設定の "Skip mode" で変更できます。

## テキストバックログ

プリンターバックログは、ユーザーが以前に表示したテキストを再表示できる機能です。

![](https://i.gyazo.com/4bde6752b676aa1acedb54d2af075ced.mp4)

バックログはメインゲームループ中にいつでも表示できます。`ShowBacklog` を入力（スタンドアロン入力モジュールではデフォルトで `L`キー）するか、コントロールパネルの "LOG" ボタンを押すと起動します。

## ダイアログプリンター

ダイアログプリンターは、ウィンドウ内のテキストを柔軟な高さで表示します。最初は画面サイズの約3分の1で、コンテンツにより多くのスペースが必要になると高さを増やします。 ダイアログプリンターは、テキストウィンドウの上のラベルに、関連するキャラクター名も表示します。

![Dialogue Printer](https://i.gyazo.com/73abe9eabc7b285109b08e77dbf75430.png)

## ワイドプリンター

ワイドプリンターは、ダイアログプリンターによく似ていますが、ワイドディスプレイ用に調整されたパネルレイアウトが一部変更されています。ワイドプリンターは、[キャラクターアバター](/ja/guide/characters#アバターテクスチャ) 機能もサポートしています。

![Wide Printer](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

## フルスクリーンプリンター

フルスクリーンプリンターは、ウィンドウ内のテキストを静的なサイズで表示します。画面サイズの大部分を占め、"NVL" モードとも呼ばれる大量のテキストを表示するためにインデントされています。

![Fullscreen Printer](https://i.gyazo.com/c7861949717f9b600b664365af53abbc.png)

フルスクリーンプリンターは、デフォルトでは後続の各プリントコマンドでテキストをリセットしません。代わりに、必要に応じて [@resetText] コマンドでプリンターの内容を消去します。プリンターアクターの設定メニューで `自動リセット` を有効にすることで変更できます。

フルスクリーンプリンターで処理される各プリントコマンドでは、デフォルトで、表示するテキストの前に改行を2行追加します（プリンターの現在のコンテンツが空の場合を除く）。 これは、プリンターアクター構成メニューで `Auto Line Break` をゼロに設定することで無効にできます。

![](https://i.gyazo.com/978c2eb05215aac2d62177cfb58bfbef.png)

以下は、フルスクリーンプリンターの使用例です。

```nani
; フルスクリーンプリンターを起動。
@printer Fullscreen

; 次の行は、改行2行で区切って同じウィンドウに表示されます。
Lorem ipsum dolor sit amet. Proin ultricies in leo id scelerisque.
Praesent vel orci luctus, tincidunt nisi et, fringilla arcu. In a metus orci.
Maecenas congue nunc quis lectus porttitor, eget commodo massa congue.

; プリンターの内容をクリア。
@resetText

; 更に行を表示。
Morbi ultrices dictum diam, in gravida neque vulputate in.
...
```

## チャットプリンター

チャットプリンターはウィンドウ内の吹き出し内にテキストを表示します。コンテンツは垂直方向にスクロール可能で、モバイルメッセージアプリに似ています。キャラクターごとにテキストを表示するのではなく、"タイプ中" アニメーションを一定時間かけてエフェクトで表示し、即座にメッセージを表示します。チャットプリンターは [キャラクターアバター](/ja/guide/characters#アバターテクスチャ) をサポートしています。

![Chat Printer](https://i.gyazo.com/3c04aecabe7f754ffc9ce5452eeba270.png)

## 吹き出しプリンター

吹き出しプリンターは、漫画/コミック風のテキスト表示に利用できます。

![](https://i.gyazo.com/900ee728505a0d7ce2eb597f3aa2249a.png)

組み込みの吹き出しプリンターは、"Left" と "Right" の2つの外観をサポートしています。これらは、キャラクター対してどちらの側に配置するか、プリンターの向きを揃えるために使用できます。

```nani
@printer Bubble.Left pos:42,80 visible:false time:0
@show Bubble wait:false
Misaki: Aliquam lobortis!
@char Nanikun.Happy wait:false
@printer Bubble.Right pos:53,55 visible:false time:0
@show Bubble wait:false
Nanikun: Integer nec maximus elit, eget posuere risus.
```

一度に複数の吹き出しプリンター(または他の)を表示するには、カスタムプリンターを追加します。

## カスタムプリンターの追加

組み込みのテンプレートからカスタムテキストプリンターを追加したり、新しいプリンターを新規に作成したりできます。たとえば、組み込みの `Dialogue` テンプレートをカスタマイズしてみましょう。

アセットコンテキストメニューの `Create -> Naninovel -> Text Printers -> Dialogue` から、ダイアログプレハブを、Naninovelパッケージの外に作ります。例えば `Assets/TextPrinters` フォルダーなど。

プレハブを編集: フォント、テクスチャの変更、アニメーションの追加など。利用可能なUIビルディングツールについては [uGUIのUnityドキュメント](https://docs.unity3d.com/Packages/com.unity.ugui@latest) をご覧ください。[UIカスタムガイド](/ja/guide/user-interface#カスタムUI) にチュートリアル動画と、uGUIの操作に関するサンプルプロジェクトもいくつかあります。

プリンタのマネージャGUIを使用して、プレハブをエンジンリソースに公開します。コンテキストメニューの `Naninovel -> Resources -> Printers` からアクセスできます。`+` (プラス)ボタンで新しいレコードを追加し、アクターID(プレハブ名により変わります)を入力し、レコードをダブルクリックしてアクター設定を開きます。プリンタープレハブを `Resource` フィールドにドラッグアンドドロップします。

![](https://i.gyazo.com/3f51881fa554720b7a4092dca42fd15e.mp4)

これで、[@printer] コマンドから新しいプリンターを起動できます。コマンドにはマネージャーで設定したアクターIDを指定します。

```nani
@printer MyNewPrinter
```

::: tip EXAMPLE
カスタムプリンターの追加は、[デモプロジェクト](/ja/guide/getting-started#デモプロジェクト) をご覧ください。プレハブは `Assets/Prefabs/PimpedPrinter.prefab` として保存されます。Kohakuちゃんが自分でプリンターを作成しようとすると、プリンターがデモに表示されます。
:::

また、`ITextPrinterActor` インターフェイスを手動で実装することにより、プリンターをスクラッチで作成することもできます。詳細については、[カスタムアクターの実装](/ja/guide/custom-actor-implementations) ガイドを参照してください。

テキストコンポーネントを変更するときは、1.0未満の高さのラインはサポートされないことに注意してください（この場合、レンダリングされたラインが重なり、表示エフェクトを適用できなくなります）。垂直方向のクリアを減らしたい場合は、テキストフォント自体を編集することを検討してください。

## テキスト表示エフェクト

デフォルトでは、テキストメッセージの表示時にグラデーションフェード効果が適用されます。ただし、より一般的な "タイプライター" スタイルを使用する場合は、`Slide Clip Rect` を無効にし、`Revealable Text` コンポーネントの `Reveal Fade Width` プロパティをゼロに設定することで、フェード効果を無効にできます。`Revealable Text` コンポーネントは一部の組み込みプリンターのテキストオブジェクトに適用されます。たとえば、`Fullscreen` プリンタープレハブの `Fullscreen/Content/Printer/Text` ゲームオブジェクトに紐付いていることがわかります。

![](https://i.gyazo.com/ab848f3c1c56921634b9d2b872e7c0cb.png)

## テキスト表示サウンド

組み込みプリンターの場合、表示エフェクト（現在は `Dialogue`、`Fullscreen`、`Wide`）をサポートしており、キャラクターが表示されたときにSFXを再生するようにオプションで設定できます。

上記の"カスタムプリンターの追加"ガイドに従って、組み込みのプリンターからカスタムプリンターを作成します。それからプレハブのルートオブジェクトに紐づいている `Revealable Text Printer Panel` コンポーネントを見つけ、文字が表示された時に再生するSFXを `Reveal Sfx` に設定します。利用可能なオプションの実際のリストは、`Naninovel -> Resources -> Audio` メニューで追加したオーディオリソースに基づいています。

`Chars SFX` リストプロパティを使用して、複数のSFXを特定の文字にマップすることもできます。次の図は設定を表しています。"Keystroke2" SFXはスペースで再生されます。"Explosion" は`D`、`d`、`F`、`1`、`4`、`9`、`*`の文字で再生されます。`%`の文字は何も再生しません。"Keystroke1" は他の全ての文字で再生されます。

![](https://i.gyazo.com/c51247254e262dca35267b3689460ad2.png)

またはキャラクターコンフィグメニューで `Message Sound` を設定して、キャラクター固有のサウンドを、話者であるキャラクターのテキストが表示されたときに、再生することができます（どのテキストプリンターがメッセージを印刷しているかに関係なく）。メッセージ話者の `Message Sound` とデフォルトプリンターの `Reveal SFX` の両方が割り当てられている場合、プリンターのデフォルトの `Reveal SFX` ではなく `Message Sound` が再生されます。`Chars SFX` を設定すると、話者の `Message Sound` が指定されているかどうかに関係なく、常に再生されます。

テキスト表示サウンドは非常に高頻度に再生され（メッセージ表示スピードによって異なります）、同じサウンドが再生されるとクリップされます。そのため、対応するオーディオクリップは非常に短くてシャープなものにしてください（最初に一時停止/無音がないこと）。

表示サウンドがうまくいかない場合（たとえば、サウンドが各文字表示で再生できるほど短くない）、`TextPrinterManager` [エンジンサービス](/ja/guide/engine-services) の `OnPrintTextStarted` と `OnPrintTextFinished` イベントで、表示に合わせて再生/停止させてみてください。[ビジュアルスクリプティング](/ja/guide/playmaker) ソリューションを利用したい方は、これらのイベントも PlayMaker に公開されます。

## TextMesh Pro

Naninovel は [TextMesh Pro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html) をサポートしています。TMPro UIテキストコンポーネントで実装された組み込みの `TMProFullscreen`、`TMProDialogue`、`TMProWide`、`TMProBubble` プリンターを通じています。

![](https://i.gyazo.com/bb143607ce79e5a28d89052c7f9fb07c.png)

TMProプリンターを使う前に、UnityプロジェクトにTextMesh Proがインストールされていることを確認してください。 TextMesh Proは、`Window -> Package Manager` メニューのパッケージマネージャーからインストールできます。

TMProプリンターを選択して、naninovelスクリプトで [@printer] コマンドを使用してすべての表示コマンドをルーティングすることができます:

```nani
; TMPro プリンターダイアログを起動
@printer TMProDialogue
; 起動したプリンターを使用してテキストを表示
Hello World!
```

カスタムTextMesh Proフォントアセットまたはマテリアルを作成するときは、フォントマテリアルに `Naninovel/RevealableTMProText` シェーダーを適用することを忘れないでください。そうしないと、テキスト表示エフェクトが機能しません。

![](https://i.gyazo.com/18e112ba90cad84f44f0b78db0db303a.png)

## テキストスタイル

テキスト内でリッチテキストタグまたは [@style] コマンドを使用して、さまざまなテキストスタイルを適用できます。

デフォルト(TMProではない)のテキストプリンターは [Unityのテキストレンダリングシステム](https://docs.unity3d.com/Manual/script-Text.html) をベースにしており、色、サイズ、太字、斜体などの基本的なテキストスタイルをサポートしています。詳細は [テキストタグガイド](https://docs.unity3d.com/Manual/StyledText.html) をご覧ください。


TextMesh Proプリンターは、幅広い追加テキストタグをサポートしています。詳細については、[公式ドキュメント](http://digitalnativestudios.com/textmeshpro/docs/rich-text/) を参照してください。

[ルビ](https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%93) (フリガナ、振り仮名) のサポートも、Naninovel's TextMesh Pro プリンターのカスタム `<ruby>` タグで提供しています。ルビを付けたい文字をルビタグで囲み、タグの中にルビを指定してください。例:

```nani
Lorem <ruby="VERY">ipsum</ruby> dolor sit amet.
```
— メッセージがランタイムで表示されると、"VERY" というルビが、"ipsum" という文字の真上に表示されます。

さらに、プリンタープレハブに紐づいている `RevealableTMProText` コンポーネントのプロパティを変更することで、ルビのサイズと垂直のオフセットを設定できます。

![](https://i.gyazo.com/7e1e927c144f30353baaab2ac7b643c7.png)

以下の動画はルビタグのデモです。

![](https://www.youtube.com/watch?v=aWdq7YxIxkE)
