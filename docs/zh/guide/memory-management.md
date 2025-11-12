# 内存管理

某些脚本指令在运行时需要加载资源才能正常工作：例如 [@bgm] 指令需要加载音频剪辑、[@char] 指令需要加载角色立绘贴图、[@movie] 指令需要加载视频文件等。Naninovel 会自动以优化的方式处理这些资源的加载与卸载。其默认行为由资源提供程序配置中的 `Resource Policy`（资源策略）设置决定。

![](https://i.gyazo.com/ee96274f01f2f355d14190aabf5f2070.png)

## 保守策略（Conservative）

默认模式在性能与内存使用之间提供了平衡。当开始播放剧本时，会预加载所有该剧本执行所需的资源，并在剧本播放结束后卸载它们。通过 [@gosub] 指令引用的剧本也会被预加载。还可以通过 [@goto] 指令的 `hold` 参数预加载其他剧本。

下面的演示展示了在“保守策略”下资源是如何被管理的：

::: code-group

```nani [Script1.nani]
Resources from Script1, Script2, and ScriptGosub are loaded here.
Script2 is loaded because it's navigated to with "@goto hold!".
ScriptGosub is loaded because "@gosub" scripts are always preloaded.

...

Loading screen won't show because gosubs are always preloaded.
@gosub ScriptGosub

...

Loading screen won't show because we're using "hold!".
@goto Script2 hold!
```

```nani [Script2.nani]
Resources from Script1, Script2, and ScriptGosub are all still loaded,
because this script was navigated to with "@goto hold!",
hence it's considered a dependency of Script1.

...

Loading screen will show because we're not using "hold!".
@goto Script3
```

```nani [Script3.nani]
Resources from Script1 and Script2 are now unloaded, while resources
from Script3 (this script) are loaded.
Resources from ScriptGosub are still loaded because we're using it here.

...

Loading screen won't show because gosubs are always preloaded.
@gosub ScriptGosub

...

Loading screen will show because we're not using "hold!".
@goto Script4
```

```nani [Script4.nani]
All previous resources are now unloaded (including ScriptGosub), and only
resources from Script4 (this script) are loaded.

...

@stop
```

```nani [ScriptGosub.nani]
Various resources may be loaded here, depending on which script
navigated to this one.

...

Loading screen won't show, as gosubs are always loaded with the script
that navigates to the gosub and are not unloaded until that script unloads.
@return
```

:::

## 乐观策略（Optimistic）

在此模式下，当前正在播放的脚本所需的所有资源，以及所有通过 [@goto] 和 [@gosub] 指令引用的脚本资源，都会被预加载，并且不会被卸载，除非在 [@goto] 指令中显式指定 `release` 参数。这种方式能最大限度地减少加载画面的出现，并使回滚过程更加流畅，但需要手动指定何时卸载资源。在具有严格内存限制的平台（例如移动设备和网页浏览器）上，这种策略会增加发生内存溢出异常的风险。

以下演示展示了一组相似的脚本在“乐观策略”下的运行情况：

::: code-group

```nani [Script1.nani]
Resources from Script1, Script2, Script3, and ScriptGosub are all loaded here.
Script4 is not loaded because it's navigated to with "@goto release!".

...

Loading screen won't show because gosubs are always preloaded.
@gosub ScriptGosub

...

Loading screen won't show by default unless "release!" is specified.
@goto Script2
```

```nani [Script2.nani]
Everything except Script4 is still loaded.

...

Loading screen won't show by default unless "release!" is specified.
@goto Script3
```

```nani [Script3.nani]
Everything except Script4 is still loaded.

...

Loading screen won't show because gosubs are always preloaded.
@gosub ScriptGosub

...

Loading screen will now show because of "release!".
@goto Script4 release!
```

```nani [Script4.nani]
All resources except Script4 are now unloaded, because we navigated here
with "@goto release!".

...

@stop
```

```nani [ScriptGosub.nani]
Various resources may be loaded here, depending on which script
navigated here.

...

Loading screen won't show, as gosubs are always loaded with the script
that navigates to the gosub and are not unloaded until that script unloads.
@return
```

:::

## 惰性策略（Lazy）

与其他策略不同，惰性模式假设游戏并未设计任何加载画面（例如通过场景、章节或天数切换来掩饰加载过程），因此 Naninovel 不会在这些时机执行批量、耗费 CPU 的资源加载操作，而是尽量保证游戏过程始终顺畅。

当选择“惰性模式”时，Naninovel 不会显示加载画面，也不会在脚本播放前尝试预加载资源。相反，它会在脚本运行过程中“即时”加载所需资源。为了减少游戏过程中的延迟，它还会提前预加载当前播放指令之后的一定数量的指令；可在资源提供程序配置中的 `Lazy Buffer` 设置中调整该预加载指令数量。

::: code-group

```nani [Script1.nani]
Let's assume "Lazy Buffer" is set to 3 (the default is higher).
Only the "Snow" background is preloaded now, as it's within the buffer reach.
@back Snow
The "Ambient" audio is now preloaded.
The "Town" background is now preloaded.
@bgm Ambient
@back Town
The "Snow" background is now unloaded, as it's no longer visible.
...

No loading screen is shown. All resources are released.
The "Snow" background from Script2 is preloaded, being in the buffer reach.
@goto Script2
```

```nani [Script2.nani]
...
@back Snow
The "Town" background is now unloaded, as it's no longer visible.
```

:::

惰性模式有一个重要的注意事项：加载资源——尤其是大型背景贴图、高清角色模型或视频文件等“重型”资源——可能会在游戏过程中造成明显的卡顿。虽然 Naninovel 会尽可能在主线程之外执行这些操作，但在某些低性能设备或平台（尤其是 Web 平台）上，仍可能在快进（Skip）或回滚（Rollback）时出现明显的卡顿现象。在决定是否采用惰性策略前，请务必在最低支持配置的硬件上充分测试游戏表现。

## 策略选择

总体而言，建议使用默认的“保守（Conservative）”策略，因为它在所有目标平台上都能实现内存使用的平衡，并且在需要时可以通过使用 `hold!` 标志灵活地合并脚本加载。

然而，如果你的游戏仅面向具有充足内存的高性能平台（例如 PC 端或主机），你可能会更倾向于使用“乐观（Optimistic）”策略，以便让更多资源常驻内存，从而最大程度地减少加载画面的出现。

另一种适合使用“乐观”策略的场景是：当 Naninovel 被用作自定义游戏循环中的对话系统时。在这种情况下，你很可能已经拥有自己的资源管理系统，而“乐观”策略不会干扰这一点——它只会在脚本播放前保持所有需要的资源处于加载状态，除非你显式使用了 `release!` 标志。

当你需要尽可能减少内存占用，并且可以接受游戏过程中可能出现的卡顿，或无法围绕加载画面来设计游戏时，请选择“惰性（Lazy）”策略。

以下是三种策略的简要对比总结：

| 策略类型 |             内存占用              | CPU 占用情况                   | 加载画面出现时机                      | 快进与回滚表现                     |
|-----------|:--------------------------------:|--------------------------------|--------------------------------------|------------------------------------|
| 保守（Conservative） | <span class="txt-warn">平衡</span> | <span class="txt-ok">稳定</span> | <span class="txt-err">在使用 goto 时出现，除非使用 hold</span> | <span class="txt-warn">在持有脚本中速度较快</span> |
| 乐观（Optimistic） | <span class="txt-err">高</span> | <span class="txt-ok">稳定</span> | <span class="txt-warn">无，直到使用 release</span> | <span class="txt-ok">快速，直到释放</span> |
| 惰性（Lazy） | <span class="txt-ok">低</span> | <span class="txt-err">波动</span> | <span class="txt-ok">从不出现</span> | <span class="txt-err">始终较慢</span> |

## 角色资源

角色（包括角色立绘、背景、文本输出窗和选项处理器）是 Naninovel 的核心实体。角色使用的大部分内存都与其外观（Appearances）资源相关。

### 外观

某些角色实现的外观与资源是一一对应的：例如，精灵（Sprite）角色的每个外观对应一个独立的纹理文件，而视频（Video）角色的外观则对应单个视频剪辑。这使 Naninovel 能够基于脚本中引用的特定外观来管理资源。例如，如果脚本中仅使用了某个角色的 “Happy” 和 “Sad” 两种外观，则只会在脚本播放前预加载 `Happy.png` 和 `Sad.png` 这两个纹理，而不会加载该角色的其他外观。

然而，分层精灵（Layered Sprite）、切片精灵（Diced Sprite）、通用角色（Generic Actor）、Live2D 和 Spine 类型的角色都依赖一个整体 Prefab 来展示所有外观，因此无法单独加载不同外观对应的资源。在这种情况下，Naninovel 会加载整个 Prefab 及其所有依赖，并且只有当该角色不再被脚本指令引用时，才会卸载。

### 移除角色

默认情况下，Naninovel 会在卸载脚本资源时自动移除未使用的角色并销毁关联的游戏对象。如果你希望手动释放角色，请在资源提供者配置菜单中禁用 `Remove Actors` 选项，并使用 [@remove] 指令进行清理：

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; Given 'Remove Actors' is disabled, "LayeredBackground" won't be
; destroyed when "NextScript" is loaded, but both characters will.
@hide GenericCharacter,DicedCharacter wait!
@remove GenericCharacter,DicedCharacter
@goto NextScript
```

—— 另外，也可以使用带有 `*` 参数的 [@remove] 指令一次性清除所有现有角色（包括文本输出窗和选项处理器），或使用带有 `only` 参数的 [@resetState] 指令来立即移除特定类型的角色，例如：`ICharacterManager` 对应角色，`IBackgroundManager` 对应背景。

```nani
...
@goto NextScript
; Dispose all the existing backgrounds.
@resetState only:IBackgroundManager
```

## 生命周期管理

资源提供者管理器会跟踪已加载资源的引用，并在资源不再被任何用户（“持有者”）使用时自动释放（卸载）它们。

这一机制在脚本指令中表现得最为明显。例如，假设你希望通过自定义指令播放背景音乐。音频播放器需要一个音频剪辑资源，因此必须在指令执行前预加载并“持有”该资源，在播放结束后再释放：

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async UniTask PreloadResources ()
    {
        await audio.AudioLoader.Load(MusicName, this);
    }

    public void ReleaseResources ()
    {
        audio.AudioLoader.Release(MusicName, this);
    }

    public override async UniTask Execute (ExecutionContext ctx)
    {
        await audio.PlayBgm(MusicName, token: ctx.Token);
    }
}
```

请注意，指令实现了 `Command.IPreloadable` 接口。脚本播放器会自动检测此类指令，并调用其中的预加载与卸载方法，以确保资源在指令执行前已准备好，并在使用后及时释放。

## 共享资源

有时你可能希望在 Naninovel 与自定义游戏模式之间共享资源。如果自定义游戏逻辑独立于 Naninovel（即引擎在该模式下处于禁用状态），则不会出现任何冲突。但如果 Naninovel 与自定义逻辑同时运行，则需要特别注意资源的使用方式。

例如，假设你在 Naninovel 中有一个精灵背景，其纹理同时被 UI 元素引用。当 Naninovel 尝试卸载该纹理时，它也会在 UI 中消失。出现这种情况，是因为引擎并不知道你在其他地方也使用了该资源。

为此，你可以调用资源提供者服务的 `Hold` 方法来告知 Naninovel 该资源正在被使用：

```csharp
var resourceManager = Engine.GetService<IResourceProviderManager>();
resourceManager.Hold(asset, holder);
```

请注意，只要你“持有”了某个资源，Naninovel 就不会卸载它，因此需要由你自行在合适的时机释放该资源以防止内存泄漏：

```csharp
var holdersCount = resourceManager.Release(asset, holder);
// 如果没有其他对象持有该资源，我们应当卸载它。
if (holdersCount == 0) Resources.UnloadAsset(asset);
```

“持有者”（Holder）可以是任何对象的引用；通常是使用该资源的同一个类。它用于区分不同的持有者，并防止同一个持有者重复持有同一资源。

下面是一个 Unity 组件的示例，它将永久阻止 Naninovel 卸载某个资源：

```csharp
using Naninovel;
using UnityEngine;

public class HoldObject : MonoBehaviour
{
    public Object ObjectToHold;

    private async void Start()
    {
        while (!Engine.Initialized) await UniTask.DelayFrame(1);
        Engine.GetService<IResourceProviderManager>().Hold(ObjectToHold, this);
    }
}
```
