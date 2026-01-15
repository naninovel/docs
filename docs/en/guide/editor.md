# Story Editor

Naninovel has its own standalone app that you can use to author scenario scripts with a visual editor and manage the story structure via a node graph while working on your game inside the Unity Editor. You can also use it to create a scenario draft and preview it in a web browser using procedurally generated assets, without even opening Unity.

![](https://i.gyazo.com/fa644485a2eeffd9ab67605176fa873e.png)

## Sandbox Mode

Sandbox mode is completely independent of the Unity editor. It provides tools to author the scenario and preview (play) the game right in the browser, using the latest engine specs, available commands, and runtime features. Under the hood, it produces standard `.nani` text files, which you can seamlessly reuse in Unity or edit directly with [VS Code](/guide/ide-extension).

Main use cases for sandbox mode:

- Try Naninovel's scripting system and runtime features before purchasing;
- Draft the scenario using generated assets before starting development in Unity.

Navigate to [naninovel.com/editor](https://naninovel.com/editor) and start using the app right inside your web browser. Optionally, accept the browser prompt to install the app as a [PWA](https://en.wikipedia.org/wiki/Progressive_web_app), so that it has its own dedicated icon on the taskbar and runs in a native OS window, like a regular desktop app.

![?width=500](https://i.gyazo.com/71a9d721eb851db02feca366c0810bdb.png)

### Placeholder Assets

When drafting the story, it may be useful to use temporary versions of the media assets, such as audio clips, backgrounds, and character textures. At the same time, it's helpful to keep track of which asset is currently active while previewing the scenario.

Sandbox mode allows creating placeholder assets, where you describe the asset traits, and the editor generates distinguishable previews to be displayed when the asset is used.

![](https://i.gyazo.com/fd6765bfc35024769871e4d9b1372b62.png)

To create a placeholder asset, right-click under either the `Backgrounds`, `Characters`, or `Audio` directories in the [file browser](/guide/editor#file-browser) and select the option to add the associated asset.

You can then select the created asset to inspect and edit available traits.

![?width=604](https://i.gyazo.com/b876cb9f3305899a8fc880cac89b3702.png)

The created assets are automatically added to the dropdown lists in the [scenario editor](/guide/editor#scenario-editor).

![?width=453](https://i.gyazo.com/01cc5ad5e5edb81b9b26a81b454f411f.png)

The assets are instantly displayed in the game preview when selected.

## Embedded Mode

Story Editor is fully integrated with the Unity Editor and can be started by either inspecting a scenario script asset or via the `Naninovel -> Story Editor` Unity Editor menu.

![?width=588](https://i.gyazo.com/48ad8d4c512b67df02d7ace15d5eaca5.png)

Internet connection is required to download the editor application binaries when you launch the Story Editor for the first time; the binaries are cached, so network won't be required for the consequent runs in the same project.

## Workspace

The editor workspace has a flexible and customizable layout. You can resize or reposition any tab by drag-dropping dividers between tabs, tab sets, or the tabs themselves. You can also maximize any tab by clicking the button at the end of the associated tab set.

![?width=469](https://i.gyazo.com/4317e0bd0d87b270feb756c55ebace62.mp4)

There are default layout templates to choose from, and you can add custom layouts via the dropdown on the control panel.

![?width=310](https://i.gyazo.com/8cab94936284761b432dc0f271cb1d12.png)

## File Browser

The file browser tab allows you to interact with the files and directories under the current project root. You can create new scenario scripts or placeholder assets (in [sandbox mode](/guide/editor#sandbox-mode)), manage, and organize files.

![?width=280](https://i.gyazo.com/ada798d90c52c3f24d88001258e794a1.png)

When you rename or move scenario script files via the file browser, the editor will automatically update navigation commands (such as [@goto] and [@gosub]) to keep the paths relevant.

## Inspector

The interaction model of the Naninovel editor is similar to the Unity editor: you select an asset, such as a file in the file browser or a node in the story graph, and the associated editors are displayed in the inspector tab. This allows for a clean separation between structural and direct editing contexts, resulting in a more productive UX.

![?width=606](https://i.gyazo.com/1bf3dae6c1bb254c05580e61300d064b.png)

The inspector employs a focus trap — you can use Tab and Shift+Tab to switch between the input fields and controls efficiently, without using the mouse.

## Scenario Editor

The scenario editor is the app's main authoring tool. It's an alternative to writing `.nani` files in text or code editors such as VS Code.

![](https://i.gyazo.com/1e38f673835584033e4a5142f9989981.png)

Each scenario editor tab represents a `.nani` script, with text lines visualized as rows. You can add lines using the `+` button at the bottom of the tab, via the context menu (right-click existing content), or with the `Enter` hotkey (configurable in [settings](/guide/editor#keymap)).

You can reorder lines by drag-dropping, delete or duplicate lines via the context menu or with the `Backspace` and `Ctrl+D` keys.

The changes are applied immediately and reflected in the game view in case the edited script is currently playing. To persist the changes, you need to [save](/guide/editor#dirty-save) the modified file.

While the game is running, the currently played line is highlighted with a green or yellow outline depending on whether it's waiting for input. To automatically open the currently played script and select the active line, click the dedicated button on the control panel or press `Ctrl+X`.

![?width=293](https://i.gyazo.com/4e2503fde65d327b2388ec5289814aae.png)

## Story Graph

The story graph helps visualize, track, and organize the scenario structure, and also allows editing the scripts themselves.

By default, each node represents either a scenario script or a directory. Edges represent navigation between scripts. Conditional navigations (e.g., [@goto] under [@choice] or [@if]) appear as dashed edges, with conditions listed on the associated ports.

![](https://i.gyazo.com/046b9f276e63914d4cdd8663f649d1e0.png)

You can create scripts and directories by right-clicking the graph pane, and move or rename them via the node context menu. To navigate directory nodes, double-click or choose "Enter Folder" from the context menu.

You can also enter script nodes, in which case the graph works as a visual scenario editor. Instead of script and directory nodes, you'll see label nodes, which host scenario lines that can be edited just as in the [scenario editor](/guide/editor#scenario-editor).

![](https://i.gyazo.com/890d2edc13a971407620a3bd38d50573.png)

## Dirty-Save

When you modify an asset, such as a scenario script or the graph, it becomes "dirty" — meaning the changes are in memory but not yet saved to disk. To persist the changes, you need to save the asset.

![?width=323](https://i.gyazo.com/f8f63d99a51616da0fcf454def5fe667.png)

When at least one asset is dirty, the save button becomes active. Click it to see which assets are modified, and save them all or individually. You can also save all dirty assets by pressing `Ctrl+S`.

## Undo-Redo

Most modifications in the editor are tracked and can be reverted using the undo-redo system. When a change is made, the undo button becomes active — click it to view a list of changes and undo/redo them individually.

![?width=357](https://i.gyazo.com/7a2f120c4ce517eef9a804627d89c185.png)

You can also undo and redo with `Ctrl+Z` and `Ctrl+Y`, respectively.

## Global Search

As your project grows, it may be useful to search across all scenario scripts. Double-press the `Shift` key or click the "Search" button on the control panel to open the global search.

![?width=452](https://i.gyazo.com/bda71c03e4911f12a3dbbc8ce8214380.mp4)

Results update as you type and include both scenario script names and content. Selecting a result opens it and highlights the associated line in the [scenario editor](/guide/editor#scenario-editor).

## Settings

You can customize both the editor and project via the settings tab, which has two main categories: user and project. Open the tab via the menu on the control panel or by pressing `Ctrl+Alt+S`.

![?width=470](https://i.gyazo.com/5bc5768a9b8f80fa42be00200bc06159.png)

### User Settings

User settings are stored in the directory you picked during the first-time setup in sandbox mode or under the Unity's persistent directory in the embedded mode. They're not shared with the project and apply to all projects on the device. This includes preferences like the editor color scheme, keymap, and UI element visibility.

### Project Settings

Project settings are user-agnostic, stored under the project directory, and shared with all users working on the project. These include project-specific properties like the project title.

### Keymap

The keymap is part of the user settings and lets you configure key bindings for various editor features, such as appending lines, duplicating nodes, entering play mode, etc.

To bind a key, find the desired action and enter the key code. Modifiers can be prepended using `+`. Refer to the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) for valid key codes and modifiers.

On macOS, modifiers map as follows:

| Code    | macOS |
|---------|-------|
| `Ctrl`  | `⌘`   |
| `Alt`   | `⌥`   |
| `Shift` | `⇧`   |
