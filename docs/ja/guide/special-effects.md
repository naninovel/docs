# 特殊効果

多くの組み込みスクリプトコマンドは、さまざまな特殊効果専用です。たとえば、[@shake] コマンドはアクターを振ります。

```nani
; 'Kohaku' アクターを振ります
@shake Kohaku
```

ほとんどの効果はパラメータ化できます。

```nani
; 'Kohaku' を1回振ります（デフォルトの3回の代わりに）
@shake Kohaku count:1
```

効果を再起動せずに効果パラメータを更新できます。

```nani
; `Kohaku` アクターをループでゆっくりと振り始めます
@shake Kohaku loop! power:0.1
Kohaku: 鳴ってる！
; 振幅を増やしてあと3回振ります
@shake Kohaku count:3 power:0.8
```

一部の効果はデフォルトで永続的であり、明示的に停止する必要があります。

```nani
; 雨を開始します
@rain
; 雨を停止します
@rain power:0
```

組み込み効果の説明と、[カスタム効果を追加する](/ja/guide/special-effects#カスタム効果の追加) 方法については、以下をお読みください。

## スポーンされた効果

スポーンされた効果は、[@spawn] コマンドに基づいているか、そこから派生しています。それらは1回限り（[@glitch] など）または継続的（[@show] や [@blur] など）にすることができます。標準効果のリストとカスタム効果を追加する方法については、以下をお読みください。

---
### Shake

指定されたアクターまたはメインカメラを振ります。専用コマンド: [@shake]

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| ID | String | null | 振るアクターのID。メインカメラを振るには `Camera` を指定します。 |
| Shake count | Number | 3 | シェイクの反復回数。 |
| Loop | Boolean | false | 有効にすると、[@despawn] で停止するまで効果をループします。 |
| Shake duration | Number | 0.15 | 各シェイク反復の基本期間（秒単位）。 |
| Duration variation | Number | 0.25 | 効果の基本期間に適用されるランダム化されたデルタ修飾子。 |
| Shake amplitude | Number | 0.5 | 各シェイク反復の基本変位振幅（単位）。 |
| Amplitude variation | Number | 0.5 | 効果の基本変位振幅に適用されるランダム化されたデルタ修飾子。 |
| Shake horizontally | Boolean | false | アクターを水平方向（X軸）に変位させるかどうか。 |
| Shake vertically | Boolean | true | アクターを垂直方向（Y軸）に変位させるかどうか。 |

**例**

```nani
; 現在のデフォルトのテキストプリンターを振る
@shake

; デフォルトパラメータで "Kohaku" アクターを振る
@shake Kohaku

; メインカメラを水平に5回振る
@shake Camera count:5 hor!
```

---
### Glitch

デジタルビデオの歪みやアーティファクトをシミュレートするポストプロセスエフェクトをメインカメラに適用します。専用コマンド: [@glitch]

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Duration | Number | 1 | 効果の期間（秒単位）。 |
| Intensity | Number | 1 | 効果の強度（0.0〜1.0の範囲）。 |

**例**

```nani
; デフォルトパラメータでグリッチ効果を適用する
@glitch

; 低強度で3.33秒かけて効果を適用する
@glitch power:0.1 time:3.33
```

---
### Rain

雨をシミュレートするパーティクルシステムをスポーンします。専用コマンド: [@rain]

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雨の強度（1秒あたりのパーティクルスポーン率）。 |
| Fade-in time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を0からターゲットレベルまで徐々に増加させます。 |
| X velocity | Number | 1 | パーティクルの水平速度への乗数。雨滴の角度を変更するために使用します。 |
| Y velocity | Number | 1 | パーティクルの垂直速度への乗数。 |

**停止パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率をターゲットレベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて激しい雨を開始する
@rain power:1 time:10

; 30秒かけて雨を停止する
@rain power:0 time:30
```

---
### Snow

雪をシミュレートするパーティクルシステムをスポーンします。専用コマンド: [@snow]

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雪の強度（1秒あたりのパーティクルスポーン率）。 |
| Fade-in time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を0からターゲットレベルまで徐々に増加させます。 |

**停止パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率をターゲットレベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて激しい雪を開始する
@snow power:1 time:10

; 30秒かけて雪を停止する
@snow power:0 time:30
```

---
### Sun

太陽光線（レイ）をシミュレートするパーティクルシステムをスポーンします。専用コマンド: [@sun]

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.85 | 光線の強度（不透明度）。 |
| Fade-in time | Number | 3 | パーティクルシステムは、指定された時間（秒単位）で強度を0からターゲットレベルまで徐々に増加させます。 |

**停止パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 3 | パーティクルシステムは、指定された時間（秒単位）で不透明度をターゲットレベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて強い日差しを開始する
@sun power:1 time:10

; 30秒かけて日差しを停止する
@sun power:0 time:30
```

---
### Bokeh

被写界深度（別名DOF、ボケ）効果をシミュレートします。焦点が合っているオブジェクトだけが鮮明に残り、画像の残りの部分はぼやけます。専用コマンド: [@bokeh]

::: tip
1つのオブジェクト（アクター）だけをぼかしたい場合は、代わりに [ブラー効果](/ja/guide/special-effects#blur) の使用を検討してください。
:::

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Focus Object Name | String | null | 焦点を設定するゲームオブジェクトの名前（オプション）。設定すると、焦点は常にゲームオブジェクトに留まり、`Focus Distance` パラメータは無視されます。 |
| Focus Distance | Number | 10 | Naninovelカメラから焦点までの距離。`Focus Object Name` が指定されている場合は無視されます。 |
| Focal Length | Number | 3.75 | 焦点が合っていない領域に適用するぼかしの量。焦点の感度も決定します。 |
| Duration | Number | 1 | 補間時間（パラメータがターゲット値に到達する速さ）。 |

**停止パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 効果が表示されないデフォルト値に効果パラメータが到達するまでのフェードオフ（無効化）期間。 |

**例**

```nani
; デフォルトパラメータでボケを有効にし、"Kohaku" ゲームオブジェクトに焦点をロックする
@bokeh Kohaku

; 10秒かけて効果をフェードオフ（無効化）する
@bokeh power:0

; 焦点をカメラから10単位離れた場所に設定し、
; 焦点距離を0.95にし、3秒かけて適用する
@bokeh dist:10 power:0.95 time:3
```

---
### Blur

サポートされているアクター（スプライト、レイヤー、ダイス、Live2D、Spine、ビデオ、シーン実装の背景とキャラクター）にブラーフィルターを適用します。デフォルトでは（最初のパラメータが指定されていない場合）、効果は `MainBackground` アクターに適用されます。専用コマンド: [@blur]

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**開始パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Actor ID | String | MainBackground | 効果を適用するアクターのID。効果をサポートするには、アクターに `IBlurable` インターフェイスが実装されている必要があります。 |
| Intensity | Number | 0.5 | 効果の強度（0.0〜1.0の範囲）。 |
| Duration | Number | 1 | 補間時間（秒単位）（強度がターゲット値に到達する速さ）。 |

**停止パラメータ**
| 名前 | タイプ | デフォルト | 説明 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 効果のフェードオフ（無効化）期間（秒単位）。 |

**例**

```nani
; 現在のメイン背景にブラーを適用する
@blur

; "Sky" 背景に最大強度で2.5秒かけてブラーを適用する
@blur Sky power:1 time:2.5

; ブラーをフェードオフして無効にする
@blur power:0
```

## トランジションエフェクト

[@back] および [@char] で背景とキャラクターの外観を変更したり、[@trans] コマンドでシーン遷移を実行したりする場合、使用するトランジションエフェクトを追加で指定できます。たとえば、次のコマンドは、「DropFade」トランジションエフェクトを使用して「River」背景に遷移します。

```nani
@back River.DropFade
```

トランジションエフェクトが指定されていない場合、デフォルトでクロスフェードが使用されます。

`time` パラメータを使用して、トランジションの期間（秒単位）を指定することもできます。

```nani
@back River.DropFade time:1.5
```

上記のステートメントは、1.5秒かけて「DropFade」トランジションを使用して「River」背景に遷移します。すべてのトランジションのデフォルトの `time` は0.35秒です。

次のコマンドを再生する前にトランジションが完了するのを待ちたい場合は、`wait!` を追加します。

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— "PianoTheme" 背景音楽は、トランジションが完了した後にのみ再生を開始します。

一部のトランジションエフェクトは追加のパラメータもサポートしており、`params` パラメータで制御できます。

```nani
@back River.Ripple params:10,5,0.02
```

— リップルエフェクトの頻度を10、速度を5、振幅を0.02に設定します。`params` が指定されていない場合、デフォルトのパラメータが使用されます。

選択したパラメータを変更したい場合は、他のパラメータをスキップでき、それらはデフォルト値を持ちます。

```nani
@back River.Ripple params:,,0.02
```

すべてのトランジションパラメータは number タイプです。

上記の例はキャラクターにも機能します。`via` パラメータでトランジションを割り当てるだけです。

```nani
@char CharID.Appearance via:TransitionType params:...
```

以下のドキュメントで、利用可能なトランジションエフェクトとそのパラメータおよびデフォルト値を確認できます。


---
### BandedSwirl

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 5 |
| Frequency | 10 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.BandedSwirl

; デフォルトのねじれ量だが低周波数でトランジションを適用する
@back Appearance.BandedSwirl params:,2.5
```


---
### Blinds

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Count | 6 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Blinds

; デフォルトの6ではなく30のブラインドを使用してトランジションを適用する
@back Appearance.Blinds params:30
```

---
### CircleReveal

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Fuzzy amount | 0.25 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.CircleReveal

; 高いファジー量でトランジションを適用する
@back Appearance.CircleReveal params:3.33
```


---
### CircleStretch

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.CircleStretch
```


---
### CloudReveal

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.CloudReveal
```


---
### Crossfade

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Crossfade
```


---
### Crumble

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Crumble
```


---
### Dissolve

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Step | 99999 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Dissolve

; 低いステップでトランジションを適用する
@back Appearance.Dissolve params:100
```


---
### DropFade

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.DropFade
```


---
### LineReveal

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Fuzzy amount | 0.25 |
| Line Normal X | 0.5 |
| Line Normal Y | 0.5 |
| Reverse | 0 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.LineReveal

; 垂直ラインスライドでトランジションを適用する
@back Appearance.LineReveal params:,0,1

; 逆方向（右から左）にトランジションを適用する
@back Appearance.LineReveal params:,,,1
```


---
### Pixelate

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Pixelate
```


---
### RadialBlur

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.RadialBlur
```


---
### RadialWiggle

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.RadialWiggle
```


---
### RandomCircleReveal

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.RandomCircleReveal
```


---
### Ripple

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Frequency | 20 |
| Speed | 10 |
| Amplitude | 0.5 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Ripple

; 高い頻度と振幅でトランジションを適用する
@back Appearance.Ripple params:45,,1.1
```


---
### RotateCrumble

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.RotateCrumble
```


---
### Saturate

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Saturate
```


---
### Shrink

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Speed | 200 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Shrink

; 低速度でトランジションを適用する
@back Appearance.Shrink params:50
```


---
### SlideIn

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Slide amount | 1 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.SlideIn
```


---
### SwirlGrid

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 15 |
| Cell count | 10 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.SwirlGrid

; 高いねじれと低いセル数でトランジションを適用する
@back Appearance.SwirlGrid params:30,4
```


---
### Swirl

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 15 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Swirl

; 高いねじれでトランジションを適用する
@back Appearance.Swirl params:25
```


---
### Water

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Water
```


---
### Waterfall

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Waterfall
```


---
### Wave

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**パラメータ**
| 名前 | デフォルト |
| --- | --- |
| Magnitude | 0.1 |
| Phase | 14 |
| Frequency | 20 |

**例**

```nani
; デフォルトパラメータでトランジションを適用する
@back Appearance.Wave

; 高いマグニチュードと低い周波数でトランジションを適用する
@back Appearance.Wave params:0.75,,5
```

## アニメーションイージング

時間をかけて変更を適用する多くのコマンドには、変更される値が時間経過でどのように変化するかを制御する任意の `easing` パラメーターがあります。サポートされているオプションは次のとおりです。

```text
Linear
SmoothStep
Spring
EaseInQuad
EaseOutQuad
EaseInOutQuad
EaseInCubic
EaseOutCubic
EaseInOutCubic
EaseInQuart
EaseOutQuart
EaseInOutQuart
EaseInQuint
EaseOutQuint
EaseInOutQuint
EaseInSine
EaseOutSine
EaseInOutSine
EaseInExpo
EaseOutExpo
EaseInOutExpo
EaseInCirc
EaseOutCirc
EaseInOutCirc
EaseInBounce
EaseOutBounce
EaseInOutBounce
EaseInBack
EaseOutBack
EaseInOutBack
EaseInElastic
EaseOutElastic
EaseInOutElastic
```

たとえば、次のコマンドは `EaseOutBounce` イージングを使用し、1.5秒かけて `DropFade` トランジション効果で `River` 背景へトランジションします。

```nani
@back River.DropFade time:1.5 easing:EaseOutBounce
```

## カスタム効果の追加

### カスタムスポーン効果

スポーンリソースマネージャー（`Naninovel -> Resources -> Spawn`）を介して効果プレハブを追加し、[@spawn] および [@despawn] コマンドを使用することで、カスタムスタンドアロン効果（「Rain」および「Snow」組み込み効果のようなプレハブを介して実装）を追加できます。

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

たとえば、スポーンマネージャーを介して `Explosion.prefab` プレハブが割り当てられている場合、次のコマンドはシーン上でプレハブをスポーンおよびデスポーン（破棄）します。

```nani
@spawn Explosion
@despawn Explosion
```

追加の効果パラメータは `params` で指定できます。

```nani
@spawn Explosion params:Kohaku,3,true
```

::: tip
複数のパラメータを持つカスタム効果を構築する場合は、[カスタムコマンド](/ja/guide/custom-commands) を作成し、`SpawnEffect` から継承することを検討してください。これにより、`params` 配列内のパラメータ位置を覚える必要がなくなり、[IDE拡張機能](/ja/guide/ide-extension) を使用するときに自動補完と型チェックが可能になります。

```nani
@explode Kohaku power:3 smoke!
```
:::

[@spawn] コマンドには変換パラメータもあり、特定のシーンまたはワールド位置、特定の回転またはスケールでオブジェクトをスポーンできます。例：

```nani
; 画面の左端から15%の位置にExplosionをスポーンします
; x10スケールで、Z軸を中心に15度回転します。
@spawn Explosion pos:15 scale:10 rotation:,,15
```

スポーンするプレハブが多く、エディタメニューから割り当てるのが不便な場合は、`Resources/Naninovel/Spawn` フォルダにドロップするだけで、スクリプトで自動的に利用可能になります。必要に応じて、さらにサブフォルダで整理することもできます。この場合、シナリオスクリプトで参照するときはスラッシュ（`/`）を使用します。たとえば、`Resources/Naninovel/Spawn/Explosions/Boom01` として保存されているプレハブアセットは、スクリプトで `Explosions/Boom01` として参照できます。

[Addressable Asset System](/ja/guide/resource-providers#addressable) を使用してリソースを手動で公開することも可能です。アセットを公開するには、上記の方法で公開するために使用するパスと同じアドレスを割り当てますが、「Resources/」部分を省略します。たとえば、「Boom01」プレハブアセットを公開するには、アセットに次のアドレスを割り当てます：`Naninovel/Spawn/Boom01`。Addressableプロバイダーはデフォルトではエディタで使用されないことに注意してください。リソースプロバイダー構成メニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

参考実装については、`Naninovel/Prefabs/FX` に保存されている組み込み効果プレハブを確認してください。

### カスタムカメラ効果

Naninovelカメラにカスタム [ポストプロセスエフェクト](https://assetstore.unity.com/?q=post%20processing&orderBy=1)（別名イメージエフェクトまたはカメラフィルター、「Digital Glitch」組み込み効果など）を適用したい場合は、[カメラプレハブを作成](https://docs.unity3d.com/Manual/CreatingPrefabs.html) し、[必要な効果コンポーネントを追加](https://docs.unity3d.com/Manual/UsingComponents.html) して、カメラ構成メニュー（`Naninovel -> Configuration -> Camera`）の `Custom Camera Prefab` フィールドにプレハブを割り当てます。

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

シナリオスクリプトを介して、`toggle` パラメータを使用して追加されたコンポーネントを切り替え（無効の場合は有効にし、その逆も同様）、[@camera] コマンドの `set` パラメータで有効状態を明示的に設定できます。たとえば、「Bloom Image Effect」コンポーネントをカメラオブジェクトに追加したとします。まず、コンポーネントのタイプ名を確認します。通常はコンポーネントの `Script` フィールドに指定されています。

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

この場合、コンポーネントのタイプ名は `BloomImageEffect` です。タイプ名を使用して、次のように実行時にこのコンポーネントを切り替えます。

```nani
@camera toggle:BloomImageEffect
```

コンマでタイプ名を区切ることで、複数のコンポーネントを一度に切り替えることができます。

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

コンポーネントを明示的に有効または無効にしたい場合：

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— `BloomImageEffect` と `CameraNoise` コンポーネントを有効にし、`Sepia` を無効にします。

カメラオブジェクトにアタッチされているすべてのコンポーネントを切り替え、無効化、または有効化するには、`*` 記号を使用します。

```nani
; すべてのコンポーネントを切り替える
@camera toggle:*

; すべてのコンポーネントを無効にする
@camera set:*.false

; すべてのコンポーネントを有効にする
@camera set:*.true
```

現在有効（および無効）になっているカメラコンポーネントの状態は、ゲームの保存ロード操作時に自動的に保存および復元されます。

カスタムカメラフィルター効果を追加する例については、次のビデオを確認してください。

![](https://www.youtube.com/watch?v=IbT6MTecO-k)

### カスタムトランジションエフェクト

#### ディゾルブマスク

ディゾルブマスクテクスチャに基づいてカスタムトランジションを作成できます。ディゾルブマスクはグレースケールテクスチャであり、色はピクセルがターゲットテクスチャに遷移するタイミングを定義します。たとえば、次のスパイラルディゾルブマスクを考えてみましょう。

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— 右上の黒い四角は、トランジションの開始時にトランジションターゲットがそこに表示されることを示し、中央の真っ白な四角は最後に遷移します。

::: tip
メモリ使用量を最適化するには、ディゾルブテクスチャのインポート設定で「Single Channel」と「Red」を設定します。また、視覚的なアーティファクトを防ぐために、`Non-Power of 2` と `Generate Mip Maps` オプションが無効になっていることを確認してください。

![](https://i.gyazo.com/7c38c89948b6d040c0b21ca573cf2968.png)
:::

カスタムトランジションを作成するには、`Custom` トランジションモードを使用し、`dissolve` パラメータを介してディゾルブマスクテクスチャへのパス（プロジェクトの「Resources」フォルダからの相対パス）を指定します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```

トランジションの境界を滑らかにする（ぼかす）には、0（スムージングなし）から100（最大スムージング）の範囲の最初のパラメータを使用します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:90
```

トランジションを反転するには（ディゾルブマスクの明るい領域が最初に表示されます）、2番目のパラメータを1に設定します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:,1
```

使用例については、次のビデオを確認してください。

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

#### カスタムシェーダー

カスタムアクター [シェーダー](https://docs.unity3d.com/Manual/ShadersOverview.html) を介して完全にカスタムなトランジションエフェクトを追加することが可能です。

新しいシェーダーを作成し、カスタムトランジションエフェクトを使用することになっているアクターの `Custom Texture Shader` プロパティに割り当てます。カスタムアクターシェーダーの作成と割り当て方法の詳細については、[カスタムアクターシェーダー](/ja/guide/custom-actor-shader) ガイドを参照してください。

スクリプトコマンドでトランジション名が指定されると、アクターが使用するマテリアルで同じ名前（`NANINOVEL_TRANSITION_` 接頭辞付き）の [シェーダーキーワード](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html) が有効になります。

独自のトランジションをカスタムアクターシェーダーに追加するには、`multi_compile` ディレクティブを使用します。例：

```c
#pragma multi_compile_local _ NANINOVEL_TRANSITION_CUSTOM1 NANINOVEL_TRANSITION_CUSTOM2
```

— `Custom1` および `Custom2` トランジションを追加します。

その後、条件付きディレクティブを使用して、有効なトランジションキーワードに基づいて特定のレンダリングメソッドを選択できます。組み込みアクターシェーダーを再利用する場合、フラグメントハンドラーで使用される `ApplyTransitionEffect` メソッドを介してカスタムトランジションを実装することが可能です。

```c
fixed4 ApplyTransitionEffect(sampler2D mainTex, float2 mainUV,
    sampler2D transitionTex, float2 transitionUV, float progress,
    float4 params, float2 randomSeed, sampler2D cloudsTex, sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_CUSTOM1 // Custom1 transition.
    return transitionUV.x > progress ? mainColor
        : lerp(mainColor / progress * .1, transColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_CUSTOM2 // Custom2 transition.
    return lerp(mainColor * (1.0 - progress), transColor * progress, progress);
    #endif

    // トランジションキーワードが有効になっていない場合、デフォルトでクロスフェードになります。
    return lerp(mainColor, transColor, progress);
}
```

これで、組み込みのものと同じ方法で追加されたトランジションを呼び出すことができます。例：

```nani
@back Snow.Custom1
@back River.Custom2
```

完全なシェーダーの例については、[カスタムアクターシェーダー](/ja/guide/custom-actor-shader) ガイドを参照してください。
