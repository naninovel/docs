# Пользовательские реализации акторов

Актор – объект сцены, определяемый именем, внешностью, видимостью и трансформацией (положение, поворот и масштаб). Он может асинхронно изменять внешность, видимость и трансформироваться с течением времени. Примерами акторов являются персонажи, фон, текстовые принтеры и обработчики выбора.

Акторы представлены интерфейсом `IActor` и его производными:

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

Каждый интерфейс актора может иметь несколько реализаций; например, акторы персонажей в настоящее время имеют четыре встроенные реализации: спрайт, нарезанный спрайт, универсальный и Live2D.

Реализации акторов могут быть выбраны в менеджерах конфигураций, доступных через контекстное меню `Naninovel -> Configuration`. Вы можете как изменить реализацию по умолчанию, используемую для всех акторов, так и установить конкретную реализацию для каждого актора. Чтобы изменить реализацию по умолчанию, используйте свойство `Default Metadata`, а чтобы задать конкретные, используйте выпадающий список `Implementation` в конфигурации актора.

![Реализация актора по умолчанию](https://i.gyazo.com/b372520a15501dc9bc1e5f30f4c7f12d.png)
![Реализация актора](https://i.gyazo.com/3256f3aea99ea453859f67135a7187ee.png)

Выпадающий список реализации содержит все типы, реализующие определенный интерфейс актора. Вы можете добавить свои собственные пользовательские реализации, и они также появятся в списке. См. `Naninovel/Runtime/Actor` для справки при создании собственных реализаций акторов. Вы можете использовать встроенную реализацию абстрактного актора `Naninovel.MonoBehaviourActor` для реализации большинства требований базового интерфейса.

При создании пользовательских реализаций акторов, убедитесь, что они используют совместимый публичный конструктор: `public CustomActorImplementation (string id, ActorMetadata metadata)`, где `ID` – идентификатор актора и `metadata` — метаданные либо актора (если запись актора существует в ресурсах), либо метаданные по умолчанию. При реализации конкретного интерфейса актора можно запросить соответствующие конкретные метаданные (например, "CharacterMetadata" для реализации "ICharacterActor").

Чтобы загрузить ресурс, назначенный в меню редактора, не забудьте указать полный путь; например, если вы назначили ресурс с именем "CubeBackground":

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— для загрузки ресурса используйте:

```csharp
var prefabResource = await prefabLoader.LoadAsync(id + "/CubeBackground");
```

— где `id` – ID актора, проходящего через конструктор.

Ниже приведен пример фиктивной реализации `ICharacterActor`, которая ничего не делает, но регистрирует, когда вызывается любой из ее методов.

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
        AsyncToken asyncToken = default)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::ChangeAppearanceAsync({appearance})");
        return UniTask.CompletedTask;
    }

    public override UniTask ChangeVisibilityAsync (bool isVisible, float duration, 
        EasingType easingType = EasingType.Linear, AsyncToken asyncToken = default)
    {
        Debug.Log($"{nameof(CustomCharacterImplementation)}::ChangeVisibilityAsync({isVisible})");
        return UniTask.CompletedTask;
    }

    public UniTask ChangeLookDirectionAsync (CharacterLookDirection lookDirection, float duration,
        EasingType easingType = EasingType.Linear, AsyncToken asyncToken = default)
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


