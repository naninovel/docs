# カスタムスクリプトコンパイラ

スクリプトのコンパイルは、ソースシナリオテキスト（`.nani` ファイルに含まれる）を、ゲームフローの制御に使用されるデータ構造に変換するプロセスです。たとえば、コンパイラは `@hide Kohaku` 行を、`ActorId` パラメータが `Kohaku` に設定された `HideActor` コマンドに変換します。

カスタム実装を提供することで、コンパイラの動作を調整したり、完全に変更したりできます。他のカスタム実装と同様に、これは `IScriptCompiler` インターフェイスを実装する新しいC#クラスを作成することによって行われます。

スクリプトコンパイラは、`Script Compiler` プロパティを介してスクリプト構成メニューで選択できます。

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
構成でスクリプトコンパイラを切り替えた後、変更を有効にするためにスクリプトアセットを再インポートします（アセットを含むフォルダーを右クリックし、`Reimport` を選択します）。
:::

以下は、ソースシナリオテキストで見つかった各 `...` の後にwaitコマンドを自動的に挿入するカスタムコンパイラの例です。

```cs
public class CustomCompiler : ScriptCompiler
{
    public override Script CompileScript (string path, string text,
        CompileOptions options = default)
    {
        text = text.Replace("...", "...[wait 1]");
        return base.CompileScript(path, text, options);
    }
}
```

このコンパイラが選択され、ゲームに `...` が表示されると、スクリプトに明示的に記述されていなくても、1秒の遅延が自動的に追加されます。この単純な実装はデモンストレーションのみを目的としていることに注意してください。実際のプロジェクトでは、これが印刷されたテキストにのみ影響するように汎用行サブコンパイラを変更したり、より正確なマッチングのために正規表現を使用したりすることをお勧めします。

ゼロから `IScriptCompiler` を実装する代わりに、上記の例は組み込みコンパイラから継承し、そのメソッドの1つをオーバーライドします。コメント、ラベル、コマンド、および汎用テキスト行に使用されるサブコンパイラをオーバーライドすることで、組み込みコンパイラをさらに調整できます。たとえば、カスタム汎用行サブコンパイラを作成し、次のようにオーバーライドできます。

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
