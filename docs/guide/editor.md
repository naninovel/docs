# Editor

Naninovel has its own standalone web app, which you can use to author scenario scripts with a visual editor and manage the story structure via a node graph — or just work on a scenario draft for the game and preview it using procedurally generated assets — all without even opening the Unity editor, right inside your web browser.

![](https://i.gyazo.com/fa644485a2eeffd9ab67605176fa873e.png)

## Video Guide

Below is a video introducing the editor and explaining how to install and use it in both sandbox and Unity-attached modes. It covers most of the topics in this article, so feel free to watch it instead.

[yt video]

## Installation

Navigate to [naninovel.com/editor](https://naninovel.com/editor) and start using the app right inside your web browser.

Optionally, you can accept the browser prompt to install the app as a standalone [PWA](https://en.wikipedia.org/wiki/Progressive_web_app), so that it has its own dedicated icon on the taskbar and runs in a native OS window, just like a regular desktop app.

![?width=500](https://i.gyazo.com/71a9d721eb851db02feca366c0810bdb.png)

When installed as a PWA, you can collapse the window title bar to increase the application's vertical real estate.

![](https://i.gyazo.com/44d5e200adbdebbf3cafd768f8055de3.png)

## First-Time Setup

Upon first launch, the app will ask you to pick a directory to store user data, such as custom layouts and settings. This is required to persist your preferences even if the browser is uninstalled or switched; it's also useful for backing up or migrating user data between devices. You can pick any directory, for example `<USER>/.nani`, where `<USER>` is the [home directory](https://en.wikipedia.org/wiki/Home_directory).

### File System Access

When picking a directory, the browser will ask for permission to allow the app to read and write files in that directory. This is a part of the browser's security model: it ensures the app can't access anything outside the allowed directories.

::: info NOTE
Browser security won't allow you to pick the root of any system directory, such as the desktop or home directories themselves. Instead, create a subdirectory under such locations. For example, you can create a `.nani` directory under the system's home directory.
:::

On subsequent access, the browser will prompt you to allow permanent access to the selected directories. Confirm this so you won't have to grant access each time you open the app, and to allow the editor to auto-open the last project on startup.

![?width=336](https://i.gyazo.com/7f8102700e44ec4505977e6e3d84c91f.png)

## Editor Modes

Once setup is complete, you can either pick an empty directory to create a new project for [sandbox mode](/guide/editor#sandbox-mode), or choose an existing Unity project to work in [Unity-attached mode](/guide/editor#unity-attached-mode).

### Sandbox Mode

Sandbox mode is completely independent of the Unity editor. It provides tools to author the scenario and preview (play) the game right in the browser, using the latest engine specs, available commands, and runtime features. Under the hood, it produces standard `.nani` text files, which you can seamlessly reuse in Unity or edit directly with the [IDE extension](/guide/ide-extension).

Main use cases for sandbox mode:

- Try Naninovel's scripting system and runtime features before purchasing;
- Draft the scenario using generated assets before starting development in Unity.

To work in sandbox mode, choose "Create Project" on the project setup screen.

When the project is created, the editor will scaffold a template with several premade scenario scripts and assets to help you get started. You're free to delete them all via the [file browser](/guide/editor#file-browser) and start from scratch if you prefer.

#### Game Window

Game preview inside the web editor is available only in sandbox mode via the "Game" tab.

![](https://i.gyazo.com/c164c428fc42b2d394b0a68c8de84f01.png)

You can control the preview via the playback buttons in the control panel. Each button serves as both a control and an indicator of the associated preview status:

- **Play/Stop** – Whether the player instance is initialized and running. Can be used to reset the game instance to quickly restart the game;
- **Pause/Resume** – Whether the script player is waiting for input before proceeding. Use this to halt or resume playback without activating continue input in the game view;
- **Fast-Forward** – Whether skip (fast-forward) mode is enabled. Use this to quickly run through the game.

#### Generated Assets

When drafting the story, it may be useful to "stub" media assets, such as audio clips, backgrounds, and character textures. At the same time, it's helpful to keep track of which asset is currently active while previewing the scenario.

Sandbox mode allows creating asset meta, where you describe the asset traits, and the editor generates distinguishable previews to be displayed when the asset is used.

![](https://i.gyazo.com/fd6765bfc35024769871e4d9b1372b62.png)

To create an asset meta, right-click under either the `Backgrounds`, `Characters`, or `Audio` directories in the [file browser](/guide/editor#file-browser) and select the option to add the associated asset.

You can then select the created asset to inspect and edit available traits.

![?width=604](https://i.gyazo.com/b876cb9f3305899a8fc880cac89b3702.png)

The created assets are automatically added to the dropdown lists in the [scenario editor](/guide/editor#scenario-editor).

![?width=453](https://i.gyazo.com/01cc5ad5e5edb81b9b26a81b454f411f.png)

The assets are instantly displayed in the game preview when selected.

### Unity-attached Mode

The Naninovel editor can attach to a Unity project with the Naninovel package installed, providing extra tools, such as the visual scenario editor and story graph.

![](https://i.gyazo.com/d54f0b35b4d89bdbece096c7b78c8c72.mp4)

Choose "Open Project" on the setup screen, pick the `Assets` directory of an existing Unity project, and the editor will initialize in attached mode.

Note that while the playback buttons are active, the game preview tab is disabled in attached mode — that's because playback is controlled in Unity. You can hide the game tab when working in this mode.

Otherwise, the editor works similarly in attached mode: the scenario editor, story graph, global search, and other features are available. It will also pick up custom commands, resources, and metadata from the Unity editor, similar to the IDE extension. You can also use it alongside the IDE extension — for example, writing scripts in VS Code while fine-tuning them in the visual editor or tracking the structure in the story graph.

## Workspace

The editor workspace has a flexible and customizable layout. You can resize or reposition any tab by drag-dropping dividers between tabs, tab sets, or the tabs themselves. You can also maximize any tab by clicking the button at the end of the associated tab set.

![?width=469](https://i.gyazo.com/4317e0bd0d87b270feb756c55ebace62.mp4)

There are default layout templates to choose from, and you can add custom layouts via the dropdown on the control panel.

![?width=310](https://i.gyazo.com/8cab94936284761b432dc0f271cb1d12.png)

## File Browser

The file browser tab allows you to interact with the files and directories under the current project root. You can create new scenario scripts or asset meta (in [sandbox mode](/guide/editor#sandbox-mode)), manage, and organize files.

![?width=280](https://i.gyazo.com/ada798d90c52c3f24d88001258e794a1.png)

Note that while in [attached mode](/guide/editor#unity-attached-mode), even when the "Assets" directory is picked, the file browser will skip unrelated directories and only show the scenario root directory.

When you rename or move scenario script files via the file browser, the editor will automatically update navigation commands (such as [@goto] and [@gosub]) to keep the paths relevant.

## Inspector

The interaction model of the Naninovel editor is similar to the Unity editor: you select an asset, such as a file in the file browser or a node in the story graph, and the associated editors are displayed in the inspector tab. This allows for a clean separation between structural and direct editing contexts, resulting in a more productive UX.

![?width=606](https://i.gyazo.com/1bf3dae6c1bb254c05580e61300d064b.png)

The inspector employs a focus trap — you can use Tab and Shift+Tab to switch between the input fields and controls efficiently, without using the mouse.

## Scenario Editor

The scenario editor is the app's main authoring tool. It's an alternative to writing `.nani` files in text or code editors such as VS Code.

![](https://i.gyazo.com/1e38f673835584033e4a5142f9989981.png)

Each scenario editor tab represents a `.nani` script, with text lines visualized as rows. You can add lines using the `+` button at the bottom of the tab, via the context menu (right-click existing content), or with the `Ctrl+Space` hotkey (configurable in [settings](/guide/editor#keymap)).

You can reorder lines by drag-dropping, delete or duplicate lines via the context menu or with the `Delete` and `Ctrl+D` keys.

In [sandbox mode](/guide/editor#sandbox-mode), changes are applied immediately and reflected in the game view. In [attached mode](/guide/editor#unity-attached-mode), you need to [save](/guide/editor#dirty-save) the modified file for changes to reflect in Unity.

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

User settings are stored in the directory you picked during [first-time setup](/guide/editor#first-time-setup). They're not shared with the project and apply to all projects on the device. This includes preferences like the editor color scheme, keymap, and UI element visibility.

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
