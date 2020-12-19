# 技术支持

如果有任何关于引擎的问题，请确保先阅读了[开始引导](/zh/guide/) 和 [API命令参考](/zh/api/) 中你遇到问题的相应部分；也可以查阅[常见问题](/zh/faq/) ，了解常见问题。

如果你确定你遇到的问题没有相关描述，检查是否使用最新版本资源。使用Unity内的[Asset Store window](https://docs.unity3d.com/Manual/AssetStore.html) 来更新。使用相关扩展资源时，下载导入最新的扩展支持包：

- [Naninovel Live2D角色使用](https://github.com/Naninovel/Live2D/raw/master/NaninovelLive2D.unitypackage)
- [Naninovel PlayMaker使用](https://github.com/Naninovel/PlayMaker/raw/master/NaninovelPlayMaker.unitypackage)
- [Naninovel AdventureCreator使用](https://github.com/Naninovel/AdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage)

如果更新后依旧有问题，试着删除`Naninovel` 目录后，重新安装资源包。确保更新时严格按照[更新说明](https://github.com/Naninovel/Documentation/releases) 执行操作。

记得在更新或删除包以前**备份你的项目** （或使用[VCS](https://en.wikipedia.org/wiki/Version_control) 版本控制）。

## 问题追踪

如果上述没有任何作用，查阅[问题追踪](https://github.com/Naninovel/Documentation/issues?q=is%3Aissue+label%3Abug) — 也许是已经解决过的问题。

## 社区论坛

考虑加入专门的[Naninovel论坛](https://forum.naninovel.com) ，这里所有本资源用户都会互相解决开发问题，分析经验和演示项目。你遇到的问题可能已经有其他人解决了；你可以随时求助，如果该问题没有解决。

## Unity支持

即使我们提供了多个视频教程和示例项目来演示如何使用unity达到Naninovel的特性效果，但是我们不会提供任何关于unity的内置工具的使用说明和帮助支持。

untiy是个人电脑产品，拥有众多特性；它有自己的说明文档，支持服务，和社区讨论，涵盖了相当丰富的Unity学习材料。你可以在其中轻松找到任何你想要的视频教程，指引或是有的问题。如果真的没有找到想要的答案，你可以在 [Unity 论坛](https://forum.unity.com)  或 [Q&A服务](https://answers.unity.com/questions/ask.html)  提问，或使用任何官方[求助选项](https://unity.com/support-services)

## 开发支持Developer Support

::: warn
开发支持仅用于英语和俄语讨论Naninovel相关的话题。其他关于Unity（uGUI，寻址系统，C#代码）的任何问题参考[Unity支持](/zh/support/#unity支持)。
:::

要获得直接开发支持，加入Discord服务器[discord.gg/BfkNqem](https://discord.gg/BfkNqem)) 然后注册你的资源副本到注册论坛[naninovel.com/register](https://naninovel.com/register/) 。
To receive direct developer support join Naninovel Discord server ([discord.gg/BfkNqem](https://discord.gg/BfkNqem)) and register your copy of the asset using the following registration form: [naninovel.com/register](https://naninovel.com/register/).

注册完成后，你会自动变成 "Verified User"（认证用户），并开通 

<iframe src="https://discordapp.com/widget?id=545676116871086080&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>

注意，**开发反馈可能延迟24H以上** （部分情况更长），所以确保：
 - 提供清晰简明的问题描述，并一步一步说明如何再现问题。
 - 明确使用的Naninovel和unity版本，目标平台（Android，iOS，WebGL，等），电脑操作系统（Windows，Mac 或 Linux）。
 - 附加上包含该描述问题的错误或警告的[log文件](https://docs.unity3d.com/Manual/LogFiles.html) 。
 
附加上[复制项目](/zh/support/#复制项目) 会大大提高并尽快识别修复该问题的可能。
  
## 复制项目

报告问题是，我们可能会要求复制项目，复制项目是用于再现问题的仅包含基础相关资源和设置的**极小化**的新项目。

跟随以下步骤来创建分享复制项目：
1. 创建新Unity项目，确保使用的Unity版本能被支持，参考[当前Naninovel支持](https://github.com/Naninovel/Documentation/releases) 。
2. 导入最新Naninovel包（或是导入之前可用版本的包）。
3. 添加重现问题需要的设置和资源。**确保Naninovel脚本足够短小**以及资源为**重现问题必需的**。
4. 创建文本文件（.txt），使用英语一步一步记述如何再现该问题。如下：

```
1. Open scene "SampleScene".
2. Enter play mode in the editor.
3. Start a new game.
4. Play through to the line number 15.
5. Save and load the game.
```

然后添加上你想要达到的效果，和实际运行产生的效果，比如：

```
Expected: Music "Ambient" should start playing.
Actual: No music is playing.
```

5. 关闭Unity编辑器，除了创建的文本文件，及 `Assets`，`Packages` 和 `ProjectSettings` 目录外，移除所有其他目录。最主要的是 **确保删除了 `Library` 目录**，因为其中包含了很多自动生成的文件，会显著增大包大小。
6. 将项目压缩为zip，上传至Google Drive或是在Discord附件私信。

记得进通过私信来提交你都项目，**千万不要在公共频道发出**，以避免个人数据或者版权资源的泄露。 