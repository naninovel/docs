# 自定义配置

配置对象用于初始化和配置服务及其他引擎系统。

默认情况下，配置对象被序列化为 ScriptableObject 资产，并存储在项目的 `NaninovelData/Resources/Naninovel/Configuration` 中。首次在 Unity 编辑器中打开相应的配置菜单（`Naninovel -> Configuration`）时，会自动生成资产。

要通过 C# 访问配置对象，请使用 `Engine.GetConfiguration<T>()`，其中 `T` 是您希望访问的配置对象的类型。例如，以下演示了如何访问 [音频配置](/zh/guide/configuration#音频) 对象：

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

::: info NOTE
引擎初始化过程是异步的，因此即使启用了自动初始化，在 Unity 加载场景后（例如，在 `Awake`、`Start` 和 `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 方法中），引擎 API（例如 `GetConfiguration`）也可能无法立即可用；有关更多信息，请参阅 [访问引擎 API](/zh/guide/integration-options#访问引擎-api)。
:::

虽然 `Engine.GetConfiguration` 需要初始化引擎（它依赖于配置提供者），但即使引擎未初始化，您也可以通过默认提供者直接访问配置资产，例如：

```csharp
var config = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

配置对象旨在通过编辑器菜单进行更改，但仍然可以在运行时修改它们。请注意，默认项目提供者返回的对象是存储在项目中的实际资产；在播放模式下修改它们将保留对资产的更改。这与 `Engine.GetConfiguration` 返回的实例不同，后者是运行时实例，不会改变原始资产。

下面是在引擎初始化后立即更改相机配置的 `ReferenceResolution` 属性的示例：

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
Naninovel 不希望在初始化引擎时更改配置，因此您可能需要在初始化引擎之前使用 `ProjectConfigurationProvider` 或 [自定义提供者](/zh/guide/custom-configuration#配置提供者) 应用修改，以便某些更改生效。
:::

## 添加配置

要添加新的自定义配置，请创建一个继承自 `Configuration` 的 C# 类。

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

注意 `EditInProjectSettings` 属性：应用该属性时，关联的编辑器菜单会自动添加到项目设置中，您可以在其中修改自定义配置资产的可序列化属性，就像在内置菜单中一样。

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

要通过 C# 访问您的自定义配置，请使用与内置资产相同的 API：

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: tip EXAMPLE
在 [库存示例](/zh/guide/samples#库存-inventory) 中可以找到添加自定义配置菜单以设置库存系统的另一个示例。具体来说，自定义配置在 `Scripts/Runtime/Inventory/InventoryConfiguration.cs` 中实现。
:::

要自定义自定义配置的编辑器行为（当它在 Naninovel 的项目设置中绘制时），请在编辑器脚本下创建一个类并继承自 `ConfigurationSettings<T>`，其中 `T` 是您的自定义配置类型。您可以使用存储在 `Naninovel/Editor/Settings` 中的内置设置编辑器脚本作为参考来构建您自己的编辑器。

## 覆盖内置编辑器

您可以通过将 `OverrideSettings` 属性应用于继承自 `ConfigurationSettings<T>`（或其任何派生类）的编辑器类来覆盖内置配置编辑器（Naninovel 的项目设置菜单），其中 `T` 是配置类型。将自定义编辑器脚本存储在 `Editor` 文件夹下，以便它们包含在编辑器程序集中。

下面是覆盖内置角色管理器配置编辑器的示例。新编辑器在 `Shared Poses` 字段下方添加一个标签，显示共享姿势的总数。

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

鉴于上述编辑器，角色配置现在将绘制如下：

![](https://i.gyazo.com/5555e8c3eb33c3783bef8ef852a7e765.png)

您还可以覆盖内置 actor 元数据编辑器。下面将在被检查的 actor 的 `Message Color` 字段下方插入一个标签，显示该颜色的名称。

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

— 结果将是：

![](https://i.gyazo.com/60abbf6b773b6c66cf138ac40882b1c1.png)

## 配置提供者

您可以更改运行时提供配置对象的方式。例如，您可以从存储在远程主机上的 JSON 文件中读取配置，而不是静态项目资产。

要指定自定义配置提供方案，请创建一个实现 `IConfigurationProvider` 的 C# 类。该接口有一个方法，该方法需要一个 `Type` 参数并返回一个 `Configuration` 对象。如何构建和填充请求的配置对象取决于您；只需确保返回对象的类型与请求的类型匹配即可。

下面是返回默认配置对象的自定义提供者实现示例：

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

另一个覆盖项目角色配置以在运行时注入元数据的示例：

```csharp
public class CustomConfigurationProvider : ProjectConfigurationProvider
{
    public override Configuration GetConfiguration (System.Type type)
    {
        // 按原样返回除非角色之外的所有项目配置。
        if (type != typeof(CharactersConfiguration))
            return base.GetConfiguration(type);

        // 注入（或覆盖）角色的元数据。
        // 实际数据可以在运行时通过外部源检索。
        var charsConfig = (CharactersConfiguration)base.GetConfiguration(type);
        charsConfig.Metadata["NewCustomChar"] = new CharacterMetadata {
            Implementation = typeof(NarratorCharacter).AssemblyQualifiedName,
            DisplayName = "Custom Narrator",
            UseCharacterColor = true,
            MessageColor = Color.cyan,
            // 等等...
        };

        // 返回我们修改后的角色配置。
        return charsConfig;
    }
}
```

准备好自定义配置提供者后，通过创建自定义引擎初始化脚本，使引擎使用它而不是内置的。默认情况下，引擎通过 `Naninovel/Runtime/Engine/RuntimeInitializer.cs` 初始化；请随意将其用作参考。

或者，如果您的目标只是使用自定义配置提供者但保留默认引擎初始化例程，请考虑接受可选配置提供者参数的 `RuntimeInitializer.Initialize(IConfigurationProvider)`：

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

无论您选择哪种初始化方法，都要在引擎配置菜单中禁用 `Initialize On Application Load`，以防止默认初始化过程。
