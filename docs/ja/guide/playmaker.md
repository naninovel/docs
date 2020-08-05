# Playmaker

[PlayMaker](https://assetstore.unity.com/packages/tools/visual-scripting/playmaker-368) は、非プログラマー向けに設計された、人気のあるUnity用のビジュアルスクリプトツールです。

![](https://i.gyazo.com/0a5b219b059fd61c85d225e903d77857.png)

Naninovel のすべての C# API がデフォルトで使用できる Bolt とは対照的に、PlayMaker ではアクションごとに特別な C# クラスを作成する必要があります。つまり、PlayMakerを使用する場合、エンジンAPIの限られたサブセットしか使用できません。Naninovel の API が変更されたとき、使用可能なカスタムアクションも壊れる可能性があります。

## 設定

[公式マニュアル](https://hutonggames.fogbugz.com/default.asp?W11) の指示に従ってPlayMakerをインストールします。

[PlayMaker拡張パッケージ](https://github.com/Elringus/NaninovelPlayMaker/raw/master/NaninovelPlayMaker.unitypackage) をダウンロードしてインポートします。

PlayMakerアクションブラウザの "Naninovel" カテゴリに、カスタム Naninovel アクションが表示されます。

![](https://i.gyazo.com/a40b0b7b21c73d3b5f64b005085198ea.png)

## 使い方

次の動画は、PlayMaker FSM（有限状態マシン）を使用して Naninovel エンジンを初期化し、シナリオスクリプトをプリロードして再生する方法を紹介しています。

[!!N856vi18XVU]

### イベント

重要なNaninovelイベントのいくつかは、自動的に PlayMaker FSM にルーティングされます。そのためには、適切な名前でグローバル [ユーザーイベント](https://hutonggames.fogbugz.com/default.asp?W148) を作成し、FSM内で使用します。使用可能なイベント名は次のとおりです:

- `Naninovel/Engine/OnInitialized`
- `Naninovel/ScriptPlayer/OnPlay`
- `Naninovel/ScriptPlayer/OnStop`
- `Naninovel/StateManager/OnGameSaveStarted`
- `Naninovel/StateManager/OnGameSaveFinished`
- `Naninovel/StateManager/OnGameLoadStarted`
- `Naninovel/StateManager/OnGameLoadFinished`
- `Naninovel/TextPrinterManager/OnPrintTextStarted`
- `Naninovel/TextPrinterManager/OnPrintTextFinished`
- `Naninovel/LocalizationManager/OnLocaleChanged`

`@playmaker` コマンドを使用して、naninovelスクリプトからカスタムPlayMakerイベントをブロードキャストすることもできます:

```nani
@playmaker EventName
```

— シーン上のアクティブなすべてのFSMから、グローバルユーザーイベント "EventName" を呼び出します。

このコマンドでは、`fsm` および `object` パラメーターを使用して、特定のFSMにイベントを送信することもできます。最初のパラメーターは、イベントを受信するFSM名を指定します。例:

```nani
@playmaker EventName fsm:Fsm1,Fsm2
```

— 上記は "Fsm1" と "Fsm2" という名前のFSMから、 "EventName" という名前のイベントを呼び出します。

`object` パラメータが指定されている場合、イベントはFSMにのみ送信され、対応する名前を持つゲームオブジェクトに適用されます。例:

```nani
@playmaker EventName object:Obj1,Obj2
```

— "Obj1" と "Obj2" という名前のゲームオブジェクトに接続されているすべてのFSMから、イベント "EventName" を呼び出します

また `fsm` パラメータと `object` パラメータを組み合わせて、イベントを受け取るFSMをさらにフィルタリングすることもできます。

### グローバル変数

Naninovelスクリプトから PlayMaker のグローバル変数にアクセスできます。拡張パッケージのカスタム [関数式](/ja/guide/script-expressions.html#関数式) を使います:
 - `GetPlayMakerGlobalVariable("variableName")` — "variableName"という名前の単純型（int、float、stringなど）の変数を取得します
 - `GetPlayMakerGlobalArray("variableName", arrayIndex)` — "variableName"という名前の配列変数のインデックス "arrayIndex" に格納されている値を取得します

整数 "Score" と、bool配列のグローバルPlayMaker変数 "FinishedRoutes" がある場合、次のように Naninovel スクリプトで使用できます:
```nani
Felix: My score is {GetPlayMakerGlobalVariable("Score")}.

@if GetPlayMakerGlobalArray("FinishedRoutes",2)
    Third route (second array index) is completed.
@else
    Not yet.
@endif
```

## IDE Extension

`@playmaker` コマンドを [Atom IDE拡張機能](/ja/guide/naninovel-scripts.md#ide-サポート) に対応させるには、`%HOMEPATH%/.atom/packages/language-naniscript/server/metadata.json`(`%HOMEPATH%` は自身のOSユーザーディレクトリへのパス) にあるオープンメタデータファイルを開き、次のレコードを `commands` 配列に追加します:

```json
{
  "id": "BroadcastPlayMakerEvent",
  "alias": "playmaker",
  "localizable": false,
  "summary": "Broadcasts a PlayMaker event with the provided name.",
  "params": [
    {
      "id": "EventName",
      "nameless": true,
      "required": true,
      "dataType": {
        "kind": "literal",
        "contentType": "string"
      },
      "summary": "Name of the event to broadcast."
    },
    {
      "id": "FsmNames",
      "alias": "fsm",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of FSMs for which to broadcast the event."
    },
    {
      "id": "GameObjectNames",
      "alias": "object",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of game objects for which to broadcast the event."
    }
  ]
},
```

編集後、ファイルは次のように開始されます:

```json
{
  "commands": [
    {
      "id": "BroadcastPlayMakerEvent",
      "alias": "playmaker",
```

Atomエディターを再起動すると（実行している場合）、 `@playmaker` コマンドはエラーとしてハイライトされなくなります。
