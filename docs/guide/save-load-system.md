# Save-Load System

Game can be saved and loaded at any time by using save and load menus. User can select a save slot to use and delete any previously used slot.

<video class="video" loop autoplay><source src="https://i.gyazo.com/d9b6dd99921b3e52b2b0e062ba455c90.mp4"></video>

Save objects are serialized to `.json` files and stored over game directory. File names, slot limit and directory name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/guide/configuration.md#state).

![State Configuration](/guide/state-config.png)

In WebGL save slots are serialized using cross-browser [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Menu UIs can be customized or completely replaced using [UI Customization](/guide/ui-customization.md) feature.
