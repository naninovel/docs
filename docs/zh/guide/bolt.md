 # Bolt可视化

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) 是一款用于Unity的高级可视化编程插件。可非常灵活地适用于编程和和设计。


![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

## 安装

下载并导入Bolt资源到你的Naninovel项目，**推荐版本Bolt v2**，因为之前版本
不支持在AOT（预编译）平台下的泛型（在Naninovel中的核心API中则大量使用了泛型）。

现在我们需要将Naninovel的API开放给Bolt，通过`Tools/Bolt/Extractor...`打开提取工具：


![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

在"Namespaces"条目下，添加新的namespace条目，在列表中找到“Naninovel”,勾选"Hierarchy"然后点击"Fast Extract"：


![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

到此完成，现在你可以在Bolt中使用Naninovel的C#相关API了。

![](https://i.gyazo.com/080106d574ea894f62ea79b7dd904ab2.png)


::: 示例
在GitHub: [github.com/Naninovel/Bolt](https://github.com/Naninovel/Bolt)有用于本教程的使用示例。 注意其中不包含Naninovel和Bolt资源，直接打开会报错，导入相关资源来解决报错。
:::