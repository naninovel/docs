# カスタムアクターの実装

アクターは名前、外観、可視性、および形状（位置、回転、スケール）によって記述されるシーンの要素です。外観、可視性、変形を時間をかけて変化させることもできます。アクターの例として、キャラクター、背景、テキストプリンター、選択肢ハンドラーがあります。

アクターは、 `IActor` インターフェイスとその派生物によって表されます:

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

各アクターインターフェイスは複数の実装を持つことができます。例えば キャラクターアクターには現在、4つの組み込み実装があります。スプライト、分解スプライト、一般、およびLive2Dです。

アクター実装はコンテキストメニュー `Naninovel -> Configuration` のコンフィグマネージャーで行えます。すべてのアクターデフォルトの実装を適用することも、アクターごとに特定の実装も設定することもできます。デフォルトの実装を変更するには、 `Default Metadata` プロパティを使用します。特定の実装を設定するには、アクターの設定で `Implementation` ドロップダウンリストを使用します。

![Default Actor Implementation](https://i.gyazo.com/b372520a15501dc9bc1e5f30f4c7f12d.png)
![Actor Implementation](https://i.gyazo.com/3256f3aea99ea453859f67135a7187ee.png)

実装ドロップダウンリストには、全てのアクターインターフェイス実装の種類が含まれています。独自のカスタム実装を追加すると、それらもリストに表示されます。独自のアクター実装を作成する際は、`Naninovel/Runtime/Actor` スクリプトを参照してください。組み込みの抽象アクター実装 `Naninovel.MonoBehaviourActor` を検討してください。これはほとんどの基本インターフェース要件を満たしています。

カスタムアクター実装を作成するときは、互換性のあるパブリックコンストラクター: `public CustomActorImplementation (string id, ActorMetadata metadata)` があることを確認してください。ここで `id` はアクターのID、` metadata` はアクター（アクターレコードが存在する場合）またはデフォルトのメタデータです。特定のアクターインターフェイスを実装する場合、対応する特定のメタデータをリクエストすることができます（たとえば、 "ICharacterActor" 実装の "CharacterMetadata"）。

エディターメニューで割り当てられたリソースをロードするには、必ず絶対パスで指定してください。たとえば、 "CubeBackground" という名前のリソースを割り当てた場合は:

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— このようにリソースを読み込みます:

```csharp
var prefabResource = await prefabLoader.LoadAsync(id + "/CubeBackground");
```

— ここで、 `id` はコンストラクタを介して渡されるアクターのIDです。

以下は、ダミーの `ICharacterActor` 実装の例です。これは何もしませんが、メソッドのいずれかが呼び出されるとログに記録します。

```csharp
using Naninovel;
using System.Threading;
using UniRx.Async;
using UnityEngine;

public class CustomCharacterImplementation : MonoBehaviourActor, ICharacterActor
{
    public override string Appearance { get; set; }
    public override bool Visible { get; set; }
    public CharacterLookDirection LookDirection { get; set; }

    public CustomCharacterImplementation (string id, CharacterMetadata metadata)
        : base (id, metadata)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::Ctor({id})");
    }

    public override UniTask ChangeAppearanceAsync (string appearance, float duration,
        EasingType easingType = EasingType.Linear, Transition? transition = default,
        CancellationToken cancellationToken = default)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::ChangeAppearanceAsync({appearance})");
        return UniTask.CompletedTask;
    }

    public override UniTask ChangeVisibilityAsync (bool isVisible, float duration,
        EasingType easingType = EasingType.Linear, CancellationToken cancellationToken = default)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::ChangeVisibilityAsync({isVisible})");
        return UniTask.CompletedTask;
    }

    public UniTask ChangeLookDirectionAsync (CharacterLookDirection lookDirection, float duration,
        EasingType easingType = EasingType.Linear, CancellationToken cancellationToken = default)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::ChangeLookDirectionAsync({lookDirection})");
        return UniTask.CompletedTask;
    }

    protected override Color GetBehaviourTintColor ()
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::GetBehaviourTintColor");
        return default;
    }

    protected override void SetBehaviourTintColor (Color tintColor)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::SetBehaviourTintColor({tintColor})");
    }
}
```
