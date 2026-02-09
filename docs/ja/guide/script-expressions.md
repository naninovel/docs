# スクリプト表記

シナリオスクリプトを記述するときに、中括弧 `{}` を使用して、コマンドパラメータ値と汎用テキスト行に式構造を注入できます。

```nani
1足す2は {1 + 2} です。
```

— スクリプトを実行すると、「1足す2は 3 です。」と表示されます。

任意の数学演算子と論理演算子、および [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) 名前空間の一部の数学関数を使用できます。

```nani
@char Kohaku scale:{pow(cos(33.5), 3) % log(0.5)}
```
— ID "Kohaku" のキャラクターを、33.5の余弦（3乗）を0.5の自然対数で割った余りにスケーリングします。

式はコマンドが実行される瞬間に評価されるため、式内で [カスタム変数](/ja/guide/custom-variables) を使用できます。

```nani
@input color summary:"好きな色は何ですか？"
{color}、ですか？ { color == "orange" ? "私もです！" : (color == "black" ? "それは憂鬱ですね。" : "なるほど...") }
```

— プレイヤーが好きな色を入力できる入力UIを表示し、それを `color` カスタム変数に割り当て、入力された色を表示し、それが "orange" の場合は「私もです！」、"black" の場合は「それは憂鬱ですね。」、それ以外の場合は「なるほど...」と続きます。

プレーンテキスト値と変数名を区別するには、値を二重引用符 `"` で囲みます。

```nani
これは単なるプレーンテキストです: { "score" }。
そして、これは "score" 変数の値です: { score }。
```

式の中に二重引用符を含めたい場合は、エスケープします。

```nani
{ \"車を止めろ\" } と言うのは間違いでした。
```

[@set] および [@if] コマンド（および他のコマンドの `set` および `if` パラメータ）で使用されるスクリプト式には、中括弧は必要ありません。

```nani
@set randomScore=random(-100,100)
@goto #EpicLabel if:abs(randomScore)>=50
```

ただし、他のパラメータ値と同様に、式内でスペースを使用する場合は、二重引用符で囲みます。

```nani
@set "randomScore = random(-100, 100)"
@goto #EpicLabel if:"abs(randomScore) >= 50"
```

汎用テキスト行内に中括弧を表示し、式区切り文字として認識されないようにするには、バックスラッシュで中括弧をエスケープします。例：

```nani
一部のテキスト \{ 中括弧内のテキスト \}
```

— ゲーム内では「一部のテキスト { 中括弧内のテキスト }」と表示されます。

## 式関数

次の関数は、スクリプト式内でも使用できます。

<div class="config-table">

| 署名 | 説明 | 例 |
| --- | --- | --- |
| random(min, max) | min（含む）とmax（含む）の間のランダムな整数を返します。 | `random(0, 100)` |
| random(min, max) | min（含む）とmax（含む）の間のランダムな小数を返します。 | `random(0.5, 1.5)` |
| random(args) | 指定された文字列の1つから選択された文字列を返します。 | `random("foo", "bar", "baz")` |
| calculateProgress() | シナリオ完了率を0.0〜1.0の範囲で返します。1.0は、すべてのスクリプト行が少なくとも1回実行されたことを意味します。 | `calculateProgress()` |
| isUnlocked(id) | 指定されたIDを持つアンロック可能アイテムが現在アンロックされているかどうかを確認します。 | `isUnlocked("Tips/MyTip")` |
| hasPlayed() | 現在再生中のコマンドが以前に再生されたことがあるかどうかを確認します。 | `hasPlayed()` |
| hasPlayed(scriptPath) | 指定されたパスのスクリプトが以前に再生されたことがあるかどうかを確認します。 | `hasPlayed("MyScript")` |
| getName(characterId) | 指定されたIDを持つキャラクターアクターの表示/著者名を返します。 | `getName("Kohaku")` |
| pow(num, pow) | numを指定された累乗にして返します。 | `pow(2, 3)` |
| sqrt(num) | numの平方根を返します。 | `sqrt(2)` |
| cos(num) | 角度（度）の余弦を返します。 | `cos(180)` |
| sin(num) | 角度（度）の正弦を返します。 | `sin(90)` |
| log(num) | 指定された数値の自然対数（底e）を返します。 | `log(0.5)` |
| abs(num) | numの絶対値を返します。 | `abs(-0.5)` |
| max(nums) | 2つ以上の値のうち最大のものを返します。 | `max(1, 10, -9)` |
| min(nums) | 2つ以上の値のうち最小のものを返します。 | `min(1, 10, -9)` |
| round(num) | 最も近い整数に丸められたnumを返します。 | `round(0.9)` |
| approx(a, b) | 2つの浮動小数点値を比較し、類似している場合はtrueを返します。 | `approx(0.15, 0.15)` |
| approx(a, b) | 大文字と小文字を区別せずに2つの文字列を比較します。 | `approx("abc", "ABC")` |

</div>

## カスタム関数の追加

`ExpressionFunction` 属性を使用してパブリック静的C#メソッドに注釈を付けることで、カスタム式関数を追加できます。メソッドには互換性のある署名が必要であり、その後スクリプト式で自動的に使用可能になります。

引数および戻り値の型としてサポートされているのは、[単純](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/types#simple-types) 型と文字列型のみです。単一の可変長（`params` キーワード）引数を使用することもできます。可変長引数を他の引数と混在させることはサポートされていません。

```csharp
public static class CustomFunctions
{
    // すべての文字を小文字に変換した指定文字列を返します。
    [ExpressionFunction("toLower")]
    public static string ToLower (string content) => content.ToLower();

    // 指定された数値の合計を返します。
    [ExpressionFunction("add")]
    public static int Add (int a, int b) => a + b;

    // 指定された数値を除算した結果の余りを返します。
    [ExpressionFunction("mod")]
    public static double Modulus (double a, double b) => a % b;

    // 指定された文字列からランダムに選択された文字列を返します。
    [ExpressionFunction("random")]
    public static string Random (params string[] args)
    {
        if (args == null || args.Length == 0)
            return default;

        var randomIndex = UnityEngine.Random.Range(0, args.Length);
        return args[randomIndex];
    }
}
```

`ExpressionFunction` 属性には、次のオプションパラメータがあります。

- **Alias** デフォルトでは、メソッド名が関数識別子（スクリプトで関数を参照する方法）として使用されます。エイリアスを割り当てて識別子を変更します。
- **Summary** IDE拡張機能とビジュアルエディタに表示されるドキュメント。
- **Remarks** IDE拡張機能とビジュアルエディタに表示される追加情報。
- **Example** IDE拡張機能とビジュアルエディタに表示される使用例。

::: tip EXAMPLE
インベントリにアイテムが存在するかどうかを確認するためのカスタム式関数を追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタム関数は `Scripts/Runtime/Inventory/InventoryFunctions.cs` ランタイムスクリプトを介して実装されています。
:::

## パラメータコンテキスト

コマンドパラメータと同様に、関数パラメータにコンテキスト属性を適用して、自動補完を行い、[IDE拡張機能](/ja/guide/ide-extension) で診断することができます。

たとえば、関数パラメータを列挙型に関連付けることができます。

```cs
public enum Quest { Quest1, Quest2, Quest3, ... }

public static class CustomFunctions
{
    [ExpressionFunction]
    public static bool IsComplete ([ConstantContext(typeof(Quest))] string name)
    {
        Enum.TryParse<Quest>(name, out var quest);
        // 'quest' が完了しているかどうかを確認するカスタムロジックを実行します
        return false;
    }
}
```

— IDEは、`name` パラメータに提供された値が有効であることを確認し、補完を提供します。

![](https://i.gyazo.com/0f1519347ac9b619444371922e0fd1f5.mp4)

アクター、リソース、エンドポイントなどの他のコンテキストも使用できます。たとえば、以下はアクターIDを受け取り、その表示名を返す組み込みの `getName()` 関数です。`ActorContext` が適用されると、プロジェクトで使用可能なアクターIDで補完されます。

```cs
[ExpressionFunction]
static string GetName (
    [ActorContext(CharactersConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<ICharacterManager>().GetAuthorName(id);
}
```

別の例、これはアンロック可能IDで補完します。

```cs
[ExpressionFunction]
static bool IsUnlocked (
    [ResourceContext(UnlockablesConfiguration.DefaultPathPrefix)] string id)
{
    return Engine.GetService<IUnlockableManager>()?.ItemUnlocked(id) ?? false;
}
```

その他の例と利用可能なコンテキストについては、[IDEガイド](/ja/guide/ide-extension#ide属性) を参照してください。
