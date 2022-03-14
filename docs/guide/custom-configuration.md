# Custom Configuration

Configuration objects are used to initialize and configure services and other engine systems.

By default, configuration objects are serialized as [scriptable object](https://docs.unity3d.com/Manual/class-ScriptableObject.html) assets and stored at `NaninovelData/Resources/Naninovel/Configuration` project directory. The assets are automatically generated when opening corresponding configuration menus (`Naninovel -> Configuration`) in the Unity editor for the first time.

To access configuration objects via C# use `Engine.GetConfiguration<T>()` static method, where `T` is type of the configuration object you wish to access. For example, the following example demonstrates how to access [audio configuration](/guide/configuration.md#audio) object:

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

::: note
The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs (eg, `GetConfiguration` method) may not be available right after Unity loads a scene (eg, in `Awake`, `Start` and `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) methods); see [accessing engine API](/guide/integration-options.md#accessing-engine-api) guide for more info.
:::

While `Engine.GetConfiguration` method can only be used when the engine is initialized, as it requires a [configuration provider](/guide/custom-configuration.md#configuration-provider) object, which is specified when initializing the engine to allow custom serving scenarios at runtime, it's possible to access a configuration asset via default provider even when the engine is not initialized with `ProjectConfigurationProvider`, eg:

```csharp
var audioConfig = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
``` 

While the configuration properties are meant to be changed via editor menus, it's still possible to modify them at runtime. Be aware, that the objects returned by default project provider are the actual assets stored in the project; if you modify them, the changes will persist through play mode sessions. This is in contrast to the configuration objects provided with `Engine.GetConfiguration` method, which are instances and won't mutate the original assets.

Below is an example on changing `ReferenceResolution` property of camera configuration object right after the engine is initialized:

```csharp
using Naninovel;
using UnityEngine;

public static class ModifyConfigAtRuntime
{
    [RuntimeInitializeOnLoadMethod]
    private static void ModifyConfig ()
    {
        if (Engine.Initialized) OnInitializationFinished();
        else Engine.OnInitializationFinished += OnInitializationFinished;

        void OnInitializationFinished ()
        {
            Engine.OnInitializationFinished -= OnInitializationFinished;

            var cameraConfig = Engine.GetConfiguration<CameraConfiguration>();
            cameraConfig.ReferenceResolution = new Vector2Int(3840, 2160);
        }
    }
}
```

## Adding Configuration

To add a new custom configuration, create a C# class and inherit it from `Configuration`.

```csharp
[EditInProjectSettings]
public class MyCustomConfiguration : Configuration
{
    [Header("My Custom Header 1")]
    [Tooltip("Tooltip for my custom string.")]
    public string MyCustomString = "Default value";
    [Range(0, 100), Tooltip("Tooltip for my custom float.")]
    public float MyCustomFloat = 10;

    [Header("My Custom Header 2")]
    public int[] MyCustomArray;
}
```

Notice the `EditInProjectSettings` attribute: an associated editor menu is automatically added to the project settings when the attribute is applied, where you can modify serializable properties of you custom configuration asset just like in all the built-in menus.

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

To access your custom configuration via C# use the same API as for the built-in assets:

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: example
Another example of adding a custom configuration menu to set up an inventory system can be found in the [inventory example project on GitHub](https://github.com/Naninovel/Inventory).

Specifically, the custom configuration is implemented via [InventoryConfiguration.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryConfiguration.cs) runtime script.
:::

To customize editor behaviour of your custom configuration (when it's drawn in the Naninovel's project settings), create a class under an editor script and inherit it from `ConfigurationSettings<T>`, where `T` is the type of your custom configuration. You can use built-in settings editor scripts stored at `Naninovel/Editor/Settings` package folder for reference when building your own editors.

## Overriding Built-in Editors

It's possible to override the built-in configuration editors (Naninovel's project settings menus) by applying `OverrideSettings` attribute to an editor class inherited from `ConfigurationSettings<T>` (or any of its derivatives), where `T` is the type of the configuration. Make sure to store the custom editor scripts under "Editor" folder to make them included to the editor assembly.

Below is an example on overriding the built-in character manager configuration editor. The new editor is inherited from the built-in one and will additionally insert a label under `Message Color` field of the inspected actor metadata with the name of that color.

```csharp
[OverrideSettings]
public class CustomCharacterSettings : CharactersSettings
{
    protected override Dictionary<string, Action<SerializedProperty>> OverrideMetaDrawers ()
    {
        var drawers = base.OverrideMetaDrawers();
        drawers[nameof(CharacterMetadata.MessageColor)] = property =>
        {
            EditorGUILayout.PropertyField(property);
            EditorGUILayout.LabelField($"Message color of `{EditedActorId}` is `{property.colorValue}`.");
        };
        return drawers;
    }
}
```

Given the above editor, inspected characters will now draw as follows:

![](https://i.gyazo.com/a742da2e7474444c9e1306a1414c7dfb.png)

## Configuration Provider

It's possible to change the way configuration objects are served at runtime. For example, instead of static project assets, you can read the configuration from JSON files stored on a remote host. 

To specify a custom configuration serving scenario, create a C# class and implement `IConfigurationProvider` interface. The interface has just one method, that expects a `Type` argument and returns a `Configuration` object. It's up to you on how to construct and populate requested configuration objects, just make sure type of the returned object is equal to the requested one.

Below is an example of a custom provider implementation, that just returns default configuration objects:

```csharp
public class CustomConfigurationProvider : IConfigurationProvider
{
    public Configuration GetConfiguration (System.Type type)
    {
        var defaultAsset = ScriptableObject.CreateInstance(type);
        return defaultAsset as Configuration;
    }
}
```

Once the custom configuration provider is ready, you have to make the engine use it instead of the built-in one by creating a custom engine initialization script. By default, the engine is initialized via `Naninovel/Runtime/Engine/RuntimeInitializer.cs`; feel free to use it as a reference when creating your own initialization script.

Alternatively, if your goal is just to use a custom configuration provider, but keep the default engine initialization routine, consider using `RuntimeInitializer.InitializeAsync(IConfigurationProvider)` static method, which accepts an optional argument for configuration provider:

```csharp
public class CustomInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void InitializeWithCustomProvider ()
    {
        var customProvider = new CustomConfigurationProvider();
        RuntimeInitializer.InitializeAsync(customProvider).Forget();
    }
}
```

No matter which way you choose to initialize the engine, don't forget to disable `Initialize On Application Load` option in the engine configuration menu to disable default initialization procedure.
