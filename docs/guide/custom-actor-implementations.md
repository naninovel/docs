# Custom Actor Implementations

Actor is a scene entity defined by a name, appearance, visibility and transform (position, rotation and scale). It can asynchronously change appearance, visibility and transform over time. Examples of actors are characters, backgrounds, text printers and choice handlers.

Actors are represented by `IActor` interface and its derivatives:

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

Each actor interface can have multiple implementations; e.g. character actors currently have seven built-in implementations: sprite, diced sprite, generic, layered, narrator, Spine and Live2D.

Actor implementation can be selected in the configuration managers accessible via `Naninovel -> Configuration` context menu. You can both change default implementation used for all the actors or set specific implementation per actor. To change default implementation, use `Default Metadata` property and to set specific ones, use an `Implementation` drop-down list in actor's configuration.

![](https://i.gyazo.com/74625fa24b58362de15bb8e07753824d.png)
![](https://i.gyazo.com/eeb42043eb9a841de003f8db848f1427.png)

Implementation drop-down list contains all the types that implements specific actor interface. You can add your own custom implementations, and they'll also appear in the list. See `Naninovel/Runtime/Actor` scripts for a reference when creating your own actor implementation. Consider using `MonoBehaviourActor` built-in abstract actor implementation to fulfill most of the base interface requirements in case the actor is supposed to be spawned on scene.

When creating custom actor implementations, make sure they have a compatible public constructor:

```csharp
public ActorImplementationType (string id, ActorMetadata metadata) { }
```

— where `id` is the ID of the actor and `metadata` — either actor's (when actor record exists in the resources) or a default metadata. When implementing a specific actor interface, it's possible to request corresponding specific metadata (eg, "CharacterMetadata" for "ICharacterActor" implementation).

::: warning
When adding custom implementation types under a non-predefined assembly (via [assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html)), add the assembly name to the `Type Assemblies` list found in the engine configuration menu. Otherwise, the engine won't be able to locate your custom types.
:::

::: tip EXAMPLE
For a complete example on adding custom actor implementation see [Live2D extension project on GitHub](https://github.com/naninovel/samples/tree/main/unity/live2d). Specifically, the custom "Live2DCharacter" actor is implemented in [Runtime/Live2DCharacter.cs](https://github.com/Naninovel/Live2D/blob/master/Assets/NaninovelLive2D/Runtime/Live2DCharacter.cs) script.
:::

## Actor Resources

Apply `ActorResources` attribute to the implementation type to specify which assets can be used as resources for you custom actor and whether it's allowed to assign multiple resources in the editor menus. When multiple resources are not allowed (default), you can load the single available resource by specifying just the actor ID, eg:

```csharp
var resource = await resourceLoader.LoadAsync(actorId);
```

When multiple resources are allowed, specify full path; eg, given you've assigned a resource with "CubeBackground" name:

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— to load the resource, use:

```csharp
var resource = await resourceLoader.LoadAsync($"{actorId}/CubeBackground");
```

## Custom Metadata

It's possible to add custom additional data to the actors metadata (of both built-in and custom implementations).

To inject custom data, create a new C# class and inherit it from `CustomMetadata<TActor>` type, where `TActor` is the type of the actor implementation the data should be associated with. Below is an example of adding custom data to the characters of "CustomCharacterImplementation" implementation:

```csharp
using Naninovel;
using UnityEngine;

public class MyCharacterData : CustomMetadata<CustomCharacterImplementation>
{
    public int MyCustomInt;
    [Range(0f, 100f), Tooltip("Tooltip for my custom range.")]
    public float MyCustomRange = 50f;
    [ColorUsage(false, true)]
    public Color MyCustomColor = Color.white;
}
```

Serializable fields of the created custom data class will be automatically exposed in the Naninovel editor menus, when actor with the associated implementation is selected.

![](https://i.gyazo.com/72f46feb74b6de568b299329500bd7d5.png)

To access the custom data at runtime, use `GetCustomData<TData>()` method of `ActorMetadata` instance, where `TData` is the type of the custom data class, eg:

```csharp
var charsConfig = Engine.GetConfiguration<CharactersConfiguration>();
var myCharMeta = charsConfig.GetMetadataOrDefault("CharId");
var myCharData = myCharMeta.GetCustomData<MyCharacterData>();
Debug.Log(myCharData.MyCustomInt);
```

### Custom Metadata Editor

It's possible to customize the custom metadata editor via [property drawers](https://docs.unity3d.com/Manual/editor-PropertyDrawers.html). Below is an example on adding a property drawer, which will insert an extra label above the edited field.

```csharp
// Create an attribute to apply to the serialized fields;
// don't forget to inherit it from `PropertyAttribute`.
public class ExtraLabelAttribute : PropertyAttribute
{
    public readonly string LabelText;

    public ExtraLabelAttribute (string labelText)
    {
        LabelText = labelText;
    }
}

// Create the custom editor, that will used when drawing the affected fields.
// The script should be inside an `Editor` folder, as it uses `UnityEditor` API.
[CustomPropertyDrawer(typeof(ExtraLabelAttribute))]
public class ExtraLabelPropertyDrawer : PropertyDrawer
{
    public override void OnGUI (Rect rect, SerializedProperty prop, GUIContent label)
    {
        var extraLabelAttribute = attribute as ExtraLabelAttribute;

        rect.height = EditorGUIUtility.singleLineHeight;
        EditorGUI.LabelField(rect, extraLabelAttribute.LabelText);

        rect.y += EditorGUIUtility.singleLineHeight +
                  EditorGUIUtility.standardVerticalSpacing;
        EditorGUI.PropertyField(rect, prop);
    }

    public override float GetPropertyHeight (SerializedProperty prop, GUIContent label)
    {
        return EditorGUIUtility.singleLineHeight * 2 +
               EditorGUIUtility.standardVerticalSpacing;
    }
}

// Now you can use the attribute to apply extra label to the serialized fields.
public class MyCharacterData : CustomMetadata<CustomCharacterImplementation>
{
    [ExtraLabel("Text from my custom property drawer")]
    public string MyCustomProperty;
}
```

Given the above implementation, our custom character data will now draw as following:

![](https://i.gyazo.com/294a9e2812d33ea3c863f9f53906b327.png)

::: tip
It's also possible to override built-in configuration editors as a whole; see [custom configuration](/guide/custom-configuration#overriding-built-in-editors) guide for more information and examples.
:::

## Custom State

To override or extend state type for your custom actor, you'll have to also [override the actor's manager](/guide/engine-services#overriding-built-in-services), as the state is serialized and applied to the managed actors there.

::: info NOTE
This applies for custom actor implementations of one of the built-in `IActor` interface derivatives (characters, backgrounds, text printers and choice handlers); if you've inherited your custom actor directly from `IActor`, there's no need to override the built-in managers to use a custom state — just create your own.

In case you're looking to add a custom state for other systems (eg, UIs, game objects or components for various game mechanics outside of Naninovel), see [state management guide](/guide/state-management#custom-state).
:::

Below is an example on extending choice handler state by adding a `LastChoiceTime` field, which stores time of the last added choice. The time is printed to the console when the custom choice handler is shown.

```csharp
// Our extended state, that serializes the last choice time.
public class MyChoiceHandlerState : ChoiceHandlerState
{
    // This field is serializable and persist through game save-loads.
    public string LastChoiceTime;

    // This method is invoked when saving the game; get the required data
    // from the actor and store it with serializable fields.
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
        EasingType easingType = default, AsyncToken token = default)
    {
        Debug.Log($"Last choice time: {LastChoiceTime}");
        return base.ChangeVisibilityAsync(visible, duration, easingType, token);
    }
}

// Overriding built-in choice handler manager to make it use our extended state.
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
