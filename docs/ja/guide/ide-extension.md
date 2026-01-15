# VS Code 拡張機能

シンタックスハイライト、エラーチェック、自動補完、インタラクティブドキュメントなどのコードエディタ機能は、生産性を大幅に向上させることができます。Naninovelには [VS Code](https://code.visualstudio.com) 用の公式拡張機能があり、[シナリオスクリプト](/ja/guide/scenario-scripting) を操作するための豊富なオーサリングツールを提供しています。

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

## セットアップ

### VS Code拡張機能のインストール

1. `View -> Extensions` メニューからVS CodeのExtensions（拡張機能）ビューを開きます
2. "Naninovel" を検索し、"Install" をクリックします

![](https://i.gyazo.com/85999dd50f414c13de12b46e640bf531.png)

::: info NOTE
VS Codeレジストリの拡張機能は、現在のNaninovel安定版リリースと互換性があります。Naninovelのプレビューリリースを使用する場合は、プレリリース拡張機能ストリームに切り替えてください。Naninovelの最終リリースを使用する場合は、VS Codeの自動更新を無効にし、関連するレガシーバージョンをインストールしてください。
:::

### 拡張機能のアクティブ化

1. Unityプロジェクトに [Naninovelがインストールされている](/ja/guide/getting-started#naninovelのインストール) ことを確認してください。
2. VS CodeでUnityプロジェクトの `Assets` フォルダを開きます。

拡張機能が現在のワークスペースで `.nani` ファイルを検出すると、LSPサービスがアクティブになります。サービスは、スクリプト診断、自動補完、現在再生中のスクリプト行の表示などのタスクを処理します。

![?width=260](https://i.gyazo.com/5eae1dda34e4b36474333227de62d1ee.png)

### ワークスペースルート

Naninovelは、VS Code拡張機能との通信に必要なプロジェクトメタデータとブリッジングファイルを、生成されたデータディレクトリ（デフォルトでは `Assets/NaninovelData`）の下に生成します。つまり、VS CodeでNaninovelプロジェクトを開く（[ワークスペースルート](https://code.visualstudio.com/docs/editor/workspaces) を選択する）場合、生成されたデータディレクトリをあるレベルに含むフォルダを選択する必要があります。

ただし、一部のユーザーは、生成されたデータディレクトリを含まない、シナリオスクリプトを含むフォルダのみを開くことを好みます。そのような場合は、`NaninovelData` フォルダをシナリオスクリプトフォルダに移動して、VS Codeに表示されるようにします。

変更を有効にするには、フォルダを移動した後にVS Codeを再起動してください。

## VS Codeの設定

以下は、Unityの自動生成されたメタファイルを無視し、ワードラップとスペルチェックを有効にし（[スペルチェック拡張機能](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) がインストールされている場合）、単語ベースの提案を無効にするためのVS Codeの推奨設定です。

```json
{
    "files.exclude": {
        "**/*.meta": true
    },
    "editor.wordWrap": "on",
    "editor.wordBasedSuggestions": "off",
    "editor.occurrencesHighlight": "off",
    "editor.suggest.showWords": false,
    "editor.bracketPairColorization.enabled": false
}
```

`File -> Preferences -> Settings` から設定JSONファイルにアクセスし、ウィンドウの右上隅にある "Open Settings (JSON)" ボタンをクリックします。すべてのプロジェクトの設定を編集するには "User" タブを、シナリオスクリプトを含む現在のプロジェクトにのみ影響を与えるには "Workspace" を選択します。

上記の設定の一部はパッケージのインストール時にデフォルトで適用されますが、必要に応じてオーバーライドできます。シンタックスハイライトもカスタマイズしたい場合は、次を追加して色を微調整します。

```json
"editor.semanticTokenColorCustomizations": {
    "[*Dark*][*Night*][*Abyss*][*Monokai*]": {
        "enabled": true,
        "rules": {
            "CommentLine": "#5d6470",
            "CommentText": "#5d6470",
            "LabelLine": "#9bc37c",
            "LabelText": "#9bc37c",
            "CommandLine": "#6cb2ed",
            "InlinedCommand": "#6cb2ed",
            "Command": "#6cb2ed",
            "CommandIdentifier": "#6cb2ed",
            "Parameter": "#cd9769",
            "ParameterIdentifier": "#cd9769",
            "ParameterValue": "#e2be7f",
            "LocalizableValue": "#acb2be",
            "EndpointValue": "#9bc37c",
            "GenericTextLine": "#acb2be",
            "GenericTextPrefix": "#e2be7f",
            "GenericTextAuthor": "#e2be7f",
            "GenericTextAuthorAppearance": "#e2be7f",
            "Expression": "#62b8c1",
            "TextIdentifier": "#5d6470",
            "WaitFlag": "#6cb2ed",
            "Error": "#d14e4e"
        }
    },
    "[*Light*][*Day*][*Bright*]": {
        "enabled": true,
        "rules": {
            "CommentLine": "#acb5c6",
            "CommentText": "#acb5c6",
            "LabelLine": "#51a612",
            "LabelText": "#51a612",
            "CommandLine": "#257dc8",
            "InlinedCommand": "#257dc8",
            "Command": "#257dc8",
            "CommandIdentifier": "#257dc8",
            "Parameter": "#c642a5",
            "ParameterIdentifier": "#c642a5",
            "ParameterValue": "#9250bf",
            "LocalizableValue": "#4b5871",
            "EndpointValue": "#51a612",
            "GenericTextLine": "#4b5871",
            "GenericTextPrefix": "#9250bf",
            "GenericTextAuthor": "#9250bf",
            "GenericTextAuthorAppearance": "#9250bf",
            "Expression": "#3abfb3",
            "TextIdentifier": "#acb5c6",
            "WaitFlag": "#257dc8",
            "Error": "#be2222"
        }
    }
},
"editor.tokenColorCustomizations": {
    "[*Dark*][*Night*][*Abyss*][*Monokai*]": {
        "textMateRules": [
            { "scope": ["naniscript.comment"], "settings": { "foreground": "#5d6470" } },
            { "scope": ["naniscript.label"], "settings": { "foreground": "#9bc37c" } },
            { "scope": ["naniscript.command"], "settings": { "foreground": "#6cb2ed" } },
            { "scope": ["naniscript.command.parameter.id"], "settings": { "foreground": "#cd9769" } },
            { "scope": ["naniscript.command.parameter.value"], "settings": { "foreground": "#e2be7f" } },
            { "scope": ["naniscript.generic-text"], "settings": { "foreground": "#acb2be" } },
            { "scope": ["naniscript.author"], "settings": { "foreground": "#e2be7f" } },
            { "scope": ["naniscript.expression"], "settings": { "foreground": "#62b8c1" } },
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#5d6470" } }
        ]
    },
    "[*Light*][*Day*][*Bright*]": {
        "textMateRules": [
            { "scope": ["naniscript.comment"], "settings": { "foreground": "#acb5c6" } },
            { "scope": ["naniscript.label"], "settings": { "foreground": "#51a612" } },
            { "scope": ["naniscript.command"], "settings": { "foreground": "#257dc8" } },
            { "scope": ["naniscript.command.parameter.id"], "settings": { "foreground": "#c642a5" } },
            { "scope": ["naniscript.command.parameter.value"], "settings": { "foreground": "#9250bf" } },
            { "scope": ["naniscript.generic-text"], "settings": { "foreground": "#4b5871" } },
            { "scope": ["naniscript.author"], "settings": { "foreground": "#9250bf" } },
            { "scope": ["naniscript.expression"], "settings": { "foreground": "#3abfb3" } },
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#acb5c6" } }
        ]
    }
}
```

`semanticTokenColorCustomizations` の色はLSPコンテキスト（拡張機能がアクティブになった後のスクリプトコンテンツ）に適用され、`tokenColorCustomizations` はTextMateコンテキスト（ツールチップのスニペットや拡張機能がアクティブになる前のスクリプト）に適用されます。

::: tip
デフォルトで適用される完全な設定については、[パッケージソース](https://github.com/naninovel/engine/blob/main/vscode/package.json) の `configurationDefaults` を参照してください。
:::

## 折りたたみ

次の構成要素は、デフォルトで折りたたみサポートを取得します。

- ラベル（別のラベルまで）
- 連続するコメント行
- インデントされた（ネストされた）ブロック

次の構文でコメントを使用して、カスタム折りたたみ領域を指定することもできます。

1. `; > region name` で開く（"region name" は何でもかまいません）
2. `; < region name` で閉じる（"region name" は開くときの名前と同じです）

## プロジェクトメタデータ

Naninovelメタデータは、作成されたプロジェクトに関連付けられたさまざまな情報（利用可能なキャラクター、背景、リソース、コマンドなど）を含むJSONファイルです。この情報は、IDE拡張機能やWebエディタなどのオーサリングツールで使用され、自動補完や診断などの便利な機能を提供します。

メタデータファイルは、`NaninovelData` 自動生成フォルダの下の `.nani/Metadata.json` に保存されます。エンジン構成で `Auto Generate Metadata` が有効になっている場合、メタデータはドメインのリロード時やNaninovel構成またはリソースアセットの編集後に自動的に再生成されます。手動でメタデータを更新するには、`Naninovel -> Update Metadata` エディタメニューまたは `Ctrl + Shift + U` ホットキーを使用します。

::: tip
メタデータが同期していない場合は、エンジン構成で `Enable Bridging` がオンになっていることを確認し、エンジン構成メニューの上部に表示される `Generated Data Root` の値がIDE拡張機能によって報告されるデートルートと等しいことを確認してください。
:::

### メタデータプロバイダー

生成されたメタデータを追加のカスタム値で埋めたり、デフォルトをオーバーライドしたりするには、`IMetadataProvider` インターフェイスを実装するC#クラスを作成します。実装にはパラメータなしのコンストラクタが必要です。見つかった場合、プロジェクトメタデータが生成されるたびに、デフォルトのプロバイダーの代わりにカスタムプロバイダーが使用されます。

以下はデフォルトのメタデータプロバイダーです。独自の実装を行う際の参考にしてください。

```csharp
public class DefaultMetadataProvider : IMetadataProvider
{
    public Project GetMetadata ()
    {
        var meta = new Project();
        var cfg = ProjectConfigurationProvider.LoadOrDefault<ScriptsConfiguration>();
        meta.EntryScript = cfg.StartGameScript;
        meta.TitleScript = cfg.TitleScript;
        Notify("Processing commands...", 0);
        meta.Commands = MetadataGenerator.GenerateCommandsMetadata();
        Notify("Processing resources...", .25f);
        meta.Resources = MetadataGenerator.GenerateResourcesMetadata();
        Notify("Processing actors...", .50f);
        meta.Actors = MetadataGenerator.GenerateActorsMetadata();
        Notify("Processing variables...", .75f);
        meta.Variables = MetadataGenerator.GenerateVariablesMetadata();
        Notify("Processing functions...", .95f);
        meta.Functions = MetadataGenerator.GenerateFunctionsMetadata();
        Notify("Processing constants...", .99f);
        meta.Constants = MetadataGenerator.GenerateConstantsMetadata();
        meta.Syntax = Compiler.Syntax;
        return meta;
    }

    private static void Notify (string info, float progress)
    {
        if (EditorUtility.DisplayCancelableProgressBar("Generating Metadata", info, progress))
            throw new OperationCanceledException("Metadata generation cancelled by the user.");
    }
}
```

## IDE属性

Naninovelは、カスタムコマンドや式関数のIDE関連機能を有効にするためのいくつかの [C#属性](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes) を提供しています。たとえば、カスタムコマンドやパラメータにホバー時のドキュメントを追加するには、コマンドタイプとパラメータフィールドにそれぞれ `Doc` 属性を適用します。

```csharp
[Doc("Summary of the custom command.")]
public class CustomCommand : Command
{
    [Doc("Summary of the custom parameter.")]
    public StringParameter CustomParameter;
}
```

組み込みおよびカスタムの式関数と事前定義されたカスタム変数の両方でパラメータの自動補完をサポートするには、`ExpressionContext` 属性を使用します。

```csharp
[ExpressionContext]
public StringParameter Expression;
```

任意の [列挙型](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) の値で自動補完するには、`ConstantContext` 属性を使用します。

```csharp
[ConstantContext(typeof(PlatformID))]
public StringParameter Platform;
```

ナビゲーションエンドポイント（スクリプトパスとラベル）の使用状況と正確さを自動補完および分析するには、`EndpointContext` 属性を使用します。

```csharp
[EndpointContext]
public NamedStringParameter Goto;
```

リソースで自動補完するには、`ResourceContext` を使用し、リソースのパスプレフィックスを指定します。以下の例はオーディオリソースで補完します。

```csharp
[ResourceContext(AudioConfiguration.DefaultAudioPathPrefix)]
public StringParameter Audio;
```

アクターID（任意のタイプ）で自動補完するには、`ActorContext` 属性を使用します。

```csharp
[ActorContext]
public StringParameter ActorId;
```

特定のタイプのアクターIDで自動補完するには、最初の引数でアクターリソースのパスプレフィックスを指定して `ActorContext` を使用します。以下の例はプリンターIDで補完します。

```csharp
[ActorContext(TextPrintersConfiguration.DefaultPathPrefix)]
public StringParameter PrinterId;
```

現在のコマンドの同じまたは別のパラメータで指定されたIDを持つアクターのアピアランスを自動補完するには、`AppearanceContext` を使用します。これには、同じコマンドで `ActorContext` が指定されている必要があります。

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix)]
public StringParameter CharacterId;
[AppearanceContext]
public StringParameter CharacterAppearance;
```

上記の各属性では、オプションの `namedIndex` 引数を指定できます。名前付きパラメータと共に使用して、属性がパラメータ値のどの部分に適用されるかを指定します。以下の例では、名前付きパラメータの名前部分をキャラクターIDで、値部分を現在入力されているキャラクターのアピアランスで自動補完できるようにします（[@char] コマンドの名前なしパラメータと同様）。

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix, 0), AppearanceContext(1)]
public NamedStringParameter IdAndAppearance;
```

パラメータコンテキスト属性は、フィールドではなくクラスに適用して、親クラスで宣言されたフィールドのコンテキストを指定（またはオーバーライド）できます。たとえば、`Id` パラメータは抽象 `ModifyActor` コマンドで宣言されていますが、コンテキストは `ModifyBackground` 派生クラスに適用されます。

```csharp
[ActorContext(BackgroundsConfiguration.DefaultPathPrefix, paramId: "Id")]
public class ModifyBackground : ModifyActor { }
```

組み込みコマンドからカスタムコマンドを継承する場合も、同じアプローチを使用できます。パラメータコンテキスト属性をフィールドではなくクラスに適用する場合は、オプションの `paramId` 引数を忘れずに指定してください。

::: tip
式関数パラメータにも、同様のパラメータコンテキスト属性のほとんどを適用して、IDE拡張機能での自動補完と診断を有効にすることができます。[関数ガイド](/ja/guide/script-expressions#パラメータコンテキスト) の例を参照してください。
:::

## 定数式

`ConstantContext` IDE属性を使用する場合、列挙型の代わりに、コマンドパラメータ値やその他の変数（現在検査中のスクリプトなど）に基づいて定数名を生成するためにIDEによって評価される式を指定できます。

式の構文：

- 評価される部分は中括弧（`{}`）で囲む必要があります
- 現在検査中のスクリプトパスを参照するには、`$Script` を使用します
- パラメータ値を参照するには、`:` の後にパラメータID（エイリアスではなく、C#で指定されたフィールド名）を使用します
- パラメータ参照の後に `[0]` または `[1]` を使用して、名前付き値（名前は0、インデックスは1）を指定します
- パラメータ参照の後にnull合体演算子（`??`）を使用して、値が指定されていない場合のフォールバックを指定します
- 連結演算子（`+`）を使用して、複数の定数の値をマージします

たとえば、組み込みの `[@goto]` コマンドの `Path` パラメータに割り当てられた式を確認してください。

```csharp
[ConstantContext("Labels/{:Path[0]??$Script}", 1)]
public NamedStringParameter Path;
```

パラメータの名前コンポーネントに `foo` が割り当てられている場合、それは `Labels/foo` に評価されます。それ以外の場合、検査中のスクリプトパスが `bar` であるとすると、`Labels/bar` に評価されます。

`@char` コマンドに適用されるキャラクターポーズの別の例：

```csharp
[ConstantContext("Poses/Characters/{:Id??:IdAndAppearance[0]}+Poses/Characters/*", paramId: nameof(Pose))]
public class ModifyCharacter { ... }
```

これは、共有キャラクターポーズと、IDが "Id" パラメータに割り当てられている（または割り当てられていない場合は "IdAndAppearance" パラメータの名前コンポーネント）キャラクターのポーズをマージします。

定数式と [カスタムメタデータプロバイダー](/ja/guide/ide-extension#メタデータプロバイダー) を組み合わせることで、IDE拡張機能用の柔軟な自動補完シナリオを作成できます。

## その他のIDEとエディタ

[VSCodium](https://vscodium.com)、[Cursor](https://www.cursor.com)、[Trae](https://www.trae.ai/) などのVS Code互換エディタを使用している場合は、Open VSXレジストリから拡張機能をインストールしてください: [open-vsx.org/extension/elringus/naninovel](https://open-vsx.org/extension/elringus/naninovel)

他のエディタ用の拡張機能は保守していませんが、[LSP準拠](https://microsoft.github.io/language-server-protocol) の言語サーバーが [エンジンモノレポ](https://github.com/naninovel/engine/tree/main/core/packages/language) で利用可能です。サーバーはC#で実装されており、WASMにコンパイルでき、組み込みのJavaScriptバインディングを備えているため、最新のほとんどのIDEで使用できます。

VS Code拡張機能は、同じ言語サーバー上に構築されています。拡張機能のソースもモノレポで利用可能です。サーバーをお好みのIDEに統合する際の参考にしてください。リポジトリにアクセスするには、[ライセンスを登録](https://naninovel.com/register) してください。

あるいは、TextMate文法をサポートするエディタ（[Sublime](https://www.sublimetext.com) や [Visual Studio](https://visualstudio.microsoft.com) など）を使用している場合は、ここで提供しています: [textmate.json](https://github.com/naninovel/docs/blob/main/docs/.vitepress/ext/lang/textmate.json)。文法はシンタックスハイライトにのみ使用できることに注意してください。その他のIDE機能には、引き続き言語サーバーが必要です。
