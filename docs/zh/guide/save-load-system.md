# 读取保存系统

游戏可以在任何游戏过程中通过菜单来读取或是保存当前游戏进度。用户可以自由选择存储栏位，或是删除之前的存档栏位。

[!a7109097f6abbeea16d6fe773bfffb3f]

保存栏位数据，是序列化为 `.json`      文件或者二进制文件的（由相关配置决定）。文件名，栏位限制，目录名，可以通过
 `Naninovel -> Configuration -> State` 菜单配置，其他配置项参考[属性配置](/zh/guide/configuration.md#保存状态).


![State Configuration](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

WebGL下的存储序列化使用的是跨浏览器[索引数据库 API](https://en.wikipedia.org/wiki/Indexed_Database_API) 。

菜单UI可以自定义，或其他UI被完全替换，参考[UI 自定义](/zh/guide/user-interface.md#UI自定义) 。

Naninovel提供了两种序列化方式`System.IO`和`UnityEngine.PlayerPrefs`。前者会将栏位的信息分别存储于路径[persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html)
下。第二种会使用Unity的[PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) API的键值数据库来存储数据。你可以通过配置菜单选择使用哪种，IO序列化方式是默认的，如果你在其他平台遇到了写入读取问题，尝试更改该配置或[自定义处理](/zh/guide/state-management.md#自定义序列化处理器) 。

更多状态管理相关和自定义设置参考 [状态管理引导](/zh/guide/state-management.md) 。

