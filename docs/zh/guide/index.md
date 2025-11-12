# 介绍

Naninovel 是一个用于 [Unity 游戏引擎](https://unity3d.com) 的扩展插件。它由一个 C# 框架和一系列编辑器工具组成，用于支持 [视觉小说游戏](https://zh.wikipedia.org/wiki/视觉小说) 的开发。

![](https://www.youtube.com/watch?v=lRxIKDU9z4k)

::: info 提示
虽然 Naninovel 并不限制你使用 Unity 能实现的功能，但某些内置特性在运行时需要满足特定条件（支持的 Unity 版本、项目配置、目标平台等）。请参阅 [兼容性页面](/zh/guide/compatibility) 以获取更多信息。
:::

首次使用该引擎时，请务必阅读 [入门指南](/zh/guide/getting-started)。

如果你在寻找特定主题，可以使用网站顶部的搜索栏；同时，你也可以查看 [常见问题](/zh/faq/)，我们在其中整理了常见问题的答案。所有可用的脚本指令、支持的参数及使用示例都列在 [API 参考](/zh/api/) 中。  

若仍未找到所需信息，请随时 [联系售后支持](/zh/support/#naninovel-support)。

:::tip
译注：中文版文档由 [呐呐呐制作组](https://nanana.cn/) 协助翻译，关于翻译错误等问题可以在 GitHub [提交 Issues](https://github.com/naninovel/docs/issues) 或 [Pull Request](https://github.com/naninovel/docs/pulls)。Naninovel 中的一些惯用语可参考[中英用语对照表](/zh/guide/zh-terms-dict)。
:::

## 功能

以下是 Naninovel 开箱即用的一些功能：

* [基于文档的脚本系统](/zh/guide/naninovel-scripts)
  * [通用文本行](/zh/guide/naninovel-scripts#generic-text-lines)
  * [标签行](/zh/guide/naninovel-scripts#label-lines)
  * [内联指令](/zh/guide/naninovel-scripts#command-inlining)
  * [可视化编辑器](/zh/guide/naninovel-scripts#visual-editor)
  * [热重载](/zh/guide/naninovel-scripts#hot-reload)
* [VS Code 扩展](/zh/guide/ide-extension)
* [网页版编辑器](/zh/guide/editor)
* [文本输出窗](/zh/guide/text-printers)
  * [对话输出窗](/zh/guide/text-printers#dialogue-printer)
  * [全屏输出窗](/zh/guide/text-printers#fullscreen-printer)
  * [聊天输出窗](/zh/guide/text-printers#chat-printer)
  * [气泡输出窗](/zh/guide/text-printers#bubble-printer)
  * [支持注音（Ruby）文字](/zh/guide/text-printers.html#text-styles)
* [角色系统](/zh/guide/characters)
  * [精灵角色](/zh/guide/characters#sprite-characters)
  * [分割精灵角色](/zh/guide/characters#diced-sprite-characters)
  * [分层角色](/zh/guide/characters#layered-characters)
  * [通用角色](/zh/guide/characters#generic-characters)
  * [Live2D 角色](/zh/guide/characters#live2d-characters)
  * [Spine 角色](/zh/guide/characters#spine-characters)
  * [角色专属消息颜色](/zh/guide/characters#message-colors)
  * [口型同步](/zh/guide/characters#lip-sync)
* [背景系统](/zh/guide/backgrounds)
  * [精灵背景](/zh/guide/backgrounds#sprite-backgrounds)
  * [视频背景](/zh/guide/backgrounds#video-backgrounds)
  * [分层背景](/zh/guide/backgrounds#layered-backgrounds)
  * [通用背景](/zh/guide/backgrounds#generic-backgrounds)
  * [场景背景](/zh/guide/backgrounds#scene-backgrounds)
* [过渡特效](/zh/guide/transition-effects)
* [透视相机与环视模式](https://youtu.be/rC6C9mA7Szw)
* [特效系统（FX System）](/zh/guide/special-effects)
* [背景音乐（BGM）](/zh/guide/audio#background-music)
* [音效（SFX）](/zh/guide/audio#sound-effects)
* [相机动画](/zh/api/#camera)
* [语音与自动语音](/zh/guide/voicing)
* [视频播放](/zh/guide/movies)
* [对话选项](/zh/guide/choices)
* [自定义变量](/zh/guide/custom-variables)
* [状态回滚](https://youtu.be/HJnOoUrqHis)
* [脚本表达式](/zh/guide/script-expressions)
* [游戏内变量输入](/zh/api/#input)
* [条件脚本流程控制](/zh/api/#if)
* [存档与读取系统](/zh/guide/save-load-system)
* [游戏设置](/zh/guide/game-settings)
* [CG 图鉴](/zh/guide/unlockable-items#cg-gallery)
* [可解锁提示](/zh/guide/unlockable-items#tips)
* [跨平台输入系统](/zh/guide/input-processing)
* [文本回顾记录](/zh/guide/text-printers#printer-backlog)
* [文本跳过](/zh/guide/text-printers#text-skipping)
* [自动文本推进](/zh/guide/text-printers#auto-advance-text)
* [UI 显示切换](/zh/guide/user-interface#ui-toggling)
* [自适应 UI 布局](/zh/guide/user-interface#adaptive-ui-layout)
* [UI 自定义](/zh/guide/user-interface#ui-customization)
* [文本管理系统](/zh/guide/managed-text)
* [本地化](/zh/guide/localization)
  * [脚本本地化](/zh/guide/localization#scripts-localization)
  * [资源本地化](/zh/guide/localization#resources-localization)
* [社区模组](/zh/guide/community-modding)
* [开发控制台](/zh/guide/development-console)
* [脚本回溯与调试](/zh/guide/naninovel-scripts#scripts-debug)
* [自定义指令](/zh/guide/custom-commands)
* [自定义角色实现](/zh/guide/custom-actor-implementations)
* [中英用语对照表](/zh/guide/zh-terms-dict)