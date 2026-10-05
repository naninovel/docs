# 特殊効果

さまざまな特殊効果専用の組み込みスクリプトコマンドが多数用意されています。たとえば、[@shake] コマンドはアクターをシェイクします。

```nani
; 'Kohaku' アクターをシェイクします
@shake Kohaku
```

ほとんどの効果はパラメーター化できます。

```nani
; 'Kohaku' を1回シェイクします（デフォルトの3回の代わりに）
@shake Kohaku count:1
```

効果を再起動せずに効果パラメーターを更新できます。

```nani
; 'Kohaku' アクターをループでゆっくりとシェイクし始めます
@shake Kohaku loop! power:0.1
Kohaku: 揺れてる！
; 振幅を増やしてあと3回シェイクします
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

## スポーン効果

スポーン効果は、[@spawn] コマンドに基づいているか、そこから派生しています。1回限りのもの（[@glitch] など）もあれば、継続的なもの（[@snow] や [@blur] など）もあります。標準効果のリストとカスタム効果を追加する方法については、以下をお読みください。

---
### Shake

指定されたアクターまたはメインカメラをシェイクします。専用コマンド：[@shake]

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| ID | String | null | シェイクするアクターのID。メインカメラをシェイクするには `Camera` を指定します。 |
| Shake count | Number | 3 | シェイクの反復回数。 |
| Loop | Boolean | false | 有効にすると、[@despawn] で停止するまで効果をループします。 |
| Shake duration | Number | 0.15 | 各シェイク反復の基本時間（秒単位）。 |
| Duration variation | Number | 0.25 | 効果の基本時間に適用されるランダムな変動幅。 |
| Shake amplitude | Number | 0.5 | 各シェイク反復の基本変位振幅（ユニット単位）。 |
| Amplitude variation | Number | 0.5 | 効果の基本変位振幅に適用されるランダムな変動幅。 |
| Shake horizontally | Boolean | false | アクターを水平方向（X軸）に変位させるかどうか。 |
| Shake vertically | Boolean | true | アクターを垂直方向（Y軸）に変位させるかどうか。 |

**例**

```nani
; 現在のデフォルトのテキストプリンターをシェイクします
@shake

; デフォルトのパラメーターで "Kohaku" アクターをシェイクします
@shake Kohaku

; メインカメラを水平方向に5回シェイクします
@shake Camera count:5 hor! !ver
```

---
### Glitch

デジタルビデオの歪みやアーティファクトをシミュレートするポストプロセス効果をメインカメラに適用します。専用コマンド：[@glitch]

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Duration | Number | 1 | 効果の時間（秒単位）。 |
| Intensity | Number | 1 | 効果の強度（0.0〜10.0の範囲）。 |

**例**

```nani
; デフォルトのパラメーターでグリッチ効果を適用します
@glitch

; 低い強度で3.33秒かけて効果を適用します
@glitch power:0.1 time:3.33
```

---
### Rain

雨をシミュレートするパーティクルシステムをスポーンします。専用コマンド：[@rain]

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雨の強度（1秒あたりのパーティクルスポーン率）。 |
| Fade-in time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を0から目標レベルまで徐々に増加させます。 |
| X velocity | Number | 1 | パーティクルの水平速度の乗数。雨滴の角度を変更するために使用します。 |
| Y velocity | Number | 1 | パーティクルの垂直速度の乗数。 |

**停止パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を目標レベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて激しい雨を開始します
@rain power:1 time:10

; 30秒かけて雨を停止します
@rain power:0 time:30
```

---
### Snow

雪をシミュレートするパーティクルシステムをスポーンします。専用コマンド：[@snow]

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雪の強度（1秒あたりのパーティクルスポーン率）。 |
| Fade-in time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を0から目標レベルまで徐々に増加させます。 |

**停止パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | パーティクルシステムは、指定された時間（秒単位）でスポーン率を目標レベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて激しい雪を開始します
@snow power:1 time:10

; 30秒かけて雪を停止します
@snow power:0 time:30
```

---
### Sun

太陽光線（レイ）をシミュレートするパーティクルシステムをスポーンします。専用コマンド：[@sun]

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Intensity | Number | 0.85 | 光線の強度（不透明度）。 |
| Fade-in time | Number | 3 | パーティクルシステムは、指定された時間（秒単位）で強度を0から目標レベルまで徐々に増加させます。 |

**停止パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Fade-out time | Number | 3 | パーティクルシステムは、指定された時間（秒単位）で不透明度を目標レベルから0まで徐々に減少させます。 |

**例**

```nani
; 10秒かけて強い日差しを開始します
@sun power:1 time:10

; 30秒かけて日差しを停止します
@sun power:0 time:30
```

---
### Bokeh

被写界深度（別名DOF、ボケ）効果をシミュレートします。焦点の合っているオブジェクトのみが鮮明に保たれ、画像の残りの部分はぼやけます。専用コマンド：[@bokeh]

::: tip
1つのオブジェクト（アクター）だけをぼかしたい場合は、代わりに [Blur効果](/ja/guide/special-effects#blur) の使用を検討してください。
:::

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Focus Object Name | String | null | 焦点を設定するゲームオブジェクトの名前（オプション）。設定すると、焦点は常にゲームオブジェクトに留まり、`Focus Distance` パラメーターは無視されます。 |
| Focus Distance | Number | 10 | Naninovelカメラから焦点までの距離。`Focus Object Name` が指定されている場合は無視されます。 |
| Focal Length | Number | 3.75 | 焦点が合っていない領域に適用するぼかしの量。焦点の感度も決定します。 |
| Duration | Number | 1 | 補間時間（パラメーターが目標値に到達する速さ）。 |

**停止パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 効果が表示されないデフォルト値に効果パラメーターが到達するまでのフェードアウト（無効化）時間。 |

**例**

```nani
; デフォルトのパラメーターでボケを有効にし、"Kohaku" ゲームオブジェクトに焦点をロックします
@bokeh Kohaku

; 10秒かけて効果をフェードアウト（無効化）します
@bokeh power:0 time:10

; 焦点をカメラから10ユニット離れた場所に設定し、
; 焦点距離を0.95にし、3秒かけて適用します
@bokeh dist:10 power:0.95 time:3
```

---
### Blur

サポートされているアクター（スプライト、レイヤー、ダイススプライト、ユニバーサル、Live2D、Spine、ビデオ、プレースホルダー、シーン実装の背景とキャラクター）にぼかしフィルターを適用します。デフォルトでは（最初のパラメーターが指定されていない場合）、効果は `MainBackground` アクターに適用されます。専用コマンド：[@blur]

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**開始パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Actor ID | String | MainBackground | 効果を適用するアクターのID。効果をサポートするには、アクターが `IBlurable` インターフェースを実装している必要があります。 |
| Intensity | Number | 0.5 | 効果の強度（0.0〜1.0の範囲）。 |
| Duration | Number | 1 | 補間時間（秒単位）（強度が目標値に到達する速さ）。 |

**停止パラメーター**
| 名前 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 効果のフェードアウト（無効化）時間（秒単位）。 |

**例**

```nani
; 現在のメイン背景にぼかしを適用します
@blur

; "Sky" 背景に最大強度で2.5秒かけてぼかしを適用します
@blur Sky power:1 time:2.5

; ぼかしをフェードアウトして無効にします
@blur power:0
```

## トランジションエフェクト

[@back] および [@char] で背景とキャラクターの外観を変更したり、[@trans] コマンドでシーントランジションを実行したりする場合、使用するトランジションエフェクトを追加で指定できます。たとえば、次のコマンドは、「DropFade」トランジションエフェクトを使用して「River」背景に遷移します。

```nani
@back River.DropFade
```

トランジションエフェクトが指定されていない場合、デフォルトでクロスフェードが使用されます。

`time` パラメーターを使用して、トランジションの時間（秒単位）を指定することもできます。

```nani
@back River.DropFade time:1.5
```

上記のステートメントは、1.5秒かけて「DropFade」トランジションを使用して「River」背景に遷移します。すべてのトランジションのデフォルトの `time` は0.35秒です。

次のコマンドを実行する前にトランジションが完了するのを待ちたい場合は、`wait!` を追加します。

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— 「PianoTheme」背景音楽は、トランジションが完了した後にのみ再生を開始します。

一部のトランジションエフェクトは追加のパラメーターもサポートしており、`params` パラメーターで制御できます。

```nani
@back River.Ripple params:10,5,0.02
```

— リップルエフェクトの周波数を10、速度を5、振幅を0.02に設定します。`params` が指定されていない場合、デフォルトのパラメーターが使用されます。

特定のパラメーターだけを変更したい場合は、他のパラメーターを省略できます。省略したパラメーターにはデフォルト値が使用されます。

```nani
@back River.Ripple params:,,0.02
```

すべてのトランジションパラメーターは数値型です。

上記の例はキャラクターにも機能します。`via` パラメーターでトランジションを割り当てるだけです。

```nani
@char CharID.Appearance via:TransitionType params:...
```

以下のドキュメントで、利用可能なトランジションエフェクトとそのパラメーターおよびデフォルト値を確認できます。


---
### BandedSwirl

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 5 |
| Frequency | 10 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.BandedSwirl

; ねじれ量はデフォルトのまま、低い周波数でトランジションを適用します
@back Appearance.BandedSwirl params:,2.5
```


---
### Blinds

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Count | 6 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Blinds

; デフォルトの6ではなく30のブラインドを使用してトランジションを適用します
@back Appearance.Blinds params:30
```

---
### CircleReveal

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Fuzzy amount | 0.25 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.CircleReveal

; 高いぼかし量でトランジションを適用します
@back Appearance.CircleReveal params:3.33
```


---
### CircleStretch

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.CircleStretch
```


---
### CloudReveal

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.CloudReveal
```


---
### Crossfade

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Crossfade
```


---
### Crumble

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Crumble
```


---
### Dissolve

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Step | 99999 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Dissolve

; 低いステップでトランジションを適用します
@back Appearance.Dissolve params:100
```


---
### DropFade

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.DropFade
```


---
### LineReveal

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Fuzzy amount | 0.25 |
| Line Normal X | 0.5 |
| Line Normal Y | 0.5 |
| Reverse | 0 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.LineReveal

; 垂直ラインスライドでトランジションを適用します
@back Appearance.LineReveal params:,0,1

; 逆方向（右から左）にトランジションを適用します
@back Appearance.LineReveal params:,,,1
```


---
### Pixelate

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Pixelate
```


---
### RadialBlur

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.RadialBlur
```


---
### RadialWiggle

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.RadialWiggle
```


---
### RandomCircleReveal

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.RandomCircleReveal
```


---
### Ripple

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Frequency | 20 |
| Speed | 10 |
| Amplitude | 0.5 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Ripple

; 高い周波数と振幅でトランジションを適用します
@back Appearance.Ripple params:45,,1.1
```


---
### RotateCrumble

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.RotateCrumble
```


---
### Saturate

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Saturate
```


---
### Shrink

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Speed | 200 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Shrink

; 低速度でトランジションを適用します
@back Appearance.Shrink params:50
```


---
### SlideIn

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Slide amount | 1 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.SlideIn
```


---
### SwirlGrid

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 15 |
| Cell count | 10 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.SwirlGrid

; 高いねじれと低いセル数でトランジションを適用します
@back Appearance.SwirlGrid params:30,4
```


---
### Swirl

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Twist amount | 15 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Swirl

; 高いねじれでトランジションを適用します
@back Appearance.Swirl params:25
```


---
### Water

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Water
```


---
### Waterfall

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Waterfall
```


---
### Wave

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**パラメーター**
| 名前 | デフォルト |
| --- | --- |
| Magnitude | 0.1 |
| Phase | 14 |
| Frequency | 20 |

**例**

```nani
; デフォルトのパラメーターでトランジションを適用します
@back Appearance.Wave

; 高いマグニチュードと低い周波数でトランジションを適用します
@back Appearance.Wave params:0.75,,5
```

## アニメーションイージング

時間をかけて変更を適用する多くのコマンドには、変更される値が時間経過でどのように変化するかを制御するオプションの `easing` パラメーターがあります。サポートされているオプションは次のとおりです。

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

たとえば、次のコマンドは `EaseOutBounce` イージングを使用し、1.5秒かけて `DropFade` トランジションエフェクトで `River` 背景に遷移します。

```nani
@back River.DropFade time:1.5 easing:EaseOutBounce
```

## カスタム効果の追加

### カスタムスポーン効果

スポーンリソースマネージャー（`Naninovel -> Resources -> Spawn`）を介して効果プレハブを追加し、[@spawn] および [@despawn] コマンドを使用することで、カスタムのスタンドアロン効果（組み込みの「Rain」や「Snow」効果のように、プレハブを介して実装されるもの）を追加できます。

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

たとえば、スポーンマネージャーを介して `Explosion.prefab` プレハブが割り当てられている場合、次のコマンドはシーン上でプレハブをスポーンおよびデスポーン（破棄）します。

```nani
@spawn Explosion
@despawn Explosion
```

追加の効果パラメーターは `params` で指定できます。

```nani
@spawn Explosion params:Kohaku,3,true
```

::: tip
複数のパラメーターを持つカスタム効果を構築する場合は、[カスタムコマンド](/ja/guide/custom-commands) を作成し、`SpawnEffect` から継承することを検討してください。これにより、`params` 配列内のパラメーター位置を覚える必要がなくなり、[IDE拡張機能](/ja/guide/ide-extension) を使用するときに自動補完と型チェックが可能になります。

```nani
@explode Kohaku power:3 smoke!
```
:::

[@spawn] コマンドにはトランスフォームパラメーターもあり、特定のシーンまたはワールド位置、特定の回転またはスケールでオブジェクトをスポーンできます。例：

```nani
; Explosionを画面の左端から15%の位置に、
; 10倍のスケールで、Z軸を中心に15度回転させてスポーンします。
@spawn Explosion pos:15 scale:10 roll:15
```

スポーンするプレハブが多く、エディターメニューから割り当てるのが不便な場合は、`Resources/Naninovel/Spawn` フォルダーに入れるだけで、スクリプトで自動的に利用可能になります。必要に応じて、さらにサブフォルダーで整理することもできます。この場合、シナリオスクリプトで参照するときはスラッシュ（`/`）を使用します。たとえば、`Resources/Naninovel/Spawn/Explosions/Boom01` として保存されているプレハブアセットは、スクリプトで `Explosions/Boom01` として参照できます。

[Addressable Asset System](/ja/guide/resource-providers#addressable) を使用してリソースを手動で公開することも可能です。アセットを公開するには、上記の方法で公開するために使用するパスと同じアドレスを割り当てますが、「Resources/」部分を省略します。たとえば、「Boom01」プレハブアセットを公開するには、アセットに次のアドレスを割り当てます：`Naninovel/Spawn/Boom01`。エディター内では、特別な「Editor」リソースプロバイダーが常に最初に使用されることに注意してください。Addressableプロバイダーは、エディターメニューを介して割り当てられていないリソースに対してのみ試行されます。

参考実装については、`Naninovel/Prefabs/FX` に保存されている組み込み効果プレハブを確認してください。

### カスタムカメラ効果

カメラ効果を [Volumeプロファイル](https://docs.unity3d.com/Manual/urp/Volumes) で作成し、プロファイルアセットをカメラ構成メニュー（`Naninovel -> Configuration -> Camera`）の `Volumes` に追加します。

[@camera] の `fx` パラメーターを使用して効果のウェイトを設定します。各エントリは、プロファイル名とそれに続くウェイトで構成されます。`0` では影響せず、`1` で完全に適用されます。

```nani
@camera fx:Dream.1
```

1つのコマンドで複数のプロファイルをブレンドできます。通常のカメラアニメーションパラメーターでブレンドを制御します。

```nani
@camera fx:Dream.0,Night.1 time:3 easing:EaseOutQuad
```

カスタムカメラ（ポストプロセス）効果と関連するVolumeコンポーネントを追加するには、[Unityガイド](https://docs.unity3d.com/Manual/urp/post-processing/custom-post-processing-with-volume) に従ってください。

::: tip EXAMPLE
カメラ効果の使用例は [サンプルプロジェクト](/ja/guide/samples) にあります。Volumeプロファイルは `Settings/Render/Volumes` に保存されています。
:::

### カスタムトランジションエフェクト

#### ディゾルブマスク

ディゾルブマスクテクスチャに基づいてカスタムトランジションを作成できます。ディゾルブマスクはグレースケールテクスチャであり、色はピクセルがターゲットテクスチャに遷移するタイミングを定義します。たとえば、次のスパイラルディゾルブマスクを考えてみましょう。

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— 右上の黒い四角は、トランジションの開始時にトランジションターゲットがそこに表示されることを示し、中央の真っ白な四角は最後に遷移します。

::: tip
メモリ使用量を最適化するには、ディゾルブテクスチャのインポート設定で「Single Channel」と「Red」を設定します。また、視覚的なアーティファクトを防ぐために、`Non-Power of 2` と `Generate Mipmap` オプションが無効になっていることを確認してください。

![](https://i.gyazo.com/7c38c89948b6d040c0b21ca573cf2968.png)
:::

カスタムトランジションを作成するには、`Custom` トランジションモードを使用し、`dissolve` パラメーターを介してディゾルブマスクテクスチャへのパス（プロジェクトの「Resources」フォルダーからの相対パス）を指定します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```

トランジションの境界を滑らかにする（ぼかす）には、0（スムージングなし）から100（最大スムージング）の範囲の最初のパラメーターを使用します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:90
```

トランジションを反転するには（ディゾルブマスクの明るい領域が最初に表示されます）、2番目のパラメーターを1に設定します。例：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:,1
```

使用例については、次のビデオを確認してください。

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

#### カスタムシェーダー

カスタムアクター [シェーダー](https://docs.unity3d.com/Manual/ShadersOverview.html) を介して完全にカスタムなトランジションエフェクトを追加することが可能です。

新しいシェーダーを作成し、それを使用するマテリアルを、カスタムトランジションエフェクトを使用するアクターの `Custom Texture Material` プロパティに割り当てます。カスタムアクターシェーダーの作成と割り当て方法の詳細については、[カスタムアクターシェーダー](/ja/guide/custom-actor-shader) ガイドを参照してください。

スクリプトコマンドでトランジション名が指定されると、アクターが使用するマテリアルで同じ名前（`NANINOVEL_TRANSITION_` プレフィックス付き）の [シェーダーキーワード](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html) が有効になります。

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

    #ifdef NANINOVEL_TRANSITION_CUSTOM1 // Custom1トランジション。
    return transitionUV.x > progress ? mainColor
        : lerp(mainColor / progress * .1, transColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_CUSTOM2 // Custom2トランジション。
    return lerp(mainColor * (1.0 - progress), transColor * progress, progress);
    #endif

    // トランジションキーワードが有効になっていない場合、デフォルトでクロスフェードになります。
    return lerp(mainColor, transColor, progress);
}
```

これで、追加したトランジションを組み込みのものと同じ方法で呼び出せます。例：

```nani
@back Snow.Custom1
@back River.Custom2
```

完全なシェーダーの例については、[カスタムアクターシェーダー](/ja/guide/custom-actor-shader) ガイドを参照してください。
