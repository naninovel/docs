# 技术支持

需要帮助时，建议先访问我们的官方 Discord 服务器：[discord.gg/BfkNqem](https://discord.gg/BfkNqem)。

欢迎在 `#forum` 频道提问或寻求建议，在 `#wiki` 中查阅教程和指南，也可以在 `#chat` 中与其他 Naninovel 用户聊天交流。

如果您有有效的 [支持计划](/zh/support/#支持计划)，还可以访问 `#support` 频道，直接获得 Naninovel 团队的帮助。[注册许可证](https://account.naninovel.com) 后，首年的支持计划免费。

## 支持计划

通过支持计划，您可以在我们的 Discord 服务器上获得专属支持，其中包括：

- 团队在 `#support` 频道中优先响应技术问题和故障排除请求
- 来自 Nani-kun 的即时响应——它是我们的支持机器人，精通整个 Naninovel 代码库
- 访问 GitHub 上的引擎源代码存储库，您可以在其中跟踪开发过程
- 访问包含最新 preview 和 stable 发布分支的 UPM 存储库，让您可以直接从 GitHub 安装和更新 Naninovel

[注册许可证](https://account.naninovel.com) 后，您将获得一年的免费支持计划。此后，您可以随时通过 [账户仪表板](https://account.naninovel.com/support) 续订。

::: info NOTE
是否订阅支持计划完全由您决定。即使不订阅，您仍可通过 [下载归档](https://account.naninovel.com/download) 终身获取今后发布的所有 Naninovel 稳定版本，也可以继续在 `#forum` 频道提问并获得社区帮助。
:::

## 报告错误

如果您认为某些功能未按预期工作，请在 [Discord](https://discord.gg/BfkNqem) 的 `#support` 频道（如果您有有效的 [支持计划](/zh/support/#支持计划)）或 `#forum` 频道中告诉我们。

在提交报告之前，请：

- 查阅与问题所涉及功能或使用场景相关的 [指南](/zh/guide/)、[命令参考](/zh/api/) 和 [常见问题](/zh/faq/)——很可能只是遗漏了某个步骤或细节。
- 确保您使用的是目前可用的最新 Naninovel 版本。最新补丁可通过 [UPM 存储库](/zh/guide/getting-started#从-github-安装) 获取；Asset Store 和下载归档中的包通常会滞后。
- 如果您最近从以前的 Naninovel 版本升级，请务必遵循 [发行说明](/releases/) 中的升级说明。
- 尝试删除项目根目录中的“Library”文件夹，再重新启动编辑器，以清除 Unity 缓存。
- 确保问题确实源于 Naninovel，而不是其他第三方插件或 Unity 本身；如果是后一种情况，请 [联系 Unity 支持](https://unity.com/support-services)。

报告错误时：

- 清晰、简洁地描述问题以及逐步复现该问题的方法。
- 注明您的 Naninovel 版本、Unity 版本、目标平台（Android、iOS、WebGL 等）和操作系统（Windows、macOS 或 Linux）。
- 附上包含任何相关错误或警告的 [日志文件](https://docs.unity3d.com/Manual/LogFiles.html)。

## 复现项目

报告问题时，可能会要求您提供一个能复现该问题的小型 Unity 项目。
复现项目应该是**一个新的、干净的 Unity 项目**，仅包含展示问题所需的**最低限度**修改。

请按照以下步骤操作：

1. 创建一个新的 Unity 项目。确保它使用的是 [支持的 Unity 版本](/zh/guide/compatibility#unity-版本)。
2. 安装最新的可用 Naninovel 版本。不要修改或添加包文件夹内的任何内容——我们无法支持修改后的包版本。
3. 添加复现问题所需的资产和脚本。确保不要复制整个现有项目——从头开始，单独复现该问题。避免使用第三方插件或不必要的内容。
4. 在项目根目录中创建 `repro.txt` 文件，写明逐步复现的方法，并简要说明预期结果与实际结果。例如：
    ```
    1. 打开场景“Assets/Scenes/SampleScene”。
    2. 在编辑器中进入播放模式。
    3. 开始新游戏。
    4. 玩到第 15 行。
    5. 保存并加载游戏。

    预期：音乐“Ambient”应该开始播放。
    实际：没有播放任何音乐。
    ```
5. 删除“Library”文件夹以减小项目大小，然后压缩项目文件夹。
6. 通过 Discord 私信与请求复现项目的 Naninovel 团队成员私下分享。不要通过公共频道分享项目，因为它可能包含个人或受版权保护的资产。
