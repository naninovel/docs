# 存档与读档系统

可以随时通过存档和读档菜单保存或加载游戏。用户可以选择要使用的存档槽，并删除任何已使用的槽位。

![](https://i.gyazo.com/a7109097f6abbeea16d6fe773bfffb3f.mp4)

菜单 UI 可以使用 [UI 自定义](/guide/user-interface#ui-customization) 功能进行定制或完全替换。

存档槽会被序列化为 `.json` 或二进制文件（取决于配置）。文件名、槽位上限和目录名称可以通过 `Naninovel -> Configuration -> State` 上下文菜单进行配置；可用选项请参阅 [配置指南](/guide/configuration#state)。

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

有关状态管理与序列化的更多信息，以及如何自定义或注入自定义状态，请参阅 [状态管理指南](/guide/state-management)。
