# Input Processing

Naninovel uses Unity's [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) to listen for the following actions.

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

You can configure the default actions and add new ones by assigning a custom `Input Actions` asset in the `Naninovel -> Configuration -> Input` context menu. Keep the associated actions under a `Naninovel` map to allow the engine to detect them. Default input action asset is stored at `Resources/Naninovel/Input` folder under the package directory. Feel free to use it as a reference when creating your own.

::: tip EXAMPLE
An example of adding custom input binding to toggle inventory UI can be found in the [inventory sample](/guide/samples#inventory). Specifically, the custom "ToggleInventory" action is used in `Scripts/Runtime/Inventory/UI/InventoryUI.cs` runtime script. Another example — [input rebind sample](/guide/samples#input-rebind) — implements a rebind UI to allow player to change default controls.
:::

## Adapt to Input Mode

By default, all the built-in UIs will adapt to the current input mode (mouse and keyboard, gamepad or touch) based on last active input device. For example, if player is using mouse to interact with the game, but at some point presses a button on gamepad, the UIs will switch to gamepad input mode.

![](https://i.gyazo.com/a2f38246d7eee8d75d7f3f6660a092ed.mp4)

You can disable the feature by unchecking the `Detect Input Mode` option in the input configuration menu.

Default input mode activated after engine initialization is evaluated by input manager based on the target platform:

- Consoles -> Gamepad
- Mobiles -> Touch
- Others -> Mouse

### Mouse

In this mode the UI will disable navigation on all the underlying [Selectable](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Selectable.html) objects. This is to prevent buttons from transitioning into "selected" state when clicked by mouse.

Additionally, in case `Button Controls` object is assigned in `Custom UI` (or derived) component, it will be enabled, while `Keyboard Controls` and `Gamepad Conrols` disabled. This allows keeping buttons specific to mouse input mode (eg, "close" button) and controls legend (eg, gamepad button labels) visible only when associated input mode is active.

### Gamepad

Gamepad mode will keep navigation (change it back when switched from mouse mode), so that player is able to navigate selectables with dpad.

When assigned, `Gamepad Controls` legend will be enabled, while others (buttons and keyboard) — disabled.

::: tip
If you'd like to customize gamepad legend icons, check out [Xelu's free controller prompts](https://thoseawesomeguys.com/prompts/).
:::

Additionally, while in gamepad mode and a modal UI is shown, first active selectable inside will be focused to prevent focus from getting stuck with previously selected object. This behaviour can be changed by explicitly assigning `Focus Object` of custom UI or derived component, in which case the UI won't attempt to find focus object automatically.

### Keyboard

Activated when keyboard navigation (arrow) keys are pressed. Other keys won't activate this mode, because they are used in Mouse mode as hotkeys.

Otherwise, it works same as Gamepad mode, just with the different controls legend shown.

### Touch

When in touch mode, Naninovel won't perform any special changes on the managed UIs by default. However, you can add touch-specific behaviour by overriding `HandleInputModeChanged` method of `CustomUI` component.

To disable the adapt to input mode feature for a specific UI, uncheck `Adapt To Input Mode` option of `Custom UI` (or derived) component. To disable the feature globally, use `Detect Input Mode` option in input configuration.

## Custom Input

Naninovel allows using custom input solutions, such as [Rewired](https://guavaman.com/projects/rewired/), instead of Unity's built-in input system. The engine uses the default input system APIs only in the `InputManager` and `InputSampler` classes, and all references are conditionally compiled, ensuring that no compilation errors occur even if you remove the default input module.

To make the engine use a custom input solution, [override](/guide/engine-services#overriding-built-in-services) the `IInputManager` engine service. In most cases, it's sufficient to override the virtual `InputManager.InitializeInputSystem` method and populate the `Samplers` collection with your custom `IInputSampler` implementations.
