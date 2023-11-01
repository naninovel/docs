# 语音

向引擎添加语音剪辑，将他们存放至`Resources/Naninovel/Voice` （可以通过音频配置菜单的 `Loader` 修改）。
你也可以通过子文件夹来管理相应资源。脚本中需要使用(`/`)调用。比如`Resources/Naninovel/Voice/Intro/Day/25.wav`的资源，脚本中的调用为：`Voice/Intro/Day/25`。

使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统) 来手动公开资源也是可以的。公开资源地址和上述相同，但是需要省略"Resources/"部分。比如开放 "Hello.wav" 声音剪辑，注册地址为`Naninovel/Voice/Hello`。注意，该系统默认不启用你可以通过资源配置菜单的`Enable Addressable In Editor`属性来启用。

你可以使用任何 [Unity支持](https://docs.unity3d.com/Manual/AudioFiles.html) 的影片格式。

在菜单 `Naninovel -> Configuration -> Audio` 配置语音表现，可用配置选项参考[属性配置](/zh/guide/configuration#音频)。

在Naninovel脚本中使用[@voice]命令，后接剪辑名字（路径）来播放语音。

## 自动语音

在全语音的游戏中，每个语音内容都用[@voice]命令配置会很麻烦。自动发声功能允许自动播放名称和当前执行的[@print]命令的行号相同的语音剪辑；这样就完全不需要在naninovel脚本中使用 [@voice] 命令-当在游戏中打印相应的文本行时，声音会自动播放。

要启用自动语音功能，在配置菜单中打开 `Enable Auto Voicing` 选项。

使用该特性的音频文件应放在和要使用的脚本一样命名的文件夹，命名按*行序号*.*命令序号*方式命名，*行序号*是使用这句语音的打印文本序号，*命令序号*是行内处理常规文本，第几个[@print]命令的序号。

比如，以下为"Script001"的脚本：

```nani
@print text:"Text from a print command."
Text from a simple generic text line.
Text from first sentence.[i] Text from second sentence.
```

要对应上述行自动播放语音，音频剪辑应该放在`Resources/Naninovel/Voice/Script001`文件夹下（或使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统) ），并按下表命名：

文本 | 音频剪辑名
--- | ---
Text from a print command. | 1.0
Text from a simple generic text line. | 2.0
Text from first sentence. | 3.0
Text from second sentence. | 3.2

为简化设置，当该功能启用时，自动语音的音频命名会在debug窗口上显示出来，如下图：

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

要打开debug窗口，确保配置菜单中`Enable Development Console`启用，在play mode运行时按 `~` 输入`debug`按 `Enter`。

## 声音分配文件

可以通过菜单`Naninovel -> Tools -> Voiceover Documents`来生成该文件，内容包含脚本中使用 [@print] 命令的和一般常规文本行。每条文本都会和自动语音功能对应音频名字关联。

![](https://i.gyazo.com/69466444d4b8b43d76e7f1566db5ca9a.png)

`Locale` 是用于选择对应的本地化所需来生成（限选已添加进项目的本地化配置）。

当 `Use Markdown Format` 开启时，生成文件会按照[markdown格式](https://en.wikipedia.org/wiki/Markdown) (.md 扩展名)，这样会有更好的可读性。

![](https://i.gyazo.com/ed6776026a79140de9e9f6a155faffdc.png)

该文件旨在方便配音演员在配音时使用。
