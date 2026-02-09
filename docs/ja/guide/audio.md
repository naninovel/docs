# オーディオ

BGM（背景音楽）やSFX（効果音）リソースを追加、編集、削除するには、`Naninovel -> Resources -> Audio` からアクセスできるオーディオリソースマネージャーを使用します。[Unityでサポートされている](https://docs.unity3d.com/Manual/AudioFiles.html) 任意のオーディオ形式を使用できます。

::: tip
開発ワークフローに最も適したファイル形式を選択してください。プロジェクトをビルドすると、Unityはすべてのソースリソース（テクスチャ、オーディオ、ビデオなど）をターゲットプラットフォームに最適な形式に自動的に変換するため、プロジェクトにリソースを保存する際の形式は重要ではありません。Unityがプロジェクトアセットを管理する方法の詳細については、[公式ドキュメント](https://docs.unity3d.com/Manual/AssetWorkflow) を参照してください。
:::

オーディオファイルが多く、エディタメニューから割り当てるのが不便な場合は、`Resources/Naninovel/Audio` フォルダにドロップするだけで、スクリプトで自動的に利用可能になります。必要に応じて、さらにサブフォルダで整理することもできます。この場合、シナリオスクリプトで参照するときはスラッシュ（`/`）を使用します。たとえば、`Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` として保存されているオーディオクリップは、スクリプトで `Music/Ambient/Noise002` として参照できます。

[Addressable Asset System](/ja/guide/resource-providers#addressable) を使用してリソースを手動で公開することも可能です。アセットを公開するには、上記の方法で公開するために使用するパスと同じアドレスを割り当てますが、「Resources/」部分を省略します。たとえば、「MainTheme.wav」BGMを公開するには、クリップアセットに次のアドレスを割り当てます：`Naninovel/Audio/MainTheme`。Addressableプロバイダーはデフォルトではエディタで使用されないことに注意してください。リソースプロバイダー構成メニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

::: warning
リソースマネージャーを介して割り当てられていないオーディオアセットは、キャラクターアクターの `Message Sound` を選択するために使用されるものなど、さまざまなエディタドロップダウンでは使用できません。
:::

オーディオ再生の動作は、`Naninovel -> Configuration -> Audio` コンテキストメニューを使用して構成できます。利用可能なオプションについては、[構成ガイド](/ja/guide/configuration#オーディオ) を参照してください。

## BGM（背景音楽）

シナリオスクリプトで音楽再生を制御するには、[@bgm] コマンドの後にクリップ名を続けます。

```nani
; "Sanctuary" という名前の音楽トラックをループで再生し始めます。
@bgm Sanctuary

; 上記と同じですが、10秒かけてボリュームをフェードインし、一度だけ再生します。
@bgm Sanctuary fade:10 !loop

; 再生中のすべての音楽トラックのボリュームを2.5秒かけて50%に変更し、
; ループ再生にします。
@bgm volume:0.5 loop! time:2.5
```

音楽トラックはデフォルトでループされます。[@bgm] コマンドで音楽トラック名が指定されていない場合、現在再生中のすべてのトラックが影響を受けます。すでに再生中のトラックに対して呼び出された場合、トラックは再起動しませんが、指定されたパラメータ（ボリュームとトラックがループされるかどうか）が適用されます。

`intro` パラメータを使用して、イントロの後にループを再生することが可能です。例：

```nani
; "BattleThemeIntro" を一度再生し、その後 "BattleThemeMain" をループで再生します。
@bgm BattleThemeMain intro:BattleThemeIntro
```

再生中の音楽トラックを停止するには、[@stopBgm] コマンドの後にクリップ名を続けます。クリップ名が指定されていない場合、コマンドは現在再生中のすべてのトラックを停止します。

```nani
; "Promenade" 音楽トラックを10秒かけてフェードアウトし、再生を停止します。
@stopBgm Promenade fade:10

; 現在再生中のすべての音楽トラックを停止します。
@stopBgm
```

## SFX（効果音）

シナリオスクリプトで効果音の再生を制御するには、[@sfx] および [@stopSfx] コマンドの後にクリップ名を続けます。

```nani
; "Explosion" という名前のSFXを一度再生します。
@sfx Explosion

; "Rain" という名前のSFXをループで再生します。
@sfx Rain loop!

; 再生中のすべてのSFXトラックのボリュームを2.5秒かけて75%に変更し、
; すべてのループを無効にします。
@sfx volume:0.75 !loop time:2.5
```

効果音トラックはデフォルトではループされません。[@sfx] コマンドでSFXトラック名が指定されていない場合、現在再生中のすべてのトラックが影響を受けます。すでに再生中のトラックに対して呼び出された場合、トラックは再起動しませんが、指定されたパラメータ（ボリュームとトラックがループされるかどうか）が適用されます。

再生中の効果音（ループされているかどうかにかかわらず）を停止するには、[@stopSfx] コマンドの後にクリップ名を続けます。クリップ名が指定されていない場合、コマンドは現在再生中のすべてのSFXトラックを停止します。

```nani
; "Rain" という名前のSFXの再生を停止し、15秒かけてフェードアウトします。
@stopSfx Rain fade:15

; 現在再生中のすべての効果音トラックを停止します。
@stopSfx
```

## オーディオミキサー

Naninovelは、オーディオを再生するときに [オーディオミキサー](https://docs.unity3d.com/Manual/AudioMixer.html) アセットを使用して、BGM、SFX、ボイスチャンネルを分離します。

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

カスタムミキサーアセットを割り当てたり、各オーディオチャンネルに使用されるグループを変更したり、オーディオ構成メニューでボリュームコントロールハンドラー（公開されたパラメータ名）を変更したりすることが可能です。カスタムミキサーアセットが割り当てられていない場合、デフォルトのものが使用されます。

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

カスタムミキサーグループを介してオーディオを再生するには、[@bgm]、[@sfx]、[@voice] コマンドで使用可能な `group` パラメータでグループパスを指定します。

```nani
; "Master/Ambient" ミキサーグループを介して "Noise" オーディオリソースをループで再生します。
@sfx Noise loop! group:Master/Ambient

; "Master/Reverb" ミキサーグループを介して "ScaryVoice" ボイスリソースを再生します。
@voice ScaryVoice group:Master/Reverb
```

グループは、現在割り当てられているオーディオミキサーアセットの `FindMatchingGroups(groupPath)` メソッドで取得されます。予想されるパス形式の詳細については、[Unityドキュメント](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) を参照してください。提供されたパスに複数のグループが関連付けられている場合、最初のグループがオーディオの再生に使用されます。

## カスタムオーディオバックエンド

Unityでは、組み込みのオーディオバックエンドを [FMOD](https://www.fmod.com) や [Wwise](https://www.audiokinetic.com/en/wwise/) などのカスタムソリューションに置き換えることができます。これをサポートするために、Naninovelの `IAudioManager` インターフェイスがデフォルトのオーディオバックエンドに依存しないようにしました（たとえば、`AudioClip` や `AudioSource` などを参照しません）。これにより、エンジンのソースコードを変更することなく、[サービスをオーバーライド](/ja/guide/engine-services#組み込みサービスのオーバーライド) してカスタムオーディオバックエンドを使用できます。

以下は、FMODのこのようなオーバーライドの最小限の例です。

```cs
[InitializeAtRuntime(@override: typeof(AudioManager))]
public class FMODAudioManager : IAudioManager
{
    // FMODリソースの読み込みは外部で管理されていると仮定します。
    public IResourceLoader AudioLoader { get; } = new NullResourceLoader();

    // FMODのライフサイクルは外部で管理されていると仮定します。
    public Awaitable InitializeService () => Async.Completed;
    public void DestroyService () { }

    public Awaitable PlaySfx (string path, ...)
    {
        // パスからFMODのイベント参照を解決して再生します。
    }

    public AudioMixerGroup GetGroup (string groupPath)
    {
        // nullを返すか、サポートされていない機能を無視しても問題ありません。
        return null;
    }

    // その他のAPI...
}
```
