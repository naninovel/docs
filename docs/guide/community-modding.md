# Community Modding

Community modding feature allows users to modify the build, adding their own scenarios and resources, while also having access to the game built-in resources.

To activate the feature, enable `Enable Community Modding` property in the script's configuration UI accessible with `Naninovel -> Configuration -> Scripts` context menu. 

![Scripts Configuration](/guide/scripts-config.png)

When the feature is enabled, an "EXTERNAL SCRIPTS" button will appear in the tile menu; it will open external scripts browser. While in editor the browser will also list novel scripts from the project assets.

To add external resources to the build, just drop them to folders under game's `Resources` directory corresponding to the resource type, just like you would with the project assets. For example, to add an external novel script, drop it to `GameFolder/GameName_Data/Resources/Scripts` folder; backgrounds will go to `GameFolder/GameName_Data/Resources/Backgrounds` and so on. *GameFolder* and *GameName* will depend on the name of your Unity project.

External scripts browser UI can be customized or completely replaced using [UI Customization](/guide/ui-customization.md) feature.
