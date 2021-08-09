# Save-Load System

Game can be saved and loaded at any time by using save and load menus. User can select a save slot to use and delete any previously used slot.

[!a7109097f6abbeea16d6fe773bfffb3f]

Menu UIs can be customized or completely replaced using [UI Customization](/guide/user-interface.md#ui-customization) feature.

Save slots are serialized to either `.json` or binary files (depending on the configuration). File names, slot limit and directory name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/guide/configuration.md#state).

![](https://i.gyazo.com/d1e5cfd136544f2c1b74966e3fd1bb45.png)

For more information on how the state is managed and serialized, as well as the ways to customize it and inject custom state, see [state management guide](/guide/state-management.md).
