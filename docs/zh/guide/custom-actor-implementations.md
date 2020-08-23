# 自定义演出元素实现

演出元素是由名称，外观，可见性和变换（位置，旋转和比例）定义的场景实体。它可以随时间异步更改外观，可见性并进行变换。比如，演出元素的类型有角色，背景，文本打印机和选择处理器。

演出元素由 `IActor` 接口代表其派生有如下：

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

每个元素接口可以有多个实现；比如角色元素目前有四种内置实现：精灵，切片精灵，模型，live2D.

可以通过 `Naninovel -> Configuration` 菜单访问的配置管理器中选择元素实现。你可以改变所有元素的默认实现，或是为特定元素单独设置。要改变默认实现，改变 `Default Metadata` 属性选择某个实现类型，在元素配置菜单 `Implementation` 下拉菜单中选择对应实现。

![Default Actor Implementation](https://i.gyazo.com/b372520a15501dc9bc1e5f30f4c7f12d.png)
![Actor Implementation](https://i.gyazo.com/3256f3aea99ea453859f67135a7187ee.png)

上述下拉菜单中包含所有各个元素接口的实现。你可以添加自己的定义实现，他们也会在该菜单中出现。创建你的自定义实现时，参考 `Naninovel/Runtime/Actor` 目录下的脚本。考虑使用 `Naninovel.MonoBehaviourActor` 下的内置虚拟元素实现来满足大多数基础接口要求。

创建自定义元素实现的时候，确保他们有合适的公开构造方法： `public CustomActorImplementation (string id, ActorMetadata metadata)` ， `id` 是元素ID， `metadata` 为元素或默认的元数据。实现特定的元素接口时，可以请求相应的特定元数据（例如，“ICharacterActor”实现的“CharacterMetadata”）。

要加载在编辑器菜单中分配的资源，请不要忘记指定完整路径。例如，假设分配的资源名称为“CubeBackground”：

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— 要加载资源，请使用：

```csharp
var prefabResource = await prefabLoader.LoadAsync(id + "/CubeBackground");
```

—  `id` 是通过构造函数传递的元素的ID。

下面是一个虚拟 `ICharacterActor` 实现的示例，该虚拟实现不执行任何操作，但会在调用其任何方法时输出信息。

```csharp
using Naninovel;
using System.Threading;
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


