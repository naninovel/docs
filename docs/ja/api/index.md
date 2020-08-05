---
sidebar: auto
---

# APIリファレンス

スクリプトコマンド API のリファレンスです。サイドバーを使用すると目的のコマンドへ素早く移動できます。

~~打ち消し線~~は名前のないパラメーターを示し、**太字**は必須パラメーターを表します。他のパラメーターはオプションです。もし何か分からない場合は、[Naninovel スクリプトガイド](/ja/guide/naninovel-scripts.md) を参照してください。

以下のパラメーターは全てのスクリプトコマンドで使用できます:

<div class=config-table>

ID | タイプ | 説明
--- | --- | ---
if | String |  boolean型の [スクリプト表記](/ja/guide/script-expressions.md) で、コマンドを実行するかどうかを制御します。
wait | Boolean | スクリプトプレイヤーが次のコマンドを実行する前に、非同期コマンドの実行が完了するのを待つかどうか。コマンドが即座に実行される場合は影響しません。

</div>

::: note
この APIリファレンスは [Naninovel v1.10](https://github.com/Elringus/NaninovelWeb/releases) で有効です。
:::

## animate

#### 概要
キーフレームを介して、指定されたIDを持つアクターのプロパティをアニメーション化します。 アニメーション化されたパラメーターのキーフレームは、 `|` で区切ります。

#### 備考
このコマンドは、指定されたIDを持つ全てのアクターをアクターマネージャーから検索することに注意してください。同じIDを持つアクターが複数存在する場合(例: キャラクターやテキストプリンター)、コマンドは最初の一つのみに適用されます。<br /><br /> アニメーション化コマンドを並行して走らせていると(`wait` は false になっている状態)、対象のアクターの状態が予期せず変化する場合があります。これはロールバック中や、アクターの状態に影響する他のコマンドの実行が、予期せぬ結果を引き起こすことに繋がります。コマンド終了後は必ず、影響を受けるアニメーション化アクターのプロパティ(ポジション、色合い、外観など)をリセットするか、 `@animate CharacterId`  (引数なし) を使用してアニメーションを途中停止してください。


#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | アニメーション化するアクターのID
loop | Boolean | アニメーションをループするかどうか。loop を有効にした場合、必ず `wait` を false にしてください。そうしないとスクリプトの再生が無限にループします。
appearance | String | アニメーション化するアクターに設定する外観。
transition | String | 外観の変化をアニメーション化するときに使用する[トランジションエフェクト](/ja/guide/transition-effects.md)の種類（デフォルトではクロスフェードが使用されます）。
visibility | String | アニメーション化するアクターに設定する可視状態。
posX | String | アニメーション化するアクターに設定するポジションの、X軸の値 (0から100の間で、画面左端からのパーセントで指定)
posY | String | アニメーション化するアクターに設定するポジションの、Y軸の値 (0から100の間で、画面下部からのパーセントで指定)
posZ | String | アニメーション化するアクターに設定するポジションの、Z軸の値 (ワールドスペース上)。直交モードでは、ソートにのみ使用できます。
rotation | String | アニメーション化するアクターに設定する、Z軸上の回転の値。
scale | String | アニメーション化するアクターに設定する拡大値 (均一)。
tint | String | アニメーション化するアクターに設定する色味。  <br /><br />  `＃`で始まる文字列は、次の記法で16進数とみなされます。`＃RGB`（RRGGBBになります）、 `＃RRGGBB`、`＃RGBA`（RRGGBBAAになります）、 `＃RRGGBBAA`; alphaが指定されていない場合、デフォルトはFFになります。 <br /><br />  `#` で始まらない文字列はリテラル色とみなされ、以下が利用できます: red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta
easing | String | アニメーションに使用するイージング関数の名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、アクターのマネージャーコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | String | キーごとのアニメーションの継続時間(秒単位)。キー値が欠落している場合は、前のキーの値を使用します。値が割り当てられていない場合、すべてのキーの継続時間は0.35秒となります。

</div>

#### 例
```nani
; `Kohaku` アクターを三段階のキーフレームでアニメーション化
; ポジションの変更: 一段階目で1秒、二段階目で0.5秒、三段階目で3秒。
@animate Kohaku posX:50|0|85 time:1|0.5|3

; `Yuko` と `Kohaku` アクターのループアニメーションを開始。スキップ可能です。
; キー値はアニメーション中にパラメーターが変更しないことを示しています。
@animate Kohaku,Yuko loop:true appearance:Surprise|Sad|Default|Angry transition:DropFade|Ripple|Pixelate posX:15|85|50 posY:0|-25|-85 scale:1|1.25|1.85 tint:#25f1f8|lightblue|#ffffff|olive easing:EaseInBounce|EaseInQuad time:3|2|1|0.5 wait:false
...
; アニメーションを停止。
@animate Yuko,Kohaku loop:false

; `Kohaku` の長い背景アニメーションを開始。
@animate Kohaku posX:90|0|90 scale:1|2|1 time:10 wait:false
; アニメーション実行中に別のことを実行。
...
; ここではキャラクターに特定のポジションを設定します。
; しかしバックグラウンドではまだアニメーションが動いているので、最初にリセットしてください。
@animate Kohaku
; これで安全に元のアニメーションプロパティを変更できます。
@char Kohaku pos:50 scale:1
```

## append

#### 概要
指定したテキストをテキストプリンターに追加します。

#### 備考
他のエフェクトや効果を動作させることなく、テキスト全文が即時追加されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Text</span> | String | 追加するテキスト。
printer | String | 使用するプリンターアクターのID。 指定しない場合は、デフォルトを使用します。
author | String | アクターのID。追加するテキストと関連付ける必要があります。

</div>

#### 例
```nani
; 通常どおりに文の最初を表示し（グラデーションでメッセージを表示）、
; 次に文末を一度に追加します。
Lorem ipsum
@append " dolor sit amet."
```

## arrange

#### 概要
指定したキャラクターをX軸に整列します。パラメータが指定されていない場合、X軸で表示キャラクターを均等に自動配置します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">CharacterPositions</span> | List&lt;Named&lt;Decimal&gt;&gt; | シーンX軸に対するポジションとキャラクターID一覧(画面左端を基準としたパーセント)。位置0は画面の左端、100は画面の右端を意味しています。50が中心です。
look | Boolean | 自動配置を実行するときに、キャラクターがシーンの起点で見えるようにするか（デフォルトでは有効）。
time | Decimal | 整列時のアニメーション継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; 表示キャラクターを全て均等に配置
@arrange

; 画面の左端を起点として、
; キャラクターID `Jenna` を15%、 `Felix` を50%、 `Mia` を85%の位置に配置
@arrange Jenna.15,Felix.50,Mia.85
```

## back

#### 概要
[背景アクター](/ja/guide/backgrounds.md) の操作。

#### 備考
従来のビジュアルノベルゲームの仕組みに合わせ、背景の扱いはキャラクターとは少し異なります。ほとんどの場合、シーンに背景アクターが一つ存在し、都度変化します。スクリプトで同じアクターIDを繰り返す手間を省くために、背景の外観とトランジションの種類（オプション）のみを無名パラメーターとして記述することができます。これは `MainBackground` アクターを使用するものとみなされます。それ以外の場合、背景アクターのIDを `id` パラメータで明示的に指定できます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">AppearanceAndTransition</span> | Named&lt;String&gt; | 背景に設定する外観(または [ポーズ](/ja/guide/backgrounds.md#ポーズ))と、[トランジションエフェクト](/ja/guide/transition-effects.md) の種類。
pos | List&lt;Decimal&gt; | 変更するアクターに設定するポジション（画面の端を基準としたパーセント）。ポジションは以下のように記述します: `0,0` が左下、`50,50` が中央、 `100,100` が画面の右上。Zコンポーネント（3つ目のメンバー、たとえば、 `,, 10`）を指定して、直交モードで深度を移動（ソート）します。
id | String | 変更するアクターのID。表示されているすべてのアクターを対象にするには、 `*` を指定します。
appearance | String | 変更するアクターに設定する外観（またはポーズ）。
transition | String | 使用する[トランジションエフェクト](/ja/guide/transition-effects.md)の種類（デフォルトではクロスフェードが使用されます）。
params | List&lt;Decimal&gt; | トランジションエフェクトのパラメーター。
dissolve | String | [カスタムディゾルブ](/ja/guide/transition-effects.md#カスタムトランジションエフェクト) テクスチャへのパス（パスは `Resources`フォルダーからの相対パスで指定）。トランジションが `Custom` モードに設定されている場合に有効です。
visible | Boolean | 変更するアクターの可視状態。
position | List&lt;Decimal&gt; | 変更するアクターに設定するポジション(ワールドスペース内)。 Zコンポーネント（3番目のメンバー）指定すると、直交モードで深度移動（ソート）します。
rotation | List&lt;Decimal&gt; | アクターを回転。
scale | List&lt;Decimal&gt; | アクターを拡大縮小。
tint | String | アクターの色味。 <br /><br />  ＃で始まる文字列は、次の記法で16進数とみなされます。＃RGB（RRGGBBになります）、 ＃RRGGBB、＃RGBA（RRGGBBAAになります）、 ＃RRGGBBAA; alphaが指定されていない場合、デフォルトはFFになります。<br /><br />  `#` で始まらない文字列はリテラル色とみなされ、以下が利用できます: red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta
easing | String | 変更に使用するイージング関数の名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、アクターのマネージャーコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; メイン背景の外観に `River` を設定。
@back River

; 上記に加えてトランジションエフェクト `RadialBlur` を使用。
@back River.RadialBlur

; シーンに表示している全ての背景の色味を変更。
@back id:* tint:#ffdc22

; 効果音 `ExplosionSound` と背景 `ExplosionSprite` を与えた次のスクリプトシーケンスでは、
; カメラの遠近両方で二つの爆発をシミュレートします。
@sfx ExplosionSound volume:0.1
@back id:ExplosionSprite scale:0.3 pos:55,60 time:0 isVisible:false
@back id:ExplosionSprite
@fx ShakeBackground params:,1
@hide ExplosionSprite
@sfx ExplosionSound volume:1.5
@back id:ExplosionSprite pos:65 scale:1
@fx ShakeBackground params:,3
@hide ExplosionSprite
```

## bgm

#### 概要
名前を指定して [BGM (バックグラウンドミュージック)](/ja/guide/audio.md#バックグラウンドミュージック) を再生または再生中のものを変更します。

#### 備考
音楽トラックはデフォルトでループされます。音楽トラック名 (BgmPath) が指定されていない場合は、現在再生されているすべてのトラックに影響します。既に再生中のトラックを呼び出した場合、再生は影響を受けません（トラックの最初から再生を始めることはありません）が、指定したパラメーター(ボリュームとトラックのループ状態)は適用されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">BgmPath</span> | String | 再生する音楽トラックへのパス。
intro | String | メイントラックの前に1回だけ再生されるイントロミュージックトラックへのパス（ループパラメーターの影響を受けません）。
volume | Decimal | 音楽トラックのボリューム。
loop | Boolean | 再生終了時にトラックを最初から再生するかどうか。
fade | Decimal | 再生開始時のボリュームフェードインの時間（デフォルトは0.0）を秒単位で指定。再生中のトラックを変更しても影響はありません。
group | String | 再生中に使用するオーディオミキサーの [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) 。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; 音楽トラック `Sanctuary` のループ再生を開始。
@bgm Sanctuary

; 上記に加えて、ボリュームを10秒間でフェードインさせ、一回だけ再生する。
@bgm Sanctuary fade:10 loop:false

; 再生中のすべての音楽トラックのボリュームを2.5秒かけて50％に変更し、ループで再生。
@bgm volume:0.5 loop:true time:2.5

; `BattleThemeIntro` を一回だけ再生し、その後すぐに `BattleThemeMain` をループ再生する。
@bgm BattleThemeMain intro:BattleThemeIntro
```

## br

#### 概要
テキストプリンターに改行を追加。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Count</span> | Integer | 追加する改行の数。
printer | String | プリンターアクターのID。指定しない場合はデフォルトのものが使用されます。
author | String | アクターのID。追加する改行に関連付ける必要があります。

</div>

#### 例
```nani
; 2番目の文を改行して表示
Lorem ipsum dolor sit amet.[br]Consectetur adipiscing elit.

; 1文目と2文目を2行開けて表示
Lorem ipsum dolor sit amet.[br 2]Consectetur adipiscing elit.
```

## camera

#### 概要
メインカメラを変更し、指定した時間でオフセット、拡大レベル、回転を変更します。[この動画](https://youtu.be/zy28jaMss8w) で簡単にコマンドエフェクトのデモを確認できます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
offset | List&lt;Decimal&gt; | ローカルカメラの位置のオフセットを、X,Y,Z 軸のユニット単位で指定。
roll | Decimal | Z軸に対するローカルカメラの回転角度（0.0〜360.0または-180.0〜180.0）。`rotation` パラメーターの3番目のコンポーネントと同じく、 `rotation` が指定されている場合は無視されます。
rotation | List&lt;Decimal&gt; | X、Y、Z軸上のローカルカメラの回転角度（0.0〜360.0または-180.0〜180.0）。
zoom | Decimal | カメラのズーム（レンダーモードによって、正射投影サイズまたは視野）を0.0（ズームなし）から1.0（フルズーム）の範囲で指定。
ortho | Boolean | カメラを正射投影(true)モードまたは遠近法(false)どちらでレンダーするか。
toggle | List&lt;String&gt; | トグル（無効の場合は有効、有効の場合は無効）するコンポーネントの名前。コンポーネントは、カメラと同じゲームオブジェクトに紐付ける必要があります。これは [カスタムポストプロセッシングエフェクト](/ja/guide/special-effects.md#カメラエフェクト) の切り替えに使用します。
set | List&lt;Named&lt;Boolean&gt;&gt; | 有効または無効にするコンポーネントの名前。コンポーネントは、カメラと同じゲームオブジェクトに紐づける必要があります。これは [カスタムポストプロセッシングエフェクト](/ja/guide/special-effects.md#カメラエフェクト) を明示的に有効または無効にすることができます。指定したコンポーネントが有効になっていると、 `toggle` パラメーターを上書きします。
easing | String | 変更に使用するイージング関数の名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、カメラのコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani

; X軸(パン)に対してカメラのオフセットを -3 ユニット、Y軸に対してオフセットを 1.5 ユニットに設定。
@camera offset:-3,1.5

; カメラをパースペクティブモードに設定し、ズームを50％に設定、5 ユニット後退
@camera ortho:false offset:,,-5 zoom:0.5

; カメラを正投影モードに設定し、時計回りに10度回転
@camera ortho:true roll:10

; オフセット、ズーム、ロールを同時に5秒間でアニメーション化
@camera offset:-3,1.5 zoom:0.5 roll:10 time:5

; カメラを即座にデフォルト状態にリセット
@camera offset:0,0 zoom:0 rotation:0,0,0 time:0

; カメラに紐付いたコンポーネント `FancyCameraFilter` と `Bloom` をトグル。
@camera toggle:FancyCameraFilter,Bloom

; `FancyCameraFilter` コンポーネントを有効にし、 `Bloom` を無効にする。
@camera set:FancyCameraFilter.true,Bloom.false
```

## char

#### 概要
[キャラクターアクター](/ja/guide/characters.md) を操作します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">IdAndAppearance</span> | Named&lt;String&gt; | 変更するキャラクターのID (全てのキャラクターを対象とするには `*` を指定) と外観 (または[ポーズ](/ja/guide/characters.md#ポーズ)) を設定。外観を指定しない場合は、`Default` (存在する場合) またはランダムになります。
look | String | アクターの向き。サポートされている値: left, right, center
avatar | String | キャラクターに設定する [アバターテクスチャ](/ja/guide/characters.md#アバターテクスチャ) の名前(パス)。キャラクターからアバターの設定を解除するには `none` を指定。
pos | List&lt;Decimal&gt; | 変更するアクターに設定するポジション（画面の境界を基準としたパーセント）。ポジションは以下の方法で記述: 画面端から左下は `0,0` 、 `50,50` で中央、 `100,100` で右上。 Zコンポーネント（3番目のメンバー、たとえば、 `,,10`）を使用して、直交モードで深度を移動（ソート）します。
id | String | 変更するアクターのID。表示中の全てのキャラクターを対象とするには `*` を指定。
appearance | String | 変更するアクターに設定する外観(またはポーズ)。
transition | String | 使用する [トランジションエフェクト](/ja/guide/transition-effects.md) の種類 (デフォルトでクロスフェードが使用されます).
params | List&lt;Decimal&gt; | トランジションエフェクトのパラメーター。
dissolve | String | [カスタムディゾルブ](/ja/guide/transition-effects.md#カスタムトランジションエフェクト) テクスチャーへのパス （パスは `Resources` フォルダーからの相対パスで指定します。トランジションが `Custom` モードに設定されている場合にのみ有効です。
visible | Boolean | 変更するアクターに設定する表示状態。
position | List&lt;Decimal&gt; | 変更するアクターに設定するポジション(ワールドスペース内) 。Zコンポーネント（3番目のメンバー、たとえば、 `,,10`）を使用して、直交モードで深度を移動（ソート）します。
rotation | List&lt;Decimal&gt; | 変更するアクターに設定する回転。
scale | List&lt;Decimal&gt; | 変更するアクターに設定するスケール。
tint | String | 変更するアクターに設定する色味。 <br /><br />  ＃で始まる文字列は、次の記法で16進数とみなされます。＃RGB（RRGGBBになります）、 ＃RRGGBB、＃RGBA（RRGGBBAAになります）、 ＃RRGGBBAA; alphaが指定されていない場合、デフォルトはFFになります。   <br /><br />  `#` で始まらない文字列はリテラル色とみなされ、以下が利用できます: red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta
easing | String | 変更に使用するイージング関数の名前。変更する際のイージングの名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、アクターのマネージャーコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; キャラクターID `Sora` をデフォルトの外観で表示。
@char Sora

; 同様に、外観に `Happy` を設定。
@char Sora.Happy

; 上記と同じですが、キャラクターを画面の左端から45％、下端から10％の位置に配置します。
; また、左を向かせます。
@char Sora.Happy look:left pos:45,10

; Sora を Felix の手前かつ中央下に表示させます。
@char Sora pos:50,0,-1
@char Felix pos:,,0

; 表示している全てのキャラクターの色味を変えます。
@char * tint:#ffdc22
```

## choice

#### 概要
IDを指定(またはデフォルトのまま)して選択肢ハンドラーに [選択肢](/ja/guide/choices.md) を追加します。

#### 備考
`goto`、 `gosub`、 `do` パラメータが指定されていない場合、スクリプトの実行は次のスクリプト行から続行されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">ChoiceSummary</span> | String | 選択肢に表示するテキスト。テキストにスペースが含まれる場合は、ダブルクオーテーション (`"`) で囲みます。テキスト自体にダブルクオーテーションを含める場合は、エスケープします。
button | String | 選択肢を表す [ボタンプレハブ](/ja/guide/choices.md#選択ボタン) へのパス (`Resources`フォルダーからの相対パス)。このプレハブには、ルートオブジェクトに関連づけられた `ChoiceHandlerButton` コンポーネントが必要です。指定がない場合はデフォルトのボタンを使用します。
pos | List&lt;Decimal&gt; | 選択肢ハンドラー内の選択肢ボタンのローカルポジション（ハンドラーの実装でサポートされている場合）。
handler | String | 選択肢を追加する選択肢ハンドラのID。 指定しない場合、デフォルトのハンドラーを使用します。
goto | Named&lt;String&gt; | 選択肢を選んだ時の行き先。パスの形式については、 [@goto] コマンドを参照してください。
gosub | Named&lt;String&gt; | ユーザーが選択肢を選択したときに移動するサブルーチンへのパス。 パスの形式については、   [@gosub] コマンドを参照してください。 `goto` が割り当てられている場合、このパラメーターは無視されます。
set | String | 選択肢がユーザーによって選択されたときに実行する式を設定します。 構文リファレンスについては、 [@set] コマンドを参照してください。
do | List&lt;String&gt; | ユーザーが選択肢を選択したときに実行するスクリプトコマンド。区切り文字として扱われないように、必ずリスト値の中でコンマをエスケープしてください。コマンドは、 `set`、 `goto` 、 `gosub` が処理された後順に呼び出されます (割り当てられている場合)。
show | Boolean | 選択肢を追加する選択肢ハンドラも表示するかどうか。デフォルトは有効。
time | Decimal | フェードイン(表示)の継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; テキストを表示し、すぐに選択肢を表示してスクリプトの実行を停止。
; このスクリプトの実行を続けるかそれとも、...？[skipInput]
@choice "Continue"
@choice "Load another script from start" goto:AnotherScript
@choice "Load another script from \"MyLabel\" label" goto:AnotherScript.MyLabel
@choice "Goto to \"MySub\" subroutine in another script" gosub:AnotherScript.MySub
@stop

; 選択肢にカスタム変数を設定することもできます。
@choice "I'm humble, one is enough..." set:score++
@choice "Two, please." set:score=score+2
@choice "I'll take the entire stock!" set:karma--;score=999

; 効果音を再生し、選択肢が選択されたときにキャラクターの配置を設定。
@choice "Arrange" goto:.Continue do:"@sfx Click, @arrange k.10\,y.55"

; 次の例は、  `@choice` コマンドを使用してインタラクティブマップを作成する方法です。
; この例では `Resources/MapButtons` フォルダに、
; ルートオブジェクトに紐付けられた `ChoiceHandlerButton`コンポーネントを追加済みのプレハブがあるものとします。
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:.ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto .Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto .Map
```

## clearBacklog

#### 概要
[テキストバックログ](/ja/guide/text-printers.md#テキストバックログ) から全てのメッセージを削除。

#### 例
```nani
@clearBacklog
```

## clearChoice

#### 概要
指定したID（IDが指定されていない場合はデフォルトの選択肢、`*` がIDとして指定されている場合はすべての既存のハンドラー）の選択肢ハンドラーの選択肢を全て削除し、非表示にします(オプション)。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">HandlerId</span> | String | クリアする選択肢ハンドラーのID。指定しない場合、デフォルトのハンドラーを使用します。既存のハンドラーをすべてクリアするには、 `*` を指定します。
hide | Boolean | 影響を受けるプリンターも非表示にするかどうか。

</div>

#### 例
```nani
; 選択肢を追加し、プレーヤーが選択しなかった場合は設定時間後に選択肢を削除。
# Start
You have 2 seconds to respond![skipInput]
@choice "Cats" goto:.PickedChoice
@choice "Dogs" goto:.PickedChoice
@wait 2
@clearChoice
Too late!
@goto .Start
# PickedChoice
Good!
```

## despawn

#### 概要
[@spawn] コマンドで生成されたオブジェクトを破棄します。

#### 備考
プレハブに `UnityEngine.MonoBehaviour` コンポーネントが追加されルートオブジェクトに関連づけられており、かつコンポーネントが `Naninovel.Commands.DestroySpawned.IParameterized` インターフェースを実装している場合、オブジェクトを破棄する前に指定した `params` 値を渡します。コンポーネントが `Naninovel.Commands.DestroySpawned.IAwaitable` を実装している場合、コマンドの実行はオブジェクトを破棄する前に実装によって返された非同期完了タスクを待ちます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | 破棄するプレハブリソースの名前（パス）。 同じパラメータを持つ [@spawn] コマンドを、事前に実行することが望ましい。
params | List&lt;String&gt; | プレハブを破棄する前に設定するパラメーター。プレハブにはルートオブジェクトに紐付けられた `Naninovel.Commands.DestroySpawned.IParameterized` コンポーネントが必要です。

</div>

#### 例
```nani
; "@spawn Rainbow" を事前に実行しています
@despawn Rainbow
```

## else

#### 概要
条件分岐のブランチ。開始の [@if]コマンドとすべての先行する [@elseif]（存在する場合）コマンドの条件が満たされない場合は常に実行されます。 使用例については、 [条件分岐](/ja/guide/naninovel-scripts.md#条件分岐) ガイドを参照してください。

## elseIf

#### 概要
条件分岐のブランチ。独自の条件が満たされた場合（式が真であると評価された場合）かつ、開始の [@if] と先行する全ての [@elseif] (存在する場合) の条件が満たされていない場合に実行されます。使用例については、 [条件分岐](/ja/guide/naninovel-scripts.md#条件分岐) ガイドを参照してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | [スクリプト表記](/ja/guide/script-expressions.md)。boolean 値を返します.

</div>

## endIf

#### 概要
[@if] 条件分岐を閉じます。使用例については、 [条件分岐](/ja/guide/naninovel-scripts.md#条件分岐) ガイドを参照してください。

## finishTrans

#### 概要
 [@startTrans] コマンドで開始したシーントランジションを終了します。詳細および使用例については、startコマンドリファレンスを参照してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Transition</span> | String | 使用する [トランジションエフェクト](/ja/guide/transition-effects.md) の種類 （デフォルトでクロスフェードが使用されます）。
params | List&lt;Decimal&gt; | トランジションエフェクトのパラメーター。
dissolve | String |  [カスタムディゾルブ](/ja/guide/transition-effects.md#カスタムトランジションエフェクト) テクスチャーへのパス（パスは `Resources` フォルダーからの相対パスで指定します）。トランジションが `Custom` モードに設定されている場合にのみ有効です。
easing | String | 変更に使用するイージング関数の名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、アクターのマネージャーコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | Decimal | トランジションの継続時間(秒単位) 。デフォルト値: 0.35秒。

</div>

## gosub

#### 概要
naninovelスクリプトの再生を指定されたパスにジャンプし、そのパスをグローバル状態に保存します。 [@return] コマンドはこの情報により、最後に呼び出された gosub コマンドの後にリダイレクトします。プログラミング言語で関数（サブルーチン）として機能するように設計されており、naninovelスクリプトの一部を再利用できます。コマンドの繰り返しセットを複数回呼び出すのに便利です。

#### 備考
現在再生されているスクリプトの外で gosub を宣言し、他のスクリプトから利用できます。 デフォルトでは画面の読み込みの遅延を防ぐため、gosub を再生する別のスクリプトを読み込んでいるときや、戻ってくる時には状態のリセットは行われません。ただし、gosub スクリプトで参照されるすべてのリソースは、次に状態がリセットされるまで保持されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | 次の形式でパスを指定:  `ScriptName.LabelName` ラベル名を省略した場合、指定されたスクリプトを最初から再生します。スクリプト名が省略されている場合は、現在再生されているスクリプトの中でラベル名を検索します。
reset | List&lt;String&gt; | 指定すると、スクリプトを読み込む前にエンジンサービスの状態がリセットされます（パスで別のスクリプト飛ばす場合）。 すべてのサービス（変数マネージャーを除く）をリセットするには `*` を指定するか、リセットから除外するサービス名を指定します。デフォルトでは、状態はリセットされません。

</div>

#### 例
```nani
; 現在再生されているスクリプトのラベル `VictoryScene` に移動し、
; コマンドを実行し、 `gosub` の後のコマンドに戻ります。
@gosub .VictoryScene

...
@stop

# VictoryScene
@back Victory
@sfx Fireworks
@bgm Fanfares
You are victorious!
@return

; サブルーチン内にいくつかの分岐がある例。
@set time=10
; 一つ目の結果です
@gosub .Room
...
@set time=3
; もう一つの結果です
@gosub .Room
...

# Room
@print "It's too early, I should visit this place when it's dark." if:time<21&&time>6
@print "I can sense an ominous presence here!" if:time>21&&time<6
@return
```

## goto

#### 概要
naninovelスクリプトの再生を指定したパスへ移動します。パスの先が別の（現在再生されていない）naninovelスクリプトの場合、コンフィグで [ResetStateOnLoad](https://naninovel.com/guide/configuration.html#state) が無効になっていない限り、目標のスクリプトをロードする前に [reset state](/ja/api/#resetstate) を実行します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | Named&lt;String&gt; | 次の形式でパスを指定: `ScriptName.LabelName` ラベル名を省略した場合、指定されたスクリプトを最初から再生します。スクリプト名が省略されている場合は、現在再生されているスクリプトの中でラベル名を検索します。
reset | List&lt;String&gt; | 指定すると、スクリプトを読み込む前にエンジンサービスの状態がリセットされます（パスで別のスクリプト飛ばす場合）。 すべてのサービス（変数マネージャーを除く）をリセットするには `*` を指定するか、リセットから除外するサービス名を指定します。（設定でデフォルトが有効になっている場合でも）強制的にリセットさせないためには `-` を指定します。デフォルト値はエンジンコンフィグメニューの `Reset State On Load` で指定できます。

</div>

#### 例
```nani
; `Script001` というnaninovelスクリプトをロードして最初から再生を開始します。
@goto Script001

; 上記に加えて、 `AfterStorm` ラベルから再生するようにします。
@goto Script001.AfterStorm

; 現在再生しているスクリプトのラベル `Epilogue` に移動します。
@goto .Epilogue

; Script001を読み込みますが、オーディオマネージャはリセットしません（再生中のオーディオが中断されることはありません）。
; サービスフォームの状態のリセットを除外すると、関連するリソースがメモリに残ります。
@goto Script001 reset:IAudioManager
```

## hide

#### 概要

指定したIDのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラーなど）を非表示にします。同じIDを持つ複数のアクターが見つかった場合（例: キャラクターとプリンター）、最初に見つかったアクターのみに影響します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | 非表示にするアクターのID。
time | Decimal | フェードアニメーションの継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; ID `SomeActor` のアクターが表示されているとき、3秒かけて非表示（フェードアウト）にする。
@hide SomeActor time:3

; `Kohaku` と `Yuko` のアクターを非表示にする。
@hide Kohaku,Yuko
```

## hideAll

#### 概要
シーン上のすべてのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラーなど）を非表示（削除）にします。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
time | Decimal | フェードアニメーションの継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
@hideAll
```

## hideChars

#### 概要
シーンに表示中の全てのキャラクターを非表示(削除)にします。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
time | Decimal | フェードアニメーションの継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
@hideChars
```

## hidePrinter

#### 概要
テキストプリンターを非表示にします。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | 使用するプリンターアクターのID。指定しない場合、デフォルトのものを使用します。
time | Decimal | 非表示アニメーションの継続時間(秒単位) 。 各プリンターのデフォルト値は、アクターのコンフィグで設定されています。

</div>

#### 例
```nani
; デフォルトのプリンターを非表示にする。
@hidePrinter
; ID `Wide` のプリンターを非表示にする。
@hidePrinter Wide
```

## hideUI

#### 概要
指定した名前の [UI要素](/ja/guide/user-interface.md#カスタムUI) を非表示にします。名前を指定しない場合、UI全体（すべての組み込みUIを含む）のレンダリングを停止（非表示）します。

#### 備考
`allowToggle` パラメーターがfalse（デフォルト）の時にこのコマンドでUI全体を非表示にした場合、ユーザーはホットキーや画面の任意の場所をクリックして、UIを再表示することはできません。[@showUI] コマンドを使用して、UIを~~ great ~~に再表示します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">UINames</span> | List&lt;String&gt; | 非表示にするUI要素。
allowToggle | Boolean | UI全体を非表示にする場合、ユーザーがホットキーを使用したり、画面上の任意の場所をクリックしたりしてUIを再表示できるようにするかを制御します（デフォルトではfalse）。特定のUIを非表示にする場合は影響しません。
time | Decimal | 非表示アニメーションの継続時間(秒単位)。指定しない場合、UI固有の時間を使用します。

</div>

#### 例
```nani
; カスタムの `Calendar` UIがあり、次のコマンドでそれを非表示にします。
@hideUI Calendar

; UI全体を非表示にし、ユーザーが再表示できないようにします。
@hideUI
...
; UIを再び表示する。
@showUI

; UI全体を非表示にするが、ユーザーは元に戻すことができる。
@hideUI allowToggle:true

; 組み込みの `TipsUI` とカスタムの `Calendar` UIを同時に非表示にします。
@hideUI TipsUI,Calendar
```

## i

#### 概要

ユーザーが `続行` 操作を入力するまでスクリプトの実行を停止します。`@wait i` のショートカット。

#### 例
```nani
; ユーザーは最初の文の後で `続行` 操作を入力する必要があります。
; そうするとプリンターが次のテキストを表示します。
Lorem ipsum dolor sit amet.[i] Consectetur adipiscing elit.
```

## if

#### 概要
条件分岐の開始を宣言します。必ず [@endif] コマンドで閉じる必要があります。使用例については、 [条件分岐](/ja/guide/naninovel-scripts.md#条件分岐) ガイドを参照してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | ブール値を返す[スクリプト表記](/ja/guide/script-expressions.md)。

</div>

## input

#### 概要
ユーザーが任意のテキストを入力できる入力フィールドUIを表示います。送信すると、入力したテキストが指定したカスタム変数に割り当てられます。

#### 備考
使用例はこの [動画ガイド](https://youtu.be/F9meuMzvGJw) をご覧ください。<br /><br /> このコマンドを使用してキャラクターに表示名を割り当てるには、[名前をカスタム変数にバインドする](/ja/guide/characters.html#表示名)ことを検討してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">VariableName</span> | String | 入力したテキストが割り当てられるカスタム変数の名前。
summary | String | 入力フィールドとともに表示する任意の説明テキスト。テキストにスペースが含まれる場合は、二重引用符(`"`)で囲みます。テキスト自体に二重引用符を含める場合は、エスケープします。
value | String | 入力フィールドに設定するデフォルト値。
play | Boolean | ユーザーが入力フォームを送信したときにスクリプトの実行を自動的に再開するかどうか。

</div>

#### 例
```nani
; ユーザーに任意のテキストを入力させ、それをカスタムステート変数 `name` に割り当てます。
@input name summary:"Choose your name."
; ユーザーが入力を送信するまでスクリプトの実行を停止させるため、停止コマンドが必要です
@stop

; これで割り当てられた `name` 変数をnaninovelスクリプトに挿入できます。
Archibald: Greetings, {name}!
{name}: Yo!

; または、setや条件式の中で使用することもできます。
@set score=score+1 if:name=="Felix"
```

## lipSync

#### 概要
指定したIDのキャラクターの口パクアニメーションを強制停止できます。停止すると、このコマンドを再度使用して許可するまで、アニメーションは再開されません。キャラクターは口パクイベントを受信できる必要があります（現在、一般およびLive2D実装のみ）。口パク機能の詳細については、[キャラクターガイド](/ja/guide/characters.md#口パク) をご覧ください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">CharIdAndAllow</span> | Named&lt;Boolean&gt; | キャラクターID。口パクアニメーションを停止するか許可するかについてのブール値（trueまたはfalse）を後に続けます。

</div>

#### 例
```nani
; 自動アテレコ機能は無効になっており、口パクがテキストメッセージによって起動されているとします。
; 口パクアニメーションから句読点を除外します。
Kohaku: Lorem ipsum dolor sit amet[lipSync Kohaku.false]... [lipSync Kohaku.true]Consectetur adipiscing elit.
```

## loadScene

#### 概要
指定した名前の [Unity シーン](https://docs.unity3d.com/Manual/CreatingScenes.html) をロードします。必要なシーンを[ビルド設定](https://docs.unity3d.com/Manual/BuildSettings.html) に追加して、ロードできるようにしておいてください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">SceneName</span> | String | ロードするシーンの名前。
additive | Boolean | シーンを追加でロードするか、現在ロードされているシーンをアンロードしてから新しいシーンをロードするか（デフォルト）。詳細は [シーンロードドキュメント](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html) をご覧ください。

</div>

#### 例
```nani
; シーン "MyTestScene" をシングルモードでロード。
@loadScene MyTestScene
; シーン "MyTestScene" を追加モードでロード。
@loadScene MyTestScene additive:true
```

## lock

#### 概要
提供したIDで[収集アイテム](/ja/guide/unlockable-items.md) を"ロックされた"状態に設定します。

#### 備考
アイテムのロック状態は [グローバルスコープ](/ja/guide/state-management.md#グローバルステート) に保存されています。<br />  指定されたIDのアイテムがグローバルステートマップに登録されていない場合、対応するレコードが自動的に追加されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | 収集アイテムのID。登録した収集アイテムを全てロックするには `*` を使用します。

</div>

#### 例
```nani
@lock CG/FightScene1
```

## look

#### 概要
プレーヤーがメインカメラを入力デバイスで移動できる場合（たとえば、マウスを動かすか、ゲームパッドのアナログスティックを使用して）、カメラルックモードをアクティブ化/無効化します。 コマンドの簡単なデモについては、[このビデオ](https://youtu.be/rC6C9mA7Szw) を確認してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
enable | Boolean | カメラルックモードを有効にするか無効にするか。デフォルト: true。
zone | List&lt;Decimal&gt; | カメラの初期位置からのX、Yサイズを単位とする境界ボックス。カメラの移動距離を示します。 デフォルト: 5、3。
speed | List&lt;Decimal&gt; | X、Y軸によるカメラの移動速度（感度）。デフォルト: 1.5,1。
gravity | Boolean | ルック入力がアクティブでない場合（たとえば、マウスが移動していないか、アナログスティックがデフォルトの位置にある場合）に、カメラを自動的に初期位置に移動するかどうか。 デフォルト: false。

</div>

#### 例
```nani
; デフォルトのパラメータでカメラのルックモードを起動。
@look

; カスタムパラメータでカメラのルックモードを起動。
@look zone:6.5,4 speed:3,2.5 gravity:true

; カメラルックモードを無効にし、カメラオフセットを無効にする。
@look enabled:false
@camera offset:0,0
```

## movie

#### 概要
指定した名前(パス)で動画を再生します。

#### 備考
動画を再生する前に画面をフェードアウトし、再生後にフェードインします。`cancel` 入力（デフォルトでは`Esc` キー）を操作すると、再生をキャンセルできます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">MovieName</span> | String | 再生する動画リソースの名前。

</div>

#### 例
```nani
; ビデオクリップ "Opening" がムービーリソースに追加されており、それを再生。
@movie Opening
```

## print

#### 概要
テキストプリンターアクターを使用して、指定したテキストメッセージを表示（時間をかけて表示）します。

#### 備考
このコマンドは、一般テキストを処理するときに内部で使用されます。たとえば、一般行 `Kohaku: Hello World!` は、naninovelスクリプトを解析するとき自動的に `@print "Hello World!" author:Kohaku` に変換されます。<br />デフォルトでは、新しいメッセージを表示する前にプリンターをリセット（クリア）します。それを防いで代わりにテキストを追加するには、`reset` パラメーターを *false* に設定するか、プリンターアクターの設定で `Auto Reset` を無効にします。<br /> デフォルトでは、タスクを完了する前にユーザー入力を待ちます。テキストを完全に表示したあとすぐに戻るには、`waitInput` パラメーターを *false* に設定するか、プリンターアクターコンフィグで `Auto Wait`を無効にします。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Text</span> | String | 表示するテキスト。テキストにスペースが含まれる場合は、二重引用符(`"`)で囲みます。テキスト自体に二重引用符を含める場合は、エスケープします。
printer | String | 使用するプリンターアクターのID。指定しない場合、デフォルトのものを使用します。
author | String | アクターのID。表示メッセージに紐付けられます。
speed | Decimal | テキスト表示速度の乗数。正またはゼロでなければなりません。1はデフォルトの速度になります。
reset | Boolean | 表示タスクを実行する前にプリンターのテキストをリセットするかどうか。デフォルト値は、プリンターアクターコンフィグメニューの `Auto Reset` プロパティで制御されます。
default | Boolean | 表示タスクを実行する前に、プリンターをデフォルトにして他のプリンターを非表示にするかどうか。 デフォルト値は、プリンターアクターコンフィグメニューの `Auto Default` プロパティで制御されます。
waitInput | Boolean | 表示タスクの終了後にユーザー入力を待つかどうか。デフォルト値は、プリンターアクターコンフィグメニューの `Auto Wait` プロパティで制御されます。
br | Integer | 表示テキストの前に追加する改行の数。デフォルト値は、プリンターアクターコンフィグメニューの `Auto Line Break` プロパティで制御されます。
fadeTime | Decimal | このコマンドに紐づいているプリンターのアニメーションを表示および非表示にする時間（秒単位）を制御します。各プリンターのデフォルト値は、アクターのコンフィグで設定されています。

</div>

#### 例
```nani
; デフォルトのプリンターで文章を表示。
@print "Lorem ipsum dolor sit amet."

; テキスト自体に引用符を含めるには、エスケープします。
@print "Saying \"Stop the car\" was a mistake."

; 通常の半分の速度でメッセージを表示し、
; ユーザー入力が実行されるのを待たない。
@print "Lorem ipsum dolor sit amet." speed:0.5 waitInput:false
```

## printer

#### 概要
[テキストプリンターアクター](/ja/guide/text-printers.md) を編集します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">IdAndAppearance</span> | Named&lt;String&gt; | 変更するプリンターのIDと設定する外観。IDまたは外観が指定されていない場合は、デフォルトのものを使用します。
default | Boolean | プリンターをデフォルトにするかどうか。デフォルトのプリンターは、`printer` パラメーターが指定されていない場合、プリンター関連のすべてのコマンドの対象になります。
hideOther | Boolean | 他のすべてのプリンターを非表示にするかどうか。
pos | List&lt;Decimal&gt; | 変更するプリンターに設定するポジション（画面の端を基準としたパーセント）。ポジションは以下のように記述します: `0,0` が左下、`50,50` が中央、 `100,100` が画面の右上。
visible | Boolean | プリンターを表示するか非表示にするか。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; `Wide` プリンターをデフォルトにし、他の表示中のプリンターを非表示にします。
@printer Wide

; `Bubble` プリンタに `Right` の外観を割り当て、デフォルトにします。
; 画面の中央に配置し、他のプリンターは非表示にしません。
@printer Bubble.Right pos:50,50 hideOther:false
```

## processInput

#### 概要
ユーザー入力処理の停止と再開を許可します（たとえば、キーボードのキーを押したときの反応）。アクションの効果は永続的であり、ゲームとともにセーブされます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">InputEnabled</span> | Boolean | 入力処理を有効にするかどうか。

</div>

#### 例
```nani
; 入力処理を停止。
@processInput false
; 入力処理を再開。
@processInput true
```

## purgeRollback

#### 概要
プレーヤーが前の状態のスナップショットに巻き戻しできないようにします。

#### 例
```nani
; ユーザーが巻き戻しで他の選択肢を選ぶことをさせないようにする。

@choice "One" goto:.One
@choice "Two" goto:.Two
@stop

# One
@purgeRollback
You've picked one.

# Two
@purgeRollback
You've picked two.
```

## resetState

#### 概要
[エンジンサービス](https://naninovel.com/guide/engine-services.html) の状態をリセットし、Naninovelによってロードされたすべてのリソース（テクスチャ、オーディオ、ビデオなど）をアンロード（破棄）します。基本的に空の初期エンジン状態に戻ります。

#### 備考

プロセスは非同期であり、ロード画面でマスクされています([ILoadingUI](/ja/guide/user-interface.html#カスタムUI))。 <br /><br /> コンフィグで [ResetStateOnLoad](/ja/guide/configuration.html#state) が無効の場合、このコマンドを使用して未使用のリソースを手動で破棄し、メモリリークの問題を回避できます。<br /><br /> このコマンドは元に戻せない（巻き戻しできない）ことに注意してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Exclude</span> | List&lt;String&gt; | リセットから除外する[エンジンサービス](/ja/guide/engine-services.html) （インターフェース）の名前。パラメータを指定するときは、ローカル変数を保持するために常に `ICustomVariableManager` を追加することを検討してください。

</div>

#### 例
```nani
; 全てのサービスをリセット。
@resetState

; 変数マネージャーとオーディオマネージャーを除くすべてのサービスをリセット（現在のオーディオは引き続き再生されます）。
@resetState ICustomVariableManager,IAudioManager
```

## resetText

#### 概要
テキストプリンターの内容をリセット（クリア）します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | 使用するプリンターアクターのID。指定しない場合、デフォルトのものを使用します。

</div>

#### 例
```nani
; デフォルトプリンターの内容をクリア。
@resetText
; IDが `Fullscreen` のプリンタのコンテンツをクリア。
@resetText Fullscreen
```

## return

#### 概要

最後に使用された [@gosub] のコマンドの後に、naninovelスクリプトの再生をジャンプします。詳細と使用例については、[@gosub] コマンドの概要を参照してください。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
reset | List&lt;String&gt; | 指定すると、gosubが入力された元のスクリプトに戻る前に、エンジンサービスのステートがリセットされます（元のスクリプトが再生中のスクリプトと異なる場合）。すべてのサービス（変数マネージャーを除く）をリセットするには、 `*` を指定します。またはリセットから除外するには、サービス名を指定します。デフォルトでは、ステートはリセットされません。

</div>

## save

#### 概要
ゲームをクイックセーブスロットに自動的に保存します。

#### 例
```nani
@save
```

## set

#### 概要
[式](/ja/guide/script-expressions.md) の結果を [カスタム変数](/ja/guide/custom-variables.md) にセットします。

#### 備考

変数名は英数字（ラテン文字のみ）である必要があり、下線を含めることができます。例: `name`、` Char1Score`、 `my_score`。名前は大文字と小文字を区別しません。例: `myscore`は` MyScore`と同じです。指定した名前の変数が存在しない場合は、自動的に作成されます。<br /><br />`;`で区切ることにより、1行で複数のセット式を定義できます。式は宣言順に実行されます。 <br /><br /> カスタム変数はデフォルトで **ローカルスコープ** に保存されます。つまり、ゲームプレイ中に変数を割り当て、プレーヤーが新しいゲームを開始したり、その変数が割り当てられていない別の保存済みゲームスロットを読み込んだりすると、値は失われます。これはほとんどの変数に便利です。しかし、もし **グローバルスコープ** に変数を保存したい場合は、変数名に `G_` か `g_` を付与してください。例: `G_FinishedMainRoute` または `g_total_score`。<br /><br />変数名が `T_` か `t_` で始まる場合、'Script' [テキスト管理](/ja/guide/managed-text.md)ドキュメントに保存されている値への参照と見なされます。このような変数は利用できず、主にローカライズするテキスト値を参照するために使用します。 <br /><br /> `CustomVariableManager` [エンジンサービス](/ja/guide/engine-services.md) を介して C# スクリプトでカスタム変数を取得および設定できます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Expression</span> | String | セット式。  <br /><br />  式は次のフォーマットで指定します: `VariableName=ExpressionBody`、ここで `VariableName` は割り当てるカスタム変数の名前で、 `ExpressionBody` は [スクリプト式](/ja/guide/script-expressions.md) です。この結果が変数に割り当てられます。<br /><br />  単項演算子のインクリメントおよびデクリメントを使用することもできます。例：`@set foo++`、 `@set foo--`。

</div>

#### 例
```nani
; 変数 `foo` にストリング値 `bar` を割り当てる。
@set foo="bar"

; 変数 `foo` に数値1を割り当てる。
@set foo=1

; 変数 `foo` にブール値 `true` を割り当てる。
@set foo=true

; `foo` が数値なら、値に0.5を足す。
@set foo=foo+0.5

; `angle` が数値の場合、その余弦を「結果」変数に割り当てる。
@set result=Cos(angle)

; -100〜100のランダムな整数を取得し、4を累乗して、`result` 変数に割り当てる。
@set "result = Pow(Random(-100, 100), 4)"

; `foo` が数値なら、値に1を足す
@set foo++

; `foo` が数値なら、値から1を引く
@set foo--

; `bar` 変数に `foo` 変数の値を割り当てます。これは `Hello World!` です。
; `bar` 変数は実在する必要があります。そうでなければ、代わりにプレーンテキスト値 `bar` が割り当てられます。
@set bar="Hello World!"
@set foo=bar

; 1行で複数のセット式を定義する（結果は上記と同じになります）。
@set bar="Hello World!";foo=bar

; naninovelスクリプトコマンドパラメーターに変数を挿入することが可能です。
@set scale=0
# EnlargeLoop
@char Misaki.Default scale:{scale}
@set scale=scale+0.1
@goto .EnlargeLoop if:scale<1

; 一般テキスト行も同様です。
@set name="Dr. Stein";drink="Dr. Pepper"
{name}: My favourite drink is {drink}!

; 式自体の内部で二重引用符を使用する場合は、2回エスケープするのを忘れないでください。
@set remark="Saying \\"Stop the car\\" was a mistake."
```

## sfx

#### 概要
指定した名前で [SFX (sound effect)](/ja/guide/audio.md#効果音) トラックを再生または再生中のものを変更します。

#### 備考
効果音はデフォルトではループしません。効果音のトラック名が (SfxPath) 指定されていない場合は、再生中の全てのトラックが影響を受けます。既に再生中のトラックに対して呼び出された場合、再生は影響を受けません（トラックが最初から再生されることはありません）が、指定したパラメーター（ボリュームとトラックのループ状態）には影響します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | 再生する効果音アセットのパス。
volume | Decimal | 効果音のボリューム。
loop | Boolean | 効果音をループ再生するかどうか。
fade | Decimal | 再生開始時のボリュームフェードインの時間（デフォルトは0.0）を秒単位で指定。再生中のトラックを変更しても影響はありません。
group | String | オーディオ再生時に使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。
time | Decimal | 継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; `Explosion` という名前の効果音を一度だけ再生する。
@sfx Explosion

; `Rain` という名前の効果音をループで、かつ30秒かけてフェードインして再生する。
@sfx Rain loop:true fade:30

; 再生中の全ての効果音のボリュームを2.5秒かけて75%に変更し、かつ全てループさせない。
@sfx volume:0.75 loop:false time:2.5
```

## show

#### 概要
指定したIDのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラーなど）を表示します。同じIDを持つ複数のアアクターがある場合（たとえば、キャラクターとプリンター）、最初に見つかったものだけに影響します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">ActorIds</span> | List&lt;String&gt; | 表示するアクターのID。
time | Decimal | フェードアニメーションの継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; `SomeActor` というIDのアクターがあり非表示になっている時、3秒かけて表示(フェードイン)します。
@show SomeActor time:3

; `Kohaku` と `Yuko` のアクターを表示。
@show Kohaku,Yuko
```

## showPrinter

#### 概要
テキストプリンターを表示します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">PrinterId</span> | String | 使用するプリンターアクターのID。指定しない場合、デフォルトのものを使用します。
time | Decimal | 表示アニメーションの継続時間(秒単位) 。各プリンターのデフォルト値は、アクターのコンフィグで設定されています。

</div>

#### 例
```nani
; デフォルトのプリンターを表示。
@showPrinter
; IDが `Wide` のプリンターを表示。
@showPrinter Wide
```

## showUI

#### 概要

指定されたプレハブ名の [UI要素](/ja/guide/user-interface.md) を表示します。名前が指定されていない場合、UI全体が表示されます（[@hideUI] で非表示になっている場合）。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">UINames</span> | List&lt;String&gt; | 表示するUIプレハブの名前。
time | Decimal | 表示アニメーションの継続時間(秒単位) 。指定しない場合、UI固有の時間を使用します。

</div>

#### 例
```nani
; `Calendar` というプレハブ名のカスタムUIを追加したとすると、
; 次のようにすると、シーンに表示されます。
@showUI Calendar

; UI全体を @hideUI で非表示にしたとして、それを戻します。
@showUI

; 組み込みの `TipsUI` とカスタムの `Calendar` UIを同時に表示します。
@showUI TipsUI,Calendar
```

## skip

#### 概要
スクリプトプレーヤーの "skip" モードを有効または無効にできます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">Enable</span> | Boolean | スキップモードを有効にするか（デフォルト）、無効にするか。

</div>

#### 例
```nani
; スキップモードを有効にする。
@skip
; スキップモードを無効にする。
@skip false
```

## skipInput

#### 概要
一般テキストで使用して、テキストの表示時に `入力待ち` モードをアクティブにしないようにします。

#### 例
```nani
; スクリプトプレーヤーは、`continue` 入力を待たずに `@sfx` コマンドを実行します。
And the rain starts.[skipInput]
@sfx Rain
```

## slide

#### 概要
指定したIDでアクター（キャラクター、背景、テキストプリンター、または選択肢ハンドラー）をスライド（X軸上で移動）し、任意でアクターの外観を変更します。

#### 備考
このコマンドは、指定したIDを持つアクターをすべてのアクターマネージャーから検索します。同じIDを持つ複数のアクターが存在する場合（たとえば、キャラクターとテキストプリンター）、最初に見つかったアクターにのみ影響します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">IdAndAppearance</span> | Named&lt;String&gt; | スライドするアクターのIDおよび（任意で）設定する外観。
from | Decimal | X軸（0から100の範囲、画面左端を基準としたパーセント)の上に配置して、アクターをスライドさせます。指定しない場合、表示されていれば現在のアクター位置を使用します。表示されていなければ画面外のランダムな位置を使用します。
<span class="command-param-required" title="Required parameter: parameter should always be specified">to</span> | Decimal | アクターをスライドさせるX軸の位置（0から100の範囲、画面左端を基準としたパーセント)。
visible | Boolean | アクターの表示ステータスを変更します（表示または非表示）。設定されておらずかつ対象アクターが非表示の場合、自動的に表示します。
easing | String | 変更に使用するイージング関数の名前。 <br /><br />  利用可能なオプション: Linear, SmoothStep, Spring, EaseInQuad, EaseOutQuad, EaseInOutQuad, EaseInCubic, EaseOutCubic, EaseInOutCubic, EaseInQuart, EaseOutQuart, EaseInOutQuart, EaseInQuint, EaseOutQuint, EaseInOutQuint, EaseInSine, EaseOutSine, EaseInOutSine, EaseInExpo, EaseOutExpo, EaseInOutExpo, EaseInCirc, EaseOutCirc, EaseInOutCirc, EaseInBounce, EaseOutBounce, EaseInOutBounce, EaseInBack, EaseOutBack, EaseInOutBack, EaseInElastic, EaseOutElastic, EaseInOutElastic.  <br /><br />  特に指定しない場合、アクターのマネージャーコンフィグ設定で設定されたデフォルトのイージング関数を使用します。
time | Decimal | スライドアニメーションの継続時間(秒単位)。デフォルト値: 0.35秒。

</div>

#### 例
```nani
; アクター `Jenna` が現在非表示であるとして、
; `Angry` 外観と共に画面中央にスライドして表示します。
@slide Jenna.Angry to:50

; アクター `Sheba` が現在表示されているとして、
; それを非表示にして、画面の左端の外にスライドさせます。
@slide Sheba to:-10 visible:false

; アクター `Mia` を画面の左側から右側にスライドさせます。
; かつ5秒かけて、アニメーションイージング `EaseOutBounce` を適用します。
@slide Sheba from:15 to:85 time:5 easing:EaseOutBounce
```

## spawn

#### 概要
プレハブまたは [特殊効果](/ja/guide/special-effects.md) をインスタンス化します。既に生成されたオブジェクトに対して実行すると、代わりに生成パラメータを更新します。

#### 備考
プレハブに `UnityEngine.MonoBehaviour` コンポーネントが追加されルートオブジェクトに関連づけられており、かつコンポーネントが `Naninovel.Commands.Spawn.IParameterized` インターフェースを実装している場合、オブジェクトを破棄する前に指定した `params` 値を渡します。コンポーネントが `Naninovel.Commands.Spawn.IAwaitable` を実装している場合、コマンドの実行はオブジェクトを破棄する前に実装によって返された非同期完了タスクを待ちます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Path</span> | String | 生成するプレハブリソースの名前（パス）。
params | List&lt;String&gt; | プレハブを生成するときに設定するパラメーター。プレハブには、ルートオブジェクトに紐付けられた `Naninovel.Commands.Spawn.IParameterized` コンポーネントが必要です。

</div>

#### 例
```nani
; `Rainbow` プレハブが生成リソースに追加されているとして、それをインスタンス化します。
@spawn Rainbow
```

## startTrans

#### 概要
現在表示されているもの（UIを除く）について、実際のシーンコンテンツをマスキングするシーントランジションを開始します。新しいシーンの準備ができたら、[@finishTrans] コマンドで終了します。

#### 備考
トランジションの進行中、UIは非表示になり、ユーザー入力はブロックされます。変更するには、トランジションプロセスを処理する `ISceneTransitionUI` を上書きします。<br /><br /> 利用可能なトランジションエフェクトのリストについては、[トランジションエフェクト](/ja/guide/transition-effects.md) ガイドをご覧ください。

#### 例
```nani
; 晴れの日のFelixから雨の日のJennaへトランジションする。
@char Felix
@back SunnyDay
@fx SunShafts
@startTrans
; 以下の変更は、トランジションが完了するまで表示されません。
@hideChars time:0
@char Jenna time:0
@back RainyDay time:0
@stopFx SunShafts params:0
@fx Rain params:,0
; 最初にキャプチャしたシーンを、3秒間かけて `DropFade` エフェクトを使用して新しいシーンに移行します。
@finishTrans DropFade time:3
```

## stop

#### 概要
naninovelスクリプトの実行を停止します。

#### 例
```nani
Show the choices and halt script execution until the player picks one.
@choice "Choice 1"
@choice "Choice 2"
@stop
We'll get here after player will make a choice.
```

## stopBgm

#### 概要
指定した名前の再生中のBGM(バックグラウンドミュージック) を停止。

#### 備考
トラック名 (BgmPath) が指定されていない場合は、再生中の全てのトラックを停止します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">BgmPath</span> | String | 停止する音楽トラックへのパス。
fade | Decimal | 再生停止時のボリュームフェードアウトの時間を秒単位で指定（デフォルトは0.35）。

</div>

#### 例
```nani
; 音楽トラック `Promenade` を10秒かけてフェードアウトし、再生停止する。
@stopBgm Promenade fade:10

; 再生中の全ての音楽を停止する。
@stopBgm
```

## stopSfx

#### 概要
指定した名前のSFX（サウンドエフェクト）トラックの再生を停止します。

#### 備考
サウンドエフェクトトラック名（SfxPath）が指定されていない場合、現在再生中のトラックをすべて停止します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID">SfxPath</span> | String | 停止する効果音へのパス。
fade | Decimal | 再生停止時のボリュームフェードアウトの時間を秒単位で指定（デフォルトは0.35）。

</div>

#### 例
```nani
; 効果音 `Rain` を15秒かけてフェードアウトして停止する。
@stopSfx Rain fade:15

; 再生中のすべての効果音トラックを停止する。
@stopSfx
```

## stopVoice

#### 概要
現在再生中のボイスクリップの再生を停止します。

## style

#### 概要
テキストプリンターのコンテンツに永続的に適用されます。[テキストスタイル](/ja/guide/text-printers.md#テキストスタイル)

#### 備考
テキストメッセージ内でリッチテキストタグを使用して、スタイルを選択的に適用することもできます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">TextStyles</span> | List&lt;String&gt; | 適用するテキストフォーマットタグ。山かっこは省略してください。例: &lt;b&gt; は `b` になり、&lt;size=100&gt; は `size=100` になります。`default` キーワードを使用してスタイルをリセットします。
printer | String | 使用するプリンターアクターのID。指定しない場合、デフォルトのものを使用します。

</div>

#### 例
```nani
; 最初の2つの文章を、45ピクセル、太字、赤いテキストで表示します。
; 次にスタイルをリセットし、デフォルトのスタイルで最後の文章を表示します。
@style color=#ff0000,b,size=45
Lorem ipsum dolor sit amet.
Cras ut nisi eget ex viverra egestas in nec magna.
@style default
Consectetur adipiscing elit.

; 文の最初の部分は通常どおりに表示しますが、最後の部分は太字で表示します。
Lorem ipsum sit amet. <b>Consectetur adipiscing elit.</b>
```

## title

#### 概要
エンジンのステートをリセットし、`ITitleUI` UI（メインメニュー）を表示します。

#### 例
```nani
@title
```

## unlock

#### 概要
指定したIDの[収集アイテム](/ja/guide/unlockable-items.md) を `unlocked` 状態に設定します。

#### 備考
アイテムのロック状態は [グローバルスコープ](/ja/guide/state-management.md#グローバルステート) に保存されています。<br /> 指定されたIDのアイテムがグローバルステートマップに登録されていない場合、対応するレコードが自動的に追加されます。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">Id</span> | String | 収集アイテムのID。登録した収集アイテムを全てロック解除するには `*` を使用します。

</div>

#### 例
```nani
@unlock CG/FightScene1
```

## voice

#### 概要
指定したパスでボイスクリップを再生します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">VoicePath</span> | String | 再生するボイスクリップへのパス。
volume | Decimal | 再生の音量。
group | String | オーディオ再生時に使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。

</div>

## wait

#### 概要
指定された待機条件を満たすまで、スクリプトの実行を保留します。

#### パラメーター

<div class="config-table">

ID | タイプ | 説明
--- | --- | ---
<span class="command-param-nameless command-param-required" title="Nameless parameter: value should be provided after the command identifer without specifying parameter ID  Required parameter: parameter should always be specified">WaitMode</span> | String | 待機条件:<br />  - `i` ユーザーが続行操作またはスキップ操作をする。<br />  - `0.0` タイマー (秒)。<br />  - `i0.0` タイマー、ただし続行操作またはスキップ操作でスキップ可能。

</div>

#### 例
```nani
; 背景を揺らしたあと、効果音 "ThunderSound" を0.5秒再生する。
@fx ShakeBackground
@wait 0.5
@sfx ThunderSound

; 最初の2語を表示し、ユーザーの入力を待ってから残りのフレーズを表示。
Lorem ipsum[wait i] dolor sit amet.
; この待機モードでは、次のショートカット(@i command) を使用することもできます。
Lorem ipsum[i] dolor sit amet.

; SFXを開始し、メッセージを表示して、5秒待ってから(スキップ可能)、SFXを停止します。
@sfx Noise loop:true
Jeez, what a disgusting noise. Shut it down![wait i5][skipInput]
@stopSfx Noise
```
