# 内存管理

一些脚本命令需要加载资源才能工作：[@bgm] 的音频剪辑、[@char] 的角色外观纹理、[@movie] 的视频剪辑等。Naninovel 以优化的方式负责加载和卸载这些资源。默认行为由资源提供者配置中的 `Resource Policy` 设置决定。

![](https://i.gyazo.com/ee96274f01f2f355d14190aabf5f2070.png)

## Conservative 策略

默认模式提供平衡的内存利用率。脚本执行所需的所有资源都在开始播放时预加载，并在脚本播放结束时卸载。[@gosub] 命令中引用的脚本也会预加载。可以使用 [@goto] 命令的 `hold` 参数预加载其他脚本。

下面的演示展示了在 Conservative 策略下如何管理资源：

::: code-group

```nani [Script1.nani]
来自 Script1、Script2 和 ScriptGosub 的资源都在此处加载。
Script2 被加载是因为它是通过 "@goto hold!" 导航到的。
ScriptGosub 被加载是因为 "@gosub" 脚本总是被预加载。

...

不会显示加载屏幕，因为 gosub 总是被预加载。
@gosub ScriptGosub

...

不会显示加载屏幕，因为我们使用了 "hold!"。
@goto Script2 hold!
```

```nani [Script2.nani]
来自 Script1、Script2 和 ScriptGosub 的资源仍全部保持加载，
因为此脚本是通过 "@goto hold!" 导航到的，
因此它被认为是 Script1 的依赖项。

...

将显示加载屏幕，因为我们没有使用 "hold!"。
@goto Script3
```

```nani [Script3.nani]
来自 Script1 和 Script2 的资源现在被卸载，而
来自 Script3（此脚本）的资源被加载。
来自 ScriptGosub 的资源仍保持加载，因为我们在这里使用它。

...

不会显示加载屏幕，因为 gosub 总是被预加载。
@gosub ScriptGosub

...

将显示加载屏幕，因为我们没有使用 "hold!"。
@goto Script4
```

```nani [Script4.nani]
之前的所有资源现在都已卸载（包括 ScriptGosub），只有
来自 Script4（此脚本）的资源被加载。

...

@stop
```

```nani [ScriptGosub.nani]
此处可能已加载各种资源，具体取决于是哪个脚本
导航到此脚本。

...

不会显示加载屏幕，因为 gosub 总是与导航到 gosub 的脚本
一起加载，并且直到该脚本卸载时才卸载。
@return
```

:::

## Optimistic 策略

当前播放的脚本所需的所有资源，以及 [@goto] 和 [@gosub] 命令中指定的所有脚本的所有资源，都会被预加载，除非在 [@goto] 命令中指定了 `release` 参数，否则不会卸载。这最大限度地减少了加载屏幕并允许平滑回滚，但需要手动指定何时卸载资源。在具有严格内存限制的平台（如移动设备和 Web 浏览器）上，这会增加内存不足异常的风险。

下面是一组类似脚本的演示，这次使用 Optimistic 策略：

::: code-group

```nani [Script1.nani]
来自 Script1、Script2、Script3 和 ScriptGosub 的资源都在此处加载。
Script4 未加载，因为它是通过 "@goto release!" 导航到的。

...

不会显示加载屏幕，因为 gosub 总是被预加载。
@gosub ScriptGosub

...

除非指定 "release!"，否则默认情况下不会显示加载屏幕。
@goto Script2
```

```nani [Script2.nani]
除 Script4 外的所有内容仍保持加载。

...

除非指定 "release!"，否则默认情况下不会显示加载屏幕。
@goto Script3
```

```nani [Script3.nani]
除 Script4 外的所有内容仍保持加载。

...

不会显示加载屏幕，因为 gosub 总是被预加载。
@gosub ScriptGosub

...

由于 "release!"，现在将显示加载屏幕。
@goto Script4 release!
```

```nani [Script4.nani]
除 Script4 外的所有资源现在都已卸载，因为我们通过
"@goto release!" 导航到这里。

...

@stop
```

```nani [ScriptGosub.nani]
此处可能已加载各种资源，具体取决于是哪个脚本
导航到这里。

...

不会显示加载屏幕，因为 gosub 总是与导航到 gosub 的脚本
一起加载，并且直到该脚本卸载时才卸载。
@return
```

:::

## Lazy 策略

其他策略假设游戏在设计时考虑到了某种加载屏幕——伪装成场景、幕或日期的切换——Naninovel 可以借此机会批量执行 CPU 密集型的资源加载操作，确保实际游戏过程保持流畅。

但是，某些游戏可能没有兼容的结构或不需要那种优化。选择“Lazy”模式时，Naninovel 永远不会显示加载屏幕，也不会尝试在播放脚本之前预加载资源。相反，它会在脚本播放时“即时”加载所需的资源。它还会提前预加载当前播放命令之后一定数量的命令，以最大程度地减少游戏过程中的延迟。可以通过资源提供者配置中的 `Lazy Buffer` 设置来调整预加载命令的数量。

::: code-group

```nani [Script1.nani]
假设 "Lazy Buffer" 设置为 3（默认值更高）。
现在只有 "Snow" 背景已预加载，因为它在缓冲区范围内。
@back Snow
"Ambient" 音频现在已预加载。
"Town" 背景现在已预加载。
@bgm Ambient
@back Town
"Snow" 背景现在已卸载，因为它不再可见。
...

不显示加载屏幕。所有资源都已释放。
来自 Script2 的 "Snow" 背景已预加载，因为它在缓冲区范围内。
@goto Script2
```

```nani [Script2.nani]
...
@back Snow
"Town" 背景现在已卸载，因为它不再可见。
```

:::

Lazy 模式有一个重要的注意事项：加载资产——尤其是大型背景纹理、高清角色模型或视频文件这类“重型”资产——可能会导致游戏过程中出现明显的卡顿。虽然 Naninovel 会尽可能在主线程之外执行这些操作，但某些低性能设备或平台（特别是 Web）仍可能出现明显的卡顿，尤其是在跳过（快进）和回滚期间。在决定 Lazy 策略是否可接受之前，请务必在您支持的最低硬件规格上测试游戏。

## 选择策略

通常，建议沿用默认的“Conservative”策略，因为它的内存使用较为平衡，适用于所有目标平台，同时允许在必要时通过 `hold!` 标志灵活地合并脚本。

但是，如果您只面向内存充足的高性能平台（例如独立平台构建和游戏主机），您可能更倾向于“Optimistic”策略，以将大部分资源保留在内存中并最大限度地减少加载屏幕。

使用“Optimistic”策略的另一种情形是将 Naninovel 用作自定义游戏循环内的对话系统。在这种情况下，您很可能有自己的资源管理系统，而“Optimistic”不会造成干扰——它只会在播放脚本之前让所有必需的资源保持加载，除非您明确使用 `release!` 标志。

当您需要最小化内存使用并可以容忍游戏过程中的潜在卡顿时，或者当围绕加载屏幕设计游戏不可行时，请选择“Lazy”策略。

以下是各策略的总结：

| 策略 | 内存使用 | CPU 使用 | 加载屏幕 | 跳过和回滚 |
|--------------|:--------------------------------------:|---------------------------------------|----------------------------------------------------|----------------------------------------------------|
| Conservative | <span class="txt-warn">平衡</span> | <span class="txt-ok">稳定</span> | <span class="txt-err">goto 时显示，除非已持有</span> | <span class="txt-warn">在已持有的脚本中快</span> |
| Optimistic | <span class="txt-err">高</span> | <span class="txt-ok">稳定</span> | <span class="txt-warn">释放前无</span> | <span class="txt-ok">释放前快</span> |
| Lazy | <span class="txt-ok">低</span> | <span class="txt-err">不稳定</span> | <span class="txt-ok">从不</span> | <span class="txt-err">总是慢</span> |

## Actor 资源

Actor（角色、背景、文本打印机和选项处理程序）是 Naninovel 中的关键实体。Actor 使用的大部分内存都与其外观有关。

### 外观

一些 Actor 实现将其外观 1:1 映射到资源：精灵 Actor 的外观与单个纹理资产关联，视频 Actor 的外观是单个视频剪辑，依此类推。这使 Naninovel 能够根据剧本脚本中引用的特定外观来管理资源。例如，如果在给定脚本中仅使用了精灵角色的 `Happy` 和 `Sad` 外观，则无论该角色有多少其他外观，在播放脚本之前都只会预加载 `Happy.png` 和 `Sad.png` 纹理。

然而，分层、切片精灵、通用、Live2D 和 Spine Actor 都需要一个整体预制件来表示任何关联的外观，这使得无法独立加载资源。在这种情况下，Naninovel 将预加载整个预制件及其所有依赖项，并且只有在没有任何命令引用该 Actor 时才卸载它，无论使用了哪些外观。

### 移除 Actor

默认情况下，Naninovel 会在卸载脚本资源时自动移除未使用的 Actor 并销毁关联的游戏对象。如果您想手动销毁 Actor，请在资源提供者配置菜单中禁用 `Remove Actors` 选项并使用 [@remove] 命令：

```nani
@back id:LayeredBackground
@char GenericCharacter
@char DicedCharacter
; 假设 'Remove Actors' 已禁用，当加载 "NextScript" 时，"LayeredBackground" 不会
; 被销毁，但两个角色都会被销毁。
@hide GenericCharacter,DicedCharacter wait!
@remove GenericCharacter,DicedCharacter
@goto NextScript
```

— 或者，使用带有 `*` 参数的 [@remove] 来销毁所有现有的 Actor（包括文本打印机和选项处理程序），或使用带有 `only` 参数的 [@resetState] 来立即销毁特定类型的 Actor：角色对应 `ICharacterManager`，背景对应 `IBackgroundManager`：

```nani
...
@goto NextScript
; 销毁所有现有的背景。
@resetState only:IBackgroundManager
```

## 生命周期管理

资源提供者管理器会跟踪对已加载资源的引用，并在它们不再被任何使用者（“持有者”）使用（“持有”）时销毁（卸载）它们。

该机制在脚本命令中体现得最为明显。例如，假设您想使用自定义命令播放背景音乐。音频播放器将需要一个音频剪辑资产（资源）来播放，因此我们需要在执行命令之前预加载并“持有”该资产，并在之后释放它：

```csharp
public class PlayMusic : Command, Command.IPreloadable
{
    public StringParameter MusicName;

    private IAudioManager audio => Engine.GetService<IAudioManager>();

    public async Awaitable PreloadResources (ScriptPlaylist playlist)
    {
        await audio.BgmLoader.Load(MusicName, this);
    }

    public void ReleaseResources (ScriptPlaylist playlist)
    {
        audio.BgmLoader.Release(MusicName, this);
    }

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        await audio.PlayBgm(MusicName, token: ctx.Token);
    }
}
```

注意该命令实现了 `Command.IPreloadable` 接口。脚本播放器将检测此类命令并调用预加载和释放方法，以确保资产在命令执行之前准备好并在之后释放。

## 共享资源

在某些情况下，您可能希望在 Naninovel 和自定义游戏模式之间共享资源。如果自定义游戏玩法独立于 Naninovel 实现（自定义模式处于活动状态时引擎被禁用），则应该没有任何问题。但是，如果同时使用自定义模式和 Naninovel，则必须注意资源的使用方式。

例如，假设您有一个 Naninovel 精灵背景，其外观纹理也用作某个 UI 元素的源。在某个时刻，Naninovel 将尝试释放该纹理，它也会随之从 UI 元素中消失。发生这种情况是因为引擎并不知道您正在使用该纹理、不应将其卸载。

要通知 Naninovel 您正在使用资产，请使用资源提供者服务的 `Hold` 方法：

```csharp
var resourceManager = Engine.GetService<IResourceProviderManager>();
resourceManager.Hold(asset, holder);
```

请注意，在您持有资产期间，Naninovel 不会卸载它，因此需要由您负责释放它，以防止内存泄漏：

```csharp
var holdersCount = resourceManager.Release(asset, holder);
// 如果没有其他人在持有资产，我们应该卸载它。
if (holdersCount == 0) Resources.UnloadAsset(asset);
```

“持有者”可以是对任何对象的引用；通常就是使用该资产的那个类。它用于区分持有者，并防止同一个持有者意外多次持有同一资源。

下面是一个 Unity 组件的示例，它可以防止 Naninovel 在任何时候卸载某个资产：

```csharp
using Naninovel;
using UnityEngine;

public class HoldObject : MonoBehaviour
{
    public Object ObjectToHold;

    private async void Start()
    {
        while (!Engine.Initialized) await Async.NextFrame();
        Engine.GetService<IResourceProviderManager>().Hold(ObjectToHold, this);
    }
}
```
