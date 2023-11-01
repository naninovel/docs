# ボイス

ボイスクリップをエンジンに公開するには、`Resources/Naninovel/Voice` フォルダーに保存します（`Loader`フォルダーのオーディオ設定で変更できます）。サブフォルダで整理することもできます。この場合、naninovelスクリプトで参照する場合はスラッシュ (`/`) を使用します。たとえば、`Resources/Naninovel/Voice/Intro/Day/25.wav` として保存されたボイスクリップは、`Voice/Intro/Day/25` としてスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。例えばボイスクリップ "Hello.wav" を公開するには、次のアドレスにクリップアセットを割り当てます `Naninovel/Voice/Hello`。Addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

[Unityでサポートされている](https://docs.unity3d.com/Manual/AudioFiles.html) 任意のオーディオ形式をボイスクリップに使用できます。

ボイス再生動作はコンテキストメニューの `Naninovel -> Configuration -> Audio` で設定できます。利用可能なオプションは [コンフィグガイド](/ja/guide/configuration#audio) をご覧ください。

[@voice] コマンドの後にボイスクリップの名前を続けることで、naninovel スクリプトでボイスの再生を制御できます。

## 自動ボイス再生

フルボイスのゲームでは、毎回 [@voice] コマンドを指定するのは面倒かと思います。自動ボイス再生機能により、現在再生されている [@print] コマンドの行番号と同じ名前のボイスクリップを自動的に再生できます。これにより、naninovelスクリプトで [@voice] コマンドを使用する必要がなくなります。対応するテキスト行がゲームで表示されると、ボイスが自動的に再生されます。

自動ボイス再生機能を有効にするには、オーディオコンフィグメニューで `Enable Auto Voicing` トグルを使用します。

自動ボイス再生機能に使用されるオーディオクリップは、スクリプト名と同じ名前のフォルダーにグループ化する必要があり、次の名前を付けます:
 *LineNumber*.*CommandIndex*。ここで *LineNumber* は対応する表示コマンドの行番号です。 *CommandIndex* は、一般テキスト行で処理する場合の表示コマンドのインラインまたはコマンドインデックスです。

たとえば、"Script001" という名前の次のnaninovelスクリプトを考えてみます:

```nani
@print text:"Text from a print command."
Text from a simple generic text line.
Text from first sentence.[i] Text from second sentence.
```

行の表示時に自動ボイス再生システムで対応するオーディオクリップを再生するためには、`Resources/Naninovel/Voice/Script001` にクリップを保存します(または[Addressable システム](/ja/guide/resource-providers#addressable) で登録)。以下の名前をつけます:

テキスト | ボイスクリップ名
--- | ---
プリントコマンドのテキスト。 | 1.0
単純な一般テキスト行のテキスト。 | 2.0
最初の文のテキスト。 | 3.0
2番目の文のテキスト。 | 3.2

プロセスを簡略化できるよう、自動ボイス再生機能が有効になっている場合、現在表示中のテキストのボイスクリップの名前がデバッグウィンドウに表示されます:

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

デバッグウィンドウを開くには、エンジン設定で `Enable Development Console` がオンになっていることを確認してから、再生モードで `~` キーを押し、`debug` と入力して`Enter`を押します。

## ナレーションドキュメント

`Naninovel -> Tools -> Voiceover Documents` からナレーションドキュメントジェネレーターユーティリティを使用して、[@print] コマンドのテキストと一般テキスト行を含むドキュメントを生成できます。表示される各テキストメッセージは、自動ボイス再生機能で使用される自動ボイスクリップ名に関連付けられます。

![](https://i.gyazo.com/69466444d4b8b43d76e7f1566db5ca9a.png)

`Locale` プロパティで、ドキュメントを生成する特定のロケールを選択できます（選択したロケールは、ローカライズされたnaninovelスクリプトがプロジェクトに存在する必要があります）。

`Use Markdown Format` プロパティが有効だと、生成されるファイルは[マークダウンフォーマット](https://en.wikipedia.org/wiki/Markdown) (拡張子は )になり、より見やすいフォーマットになります。

![](https://i.gyazo.com/ed6776026a79140de9e9f6a155faffdc.png)

ナレーションドキュメントは、ナレーションオーディオを録音するときに声優が使用することを想定しています。
