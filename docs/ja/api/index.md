# コマンド

標準スクリプトコマンドのAPIリファレンスです。サイドバーを使用して、利用可能なコマンド間をすばやく移動できます。

~~取り消し線~~ は名前なしパラメータを示し、**太字** は必須パラメータを表します。その他のパラメータはオプションと見なしてください。これについてよくわからない場合は、[シナリオスクリプトガイド](/ja/guide/scenario-scripting) を参照してください。

次のパラメータは、ほとんどのスクリプトコマンドでサポートされています。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| if | string | コマンドを実行するかどうかを制御するブール値の [スクリプト式](/ja/guide/script-expressions)。 |
| unless | string | コマンドを実行しないかどうかを制御するブール値の [スクリプト式](/ja/guide/script-expressions)（'if' の逆）。 |
| wait | boolean | 次のコマンドを実行する前に、スクリプトプレイヤーが非同期コマンドの実行完了を待機するかどうか。 |

</div>

## addChoice

指定されたID（またはデフォルト）の選択肢ハンドラーに [選択肢](/ja/guide/choices) オプションを追加します。[@choice] の代わりに使用して、選択肢を動的に追加し、いつ（またはするかどうか）再生を停止するかをより細かく制御します。

::: info NOTE
選択肢の下にコマンドをネストする場合、`goto`、`gosub`、および `set` パラメータは無視されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">choiceSummary</span> | string | 選択肢として表示するテキスト。テキストにスペースが含まれる場合は、二重引用符 (`"`) で囲んでください。テキスト自体に二重引用符を含める場合は、エスケープしてください。 |
| id | string | 選択肢の一意の識別子。後で [@clearChoice] を使用して選択肢を削除するために使用できます。 |
| lock | string | プレイヤーが選択できないように選択肢を無効にするかどうか。詳細については、[選択肢ドキュメント](/ja/guide/choices#ロックされた選択肢) を参照してください。デフォルトでは無効です。 |
| button | string | 選択肢を表す [ボタンプレハブ](/ja/guide/choices#選択肢ボタン) のローカルリソースパス。プレハブには、ルートオブジェクトに `ChoiceHandlerButton` コンポーネントがアタッチされている必要があります。指定しない場合はデフォルトのボタンを使用します。 |
| pos | decimal list | 選択肢ハンドラー内の選択肢ボタンのローカル位置（ハンドラーの実装でサポートされている場合）。 |
| handler | string | 選択肢を追加する選択肢ハンドラーのID。指定しない場合はデフォルトのハンドラーを使用します。 |
| goto | string | ユーザーが選択肢を選択したときに移動するパス。パス形式については [@goto] コマンドを参照してください。選択肢の下にコマンドをネストする場合、無視されます。 |
| gosub | string | ユーザーが選択肢を選択したときに移動するサブルーチンのパス。パス形式については [@gosub] コマンドを参照してください。`goto` が割り当てられている場合、このパラメータは無視されます。選択肢の下にコマンドをネストする場合、無視されます。 |
| set | string | ユーザーが選択肢を選択したときに実行するセット式。構文については [@set] コマンドを参照してください。選択肢の下にコマンドをネストする場合、無視されます。 |
| show | boolean | 選択肢が追加された選択肢ハンドラーも表示するかどうか。デフォルトで有効です。 |
| time | decimal | フェードイン（表示）アニメーションの期間（秒単位）。 |

</div>

```nani
; クイックタイムイベント：プレイヤーが3秒以内に選択しない限りゲームオーバー。
Decide now![>]
@addChoice "Turn left" goto:Left
@addChoice "Turn Right" goto:Right
@wait 3
@clearChoice
You crashed!

; ランダムな選択肢を追加し、プレイヤーが選択するまで再生を停止します。
@random
    @addChoice "Top choice"
        You've selected the top choice!
    @addChoice "Mediocre choice"
        You've selected a mediocre choice.
    @addChoice "The worst choice"
        You've selected the worst possible choice...
@stop
```

## append

指定されたテキストをテキストプリンターに追加します。

::: info NOTE
テキスト全体は、表示効果をトリガーせずに即座に追加されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">text</span> | string | 追加するテキスト。 |
| printer | string | 使用するプリンターアクターのID。指定しない場合はデフォルトを使用します。 |
| author | string | 追加されたテキストに関連付けるアクターのID。 |

</div>

```nani
; 文の最初の部分を通常どおり（徐々に表示）印刷し、
; 次に文の終わりを一度に追加します。
Lorem ipsum
@append " dolor sit amet."
```

## arrange

指定されたキャラクターをX軸で配置します。パラメータが指定されていない場合、表示されているキャラクターをX軸で均等に配置する自動配置を実行します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">characterPositions</span> | named decimal list | キャラクターIDとシーンX軸位置（左シーン境界に対する相対的なパーセンテージ）の名前付き値のコレクション。位置0は左境界、100は右境界に関連します。50は中央です。 |
| look | boolean | 自動配置を実行するときに、キャラクターをシーンの原点に向けるかどうかも制御します（デフォルトで有効）。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; 表示されているすべてのキャラクターを均等に配置します。
@arrange

; キャラクターID 'Jenna' を15%、'Felix' を50%、'Mia' を85%の位置に配置します
; （シーンの左端からの距離）。
@arrange Jenna.15,Felix.50,Mia.85
```

## async

メインのシナリオ再生ルーチンと並行して、専用のスクリプトトラックでネストされた行を非同期に実行します。複合アニメーションや任意のコマンドチェーンを、後続のシナリオと同時に実行するために使用します。詳細については、[同時再生](/ja/guide/scenario-scripting#並行再生) ガイドを参照してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">trackId</span> | string | ネストされた行の実行を担当するプレイヤートラックの一意の識別子。指定された場合、IDを使用して非同期トラックの再生を [@await] または [@stop] できます。 |
| loop | boolean | [@stop] で停止されるまで、ネストされた行をループで再生するかどうか。 |

</div>

```nani
; カメラを3つのポイント間でゆっくりパンします。
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @camera offset:0,0 zoom:0 time:3 wait!
; 上記のアニメーションが独立して実行されている間、以下のテキストが表示されます。
...
; カメラを再度変更する前に、パンアニメーションが完了していることを確認します。
@await CameraPan
@camera zoom:0.7

; 'Quake' 非同期タスクをループで実行します。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }
...
; タスクを停止します。
@stop Quake
```

## await

指定された非同期タスクまたはすべてのネストされた行の実行が完了するまで、シナリオの再生を保留します。

::: info NOTE
ネストされたブロックは常に終了することが期待されています。ブロックの外に移動する可能性のあるコマンドをネストしないでください。未定義の動作が発生する可能性があります。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">trackId</span> | string | 待機する非同期スクリプトトラックの識別子。[@async] コマンドで生成されたトラックの完了を待機するために使用できます。 |
| complete | boolean | 待機中のトラックをできるだけ早く強制完了するかどうか。ネストされた行を待機している場合は効果がありません。 |

</div>

```nani
; ネストされた行を並行して実行し、すべてが完了するまで待機します。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
    It starts Raining...[>]
; 以下の行は、上記すべてが完了した後に実行されます。
...

; カメラを2つのポイント間でゆっくりパンします。
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!
...
; カメラを再度変更する前に、アニメーションが完了していることを確認します。
@await CameraPan complete!
@camera zoom:0
```

## back

[背景アクター](/ja/guide/backgrounds) を変更します。

::: info NOTE
背景は、従来のVNゲームフローにより適合するように、キャラクターとは少し異なる方法で処理されます。ほとんどの場合、シーンには単一の背景アクターがあり、常に異なる外観に遷移します。スクリプトで同じアクターIDを繰り返す手間を省くために、`MainBackground` アクターが影響を受けると想定して、背景の外観と遷移タイプ（オプション）のみを名前なしパラメータとして提供できます。そうでない場合は、`id` パラメータを使用して背景アクターのIDを明示的に指定できます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">appearanceAndTransition</span> | named string | 変更された背景に設定する外観（または [ポーズ](/ja/guide/backgrounds#ポーズ)）と、使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ。遷移が指定されていない場合、デフォルトでクロスフェード効果が使用されます。 |
| pos | decimal list | 変更されたアクターに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| id | string | 変更するアクターのID。表示されているすべてのアクターに影響を与えるには `*` を指定します。 |
| appearance | string | 変更されたアクターに設定する外観。 |
| pose | string | 変更されたアクターに設定するポーズ。 |
| via | string | 使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ（デフォルトではクロスフェードが使用されます）。 |
| params | decimal list | 遷移効果のパラメータ。 |
| dissolve | string | [カスタムディゾルブ](/ja/guide/special-effects#トランジションエフェクト) テクスチャへのパス（パスは `Resources` フォルダに対する相対パスである必要があります）。遷移が `Custom` モードに設定されている場合にのみ効果があります。 |
| visible | boolean | 変更されたアクターに設定する可視性ステータス。 |
| position | decimal list | 変更されたアクターに設定する位置（ワールド空間）。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー）を使用します。 |
| rotation | decimal list | 変更されたアクターに設定する回転。 |
| scale | decimal list | 変更されたアクターに設定するスケール。 |
| tint | string | 適用する色合い。<br><br>`#` で始まる文字列は、次の方法で16進数として解析されます：`#RGB`（`RRGGBB` になります）、`#RRGGBB`、`#RGBA`（`RRGGBBAA` になります）、`#RRGGBBAA`。アルファが指定されていない場合、デフォルトは `FF` になります。<br><br>`#` で始まらない文字列は、リテラルカラーとして解析され、次の色がサポートされています：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; メイン背景の外観として 'River' を設定します。
@back River

; 上記と同じですが、'RadialBlur' 遷移効果も使用します。
@back River.RadialBlur

; 'Smoke' 背景を画面の中央に配置し、
; 元のサイズの50%にスケーリングします。
@back id:Smoke pos:50,50 scale:0.5

; シーン上の表示されているすべての背景に色合いを付けます。
@back id:* tint:#ffdc22
```

## bgm

指定された名前の現在再生中の [BGM（背景音楽）](/ja/guide/audio#bgm背景音楽) トラックを再生または変更します。

::: info NOTE
音楽トラックはデフォルトでループされます。音楽トラック名 (BgmPath) が指定されていない場合、現在再生中のすべてのトラックに影響します。すでに再生中のトラックに対して呼び出された場合、再生は影響を受けません（トラックは最初から再生されません）が、指定されたパラメータ（音量とトラックをループするかどうか）が適用されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">bgmPath</span> | string | 再生する音楽トラックへのパス。 |
| intro | string | メイントラックの前に一度だけ再生するイントロ音楽トラックへのパス（ループパラメータの影響を受けません）。 |
| volume | decimal | 音楽トラックの音量。 |
| loop | boolean | トラックが終了したときに最初から再生するかどうか。 |
| fade | decimal | 再生開始時の音量フェードインの期間（秒単位、デフォルトは 0.0）。再生中のトラックを変更する場合は効果がありません。 |
| group | string | オーディオを再生するときに使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| time | decimal | 変更の期間（秒単位）。 |
| wait | boolean | 次のコマンドを再生する前に、BGMフェードアニメーションの完了を待機するかどうか。 |

</div>

```nani
; 'Sanctuary' という名前の音楽トラックをループで再生開始します。
@bgm Sanctuary

; 上記と同じですが、10秒かけて音量をフェードインし、一度だけ再生します。
@bgm Sanctuary fade:10 !loop

; 再生中のすべての音楽トラックの音量を2.5秒かけて50%に変更し、
; ループ再生にします。
@bgm volume:0.5 loop! time:2.5

; 'BattleThemeIntro' を一度再生し、その後 'BattleThemeMain' をループします。
@bgm BattleThemeMain intro:BattleThemeIntro
```

## blur

サポートされているアクター（スプライト、レイヤー、ダイス、Live2D、Spine、ビデオ、シーン実装の背景とキャラクター）に [ぼかし効果](/ja/guide/special-effects#blur) を適用します。

::: info NOTE
効果をサポートするには、アクターが `IBlurable` インターフェースを実装している必要があります。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">actorId</span> | string | 効果を適用するアクターのID。同じIDを持つ複数のアクターが見つかった場合（例：キャラクターとプリンター）、最初に見つかったものにのみ影響します。指定しない場合、メイン背景に適用されます。 |
| power | decimal | 効果の強度（0.0〜1.0の範囲）。デフォルトは0.5。0に設定すると、効果が無効（デスポーン）になります。 |
| time | decimal | パラメータが目標値に到達するまでにかかる時間（秒単位）。デフォルトは1.0。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; デフォルトのパラメータでメイン背景をぼかします。
@blur
; メイン背景からぼかしを削除します。
@blur power:0

; 'Kohaku' アクターを最大強度で5秒かけてぼかします。
@blur Kohaku power:1 time:5
; 'Kohaku' から3.1秒かけてぼかしを削除します。
@blur Kohaku power:0 time:3.1
```

## bokeh

[被写界深度](/ja/guide/special-effects#bokeh)（別名DOF、ボケ）効果をシミュレートします。焦点の合っているオブジェクトのみが鮮明に保たれ、他のオブジェクトはぼやけます。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">focus</span> | string | 焦点を設定するゲームオブジェクトの名前（オプション）。設定すると、焦点は常にゲームオブジェクトにとどまり、`dist` パラメータは無視されます。 |
| dist | decimal | Naninovelカメラから焦点までの距離（単位）。`focus` パラメータが指定されている場合は無視されます。デフォルトは10。 |
| power | decimal | 焦点が合っていない領域に適用するぼかしの量。焦点の感度も決定します。デフォルトは3.75。0に設定すると、効果が無効（デスポーン）になります。 |
| time | decimal | パラメータが目標値に到達するまでにかかる時間（秒単位）。デフォルトは1.0。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; デフォルトで効果を有効にし、'Kohaku' ゲームオブジェクトに焦点をロックします。
@bokeh focus:Kohaku
; 10秒かけて効果をフェードオフ（無効化）します。
@bokeh power:0 time:10
; 焦点をカメラから10単位離れた場所に設定し、
; 焦点距離を0.95に設定して、3秒かけて適用します。
@bokeh dist:10 power:0.95 time:3
```

## camera

メインカメラを変更し、オフセット、ズームレベル、回転を時間の経過とともに変更します。コマンド効果の簡単なデモンストレーションについては、[このビデオ](https://youtu.be/zy28jaMss8w) を確認してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| offset | decimal list | X、Y、Z軸による単位でのローカルカメラ位置オフセット。 |
| roll | decimal | Z軸による角度（度）でのローカルカメラ回転（0.0〜360.0または-180.0〜180.0）。`rotation` パラメータの3番目のコンポーネントと同じです。`rotation` が指定されている場合は無視されます。 |
| rotation | decimal list | X、Y、Z軸にわたる角度（度）でのローカルカメラ回転（0.0〜360.0または-180.0〜180.0）。 |
| zoom | decimal | 相対カメラズーム（レンダリングモードに応じて、正投影サイズまたは視野）。0.0（ズームなし）から1.0（フルズーム）の範囲。 |
| ortho | boolean | カメラを正投影（true）モードでレンダリングするか、透視投影（false）モードでレンダリングするか。 |
| toggle | string list | トグルする（無効な場合は有効にし、その逆も同様）コンポーネントの名前。コンポーネントは、カメラと同じゲームオブジェクトにアタッチされている必要があります。これは、[カスタムポストプロセス効果](/ja/guide/special-effects#カスタムカメラ効果) をトグルするために使用できます。カメラオブジェクトにアタッチされているすべてのコンポーネントに影響を与えるには `*` を使用します。 |
| set | named boolean list | 有効または無効にするコンポーネントの名前。コンポーネントは、カメラと同じゲームオブジェクトにアタッチされている必要があります。これは、[カスタムポストプロセス効果](/ja/guide/special-effects#カスタムカメラ効果) を明示的に有効または無効にするために使用できます。指定されたコンポーネントの有効状態は、`toggle` パラメータの効果をオーバーライドします。カメラオブジェクトにアタッチされているすべてのコンポーネントに影響を与えるには `*` を使用します。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; カメラをX軸で-3単位、Y軸で1.5単位オフセットします。
@camera offset:-3,1.5

; カメラを透視投影モードに設定し、50%ズームインして5単位戻します。
@camera !ortho offset:,,-5 zoom:0.5

; カメラを正投影モードに設定し、時計回りに10度回転させます。
@camera ortho! roll:10

; オフセット、ズーム、回転を5秒かけて同時にアニメーション化します。
@camera offset:-3,1.5 zoom:0.5 roll:10 time:5

; カメラを即座にデフォルト状態にリセットします。
@camera offset:0,0 zoom:0 rotation:0,0,0 time:0

; カメラにアタッチされた 'FancyCameraFilter' と 'Bloom' コンポーネントをトグルします。
@camera toggle:FancyCameraFilter,Bloom

; 'FancyCameraFilter' コンポーネントを有効にし、'Bloom' を無効にします。
@camera set:FancyCameraFilter.true,Bloom.false

; カメラオブジェクトにアタッチされたすべてのコンポーネントを無効にします。
@camera set:*.false
```

## char

[キャラクターアクター](/ja/guide/characters) を変更します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">idAndAppearance</span> | named string | 変更するキャラクターのID（表示されているすべてのキャラクターに影響を与えるには `*` を指定）と設定する外観（または [ポーズ](/ja/guide/characters#ポーズ)）。外観が指定されていない場合、`Default`（存在する場合）またはランダムなものが使用されます。 |
| look | string | アクターの視線方向。サポートされている値：left, right, center。 |
| avatar | string | キャラクターに割り当てる [アバターテクスチャ](/ja/guide/characters#アバターテクスチャ) の名前（パス）。キャラクターからアバターテクスチャを削除（割り当て解除）するには `none` を使用します。 |
| pos | decimal list | 変更されたアクターに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| id | string | 変更するアクターのID。表示されているすべてのアクターに影響を与えるには `*` を指定します。 |
| appearance | string | 変更されたアクターに設定する外観。 |
| pose | string | 変更されたアクターに設定するポーズ。 |
| via | string | 使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ（デフォルトではクロスフェードが使用されます）。 |
| params | decimal list | 遷移効果のパラメータ。 |
| dissolve | string | [カスタムディゾルブ](/ja/guide/special-effects#トランジションエフェクト) テクスチャへのパス（パスは `Resources` フォルダに対する相対パスである必要があります）。遷移が `Custom` モードに設定されている場合にのみ効果があります。 |
| visible | boolean | 変更されたアクターに設定する可視性ステータス。 |
| position | decimal list | 変更されたアクターに設定する位置（ワールド空間）。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー）を使用します。 |
| rotation | decimal list | 変更されたアクターに設定する回転。 |
| scale | decimal list | 変更されたアクターに設定するスケール。 |
| tint | string | 適用する色合い。<br><br>`#` で始まる文字列は、次の方法で16進数として解析されます：`#RGB`（`RRGGBB` になります）、`#RRGGBB`、`#RGBA`（`RRGGBBAA` になります）、`#RRGGBBAA`。アルファが指定されていない場合、デフォルトは `FF` になります。<br><br>`#` で始まらない文字列は、リテラルカラーとして解析され、次の色がサポートされています：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; デフォルトの外観でID 'Sora' のキャラクターを表示します。
@char Sora

; 上記と同じですが、外観を 'Happy' に設定します。
@char Sora.Happy

; 上記と同じですが、さらにキャラクターをシーンの左端から45%、
; 下端から10%離れた位置に配置し、左を向かせます。
@char Sora.Happy look:left pos:45,10

; Soraを中央下、Felixの前に表示させます。
@char Sora pos:50,0,-1
@char Felix pos:,,0

; シーン上の表示されているすべてのキャラクターに色合いを付けます。
@char * tint:#ffdc22
```

## choice

必須の [選択肢](/ja/guide/choices) オプションを追加します。これにより、プレイヤーが選択を行うまで、それ以降のシナリオ再生が停止します。後続の選択肢コマンドはマージされ、一度に複数のオプションを提示できます。選択を要求せずに単に選択肢を追加する場合は、このコマンドの代わりに [@addChoice] を使用してください。

::: info NOTE
選択肢の下にコマンドをネストする場合、`goto`、`gosub`、および `set` パラメータは無視されます。<br><br>コマンドは、再生を自動的に停止するためにチェーン内の最後の選択肢を事前に決定する必要があるため、ifパラメータで非決定論的な式を使用することはサポートされていません。`@choice ... if:random(0,10)>5` のようなものが必要な場合は、代わりに [@addChoice] コマンドを使用してください。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">choiceSummary</span> | string | 選択肢として表示するテキスト。テキストにスペースが含まれる場合は、二重引用符 (`"`) で囲んでください。テキスト自体に二重引用符を含める場合は、エスケープしてください。 |
| id | string | 選択肢の一意の識別子。後で [@clearChoice] を使用して選択肢を削除するために使用できます。 |
| lock | string | プレイヤーが選択できないように選択肢を無効にするかどうか。詳細については、[選択肢ドキュメント](/ja/guide/choices#ロックされた選択肢) を参照してください。デフォルトでは無効です。 |
| button | string | 選択肢を表す [ボタンプレハブ](/ja/guide/choices#選択肢ボタン) のローカルリソースパス。プレハブには、ルートオブジェクトに `ChoiceHandlerButton` コンポーネントがアタッチされている必要があります。指定しない場合はデフォルトのボタンを使用します。 |
| pos | decimal list | 選択肢ハンドラー内の選択肢ボタンのローカル位置（ハンドラーの実装でサポートされている場合）。 |
| handler | string | 選択肢を追加する選択肢ハンドラーのID。指定しない場合はデフォルトのハンドラーを使用します。 |
| goto | string | ユーザーが選択肢を選択したときに移動するパス。パス形式については [@goto] コマンドを参照してください。選択肢の下にコマンドをネストする場合、無視されます。 |
| gosub | string | ユーザーが選択肢を選択したときに移動するサブルーチンのパス。パス形式については [@gosub] コマンドを参照してください。`goto` が割り当てられている場合、このパラメータは無視されます。選択肢の下にコマンドをネストする場合、無視されます。 |
| set | string | ユーザーが選択肢を選択したときに実行するセット式。構文については [@set] コマンドを参照してください。選択肢の下にコマンドをネストする場合、無視されます。 |
| show | boolean | 選択肢が追加された選択肢ハンドラーも表示するかどうか。デフォルトで有効です。 |
| time | decimal | フェードイン（表示）アニメーションの期間（秒単位）。 |

</div>

```nani
; テキストを表示し、すぐに選択肢を表示して、
; いずれかの選択肢が選択されるまで再生を停止します。
Continue executing this script or ...?[>]
@choice "Continue"
@choice "Load another script from start" goto:Another
@choice "Load another script from \"Label\" label" goto:Another#Label
@choice "Goto to \"Sub\" subroutine in another script" gosub:Another#Sub

; 選択肢に基づいてカスタム変数を設定します。
@choice "I'm humble, one is enough..." set:score++
@choice "Two, please." set:score=score+2
@choice "I'll take the entire stock!" set:karma--,score=999

; 選択肢が選択されたときに効果音を再生し、キャラクターを配置します。
@choice "Arrange"
    @sfx Click
    @arrange k.10,y.55

; 選択された選択肢に対応するテキスト行を表示します。
@choice "Ask about color"
    What's your favorite color?
@choice "Ask about age"
    How old are you?
@choice "Keep silent"
    ...

; 'score' 変数が10未満の場合、選択肢を無効/ロックします。
@choice "Extra option" lock:score<10

; 'score' 変数が10以上の場合にのみ選択肢を表示します。
@choice "Secret option" if:score>=10
```

## choiceHandler

[選択肢ハンドラーアクター](/ja/guide/choices) を変更します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">handlerId</span> | string | 変更する選択肢ハンドラーアクターのID。指定しない場合は、デフォルトのものが使用されます。 |
| default | boolean | 選択肢ハンドラーをデフォルトにするかどうか。`handler` パラメータが指定されていない場合、デフォルトのハンドラーがすべての選択肢関連コマンドの対象になります。 |
| id | string | 変更するアクターのID。表示されているすべてのアクターに影響を与えるには `*` を指定します。 |
| appearance | string | 変更されたアクターに設定する外観。 |
| pose | string | 変更されたアクターに設定するポーズ。 |
| via | string | 使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ（デフォルトではクロスフェードが使用されます）。 |
| params | decimal list | 遷移効果のパラメータ。 |
| dissolve | string | [カスタムディゾルブ](/ja/guide/special-effects#トランジションエフェクト) テクスチャへのパス（パスは `Resources` フォルダに対する相対パスである必要があります）。遷移が `Custom` モードに設定されている場合にのみ効果があります。 |
| visible | boolean | 変更されたアクターに設定する可視性ステータス。 |
| position | decimal list | 変更されたアクターに設定する位置（ワールド空間）。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー）を使用します。 |
| rotation | decimal list | 変更されたアクターに設定する回転。 |
| scale | decimal list | 変更されたアクターに設定するスケール。 |
| tint | string | 適用する色合い。<br><br>`#` で始まる文字列は、次の方法で16進数として解析されます：`#RGB`（`RRGGBB` になります）、`#RRGGBB`、`#RGBA`（`RRGGBBAA` になります）、`#RRGGBBAA`。アルファが指定されていない場合、デフォルトは `FF` になります。<br><br>`#` で始まらない文字列は、リテラルカラーとして解析され、次の色がサポートされています：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; 'ButtonArea' 選択肢ハンドラーをデフォルトにします。
@choiceHandler ButtonArea default!
```

## clearBacklog

[プリンターバックログ](/ja/guide/text-printers#プリンターバックログ) からすべてのメッセージを削除します。

```nani
; 印刷されたテキストはバックログから削除されます。
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
@clearBacklog
```

## clearChoice

指定されたID（IDが指定されていない場合はデフォルト、IDとして `*` が指定されている場合は既存のすべてのハンドラー）の選択肢ハンドラー内の現在の選択肢を削除し、（オプションで）それを非表示にします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">handlerId</span> | string | クリアする選択肢ハンドラーのID。指定しない場合はデフォルトのハンドラーを使用します。既存のすべてのハンドラーをクリアするには `*` を指定します。 |
| id | string | 削除する特定の選択肢の識別子。指定しない場合はすべての選択肢を削除します。 |
| hide | boolean | 影響を受ける選択肢ハンドラーも非表示にするかどうか。 |

</div>

```nani
; プレイヤーに2秒間選択の時間を与えます。
You have 2 seconds to respond![>]
@addChoice "Cats" set:response="Cats"
@addChoice "Dogs" set:response="Dogs"
@set response="None"
@wait 2
@clearChoice
@unless response="None"
    {response}, huh?
@else
    Time's out!
```

## despawn

[@spawn] コマンドで生成されたオブジェクトを破棄します。

::: info NOTE
プレハブのルートオブジェクトに `MonoBehaviour` コンポーネントがアタッチされており、そのコンポーネントが `IParameterized` インターフェースを実装している場合、オブジェクトを破棄する前に指定された `params` 値を渡します。コンポーネントが `IAwaitable` インターフェースを実装している場合、コマンドの実行は、実装によって返された非同期完了タスクを待機してからオブジェクトを破棄します。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">path</span> | string | 破棄するプレハブリソースの名前（パス）。同じパラメータを持つ [@spawn] コマンドが以前に実行されていることが期待されます。 |
| params | string list | プレハブを破棄する前に設定するパラメータ。プレハブのルートオブジェクトに `IParameterized` コンポーネントがアタッチされている必要があります。 |
| wait | boolean | `IAwaitable` インターフェースを実装している場合に、スポーンが時間の経過とともに破棄される間待機するかどうか。 |

</div>

```nani
; 以前に '@spawn Rainbow' コマンドが実行されたと仮定して、それをデスポーン（破棄）します。
@despawn Rainbow
```

## despawnAll

[@spawn] コマンドで生成されたすべてのオブジェクトを破棄します。現在生成されているすべてのオブジェクトに対して [@despawn] を呼び出すのと同じです。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| wait | boolean | `IAwaitable` インターフェースを実装している場合に、スポーンが時間の経過とともに破棄される間待機するかどうか。 |

</div>

```nani
@spawn Rainbow
@spawn SunShafts
; Rainbow と SunShafts の両方をデスポーン（破棄）します。
@despawnAll
```

## else

条件実行ブロックの分岐をマークします。これは、開いている [@if] または [@unless]、および先行する [@else]（ある場合）コマンドの条件が満たされない場合に実行されます。使用例については、[条件実行](/ja/guide/scenario-scripting#条件付き実行) ガイドを参照してください。

## endIf

条件ブロックでのインデント使用の代替：インデントに関係なく、前の [@if] コマンドで開かれたブロックの終了をマークします。使用例については、[条件実行](/ja/guide/scenario-scripting#条件付き実行) ガイドを参照してください。

## enterDialogue

レンダリングや入力処理などのNaninovelアクティビティを有効にして、ダイアログモードに入ります。Naninovelをドロップインのダイアログ/カットシーンシステムとして使用する場合に、ダイアログまたはビジュアルノベルモードに切り替えることを目的としています。

## exitDialogue

エンジンの状態をリセットし、レンダリングや入力処理などのほとんどのNaninovelアクティビティを無効にして、ダイアログモードを終了します。Naninovelをドロップインのダイアログ/カットシーンシステムとして使用する場合に、ダイアログまたはビジュアルノベルモードから切り替えることを目的としています。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| destroy | boolean | ダイアログモードを終了した後にエンジンを破棄（初期化解除）するかどうか。 |

</div>

## format

印刷されるメッセージに適用される [フォーマットテンプレート](/ja/guide/text-printers#メッセージテンプレート) を割り当てます。

::: info NOTE
[テキストスタイル](/ja/guide/text-printers#テキストスタイル) を使用して、印刷されたテキストをフォーマットすることもできます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">templates</span> | named string list | 適用するテンプレート（`Template.AuthorFilter` 形式）。詳細については、[フォーマットテンプレート](/ja/guide/text-printers#メッセージテンプレート) ガイドを参照してください。 |
| printer | string | テンプレートを割り当てるプリンターアクターのID。指定しない場合はデフォルトを使用します。 |

</div>

```nani
; 最初の2文を太字の赤色テキスト（サイズ45px）で印刷し、
; 次にスタイルをリセットして、最後の文をデフォルトスタイルで印刷します。
@format <color=#ff0000><b><size=45>%TEXT%</size></b></color>
Lorem ipsum dolor sit amet.
Cras ut nisi eget ex viverra egestas in nec magna.
@format default
Consectetur adipiscing elit.

; @format コマンドを使用する代わりに、
; 印刷されるテキストに直接スタイルを適用することも可能です。
Lorem ipsum sit amet. <b>Consectetur adipiscing elit.</b>
```

## glitch

メインカメラに [デジタルグリッチ](/ja/guide/special-effects#glitch) ポストプロセス効果を適用し、デジタルビデオの歪みやアーティファクトをシミュレートします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| time | decimal | 効果の持続時間（秒単位）。デフォルトは1です。 |
| power | decimal | 効果の強度（0.0〜10.0の範囲）。デフォルトは1です。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; デフォルトのパラメータでグリッチ効果を適用します。
@glitch
; 低い強度で3.33秒かけて効果を適用します。
@glitch time:3.33 power:0.1
```

## gosub

Naninovelスクリプトの再生を指定されたパスに移動し、そのパスをグローバル状態に保存します。[@return] コマンドは、この情報を使用して、最後に呼び出されたgosubコマンドの後のコマンドにリダイレクトします。

::: info NOTE
このコマンドは関数（サブルーチン）として使用して一連のスクリプト行を呼び出すことができますが、NaniScriptはシナリオスクリプトDSLであり、一般的なプログラミングには適していません。[カスタムコマンド](/ja/guide/custom-commands) を使用することを強くお勧めします。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">path</span> | string | 次の形式で移動するパス：`ScriptPath#Label`。ラベルが省略された場合、指定されたスクリプトを最初から再生します。スクリプトパスが省略された場合、現在再生中のスクリプト内のラベルを見つけようとします。 |

</div>

```nani
; 現在再生中のスクリプトの 'VictoryScene' ラベルに移動し、
; コマンドを実行して、'gosub' の後のコマンドに戻ります。
@gosub #VictoryScene
...
@stop
# VictoryScene
@back Victory
@sfx Fireworks
@bgm Fanfares
You are victorious!
@return

; サブルーチン内に分岐がある別の例。
@set time=10
; ここで1つの結果が得られます。
@gosub #Room
...
@set time=3
; そしてここで別の結果が得られます。
@gosub #Room
@stop
# Room
@print "It's too early, I should visit after sunset." if:time<21&time>6
@print "I can sense an ominous presence!" if:time>21|time<6
@return
```

## goto

Naninovelスクリプトの再生を指定されたパスに移動します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">path</span> | string | 次の形式で移動するパス：`ScriptPath#Label`。ラベルが省略された場合、指定されたスクリプトを最初から再生します。スクリプトパスが省略された場合、現在再生中のスクリプト内のラベルを見つけようとします。 |
| reset | string list | 指定された場合、スクリプトをロードする前にエンジンサービスの状態をリセットするかどうかを制御します（パスが別のスクリプトにつながる場合）：<br/> - `Goto.DontReset` 属性を持つものを除き、すべてのサービスをリセットするには `*` を指定します。<br/> - リセットから除外するサービスタイプ名（カンマ区切り）を指定します。`Goto.DontReset` 属性を持つものを含め、他のすべてのサービスはリセットされます。<br/> - 強制的にリセットしない場合は `-` を指定します（設定でデフォルトで有効になっている場合でも）。<br/><br/>一部のサービスには `Goto.DontReset` 属性が適用されており、デフォルトではリセットされませんが、特定のサービスをリセットから除外する場合は指定する必要があります。 |
| hold | boolean | ターゲットスクリプトのリソースを保持し、このコマンドが指定されたスクリプトと一緒にプリロードするかどうか。`Conservative` リソースポリシー以外では効果がありません。詳細については、[メモリ管理](/ja/guide/memory-management) ガイドを参照してください。 |
| release | boolean | メモリを解放するために、ターゲットスクリプトに移動する前にリソースを解放するかどうか。`Optimistic` リソースポリシー以外では効果がありません。詳細については、[メモリ管理](/ja/guide/memory-management) ガイドを参照してください。 |

</div>

```nani
; 'Script001' スクリプトをロードし、最初から再生を開始します。
@goto Script001

; 上記と同じですが、ラベル 'AfterStorm' から再生を開始します。
@goto Script001#AfterStorm

; 現在再生中のスクリプトの 'Epilogue' ラベルに移動します。
@goto #Epilogue
...
# Epilogue
...
```

## group

ネストされたブロック内のコマンドをグループ化できるようにします。

```nani
; Randomコマンドは、ネストされた行の1つをランダムに選択しますが、
; そのネストされた行の子は無視します。ここでGroupコマンドを使用して複数の行をグループ化すると、
; Randomコマンドは実際に複数の行を実行します。
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## hide

指定されたIDのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）を非表示にします。同じIDを持つ複数のアクターが見つかった場合（例：キャラクターとプリンター）、最初に見つかったものにのみ影響します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">actorIds</span> | string list | 非表示にするアクターのID。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; アクターID 'Smoke' が表示されていると仮定して、3秒かけて非表示にします。
@hide Smoke time:3

; 'Kohaku' と 'Yuko' アクターを非表示にします。
@hide Kohaku,Yuko
```

## hideAll

シーン上のすべてのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）を非表示にします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; シーン上の表示されているすべてのアクター（キャラクター、背景、プリンターなど）を非表示にします。
@hideAll
```

## hideChars

シーン上の表示されているすべてのキャラクターを非表示にします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; シーン上の表示されているすべてのキャラクターアクターを非表示にします。
@hideChars
```

## hidePrinter

テキストプリンターを非表示にします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">printerId</span> | string | 使用するプリンターアクターのID。指定しない場合はデフォルトを使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; デフォルトのプリンターを非表示にします。
@hidePrinter

; ID 'Wide' のプリンターを非表示にします。
@hidePrinter Wide
```

## hideUI

指定された名前の [UI要素](/ja/guide/gui#uiのカスタマイズ) を非表示にします。名前が指定されていない場合、UI全体（すべての組み込みUIを含む）のレンダリングを停止（非表示）します。

::: info NOTE
このコマンドでUI全体を非表示にし、`allowToggle` パラメータが false（デフォルト）の場合、ユーザーはホットキーを使用したり画面上の任意の場所をクリックしたりしてUIを再表示することはできません。UIを再び表示するには [@showUI] コマンドを使用してください。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">uINames</span> | string list | 非表示にするUI要素の名前。 |
| allowToggle | boolean | UI全体を非表示にする場合、ユーザーがホットキーを使用したり画面上の任意の場所をクリックしたりしてUIを再表示できるようにするかどうか（デフォルトではfalse）。特定のUIを非表示にする場合は効果がありません。 |
| time | decimal | 非表示アニメーションの期間（秒単位）。指定しない場合、UI固有の期間を使用します。 |
| wait | boolean | 次のコマンドを再生する前に、UIフェードアウトアニメーションを待機するかどうか。 |

</div>

```nani
; カスタム 'Calendar' UI があると仮定して、次のコマンドで非表示にします。
@hideUI Calendar

; UI全体を非表示にし、ユーザーが再表示できないようにします。
@hideUI
...
; UIを再び表示可能にします。
@showUI

; UI全体を非表示にしますが、ユーザーがトグルバックできるようにします。
@hideUI allowToggle!

; 組み込みの 'TipsUI' とカスタム 'Calendar' UI を同時に非表示にします。
@hideUI TipsUI,Calendar
```

## if

条件実行ブロックの開始をマークします。ネストされた行はブロックの本体と見なされ、条件付きの名前なしパラメータが `true` と評価された場合にのみ実行されます。詳細については、[条件実行](/ja/guide/scenario-scripting#条件付き実行) ガイドを参照してください。

::: info NOTE
このコマンドは [@unless] の逆で補完的です。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">expression</span> | string | 関連付けられたネストされたブロックが実行されるかどうかを決定するブール値を返す必要がある [スクリプト式](/ja/guide/script-expressions)。 |

</div>

```nani
; "score" 変数に応じてテキスト行を印刷します：
;   "You've failed. Try again!" - スコアが6未満の場合。
;   "You've passed the test." と "Brilliant!" - スコアが8より大きい場合。
;   "You've passed the test." と "Impressive!" - スコアが7より大きい場合。
;   "You've passed the test." と "Good job!" - それ以外。
@if score > 6
    You've passed the test.
    @if score > 8
        Brilliant!
    @or score > 7
        Impressive!
    @else
        Good job!
@else
    You've failed. Try again!

; "score" 変数に応じてテキスト行を印刷します：
;   "Test result: Failed." - スコアが6未満の場合。
;   "Test result: Perfect!" - スコアが8より大きい場合。
;   "Test result: Passed." - それ以外。
Test result:[if score>8] Perfect![or score>6] Passed.[else] Failed.[endif]
```

## input

ユーザーが任意のテキストを入力できる入力フィールドUIを表示します。送信時に、入力されたテキストは指定されたカスタム変数に割り当てられます。

::: info NOTE
このコマンドを使用してキャラクターの表示名を割り当てる場合は、[名前をカスタム変数にバインドする](/ja/guide/characters#表示名) ことを検討してください。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">variableName</span> | string | 入力されたテキストが割り当てられるカスタム変数の名前。 |
| type | string | 入力コンテンツのタイプ。デフォルトは指定された変数のタイプです。割り当てられた変数タイプを変更する場合や、新しい変数に割り当てる場合に使用します。サポートされているタイプ：`String`、`Numeric`、`Boolean`。 |
| summary | string | 入力フィールドと一緒に表示するオプションの概要テキスト。テキストにスペースが含まれる場合は、二重引用符 (`"`) で囲んでください。テキスト自体に二重引用符を含める場合は、エスケープしてください。 |
| value | string | 入力フィールドに設定する事前定義された値。割り当てられない場合、割り当てられた変数の既存の値（ある場合）を取得します。 |
| nostop | boolean | プレイヤーが入力を送信するまでスクリプトの再生を停止しないかどうか。 |

</div>

```nani
; 任意のテキストを入力するように求め、それを 'name' カスタム変数に割り当てます。
@input name summary:"Choose your name."

; その後、割り当てられた 'name' 変数をNaninovelスクリプトに注入できます。
Archibald: Greetings, {name}!

; ...または、セット式や条件式内で使用します。
@set score++ if:name="Felix"
```

## lipSync

指定されたIDを持つキャラクターのリップシンク口のアニメーションを強制停止できるようにします。停止すると、このコマンドが再度使用されて許可されるまで、アニメーションは再開されません。キャラクターはリップシンクイベントを受信できる必要があります（現在は汎用、レイヤー、およびLive2D実装のみ）。リップシンク機能の詳細については、[キャラクターガイド](/ja/guide/characters#リップシンク) を参照してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">charIdAndAllow</span> | named boolean | キャラクターIDと、リップシンクアニメーションを停止するか許可するかを示すブール値（trueまたはfalse）。 |

</div>

```nani
; 自動ボイスが無効で、リップシンクがテキストメッセージによって駆動されると仮定して、
; 口のアニメーションから句読点を除外します。
Kohaku: Lorem ipsum dolor sit amet[lipSync Kohaku.false]... [lipSync Kohaku.true]Consectetur adipiscing elit.
```

## loadScene

指定された名前の [Unityシーン](https://docs.unity3d.com/Manual/CreatingScenes.html) をロードします。ロードできるようにするには、必要なシーンを [ビルド設定](https://docs.unity3d.com/Manual/BuildSettings.html) に追加することを忘れないでください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">sceneName</span> | string | ロードするシーンの名前。 |
| additive | boolean | シーンを加算的にロードするか、新しいシーンをロードする前に現在ロードされているシーンをアンロードするか（デフォルト）。詳細については、[シーンロードのドキュメント](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html) を参照してください。 |

</div>

```nani
; 'TestScene1' シーンをシングルモードでロードします。
@loadScene TestScene1

; 'TestScene2' シーンを加算モードでロードします。
@loadScene TestScene2 additive!
```

## lock

指定されたIDの [アンロック可能アイテム](/ja/guide/unlockable-items) を `locked` 状態に設定します。

::: info NOTE
アイテムのアンロック状態は [グローバルスコープ](/ja/guide/state-management#グローバル状態) に保存されます。<br/> 指定されたIDのアイテムがグローバル状態マップに登録されていない場合、対応するレコードが自動的に追加されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">id</span> | string | アンロック可能アイテムのID。登録されているすべてのアンロック可能アイテムをロックするには `*` を使用します。 |

</div>

```nani
; ID 'FightScene1' のアンロック可能CGレコードをロックします。
@lock CG/FightScene1
```

## look

プレイヤーが入力デバイスでメインカメラをオフセットできる（例：マウスを動かす、またはゲームパッドのアナログスティックを使用する）カメラルックモードを有効/無効にします。コマンドの簡単なデモンストレーションについては、[このビデオ](https://youtu.be/rC6C9mA7Szw) を確認してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">enable</span> | boolean | カメラルックモードを有効にするか無効にするか。デフォルト：true。 |
| zone | decimal list | 初期カメラ位置からの単位でのX、Yサイズの境界ボックス。カメラをどれだけ移動できるかを示します。デフォルト：5.0,3.0 |
| speed | decimal list | X、Y軸によるカメラ移動速度（感度）。デフォルト：1.5,1.0 |
| gravity | boolean | ルック入力がアクティブでない場合（例：マウスが動いていない、またはアナログスティックがデフォルト位置にある場合）、カメラを自動的に初期位置に移動するかどうか。デフォルト：false。 |

</div>

```nani
; デフォルトのパラメータでカメラルックモードを有効にします。
@look

; カスタムパラメータでカメラルックモードを有効にします。
@look zone:6.5,4 speed:3,2.5 gravity!

; ルックモードを無効にし、オフセットを即座にリセットします。
@look false

; ルックを無効にしますが、速度0.25で徐々にリセットします。
@look false gravity! speed:0.25
```

## movie

指定された名前（パス）のムービーを再生します。

::: info NOTE
ムービーを再生する前に画面をフェードアウトし、再生後にフェードバックします。`cancel` 入力（デフォルトでは `Esc` キー）をアクティブにすることで、再生をキャンセルできます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">movieName</span> | string | 再生するムービーリソースの名前。 |
| time | decimal | フェードアニメーションの期間（秒単位）。指定しない場合、ムービー設定で設定されたフェード期間を使用します。 |
| block | boolean | ムービーの再生中にゲームとの対話をブロックして、プレイヤーがスキップできないようにするかどうか。 |

</div>

```nani
; 'Opening' ビデオクリップがムービーリソースに追加されていると仮定して、それを再生します。
@movie Opening
```

## openURL

デフォルトのWebブラウザで指定されたURL（Webアドレス）を開きます。

::: info NOTE
WebGLの外部またはエディター内では、Unityの `Application.OpenURL` メソッドを使用してコマンドを処理します。動作の詳細と制限については、[ドキュメント](https://docs.unity3d.com/ScriptReference/Application.OpenURL.html) を参照してください。WebGLでは、ネイティブの `window.open()` JS関数が呼び出されます：https://developer.mozilla.org/en-US/docs/Web/API/Window/open。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">uRL</span> | string | 開くURL。 |
| target | string | ブラウジングコンテキスト：_self（現在のタブ）、_blank（新しいタブ）、_parent、_top。 |

</div>

```nani
; 現在のタブで空白ページを開きます。
@openURL "about:blank"

; 新しいタブでNaninovelのWebサイトを開きます。
@openURL "https://naninovel.com" target:_blank
```

## or

Marks a branch of a conditional execution block, which is executed in case condition of the opening [@if] or [@unless] and preceding [@else] or [@or] (if any) commands are not met while the own condition is met. Can be used as shortcut for `@else if:...`. For usage examples see [conditional execution](/ja/guide/scenario-scripting#conditional-execution) guide.

<div class="config-table">

| Parameter | Type | Description                                                                                                                                                |
| --- | --- |------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span class="command-param-nameless command-param-required" title="Nameless parameter: value should be specified after the command identifier without specifying parameter ID  Required parameter: parameter should always be specified">expression</span> | string | A [script expression](/ja/guide/script-expressions), which should return a boolean value determining whether the associated nested block will be executed. |

</div>

## print

テキストプリンターアクターを使用して、指定されたテキストメッセージを印刷（徐々に表示）します。

::: info NOTE
このコマンドは、一般的なテキスト行を処理するときに内部で使用されます。たとえば、一般的な行 `Kohaku: Hello World!` は、Naninovelスクリプトを解析するときに自動的に `@print "Hello World!" author:Kohaku` に変換されます。<br/> デフォルトでは、新しいメッセージを印刷する前にプリンターをリセット（クリア）します。`reset` パラメータを *false* に設定するか、プリンターアクター設定の `Auto Reset` を無効にして、テキストを追加するようにします。<br/> デフォルトでは、プリンターをデフォルトにして他のプリンターを非表示にします。`default` パラメータを *false* に設定するか、プリンターアクター設定の `Auto Default` を無効にして、これを防ぎます。<br/> デフォルトでは、タスクを終了する前にユーザー入力を待機します。`waitInput` パラメータを *false* に設定するか、プリンターアクター設定の `Auto Wait` を無効にして、テキストが完全に表示されたらすぐに戻るようにします。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">text</span> | string | 印刷するメッセージのテキスト。テキストにスペースが含まれる場合は、二重引用符 (`"`) で囲んでください。テキスト自体に二重引用符を含める場合は、エスケープしてください。 |
| printer | string | 使用するプリンターアクターのID。指定しない場合はデフォルトを使用します。 |
| author | string | 印刷されたメッセージに関連付けるアクターのID。追加する場合は無視されます。`*` を指定するか、`,` を使用して複数のアクターIDを区切り、すべて/選択されたキャラクターをテキストの作成者にします。`as` パラメータと組み合わせて、複数のキャラクターが同時に話していることを表す場合に便利です。 |
| as | string | 指定された場合、メッセージの印刷中にテキストプリンターで著者名を表すために、著者ID（または関連付けられた表示名）の代わりにラベルを使用します。メッセージの色やアバターなどのプリンターの著者固有の動作をトリガーせずに、いくつかのメッセージのデフォルト名をオーバーライドしたり、複数の著者が同時に話していることを表したりするのに便利です。 |
| speed | decimal | テキスト表示速度の乗数。正またはゼロである必要があります。1に設定すると、デフォルトの速度になります。 |
| reset | boolean | 印刷タスクを実行する前にプリンターのテキストをリセットするかどうか。デフォルト値は、プリンターアクター設定メニューの `Auto Reset` プロパティによって制御されます。 |
| default | boolean | 印刷タスクを実行する前に、プリンターをデフォルトにして他のプリンターを非表示にするかどうか。デフォルト値は、プリンターアクター設定メニューの `Auto Default` プロパティによって制御されます。 |
| waitInput | boolean | 印刷タスクの完了後にユーザー入力を待機するかどうか。デフォルト値は、プリンターアクター設定メニューの `Auto Wait` プロパティによって制御されます。 |
| append | boolean | 印刷されたテキストを最後のプリンターメッセージに追加するかどうか。 |
| fadeTime | decimal | このコマンドに関連付けられたプリンターの表示および非表示アニメーションの期間（秒単位）を制御します。各プリンターのデフォルト値は、アクター設定で設定されています。 |
| wait | boolean | 次のコマンドを再生する前に、テキストの表示を待機して完了を促す（入力を待機する）かどうか。 |

</div>

```nani
; デフォルトのプリンターでフレーズを印刷します。
@print "Lorem ipsum dolor sit amet."

; テキスト自体に引用符を含めるには、エスケープします。
@print "Shouting \"Stop the car!\" was a mistake."

; 通常の半分の速度でメッセージを表示し、
; 続行するためにユーザー入力を待機しません。
@print "Lorem ipsum dolor sit amet." speed:0.5 !waitInput

; "Together" を著者名として表示して行を印刷し、
; 表示されているすべてのキャラクターを印刷されたテキストの著者にします。
@print "Hello World!" author:* as:"Together"

; 同様ですが、"Kohaku" と "Yuko" のみを著者にします。
@print "Hello World!" author:Kohaku,Yuko as:"Kohaku and Yuko"
```

## printer

[テキストプリンターアクター](/ja/guide/text-printers) を変更します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">idAndAppearance</span> | named string | 変更するプリンターのIDと設定する外観。IDまたは外観が指定されていない場合、デフォルトのものが使用されます。 |
| default | boolean | プリンターをデフォルトにするかどうか。`printer` パラメータが指定されていない場合、デフォルトのプリンターがすべてのプリンター関連コマンドの対象になります。 |
| hideOther | boolean | 他のすべてのプリンターを非表示にするかどうか。 |
| anchor | boolean | アクターアンカーによる自動プリンター配置を許可するかどうか。サポートされているプリンターで、プリンターを手動で配置した後に自動配置を再開する場合に有効にします。このコマンドで明示的な位置が割り当てられると、アンカーは自動的に無効になることに注意してください。 |
| pos | decimal list | 変更されたアクターに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| id | string | 変更するアクターのID。表示されているすべてのアクターに影響を与えるには `*` を指定します。 |
| appearance | string | 変更されたアクターに設定する外観。 |
| pose | string | 変更されたアクターに設定するポーズ。 |
| via | string | 使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ（デフォルトではクロスフェードが使用されます）。 |
| params | decimal list | 遷移効果のパラメータ。 |
| dissolve | string | [カスタムディゾルブ](/ja/guide/special-effects#トランジションエフェクト) テクスチャへのパス（パスは `Resources` フォルダに対する相対パスである必要があります）。遷移が `Custom` モードに設定されている場合にのみ効果があります。 |
| visible | boolean | 変更されたアクターに設定する可視性ステータス。 |
| position | decimal list | 変更されたアクターに設定する位置（ワールド空間）。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー）を使用します。 |
| rotation | decimal list | 変更されたアクターに設定する回転。 |
| scale | decimal list | 変更されたアクターに設定するスケール。 |
| tint | string | 適用する色合い。<br><br>`#` で始まる文字列は、次の方法で16進数として解析されます：`#RGB`（`RRGGBB` になります）、`#RRGGBB`、`#RGBA`（`RRGGBBAA` になります）、`#RRGGBBAA`。アルファが指定されていない場合、デフォルトは `FF` になります。<br><br>`#` で始まらない文字列は、リテラルカラーとして解析され、次の色がサポートされています：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; 'Wide' プリンターをデフォルトにし、他の表示されているプリンターを非表示にします。
@printer Wide

; 'Bubble' プリンターに 'Right' 外観を割り当て、デフォルトにし、
; シーンの中央に配置し、他のプリンターを非表示にしません。
@printer Bubble.Right pos:50,50 !hideOther
```

## processInput

ユーザー入力処理（例：キーボードのキーを押すことへの反応）の停止と再開を許可します。アクションの効果は永続的であり、ゲームの状態とともに保存されます。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">inputEnabled</span> | boolean | すべてのサンプラーの入力処理を有効にするかどうか。 |
| set | named boolean list | 個々の入力サンプラーをミュートおよびミュート解除できるようにします。 |

</div>

```nani
; すべてのサンプラーの入力処理を停止します。
@processInput false

; すべてのサンプラーの入力処理を再開します。
@processInput true

; 'Rollback' と 'Pause' 入力をミュートし、'Continue' 入力をミュート解除します。
@processInput set:Rollback.false,Pause.false,Continue.true
```
## purgeRollback

プレイヤーが以前の状態スナップショットにロールバックするのを防ぎます。

```nani
; プレイヤーが別の選択肢を選択しようとしてロールバックするのを防ぎます。

Select a choice. You won't be able to rollback.
@choice One goto:#One
@choice Two goto:#Two

# One
@purgeRollback
You've picked one.
@stop

# Two
@purgeRollback
You've picked two.
@stop
```

## rain

[雨](/ja/guide/special-effects#rain) をシミュレートするパーティクルシステムを生成します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| power | decimal | 雨の強度（1秒あたりのパーティクル生成率）。デフォルトは500。0に設定すると、効果が無効（デスポーン）になります。 |
| time | decimal | パーティクルシステムは、指定された時間（秒単位）で生成率を目標レベルまで徐々に増加させます。 |
| xSpeed | decimal | パーティクルの水平速度の乗数。雨滴の角度を変更するために使用します。 |
| ySpeed | decimal | パーティクルの垂直速度の乗数。 |
| pos | decimal list | 生成された効果ゲームオブジェクトに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| position | decimal list | 生成された効果ゲームオブジェクトに設定する位置（ワールド空間）。 |
| rotation | decimal list | 生成された効果ゲームオブジェクトに設定する回転。 |
| scale | decimal list | 生成された効果ゲームオブジェクトに設定するスケール。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; 10秒かけて激しい雨を開始します。
@Rain power:1500 time:10
; 30秒かけて雨を止めます。
@Rain power:0 time:30
```

## random

ランダムに選択されたネストされたコマンドの1つを実行します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| weight | decimal list | ネストされたコマンドのカスタマイズされた確率（0.0〜1.0の範囲）。デフォルトでは、すべてのコマンドが選択される確率は等しくなります。 |

</div>

```nani
; 3つのサウンドのうち1つを等しい確率で再生します。
@random
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; 2番目のサウンドを80%の確率で、1番目/3番目をそれぞれ10%の確率で再生します。
@random weight:0.1,0.8,0.1
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; カメラを振る、Kohakuアクターに色合いを付ける、または 'SoundX' SFXを再生する選択肢を追加します。
; すべて33%の確率です。ただし、SFXの再生は、
; スコアが10を超えている場合にのみ考慮されます。
@random
    @choice "Shake camera!"
        You've asked for it!
        @shake Camera
    @group
        Going to tint Kohaku!
        @char Kohaku tint:red
    @sfx SoundX if:score>10
```

## remove

指定されたIDのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）を削除（破棄）します。同じIDを持つ複数のアクターが見つかった場合（例：キャラクターとプリンター）、最初に見つかったものにのみ影響します。

::: info NOTE
デフォルトでは、Naninovelはスクリプトリソースをアンロードするときに未使用のアクターを自動的に削除します。このコマンドは、リソースプロバイダー設定で `Remove Actors` が無効になっている場合、または特定の瞬間にアクターを強制的に破棄する必要がある場合にのみ使用してください。詳細については、[メモリ管理](/ja/guide/memory-management#アクターリソース) ガイドを参照してください。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">actorIds</span> | string list | 削除するアクターのID、またはすべてのアクターを削除するには `*` を指定します。 |

</div>

```nani
; フェードオフしてから、KohakuとYukoアクターを破棄します。
@hide Kohaku,Yuko wait!
@remove Kohaku,Yuko

; フェードオフしてすべてのアクターを削除します。
@hideAll wait!
@remove *
```

## resetState

[エンジンサービス](/ja/guide/engine-services) の状態をリセットし、Naninovelによってロードされたすべてのリソース（テクスチャ、オーディオ、ビデオなど）をアンロード（破棄）します。基本的には、空の初期エンジン状態に戻ります。

::: info NOTE
このコマンドは元に戻す（巻き戻す）ことができないことに注意してください。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">exclude</span> | string list | リセットから除外する [エンジンサービス](/ja/guide/engine-services)（インターフェース）の名前。ローカル変数を保持するには、`ICustomVariableManager` を追加することを検討してください。 |
| only | string list | リセットする [エンジンサービス](/ja/guide/engine-services)（インターフェース）の名前。他のサービスは影響を受けません。名前なし（除外）パラメータが割り当てられている場合は効果がありません。 |

</div>

```nani
; すべてのサービスをリセットします（スクリプトの再生は停止します）。
@resetState

; スクリプトプレイヤー、カスタム変数、オーディオマネージャーを除くすべてのサービスをリセットし、
; 現在のスクリプトとオーディオトラックの再生を継続し、
; カスタム変数の値を保持します。
@resetState IScriptPlayer,ICustomVariableManager,IAudioManager

; 'ICharacterManager' と 'IBackgroundManager' サービスのみをリセットし、
; シーンからすべてのキャラクターと背景アクターを削除し、
; 関連リソースをメモリからアンロードします。
@resetState only:ICharacterManager,IBackgroundManager
```

## resetText

テキストプリンターの内容をリセット（クリア）します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">printerId</span> | string | 使用するプリンターアクターのID。指定しない場合はデフォルトを使用します。 |

</div>

```nani
; 印刷してからデフォルトのプリンターの内容をクリアします。
This line will disappear.
@resetText

; 上記と同じですが、'Wide' プリンターを使用します。
@print "This line will disappear." printer:Wide
@resetText Wide
```

## return

最後に使用された [@gosub] の後のコマンドへのNaninovelスクリプト再生の移動を試みます。詳細と使用例については、[@gosub] コマンドの概要を参照してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| reset | string list | 指定された場合、gosubが入力された初期スクリプトに戻る前にエンジンサービスの状態をリセットします（現在再生中のスクリプトではない場合）。すべてのサービスをリセットするには `*` を指定するか、リセットから除外するサービス名を指定します。デフォルトでは、状態はリセットされません。 |

</div>

## save

ゲームを最初のオートセーブスロットに自動的に保存します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| at | string | 次の形式の保存の再生位置：`ScriptPath#Label`。省略した場合、現在のプレイヤー位置を使用します。ゲームのロード後にプレイヤーを特定のラベルまたはスクリプトにリダイレクトするために使用できます。 |

</div>

```nani
; 現在の位置でオートセーブします。
@save

; プレイヤーは 'rest' を選択できます。これにより、ゲームがオートセーブされ、
; タイトルに戻るか 'NextDay' に進みます。休憩後にプレイヤーが保存されたゲームをロードすると、
; '# Camp' ラベルの後の行に移動し、
; 'rested' が 'true' に設定され、'NextDay' に進むことが強制されます。

# Camp

; 変数は '?=' で設定されていることに注意してください。これは、
; まだ割り当てられていない場合にのみ値を割り当てます。休憩後にプレイヤーが
; オートセーブされたゲームをロードした場合は、そうではありません。
@set rested?=false

@if rested
    Good morning! We have to go now.
    @goto NextDay

@choice "No time to rest!" goto:NextDay
@choice "Let's rest a bit"
    @set rested=true
    ; 'at' パラメータに注意してください。ゲームがロードされると、
    ; 指定されたラベルにプレイヤーをリダイレクトします。
    @save at:#Camp
    @title
```

## set

[スクリプト式](/ja/guide/script-expressions) の結果を [カスタム変数](/ja/guide/custom-variables) に割り当てます。

::: info NOTE
指定された名前の変数が存在しない場合は、自動的に作成されます。<br/><br/> `;` で区切って複数のセット式を指定します。式は宣言の順序で順番に実行されます。<br/><br/> 変数名が `t_` で始まる場合、'Script' [管理テキスト](/ja/guide/managed-text) ドキュメントに保存されている値への参照と見なされます。このような変数は割り当てることができず、ローカライズ可能なテキスト値を参照することを目的としています。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">expression</span> | string | 割り当て式。<br/><br/>式は `var=expression` の形式である必要があります。ここで、`var` は割り当てるカスタム変数の名前であり、`expression` は [スクリプト式](/ja/guide/script-expressions) であり、その結果が変数に割り当てられます。<br/><br/>インクリメントおよびデクリメント単項演算子（`@set foo++`、`@set foo--`）および複合代入（`@set foo+=10`、`@set foo-=3`、`@set foo*=0.1`、`@set foo/=2`）を使用できます。 |

</div>

```nani
; 'foo' 変数に 'bar' 文字列値を割り当てます。
@set foo="bar"

; 'foo' 変数に 1 数値を割り当てます。
@set foo=1

; 'foo' 変数に 'true' ブール値を割り当てます。
@set foo=true

; 'foo' が数値の場合、その値に 0.5 を加算します。
@set foo+=0.5

; 'angle' が数値の場合、そのコサインを 'foo' 変数に割り当てます。
@set foo=cos(angle)

; -100 から 100 までの乱数を取得し、4乗して
; 'foo' 変数に割り当てます。式の中に空白がある場合は、
; 引用符が必要です。
@set "foo = pow(random(-100, 100), 4)"

; 'foo' が数値の場合、その値に 1 を加算します（インクリメント）。
@set foo++

; 'foo' が数値の場合、その値から 1 を減算します（デクリメント）。
@set foo--

; 'foo' 変数に 'bar' 変数の値（'Hello World!' 文字列）を割り当てます。
@set bar="Hello World!"
@set foo=bar

; 1行で複数のセット式を定義します。
; 結果は上記と同じになります。
@set bar="Hello World!",foo=bar

; Naninovelスクリプトコマンドパラメータに変数を注入することが可能です。
@set scale=0
# EnlargeLoop
@char Kohaku.Default scale:{scale}
@set scale+=0.1
@goto #EnlargeLoop if:scale<1

; ...そして一般的なテキスト行にも。
@set drink="Dr. Pepper"
My favourite drink is {drink}!

; テキスト式の値の中で二重引用符を使用する場合は、エスケープします。
@set remark="Shouting \"Stop the car!\" was a mistake."

; グローバル変数（'g_' 接頭辞）を使用して、セッション間で値を保持します。
; ゲームを再起動しても変数は true のままです。
@set g_Ending001Reached=true

; 再生された場合でも、グローバル変数を一度だけインクリメントします。
@set g_GlobalCounter++ if:!hasPlayed()

; まだ割り当てられていない場合にのみ変数を宣言して割り当てます。
@set g_CompletedRouteX?=false
```

## sfx

指定された名前の現在再生中の [SFX（効果音）](/ja/guide/audio#sfx効果音) トラックを再生または変更します。

::: info NOTE
効果音トラックはデフォルトではループされません。sfxトラック名 (SfxPath) が指定されていない場合、現在再生中のすべてのトラックに影響します。すでに再生中のトラックに対して呼び出された場合、再生は影響を受けません（トラックは最初から再生されません）が、指定されたパラメータ（音量とトラックをループするかどうか）が適用されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">sfxPath</span> | string | 再生する効果音アセットへのパス。 |
| volume | decimal | 効果音の音量。 |
| loop | boolean | 効果音をループ再生するかどうか。 |
| fade | decimal | 再生開始時の音量フェードインの期間（秒単位、デフォルトは 0.0）。再生中のトラックを変更する場合は効果がありません。 |
| group | string | オーディオを再生するときに使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| time | decimal | 変更の期間（秒単位）。 |
| wait | boolean | 次のコマンドを再生する前に、SFXフェードアニメーションの完了を待機するかどうか。 |

</div>

```nani
; 'Explosion' という名前のSFXを一度再生します。
@sfx Explosion

; 'Rain' という名前のSFXをループで再生し、30秒かけてフェードインします。
@sfx Rain loop! fade:30

; 再生中のすべてのSFXトラックの音量を2.5秒かけて75%に変更し、
; すべてのループを無効にします。
@sfx volume:0.75 !loop time:2.5
```

## sfxFast

指定された名前の [SFX（効果音）](/ja/guide/audio#sfx効果音) トラックを再生します。[@sfx] コマンドとは異なり、クリップは最小限の遅延で再生され、ゲーム状態でシリアル化されません（保存時に再生されていても、ゲームのロード後に再生されません）。このコマンドは、UI関連のサウンド（例：[`Play Script` コンポーネント](/ja/guide/gui#unityイベントでのスクリプト再生) でのボタンクリック時）など、さまざまな一時的なオーディオクリップを再生するために使用できます。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">sfxPath</span> | string | 再生する効果音アセットへのパス。 |
| volume | decimal | 効果音の音量。 |
| restart | boolean | すでに再生中の場合にオーディオを最初から再生するかどうか。 |
| additive | boolean | 同じクリップの複数のインスタンスを再生できるようにするかどうか。`restart` が有効な場合は効果がありません。 |
| group | string | オーディオを再生するときに使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; 'Click' という名前のSFXを一度再生します。
@sfxFast Click

; 上記と同じですが、同じクリップの同時再生を許可します。
@sfxFast Click !restart
```

## shake

指定されたIDのアクターまたはメインカメラに [シェイク効果](/ja/guide/special-effects#shake) を適用します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">actorId</span> | string | シェイクするアクターのID。同じIDを持つ複数のアクターが見つかった場合（例：キャラクターとプリンター）、最初に見つかったものにのみ影響します。指定しない場合、デフォルトのテキストプリンターをシェイクします。メインカメラをシェイクするには、`Camera` キーワードを使用します。 |
| count | integer | シェイクの反復回数。`loop` が有効な場合は無視されます。 |
| loop | boolean | 無効になるまでシェイクを続けるかどうか。 |
| time | decimal | 各シェイク反復の基本期間（秒単位）。 |
| deltaTime | decimal | 効果の基本期間に適用されるランダマイザー修飾子。 |
| power | decimal | 各シェイク反復の基本変位振幅（単位）。 |
| deltaPower | decimal | 基本変位振幅に適用されるランダム化された修飾子。 |
| hor | boolean | アクターを水平方向（x軸）に変位させるかどうか。 |
| ver | boolean | アクターを垂直方向（y軸）に変位させるかどうか。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; デフォルトのパラメータで 'Dialogue' テキストプリンターをシェイクします。
@shake Dialogue

; 'Kohaku' キャラクターのシェイクを開始し、停止する選択肢を表示して、それに応じて動作します。
@shake Kohaku loop!
@choice "Stop shaking"
    @shake Kohaku !loop
...

; メインNaninovelカメラを水平方向に5回シェイクします。
@shake Camera count:5 hor! !ver
```

## show

指定されたIDのアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラーなど）を表示（可視化）します。同じIDを持つ複数のアクターが見つかった場合（例：キャラクターとプリンター）、最初に見つかったものにのみ影響します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">actorIds</span> | string list | 表示するアクターのID。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; アクターID 'Smoke' が非表示であると仮定して、3秒かけて表示します。
@show Smoke time:3

; 'Kohaku' と 'Yuko' アクターを表示します。
@show Kohaku,Yuko
```

## showPrinter

テキストプリンターを表示します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">printerId</span> | string | 使用するプリンターアクターのID。指定しない場合はデフォルトを使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; デフォルトのプリンターを表示します。
@showPrinter

; ID 'Wide' のプリンターを表示します。
@showPrinter Wide
```

## showUI

指定されたリソース名の [UI要素](/ja/guide/gui) を表示します。名前が指定されていない場合、UI全体を表示します（[@hideUI] で非表示にされていた場合）。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">uINames</span> | string list | 表示するUIリソースの名前。 |
| time | decimal | 表示アニメーションの期間（秒単位）。指定しない場合、UI固有の期間を使用します。 |
| wait | boolean | 次のコマンドを再生する前に、UIフェードインアニメーションを待機するかどうか。 |

</div>

```nani
; 'Calendar' という名前のカスタムUIを追加したと仮定して、
; 以下を実行するとシーンに表示されます。
@showUI Calendar

; @hideUI でUI全体を非表示にしたと仮定して、それを戻します。
@showUI

; 組み込みの 'TipsUI' とカスタム 'Calendar' UI を同時に表示します。
@showUI TipsUI,Calendar
```

## skip

スクリプトプレイヤーの「スキップ」モードを有効または無効にできるようにします。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">enable</span> | boolean | スキップモードを有効にする（デフォルト）か無効にするか。 |

</div>

```nani
; スキップモードを有効にします。
@skip

; スキップモードを無効にします。
@skip false
```

## slide

指定されたIDのアクター（キャラクター、背景、テキストプリンター、または選択肢ハンドラー）をスライド（2つの位置間を移動）させ、オプションでアクターの可視性と外観を変更します。複数の [@char] または [@back] コマンドの代わりに、スライドアニメーションでアクターを表示または非表示にするために使用できます。

::: info NOTE
このコマンドは、すべてのアクターマネージャーで指定されたIDの既存のアクターを検索し、同じIDを持つ複数のアクターが存在する場合（例：キャラクターとテキストプリンター）、最初に見つかったものにのみ影響することに注意してください。このコマンドで参照する前に、アクターがシーンに存在することを確認してください。たとえば、キャラクターの場合は、`@char CharID visible:false time:0` を使用して、プレイヤーに気付かれずにシーンに追加できます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">idAndAppearance</span> | named string | スライドするアクターのIDと（オプションで）設定する外観。 |
| from | decimal list | アクターをスライドさせるシーン空間内の位置（スライド開始位置）。次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。Zコンポーネント（深度）はワールド空間です。指定しない場合、表示されている場合は現在のアクターの位置を使用し、そうでない場合はランダムなシーン外の位置を使用します（左または右の境界からスライドインする可能性があります）。 |
| <span class="command-param-required" title="必須パラメータ: パラメータは常に指定する必要があります">to</span> | decimal list | アクターをスライドさせるシーン空間内の位置（スライド終了位置）。 |
| visible | boolean | アクターの可視性ステータスを変更します（表示または非表示）。設定されておらず、ターゲットアクターが非表示の場合でも、自動的に表示されます。 |
| easing | string | 適用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。指定しない場合、設定で設定されたデフォルトの関数を使用します。 |
| time | decimal | コマンドによって開始されるアニメーションの期間（秒単位）。 |
| lazy | boolean | コマンドによって開始されたアニメーションがすでに実行されている場合、`lazy` を有効にすると、アニメーションは現在の状態から新しいターゲットへ継続します。`lazy` が有効になっていない場合（デフォルトの動作）、現在実行中のアニメーションは、新しいターゲットへのアニメーションを開始する前に即座に完了します。 |
| wait | boolean | シナリオスクリプトで次のコマンドの実行を開始する前に、コマンドの完了を待機するかどうか。デフォルトの動作は、スクリプトプレイヤー設定の `Wait By Default` オプションによって制御されます。 |

</div>

```nani
; 'Jenna' アクターが表示されていないと仮定して、'Angry' の外観で表示し、
; シーンの左または右の境界から中央にスライドさせます。
@slide Jenna.Angry to:50

; 'Sheba' アクターが現在表示されていると仮定して、
; 非表示にして、シーンの左端の外にスライドさせます。
@slide Sheba to:-10 !visible

; 'EaseOutBounce' アニメーションイージングを使用して、
; 5秒かけて 'Mia' アクターをシーンの左中央側から右下にスライドさせます。
@slide Sheba from:15,50 to:85,0 time:5 easing:EaseOutBounce
```
## snow

[雪](/ja/guide/special-effects#snow) をシミュレートするパーティクルシステムを生成します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| power | decimal | 雪の強度（1秒あたりのパーティクル生成率）。デフォルトは100。0に設定すると、効果が無効（デスポーン）になります。 |
| time | decimal | パーティクルシステムは、指定された時間（秒単位）で生成率を目標レベルまで徐々に増加させます。 |
| pos | decimal list | 生成された効果ゲームオブジェクトに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| position | decimal list | 生成された効果ゲームオブジェクトに設定する位置（ワールド空間）。 |
| rotation | decimal list | 生成された効果ゲームオブジェクトに設定する回転。 |
| scale | decimal list | 生成された効果ゲームオブジェクトに設定するスケール。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; 10秒かけて激しい雪を開始します。
@snow power:300 time:10
; 30秒かけて雪を止めます。
@snow power:0 time:30
```

## spawn

プレハブまたは [特殊効果](/ja/guide/special-effects) をインスタンス化します。すでに生成されているオブジェクトに対して実行された場合は、代わりに生成パラメータを更新します。

::: info NOTE
プレハブのルートオブジェクトに `MonoBehaviour` コンポーネントがアタッチされており、そのコンポーネントが `IParameterized` インターフェースを実装している場合、生成後に指定された `params` 値を渡します。コンポーネントが `IAwaitable` インターフェースを実装している場合、コマンドの実行は、実装によって返された非同期完了タスクを待機できます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">path</span> | string | 生成するプレハブリソースの名前（パス）。 |
| params | string list | プレハブを生成するときに設定するパラメータ。プレハブのルートオブジェクトに `IParameterized` コンポーネントがアタッチされている必要があります。 |
| pos | decimal list | 生成されたオブジェクトに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| position | decimal list | 生成されたオブジェクトに設定する位置（ワールド空間）。 |
| rotation | decimal list | 生成されたオブジェクトに設定する回転。 |
| scale | decimal list | 生成されたオブジェクトに設定するスケール。 |
| wait | boolean | `IAwaitable` インターフェースを実装している場合に、スポーンのウォームアップを待機するかどうか。 |

</div>

```nani
; 'Rainbow' プレハブがスポーンリソースに割り当てられていると仮定して、それをインスタンス化します。
@spawn Rainbow
```

## stop

シナリオスクリプトの再生を停止します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">trackId</span> | string | 停止するスクリプトトラックの識別子。指定しない場合はメイントラックを停止します。[@async] コマンドで生成された非同期トラックの再生を停止するために使用できます。 |

</div>

```nani
@gosub #Label
...
@stop

; 上記のStopコマンドは、下のラベルの下でスクリプト再生が続行されるのを防ぎます。
# Label
This line is only executed when navigated directly with a @gosub.
@return

; 'Quake' 非同期タスクを停止するまでループします。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }
...
; 'Quake' 非同期タスクを停止します。
@stop Quake
```

## stopBgm

指定された名前のBGM（背景音楽）トラックの再生を停止します。

::: info NOTE
音楽トラック名 (BgmPath) が指定されていない場合、現在再生中のすべてのトラックを停止します。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">bgmPath</span> | string | 停止する音楽トラックへのパス。 |
| fade | decimal | 再生を停止する前の音量フェードアウトの期間（秒単位、デフォルトは 0.35）。 |
| wait | boolean | 次のコマンドを再生する前に、BGMフェードアウトアニメーションの完了を待機するかどうか。 |

</div>

```nani
; 10秒かけて 'Sanctuary' BGMトラックをフェードアウトし、再生を停止します。
@stopBgm Sanctuary fade:10

; 現在再生中のすべての音楽トラックを停止します。
@stopBgm
```

## stopSfx

指定された名前のSFX（効果音）トラックの再生を停止します。

::: info NOTE
効果音トラック名 (SfxPath) が指定されていない場合、現在再生中のすべてのトラックを停止します。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">sfxPath</span> | string | 停止する効果音へのパス。 |
| fade | decimal | 再生を停止する前の音量フェードアウトの期間（秒単位、デフォルトは 0.35）。 |
| wait | boolean | 次のコマンドを再生する前に、SFXフェードアウトアニメーションの完了を待機するかどうか。 |

</div>

```nani
; 15秒かけてフェードアウトし、'Rain' という名前のSFXの再生を停止します。
@stopSfx Rain fade:15

; 現在再生中のすべての効果音トラックを停止します。
@stopSfx
```

## stopVoice

現在再生中のボイスクリップの再生を停止します。

```nani
; ボイスが再生されていると仮定して、それを停止します。
@stopVoice
```

## sun

[太陽光](/ja/guide/special-effects#sun)（別名ゴッドレイ）をシミュレートするパーティクルシステムを生成します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| power | decimal | 光線の強度（不透明度）、0.0〜1.0の範囲。デフォルトは0.85。0に設定すると、効果が無効（デスポーン）になります。 |
| time | decimal | パーティクルシステムは、指定された時間（秒単位）で生成率を目標レベルまで徐々に増加させます。 |
| pos | decimal list | 生成された効果ゲームオブジェクトに設定する位置（シーン境界に対する相対的なパーセンテージ）。位置は次のように記述されます：`0,0` は左下、`50,50` は中央、`100,100` はシーンの右上隅です。直交モードで深度によって移動（ソート）するには、Zコンポーネント（3番目のメンバー、例 `,,10`）を使用します。 |
| position | decimal list | 生成された効果ゲームオブジェクトに設定する位置（ワールド空間）。 |
| rotation | decimal list | 生成された効果ゲームオブジェクトに設定する回転。 |
| scale | decimal list | 生成された効果ゲームオブジェクトに設定するスケール。 |
| wait | boolean | 次のコマンドを再生する前に、効果のウォームアップアニメーションを待機するかどうか。 |

</div>

```nani
; 10秒かけて強い日差しを開始します。
@sun power:1 time:10
; 30秒かけて日差しを止めます。
@sun power:0 time:30
```

## sync

指定された識別子を持つプレイヤートラックを現在の行にナビゲートし、ホストトラックを破棄します。非同期に実行されたトラックを互いに、またはメイントラックと結合（同期）するために使用します。詳細については、[同時再生](/ja/guide/scenario-scripting#並行再生) ガイドを参照してください。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">trackId</span> | string | 結合するプレイヤートラックの一意の識別子。指定しない場合はメイントラックを使用します。 |

</div>

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; 60秒後、'Boom' タスクが停止していない場合、
    ; 下の @sync コマンドは強制的にメイントラックをここに移動し、
    ; その後 'BadEnd' スクリプトに移動します。
    @sync
    @goto BadEnd

; 一連の爆弾解除パズルをシミュレートします。
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; 'Boom' 非同期タスクは停止されるため、メイントラックは
; 中断することなく実行を継続します。
@stop Boom
The bomb is defused!
```

## timeline

指定された名前のシーンゲームオブジェクト上の [Director](https://docs.unity3d.com/ScriptReference/Playables.PlayableDirector.html) コンポーネントを介して [Timeline](https://docs.unity3d.com/Manual/com.unity.timeline.html) を制御します。デフォルトでは、'stop'、'pause'、または 'resume' フラグが指定されていない限り、コマンドはディレクターの再生を開始します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">name</span> | string | 'Playable Director' コンポーネントがアタッチされているアクティブなシーンゲームオブジェクトの名前。 |
| stop | boolean | ディレクターを停止するかどうか。 |
| pause | boolean | ディレクターを一時停止するかどうか。 |
| resume | boolean | ディレクターを再開するかどうか。 |
| wait | boolean | スクリプトの実行を続行する前に、ディレクターの再生が停止するまで待機するかどうか。 |

</div>

```nani
; シーン上の 'Cutscene001' ゲームオブジェクトにアタッチされたディレクターコンポーネントに
; 関連するタイムラインの再生を開始させ、完了を待機します。
@timeline Cutscene001 wait!

; 'The Other Cutscene' ゲームオブジェクトにアタッチされたディレクターを停止します。
@timeline "The Other Cutscene" stop!
```

## title

エンジンの状態をリセットし、'Title' スクリプト（スクリプト設定で割り当てられている場合）の再生を開始します。

```nani
; タイトルに戻ります。
@title
```

## toast

指定されたテキストと（オプションで）外観および期間を使用して、汎用の自己非表示ポップアップ通知（別名「トースト」）のUIを表示します。UIは、指定された（またはデフォルトの）期間後に自動的に非表示になります。

::: info NOTE
外観名は、`ToastUI` UIプレハブ内の `Toast Appearance` コンポーネントを持つゲームオブジェクトの名前です（大文字と小文字は区別されません）。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">text</span> | string | トーストに設定するテキストコンテンツ。 |
| appearance | string | トーストの外観バリアント（ゲームオブジェクト名）。指定しない場合、Toast UIプレハブで設定されたデフォルトの外観を使用します。 |
| time | decimal | トーストを非表示にする前に待機する秒数。指定しない場合、Toast UIプレハブでデフォルトで設定された期間を使用します。 |

</div>

```nani
; 'Hello World!' コンテンツを含むデフォルトのトーストを表示します。
@toast "Hello World!"

; 'warning' 外観のトーストを表示します。
@toast "You're in danger!" appearance:warning

; トーストは1秒で消えます。
@toast "I'll disappear in 1 second." time:1
```

## trans

コマンドの実行開始時に表示されているもの（UIを除く）で実際のシーンコンテンツをマスクし、ネストされたコマンドを実行してシーンを変更し、指定された [遷移効果](/ja/guide/special-effects#トランジションエフェクト) で終了するシーン遷移を実行します。<br/><br/> このコマンドはアクターの外観遷移と同様に機能しますが、シーン全体をカバーします。遷移効果を使用して、複数のアクターやその他の可視エンティティを単一のバッチで新しい状態に変更するために使用します。

::: info NOTE
遷移の進行中（ネストされたコマンドの実行中）、UIは非表示になり、ユーザー入力はブロックされます。遷移プロセスを処理する `ISceneTransitionUI` をオーバーライドすることで、これを変更できます。<br/><br/> 非同期のネストされたコマンドは、それぞれに `time:0` を指定しなくてもすぐに実行されます。<br/><br/> ネストされたブロックは常に終了することが期待されています。ネストされたブロックの外に移動する可能性のあるコマンドをネストしないでください。未定義の動作が発生する可能性があります。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります">transition</span> | string | 使用する [遷移効果](/ja/guide/special-effects#トランジションエフェクト) のタイプ（デフォルトではクロスフェードが使用されます）。 |
| params | decimal list | 遷移効果のパラメータ。 |
| dissolve | string | [カスタムディゾルブ](/ja/guide/special-effects#トランジションエフェクト) テクスチャへのパス（パスは `Resources` フォルダに対する相対パスである必要があります）。遷移が `Custom` モードに設定されている場合にのみ効果があります。 |
| easing | string | 遷移に使用する [イージング関数](/ja/guide/special-effects#トランジションエフェクト) の名前。 |
| time | decimal | 遷移の期間（秒単位）。 |

</div>

```nani
; 'Felix' キャラクターと晴れた雰囲気で初期シーンを設定します。
@char Felix
@back SunnyDay
@sun power:1
Felix: What a nice day!

; 'DropFade' 遷移効果を使用して3秒かけて
; 'Jenna' キャラクターと雨の雰囲気の新しいシーンに遷移します。
@trans DropFade time:3
    @hide Felix
    @char Jenna
    @back RainyDay
    @sun power:0
    @rain power:1
Jenna: When will the damn rain stop?
```

## unless

反転条件実行ブロックの開始をマークします。ネストされた行はブロックの本体と見なされ、条件付きの名前なしパラメータが `false` と評価された場合にのみ実行されます。詳細については、[条件実行](/ja/guide/scenario-scripting#条件付き実行) ガイドを参照してください。

::: info NOTE
このコマンドは [@if] の逆で補完的です。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">expression</span> | string | 関連付けられたネストされたブロックが実行されるかどうかを決定するブール値を返す必要がある [スクリプト式](/ja/guide/script-expressions)。 |

</div>

```nani
; "dead" 変数が false の場合に "You're still alive!" を印刷し、
; それ以外の場合は "You're done." を印刷します。
@unless dead
    You're still alive!
@else
    You're done.

; "score" 変数に応じてテキスト行を印刷します：
;   "Test result: Passed." - スコアが10以上の場合。
;   "Test result: Failed." - スコアが10未満の場合。
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

## unloadScene

指定された名前の [Unityシーン](https://docs.unity3d.com/Manual/CreatingScenes.html) をアンロードします。ロードできるようにするには、必要なシーンを [ビルド設定](https://docs.unity3d.com/Manual/BuildSettings.html) に追加することを忘れないでください。加算的にロードされたシーンのみをアンロードできることに注意してください（少なくとも1つのシーンは常にロードされたままにする必要があります）。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">sceneName</span> | string | アンロードするシーンの名前。 |

</div>

```nani
; 'TestScene2' シーンを加算モードでロードしてからアンロードします。
@loadScene TestScene2 additive!
@unloadScene TestScene2
```

## unlock

指定されたIDの [アンロック可能アイテム](/ja/guide/unlockable-items) を `unlocked` 状態に設定します。

::: info NOTE
アイテムのアンロック状態は [グローバルスコープ](/ja/guide/state-management#グローバル状態) に保存されます。<br/> 指定されたIDのアイテムがグローバル状態マップに登録されていない場合、対応するレコードが自動的に追加されます。
:::

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">id</span> | string | アンロック可能アイテムのID。登録されているすべてのアンロック可能アイテムをアンロックするには `*` を使用します。 |

</div>

```nani
; ID 'FightScene1' のアンロック可能CGレコードをアンロックします。
@unlock CG/FightScene1
```

## voice

指定されたパスでボイスクリップを再生します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">voicePath</span> | string | 再生するボイスクリップへのパス。 |
| volume | decimal | 再生の音量。 |
| group | string | オーディオを再生するときに使用するオーディオミキサー [グループパス](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| authorId | string | このボイスが属するキャラクターアクターのID。指定され、[著者ごとの音量](/ja/guide/voicing#著者の音量) が使用されている場合、音量はそれに応じて調整されます。 |

</div>

```nani
; 'Rawr' ボイスリソースが利用可能であると仮定して、それを再生します。
@voice Rawr
```

## wait

指定された待機条件までスクリプトの実行を保留します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">waitMode</span> | string | 待機条件：<br/> - `i` ユーザーが続行またはスキップ入力キーを押す;<br/> - `0.0` タイマー（秒）;<br/> - `i0.0` 続行またはスキップ入力キーでスキップ可能なタイマー。 |

</div>

```nani
; 背景のシェイク効果が終了してから0.5秒後に雷のSFXが再生されます。
@spawn ShakeBackground
@wait 0.5
@sfx Thunder

; 最初の2語を印刷し、残りを印刷する前に入力を待機します。
Lorem ipsum[wait i] dolor sit amet.
; この待機モードには、次のショートカットも使用できます。
Lorem ipsum[-] dolor sit amet.

; ループSFXを開始し、メッセージを印刷し、スキップ可能な5秒の遅延を待機してから、
; SFXを停止します。
@sfx Noise loop!
Jeez, what a disgusting Noise. Shut it down![wait i5][>]
@stopSfx Noise
```

## while

指定された条件式が `true` に解決される限り、ネストされた行をループで実行します。

<div class="config-table">

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="名前なしパラメータ: パラメータIDを指定せずにコマンド識別子の後に値を指定する必要があります 必須パラメータ: パラメータは常に指定する必要があります">expression</span> | string | 関連付けられたネストされたブロックがループで実行を継続するかどうかを決定するブール値を返す必要がある [スクリプト式](/ja/guide/script-expressions)。 |

</div>

```nani
; 数字当てゲーム。
@set number=random(1,100),answer=0
@while answer!=number
    @input answer summary:"Guess a number between 1 and 100"
    @if answer<number
        Wrong, too low.
    @else if:answer>number
        Wrong, too high.
    @else
        Correct!
```
