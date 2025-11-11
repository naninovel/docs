# 自定义配置

配置对象用于初始化和配置引擎中的服务以及其他系统。

默认情况下，配置对象会被序列化为 [ScriptableObject](https://docs.unity3d.com/Manual/class-ScriptableObject.html) 资源，并存储在项目目录 `NaninovelData/Resources/Naninovel/Configuration` 下。当你首次在 Unity 编辑器中打开对应的配置菜单（`Naninovel -> Configuration`）时，这些资源会自动生成。

若要通过 C# 访问配置对象，请使用静态方法 `Engine.GetConfiguration<T>()`，其中 `T` 为希望访问的配置对象类型。例如，以下示例展示了如何访问 [音频配置](/zh/guide/configuration#audio) 对象：

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

::: info 注意
引擎初始化过程是异步的，因此即使启用了自动初始化，部分 API（例如 `GetConfiguration` 方法）在 Unity 场景刚加载时（如 `Awake`、`Start` 或 `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 方法中）可能尚不可用；详情请参阅 [访问引擎 API](/zh/guide/integration-options#accessing-engine-api) 指南。
:::

由于 `Engine.GetConfiguration` 方法依赖于在引擎初始化时指定的 [配置提供者](/zh/guide/custom-configuration#configuration-provider)，因此它仅在引擎初始化完成后可用。但即便引擎未初始化，也可以通过默认的 `ProjectConfigurationProvider` 访问配置资源，例如：

```csharp
var config = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

虽然配置属性通常应在编辑器菜单中进行修改，但在运行时也可以动态更改。请注意，通过默认项目提供者访问到的配置对象是真实的项目资源；若在运行时修改它们，变更将会在退出播放模式后保留。而通过 `Engine.GetConfiguration` 方法获取的配置对象则是运行时实例，不会影响原始资源文件。

以下示例展示了如何在引擎初始化后修改相机配置对象中的 `ReferenceResolution` 属性：

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

::: info 注意
Naninovel 默认不期望在引擎运行期间修改配置；若需确保更改生效，应在引擎初始化前使用 `ProjectConfigurationProvider` 或 [自定义配置提供者](/zh/guide/custom-configuration#configuration-provider) 进行配置。
:::

## 添加配置

要添加一个新的自定义配置，请创建一个 C# 类并继承自 `Configuration`。

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

请注意 `EditInProjectSettings` 属性：当该属性被应用时，会在项目设置中自动添加一个关联的编辑器菜单，你可以像编辑所有内置配置一样，在其中修改自定义配置资源的可序列化属性。

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

要通过 C# 访问你的自定义配置，可以使用与访问内置配置相同的 API：

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: tip 示例
另一个为库存系统添加自定义配置菜单的示例可以在 [inventory 示例](/zh/guide/samples#inventory) 中找到。具体实现位于 `Scripts/Runtime/Inventory/InventoryConfiguration.cs`。
:::

若要自定义自定义配置在 Naninovel 项目设置中的编辑器行为，可在编辑器脚本中创建一个类并继承自 `ConfigurationSettings<T>`，其中 `T` 为自定义配置的类型。你可以参考位于 `Naninovel/Editor/Settings` 包目录下的内置设置编辑器脚本来构建自己的编辑器。

## 重写内置编辑器

你可以通过对继承自 `ConfigurationSettings<T>`（或其派生类）的编辑器类应用 `OverrideSettings` 属性，来重写内置的配置编辑器（即 Naninovel 的项目设置菜单）。请确保将自定义编辑器脚本存放在 “Editor” 文件夹下，以便它们被包含在编辑器程序集内。

下面是一个重写内置角色管理器配置编辑器的示例。新编辑器继承自内置版本，并在 `Shared Poses` 字段下方额外插入一个标签，用于显示共享姿势的总数量。

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

使用上述编辑器后，角色配置界面将显示如下：

![](https://i.gyazo.com/5555e8c3eb33c3783bef8ef852a7e765.png)

同样，也可以重写内置的角色元数据编辑器。以下示例将在被检查的角色的 `Message Color` 字段下方插入一个标签，显示该颜色的名称。

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

—— 其效果如下：

![](https://i.gyazo.com/60abbf6b773b6c66cf138ac40882b1c1.png)

## 配置提供者

可以改变运行时提供配置对象的方式。例如，你可以不再使用静态项目资源，而是从远程主机上存储的 JSON 文件中读取配置。

要定义自定义配置加载方案，请创建一个 C# 类并实现 `IConfigurationProvider` 接口。该接口仅包含一个方法，接收一个 `Type` 参数并返回一个 `Configuration` 对象。你可以自由决定如何构建与填充所需的配置对象，只需确保返回对象的类型与请求的类型一致即可。

以下示例展示了一个自定义配置提供者的实现，它仅返回默认的配置对象：

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

另一个示例展示了如何重写项目中的角色配置，以便在运行时注入自定义元数据：

```csharp
public class CustomConfigurationProvider : ProjectConfigurationProvider
{
    public override Configuration GetConfiguration (System.Type type)
    {
        // 除了角色以外，对所有配置都按项目原样返回。
        if (type != typeof(CharactersConfiguration))
            return base.GetConfiguration(type);

        // 注入（或覆盖）角色的元数据。
        // 实际数据可以在运行时通过外部来源获取。
        var charsConfig = (CharactersConfiguration)base.GetConfiguration(type);
        charsConfig.Metadata["NewCustomChar"] = new CharacterMetadata {
            Implementation = typeof(NarratorCharacter).AssemblyQualifiedName,
            DisplayName = "Custom Narrator",
            UseCharacterColor = true,
            MessageColor = Color.cyan,
            // 省略...
        };

        // 返回我们修改后的角色配置。
        return charsConfig;
    }
}
```

当自定义配置提供程序准备就绪后，你需要通过创建自定义的引擎初始化脚本，让引擎改为使用它而不是内置的提供程序。默认情况下，引擎通过 `Naninovel/Runtime/Engine/RuntimeInitializer.cs` 初始化；在编写你自己的初始化脚本时可以将其作为参考。

或者，如果你的目标只是使用自定义配置提供程序，同时保留默认的引擎初始化流程，可以考虑使用 `RuntimeInitializer.Initialize(IConfigurationProvider)` 静态方法，该方法接收一个可选的配置提供程序参数：

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

无论你选择哪种方式来初始化引擎，都不要忘记在引擎配置菜单中禁用 `Initialize On Application Load` 选项，以关闭默认的初始化流程。
