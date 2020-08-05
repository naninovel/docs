# 選択肢

この機能は、ユーザーにいくつかの選択肢を提示し、ユーザーの選択に応じてスクリプトの実行を再ルーティングできます。

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

[@choice] コマンドに続けて選択肢の詳細を記述し、任意で選択肢に追加するnaninovelスクリプトの `goto` パスを記述します:

```nani
; テキストを表示し、すぐに選択肢を表示してスクリプトの実行を停止。
; このスクリプトの実行を続けるかそれとも、...？[skipInput]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:.Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript.LabelName
@stop
```

 `goto` パラメータの値は、ユーザーが対応する選択肢を選択したときに再ルーティングするパスです。次の形式で指定します:*ScriptName*.*LabelName* 。ラベル名を省略すると、指定したスクリプトが最初から再生されます。スクリプト名を省略すると、現在再生されているスクリプトのラベルを参照します:

```nani
; `Script001` というnaninovel スクリプトをロードし、最初から実行。
goto:Script001

; 上記に加えて、`AfterStorm` ラベルから実行を開始。
goto:Script001.AfterStorm

; 現在実行中のスクリプトの `Epilogue` ラベルへジャンプする。
goto:.Epilogue
```

`goto`パラメータが指定されていない場合、現在のスクリプトの次の行から実行を継続します。

 [@choice] コマンドを処理するために、選択肢ハンドラアクターが使用されます。 `Naninovel -> Resources -> Choice Handlers` コンテキストメニューから選択肢マネージャーを使用して、選択肢ハンドラーの追加、編集、削除ができます。

選択肢ハンドラーの挙動はコンテキストメニュー `Naninovel -> Configuration -> Choice Handlers` から設定できます。可能なオプションについては [コンフィグガイド](/ja/guide/configuration.md#choice-handlers) をご覧ください。

## 選択ボタン

[@choice] コマンドでは、 "Resources" フォルダーからの相対パスを指定した任意の `button` パラメーターを使用できます。これは選択肢オブジェクトを表すカスタムプレハブへのパスです。

```nani
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
```

— ここでは、配置をサポートする選択ハンドラーを使用して、即興マップ上の任意のポイントを表します。ここで `button` パラメーターは、画像で覆ったボタンで構成されるプレハブを指します。プレハブは  `Assets/Resources/MapButtons/Home.prefab` に保存されています。

テンプレートから選択ボタンプレハブを作成するには、コンテキストメニューで `Create -> Naninovel -> Choice Button` アセットを使用します。

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

必ず **"Resources" フォルダーにカスタム選択ボタンを保存** してください。そうしないとリクエストされた際に読み込めません。

[@choice] コマンドの `button` パラメーターが指定されていない場合、デフォルトのボタンプレハブが使用されます。

選択肢のテキストに別の種類のテキストコンポーネント(例えばTMProなど)を使用したい場合、選択ボタンコンポーネントの `On Summary Text Changed` [Unity イベント](https://docs.unity3d.com/Manual/UnityEvents) を使用してください。

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## ButtonList 選択肢ハンドラー
ボタンリストハンドラーはデフォルトで使用されます。水平レイアウトパネル内に選択ボタンを保存し、 [@choice] コマンドの `pos` パラメーターは無視します。

## ButtonArea 選択肢ハンドラー
ボタンリストとは異なり、ボタンエリアは特定のレイアウトを強制せず、追加された選択ボタンの位置を `pos` パラメーターで手動で設定できます。たとえば次の例は、選択コマンドとボタンエリアハンドラーでインタラクティブマップを作成する方法の1つです:

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:.ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto .Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto .Map
```

[!!cNRNgk5HhKQ]

## 選択肢ハンドラーの追加

組み込みテンプレートからカスタム選択肢ハンドラーを追加するか、新しいハンドラーを最初から作成できます。例として、組み込みの `ButtonArea` テンプレートをカスタマイズしてみましょう。

コンテキストメニューの `Create -> Naninovel -> Choice Handler -> ButtonArea` アセットを使用してボタンエリアハンドラーをNaninovelパッケージ以外の場所に作成します。例えば `Assets/ChoiceHandlers` などです。

ハンドラーを編集します: フォント、テクスチャの変更、アニメーションの追加など。利用可能なUI構築ツールの詳細については、[Unity ドキュメント](https://docs.unity3d.com/Packages/com.unity.ugui@latest)をご覧ください。

エディターのコンテキストメニューから `Naninovel -> Resources -> Choice Handlers` へアクセスし、選択ハンドラーマネージャーGUIを使用して、ハンドラーをエンジンリソースに公開します。  `+` （プラス）ボタンで新しいレコードを追加し、アクターID（プレハブ名とは異なる場合があります）を入力し、レコードをダブルクリックしてアクター設定を開きます。ハンドラープレハブを`Resource` フィールドにドラッグアンドドロップします。

[!cb3a0ff7f22b22cec6546acb388719fc]

これで [@choice] の `handler` パラメーターにIDを指定して、新しい選択肢ハンドラーを利用できます。

```nani
@choice "Choice summary text." handler:MyNewHandler
```

`IChoiceHandlerActor` インターフェイスを手動で実装することで、選択肢ハンドラを最初から作成することもできます。詳細は、[カスタムアクターの実装](/ja/guide/custom-actor-implementations.md) のガイドを参照してください。
