# 開発コンソール

開発コンソールは、ゲーム内UIから静的 C# メソッドを実行するために使用します。

ゲームの実行中にコンソールUIを表示するには、エンジンコンフィグで開発コンソールが有効になっていることを確認し、`~`（チルダ）キーを押します。 デフォルトのキーを使えない場合（Mac OSのUnityエディターなど）、 `Toggle Console Key` プロパティで変更できます。

![Engine Configuration](https://i.gyazo.com/bc56a837c03d198e2d8141bdebc2e696.png)


C# メソッドをコンソールに公開するには、`ConsoleCommand` 属性を静的メソッドに追加します。属性にはオプションの文字列引数があり、ショートカットを設定できます:

```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

コンソールでメソッド名またはショートカット（適用されている場合）を入力し、Enterキーを押してメソッドを実行します。

![](https://i.gyazo.com/bd41a9a8fff91eb575b235a6b641dcce.mp4)

現在以下のコマンドが利用できます:

コマンド | 説明
--- | ---
nav | NaninovelスクリプトナビゲーターUIを切り替え。
debug | [naninovelスクリプトデバッグ](/ja/guide/naninovel-scripts#スクリプトデバッグ) ウィンドウを切り替え。
var | [カスタム変数エディター](/ja/guide/custom-variables#変数のデバッグ) ウィンドウを切り替え。
purge | [Google Drive プロバイダー](/ja/guide/resource-providers#google-drive)が使用されている場合、ダウンロードされたリソースキャッシュをパージ。
play | ロード中のnaninovelスクリプトの実行を開始。
stop | ロード中のnaninovelスクリプトの実行を停止。
rewind (int) | ロード中のnaninovelスクリプトを指定された行番号まで巻き戻し。行はコマンドまたは一般テキストのいずれかである必要があります。巻き戻し時には、行はロールバックスタックに存在する必要があります。
reload | ロード中のnaninovelスクリプトの[ホットリロード](/ja/guide/naninovel-scripts#ホットリロード) を実行。Unityエディターでのみ機能します。

## コマンドの実行

開発コンソールからスクリプトコマンドを呼び出すことができます。naninovelスクリプトと同じく、コマンド文字列を入力すると、すぐに実行されます。これはカスタムステート変数をデバッグするのに役立ちます。たとえば、次のコマンドでカスタム変数の現在の値を出力できます:

```nani
@print {VariableName}
```

— デフォルトプリンターに `VariableName` の値が表示されます。


![](https://www.youtube.com/watch?v=wcgTGro0_SE)
