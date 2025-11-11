# 自定义演出元素实现

演出元素（Actor）是场景中的一个实体，由名称、外观、可见性以及变换（位置、旋转和缩放）定义。它可以异步地随时间改变外观、可见性和变换。演出元素的示例包括角色、背景、文本打印机和选项处理器。

演出元素由 `IActor` 接口及其派生接口表示：

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

每个演出元素接口都可以有多个实现；例如角色演出元素目前有七种内置实现：精灵、切片精灵、通用、分层、旁白、Spine 和 Live2D。

可以在通过 `Naninovel -> Configuration` 上下文菜单访问的配置管理器中选择演出元素的实现。你既可以更改所有演出元素使用的默认实现，也可以为特定演出元素设置专属实现。要更改默认实现，请使用 `Default Metadata` 属性；要为特定演出元素设置实现，请使用演出元素配置中的 `Implementation` 下拉列表。

![](https://i.gyazo.com/74625fa24b58362de15bb8e07753824d.png)
![](https://i.gyazo.com/eeb42043eb9a841de003f8db848f1427.png)

实现下拉列表包含所有实现了特定演出元素接口的类型。你可以添加自己的自定义实现，它们也会出现在列表中。创建自定义演出元素实现时，可参考 `Naninovel/Runtime/Actor` 脚本。若演出元素需要在场景中生成，建议使用内置的抽象类 `MonoBehaviourActor` 来实现大部分基础接口需求。

在创建自定义演出元素实现时，请确保其具有兼容的公共构造函数：

```csharp
public ActorImplementationType (string id, ActorMetadata metadata) { }
```

— 其中 `id` 是演出元素的 ID，`metadata` 是演出元素的元数据（当演出元素记录存在于资源中时）或默认元数据。在实现特定演出元素接口时，可以请求对应的特定元数据（例如对 “ICharacterActor” 实现请求 “CharacterMetadata”）。

::: tip 示例
所有内置的演出元素实现都是基于相同的演出元素 API 构建的，因此在编写自定义实现时可以将它们作为参考。可在 Naninovel 包的 `Runtime/Actor` 目录中找到源码。
:::

## 演出元素资源

对实现类型应用 `ActorResources` 特性，以指定哪些资源可作为自定义演出元素的资源使用，以及是否允许在编辑器菜单中分配多个资源。当不允许多个资源（默认）时，可以通过指定演出元素 ID 来加载单个可用资源，例如：

```csharp
var resource = await resourceLoader.Load(actorId);
```

当允许多个资源时，请指定完整路径；例如，若你分配了名为 “CubeBackground” 的资源：

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— 要加载该资源，请使用：

```csharp
var resource = await resourceLoader.Load($"{actorId}/CubeBackground");
```

## 自定义元数据

可以为演出元素的元数据（无论是内置还是自定义实现）添加额外的自定义数据。

要注入自定义数据，请创建一个新的 C# 类并继承自 `CustomMetadata<TActor>` 类型，其中 `TActor` 是应与该数据关联的演出元素实现类型。以下示例展示了如何为 “CustomCharacterImplementation” 实现的角色添加自定义数据：

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

创建的自定义数据类中的可序列化字段将在 Naninovel 编辑器菜单中自动显示，当选中与之关联的演出元素实现时即可编辑。

![](https://i.gyazo.com/72f46feb74b6de568b299329500bd7d5.png)

在运行时访问自定义数据时，使用 `ActorMetadata` 实例的 `GetCustomData<TData>()` 方法，其中 `TData` 是自定义数据类的类型，例如：

```csharp
var charsConfig = Engine.GetConfiguration<CharactersConfiguration>();
var myCharMeta = charsConfig.GetMetadataOrDefault("CharId");
var myCharData = myCharMeta.GetCustomData<MyCharacterData>();
Debug.Log(myCharData.MyCustomInt);
```

### 自定义元数据编辑器

可以通过 [Property Drawer（属性绘制器）](https://docs.unity3d.com/Manual/editor-PropertyDrawers.html) 自定义元数据编辑器。以下示例展示了如何添加一个属性绘制器，它会在被编辑字段上方插入一个额外的标签。

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

根据上述实现，我们的自定义角色数据将在编辑器中显示如下：

![](https://i.gyazo.com/294a9e2812d33ea3c863f9f53906b327.png)

::: tip
也可以整体覆盖内置的配置编辑器；更多信息和示例请参阅 [自定义配置](/guide/custom-configuration#overriding-built-in-editors) 指南。
:::

## 自定义状态

要为自定义演出元素覆盖或扩展状态类型，你还需要 [覆盖演出元素管理器](/guide/engine-services#overriding-built-in-services)，因为状态的序列化和应用都是在管理器中完成的。

::: info 注意
此规则适用于基于内置 `IActor` 接口派生类（如角色、背景、文本打印机和选项处理器）的自定义演出元素实现；如果你的自定义演出元素是直接继承自 `IActor`，则无需覆盖内置管理器即可使用自定义状态 —— 只需自行创建即可。

若你希望为其他系统（如 UI、游戏对象或 Naninovel 之外的各种游戏机制组件）添加自定义状态，请参阅 [状态管理指南](/guide/state-management#custom-state)。
:::

以下示例展示了如何通过添加一个 `LastChoiceTime` 字段扩展选项处理器状态，该字段用于存储上一次添加选项的时间。当显示自定义选项处理器时，该时间会打印到控制台。

```csharp
// 我们扩展的状态，用于序列化上次选择的时间。
public class MyChoiceHandlerState : ChoiceHandlerState
{
    // 该字段是可序列化的，并会在游戏存档加载中持久化。
    public string LastChoiceTime;

    // 此方法在保存游戏时调用；从演出元素中获取所需数据并存入可序列化字段。
    public override void OverwriteFromActor (IChoiceHandlerActor actor)
    {
        base.OverwriteFromActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            LastChoiceTime = myCustomChoiceHandler.LastChoiceTime;
    }

    // 此方法在加载游戏时调用；取回已序列化的数据并将其应用到演出元素上。
    public override void ApplyToActor (IChoiceHandlerActor actor)
    {
        base.ApplyToActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            myCustomChoiceHandler.LastChoiceTime = LastChoiceTime;
    }
}

// 我们自定义的选项处理器实现，使用上次选择时间。
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

    public override UniTask ChangeVisibility (bool visible, float duration,
        EasingType easingType = default, AsyncToken token = default)
    {
        Debug.Log($"Last choice time: {LastChoiceTime}");
        return base.ChangeVisibility(visible, duration, easingType, token);
    }
}

// 重写内置的选项处理器管理器，使其使用我们扩展的状态。
// 关键步骤是指定泛型类型中的 `MyChoiceHandlerState`；
// 其他修改仅用于满足接口要求。
[InitializeAtRuntime(@override: typeof(ChoiceHandlerManager))]
public class MyChoiceHandlerManager : ActorManager<IChoiceHandlerActor,
    MyChoiceHandlerState, ChoiceHandlerMetadata,
    ChoiceHandlersConfiguration>, IChoiceHandlerManager
{
    public MyChoiceHandlerManager (ChoiceHandlersConfiguration config)
        : base(config) { }

    public UniTask<IChoiceHandlerActor> AddActor (string actorId,
        ChoiceHandlerState state)
    {
        return base.AddActor(actorId, state as MyChoiceHandlerState);
    }

    ChoiceHandlerState IActorManager<IChoiceHandlerActor,
        ChoiceHandlerState, ChoiceHandlerMetadata,
        ChoiceHandlersConfiguration>.GetActorState (string actorId)
    {
        return base.GetActorState(actorId);
    }
}
```

我们的自定义选项处理器现在将保留上次添加选项的时间，并在控制台中输出，即使该选项是在加载的上一个存档中添加的也会如此。通过这种方式，你可以在内置演出元素状态之外存储任意数量的自定义数据。有关支持的可序列化数据类型，请参阅 [Unity 序列化指南](https://docs.unity3d.com/Manual/script-Serialization.html)。