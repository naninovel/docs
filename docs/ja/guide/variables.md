# 変数

シナリオ変数を使用すると、ユーザー定義の値を作成・変更し、それらを使ってシナリオスクリプトやその他のシステムの条件付き実行を制御できます。たとえば、プレイヤーの選択に基づいて再生するシナリオスクリプト（シナリオルート）を切り替えるために変数を使用できます。もう1つの一般的な用途は、ゲーム中の選択に応じてプレイヤーのステータス（スコア、所持金、リソースなど）を追跡することです。

::: info NOTE
変数名は文字で始める必要があり、文字、数字、アンダースコアのみを含めることができます。例：`score`、`Char1Score`、`my_score`。名前は大文字と小文字を区別しません。つまり、`myscore` という名前の変数を作成したあとで `MyScore` として参照することも、その逆も可能です。
:::

変数は [@set] コマンド（および一部の他のコマンドのパラメータ）で作成・変更でき、[@if] や [@while] のプライマリパラメータなど、式コンテキストを持つ任意のパラメータで使用できます。たとえば、次のスクリプトは `score` の値に基づいて実行先を切り替えます。

```nani
; 'score' 変数を作成します。
@set score=0

; ある時点で、プレイヤーの選択に基づいて変数を変更します。
@choice "Good Decision" set:score++
@choice "Bad Decision" set:score--
...

; 後で、条件付き実行に変数を使用します。
@if score is above 10
    @goto GoodEnd
@else
    @goto BadEnd
```
— 変数のさまざまな使用例は [@set] コマンドのリファレンスで確認できます。

::: tip
`score is above 10` 式では `>` 演算子の代わりに `is above` エイリアスを使用しています。演算子のほうが好みであれば、`@if score > 10` と書くこともできます。サポートされている構文について詳しくは、[シナリオ式ガイド](/ja/guide/expressions#演算子エイリアス) を参照してください。
:::

## 変数の注入

コマンドパラメータが式コンテキストでなくても、中括弧を使用して変数を注入できます。

```nani
; 3つの変数を代入します。
@set posX=0, posY=0.5, time=1.5

; それらを 'char' コマンドのパラメータへ注入します。
@char Kohaku pos:{posX},{posY} time:{time}
```

通常のテキスト行内でも同じことができます。

```nani
; プレイヤーにテキスト入力を促し、`name` 変数に代入します。
@input name summary:"Choose your name."

; 代入された `name` 変数を注入します。
Archibald: Greetings, {name}!
```

::: tip
キャラクター名を動的にするには、[表示名](/ja/guide/characters#表示名) 機能を使用してください。
:::

パラメータの型が許可する限り、任意のパラメータ値に変数を注入できます。たとえば、数値パラメータに文字列（テキスト）を代入することはできません。

```nani
@set yPos=0.1, tint="lightblue"

; `tint` は数値ではないため、以下はエラーになります。
@char Kohaku pos:50,{tint}

; ...こちらは正常に実行されます。
@char Kohaku pos:50,{yPos} tint:{tint}
```

## メタ変数

デフォルトでは、シナリオ変数は現在のゲームセッションにローカルです。プレイ中に変数へ値を代入したあとで、プレイヤーが新しいゲームを開始したり、その変数が代入されていない別のセーブスロットをロードしたりすると、その値は失われます。この動作はほとんどの種類の変数に適しています。変数をゲームセッションから「切り離したい」場合は、[@set] コマンドで初期化するときに `meta!` フラグを使用します。

```nani
@set myMetaVariable=0 meta!
```

メタ変数は、ルートクリア状況、累計ゲーム統計、実績など、個別のゲームセッションより上位の「メタ」情報を追跡するのに便利です。

```nani
; 'X' と 'Y' ルートのクリア状況を追跡する変数を定義します。
@set completeRouteX, completeRouteY to:false meta!
...

; スクリプトの後半で 'X' ルートをクリアしたとき。
@set completeRouteX=true

; これでタイトルスクリプトで特別なものを表示できます。
@if completeRouteX and completeRouteY
    @showUI TrueRouteTitle
@else
    @showUI DefaultTitle
```

::: tip
一度だけ増加するメタカウンターが必要な場合（ロールバックやゲーム再起動後の再プレイでも再度増加しないようにする場合）は、`hasPlayed()` [式クエリ](/ja/guide/expressions#式関数) を使用してください。
```nani
@set metaCounter=0 meta!
...
@set metaCounter++ unless:hasPlayed()
```
:::

## 変数スコープ

変数名の前にスコープ名とドットを付けることで、シナリオ変数をスコープの下にまとめることができます。

```nani
@set stats.strength=1
@set stats.agility=3

@if stats.agility is above stats.strength
    ...
```

スコープ付き変数は、`route.complete`、`stats.complete`、`quest.complete` のように、複数のシステムが同じ短い名前の変数を必要とする場合に便利です。

[@set](/ja/api/#set) コマンドで複数の変数を代入するときは、`scope` パラメータを使用して各変数に同じスコープを適用できます。

```nani
@set strength, intellect, agility to:0 scope:stats
@set stats.agility++
```

## ローカル変数

ドットで始まる変数名は、それが使用されているシナリオスクリプトファイルにローカルです。

```nani
@set .count=0
@while .count is below 10
    @set .count++
    Current count: {.count}
```

各シナリオスクリプトは独自のローカルスコープを持つため、あるスクリプトの `.count` が別のスクリプトの `.count` と競合することはありません。ローカル変数は、スクリプト内部のカウンター、一時的なルート状態、プロジェクト全体の名前を必要としない補助値に使用します。

## デフォルト代入

デフォルト代入は、変数にまだ値がない場合にのみシナリオ変数へ値を代入します。変数に初期値を保証したいが、すでに設定されている場合は上書きしたくないときに便利です。

デフォルト代入を行うには、`?=` 演算子を使用するか、[@set] コマンドで `init!` フラグを追加します。

```nani
; 'foo' をデフォルト値 0 で初期化します。
@set foo?=0
; 3つの変数をデフォルト値で初期化します。
@set foo=0, bar=false, baz="" init!
```

`meta!` または `const!` フラグを使用すると、自動的にデフォルト代入の意味になるため、それらと一緒に `?=` 演算子を指定する必要はありません。

```nani
; ルートクリア状況を追跡する両方の変数に 'false' を宣言して代入します。
; 同じスクリプトが再度再生された場合（たとえば次回のゲーム開始時）でも、
; 変数は再代入されません。
@set clearedRouteX, clearedRouteY to:false meta!
```

## 変数イベント

[カスタムUI](/ja/guide/gui#uiのカスタマイズ) やその他のシステムを構築するとき、変数の値が変わったタイミングで反応したい場合があります。たとえば、キャラクターのステータス画面を作成する場合、変数に応じてテキストを更新したいことがあります。通常は C# スクリプトを使いますが、`Variable Events` コンポーネントを使用することもできます。このコンポーネントは、指定された名前の変数が変更されたときに Unity イベントを呼び出します。

![](https://i.gyazo.com/a8ad226b7a50110584551ae81179c709.png)

::: tip EXAMPLE
[マップサンプル](/ja/guide/samples#マップ) では、変数トリガーでマップロケーションの可用性を制御する例を確認できます。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 変数のデバッグ

ゲームの実行中に、デバッグ目的ですべての既存の変数を表示・変更できます。

`~` キーで開発コンソールを開き、`var` コマンドを入力して変数エディターウィンドウを開きます。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

リスト内の変数の値を変更すると「SET」ボタンが表示されます。それを押すと変更が適用されます。

ゲーム実行中にシナリオ変数が変更されると、変数リストは自動的に更新されます。

## C#でのシナリオ変数の使用

シナリオ変数は、`IVariableManager` [エンジンサービス](/ja/guide/engine-services) を介して C# からアクセスできます。

新しい変数を作成するには、`AddVariable` メソッドを使用します。

```csharp
var vars = Engine.GetService<IVariableManager>();
// 'Hello World!' の値を持つ 'myVar' 文字列変数を作成します。
vars.AddVariable(new("myVar", new("Hello World!")));
```

メタ変数または定数変数を作成するには、種類を指定します。

```csharp
// ルートクリア状況を追跡する boolean 型のメタ変数を作成します。
vars.AddVariable(new("clearedRouteX", new(false), VariableKind.Meta));
```

変数値を取得・設定するには、それぞれ `GetValue` と `SetValue` メソッドを使用します。たとえば、`myVar` という名前のシナリオ文字列変数が存在する場合、以下のコードはその値を取得し、それに "Hello!" を追加して、変更した値を設定し直します。

```csharp
var value = vars.GetValue("myVar").String;
value += "Hello!";
vars.SetValue("myVar", new(value));
```

変数の実際の値を取得するときに `.String` プロパティを使用していることに注意してください。変数は `String`、`Numeric`、`Boolean` の3つの型のいずれかになります。型は、シナリオスクリプトで変数が最初に代入されたときに決定されます。

```nani
; 'foo' 変数に 'Hello World!' 文字列値を代入します
@set foo="Hello World!"
; 式で文字列値を使用します
@if foo is "Hello World!"

; 'bar' 変数に数値 42 を代入します
@set bar=42
; 式で数値を使用します
@if bar is above 12

; 'baz' 変数に boolean 値 true を代入します
@set baz=true
; 式で boolean 値を使用します
@if baz
```

または C# では次のようになります。

```csharp
var vars = Engine.GetService<IVariableManager>();

// 'foo' 変数に 'Hello World!' 文字列値を代入します
vars.SetValue("foo", new("Hello World!"));
// 代入された文字列値にアクセスします
if (vars.GetValue("foo").String == "Hello World!")

// 'bar' 変数に数値 42 を代入します
vars.SetValue("bar", new(42));
// 代入された数値にアクセスします
if (vars.GetValue("bar").Number > 12)

// 'baz' 変数に boolean 値 true を代入します
vars.SetValue("baz", new(true));
// 代入された boolean 値にアクセスします
if (vars.GetValue("baz").Boolean)
```

C# でシナリオ変数の型を確認するには、値の `.Type` プロパティを使用します。

```csharp
var value = vars.GetValue("bar");
if (value.Type == VariableValueType.Numeric)
    if (value.Number > 12) // これで '.Number' 値に安全にアクセスできます
```

あるいは、`Try...` オーバーロードの1つを使用します。

```csharp
vars.TryGetValue<float>("MyFloatVarName", out var floatValue);
Debug.Log($"My float variable value: {floatValue}");

vars.TryGetValue<int>("MyIntVarName", out var intValue);
Debug.Log($"My integer variable value: {intValue}");

vars.TryGetValue<bool>("MyBoolVarName", out var boolValue);
Debug.Log($"My boolean variable value: {boolValue}");

floatValue += 10.5f;
vars.TrySetValue("MyFloatVarName", floatValue);

intValue = -55;
vars.TrySetValue("MyIntVarName", intValue);

boolValue = !boolValue;
vars.TrySetValue("MyBoolVarName", boolValue);
```

すでに存在する変数に対して `AddVariable` を呼び出したり、存在しない変数に対して `SetValue` を呼び出したりすると例外がスローされます。毎回 `VariableExists` を確認したくない場合は、`UpsertValue` ヘルパーメソッドを使用してください。変数が存在しない場合は自動的に作成し、存在する場合は値だけを更新します。

```csharp
// 'foo' が存在する場合は 42 を設定します。
// 存在しない場合は、デフォルト値 42 の 'foo' を作成します。
vars.UpsertValue("foo", new(42));
```
