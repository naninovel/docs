# 技术支持

如果您需要帮助，最好的起点是我们的官方 Discord 服务器：[discord.gg/BfkNqem](https://discord.gg/BfkNqem)。

欢迎您在 `#forum` 频道寻求帮助或建议，在 `#wiki` 中探索教程和指南，或者在 `#chat` 中与其他 Naninovel 用户闲聊。

如果您拥有有效的 [支持计划](/zh/support/#支持计划)，您还将获得 `#support` 频道的访问权限，Naninovel 团队将在那里提供直接帮助。当您 [注册许可证](https://account.naninovel.com) 时，第一年的支持计划是免费的。

## 支持计划

支持计划提供对我们 Discord 服务器上专用支持的访问权限，包括：

- 在 `#support` 频道中对技术问题和故障排除请求的优先响应
- 访问 GitHub 上的引擎源代码存储库，您可以在其中跟踪开发过程
- 访问包含最新预览版和稳定版本分支的 UPM 存储库，允许您直接从 GitHub 安装和更新 Naninovel
- 访问包含高级示例和演示场景的项目

当您 [注册许可证](https://account.naninovel.com) 时，将包含一年的免费支持计划。之后，您可以随时通过您的 [帐户仪表板](https://account.naninovel.com/support) 续订订阅。

::: info NOTE
支持计划完全是可选的——即使没有它，您也将继续通过 [下载存档](https://account.naninovel.com/download) 终身访问所有未来的 Naninovel 稳定版本，并且社区支持仍然可以在 `#forum` 频道中获得，您可以在那里随时提问并获得帮助。
:::

## 报告错误

如果您认为某些功能未按预期工作，请在 [Discord](https://discord.gg/BfkNqem) 的 `#support` 频道（如果您有有效的 [支持计划](/zh/support/#支持计划)）或 `#forum` 频道中告诉我们。

在提交报告之前，请：

- 检查您遇到问题的功能或用例的 [指南](/zh/guide/)、[命令参考](/zh/api/) 和 [常见问题](/zh/faq/) —— 您很可能遗漏了一些东西。
- 确保您运行的是最新的可用 Naninovel 版本。最新的补丁可以通过 [UPM 注册表](/zh/guide/getting-started#从-github-安装) 获得；在 Asset Store 和下载存档上分发的包通常已过时。
- 如果您最近从以前的 Naninovel 版本升级，请务必遵循 [发行说明](/releases/) 中的升级说明。
- 尝试通过删除项目根目录中的 `Library` 文件夹并重新启动编辑器来清除 Unity 的缓存。
- 确保问题实际上源于 Naninovel 而不是另一个第三方插件或 Unity 本身；在这种情况下，[请联系 Unity 支持](https://unity.com/support-services)。

报告错误时：

- 提供对问题以及如何逐步重现该问题的清晰、简洁的描述。
- 包括您的 Naninovel 版本、Unity 版本、目标平台（Android、iOS、WebGL 等）和操作系统（Windows、macOS 或 Linux）。
- 附上包含任何相关错误或警告的 [日志文件](https://docs.unity3d.com/Manual/LogFiles.html)。

## 复现项目

报告问题时，可能会要求您提供一个重现该问题的小型 Unity 项目。
复现项目应该是 **一个新的、干净的 Unity 项目**，仅包含显示问题所需的 **最低限度** 修改。

请按照以下步骤操作：

1. 创建一个新的 Unity 项目。确保它使用的是 [支持的 Unity 版本](/zh/guide/compatibility#unity-版本)。
2. 安装最新的可用 Naninovel 版本。不要修改或添加包文件夹内的任何内容——我们无法支持修改后的包版本。
3. 添加重现问题所需的资产和脚本。确切不要复制整个现有项目——从头开始并在隔离环境中重现问题。避免使用第三方插件或不必要的内容。
4. 在项目根目录中创建一个 `repro.txt` 文件，其中包含逐步说明以及您期望的结果与实际发生的情况的简短描述。例如：
    ```
    1. 打开场景 "Assets/Scenes/SampleScene"。
    2. 在编辑器中进入播放模式。
    3. 开始新游戏。
    4. 玩到第 15 行。
    5. 保存并加载游戏。

    预期：音乐 "Ambient" 应该开始播放。
    实际：没有音乐在播放。
    ```
5. 删除 `Library` 文件夹以减小项目大小，然后压缩项目文件夹。
6. 通过 Discord 私信与请求复现项目的 Naninovel 团队成员私下分享。不要通过公共频道分享项目，因为它可能包含个人或受版权保护的资产。
