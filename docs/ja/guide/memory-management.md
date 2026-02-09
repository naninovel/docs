# メモリ管理

一部のスクリプトコマンドは、動作するためにリソースをロードする必要があります。たとえば、[@bgm] のオーディオクリップ、[@char] のキャラクターの外観テクスチャ、[@movie] のビデオクリップなどです。Naninovelは、これらのリソースのロードとアンロードを最適化された方法で処理します。デフォルトの動作は、リソースプロバイダー構成にある `Resource Policy` 設定によって決定されます。

![](https://i.gyazo.com/ee96274f01f2f355d14190aabf5f2070.png)

## Conservativeポリシー

デフォルトモードでは、バランスの取れたメモリ使用率が提供されます。スクリプト実行に必要なすべてのリソースは、再生開始時にプリロードされ、スクリプトの再生が終了するとアンロードされます。[@gosub] コマンドで参照されるスクリプトもプリロードされます。[@goto] コマンドの `hold` パラメータを使用して、追加のスクリプトをプリロードできます。

以下は、Conservativeポリシーの下でリソースがどのように管理されるかを示すデモです。

::: code-group

```nani [Script1.nani]
Script1、Script2、ScriptGosubのリソースがここにロードされます。
Script2は、"@goto hold!" で移動するためロードされます。
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
このスクリプトは "@goto hold!" で移動されたため、
Script1の依存関係と見なされるためです。

...

"hold!" を使用していないため、ロード画面が表示されます。
@goto Script3
```

```nani [Script3.nani]
Script1とScript2のリソースはアンロードされ、
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
以前のすべてのリソース（ScriptGosubを含む）がアンロードされ、
Script4（このスクリプト）のリソースのみがロードされます。

...

@stop
```

```nani [ScriptGosub.nani]
どのスクリプトがこれに移動したかに応じて、
さまざまなリソースがここにロードされる可能性があります。

...

gosubは、gosubに移動するスクリプトとともに常にロードされ、
そのスクリプトがアンロードされるまでアンロードされないため、ロード画面は表示されません。
@return
```

:::

## Optimisticポリシー

現在再生中のスクリプトに必要なすべてのリソース、および [@goto] および [@gosub] コマンドで指定されたすべてのスクリプトのすべてのリソースはプリロードされ、[@goto] コマンドで `release` パラメータが指定されていない限りアンロードされません。これにより、ロード画面が最小限に抑えられ、スムーズなロールバックが可能になりますが、リソースをいつアンロードするかを手動で指定する必要があります。モバイルデバイスやWebブラウザなど、メモリ制限が厳しいプラットフォームでは、メモリ不足例外のリスクが高まります。

以下は、Optimisticポリシーを使用した同様のスクリプトセットのデモです。

::: code-group

```nani [Script1.nani]
Script1、Script2、Script3、ScriptGosubのリソースはすべてここにロードされます。
Script4は、"@goto release!" で移動するためロードされません。

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

"release!" のため、ロード画面が表示されます。
@goto Script4 release!
```

```nani [Script4.nani]
Script4を除くすべてのリソースがアンロードされます。
これは、"@goto release!" でここに移動したためです。

...

@stop
```

```nani [ScriptGosub.nani]
どのスクリプトがここに移動したかに応じて、
さまざまなリソースがここにロードされる可能性があります。

...

gosubは、gosubに移動するスクリプトとともに常にロードされ、
そのスクリプトがアンロードされるまでアンロードされないため、ロード画面は表示されません。
@return
```

:::

## Lazyポリシー

他のポリシーは、ゲームがシーン、幕、または日の変更としてマスクされたある種のロード画面を念頭に置いて設計されていることを前提としています。そこでは、NaninovelがCPU集約型のリソースロード操作を一括して実行し、実際のゲームプレイがスムーズに維持されるようにする機会があります。

ただし、一部のゲームは互換性のある構造を持っていないか、そのような種類の最適化を必要としない場合があります。「Lazy」モードが選択されている場合、Naninovelはロード画面を表示したり、スクリプトを再生する前にリソースをプリロードしようとしたりすることはありません。代わりに、スクリプトの再生に合わせて必要なリソースを「オンザフライ」でロードします。また、現在再生中のコマンドの前に設定された数のコマンドをプリロードして、ゲームプレイ中の遅延を最小限に抑えます。プリロードされるコマンドの数は、リソースプロバイダー構成にある `Lazy Buffer` 設定で調整できます。

::: code-group

```nani [Script1.nani]
"Lazy Buffer" が3に設定されていると仮定します（デフォルトはこれより高いです）。
バッファの範囲内にあるため、"Snow" 背景のみがプリロードされます。
@back Snow
"Ambient" オーディオがプリロードされます。
"Town" 背景がプリロードされます。
@bgm Ambient
@back Town
"Snow" 背景は、表示されなくなったためアンロードされます。
...

ロード画面は表示されません。すべてのリソースが解放されます。
Script2の "Snow" 背景は、バッファの範囲内にあるためプリロードされます。
@goto Script2
```

```nani [Script2.nani]
...
@back Snow
"Town" 背景は、表示されなくなったためアンロードされます。
```

:::

Lazyモードには重要な注意点があります。アセット（特に大きな背景テクスチャ、HDキャラクターモデル、ビデオファイルなどの「重い」もの）をロードすると、ゲームプレイ中に目立つスタッターが発生する可能性があります。Naninovelは可能な限りメインスレッド以外でこれらの操作を実行しようとしますが、一部の低電力デバイスまたはプラットフォーム（特にWeb）では、特にスキップ（早送り）やロールバック中に依然として目立つスタッターが発生する可能性があります。Lazyポリシーが許容できるかどうかを判断する前に、サポートされている最小ハードウェア仕様でゲームをテストしてください。

## ポリシーの選択

一般に、デフォルトの「Conservative」ポリシーを維持することをお勧めします。これは、すべてのターゲットプラットフォームに適したバランスの取れたメモリ使用量を提供しながら、必要に応じて `hold!` フラグを介して柔軟なスクリプトのマージを可能にするためです。

ただし、スタンドアロンビルドやゲームコンソールなど、十分なRAMを備えた強力なプラットフォームのみをターゲットにしている場合は、「Optimistic」ポリシーを使用してメモリ内に大量のリソースを保持し、ロード画面を最小限に抑えることをお勧めします。

「Optimistic」ポリシーを使用する別のシナリオは、Naninovelがカスタムゲームループ内のダイアログシステムとして使用される場合です。そのような場合、独自のリソース管理システムを持っている可能性が高く、「Optimistic」は干渉しません。明示的に `release!` フラグを使用しない限り、スクリプトを再生する前に必要なすべてのリソースをロードしたままにします。

メモリ使用量を最小限に抑える必要があり、ゲームプレイ中の潜在的なスタッターを許容できる場合、またはロード画面を中心にゲームを設計することが不可能な場合は、「Lazy」ポリシーを選択してください。

ポリシーの概要は以下のとおりです。

| ポリシー | メモリ使用量 | CPU使用率 | ロード画面 | スキップとロールバック |
|--------------|:--------------------------------------:|---------------------------------------|----------------------------------------------------|----------------------------------------------------|
| Conservative | <span class="txt-warn">バランス</span> | <span class="txt-ok">安定</span> | <span class="txt-err">goto時、保持されない限り</span> | <span class="txt-warn">保持されたスクリプトで高速</span> |
| Optimistic | <span class="txt-err">高い</span> | <span class="txt-ok">安定</span> | <span class="txt-warn">なし、解放されるまで</span> | <span class="txt-ok">解放されるまで高速</span> |
| Lazy | <span class="txt-ok">低い</span> | <span class="txt-err">不安定</span> | <span class="txt-ok">なし</span> | <span class="txt-err">常に遅い</span> |

## アクターリソース

アクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）は、Naninovelの主要なエンティティです。アクターが使用するメモリのほとんどは、その外観に関連しています。

### 外観

一部のアクター実装では、外観がリソースに1：1でマップされています。スプライトアクターの外観は単一のテクスチャアセットに関連付けられ、ビデオアクターの外観は単一のビデオクリップに関連付けられます。これにより、Naninovelはシナリオスクリプトで参照される特定の外観に基づいてリソースを管理できます。たとえば、特定のスクリプトでスプライトキャラクターの `Happy` と `Sad` の外観のみが使用されている場合、キャラクターに他にいくつの外観があっても、スクリプトが再生される前に `Happy.png` と `Sad.png` テクスチャのみがプリロードされます。

ただし、レイヤー、ダイススプライト、汎用、Live2D、Spineアクターはすべて、関連する外観のいずれかを表すためにモノリスプレハブを必要とするため、リソースを個別にロードすることは不可能です。そのような場合、Naninovelはすべての依存関係とともにプレハブ全体をプリロードし、使用されている外観に関係なく、アクターがいずれのコマンドでも参照されなくなった場合にのみアンロードします。

### アクターの削除

Naninovelは、デフォルトで、スクリプトリソースをアンロードするときに、未使用のアクターを自動的に削除し、関連するゲームオブジェクトを破棄します。アクターを手動で破棄したい場合は、リソースプロバイダー構成メニューの `Remove Actors` オプションを無効にし、[@remove] コマンドを使用してください。

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; 'Remove Actors' が無効になっているため、"NextScript" がロードされても
; "LayeredBackground" は破棄されませんが、両方のキャラクターは破棄されます。
@hide GenericCharacter,DicedCharacter wait!
@remove GenericCharacter,DicedCharacter
@goto NextScript
```

— あるいは、`*` パラメータを指定して [@remove] を使用して既存のすべてのアクター（テキストプリンターと選択肢ハンドラーを含む）を破棄するか、`only` パラメータを指定して [@resetState] を使用して特定のタイプのアクター（キャラクターの場合は `ICharacterManager`、背景の場合は `IBackgroundManager`）を即座に破棄します。

```nani
...
@goto NextScript
; 既存のすべての背景を破棄します。
@resetState only:IBackgroundManager
```

## 寿命管理

リソースプロバイダーマネージャーは、ロードされたリソースへの参照を追跡し、ユーザー（「ホルダー」）によって使用（「保持」）されなくなったときにそれらを破棄（アンロード）します。

このメカニズムはスクリプトコマンドで最も顕著です。たとえば、カスタムコマンドで背景音楽を再生したいとします。オーディオプレイヤーは再生するためにオーディオクリップアセット（リソース）を必要とするため、コマンドが実行される前にアセットをプリロードして「保持」し、後で解放する必要があります。

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async Awaitable PreloadResources ()
    {
        await audio.AudioLoader.Load(MusicName, this);
    }

    public void ReleaseResources ()
    {
        audio.AudioLoader.Release(MusicName, this);
    }

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        await audio.PlayBgm(MusicName, token: ctx.Token);
    }
}
```

コマンドが `Command.IPreloadable` インターフェイスを実装していることに注意してください。スクリプトプレイヤーはそのようなコマンドを検出し、プリロードおよびアンロードメソッドを呼び出して、コマンドが実行される前にアセットが準備され、後で解放されるようにします。

## リソースの共有

場合によっては、Naninovelとカスタムゲームプレイモードの間でリソースを共有したいことがあります。カスタムゲームプレイがNaninovelとは独立して実装されている場合（カスタムモードがアクティブなときにエンジンが無効になっている場合）、問題はありません。ただし、カスタムモードとNaninovelの両方が同時に使用される場合は、リソースの使用方法に注意する必要があります。

たとえば、Naninovelスプライト背景があり、その外観テクスチャが一部のUI要素のソースとしても使用されているとします。ある時点でNaninovelはテクスチャを解放しようとし、UI要素でも消えます。これは、エンジンがあなたがテクスチャを使用していることを認識しておらず、アンロードすべきではないためです。

アセットを使用していることをNaninovelに通知するには、リソースプロバイダーサービスの `Hold` メソッドを使用します。

```csharp
var resourceManager = Engine.GetService<IResourceProviderManager>();
resourceManager.Hold(asset, holder);
```

アセットを保持している間はNaninovelによってアンロードされないため、メモリリークを防ぐために解放するのはあなた次第であることに注意してください。

```csharp
var holdersCount = resourceManager.Release(asset, holder);
// 他に誰もアセットを保持していない場合は、アンロードする必要があります。
if (holdersCount == 0) Resources.UnloadAsset(asset);
```

「Holder」は任意のオブジェクトへの参照にすることができます。通常は、アセットを使用しているのと同じクラスです。ホルダーを区別し、同じホルダーが誤ってリソースを複数回保持するのを防ぐために使用されます。

以下は、Naninovelがアセットをアンロードするのを防ぐUnityコンポーネントの例です。

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
