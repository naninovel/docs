# 介绍

::: warn
這是文檔的翻譯版本。 它可能是不完整和過時的。 對於當前版本[切換到英語](/guide/)。
:::

Naninovel是 [Unity引擎](https://unity3d.com) 的扩展。包含C#框架，以及编辑器程序，用以开发[visual novel games视觉小说](https://en.wikipedia.org/wiki/Visual_novel).

[!!lRxIKDU9z4k]

::: note
虽然Naninovel不限制你在Unity中的任何功能实现，但有部分要求（如支持unity版本，项目配置，目标平台）来确保内置功能的正常工作。详情参考[compatibility page兼容性页](/zh/guide/compatibility.md) 
:::

确保你第一次使用时阅读。[getting started guide开始指南](/zh/guide/getting-started.md)

如果你咋查找某个问题，尝试使用本站上方的搜索栏；或者查阅 [FAQ](/zh/faq/), 这里有一些我们已经回答过的常见问题。所有可用脚本命令，支持参数，已经可用示例都列举在 [API reference API参考](/zh/api/)。如果找不到所需问题也可以直接联系技术支持。 [contact the support](/zh/support/#developer-support) 。

## 特点

以下列举的是Naninovel的出色功能:

* [Document-based scripts 文本化易读脚本](/zh/guide/naninovel-scripts.md)
  * [Generic text lines 无标记文本行](/zh/guide/naninovel-scripts.md#generic-text-lines)
  * [Labels 标签](/zh/guide/naninovel-scripts.md#label-lines)
  * [Commands inlining 命令文本插入](/zh/guide/naninovel-scripts.md#command-inlining)
  * [Visual editor 可视化编辑器](/zh/guide/naninovel-scripts.md#visual-editor)
  * [Hot reload 热加载](/zh/guide/naninovel-scripts.md#hot-reload)
  * [IDE support IDE支持(语法高亮，自动匹配等)](/zh/guide/naninovel-scripts.md#ide-support)
* [Text printers 打字机](/zh/guide/text-printers.md)
  * [Dialogue 对话](/zh/guide/text-printers.md#dialogue-printer)
  * [Fullscreen 全屏](/zh/guide/text-printers.md#fullscreen-printer)
  * [Chat 聊天窗口](/zh/guide/text-printers.md#chat-printer)
  * [Bubble 气泡框](/zh/guide/text-printers.md#bubble-printer)
  * [TextMesh Pro 支持](/zh/guide/text-printers.html#textmesh-pro)
  * [Ruby (furigana) text support 注音文本支持](/zh/guide/text-printers.html#text-styles)
* [Characters 人物](/zh/guide/characters.md)
  * [Sprite characters 精灵人物](/zh/guide/characters.md#sprite-characters)
  * [Diced sprite characters 切片精灵人物](/zh/guide/characters.md#diced-sprite-characters)
  * [Layered characters分图层人物](/zh/guide/characters.md#layered-characters)
  * [Generic characters 传统人物](/zh/guide/characters.md#generic-characters)
  * [Live2D characters Live2D人物](/zh/guide/characters.md#live2d-characters)
  * [Character-specific message colors 按人物对话文本上色](/zh/guide/characters.md#message-colors)
  * [Lip sync 嘴唇同步](/zh/guide/characters.md#lip-sync)
* [Backgrounds 背景](/zh/guide/backgrounds.md)
  * [Sprite backgrounds 精灵背景](/zh/guide/backgrounds.md#sprite-backgrounds)
  * [Video backgrounds 视频背景](/zh/guide/backgrounds.md#video-backgrounds)
  * [Layered backgrounds 多图层背景](/zh/guide/backgrounds.md#layered-backgrounds)
  * [Generic backgrounds 传统背景](/zh/guide/backgrounds.md#generic-backgrounds)
  * [Scene backgrounds 场景背景](/zh/guide/backgrounds.md#scene-backgrounds)
* [Transition effects 过渡效果](/zh/guide/transition-effects.md)
* [Perspective camera and look around mode 透视相机及漫游](https://youtu.be/rC6C9mA7Szw)
* [Special effects (FX system) 特殊效果](/zh/guide/special-effects.md)
* [Background music (BGM) 背景音乐](/zh/guide/audio.md#background-music)
* [Sound effects (SFX)音效](/zh/guide/audio.md#sound-effects)
* [Camera animations 相机动画](/zh/api/#camera)
* [Voicing and auto voicing 人声和自动人声](/zh/guide/voicing.md)
* [Movies 电影](/zh/guide/movies.md)
* [Choices 选择](/zh/guide/choices.md)
* [Custom variables 自定义变量](/zh/guide/custom-variables.md)
* [State rollback 状态回溯](https://youtu.be/HJnOoUrqHis)
* [Script expressions 脚本表达式](/zh/guide/script-expressions.md)
* [In-game variable input 游戏内输入](/zh/api/#input)
* [Conditional script flow 条件脚本流 ](/zh/api/#if)
* [Save-load system 读取保存系统](/zh/guide/save-load-system.md)
* [Dynamic resources (memory) management 动态资源管理](https://youtu.be/cFikLjfeKyc)
* [Game settings 游戏设置](/zh/guide/game-settings.md)
* [CG gallery CG画廊](/zh/guide/unlockable-items.md#cg-gallery)
* [Unlockable Tips 解锁提示](/zh/guide/unlockable-items.md#tips)
* [Cross-platform input 跨平台输入](/zh/guide/input-processing.md)
* [Printer backlog 回看](/zh/guide/text-printers.md#printer-backlog)
* [Text skipping 文本跳过](/zh/guide/text-printers.md#text-skipping)
* [Auto-advance text 自动文本](/zh/guide/text-printers.md#auto-advance-text)
* [UI toggling UI隐藏](/zh/guide/user-interface.md#ui-toggling)
* [Adaptive UI layout 自适应UI](/zh/guide/user-interface.md#adaptive-ui-layout)
* [UI customization 自定义UI](/zh/guide/user-interface.md#ui-customization)
* [Managed text 本地托管文本元素](/zh/guide/managed-text.md)
* [Localization 本地化](/zh/guide/localization.md)
  * [Scripts localization 脚本本地化](/zh/guide/localization.md#scripts-localization)
  * [Resources localization 资源本地化](/zh/guide/localization.md#resources-localization)
* [Community modding ](/zh/guide/community-modding.md)
* [Development console 内置调试UI](/zh/guide/development-console.md)
* [Script rewinding and debug 调式debug](/zh/guide/naninovel-scripts.md#scripts-debug)
* [Custom commands 自定义命令](/zh/guide/custom-commands.md)
* [Custom actor implementations 自定义演出元素](/zh/guide/custom-actor-implementations.md)
* [Google Drive integration Google Drive整合](/zh/guide/resource-providers.md#google-drive)
* [Visual scripting 可视化编程playmaker](/zh/guide/playmaker.md)
