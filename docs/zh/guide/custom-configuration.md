# 自定义配置

配置物体用于初始化和配置服务以及其他引擎系统。
Configuration objects are used to initialize and configure services and other engine systems.

默认情况下，配置物体被序列化为[可编程物体](https://docs.unity3d.com/Manual/class-ScriptableObject.html) 存储在`NaninovelData/Resources/Naninovel/Configuration`路径。该资源会在第一次打开`Naninovel -> Configuration`菜单时自动生成。

要通过C＃访问配置对象，请使用 `Engine.GetConfiguration<T>()`静态方法，其中，`T`是要访问的配置对象的类型。例如，以下示例演示了如何访问 [音频配置](/zh/guide/configuration#音频)对象：

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

请注意，该`Engine.GetConfiguration` 方法只能在引擎初始化时使用，因为它需要[配置提供程序](/zh/guide/custom-configuration#配置加载器) 对象，该对象是在初始化引擎时，在运行时允许自定义服务方案时指定的。如果你想通过默认加载器获取配置，在引擎未初始化的时候也可以通过`ProjectConfigurationProvider`实现，如下：

```csharp
var audioConfig = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

虽然可以通过编辑器菜单更改配置属性，但仍可以在运行时对其进行修改。注意，修改其实是被应用到存储在项目中的实际物体上的。如果修改，在运行中会一直生效。这和通过`Engine.GetConfiguration` 方法实现的修改是相反的，这个仅影响实例化，而不影响原本的实际物体。

以下是在引擎初始化后立即更改摄像机`ReferenceResolution`属性配置对象的示例：

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

## 添加配置

要添加新的自定义配置，请创建一个具有`Serializable`属性的C＃类，并继承`Configuration`。

```csharp
using Naninovel;
using UnityEngine;

[System.Serializable]
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

然后，相应的菜单将自动添加到项目设置中，您可以在其中配置自定义配置的属性，像在所有其他内置菜单一样。

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

要通过C＃访问自定义配置，像内置资产一样使用相同的API：

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: tip EXAMPLE
在添加的配置菜单中配置背包的示例参考[GitHub背包示例](https://github.com/Naninovel/Inventory) 。

具体来说，自定义配置是通过[InventoryConfiguration.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryConfiguration.cs) 运行时脚本实现的。
:::

## 配置加载器

可以更改在运行时配置物体提供服务的方式。例如，可以从远程主机上存储的JSON文件中读取配置，而不是静态项目文件。

要指定自定义配置服务方案，请创建C＃类并实现`IConfigurationProvider`接口。该接口仅包含一个方法，需要一个`Type`参数返回`Configuration`对象。由你决定如何构造和配置所请求的类型，只需确保返回的对象的类型等于所请求的对象的类型即可。

以下是自定义配置加载器实现的示例，该示例仅返回默认配置的对象：

```csharp
using Naninovel;
using UnityEngine;

public class CustomConfigurationProvider : IConfigurationProvider
{
    public Configuration GetConfiguration (System.Type type)
    {
        var defaultAsset = ScriptableObject.CreateInstance(type);
        return defaultAsset as Configuration;
    }
}
```

准备好自定义配置加载器后，您必须通过创建自定义引擎初始化脚本来使引擎使用它而不是内置的加载器。默认情况，引擎初始化使用的时`Naninovel/Runtime/Engine/RuntimeInitializer.cs`脚本；可以在创建你自己的初始化脚本的时候用作参考。

另外，如果你的目的只是使用自定义配置加载器，请保留原来的引擎初始化流程，考虑使用可接受加载器作为参数的`RuntimeInitializer.InitializeAsync(IConfigurationProvider)` 方法：

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

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

无论选择哪种方式初始化引擎，都不要忘记在引擎配置菜单中关闭`Initialize On Application Load`选项以禁用默认初始化过程。
