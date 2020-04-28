# Save-Load System

Game can be saved and loaded at any time by using save and load menus. User can select a save slot to use and delete any previously used slot.

[!a7109097f6abbeea16d6fe773bfffb3f]

Save slots are serialized to either `.json` or binary files (depending on the configuration) and stored over game directory. File names, slot limit and directory name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/guide/configuration.md#state).

![State Configuration](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

In WebGL save slots are serialized using cross-browser [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Menu UIs can be customized or completely replaced using [UI Customization](/guide/user-interface.md#ui-customization) feature.

For more information on how the state is managed and ways to customize it, see [state management guide](/guide/state-management.md).
