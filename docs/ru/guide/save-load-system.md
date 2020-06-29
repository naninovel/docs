# Save-Load System

Game can be saved and loaded at any time by using save and load menus. User can select a save slot to use and delete any previously used slot.

[!a7109097f6abbeea16d6fe773bfffb3f]

Save slots are serialized to either `.json` or binary files (depending on the configuration). File names, slot limit and directory name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/ru/guide/configuration.md#state).

![State Configuration](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

In WebGL save slots are serialized using cross-browser [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Menu UIs can be customized or completely replaced using [UI Customization](/ru/guide/user-interface.md#ui-customization) feature.

Naninovel provides two serialization handlers out of the box: `System.IO` and `UnityEngine.PlayerPrefs`. Former will store the slots as separate files at [persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) and the second one will use Unity's [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) API to store the slots in the key-value database. You can select the handler in the state configuration menu. IO handlers are selected by default; consider switching to PlayerPrefs or adding a [custom handler](/ru/guide/state-management.md#custom-serialization-handlers) in case you have issues reading/writing save data on specific platforms.

For more information on how the state is managed and ways to customize it, see [state management guide](/ru/guide/state-management.md).
