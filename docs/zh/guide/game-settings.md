# 游戏设置

游戏设置可以随时通过设置菜单改变。


![](https://i.gyazo.com/8ef1044cb0b8429298af05e6275ff14d.mp4)

修改语言设置会重启后生效，其他设置立即生效。

设置都被序列化为`Settings.json`文件，存储于游戏目录中。文件名字可以通过`Naninovel -> Configuration -> State` 菜单配置，其他可选配置参考[属性配置](/zh/guide/configuration#保存状态).


![State Configuration](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

在WebGL中，设置则按跨浏览器[索引数据库 API](https://en.wikipedia.org/wiki/Indexed_Database_API) 序列化。

菜单UI可以按[UI自定义](/zh/guide/user-interface#UI自定义)来修改或是完全替换。
