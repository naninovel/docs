# メモリ管理

一部のスクリプトコマンドは、動作するためにリソースをロードする必要があります。たとえば、[@bgm] のオーディオクリップ、[@char] のキャラクターの外観テクスチャ、[@movie] のビデオクリップなどです。Naninovelは、これらのリソースのロードとアンロードを最適化された方法で処理します。デフォルトの動作は、リソースプロバイダー構成にある `Resource Policy` 設定によって決定されます。

![](https://i.gyazo.com/ee96274f01f2f355d14190aabf5f2070.png)

## Conservativeポリシー

デフォルトのモードであり、バランスの取れたメモリ使用量を実現します。スクリプト実行に必要なすべてのリソースは、再生開始時にプリロードされ、スクリプトの再生が終了するとアンロードされます。[@gosub] コマンドで参照されるスクリプトもプリロードされます。[@goto] コマンドの `hold` パラメーターを使用して、追加のスクリプトをプリロードできます。

以下は、Conservativeポリシーの下でリソースがどのように管理されるかを示すデモです。

::: code-group

```nani [Script1.nani]
Script1、Script2、ScriptGosubのリソースがここでロードされます。
Script2は、"@goto hold!" での移動先であるためロードされます。
ScriptGosubは、"@gosub" スクリプトが常にプリロードされるためロードされます。

...

gosubは常にプリロードされるため、ロード画面は表示されません。
@gosub ScriptGosub

...

"hold!" を使用しているため、ロード画面は表示されません。
@goto Script2 hold!
```

```nani [Script2.nani]
Script1、Script2、ScriptGosubのリソースはすべてまだロードされています。
このスクリプトには "@goto hold!" で移動してきたため、
Script1の依存関係と見なされるからです。

...

"hold!" を使用していないため、ロード画面が表示されます。
@goto Script3
```

```nani [Script3.nani]
Script1とScript2のリソースはここでアンロードされ、
Script3（このスクリプト）のリソースがロードされます。
ScriptGosubのリソースは、ここで使用しているため、まだロードされています。

...

gosubは常にプリロードされるため、ロード画面は表示されません。
@gosub ScriptGosub

...

"hold!" を使用していないため、ロード画面が表示されます。
@goto Script4
```

```nani [Script4.nani]
以前のすべてのリソース（ScriptGosubを含む）がここでアンロードされ、
Script4（このスクリプト）のリソースのみがロードされます。

...

@stop
```

```nani [ScriptGosub.nani]
どのスクリプトからここに移動してきたかに応じて、
ここではさまざまなリソースがロードされている可能性があります。

...

gosubは、gosubに移動するスクリプトとともに常にロードされ、
そのスクリプトがアンロードされるまでアンロードされないため、ロード画面は表示されません。
@return
```

:::

## Optimisticポリシー

現在再生中のスクリプトに必要なすべてのリソース、および [@goto] および [@gosub] コマンドで指定されたすべてのスクリプトのすべてのリソースはプリロードされ、[@goto] コマンドで `release` パラメーターが指定されていない限りアンロードされません。これにより、ロード画面が最小限に抑えられ、スムーズなロールバックが可能になりますが、リソースをいつアンロードするかを手動で指定する必要があります。モバイルデバイスやWebブラウザーなど、メモリ制限が厳しいプラットフォームでは、メモリ不足例外のリスクが高まります。

以下は、Optimisticポリシーを使用した同様のスクリプトセットのデモです。

::: code-group

```nani [Script1.nani]
Script1、Script2、Script3、ScriptGosubのリソースはすべてここでロードされます。
Script4は、"@goto release!" での移動先であるためロードされません。

...

gosubは常にプリロードされるため、ロード画面は表示されません。
@gosub ScriptGosub

...

"release!" が指定されていない限り、デフォルトではロード画面は表示されません。
@goto Script2
```

```nani [Script2.nani]
Script4を除くすべてがまだロードされています。

...

"release!" が指定されていない限り、デフォルトではロード画面は表示されません。
@goto Script3
```

```nani [Script3.nani]
Script4を除くすべてがまだロードされています。

...

gosubは常にプリロードされるため、ロード画面は表示されません。
@gosub ScriptGosub

...

"release!" を指定しているため、ここではロード画面が表示されます。
@goto Script4 release!
```

```nani [Script4.nani]
Script4を除くすべてのリソースがここでアンロードされます。
これは、"@goto release!" でここに移動してきたためです。

...

@stop
```

```nani [ScriptGosub.nani]
どのスクリプトからここに移動してきたかに応じて、
ここではさまざまなリソースがロードされている可能性があります。

...

gosubは、gosubに移動するスクリプトとともに常にロードされ、
そのスクリプトがアンロードされるまでアンロードされないため、ロード画面は表示されません。
@return
```

:::

## Lazyポリシー

他のポリシーは、ゲームが何らかのロード画面（シーン、幕、日付の切り替わりなどに見せかけたもの）を念頭に置いて設計されていることを前提としています。そこではNaninovelがCPU負荷の高いリソースロード処理を一括して実行できるため、実際のゲームプレイをスムーズに保てます。

ただし、ゲームによってはそのような構造になっていなかったり、その種の最適化を必要としなかったりする場合があります。「Lazy」モードが選択されている場合、Naninovelはロード画面を表示したり、スクリプトを再生する前にリソースをプリロードしようとしたりすることはありません。代わりに、スクリプトの再生に合わせて必要なリソースを「オンザフライ」でロードします。また、現在再生中のコマンドより先にあるコマンドを一定数プリロードして、ゲームプレイ中の遅延を最小限に抑えます。プリロードされるコマンドの数は、リソースプロバイダー構成にある `Lazy Buffer` 設定で調整できます。

::: code-group

```nani [Script1.nani]
"Lazy Buffer" が3に設定されていると仮定します（デフォルトはこれより大きい値です）。
バッファーの範囲内にあるため、現時点では "Snow" 背景のみがプリロードされています。
@back Snow
"Ambient" オーディオがプリロードされます。
"Town" 背景がプリロードされます。
@bgm Ambient
@back Town
"Snow" 背景は、表示されなくなったためアンロードされます。
...

ロード画面は表示されません。すべてのリソースが解放されます。
Script2の "Snow" 背景は、バッファーの範囲内にあるためプリロードされます。
@goto Script2
```

```nani [Script2.nani]
...
@back Snow
"Town" 背景は、表示されなくなったためアンロードされます。
```

:::

Lazyモードには重要な注意点があります。アセット（特に大きな背景テクスチャ、HDキャラクターモデル、ビデオファイルなどの「重い」もの）をロードすると、ゲームプレイ中に目立つスタッターが発生する可能性があります。Naninovelは可能な限りメインスレッド以外でこれらの操作を実行しようとしますが、一部の低スペックなデバイスやプラットフォーム（特にWeb）では、特にスキップ（早送り）やロールバック中に依然として目立つスタッターが発生する可能性があります。Lazyポリシーが許容できるかどうかを判断する前に、サポート対象とする最低スペックのハードウェアで必ずゲームをテストしてください。

## ポリシーの選択

一般に、デフォルトの「Conservative」ポリシーを維持することをお勧めします。これは、すべてのターゲットプラットフォームに適したバランスの取れたメモリ使用量を提供しながら、必要に応じて `hold!` フラグを介して柔軟なスクリプトのマージを可能にするためです。

ただし、スタンドアロンビルドやゲームコンソールなど、十分なRAMを備えた強力なプラットフォームのみをターゲットにしている場合は、「Optimistic」ポリシーを選択してリソースの大部分をメモリ内に保持し、ロード画面を最小限に抑えるのもよいでしょう。

「Optimistic」ポリシーを使用するもう1つのケースは、Naninovelがカスタムゲームループ内のダイアログシステムとして使用される場合です。そのような場合、独自のリソース管理システムを持っている可能性が高く、「Optimistic」は干渉しません。明示的に `release!` フラグを使用しない限り、スクリプトを再生する前に必要なすべてのリソースをロードしたままにします。

メモリ使用量を最小限に抑える必要があり、ゲームプレイ中の潜在的なスタッターを許容できる場合、またはロード画面を前提としたゲーム設計が現実的でない場合は、「Lazy」ポリシーを選択してください。

ポリシーの概要は以下のとおりです。

| ポリシー | メモリ使用量 | CPU使用率 | ロード画面 | スキップとロールバック |
|--------------|:--------------------------------------:|---------------------------------------|----------------------------------------------------|----------------------------------------------------|
| Conservative | <span class="txt-warn">バランス</span> | <span class="txt-ok">安定</span> | <span class="txt-err">goto時（保持時を除く）</span> | <span class="txt-warn">保持されたスクリプト内では高速</span> |
| Optimistic | <span class="txt-err">高い</span> | <span class="txt-ok">安定</span> | <span class="txt-warn">解放するまでなし</span> | <span class="txt-ok">解放するまで高速</span> |
| Lazy | <span class="txt-ok">低い</span> | <span class="txt-err">不安定</span> | <span class="txt-ok">一切なし</span> | <span class="txt-err">常に遅い</span> |

## アクターリソース

アクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）は、Naninovelの主要なエンティティです。アクターが使用するメモリのほとんどは、その外観に関連しています。

### 外観

一部のアクター実装では、外観がリソースに1対1でマップされています。スプライトアクターの外観は単一のテクスチャアセットに関連付けられ、ビデオアクターの外観は単一のビデオクリップである、といった具合です。これにより、Naninovelはシナリオスクリプトで参照される特定の外観に基づいてリソースを管理できます。たとえば、特定のスクリプトでスプライトキャラクターの `Happy` と `Sad` の外観のみが使用されている場合、キャラクターに他にいくつの外観があっても、スクリプトが再生される前に `Happy.png` と `Sad.png` テクスチャのみがプリロードされます。

ただし、レイヤー、ダイススプライト、汎用、Live2D、Spineアクターはすべて、関連付けられたどの外観を表現するにもモノリシックなプレハブを必要とするため、リソースを個別にロードすることはできません。そのような場合、Naninovelはすべての依存関係とともにプレハブ全体をプリロードし、使用されている外観に関係なく、アクターがいずれのコマンドでも参照されなくなった場合にのみアンロードします。

### アクターの削除

Naninovelは、デフォルトで、スクリプトリソースをアンロードするときに、未使用のアクターを自動的に削除し、関連するゲームオブジェクトを破棄します。アクターを手動で破棄したい場合は、リソースプロバイダー構成メニューの `Remove Actors` オプションを無効にし、[@remove] コマンドを使用してください。

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; 'Remove Actors' が無効になっている場合、"NextScript" がロードされても
; "LayeredBackground" は破棄されませんが、両方のキャラクターは破棄されます。
@hide GenericCharacter,DicedCharacter wait!
@remove GenericCharacter,DicedCharacter
@goto NextScript
```

— あるいは、[@remove] に `*` パラメーターを指定して既存のすべてのアクター（テキストプリンターと選択肢ハンドラーを含む）を破棄するか、[@resetState] に `only` パラメーターを指定して特定のタイプのアクター（キャラクターの場合は `ICharacterManager`、背景の場合は `IBackgroundManager`）を即座に破棄します。

```nani
...
@goto NextScript
; 既存のすべての背景を破棄します。
@resetState only:IBackgroundManager
```

## 寿命管理

リソースプロバイダーマネージャーは、ロードされたリソースへの参照を追跡し、どのユーザー（「ホルダー」）からも使用（「保持」）されなくなったときにそれらを破棄（アンロード）します。

このメカニズムはスクリプトコマンドで最も顕著です。たとえば、カスタムコマンドで背景音楽を再生したいとします。オーディオプレイヤーは再生するためにオーディオクリップアセット（リソース）を必要とするため、コマンドが実行される前にアセットをプリロードして「保持」し、実行後に解放する必要があります。

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async Awaitable PreloadResources (ScriptPlaylist playlist)
    {
        await audio.BgmLoader.Load(MusicName, this);
    }

    public void ReleaseResources (ScriptPlaylist playlist)
    {
        audio.BgmLoader.Release(MusicName, this);
    }

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        await audio.PlayBgm(MusicName, token: ctx.Token);
    }
}
```

コマンドが `Command.IPreloadable` インターフェースを実装していることに注意してください。スクリプトプレイヤーはそのようなコマンドを検出し、プリロードおよび解放メソッドを呼び出して、コマンドが実行される前にアセットが準備され、実行後に解放されるようにします。

## リソースの共有

場合によっては、Naninovelとカスタムゲームプレイモードの間でリソースを共有したいことがあります。カスタムゲームプレイがNaninovelとは独立して実装されている場合（カスタムモードがアクティブなときにエンジンが無効になっている場合）、問題はないはずです。ただし、カスタムモードとNaninovelの両方が同時に使用される場合は、リソースの使用方法に注意する必要があります。

たとえば、Naninovelスプライト背景があり、その外観テクスチャがあるUI要素のソースとしても使用されているとします。ある時点でNaninovelはテクスチャを解放しようとし、UI要素からも消えてしまいます。これは、そのテクスチャが他でも使用されていてアンロードすべきでないことを、エンジンが認識していないために起こります。

アセットを使用していることをNaninovelに通知するには、リソースプロバイダーサービスの `Hold` メソッドを使用します。

```csharp
var resourceManager = Engine.GetService<IResourceProviderManager>();
resourceManager.Hold(asset, holder);
```

アセットを保持している間はNaninovelによってアンロードされないため、メモリリークを防ぐには自分で解放する必要があることに注意してください。

```csharp
var holdersCount = resourceManager.Release(asset, holder);
// 他に誰もアセットを保持していない場合は、アンロードする必要があります。
if (holdersCount == 0) Resources.UnloadAsset(asset);
```

「ホルダー」は任意のオブジェクトへの参照にすることができます。通常は、アセットを使用しているクラス自身です。ホルダーを区別し、同じホルダーが誤ってリソースを複数回保持するのを防ぐために使用されます。

以下は、Naninovelがアセットを一切アンロードしないようにするUnityコンポーネントの例です。

```csharp
using Naninovel;
using UnityEngine;

public class HoldObject : MonoBehaviour
{
    public Object ObjectToHold;

    private async void Start()
    {
        while (!Engine.Initialized) await Async.NextFrame();
        Engine.GetService<IResourceProviderManager>().Hold(ObjectToHold, this);
    }
}
```
