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

Implementation drop-down list contains all the types that implements specific actor interface. You can add your own custom implementations, and they'll also appear in the list. See `Naninovel/Runtime/Actor` scripts for a reference when creating your own actor implementation. Consider using `Naninovel.MonoBehaviourActor` built-in abstract actor implementation to fulfill most of the base interface requirements in case the actor is supposed to be spawned on scene.

When creating custom actor implementations, make sure they have a compatible public constructor: 

```csharp
public ActorImplementationType (string id, ActorMetadata metadata) { }
```

— where `id` is the ID of the actor and `metadata` — either actor's (when actor record exists in the resources) or a default metadata. When implementing a specific actor interface, it's possible to request corresponding specific metadata (eg, "CharacterMetadata" for "ICharacterActor" implementation).

::: example
For a complete example on adding custom actor implementation see [Live2D extension project on GitHub](https://github.com/Elringus/NaninovelLive2D). Specifically, the custom "Live2DCharacter" actor is implemented in [Runtime/Live2DCharacter.cs](https://github.com/Elringus/NaninovelLive2D/blob/master/Assets/NaninovelLive2D/Runtime/Live2DCharacter.cs) script.
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
