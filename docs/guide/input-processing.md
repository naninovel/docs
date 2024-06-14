# Input Processing

Engine processes user input using pre-configured listeners. Each input listener has the following properties:

| Property       | Description                                                                               |
|----------------|-------------------------------------------------------------------------------------------|
| Name           | Identifier of the input listener. Used to reference the listener by other engine systems. |
| Always Process | Whether to process the input while in input blocking mode. E.g. when playing a movie.     |
| Keys           | List of keys (buttons) which activate the input.                                          |
| Axes           | List of axes (eg, a mouse or a gamepad analog stick) which activate the input.            |
| Swipes         | List of swipes (touch screen) which activate the input.                                   |

For specific values see Unity's input guide: [docs.unity3d.com/Manual/ConventionalGameInput](https://docs.unity3d.com/Manual/ConventionalGameInput.html).

You can configure the built-in input bindings and add new listeners using `Naninovel -> Configuration -> Input` context menu; for available options see [configuration guide](/guide/configuration#input).

::: tip EXAMPLE
An example of adding custom input binding to toggle inventory UI can be found in the [inventory project on GitHub](https://github.com/naninovel/samples/tree/main/unity/inventory).

Specifically, the custom "ToggleInventory" binding is used in [UI/InventoryUI.cs](https://github.com/naninovel/samples/blob/main/unity/inventory/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L215) runtime script. A binding with the same name is added via input configuration menu, under Control Scheme.
:::

It's possible to halt and resume input processing with [@processInput] command.

## Default Listeners

Below is the list of pre-configured input listeners with default key bindings for keyboard and gamepad, as well as associated descriptions.

| Name          | Keyboard+Mouse           | Gamepad                        | Description                                                                                                                             |
|---------------|--------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Submit        | Enter                    | Button South                   | Generic confirm intent, such as accepting a prompt or submitting an input form.                                                         |
| Cancel        | Escape                   | Button East                    | Generic decline intent, such as declining a prompt or exiting a menu.                                                                   |
| Delete        | Delete                   | Button North                   | Generic delete intent, such as deleting selected save slot.                                                                             |
| NavigateX     | Left <-> Right           | D-Pad (X), Left Stick (X)      | Generic navigation intent over horizontal axis, such as selecting save slots in a row.                                                  |
| NavigateY     | Up <-> Down              | D-Pad (Y), Left Stick (Y)      | Generic navigation intent over vertical axis, such as selecting save slots in a column.                                                 |
| ScrollY       | Scroll Wheel (Y)         | Right Stick (Y)                | Generic scroll intent over vertical axis, such as scrolling backlog.                                                                    |
| Page          |                          | Left Trigger <-> Right Trigger | Generic paginate intent, such as changing pages in save-load menu.                                                                      |
| Tab           |                          | Left Bumper <-> Right Bumper   | Generic change tab intent, such as changing tabs in settings menu.                                                                      |
| Continue      | Enter, Scroll Wheel (Y+) | Button South                   | Disable wait for input mode (activated when a message is printed) to continue script playback.                                          |
| Pause         | Backspace                | Start                          | Show Pause UI.                                                                                                                          |
| Skip          | Ctrl                     | Button West                    | Engage [skip mode](/guide/text-printers#text-skipping) (fast-forward) while the action is activated (button held).                      |
| ToggleSkip    | Tab                      | Right Stick Press              | Toggle (permanently enable if disabled and vice-versa) skip mode.                                                                       |
| SkipMovie     | Escape                   | Button East                    | Skip (cancel) currently playing [movie](/guide/movies).                                                                                 |
| AutoPlay      | A                        | Button East                    | Toggle [auto-play mode](/guide/text-printers#auto-advance-text), where wait for input mode is disabled automatically after a set delay. |
| ToggleUI      | Space                    | Button North                   | Toggle [visibility](/guide/user-interface#ui-toggling) (hide/show) of the entire UI layer.                                              |
| ShowBacklog   | L                        | Right Bumper                   | Toggle [Backlog UI](/guide/text-printers#printer-backlog) visibility.                                                                   |
| Rollback      | B, Scroll Wheel (Y-)     | Left Bumper                    | Rewind script backwards.                                                                                                                |
| CameraLookX   | Mouse X                  | Right Stick (X)                | Move camera over horizontal axis while in [@look] mode.                                                                                 |
| CameraLookY   | Mouse Y                  | Right Stick (Y)                | Move camera over vertical axis while in [@look] mode.                                                                                   |
| ToggleConsole | `                        |                                | Toggle [development console](/guide/development-console).                                                                               |

## Input System

Naninovel supports Unity's new [Input System](https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/); see the [official docs](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.5/manual/Installation.html) on how to install and enable the input system package.

After the package is installed, create an event system prefab; use `UI -> Event System` in the hierarchy window to create a default one. Make sure `Input System UI Input Module` is attached to the prefab. When creating a default event system, Unity will suggest to automatically convert legacy input module component to the new one.

![](https://i.gyazo.com/965b87f8585cb31ae2452f19882bdab7.png)

Assign the created event system prefab to `Custom Event System` property in the Naninovel UI configuration menu, then disable `Spawn Input Module` in the same menu.

![](https://i.gyazo.com/b06177545022b8816e342b984afecaea.png)

When the input system package is installed, an `Input Actions` property will appear in the input configuration menu. Assign [input actions asset](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/ActionAssets.html?q=input%20actions%20asset) to the property, then create "Naninovel" action map and add input actions with names equal to the Naninovel's binding names. The list of the built-in binding names can be found in the "Bindings" list under "Control Scheme" in the same configuration window. Below is an example input actions configuration.

![](https://i.gyazo.com/07fb5702badd3e698c3533f28585a15b.png)

::: tip
Default event system and input action assets are stored at `Naninovel/Prefabs/Input` folder. Feel free to use them as a reference when creating your own.
:::

When properly configured, input actions will activate Naninovel's bindings. In case you wish to disable legacy input processing (which is set under the "Bindings" list), disable `Process Legacy Bindings` property under input configuration menu.

::: warning
When `Process Legacy Bindings` is left enabled, some bindings may trigger twice (one from new input and another from legacy). Either make sure each binding is only processed under its respective system or disable the option completely.
:::

For more information on using the input system, consult the [official manual](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest).

::: tip EXAMPLE
Find an example project on using the new input system and implementing a rebind UI to allow player change default controls on [GitHub](https://github.com/naninovel/samples/tree/main/unity/input-rebind).
:::

## Adapt to Input Mode

When Unity's new input system is installed and enabled, all the built-in UIs will adapt to the current input mode (mouse and keyboard, gamepad or touch) based on last active input device. For example, if player is using mouse to interact with the game, but at some point presses a button on gamepad, the UIs will switch to gamepad input mode.

![](https://i.gyazo.com/a2f38246d7eee8d75d7f3f6660a092ed.mp4)

Default input mode activated after engine initialization is evaluated by input manager based on the target platform:
- Consoles -> Gamepad
- Mobiles -> Touch
- Others -> Mouse and Keyboard

### Mouse and Keyboard

In this mode the UI will disable navigation on all the underlying [Selectable](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Selectable.html) objects. This is to prevent buttons from transitioning into "selected" state when clicked by mouse.

Additionally, in case `Button Controls` object is assigned in `Custom UI` (or derived) component, it will be enabled, while `Controls Legend` disabled. This allows keeping buttons specific to mouse input mode (eg, "close" button) and controls legend (eg, gamepad button labels) visible only when associated input mode is active.

### Gamepad

Gamepad mode will keep navigation (change it back when switched from mouse mode), so that player is able to navigate selectables with dpad.

When assigned, `Button Controls` will be disabled and `Controls Legend` — enabled.

::: tip
If you'd like to customize gamepad legend icons, check out [Xelu's free controller prompts](https://thoseawesomeguys.com/prompts/).
:::

Additionally, while in gamepad mode and a modal UI is shown, first active selectable inside will be focused to prevent focus from getting stuck with previously selected object. This behaviour can be changed by explicitly assigning `Focus Object` of custom UI or derived component, in which case the UI won't attempt to find focus object automatically.

### Touch

When in touch mode, Naninovel won't perform any special changes on the managed UIs by default. However, you can add touch-specific behaviour by overriding `HandleInputModeChanged` method of `CustomUI` component.

To disable the adapt to input mode feature for a specific UI, uncheck `Adapt To Input Mode` option of `Custom UI` (or derived) component. To disable the feature globally, use `Detect Input Mode` option in input configuration.
