# Community Modding

Community modding feature allows users to modify the build, adding their own scenarios and resources, while also having access to the game built-in resources.

To activate the feature, enable `Enable Community Modding` property in the script's configuration UI accessible with `Naninovel -> Configuration -> Scripts` context menu and [setup local provider](/guide/resource-providers.md#local) for the resources, that should be exposed for modding; make sure local provider's root path is set to default value (`%DATA%`), so it will look for the additional resources under the build directory.

![Scripts Configuration](https://i.gyazo.com/96630a3a1c592c43f73c47d1bc3bbea1.png)

When the feature is enabled, an "EXTERNAL SCRIPTS" button will appear in the tile menu; it will open external scripts browser. While in editor the browser will also list naninovel scripts from the project assets.

To add external resources to the build, drop them to subfolders under game's `Resources` directory corresponding to the resource's `Path Prefix` property configured under `Loader` foldout. For example, to add an external naninovel script, drop it to `GameFolder/GameName_Data/Resources/Naninovel/Scripts` folder; backgrounds will go to `GameFolder/GameName_Data/Resources/Naninovel/Backgrounds` and so on. *GameFolder* and *GameName* will depend on the name of your Unity project.

External scripts browser UI can be customized or completely replaced using [UI Customization](/guide/user-interface.md#ui-customization) feature.
