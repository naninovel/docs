# Community Modding

Community modding feature allows players to modify the build, adding their own scenarios and resources, while also having access to the game built-in resources.

To activate the feature, enable `Enable Community Modding` property in the script's configuration UI accessible with `Naninovel -> Configuration -> Scripts` context menu and [setup local provider](/guide/resource-providers#local) for the resources, that should be exposed for modding; make sure local provider's root path is set to default value (`%DATA%/Resources`), so it will look for the additional resources under the build directory.

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

When the feature is enabled, an "EXTERNAL SCRIPTS" button will appear in the title menu; it will open external scripts browser. While in editor the browser will also list scenario scripts from the project assets.

Notice, that `External Loader` configuration controls which scripts to show under the external scripts browser, while `Loader` configures loading of the actual script resources. External loader has Local provider set by default, so it will only look for the scripts under the game build directory; for other resource types (backgrounds, characters, etc) you have to manually setup local providers in the corresponding configuration menus to allow players adding them. Find more about how the resource providers work and how to set up them in the [resource providers guide](/guide/resource-providers).

To add external resources to the build, drop them to sub-folders under game's `Resources` directory corresponding to the resource's `Path Prefix` property configured under `Loader` foldout. For example, to add an external scenario script, drop it to `GameFolder/GameName_Data/Resources/Scripts` folder; backgrounds will go to `GameFolder/GameName_Data/Resources/Backgrounds` and so on. *GameFolder* and *GameName* will depend on the name of your Unity project.

External scripts browser UI can be customized or completely replaced using [UI Customization](/guide/gui#ui-customization) feature.
