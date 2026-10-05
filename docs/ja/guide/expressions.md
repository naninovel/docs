# 式

シナリオスクリプトを記述するときに、中括弧 `{}` を使用して、コマンドパラメーターの値と汎用テキスト行に式を注入できます。

```nani
1足す2は{1 + 2}です。
```

— スクリプトを実行すると、「1足す2は3です。」と表示されます。

任意の数学演算子と論理演算子、および [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) 構造体の一部の数学関数を使用できます。

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```

— IDが「Kohaku」のキャラクターを、33.5の余弦（の3乗）を0.5の自然対数で割った余りにスケーリングします。

式はコマンドが実行される瞬間に評価されるため、式内で [シナリオ変数](/ja/guide/variables) を使用できます。

```nani
@input color summary:"好きな色は何ですか？"
{color}、ですか？ { color == "orange" ? "私もです！" : (color == "black" ? "それは憂鬱ですね。" : "なるほど...") }
```

— プレイヤーが好きな色を入力できる入力UIを表示して、入力された値を `color` シナリオ変数に代入します。その後、入力された色に続けて、それが「orange」の場合は「私もです！」、「black」の場合は「それは憂鬱ですね。」、それ以外の場合は「なるほど...」と表示します。

プレーンテキスト値と変数名を区別するには、値を二重引用符 `"` で囲みます。

```nani
これは単なるプレーンテキストです：{ "score" }。
そして、これは "score" 変数の値です：{ score }。
```

式の中に二重引用符を含めたい場合は、エスケープします。

```nani
{ \"車を止めろ\" } と言うのは間違いでした。
```

[@set] および [@if] コマンド（および他のコマンドの `set` および `if` パラメーター）で使用されるシナリオ式には、中括弧は必要ありません。

```nani
@set randomScore = random(-100, 100)
@goto #EpicLabel if: abs(randomScore) >= 50
```

汎用テキスト行内に中括弧を表示し、式区切り文字として認識されないようにするには、バックスラッシュで中括弧をエスケープします。例：

```nani
何らかのテキスト \{ 中括弧内のテキスト \}
```

— ゲーム内では「何らかのテキスト { 中括弧内のテキスト }」と表示されます。

## 演算子エイリアス

プログラミング用の演算子の代わりに、式内でエイリアスを使用できます。たとえば：

```nani
@if a = "foo" | b != "bar" ? x : y
```

— は、次のように書くこともできます：

```nani
@if a is "foo" or b is not "bar" then x else y
```

以下は、利用可能なエイリアスの対応表です：

| 演算子 | エイリアス     |
|--------|----------------|
| `=`    | `is`           |
| `!`    | `not`          |
| `!=`   | `is not`       |
| `&`    | `and`          |
| `\|`   | `or`           |
| `?`    | `then`         |
| `:`    | `else`         |
| `>`    | `is above`     |
| `<`    | `is below`     |
| `>=`   | `is at least`  |
| `<=`   | `is at most`   |

## 式クエリ

次のクエリは、シナリオ式内でも使用できます。

<div class="config-table">

| シグネチャ | 説明 | 例 |
| --- | --- | --- |
| random(min, max) | min（含む）とmax（含む）の間のランダムな整数を返します。 | `random(0, 100)` |
| random(min, max) | min（含む）とmax（含む）の間のランダムな小数を返します。 | `random(0.5, 1.5)` |
| random(args) | 指定された文字列の中からランダムに選択された文字列を返します。 | `random("foo", "bar", "baz")` |
| calculateProgress() | シナリオ完了率を0.0〜1.0の範囲で返します。1.0は、すべてのスクリプトコマンドが少なくとも1回実行されたことを意味します。 | `calculateProgress()` |
| isUnlocked(id) | 指定されたIDを持つアンロック可能アイテムが現在アンロックされているかどうかを確認します。 | `isUnlocked("Tips/MyTip")` |
| hasPlayed() | 現在再生中のコマンドが以前に再生されたことがあるかどうかを確認します。 | `hasPlayed()` |
| hasPlayed(scriptPath) | 指定されたパスのスクリプトが以前に再生されたことがあるかどうかを確認します。 | `hasPlayed("MyScript")` |
| getName(characterId) | 指定されたIDを持つキャラクターアクターの話者名を返します。 | `getName("Kohaku")` |
| pow(num, pow) | numをpow乗した値を返します。 | `pow(2, 3)` |
| sqrt(num) | numの平方根を返します。 | `sqrt(2)` |
| cos(num) | num（ラジアン単位の角度）の余弦を返します。 | `cos(3.14)` |
| sin(num) | num（ラジアン単位の角度）の正弦を返します。 | `sin(1.57)` |
| log(num) | 指定された数値の自然対数（底e）を返します。 | `log(0.5)` |
| abs(num) | numの絶対値を返します。 | `abs(0.5)` |
| max(nums) | 2つ以上の値のうち最大のものを返します。 | `max(1, 10, -9)` |
| min(nums) | 2つ以上の値のうち最小のものを返します。 | `min(1, 10, -9)` |
| round(num) | numを最も近い整数に丸めた値を返します。 | `round(0.9)` |
| approx(a, b) | 2つの浮動小数点値を比較し、ほぼ等しい場合はtrueを返します。 | `approx(0.15, 0.15)` |
| approx(a, b) | 大文字と小文字を区別せずに2つの文字列を比較します。 | `approx("abc", "ABC")` |

</div>

## カスタムクエリの追加

`ExpressionQuery` 属性を使用してパブリック静的C#メソッドに注釈を付けることで、カスタム式クエリを追加できます。メソッドには互換性のあるシグネチャが必要であり、条件を満たすとシナリオ式で自動的に使用可能になります。

引数および戻り値の型としてサポートされているのは、[単純](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) 型と文字列型のみです。単一の可変長（`params` キーワード）引数を使用することもできます。可変長引数を他の引数と混在させることはサポートされていません。

```csharp
public static class CustomQueries
{
    [ExpressionQuery("toLower")]
    [Doc("Returns the provided string with all characters converted to lower-case.")]
    public static string ToLower (string content) => content.ToLower();

    [ExpressionQuery("add")]
    [Doc("Returns the sum of the provided numbers.", examples: "add(1, 2)")]
    public static int Add (int a, int b) => a + b;

    [ExpressionQuery("mod")]
    [Doc("Returns the remainder resulting from dividing the provided numbers.")]
    public static double Modulus (double a, double b) => a % b;

    [ExpressionQuery("pick")]
    [Doc("Returns a string randomly chosen from one of the provided strings.")]
    public static string Pick (params string[] args)
    {
        if (args == null || args.Length == 0)
            return default;

        var randomIndex = UnityEngine.Random.Range(0, args.Length);
        return args[randomIndex];
    }
}
```

`ExpressionQuery` 属性はオプションのエイリアスを受け取り、クエリのドキュメントは `Doc` 属性で指定します。

- **Alias** デフォルトでは、メソッド名がクエリ識別子（スクリプトでクエリを参照する方法）として使用されます。識別子を変更するには、エイリアスを割り当てます。
- **Summary** IDE拡張機能とストーリーエディターに表示されるドキュメント。
- **Remarks** IDE拡張機能とストーリーエディターに表示される追加情報（オプション）。
- **Examples** IDE拡張機能とストーリーエディターに表示される使用例（オプション）。

::: tip EXAMPLE
インベントリにアイテムが存在するかどうかを確認するためのカスタム式クエリを追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタムクエリは `Scripts/Runtime/Inventory/InventoryQueries.cs` ランタイムスクリプトを介して実装されています。
:::

## パラメーターコンテキスト

コマンドパラメーターと同様に、クエリパラメーターにコンテキスト属性を適用して、[IDE拡張機能](/ja/guide/ide-extension) による自動補完と診断の対象にできます。

たとえば、クエリパラメーターを列挙型に関連付けることができます。

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomQueries
{
    [ExpressionQuery]
    public static bool IsComplete ([EnumContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(name, out var quest);
        // 'quest' が完了しているかどうかを確認するカスタムロジックを実行します
        return false;
    }
}
```

— IDEは、`name` パラメーターに提供された値が有効であることを確認し、補完を提供します。

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

アクター、リソース、エンドポイントなどの他のコンテキストも使用できます。たとえば、以下はアクターIDを受け取り、その表示名を返す組み込みの `getName()` クエリです。`ActorContext` が適用されると、プロジェクトで使用可能なアクターIDで補完されます。

```cs
[ExpressionQuery("getName")]
public static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

別の例として、以下はアンロック可能アイテムのIDを補完します。

```cs
[ExpressionQuery("isUnlocked")]
public static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

その他の例と利用可能なコンテキストについては、[IDEガイド](/ja/guide/ide-extension#ide属性) を参照してください。
