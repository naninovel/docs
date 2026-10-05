# 管理テキスト

管理テキスト機能を使用すると、ゲーム内のUI文字列やキャラクターの表示名など、Naninovel全体で使用されるさまざまなテキスト要素を、ローカライズ可能なドキュメントを介して管理（置換）できます。

管理テキストドキュメントを生成するには、`Naninovel -> Tools -> Managed Text` エディターメニューからアクセスできる管理テキストツールを使用します。

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

「Select」ボタンを使用して、管理テキストドキュメントを保存するパス（デフォルトでは `Resources/Naninovel/Text`）を選択し、「Generate Managed Text Documents」を押してドキュメントを作成します。

`Create -> Naninovel -> Managed Text` アセットコンテキストメニューを使用して、カスタム管理テキストドキュメントを作成することもできます。

管理テキストドキュメントの各行は、次の形式のエントリです：*パス*: *値*。ここで、*パス* はテキスト変数へのパスであり、*値* はその変数の値です。たとえば、以下は組み込みUIのレコードを含む「DefaultUI」ドキュメントのデフォルトの内容です。

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

値を編集でき、変更は次回の実行時に適用されます。

ドキュメントがすでに存在する場合、ツールは現在の値を保持しますが、`ManagedTextProvider` コンポーネントやソースコードの `ManagedText` 属性（詳細は以下を参照）から参照されなくなったレコードなど、生成されなくなったレコードは削除します。

::: tip
管理テキスト値に改行を挿入するには、TMProテキストが標準でサポートしている `<br>` タグを使用します。
:::

## 管理テキストプロバイダー

`ManagedTextProvider` コンポーネントを使用すると、スクリプトを使用せずに任意のUnityゲームオブジェクトを管理テキストレコードにバインドできます。コンポーネントをゲームオブジェクトに追加し、`Document`（ドキュメント名）と `Key`（ドキュメント内のレコード名）を指定し、`OnValueChanged` イベントを使用して値をゲームオブジェクトのプロパティにバインドします。

以下は、「MyCustomDocument」ドキュメントにキー「MyCustomText」で保存された管理テキストレコードをUnityの `Text` コンポーネントにバインドする例です。

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

カスタムUI、テキストプリンター、または選択肢ハンドラーで `ManagedTextProvider` コンポーネントが使用されている場合、管理テキストツールを使用すると、対応するレコードが自動的に生成されます（リソースが構成メニューで割り当てられている場合）。その他の場合は、ツールが生成するドキュメントから手動で追加したレコードは削除されるため、別のドキュメントに手動でレコードを追加する必要があります。

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## 管理テキスト変数

管理テキストレコードをソースコード内の変数にバインドすることも可能です。これを行うには、`ManagedText` 属性を静的文字列フィールドに追加します。フィールドの値は、エンジンの初期化時に管理テキストドキュメントで指定された値で上書きされます。

以下は、管理テキスト変数を使用してC#スクリプト内のテキストラベルをローカライズする例です。

```csharp
using Naninovel;
using UnityEngine.UI;

// UnityのTextコンポーネントを継承して、そのまま使用できるようにします。
public class CustomLabel : Text
{
    // "CustomLabel.LabelText" 管理テキストレコードの値は、エンジンの初期化時に
    // 以下の変数に代入され、ロケールの変更時に更新されます。
    [ManagedText("foo")] // "foo" はレコードのドキュメント名です。
    public static string LabelText = "bar"; // "bar" はデフォルト値です。

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // 現在のレコード値をラベルに割り当てます。

        var l10n = Engine.GetService<ILocalizationManager>();
        // ユーザーが実行時にロケールを変更したときにラベルを更新します。
        l10n.OnLocaleChanged += _ => text = LabelText;
    }
}
```

## スクリプトテキスト

シナリオスクリプトから直接管理テキスト値を参照できます。これは、シナリオ式でローカライズ可能なテキストを使用したい場合に役立ちます。

`Script` という名前の管理テキストドキュメントを作成し、レコードを追加します。`Script` 管理テキストドキュメントに次のレコードがあるとします。

```
Greeting1: Hey!
Greeting2: Hello!
Greeting3: Hi!
```

— 次のように値を参照できます。

```nani
@print { random(Greeting1, Greeting2, Greeting3) }
```

`Script` 管理テキストドキュメントは、他のドキュメントと同じ方法でローカライズできます。ユーザーが別のロケールを選択すると、テキストは対応するローカライズされたドキュメントから自動的に参照されます。

## ローカライズ

管理テキストのローカライズは、シナリオスクリプトと同様のワークフローに従います。

1. `Resources/Naninovel/Text` フォルダーに必要な管理テキストドキュメントを生成（作成/編集）します。
2. ロケールフォルダー（`Resources/Naninovel/Localization/{Locale}`、ここで `{Locale}` はターゲットロケールタグ）でローカライズユーティリティを実行します。
3. ソースとなる管理テキストドキュメントのローカライズドキュメントが、対応するロケールフォルダーに作成されます。それらを使用して翻訳を追加または編集します。

管理テキストドキュメントとそれに対応するローカライズ版を更新するには、まず `Resources/Naninovel/Text` フォルダーで管理テキスト生成ユーティリティを実行し、次に `Resources/Naninovel/Localization/{Locale}` でローカライズユーティリティを実行します。どちらのユーティリティもデフォルトで既存の変更（管理テキストレコードとその翻訳）を保持しようとするため、更新ごとにすべてを書き直す必要はありません。

ローカライズユーティリティの使用方法の詳細については、[ローカライズ](/ja/guide/localization) を参照してください。

::: tip EXAMPLE
[ローカライズサンプル](/ja/guide/samples#ローカライズ) に、ローカライズ設定の例（管理テキストを含む）があります。自分のプロジェクトでのローカライズの設定に問題がある場合は、参考にしてください。
:::

## カスタムドキュメント

独自のニーズに合わせて任意の数の管理テキストドキュメントを作成し、エンジンが初期化された状態であればC#から使用できます。これらのカスタムドキュメントは、上記で説明した組み込みのドキュメントと同じように機能します。C#とシナリオスクリプトの両方からアクセスしたり、`ManagedTextProvider` コンポーネントを介してレコードを取得したり、ローカライズドキュメントを自動生成したりできます。

`Create -> Naninovel -> Managed Text` アセットコンテキストメニューを使用して、`Resources/Naninovel/Text` フォルダーの下に新しいカスタム管理テキストドキュメントを作成します（または、任意のリソースプロバイダーを介して公開します）。その後、C#で `ITextManager` エンジンサービスを介してドキュメントにアクセスできるようになります。以下は、内容が `Foo: Bar` である `Custom` という名前のカスタムドキュメントのレコードにアクセスする例です。

```cs
var manager = Engine.GetService<ITextManager>();
// ドキュメントはアクセスする前にロードする必要があります。
// 通常、カスタムシステムの初期化中に一度行われます。
await manager.DocumentLoader.Load("Custom");
var document = manager.GetDocument("Custom");
var record = document.Get("Foo");
Debug.Log($"Key: {record.Key} Value: {record.Value}");
```
