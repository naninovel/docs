# トランジションエフェクト

[@back] や [@char] で背景やキャラクターの外観を変更する時、または [@startTrans] や [@finishTrans] コマンドでシーンをトランジションする時、トランジションエフェクトを追加で指定できます。たとえば次のコマンドは、"DropFade" トランジション効果を使用して "River" の背景にトランジションします:

```
@back River.DropFade
```

トランジション効果が指定されていない場合、デフォルトでクロスフェードが使用されます。

また `time` パラメータで、トランジションの継続時間（秒単位）を指定することもできます。

```
@back River.DropFade time:1.5
```

上記は "DropFade" トランジション効果を使用して、 "River" の背景に1.5秒かけてトランジションします。全てのトランジションのデフォルトの `time` は0.35秒です。

トランジションを実行した直後に次のコマンドにスキップしたい場合（エフェクトの継続時間を待たない場合）は、 `wait` パラメーターを `false` に設定できます。 例えば:

```
@back River.Ripple time:1.5 wait:false
@bgm PianoTheme
```
— "PianoTheme" のバックグラウンドミュージックはすぐに再生を開始し、トランジションが進行する1.5秒間待つことはありません。

一部のトランジションエフェクトは、 `params` パラメーターで制御できる追加のパラメーターもサポートします:

```
@back River.Ripple params:10,5,0.02
```
— これはリップルエフェクトの周波数を10、速度を5、振幅を0.02に設定します。`params` が指定されていない場合、デフォルトのパラメータが使用されます。

選択したパラメーターを変更する場合は、他のパラメーターをスキップできます。これらのパラメーターにはデフォルト値があります:

```
@back River.Ripple params:,,0.02
```

すべてのトランジションパラメーターは10進数です。

上記の例はキャラクターでも機能します。スタンドアロンの `transition` パラメータを介してトランジションを指定するだけです:

```
@char CharID.Appearance transition:TransitionType params:...
```

以降のドキュメントでは、使用可能なトランジションエフェクトとそのパラメーターおよびデフォルト値を参照することができます。

## BandedSwirl

<video class="video" loop autoplay><source src=" https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4" type="video/mp4"></video>

**Parameters**

名前 |  デフォルト
--- | ---
Twist amount | 5
Frequency | 10

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.BandedSwirl

; デフォルトのツイスト量、ただし周波数を低めにトランジションを適用。
@back Appearance.BandedSwirl params:,2.5
```

## Blinds

[!73a259f2a513a92ef893ebd6a25e9013]

**Parameters**

名前 |  デフォルト
--- | ---
Count | 6

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Blinds

; デフォルトの6ではなく、30のブラインドを使用してトランジションを適用。
@back Appearance.Blinds params:30
```

## CircleReveal

[!4f914c6741a5e48a22cafe2ab242a426]

**Parameters**

名前 |  デフォルト

--- | ---
Fuzzy amount | 0.25

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.CircleReveal

; ファジー量の多いトランジションを適用。
@back Appearance.CircleReveal params:3.33
```

## CircleStretch

[!f09bb69a3c045eeb1f6c8ec0b9dcd790]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.CircleStretch
```

## CloudReveal

[!618ec451a9e10f70486db0bb4badbb71]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.CloudReveal
```

## Crossfade

[!dc4781a577ec891065af1858f5fe2ed1]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Crossfade
```

## Crumble

[!e27c8477842a2092728ea0cc1ae76bda]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Crumble
```

## Dissolve

[!b2993be8de032a65c7d813c6d749e758]

**Parameters**

名前 |  デフォルト
--- | ---
Step | 99999

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Dissolve

; 低いステップでトランジションを適用。
@back Appearance.Dissolve params:100
```

## DropFade

[!3c3840bb311ccb9fe223960f2e46f800]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.DropFade
```

## LineReveal

[!c0e5259cd3d4ed2016ab74a65a7eec63]

**Parameters**

名前 |  デフォルト
--- | ---
Fuzzy amount | 0.25
Line Normal X | 0.5
Line Normal Y | 0.5

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.LineReveal

; ラインを垂直線にスライドするトランジションを適用。
@back Appearance.LineReveal params:,0,1
```

## Pixelate

[!0ac9339b21303e20c524aaf6b6ca95f4]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Pixelate
```

## RadialBlur

[!f8269fb68519c57c99643948a027a2a1]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.RadialBlur
```

## RadialWiggle

[!a401b3b93a61276ed68ededa2e75e9ae]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.RadialWiggle
```

## RandomCircleReveal

[!f6e685b13fe2d76733fd43878602eabc]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.RandomCircleReveal
```

## Ripple

[!ff1bd285dc675ca5ac04f7ae4500f1c4]

**Parameters**

名前 |  デフォルト
--- | ---
Frequency | 20
Speed | 10
Amplitude | 0.5

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Ripple

; 高い周波数と振幅でトランジションを適用。
@back Appearance.Ripple params:45,,1.1
```

## RotateCrumble

[!8d476f466858e4788e5ad6014d6db314]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.RotateCrumble
```

## Saturate

[!ad6eb77b7065387b9cb9afd77adbc784]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Saturate
```

## Shrink

[!8c8bf00348df28ab89813c21f8655c07]

**Parameters**

名前 |  デフォルト
--- | ---
Speed | 200

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Shrink

; スビードを低めにトランジションを適用。
@back Appearance.Shrink params:50
```

## SlideIn

[!800ee6f5fba39ab8d46f5eb09f2126cf]

**Parameters**

名前 |  デフォルト
--- | ---
Slide amount | 1

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.SlideIn
```

## SwirlGrid

[!5a21293d979323a112ffd07f1fffd28d]

**Parameters**

名前 |  デフォルト
--- | ---
Twist amount | 15
Cell count | 10

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.SwirlGrid

; 捻りが強く、セル数が少ないトランジションを適用。
@back Appearance.SwirlGrid params:30,4
```

## Swirl

[!6ac9a2fe1bb9dfaf6a8292ae5d03960e]

**Parameters**

名前 |  デフォルト
--- | ---
Twist amount | 15

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Swirl

; 捻りを強めにトランジションを適用。
@back Appearance.Swirl params:25
```

## Water

[!7c684f9a122006f38a0be2725895b76f]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Water
```

## Waterfall

[!b6eebcb68002064ababe4d7476139a7c]

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Waterfall
```

## Wave

[!e189ca12868d7ae4c9d8f0ca3d9dd298]

**Parameters**

名前 |  デフォルト
--- | ---
Magnitude | 0.1
Phase | 14
Frequency | 20

**使用例**
```
; デフォルトのパラメーターでトランジションを適用。
@back Appearance.Wave

; 振幅が高く、周波が低いトランジションを適用。
@back Appearance.Wave params:0.75,,5
```

## カスタムトランジションエフェクト

### ディゾルブマスク

ディゾルブマスクテクスチャをベースにカスタムトランジションを作成できます。ディゾルブマスクはグレースケールテクスチャであり、ピクセルが目標テクスチャに遷移するタイミングを色で定義します。たとえば、次のスパイラルディゾルブマスクを考えてみます:

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— 右上隅の黒い四角は、トランジションの対象がトランジション開始時にそこに表示されます。中央の真っ白な四角が最後にトランジションします。

カスタムトランジションを作成するには、 `Custom` トランジションモードを使用し、`dissolve` パラメーターでディゾルブマスクテクスチャへのパス（プロジェクトの "Resources" フォルダーからの相対パス）を指定します。例:

```
@back Appearance.Custom dissolve:Textures/Spiral
```

使用例は以下の動画をご覧ください。

[!!HZjey6M2-PE]

### カスタムシェーダー

カスタムアクター [シェーダー](https://docs.unity3d.com/Manual/ShadersOverview.html) を介して、完全にカスタムされたトランジションエフェクトを追加することができます。

::: warn
このトピックには、Unityのグラフィックプログラミングスキルが必要です。カスタムシェーダーの作成に関するサポートやチュートリアルは提供していません。詳細は [サポートページ](/ja/support/#unityサポート) をご覧ください。
:::

新しいシェーダーを作成して、新しいカスタムトランジションエフェクトを適用したいアクターに割り当てます。カスタムアクターシェーダーを作成して割り当てる方法の詳細については、[カスタムアクターシェーダー](/ja/guide/custom-actor-shader.md) ガイドを参照してください。

スクリプトコマンドでトランジション名を指定すると、同じ名前の [シェーダーキーワード](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html)(プリフィックスは `NANINOVEL_TRANSITION_`) が、アクターの素材で有効になります。

独自のトランジションをカスタムアクターシェーダーに追加するには、 `multi_compile` ディレクティブを使用します。例:

```c
#pragma multi_compile _ NANINOVEL_TRANSITION_MYCUSTOM1 NANINOVEL_TRANSITION_MYCUSTOM2
```

— これは `MyCustom1` と `MyCustom2` トランジションを追加します。

次に、条件ディレクティブを使用して、有効にしたトランジションキーワードに基づいて特定のレンダリング方法を選択できます。組み込みのアクタシェーダーを再利用する場合、フラグメントハンドラーで使用される `ApplyTransitionEffect` メソッドを介してカスタムトランジションを実装することが可能です:

```c
fixed4 ApplyTransitionEffect(in sampler2D mainTex, in float2 mainUV, in sampler2D transitionTex, in float2 transitionUV, in float progress, in float4 params, in float2 randomSeed, in sampler2D cloudsTex, in sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transitionColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM1 // MyCustom1 トランジション。
    return transitionUV.x > progress ? mainColor : lerp(mainColor / progress * .1, transitionColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM2 // MyCustom2 トランジション。
    return lerp(mainColor * (1.0 - progress), transitionColor * progress, progress);
    #endif

    // 有効なトランジションキーワードがない場合、デフォルトでクロスフェードになります。
    return lerp(mainColor, transitionColor, progress);
}
```

その後、組み込みのトランジションと同じ方法で、追加したトランジションを呼び出すことができます。例:

```
@back Snow.MyCustom1
@back River.MyCustom2
```
