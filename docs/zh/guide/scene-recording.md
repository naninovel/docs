# 场景录制

场景构图通常更适合通过可视化方式完成：放置角色，调整其缩放和旋转，然后移动或缩放摄像机，直到画面达到预期效果。若在剧本脚本中重现这一结果，通常需要反复猜测数值参数、重新播放场景并进行细微调整。

场景录制省去了这一反复试错的过程。在剧本行上开始录制，使用 Unity 常规的场景视图和检查器工具安排支持的 actor 和摄像机，对应的剧本命令便会实时出现在 [故事编辑器](/zh/guide/editor) 或 [VS Code 扩展](/zh/guide/ide-extension) 中。您可以在编排新场景、微调现有构图，或捕获不便手动计算的变换时使用此功能。

![](/assets/img/guide/scene-recording.mp4)

## 在故事编辑器中录制

1. 进入 Play Mode 并开始播放剧本。
2. 在故事编辑器中右键单击目标行，然后选择 `Start Scene Recording`。
3. 使用 Unity 场景视图中的变换工具或检查器修改支持的对象。生成的行会实时更新并显示红色边框。
4. 右键单击任意行并选择 `Stop Scene Recording`，或保存脚本以停止录制。

整个录制过程会注册为单个 `Record Scene` 撤销步骤。编辑剧本脚本或停止播放也会停止正在进行的录制。

## 在 VS Code 中录制

1. 进入 Play Mode 并开始播放剧本。
2. 右键单击目标剧本行，然后选择 `Start Scene Recording`。
3. 使用 Unity 场景视图中的变换工具或检查器修改支持的对象。命令更新时，编辑器边栏中的红色圆点会标记正在录制的区块。
4. 右键单击任意行并选择 `Stop Scene Recording`，或保存脚本以停止录制。

停止录制时，VS Code 会自动保存文档。撤销或重做、编辑录制区块以外的内容，或停止播放也会停止录制。

## 支持的对象

默认录制器支持以下场景对象和序列化属性：

| 对象 | 录制的属性 | 生成的命令 |
|---|---|---|
| 背景 | 位置、旋转和缩放 | `@back wpos: rotation: scale:` |
| 角色 | 位置、旋转和缩放 | `@char wpos: rotation: scale:` |
| 打印机 | 位置、旋转和缩放 | `@printer wpos: rotation: scale:` |
| 选项 | 位置、旋转和缩放 | `@choiceHandler wpos: rotation: scale:` |
| 摄像机 | 位置、旋转、正交大小、FOV | `@camera offset: rotation: zoom:` |

默认录制器不会捕获 actor 的外观或可见性、项目和预制件资产，以及由运行时脚本、动画和 Timeline 产生的更改。它会观察通过 Unity 编辑器修改系统对场景对象所做的序列化更改，例如使用场景视图中的变换工具移动对象，或在检查器中更改值。

## 自定义录制器

要支持其他场景对象或更改命令的生成方式，请添加一个具有无参数构造函数并实现 `ISceneRecorder` 的 C# 类。将其放在仅限编辑器的程序集中，例如 `Assets/Editor` 目录下。Naninovel 会自动使用您的自定义实现替代默认实现。

在自定义实现中，您可以继承默认的 `SceneRecorder` 类并修改其输出。下面的示例使用自定义命令记录灯光强度的更改：

```cs
public class CustomRecorder : SceneRecorder
{
    // 在录制期间场景发生更改时调用
    public override void Record (
        // 输入：要录制的场景更改
        IReadOnlyList<SceneChange> changes,
        // 输出：录制的剧本行
        List<string> lines)
    {
        // 保留默认行为（可选）
        base.Record(changes, lines);
        // 扫描当前场景更改
        foreach (var change in changes)
            // 查找目标对象和属性
            if (change is { Target: Light light, Property: "m_Intensity" })
                // 将更改记录到剧本脚本中
                lines.Add($"@light power:{light.intensity}");
    }
}
```

每个 `SceneChange` 都会标识拥有已修改序列化属性的 Unity 对象，以及该属性的序列化路径。请将完整的 NaniScript 命令行添加到 `lines`；您也可以删除或修改 `lines` 列表中的元素，以自定义或禁用默认行为。
