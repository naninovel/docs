# 自定义演出元素实现

Actor 是由名称、外观、可见性和变换（位置、旋转和缩放）定义的场景实体。它可以随着时间的推移异步更改外观、可见性和变换。actor 的示例包括角色、背景、文本打印机和选项处理程序。

Actor 由 `IActor` 接口及其派生类表示：

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

每个 actor 接口可以有多个实现；例如，角色 actor 目前有七个内置实现：精灵、切片精灵、通用、分层、旁白、Spine 和 Live2D。

可以在可通过 `Naninovel -> Configuration` 上下文菜单访问的配置管理器中选择 actor 实现。您可以更改用于所有 actor 的默认实现或为每个 actor 设置特定实现。要更改默认实现，请使用 `Default Metadata` 属性；要设置特定的实现，请使用 actor 配置中的 `Implementation` 下拉菜单。

![](https://i.gyazo.com/74625fa24b58362de15bb8e07753824d.png)
![](https://i.gyazo.com/eeb42043eb9a841de003f8db848f1427.png)

Implementation 下拉菜单包含实现特定 actor 接口的所有类型。您可以添加自己的自定义实现，它们也会出现在列表中。创建自己的 actor 实现时，请参考 `Naninovel/Runtime/Actor` 脚本。当 actor 应该在场景中生成时，请考虑使用内置的抽象 `MonoBehaviourActor` 实现来满足大多数基本接口要求。

创建自定义 actor 实现时，请确保它们具有兼容的公共构造函数：

```csharp
public ActorImplementationType (string id, ActorMetadata metadata) { }
```

— 其中 `id` 是 actor 的 ID，`metadata` 是 actor 的元数据（当资源中存在 actor 记录时）或默认元数据。实现特定 actor 接口时，可以请求相应的特定元数据（例如，`ICharacterActor` 实现的 `CharacterMetadata`）。

::: tip EXAMPLE
所有内置 actor 实现都是在相同的 actor API 之上编写的，因此您可以在添加自己的实现时将它们用作参考。在 Naninovel 包的 `Runtime/Actor` 目录中找到源。
:::

## Actor 资源

将 `ActorResources` 属性应用于实现类型，以指定哪些资产可以用作自定义 actor 的资源，以及是否允许在编辑器菜单中分配多个资源。当不允许分配多个资源（默认情况）时，您可以通过仅指定 actor ID 来加载单个可用资源，例如：

```csharp
var resource = await resourceLoader.Load(actorId);
```

当允许多个资源时，请指定完整路径；例如，假设您分配了一个名为 `CubeBackground` 的资源：

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

—要加载资源，请使用：

```csharp
var resource = await resourceLoader.Load($"{actorId}/CubeBackground");
```

## 自定义元数据

可以向 actor 元数据添加自定义附加数据（对于内置和自定义实现）。

要注入自定义数据，请创建一个新的 C# 类并继承自 `CustomMetadata<TActor>`，其中 `TActor` 是数据应与之关联的 actor 实现的类型。下面是向 `CustomCharacterImplementation` 的角色添加自定义数据的示例：

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

当选择具有关联实现的 actor 时，创建的自定义数据类的可序列化字段将自动在 Naninovel 编辑器菜单中公开。

![](https://i.gyazo.com/72f46feb74b6de568b299329500bd7d5.png)

要在运行时访问自定义数据，请使用 `ActorMetadata` 实例的 `GetCustomData<TData>()` 方法，其中 `TData` 是自定义数据类的类型，例如：

```csharp
var charsConfig = Engine.GetConfiguration<CharactersConfiguration>();
var myCharMeta = charsConfig.GetMetadataOrDefault("CharId");
var myCharData = myCharMeta.GetCustomData<MyCharacterData>();
Debug.Log(myCharData.MyCustomInt);
```

### 自定义元数据编辑器

可以通过 [属性抽屉](https://docs.unity3d.com/Manual/editor-PropertyDrawers.html) 自定义自定义元数据编辑器。下面是添加一个属性抽屉的示例，该抽屉在编辑字段上方插入一个额外标签。

```csharp
// 创建一个属性以应用于序列化字段；
// 别忘了从 `PropertyAttribute` 继承它。
public class ExtraLabelAttribute : PropertyAttribute
{
    public readonly string LabelText;

    public ExtraLabelAttribute (string labelText)
    {
        LabelText = labelText;
    }
}

// 创建在绘制受影响字段时将使用的自定义编辑器。
// 脚本应位于 `Editor` 文件夹内，因为它使用 `UnityEditor` API。
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

// 现在您可以使用该属性将额外标签应用于序列化字段。
public class MyCharacterData : CustomMetadata<CustomCharacterImplementation>
{
    [ExtraLabel("Text from my custom property drawer")]
    public string MyCustomProperty;
}
```

鉴于上述实现，自定义角色数据现在将绘制如下：

![](https://i.gyazo.com/294a9e2812d33ea3c863f9f53906b327.png)

::: tip
也可以整体覆盖内置配置编辑器；有关更多信息和示例，请参阅 [自定义配置](/zh/guide/custom-configuration#覆盖内置编辑器) 指南。
:::

## 自定义状态

要覆盖或扩展自定义 actor 的状态类型，您还必须 [覆盖 actor 的管理器](/zh/guide/engine-services#覆盖内置服务)，因为状态是在那里序列化并应用于受管 actor 的。

::: info NOTE
这适用于内置 `IActor` 接口派生类（角色、背景、文本打印机和选项处理程序）之一的自定义 actor 实现；如果您直接从 `IActor` 继承了自定义 actor，则无需覆盖内置管理器即可使用自定义状态 — 只需创建自己的即可。

如果您希望为其他系统（例如 UI、游戏对象或 Naninovel 之外的各种游戏机制的组件）添加自定义状态，请参阅 [状态管理指南](/zh/guide/state-management#自定义状态)。
:::

下面是扩展选项处理程序状态的示例，通过添加一个 `LastChoiceTime` 字段来存储最后添加选项的时间。当显示自定义选项处理程序时，时间将打印到控制台。

```csharp
// 序列化最后选择时间的扩展状态。
public class MyChoiceHandlerState : ChoiceHandlerState
{
    // 此字段是可序列化的，并在游戏保存-加载中持久存在。
    public string LastChoiceTime;

    // 保存游戏时调用此方法；
    // 从 actor 获取所需数据并将其存储在可序列化字段中。
    public override void OverwriteFromActor (IChoiceHandlerActor actor)
    {
        base.OverwriteFromActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            LastChoiceTime = myCustomChoiceHandler.LastChoiceTime;
    }

    // 加载游戏时调用此方法；
    // 取回序列化数据并将其应用于 actor。
    public override void ApplyToActor (IChoiceHandlerActor actor)
    {
        base.ApplyToActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            myCustomChoiceHandler.LastChoiceTime = LastChoiceTime;
    }
}

// 使用最后选择时间的自定义选项处理程序实现。
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

    public override Awaitable ChangeVisibility (bool visible, float duration,
        EasingType easingType = default, AsyncToken token = default)
    {
        Debug.Log($"Last choice time: {LastChoiceTime}");
        return base.ChangeVisibility(visible, duration, easingType, token);
    }
}

// 覆盖内置选项处理程序管理器以使其使用我们的扩展状态。
// 重要步骤是在泛型类型中指定 `MyChoiceHandlerState`；
// 其他修改只是为了满足接口要求。
[InitializeAtRuntime(@override: typeof(ChoiceHandlerManager))]
public class MyChoiceHandlerManager : ActorManager<IChoiceHandlerActor,
    MyChoiceHandlerState, ChoiceHandlerMetadata,
    ChoiceHandlersConfiguration>, IChoiceHandlerManager
{
    public MyChoiceHandlerManager (ChoiceHandlersConfiguration config)
        : base(config) { }

    public Awaitable<IChoiceHandlerActor> AddActor (string actorId,
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

自定义选项处理程序现在将保留最后添加的选项时间并将其记录在控制台中，即使最后一个选项是在从保存槽加载的上一个游戏会话中添加的。除了内置 actor 状态之外，您还可以通过这种方式存储任意数量的自定义数据。有关支持的可序列化数据类型，请参阅 [Unity 的序列化指南](https://docs.unity3d.com/Manual/script-Serialization.html)。
