# オーディオ

この記事ではバックグラウンドミュージック (BGM) と 効果音 (SFX) について記載しています。声については [ボイスガイド](/ja/guide/voicing.md) をご覧ください。

BGMおよびSFXリソースを追加、編集、または削除するには、 `Naninovel -> Resources -> Audio` へアクセスして、オーディオリソースマネージャーを使用します。 [Unityでサポートされている](https://docs.unity3d.com/Manual/AudioFiles.html) 任意のオーディオ形式を使用できます。

![](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

大量のオーディオファイルがありエディターメニューから割り当てるのが大変な場合は、 `Resources/Naninovel/Audio` フォルダーにドロップするだけで自動的にスクリプトで使用できるようになります。必要に応じて、さらにサブフォルダで整理することもできます。この場合、naninovelスクリプトで参照する場合はスラッシュ (`/`) を使用します。たとえば、 `Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` として保存されたオーディオクリップは、 `Music/Ambient/Noise002` としてスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers.md#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。たとえば、`MainTheme.wav` BGMを公開するには、次のアドレスにクリップアセットを割り当てます：`Naninovel/Audio/MainTheme`。addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

::: warn
リソースマネージャーを介して割り当てられていないオーディオアセットは、キャラクターアクターの `Message Sound` の選択など、さまざまなエディタードロップダウン項目で使用できません。
:::

オーディオ再生の設定は、コンテキストメニューの `Naninovel -> Configuration -> Audio` で設定できます。利用可能なオプションは [コンフィグガイド](/ja/guide/configuration.md#audio) をご覧ください。

## バックグラウンドミュージック

[@bgm] コマンドの後にクリップの名前を続けることで、naninovel スクリプトで音楽の再生を制御できます:

```nani
; 音楽トラック `Sanctuary` のループ再生を開始。
@bgm Sanctuary

; 上記に加えて、ボリュームを10秒間でフェードインさせ、一回だけ再生する。
@bgm Sanctuary fade:10 loop:false

; 再生中のすべての音楽トラックのボリュームを2.5秒かけて50％に変更し、ループで再生。
@bgm volume:0.5 loop:true time:2.5
```

音楽トラックはデフォルトでループされます。音楽トラック名 [@bgm] コマンドで指定されていない場合は、現在再生されているすべてのトラックに影響します。既に再生中のトラックを呼び出した場合、再生は影響を受けません（トラックの最初から再生を始めることはありません）が、指定したパラメーター(ボリュームとトラックのループ状態)は適用されます。

 `intro` パラメーターを入れることで、ループ再生の前にイントロを再生することができます。例:

```nani
; `BattleThemeIntro` を一回だけ再生し、その後すぐに `BattleThemeMain` をループ再生する。
@bgm BattleThemeMain intro:BattleThemeIntro
```

音楽トラックの再生を停止するには、 [@stopBgm] コマンドの後にクリップ名を続けてください。クリップ名が指定されていない場合は、再生中の全てのトラックを停止します。

```nani
; 音楽トラック `Promenade` を10秒かけてフェードアウトし、再生停止する。
@stopBgm Promenade fade:10

; 再生中の全ての音楽を停止する。
@stopBgm
```

## 効果音

[@sfx] と [@stopSfx] コマンドの後にクリップ名を記述して、naninovel スクリプトで効果音の再生を制御します:

```nani
; `Explosion` という名前の効果音を一度だけ再生する。
@sfx Explosion

; Rain` という名前の効果音をループ再生する。
@sfx Rain loop:true

; 再生中の全ての効果音のボリュームを2.5秒かけて75%に変更し、かつ全てループさせない。
@sfx volume:0.75 loop:false time:2.5
```

効果音はデフォルトではループしません。効果音のトラック名が [@sfx] コマンドで指定されていない場合は、再生中の全てのトラックが影響を受けます。既に再生中のトラックに対して呼び出された場合、再生は影響を受けません（トラックが最初から再生されることはありません）が、指定したパラメーター（ボリュームとトラックのループ状態）には影響します。

ループの有無にかかわらず、再生中のサウンド効果を停止するには、 [@stopSfx] コマンドに続けてクリップ名を記述します。 クリップ名が指定されていない場合、再生中のすべての効果音トラックを停止します。

```nani
; 効果音 `Rain` を15秒かけてフェードアウトして停止する。
@stopSfx Rain fade:15

; 再生中のすべての効果音トラックを停止する。
@stopSfx
```

## オーディオミキサー

Naninovelは、BGM、SFX、および音声チャネルを別々に再生するために、[オーディオミキサー](https://docs.unity3d.com/Manual/AudioMixer.html) アセットを使用します。

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

オーディオコンフィグメニューで、カスタムミキサーアセットを割り当てたり、各オーディオチャネルに使用されるグループを変更したり、ボリュームコントロールハンドラー（公開されたパラメーター名）を変更したりできます。カスタムミキサーアセットが割り当てられていない場合、デフォルトのアセットが使用されます。

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

カスタムミキサーグループでオーディオを再生するには、 `group` パラメーターでグループパスを指定してください。[@bgm]、 [@sfx]、 [@voice] コマンドで有効です。

```nani
; `Master/Ambient` ミキサーグループを使って `Noise` オーディオをループ再生する。
@sfx Noise loop:true group:Master/Ambient

; `Master/Reverb` ミキサーグループを使って `ScaryVoice` ボイスをループ再生する。
@voice ScaryVoice group:Master/Reverb
```

グループは、現在割り当てられているオーディオミキサーアセットの `FindMatchingGroups(groupPath)` メソッドで取得されます。 望ましいパス形式については、[Unityドキュメント](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) を参照してください。指定されたパスに複数のグループが関連付けられている場合、最初のグループがオーディオの再生に使用されます。

C# スクリプトで `IAudioManager` [エンジンサービス](/ja/guide/engine-services.md) を介して、現在使用中のオーディオミキサーを取得できます

```csharp
var audioManager = Engine.GetService<IAudioManager>();
var audioMixer = audioManager.AudioMixer;
```
