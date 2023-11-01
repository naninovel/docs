# カスタムコマンド

コマンドは、シーンで起きることを制御する単一の操作を表します。たとえば、背景の変更、キャラクターの移動、別のnaninovelスクリプトの読み込みに使用できます。[Naninovel スクリプト](/ja/guide/naninovel-scripts) で定義されたパラメーター化されたコマンドシーケンスは、ゲームフローを効果的に制御します。使用可能な組み込みコマンドは [APIリファレンス](/ja/api/) に記載されています。コードでは、すべての組み込みスクリプトコマンドの実装は、`Naninovel.Commands` ネームスペース以下に定義されています。

独自のカスタムスクリプトコマンドを追加するには、`Command` から派生した新しい C# クラスを作成し、抽象メソッド `ExecuteAsync` を実装します。作成されたクラスはエンジンによって自動的に取得され、クラス名またはエイリアス（割り当てられている場合）によってnaninovelスクリプトからコマンドを呼び出すことができます。 naninovelコマンドにエイリアスを割り当てるには、クラスに `CommandAlias` 属性を適用します。

`ExecuteAsync` はコマンドがスクリプトプレイヤーで実行される時に呼び出される非同期メソッドで、そこにコマンドロジックを配置します。エンジンの組み込みシステムへアクセスするには [エンジンサービス](/ja/guide/engine-services) を使用してください。Naninovelスクリプトの実行は、`Wait` パラメータが `true` の場合に、メソッドが完了したタスクを返すまで停止します。

コマンドパラメータをnaninovelスクリプトに公開するには、サポートされているいずれかのタイプを使用して、コマンドクラスにパブリックフィールドを追加します:

フィールドタイプ | 値のタイプ | スクリプト例
--- | --- | ---
StringParameter | String | `LoremIpsum`, `"Lorem ipsum"`
IntegerParameter | Int32 | `10`, `0`, `-1`
DecimalParameter | Single | `0.525`, `-55.1`
BooleanParameter | Boolean | `true`, `false`
NamedStringParameter | NamedString |  `Script001.LabelName`, `.LabelName`
NamedIntegerParameter | NamedInteger | `Yuko.5`
NamedDecimalParameter | NamedFloat | `Kohaku.-10.25`
NamedBooleanParameter | NamedBoolean | `Misaki.false`
StringListParameter | List&lt;String> | `Lorem,ipsum,"doler sit amet"`
IntegerListParameter | List&lt;Int32> | `10,-1,0`
DecimalListParameter | List&lt;Single> | `0.2,10.5,-88.99`
BooleanListParameter | List&lt;Boolean> | `true,false,true`
NamedStringListParameter | List&lt;NamedString> | `Felix.Happy,Jenna.Confidence`
NamedIntegerListParameter | List&lt;NamedInteger> | `Yuko.5,Misaki.-8`
NamedDecimalListParameter | List&lt;NamedFloat> | `Nanikun.88.99,Yuko.-5.1`
NamedBooleanListParameter | List&lt;NamedBoolean> | `Misaki.false,Kohaku.true`

任意でフィールドに `[ParameterAlias]` 属性を適用して、パラメーターにエイリアス名を割り当て、naninovelスクリプトでパラメーターを参照するときにフィールド名の代わりに使用することができます。 パラメータを無名にしたい場合は、エイリアスとして `Command.NamelessParameterAlias` 定数（空の文字列）を設定します。コマンドごとに設定できる無名パラメーターは1つだけです。

パラメーターを必須にするには（naninovelスクリプトで指定されていないときにエラーがログに記録されるようにするため）、フィールドに `[RequiredParameter]` 属性を適用します。属性が適用されていない場合、パラメーターはオプションと見なされます。

すべてのパラメータータイプには `HasValue` プロパティがあり、これを使用して、naninovelスクリプトでパラメーターが割り当てられているかどうかをテストできます。任意で `Command.Assigned()` 静的メソッドを使用できます。これはパラメーターインスタンスを取得し、指定されたパラメーターが null ではなく、値が割り当てられている場合に true を返します。

コマンドの実行にリソースのロードが必要な場合は、`Command.IPreloadable` インターフェースを実装して、ゲームのロード時に必要なリソースを事前ロードします。

コマンドにローカライズが必要なパラメーターがある場合（ユーザーに直接表示されるテキスト）、  `Command.ILocalizable` インターフェイスを実装して、生成されたスクリプトローカリゼーションドキュメントにコマンドを追加します。

すべての組み込みコマンド実装を含むスクリプトは、`Naninovel/Runtime/Commands` パッケージフォルダーにあります。独自のカスタムコマンドを実装するときは、参考にしてください。

以下はカスタムコマンドの例です。naninovelスクリプトから `@HelloWorld` または `@hello` で呼び出し、`Hello World!` をコンソールに出力できます。また、worldの代わりにオプションの `name` パラメータ（例: `@hello name:Felix`）を受け取って挨拶することもできます。

```csharp
using Naninovel;
using Naninovel.Commands;
using UniRx.Async;
using UnityEngine;

[CommandAlias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        if (Assigned(Name))
        {
            Debug.Log($"Hello, {Name}!");
        }
        else
        {
            Debug.Log("Hello World!");
        }

        return UniTask.CompletedTask;
    }
}
```

オプションの `AsyncToken` 引数に注意してください。非同期メソッドを呼び出す場合は、キャンセルリクエストのトークンを確認して、できるだけ早く返してください。

::: tip EXAMPLE
別の例として、インベントリシステムにアイテムを追加/削除するカスタムコマンドは [GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) で見ることができます。

具体的には、コマンドの実装は [Runtime/Commands](https://github.com/Naninovel/Inventory/tree/master/Assets/NaninovelInventory/Runtime/Commands) ディレクトリに保存されています。
:::
