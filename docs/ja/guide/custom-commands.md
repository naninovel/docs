# カスタムコマンド

コマンドは、シーンで何が起こるかを制御する単一の操作を表します。たとえば、背景の変更、キャラクターの移動、別のシナリオスクリプトのロードなどです。[シナリオスクリプト](/ja/guide/scenario-scripting) で定義されたパラメータ化されたコマンドシーケンスは、ゲームフローを効果的に制御します。利用可能な組み込みコマンドは [APIリファレンス](/ja/api/) で確認できます。コードでは、すべての組み込みスクリプトコマンド実装は `Naninovel.Commands` 名前空間の下で定義されています。

## カスタムコマンドの追加

独自のカスタムスクリプトコマンドを追加するには、`Command` から派生した新しいC#クラスを作成し、`Execute` 抽象メソッドを実装します。作成されたクラスはエンジンによって自動的に取得され、クラス名またはエイリアス（割り当てられている場合）を使用してシナリオスクリプトからコマンドを呼び出すことができます。Naninovelコマンドにエイリアスを割り当てるには、クラスに `Alias` 属性を適用します。

以下は、シナリオスクリプトから `@HelloWorld` または `@hello` として呼び出してコンソールに「Hello World!」を出力できるカスタムコマンドの例です。オプションの `name` パラメータ（例：`@hello name:Felix`）を使用して、世界の代わりに指定された名前に挨拶することもできます。

```csharp
using System;
using Naninovel;
using Naninovel.Commands;
using UnityEngine;

[Serializable, Alias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        if (Assigned(Name)) Debug.Log($"Hello, {Name}!");
        else Debug.Log("Hello World!");
        return Async.Completed;
    }
}
```

::: info NOTE
クラスの名前変更、パラメータの追加または削除、タイプまたは属性の変更など、C#コマンドの実装を変更する場合は常に、シナリオスクリプトアセットを再インポートすることを忘れないでください（スクリプトが保存されているフォルダを右クリックして「Reimport」をクリックします）。これは、シナリオスクリプトがインポート時（実行時ではない）に解析およびコンパイルされ、C#実装と同期している必要があるためです。
:::

### Executeメソッド

`Execute` は、スクリプトプレイヤーによってコマンドが実行されたときに呼び出される非同期メソッドです。ここにコマンドロジックを保持します。[エンジンサービス](/ja/guide/engine-services) を使用して、エンジンの組み込みシステムにアクセスします。`Wait` パラメータが `true` に設定されている場合、このメソッドが完了したタスクを返すまで、シナリオスクリプトの実行は停止します。

### 実行コンテキスト

`Execute` メソッドに提供される `ExecutionContext ctx` 引数に注目してください。[非同期操作](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) を実行する場合は、各非同期操作の後にキャンセルおよび完了要求がないか `ctx.Token` 非同期トークンを確認し、それに応じて対応してください。

- `AsyncToken.Canceled` は、エンジンが破棄またはリセットされたことを意味します。どちらの場合も、エンジンAPIを使用することは安全ではなくなり、状態の変更は未定義の動作につながります。キャンセルされた場合、コマンド実装は直ちに `AsyncOperationCanceledException` をスローし、現在実行中のアクティビティを破棄することが期待されます。
- `AsyncToken.Completed` は、コマンドがすべてのアクティビティをできるだけ早く完了することが期待されていることを意味します。たとえば、アニメーションを実行している場合は、予想される期間に関係なく、即座に終了します。これは通常、プレイヤーが続行入力をアクティブにしたとき、またはセーブゲーム操作が開始されたときに発生します。

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    await PerformSomething();
    // 上記のメソッドの実行中にエンジンが破棄された可能性があります。
    // その場合、次のチェックで例外がスローされます。
    ctx.Token.ThrowIfCanceled();
    // チェック後はエンジンAPIを引き続き使用しても安全です。
    var someUI = Engine.GetService<IUIManager>().GetUI<SomeUI>();
    // 完了が要求された場合は、UIを即座にフェードします。
    var fadeDuration = ctx.Token.Completed ? 0 : 5;
    await someUI.ChangeVisibility(false, fadeDuration, ctx.Token);
    // 上記のメソッドは非同期トークンを受け入れます。そのようなメソッドは
    // 内部でキャンセルを処理するため、後でもう一度確認する必要はありません。
}
```

実行コンテキストのもう1つのメンバーは、コマンドを実行しているスクリプトトラックインスタンスであり、`ctx.Track` を介してアクセスできます。再生を制御する必要がある場合、またはトラックを必要とする他のエンジンAPIを呼び出す場合は常に、トラックインスタンスを使用してください。たとえば、次のように再生を停止します。

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    ctx.Track.Stop();
}
```

### パラメータタイプ

コマンドパラメータをシナリオスクリプトに公開するには、サポートされているタイプのいずれかを使用してパブリックフィールドをコマンドクラスに追加します。

| フィールドタイプ | 値タイプ | スクリプト例 |
|---------------------------|-----------------------|-------------------------------------|
| StringParameter | String | `LoremIpsum`, `"Lorem ipsum"` |
| LocalizableTextParameter | LocalizableText | `"Lorem ipsum\|#id\|"` |
| IntegerParameter | Int32 | `10`, `0`, `-1` |
| DecimalParameter | Single | `0.525`, `-55.1` |
| BooleanParameter | Boolean | `true`, `false` |
| NamedStringParameter | NamedString | `Script001.LabelName`, `.LabelName` |
| NamedIntegerParameter | NamedInteger | `Yuko.5` |
| NamedDecimalParameter | NamedFloat | `Kohaku.-10.25` |
| NamedBooleanParameter | NamedBoolean | `Misaki.false` |
| StringListParameter | List&lt;String&gt; | `Lorem,ipsum,"doler sit amet"` |
| IntegerListParameter | List&lt;Int32&gt; | `10,-1,0` |
| DecimalListParameter | List&lt;Single&gt; | `0.2,10.5,-88.99` |
| BooleanListParameter | List&lt;Boolean&gt; | `true,false,true` |
| NamedStringListParameter | List&lt;NamedString&gt; | `Felix.Happy,Jenna.Confidence` |
| NamedIntegerListParameter | List&lt;NamedInteger&gt; | `Yuko.5,Misaki.-8` |
| NamedDecimalListParameter | List&lt;NamedFloat&gt; | `Nanikun.88.99,Yuko.-5.1` |
| NamedBooleanListParameter | List&lt;NamedBoolean&gt; | `Misaki.false,Kohaku.true` |

### パラメータエイリアス

オプションで、`[Alias]` 属性をフィールドに適用してパラメータにエイリアス名を割り当てることができます。これにより、シナリオスクリプトでパラメータを参照するときにフィールド名の代わりに使用できます。パラメータを名前なしにする場合は、エイリアスとして `NamelessParameterAlias` 定数（空の文字列）を設定します。コマンドごとに1つの名前なしパラメータのみが許可されることに注意してください。

```csharp
[Alias(NamelessParameterAlias)]
public StringParameter MyNamelessParameter;
[Alias("myParam")]
public StringParameter MyParameter;
```

```nani
@cmd "value of the nameless param" myParam:"value of 'MyParameter' param"
```

### 必須パラメータ

パラメータを必須にする（シナリオスクリプトで指定されていない場合にエラーがログに記録されるようにする）には、`[RequiredParameter]` 属性をフィールドに適用します。属性が適用されていない場合、パラメータはオプションと見なされます。

```csharp
[RequiredParameter]
public StringParameter MyRequiredParameter;
```

### オプションパラメータ

パラメータが必須でない場合、シナリオスクリプトで値が割り当てられている場合と割り当てられていない場合があります。`HasValue` プロパティを使用して、そのケースかどうかをテストします。オプションで、パラメータインスタンスを受け取り、提供されたパラメータがnullではなく値が割り当てられている場合にtrueを返す `Assigned()` 静的メソッドを使用できます。

```csharp
public StringParameter MyOptionalParameter;
...
if (MyOptionalParameter.HasValue) { }
if (Assigned(MyOptionalParameter)) { }
```

### ローカライズ可能なコマンド

コマンドにローカライズ可能なパラメータ（ユーザーに直接提示されるテキスト）がある場合は、`Command.ILocalizable` インターフェイスを実装して、生成された [スクリプトのローカライズ](/ja/guide/localization#スクリプトのローカライズ) ドキュメントにコマンドを追加し、`LocalizableTextParameter` パラメータタイプを使用します。

```csharp
public class PrintText : Command, Command.ILocalizable
{
    public LocalizableTextParameter Text;
}
```

### プリロード可能なコマンド

コマンドの実行にリソースのロードが必要な場合は、`Command.IPreloadable` インターフェイスを実装して、ゲームのロード時に必要なリソースをプリロードします。詳細については、[メモリ管理](/ja/guide/memory-management) ガイドを参照してください。

```csharp
public class PlayAudioClip : Command, Command.IPreloadable
{
    public StringParameter ClipPath;

    public async Awaitable PreloadResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        await ... (load the audio clip here)
    }

    public void ReleasePreloadedResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        ... (unload the clip here)
    }
}
```

`ClipPath.DynamicValue` チェックに注意してください。コマンドの実行時にのみ名前がわかる場合（つまり、パラメータに [スクリプト式](/ja/guide/script-expressions) が含まれている場合）はリソースをプリロードできません。この場合、リソースは `Execute` メソッド内でロードする必要があります。

### コマンドの例

すべての組み込みコマンド実装を含むスクリプトは、`Naninovel/Runtime/Commands` パッケージフォルダにあります。独自のカスタムコマンドを実装する際の参考にしてください。

::: tip EXAMPLE
インベントリシステムのアイテムを追加/削除するためのカスタムコマンドを追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、コマンド実装は `Scripts/Runtime/Inventory/Commands` ディレクトリに保存されています。
:::

## 組み込みコマンドのオーバーライド

場合によっては、組み込みのNaninovelコマンドをオーバーライドすると便利なことがあります。たとえば、カスタムのものを追加せずに [@print] コマンドの動作を変更して、変更が [汎用テキストライン](/ja/guide/scenario-scripting#汎用テキストライン) にも影響するようにしたい場合があります（汎用ラインのテキストは内部的にprintコマンドに解析されます）。

組み込みコマンドをオーバーライドするには、カスタムのものを追加し、組み込みコマンドと同じエイリアスを適用します。変更を有効にするには、コマンドをオーバーライドした後にシナリオスクリプトを再インポートします（保存されているフォルダを右クリックし、「Reimport」をクリックします）。その後、シナリオスクリプトを再生するときに、組み込みのコマンドの代わりにカスタムコマンドが自動的に使用されます。

以下は、組み込みの [@print] コマンドをオーバーライドして、プレイヤーに表示される前に印刷されたテキストがコンソールにログ出力されるようにする例です。

```csharp
[Serializable, Alias("print")]
public class MyCustomPrintCommand : PrintText
{
    public override Awaitable Execute (ExecutionContext ctx)
    {
        Debug.Log(Text);
        return base.Execute(ctx);
    }
}
```

::: tip
コマンドとパラメータには、IDEおよびWebエディタでドキュメント、自動補完、高度な診断を提供するために、さまざまなコンテキスト属性が適用される場合があります。使用可能な属性については、[IDE拡張機能](/ja/guide/ide-extension#ide属性) ガイドを参照してください。
:::
