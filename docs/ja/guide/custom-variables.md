# カスタム変数

カスタム変数機能を使用すると、ユーザー指定の変数を作成、変更し、それらを使用してシナリオスクリプトやその他のシステムの条件付き実行を促進できます。たとえば、カスタム変数を使用して、プレイヤーが行った決定に基づいて再生する複数のシナリオスクリプト（シナリオルート）の1つを選択できます。もう1つの一般的な用途は、ゲーム全体で行われた選択に基づいてプレイヤーの統計（スコア、お金、リソースなど）を追跡することです。

::: info NOTE
変数名は文字で始める必要があり、ラテン文字、数字、アンダースコアのみを含めることができます（例：`name`、`Char1Score`、`my_score`）。名前は大文字と小文字を区別しません（例：`myscore` は `MyScore` と同じです）。
:::

カスタム変数は、[@set] および [@if] コマンドを使用してシナリオスクリプトで作成、変更、および使用できるほか、`ICustomVariableManager` [エンジンサービス](/ja/guide/engine-services) を使用してC#でも作成、変更、および使用できます。

たとえば、次のスクリプトコマンドは、プレイヤーの選択に基づいて `score` カスタム変数に異なる値を割り当てます。

```nani
@choice "謙虚に、1つで十分です..." set:score=1
@choice "2つください。" set:score=2
@choice "在庫全部いただきます！" set:score=999
```

そして、次は `score` の値に基づいてスクリプトの実行を再ルーティングします。

```nani
@goto MainRoute if:"score > 1 && score <= 900"
@goto BadEnd if:score>900
```

すべてのカスタム変数はゲームとともに自動的に保存されます。デフォルトでは、変数はローカルスコープに保存されます。つまり、ゲームプレイ中に変数を割り当て、プレイヤーが新しいゲームを開始するか、その変数が割り当てられていない別のセーブスロットをロードすると、値は失われます。この動作は、ほとんどの変数タイプに役立ちます。変数をグローバルスコープに保存したい場合は、名前の前に `G_` または `g_` を付けます（例：`G_FinishedMainRoute` または `g_total_score`）。グローバル変数は、プレイヤーがルートを終了した回数やプレイスルー全体の合計スコアなどのメタ情報または累積情報を示すことができます。

「Custom Variables」構成メニューで、初期値を使用して事前定義されたカスタム変数（グローバルとローカルの両方）を設定できます。

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

グローバル事前定義変数は最初のアプリケーション起動時に初期化され、ローカル変数は各状態リセット時に初期化されます。メニューの値フィールドには、生の値文字列ではなく、有効なスクリプト式が必要であることに注意してください。

::: tip
（ロールバックやゲームの再起動などで）再プレイしても一度だけインクリメントされるグローバルカウンターが必要な場合は、`HasPlayed()` [式関数](/ja/guide/script-expressions#式関数) を使用します。
```nani
@set g_GlobalCounter++ if:!HasPlayed()
```
:::

## 変数の注入

中括弧を使用して、シナリオスクリプトのパラメータ値にカスタム変数を注入（インライン化）できます。

次のスクリプトは、ユーザーが任意のテキストを入力できる入力フィールドUIを示しています。送信時に、入力されたテキストは指定されたカスタム変数に割り当てられます。

```nani
; ユーザーに任意のテキストを入力させ、`name` 変数に割り当てます。
@input name summary:"あなたの名前を選んでください。"

; その後、割り当てられた `name` 変数をシナリオスクリプトに注入できます。
Archibald: ごきげんよう、{name}！

; ...または、setおよび条件式内で使用します。
@set score+=3 if:name="Felix"
```

::: tip
キャラクター名を動的にするには、[表示名](/ja/guide/characters#表示名) 機能を使用します。
:::

型が許可する限り、任意のパラメータ値にカスタム変数を注入できます。たとえば、文字列（テキスト）を数値パラメータに割り当てることはできません。

```nani
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; 以下は、`PlayerTint` が数値ではないため、エラーが発生します。
@char {PlayerName} pos:50,{PlayerTint}

; ...そして、これは正常に実行されます。
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## デフォルト割り当て

デフォルト割り当ては、変数にまだ値がない場合にのみカスタム変数に値を割り当てます。これは、変数に初期値があることを確認したいが、すでに設定されている場合は上書きしたくない場合に便利です。

デフォルト割り当てを実行するには、[@set] コマンドで `?=` 演算子を使用します。

```nani
; 'name' 変数を宣言し、初期値を割り当てます。
@set name?="Alex"
; 変数はすでに設定されているため、ここでは再割り当てされません。
@set name?="John"
```

これは、エディタ構成メニューを使用する代わりに、エントリまたは初期化スクリプトでグローバル変数を宣言する場合に特に便利です。

```nani
; ルート完了を追跡する両方の変数を宣言し、'false' を割り当てます。
; 同じスクリプトが再度再生された場合（例：その後のゲーム開始時）、
; 変数は再割り当てされません。
@set g_ClearedRouteX?=false
@set g_ClearedRouteY?=false
```

## 変数イベント

[カスタムUI](/ja/guide/gui#uiのカスタマイズ) やその他のシステムを構築する場合、変数の値が変更されたときにイベントに反応したい場合があります。たとえば、キャラクターの統計画面を作成する場合、変数でテキストを更新したい場合があります。従来のアプローチではC#スクリプトを使用しますが、`Variable Events` コンポーネントを使用することもできます。このコンポーネントは、指定された名前の変数が変更されたときにUnityイベントを呼び出します。

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

::: tip EXAMPLE
[マップサンプル](/ja/guide/samples#マップ) で、変数トリガーを使用してマップロケーションの可用性を促進する例を見つけてください。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 変数のデバッグ

ゲームの実行中に、デバッグ目的ですべての既存の変数を表示および変更できます。

`~` キーで開発コンソールを開き、`var` コマンドを入力して変数エディタウィンドウを開きます。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

リスト内の変数の値を変更すると、「SET」ボタンが表示されます。それを押して変更を適用します。

ゲームの実行中にカスタム変数が変更されると、変数リストは自動的に更新されます。

## C#でのカスタム変数の使用

カスタム変数は、`ICustomVariableManager` [エンジンサービス](/ja/guide/engine-services) を介してC#でアクセスできます。

変数値を取得および設定するには、それぞれ `GetVariableValue` および `SetVariableValue` メソッドを使用します。たとえば、`MyVarName` という名前のカスタム文字列変数が存在する場合、以下のコードはその値を取得し、それに「Hello!」を追加して、変更された値を設定し直します。

```csharp
var vars = Engine.GetService<ICustomVariableManager>();
var value = vars.GetVariableValue("MyVarName").String;
value += "Hello!";
vars.SetVariableValue("MyVarName", new(value));
```

変数の実際の値を取得するときに `.String` プロパティを使用することに注意してください。変数は、`String`、`Numeric`、または `Boolean` の3つのタイプのいずれかになります。タイプは、シナリオスクリプトで変数が最初に割り当てられたときに決定されます。

```nani
; 'foo' 変数に 'Hello World!' 文字列値を割り当てます
@set foo="Hello World!"
; 式で文字列値を使用します
@if foo="Hello World!"

; 'bar' 変数に数値42を割り当てます
@set bar=42
; 式で数値を使用します
@if bar>12

; 'baz' 変数にブール値trueを割り当てます
@set baz=true
; 式でブール値を使用します
@if baz
```

—またはC#で：

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

// 'foo' 変数に 'Hello World!' 文字列値を割り当てます
vars.SetVariableValue("foo", new("Hello World!"));
// 割り当てられた文字列値にアクセスします
if (vars.GetVariableValue("foo").String == "Hello World!")

// 'bar' 変数に数値42を割り当てます
vars.SetVariableValue("bar", new(42));
// 割り当てられた数値にアクセスします
if (vars.GetVariableValue("bar").Number > 12)

// 'baz' 変数にブール値trueを割り当てます
vars.SetVariableValue("baz", new(true));
// 割り当てられたブール値にアクセスします
if (vars.GetVariableValue("baz").Boolean)
```

C#で変数のタイプを確認するには、値の `.Type` プロパティを使用します。

```csharp
var value = vars.GetVariableValue("bar");
if (value.Type == CustomVariableValueType.Numeric)
    if (value.Number > 12) // これで '.Number' 値に安全にアクセスできます
```

あるいは、`Try...` オーバーロードの1つを使用します。

```csharp
var vars = Engine.GetService<ICustomVariableManager>();

vars.TryGetVariableValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"My float variable value: {floatValue}");

vars.TryGetVariableValue<int>("MyIntVarName", out var intValue);
Debug.Log($"My integer variable value: {intValue}");

vars.TryGetVariableValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"My boolean variable value: {boolValue}");

floatValue += 10.5f;
vars.TrySetVariableValue("MyFloatVarName", floatValue);

intValue = -55;
vars.TrySetVariableValue("MyIntVarName", intValue);

boolValue = !boolValue;
vars.TrySetVariableValue("MyBoolVarName", boolValue);
```
