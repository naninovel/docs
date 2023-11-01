# スクリプト表記

naninovelスクリプトを作成するときは、中かっこ `{}`を使用して、式の構成をコマンドパラメーター値と一般テキスト行に挿入できます:

```nani
One plus two equals {1 + 2}.
```

— スクリプトを実行すると、"One plus two equals 3" を表示します。

[UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html)および[System.Math](https://docs.microsoft.com/en-us/dotnet/api/system.math#methods) ネームスペースの数学関数に加えて、数式、論理演算子が使えます:

```nani
@char Kohaku scale:{Pow(Cosh(33.5), 3) % Log(0.5)}
```
— これは IDが "Kohaku" のキャラクターを、33.5度の双曲線コサインを3乗し、自然対数0.5で割ったもので拡大します:

式はコマンドの実行時に評価され、式内で [カスタム変数](/ja/guide/custom-variables) を使用できます。

```nani
@input color summary:"What's your favorite color?"
@stop
{color}, huh? { color == "orange" ? "Mine too!" : "I see..."}
```

— 上記はプレイヤーに好きな色を入力させる入力UIを表示し、カスタム変数 `color` に割り当てます。そして入力された色を表示し、もし "orange" なら "Mine too!" それ以外なら "I see..." と続けます。

プレーンテキスト値と変数名を区別するには、値を二重引用符 `"` で囲みます:

```nani
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```
式に二重引用符を含める場合は、 **2回** エスケープします:

```nani
Saying { \\"Stop the car\\" } was a mistake.
```

[@set] と [@if] コマンド(他のコマンドの `set` と `if` パラメーターも同様)の中で使われる式は、中かっこは必要ありません:

```nani
@set randomScore=Random(-100,100)
@goto EpicLabel if:Abs(randomScore)>=50
```

ただし、他のすべてのパラメーター値と同様に、式内でスペースを使用する場合は、二重引用符で囲む必要があります:

```nani
@set "randomScore = Random(-100, 100)"
@goto EpicLabel if:"Abs(randomScore) >= 50"
```

一般テキスト内に中かっこを表示し、式の開始/終了リテラルとして認識されないようにするには、中かっこをバックスラッシュでエスケープします。例:

```nani
Some text \{ text inside braces \}
```

— 上記はゲーム内に "Some text { text inside braces }" と表示します。

## 関数式

次の関数は、スクリプト式内でも使用できます。

<div class="config-table">

Signature | 説明 | 使用例
--- | --- | ---
Random (*System.Double* min, *System.Double* max) | 最小[引数]と最大[引数]の間で、ランダムな浮動小数点の数値を返します。| `Random(0.1, 0.85)`
Random (*System.Int32* min, *System.Int32* max) | 最小[引数]と最大[引数]の間で、ランダムな整数を返します、 | `Random(0, 100)`
Random (*System.String[]* args) | 指定した文字列の中から1つを返します。 | `Random("Foo", "Bar", "Foobar")`
CalculateProgress () | 0.0から1.0の範囲の浮動小数点の数値を返します。Naninovel で使用可能な全てのスクリプトコマンドの合計に対して、これまでに実行したユニークなコマンド数を表します。1.0は、プレイヤーが全てのコンテンツを `読み通した` か `見た` ということになります。この機能を使う前に、スクリプトコンフィグメニューで必ず `Count Total Commands` を有効にして下さい。 | `CalculateProgress()`

</div>

## カスタム関数の追加

静的 C# クラスに `ExpressionFunctions` 属性を割り当てることにより、カスタム式関数を追加できます。 互換性のあるシグネチャを持つこのクラスのすべてのパブリックメソッドは、スクリプト式で自動的に使用できるようになります。

互換性のあるシグネチャは、[simple](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/value-types#simple-types) 型と文字列型を受け取り、返します。`params` キーワードが付いたこのタイプの配列も同様です。

```csharp
[Naninovel.ExpressionFunctions]
public static class CustomFunctions
{
	// すべての文字を小文字に変換して、指定した文字列を返します。
    public static string ToLower (string content) => content.ToLower();

    // 指定した数値の合計を返します。
    public static int Add (int a, int b) => a + b;

    // 指定した文字列の1つからランダムに選択された文字列を返します。
    public static string Random (params string[] args)
	{
		if (args == null || args.Length == 0)
			return default;

        var randomIndex = UnityEngine.Random.Range(0, args.Length);
		return args[randomIndex];
	}
}
```

::: tip EXAMPLE
カスタム式関数を追加して、アイテムがインベントリに存在するかどうかを確認する別の例は [GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) にあります。。

具体的には、カスタム関数は [InventoryFunctions.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryFunctions.cs) ランタイムスクリプトで実装されています。
:::
