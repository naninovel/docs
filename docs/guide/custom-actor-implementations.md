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

::: example
For a complete example on adding custom actor implementation see [Live2D extension project on GitHub](https://github.com/Elringus/NaninovelLive2D). Specifically, the custom "Live2DCharacter" actor is implemented in [Runtime/Live2DCharacter.cs](https://github.com/Elringus/NaninovelLive2D/blob/master/Assets/NaninovelLive2D/Runtime/Live2DCharacter.cs) script.
:::

## Custom Metadata

It's possible to add custom additional data to the actors metadata (of both built-in and custom implementations).

To inject custom data, create a new C# class, inherit it from `UnityEngine.ScriptableObject` and apply `CustomMetadata` attribute. The attribute expects one argument, specifying which actor implementation type the data should be associated with. Below is an example of adding custom data to the characters of "CustomCharacterImplementation" implementation:

```csharp
using Naninovel;
using UnityEngine;

[System.Serializable, CustomMetadata(typeof(CustomCharacterImplementation))]
public class MyCharacterData : ScriptableObject
{
    public int MyCustomInt;
    [Range(0f, 100f), Tooltip("Tooltip for my custom range.")]
    public float MyCustomRange = 50f;
    [ColorUsage(false, true)]
    public Color MyCustomColor = Color.white;
}
```

Serializable fields of the created custom data class will be automatically exposed in the Naninovel editor menus, when actor with the associated implementation is selected.

![](https://i.gyazo.com/74698c4a181a2c719d0c1ef8c5672eaa.png)

To access the custom data at runtime, use `GetCustomData<TData>()` method of `ActorMetadata` instance, where `TData` is the type of the custom data class, eg:

```csharp
public CustomCharacterImplementation (string id, CharacterMetadata metadata)
    : base (id, metadata)
{
    var myData = metadata.GetCustomData<MyCharacterData>();
    Debug.Log(myData.MyCustomInt);
}
```

## Custom State

To override or extend state type for your custom actor, you'll have to also [override the actor's manager](/guide/engine-services.md#overriding-built-in-services), as the state is serialized and applied to the managed actors there.

::: note
This applies for custom actor implementations of one of the built-in `IActor` interface derivatives (characters, backgrounds, text printers and choice handlers); if you've inherited your custom actor directly from `IActor`, there's no need to override the built-in managers to use a custom state — just create your own.

In case you're looking to add a custom state for other systems (eg, UIs, game objects or components for various game mechanics outside of Naninovel), see [state management guide](/guide/state-management.md#custom-state).
:::

Below is an example on extending choice handler state by adding a `LastChoiceTime` field, which stores time of the last added choice. The time is printed to the console when the custom choice handler is shown.

```csharp
// Our extended state, that serializes the last choice time.
public class MyChoiceHandlerState : ChoiceHandlerState
{
    // This field is serializable and persist through game save-loads.
    public string LastChoiceTime;

    // This method is invoked when saving the game;
    // get the required data from the actor and store it with serializable fields.
    public override void OverwriteFromActor (IChoiceHandlerActor actor)
    {
        base.OverwriteFromActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            LastChoiceTime = myCustomChoiceHandler.LastChoiceTime;
    }

    // This method is invoked when loading the game;
    // get the serialized data back and apply it to the actor.
    public override void ApplyToActor (IChoiceHandlerActor actor)
    {
        base.ApplyToActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            myCustomChoiceHandler.LastChoiceTime = LastChoiceTime;
    }
}

// Our custom choice handler implementation, that uses the last choice time.
public class MyCustomChoiceHandler : UIChoiceHandler
{
    public string LastChoiceTime { get; set; }
    
    public MyCustomChoiceHandler (string id, ChoiceHandlerMetadata metadata) 
        : base(id, metadata) { }

    public override void AddChoice (ChoiceState choice)
    {
        base.AddChoice(choice);
        LastChoiceTime = DateTime.Now.ToShortTimeString();
    }

    public override UniTask ChangeVisibilityAsync (bool visible, float duration, 
        EasingType easingType = default, CancellationToken cancelToken = default)
    {
        Debug.Log($"Last choice time: {LastChoiceTime}");
        return base.ChangeVisibilityAsync(visible, duration, easingType, cancelToken);
    }
}

// Overriding the built-in choice handler manager to make it use our extended state.
// The important step is to specify `MyChoiceHandlerState` in the generic types;
// other modifications are just to fulfill the interface requirements. 
[InitializeAtRuntime(@override: typeof(ChoiceHandlerManager))]
public class MyChoiceHandlerManager : ActorManager<IChoiceHandlerActor, 
    MyChoiceHandlerState, ChoiceHandlerMetadata, 
    ChoiceHandlersConfiguration>, IChoiceHandlerManager
{
    public MyChoiceHandlerManager (ChoiceHandlersConfiguration config)
        : base(config) { }

    public UniTask<IChoiceHandlerActor> AddActorAsync (string actorId, 
        ChoiceHandlerState state)
    {
        return base.AddActorAsync(actorId, state as MyChoiceHandlerState);
    }

    ChoiceHandlerState IActorManager<IChoiceHandlerActor, 
        ChoiceHandlerState, ChoiceHandlerMetadata, 
        ChoiceHandlersConfiguration>.GetActorState (string actorId)
    {
        return base.GetActorState(actorId);
    }
}
```

Our custom choice handler will now keep the last added choice time and log it in the console, even if the last choice was added in a previous game session loaded from a save slot. You can store any amount of custom data in addition to the built-in actor state this way. For the supported serializable data types see [Unity's serialization guide](https://docs.unity3d.com/Manual/script-Serialization.html).