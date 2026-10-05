# カスタムスクリプトコンパイラー

スクリプトのコンパイルは、ソースとなるシナリオテキスト（`.nani` ファイルに含まれる）を、ゲームフローの制御に使用されるデータ構造に変換するプロセスです。たとえば、コンパイラーは `@hide Kohaku` 行を、`ActorIds` パラメーターが `Kohaku` に設定された `HideActors` コマンドに変換します。

カスタム実装を提供することで、コンパイラーの動作を調整したり、完全に変更したりできます。他のカスタム実装と同様に、これは `IScriptCompiler` インターフェースを実装する新しいC#クラスを作成することによって行われます。

スクリプトコンパイラーは、`Script Compiler` プロパティを介してスクリプト構成メニューで選択できます。

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
構成でスクリプトコンパイラーを切り替えた後は、変更を有効にするためにスクリプトアセットを再インポートしてください（アセットを含むフォルダーを右クリックし、`Reimport` を選択します）。
:::

以下は、ソースとなるシナリオテキスト内で見つかった各 `...` の後にwaitコマンドを自動的に挿入するカスタムコンパイラーの例です。

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

このコンパイラーが選択されていると、ゲーム内に `...` が現れるたびに、スクリプトに明示的に記述されていなくても、1秒の遅延が自動的に追加されます。この単純な実装はデモンストレーションのみを目的としていることに注意してください。実際のプロジェクトでは、表示されるテキストにのみ影響するように汎用テキスト行のサブコンパイラーを変更したり、より正確にマッチさせるために正規表現を使用したりするのがよいでしょう。

上記の例では、`IScriptCompiler` をゼロから実装する代わりに、組み込みコンパイラーを継承してそのメソッドの1つをオーバーライドしています。コメント、ラベル、コマンド、および汎用テキスト行に使用されるサブコンパイラーをオーバーライドすることで、組み込みコンパイラーをさらに調整できます。たとえば、カスタムの汎用テキスト行サブコンパイラーを作成し、次のようにオーバーライドできます。

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
