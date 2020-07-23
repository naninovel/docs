# Custom Actor Implementations

Actor is a scene entity defined by a name, appearance, visibility and transform (position, rotation and scale). It can asynchronously change appearance, visibility and transform over time. Examples of actors are characters, backgrounds, text printers and choice handlers. 

Actors are represented by `IActor` interface and its derivatives:

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

Each actor interface can have multiple implementations; e.g. character actors currently have four built-in implementations: sprite, diced sprite, generic and Live2D.

Actor implementation can be selected in the configuration managers accessible via `Naninovel -> Configuration` context menu. You can both change default implementation used for all the actors or set specific implementation per actor. To change default implementation, use `Default Metadata` property and to set specific ones, use an `Implementation` drop-down list in actor's configuration. 

![Default Actor Implementation](https://i.gyazo.com/b372520a15501dc9bc1e5f30f4c7f12d.png)
![Actor Implementation](https://i.gyazo.com/3256f3aea99ea453859f67135a7187ee.png)

Implementation drop-down list contains all the types that implements specific actor interface. You can add your own custom implementations and they'll also appear in the list. See `Naninovel/Runtime/Actor` scripts for a reference when creating your own actor implementations. Consider using `Naninovel.MonoBehaviourActor` built-in abstract actor implementation to fulfill most of the base interface requirements.

When creating custom actor implementations, make sure they have a compatible public constructor: `public CustomActorImplementation (string id, ActorMetadata metadata)`, where `id` is the ID of the actor and `metadata` — either actor's (when actor record exists in the resources) or a default metadata. When implementing a specific actor interface, it's possible to request corresponding specific metadata (eg, "CharacterMetadata" for "ICharacterActor" implementation).

To load a resource assigned in editor menu, don't forget to specify full path; eg, given you've assigned a resource with "CubeBackground" name:

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— to load the resource, use:

```csharp
var prefabResource = await prefabLoader.LoadAsync(id + "/CubeBackground");
```

— where `id` is the ID of the actor passed via the constructor.

Below is an example of a dummy `ICharacterActor` implementation, that does nothing, but logs when any of its methods are invoked.

```csharp
using Naninovel;
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


