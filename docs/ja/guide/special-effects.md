# 特殊エフェクト

特殊エフェクトは、[@spawn] コマンドに続けてエフェクト名を記述することで実行されます。例:

```nani
@spawn ShakeBackground
```
— これはメイン背景を揺らします。

`params`パラメータでエフェクトのパラメータを制御できます。例:

```nani
@spawn ShakeCharacter params:Kohaku,1
```
— これは "Kohaku" というIDのキャラクターを、デフォルトの3回ではなく、1回揺らします。

パラメータのサブセットを選択的に指定して、残りをデフォルト値のままにすることができます:

```nani
@spawn ShakePrinter params:,,0.5
```
— 最初の2つのパラメーター（プリンターIDとシェイク回数）はスキップされ、デフォルト値になります。しかし、3番目のパラメーター（シェイク時間）は0.5秒に設定されます。

[@spawn]コマンドを使うと、再スタートすることなくエフェクトパラメーターを更新できます。例:

```nani
; `Kohaku` キャラクターをループでゆっくりと揺らし始め、
; 完了を待たない(無限ループになっています)
@spawn ShakeCharacter params:Kohaku,0,,,0.1 wait:false
Kohaku: It's rumbling!
; 振幅を上げてさらに3回揺らす
@spawn ShakeCharacter params:Kohaku,3,,,0.8
```

一部のエフェクトはデフォルトで永続的になっており、[@despawn] コマンドを使用して手動で停止する必要があります。例:

```nani
; 雨をスタート
@spawn Rain
; 雨をストップ
@despawn Rain
```

一部のエフェクトの [@despawn] コマンドは、パラメータを受け取ることもできます（たとえば、フェードアウトの持続時間を制御）。例:

```nani
; 10秒かけて徐々に雨をストップ
@despawn Rain params:10
```

`params` が指定されていない場合、デフォルトのパラメータが使用されます。以下のドキュメントでは、各エフェクトで使用可能な "start" パラメータ（[@spawn]コマンドで使用可能）と "stop" パラメータ（[@despawn]コマンドで使用可能）と、それぞれのデフォルト値を確認できます。

エフェクト名の後に `#` で区切られたIDを追加することで、同じタイプの複数のエフェクトを開始できます。例:

```nani
; `Kohaku` と `Yuko` の両方をループで揺らす
@spawn ShakeCharacter#1 params:Kohaku,0 wait:false
@spawn ShakeCharacter#2 params:Yuko,0 wait:false
```

インスタンス化されたエフェクトを停止または更新するときは、IDを指定してください:

```nani
; `Yuko` の揺れを停止し、 `Kohaku` の振幅を上げる
@despawn ShakeCharacter#2
@spawn ShakeCharacter#1 params:k,0,,,1
```

IDには任意の文字列を使用できます（上記のような数字、またはより意味のあるもの、たとえば `@spawn ShakeCharacter#Kohaku` を使用できます）。IDは、そのエフェクト名で使用している他のIDに対してユニークなものにしてください。

## シェイクプリンター

指定したIDまたはデフォルトのIDを持つプリンターを揺らします。

![](https://i.gyazo.com/f61fc35e318cce1949b00e5fe2448a80.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Printer ID | String | null | 揺らすプリンターのID。指定されていない場合、デフォルトのプリンターを揺らします。
Shake count | Integer | 2 | シェイクの反復回数。0以下に設定すると、[@despawn] で停止するまでエフェクトがループします。
Shake duration | Decimal | 0.15 | 各振動の基本の持続時間。秒単位
Duration variation | Decimal | 0.25 | エフェクトの基本の持続時間に適用する、ランダム化デルタ修飾子。
Shake amplitude | Decimal | 0.5 | 各振動の基本の変位振幅。各振動の基本の変位振幅。単位で。
Amplitude variation | Decimal | 0.1 | エフェクトの基本の変位振幅に適用する、ランダム化デルタ修飾子。
Shake horizontally | Boolean | false | アクターを水平方向に（x軸で）揺らすかどうか。
Shake vertically | Boolean | true | アクターを垂直に（y軸で）揺らすかどうか。

UIが "Screen Space Overlay" モードに設定されている場合、顕著な効果を得るには、シェイクの振幅をデフォルトの約100倍くらいにする必要があります。

**使用例**
```nani
; デフォルトのプリンターを、デフォルトのパラメーターで揺らす。
@spawn ShakePrinter

; デフォルトのプリンターを水平に10回揺らす
@spawn ShakePrinter params:,10,,,,,true,false

; デフォルトのプリンターをループで揺らし始め、テキストを表示し、シェイクを停止
@spawn ShakePrinter params:,0 wait:false
What a shaky situation!
@despawn ShakePrinter
```

## 背景のシェイク

指定されたIDまたはメインの背景を揺らします。

![](https://i.gyazo.com/fcf1153a0ad3d9a153908206211f5f5f.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Background ID | String | null | 揺らす背景のID。指定しない場合は、メイン背景を揺らします。
Shake count | Integer | 3 | シェイクの反復回数。0以下に設定すると、[@despawn] で停止するまでエフェクトがループします。
Shake duration | Decimal | 0.15 | 各振動の基本の持続時間。秒単位
Duration variation | Decimal | 0.25 | エフェクトの基本の持続時間に適用する、ランダム化デルタ修飾子。
Shake amplitude | Decimal | 0.5 | 各振動の基本の変位振幅。各振動の基本の変位振幅。単位で。
Amplitude variation | Decimal | 0.5 | エフェクトの基本の変位振幅に適用する、ランダム化デルタ修飾子。
Shake horizontally | Boolean | false | アクターを水平方向に（x軸で）揺らすかどうか。
Shake vertically | Boolean | true | アクターを垂直に（y軸で）揺らすかどうか。

**使用例**

```nani
; デフォルトのパラメーターでメイン背景を揺らす。
@spawn ShakeBackground

; 背景 `Video` を2回揺らす。
@spawn ShakeBackground params:Video,2
```

## キャラクターのシェイク

指定したIDまたは、表示されているキャラクターをランダムに揺らします。

![](https://i.gyazo.com/6001d3cfbee855c8a783d10e4a784042.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Character ID | String | null | 揺らすキャラクターのID。指定されていない場合、表示中のものからランダムに揺らします。
Shake count | Integer | 3 | シェイクの反復回数。0以下に設定すると、[@despawn] で停止するまでエフェクトがループします。
Shake duration | Decimal | 0.15 | 各振動の基本の持続時間。秒単位
Duration variation | Decimal | 0.25 | エフェクトの基本の持続時間に適用する、ランダム化デルタ修飾子。
Shake amplitude | Decimal | 0.5 | 各振動の基本の変位振幅。各振動の基本の変位振幅。単位で。
Amplitude variation | Decimal | 0.5 | エフェクトの基本の変位振幅に適用する、ランダム化デルタ修飾子。
Shake horizontally | Boolean | false | アクターを水平方向に（x軸で）揺らすかどうか。
Shake vertically | Boolean | true | アクターを垂直に（y軸で）揺らすかどうか。

**使用例**
```nani
; キャラクター `Kohaku` をデフォルトのパラメーターで揺らす。
@spawn ShakeCharacter params:Kohaku

; ランダムなキャラクターを揺らし始め、停止するか行動を促すかの選択肢を示します。
@spawn ShakeCharacter params:,0
@choice "Continue shaking" goto:.Continue
@choice "Stop shaking" goto:.Stop
@stop
# Stop
@despawn ShakeCharacter
# Continue
...
```

## カメラのシェイク

メインのNaninovelレンダーカメラをシェイクします。

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Camera Name | String | null | 揺らすカメラオブジェクトの名前。指定しない場合、メインのNaninovelカメラを揺らします。
Shake count | Integer | 3 | シェイクの反復回数。0以下に設定すると、[@despawn] で停止するまでエフェクトがループします。
Shake duration | Decimal | 0.15 | 各振動の基本の持続時間。秒単位
Duration variation | Decimal | 0.25 | エフェクトの基本の持続時間に適用する、ランダム化デルタ修飾子。
Shake amplitude | Decimal | 0.5 | 各振動の基本の変位振幅。各振動の基本の変位振幅。単位で。
Amplitude variation | Decimal | 0.5 | エフェクトの基本の変位振幅に適用する、ランダム化デルタ修飾子。
Shake horizontally | Boolean | false | アクターを水平方向に（x軸で）揺らすかどうか。
Shake vertically | Boolean | true | アクターを垂直に（y軸で）揺らすかどうか。

**使用例**
```nani
; デフォルトのパラメーターでメインのNaninovelカメラを揺らす。
@spawn ShakeCamera

; メインのNaninovelカメラを水平に5回振る。
@spawn ShakeCamera params:,5,,,,,true,false
```

## アクターのアニメーション化

（アニメーション）アクターパラメータを直接変更したい場合は、[@animate] コマンドの使用を検討してください。

![](https://i.gyazo.com/a0494329c713c4309a52d57d0b297bee.mp4)

## デジタルグリッチ

デジタルビデオの歪みと乱れをシミュレートする後処理エフェクトを、メインカメラに適用します。

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Duration | Decimal | 1 | エフェクトの持続時間。秒単位。
Intensity | Decimal | 1 | エフェクトの強さ。0.0から10.0の範囲で。

**使用例**
```nani
; グリッチエフェクトをデフォルトのパラメーターで適用。
@spawn DigitalGlitch
; エフェクトを3.33秒間、強さを低めに適用する。
@spawn DigitalGlitch params:3.33,0.1
```

## 雨

雨をシミュレートするパーティクルシステムを生成します。

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Intensity | Decimal | 500 | 雨の強さ。（1秒あたりのパーティクルの生成レート）
Fade-in time | Decimal | 5 | パーティクルシステムは、指定された時間（秒単位）にわたって、生成レートを0から目標レベルまで徐々に増やします。
X velocity | Decimal | 1 | パーティクルの水平速度への乗数。雨滴の角度を変えるのに使用します。
Y velocity | Decimal | 1 | パーティクルの垂直速度への乗数。

**停止パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Fade-out time | Decimal | 5 | パーティクルシステムは、指定された時間（秒単位）にわたって、生成レートを目標レベルから0に徐々に下げます。

**使用例**
```nani
; 10秒かけて激しい雨を降らせる。
@spawn Rain params:1500,10
; 30秒かけて雨を止める。
@despawn Rain params:30
```

## 雪

雪をシミュレートするパーティクルシステムを生成します。

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Intensity | Decimal | 100 | 雪の強さ。（1秒あたりのパーティクルの生成レート）
Fade-in time | Decimal | 5 | パーティクルシステムは、指定された時間（秒単位）にわたって、生成レートを0から目標レベルまで徐々に増やします。

**停止パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Fade-out time | Decimal | 5 | パーティクルシステムは、指定された時間（秒単位）にわたって、生成レートを目標レベルから0に徐々に下げます。

**使用例**
```nani
; 10秒かけて激しい雪を降らせる。
@spawn Snow params:300,10
; 30秒かけて雪を止める。
@despawn Snow params:30
```

## 太陽光線

太陽光線をシミュレートするパーティクルシステムを生成します。

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Intensity | Decimal | 0.85 | 光線の強さ (透明度)。
Fade-in time | Decimal | 3 | パーティクルシステムは、指定された時間（秒単位）にわたって、強さを0から目標レベルまで徐々に増やします。

**停止パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Fade-out time | Decimal | 3 | パーティクルシステムは、指定された時間（秒単位）にわたって、透明度を目標レベルから0に徐々に下げます。

**使用例**
```nani
; 10秒かけて強めの太陽光を開始する。
@spawn SunShafts params:1,10
; 30秒かけて太陽光を停止する。
@despawn SunShafts params:30
```

## 被写界深度 (ボケ)

焦点の合ったオブジェクトだけが鮮明で、他の画像がボケた状態にする際の、被写界深度（別名DOF、ボケ）効果をシミュレートします。

::: tip
1 つのオブジェクト（アクター）だけをぼかしたい場合は、代わりに「[ぼかしエフェクト](/ja/guide/special-effects#blur)」の使用を検討してください。
:::

![](https://i.gyazo.com/616a023c46f207b4a3a33d3d3fd9fbc9.mp4)

**パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Focus Object Name | String | null | フォーカスするゲームオブジェクトの名前（省略可能）。設定すると、常にそのゲームオブジェクトをフォーカスするようになり、`Focus Distance` のパラメーターは無視されます。
Focus Distance | Decimal | 10 | Naninovel カメラから焦点までの距離。`Focus Object Name` が指定されている場合は無視されます。
Focal Length | Decimal | 3.75 | フォーカス以外の領域に適用するぼかしの量。フォーカス感度も決定します。
Duration | Decimal | 1 | 補間時間（パラメーターーが目標値に到達するまでの時間）。

**停止パラメーター**

名前 | タイプ | デフォルト | 説明
--- | --- | --- | ---
Stop Duration | Decimal | 1 | エフェクトパラメーターがデフォルト値に達してエフェクトが無くなるまでのフェードオフ（無効化）時間。

**使用例**

```nani
; デフォルトのパラメーターでエフェクトを有効にし、フォーカスを `Kohaku` ゲームオブジェクトに固定
@spawn DepthOfField params:Kohaku
; 10 秒かけてエフェクトをフェードオフ（無効化）する
@despawn DepthOfField params:10
; カメラから 10 ユニット離れたポイントをフォーカスし、焦点距離を 0.95 にし、3 秒かけて適用
@spawn DepthOfField params:,10,0.95,3
```

## ぼかし

アクターにぼかしフィルタを適用します。サポートされているアクターは、スプライト、レイヤー、分解スプライト、Live2D、Spine、ビデオ、シーンなどの実装の背景とキャラクターです。デフォルト（第 1 パラメーターが指定されていない場合）では、エフェクトは `MainBackground` アクターに適用されます。

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**パラメーター**

Name | Type | Default | Description
--- | --- | --- | ---
Actor ID | String | MainBackground | エフェクトを適用するアクターの ID。アクターに `IBlurable` インターフェイスが実装されている必要があります。
Intensity | Decimal | 0.5 | 効果の強さを 0.0 ～ 1.0 の範囲で指定します。
Duration | Decimal | 1 | 補間時間（どのくらいの速さで Intensity が目標値に達するか）を秒単位で指定します。

**停止パラメーター**

Name | Type | Default | Description
--- | --- | --- | ---
Stop Duration | Decimal | 1 | エフェクトのフェードオフ（無効化）時間を秒単位で指定します。

**使用例**

```nani
; 現在のメイン背景にほかしを適用します
@spawn Blur
; `Sky` 背景に、2.5 秒かけて、最大の強さでぼかしを適用します
@spawn Blur params:Sky,1,2.5
; フェードオフしてぼかしを無効にします
@despawn Blur
```

## カスタムエフェクトの追加

### スタンドアロンエフェクト

カスタムスタンドアロンエフェクト（組み込みエフェクト"雨" や "雪" のように、プレハブを介して実装）を追加するには、スポーンリソースマネージャー(`Naninovel -> Resources -> Spwan`) を介してエフェクトプレハブを追加します。組み込みのエフェクトと同じように [@spawn] コマンドと [@despawn] コマンドを使用できます。

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

たとえば、スポーンマネージャーから割り当てられた `Explosion.prefab` プレハブがあるとします。次のコマンドは、プレハブをシーンに生成および破棄します:

```nani
@spawn Explosion
@despawn Explosion
```

大量のスポーンプレハブがありエディターメニューから割り当てるのが大変な場合は、 `Resources/Naninovel/Spawn` フォルダーにドロップするだけで自動的にスクリプトで使用できるようになります。必要に応じて、さらにサブフォルダで整理することもできます。この場合、naninovelスクリプトで参照する場合はスラッシュ (`/`) を使用します。たとえば、 `Resources/Naninovel/Spawn/Explosions/Boom01` として保存されたプレハブは、 `Explosions/Boom01` としてスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。たとえば、"Boom01" プレハブアセットを公開するには、次のアドレスにアセットを割り当てます: `Naninovel/Spawn/Boom01`。Addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

実装の参考として、`Naninovel/Prefabs/FX` に保存されている組み込みのエフェクトプレハブをご覧ください。

### カメラエフェクト

カスタム [後処理エフェクト](https://assetstore.unity.com/?q=post%20processing&orderBy=1) （つまり"デジタルグリッチ"などの画像効果またはカメラフィルター）をNaninovelカメラに適用したい場合は、[カメラプレハブを作成](https://docs.unity3d.com/Manual/CreatingPrefabs.html) し、カメラオブジェクトに [必要なエフェクトコンポーネントを追加](https://docs.unity3d.com/Manual/UsingComponents.html) し、プレハブをカメラコンフィグメニュー (`Naninovel -> Configuration -> Camera`) の `Custom Camera Prefab` フィールドに割り当てます。

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

Naninovel スクリプトから `toggle` パラメーターを使って、追加したコンポーネントをトグル(有効と無効を切り替え)できます。[@camera] コマンドの `set` パラメーターで有効なステートを明示的に設定できます。たとえば、"Bloom Image Effect" コンポーネントをカメラオブジェクトに追加したとします。まず、コンポーネントの種類名を調べます。これは通常、コンポーネントの `Script` フィールドに表示されています。

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

この場合、コンポーネントの種類名は `BloomImageEffect` です。種類名を使用して、次のように実行時にこのコンポーネントを切り替えます:

```nani
@camera toggle:BloomImageEffect
```

種類名をコンマで区切ることにより、複数のコンポーネントを一度に切り替えることができます:

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

また、コンポーネントを明示的に有効または無効にする場合:

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— これは `BloomImageEffect` と `CameraNoise` コンポーネントを有効にしつつ、`Sepia` を無効にします。

現在有効（および無効）のカスタムカメラコンポーネントのステートは、ゲームのセーブロード操作で自動的に保存および復元されます。

カスタムカメラフィルター効果の追加例については、次のどうがをご覧ください。

![](https://www.youtube.com/watch?v=IbT6MTecO-k)
