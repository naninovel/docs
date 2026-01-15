# Custom Configuration

Configuration objects are used to initialize and configure services and other engine systems.

By default, configuration objects are serialized as ScriptableObject assets and stored at `NaninovelData/Resources/Naninovel/Configuration` in the project. The assets are automatically generated when opening corresponding configuration menus (`Naninovel -> Configuration`) in the Unity Editor for the first time.

To access configuration objects via C#, use `Engine.GetConfiguration<T>()`, where `T` is the type of the configuration object you wish to access. For example, the following demonstrates how to access the [audio configuration](/guide/configuration#audio) object:

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

::: info NOTE
The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs (e.g., `GetConfiguration`) may not be available right after Unity loads a scene (e.g., in `Awake`, `Start`, and `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) methods); see [accessing engine API](/guide/integration-options#accessing-engine-api) for more info.
:::

While `Engine.GetConfiguration` requires the engine to be initialized (it relies on a configuration provider), you can access a configuration asset directly via the default provider even when the engine is not initialized, for example:

```csharp
var config = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

Configuration objects are meant to be changed via editor menus, but it's still possible to modify them at runtime. Note that objects returned by the default project provider are the actual assets stored in the project; modifying them in play mode will persist changes to the asset. This differs from the instances returned by `Engine.GetConfiguration`, which are runtime instances and won't mutate the original assets.

Below is an example of changing the `ReferenceResolution` property of the camera configuration right after the engine is initialized:

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

::: info NOTE
Naninovel doesn't expect configurations to change while the engine is initialized, so you may need to apply modifications before initializing the engine with either `ProjectConfigurationProvider` or a [custom provider](/guide/custom-configuration#configuration-provider) for some changes to take effect.
:::

## Adding Configuration

To add a new custom configuration, create a C# class that inherits from `Configuration`.

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

Notice the `EditInProjectSettings` attribute: an associated editor menu is automatically added to the Project Settings when the attribute is applied, where you can modify serializable properties of your custom configuration asset just like in the built-in menus.

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

To access your custom configuration via C#, use the same API as for the built-in assets:

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: tip EXAMPLE
Another example of adding a custom configuration menu to set up an inventory system can be found in the [inventory sample](/guide/samples#inventory). Specifically, the custom configuration is implemented in `Scripts/Runtime/Inventory/InventoryConfiguration.cs`.
:::

To customize editor behavior of your custom configuration (when it's drawn in Naninovel's project settings), create a class under an Editor script and inherit from `ConfigurationSettings<T>`, where `T` is your custom configuration type. You can use built-in settings editor scripts stored at `Naninovel/Editor/Settings` for reference when building your own editors.

## Overriding Built-in Editors

You can override built-in configuration editors (Naninovel's project settings menus) by applying the `OverrideSettings` attribute to an editor class inherited from `ConfigurationSettings<T>` (or any of its derivatives), where `T` is the configuration type. Store the custom editor scripts under an `Editor` folder so they are included in the editor assembly.

Below is an example that overrides the built-in character manager configuration editor. The new editor adds a label under the `Shared Poses` field with the total number of shared poses.

```csharp
[OverrideSettings]
public class CustomCharacterSettings : CharactersSettings
{
    protected override Dictionary<string, Action<SerializedProperty>>
        OverrideConfigurationDrawers ()
    {
        var drawers = base.OverrideConfigurationDrawers();
        drawers[nameof(CharactersConfiguration.SharedPoses)] = property => {
            ActorPosesEditor.Draw(property);
            EditorGUILayout.LabelField(
                $"Number of shared poses is {property.arraySize}.");
        };
        return drawers;
    }
}
```

Given the above editor, characters configuration will now draw as follows:

![](https://i.gyazo.com/5555e8c3eb33c3783bef8ef852a7e765.png)

You can also override built-in actor metadata editors. Below will insert a label under the `Message Color` field of the inspected actor with the name of that color.

```csharp
[OverrideSettings]
public class CustomCharacterSettings : CharactersSettings
{
    protected override MetadataEditor<ICharacterActor,
        CharacterMetadata> MetadataEditor { get; } = new MetaEditor();

    private class MetaEditor : CharacterMetadataEditor
    {
        protected override Action<SerializedProperty>
            GetCustomDrawer (string propertyName)
        {
            if (propertyName == nameof(CharacterMetadata.MessageColor))
                return property => {
                    EditorGUILayout.PropertyField(property);
                    EditorGUILayout.LabelField($"Message color of " +
                        "'{Metadata.DisplayName}' is '{property.colorValue}'.");
                };
            return base.GetCustomDrawer(propertyName);
        }
    }
}
```

— will result in:

![](https://i.gyazo.com/60abbf6b773b6c66cf138ac40882b1c1.png)

## Configuration Provider

You can change how configuration objects are served at runtime. For example, instead of static project assets, you can read configuration from JSON files stored on a remote host.

To specify a custom configuration serving scenario, create a C# class that implements `IConfigurationProvider`. The interface has one method that expects a `Type` argument and returns a `Configuration` object. It's up to you how to construct and populate requested configuration objects; just ensure the returned object's type matches the requested one.

Below is an example of a custom provider implementation that returns default configuration objects:

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

Another example that overrides the project characters configuration to inject metadata at runtime:

```csharp
public class CustomConfigurationProvider : ProjectConfigurationProvider
{
    public override Configuration GetConfiguration (System.Type type)
    {
        // Return project configs as-is for everything but characters.
        if (type != typeof(CharactersConfiguration))
            return base.GetConfiguration(type);

        // Inject (or override) metadata of the characters.
        // The actual data can be retrieved via external sources at runtime.
        var charsConfig = (CharactersConfiguration)base.GetConfiguration(type);
        charsConfig.Metadata["NewCustomChar"] = new CharacterMetadata {
            Implementation = typeof(NarratorCharacter).AssemblyQualifiedName,
            DisplayName = "Custom Narrator",
            UseCharacterColor = true,
            MessageColor = Color.cyan,
            // etc...
        };

        // Return our modified characters config.
        return charsConfig;
    }
}
```

Once the custom configuration provider is ready, make the engine use it instead of the built-in one by creating a custom engine initialization script. By default, the engine is initialized via `Naninovel/Runtime/Engine/RuntimeInitializer.cs`; feel free to use it as a reference.

Alternatively, if your goal is just to use a custom configuration provider but keep the default engine initialization routine, consider `RuntimeInitializer.Initialize(IConfigurationProvider)` which accepts an optional configuration provider argument:

```csharp
public class CustomInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void InitializeWithCustomProvider ()
    {
        var customProvider = new CustomConfigurationProvider();
        RuntimeInitializer.Initialize(customProvider).Forget();
    }
}
```

No matter which initialization method you choose, disable `Initialize On Application Load` in the engine configuration menu to prevent the default initialization procedure.
