# Input Processing
 
Engine processes user input using pre-configured listeners. Each input listener has the following properties:

Property | Description
--- | ---
Name | Identifier of the input listener. Used to reference the listener by other engine systems.
Always Process | Whether to process the input while in input blocking mode. E.g. when playing a movie.
Keys | List of keys (buttons) which activate the input.
Axes | List of axes (eg, a mouse or a gamepad analog stick) which activate the input.
Swipes | List of swipes (touch screen) which activate the input.

For specific values see Unity's input guide: [docs.unity3d.com/Manual/ConventionalGameInput](https://docs.unity3d.com/Manual/ConventionalGameInput.html).

You can configure the built-in input bindings and add new listeners using `Naninovel -> Configuration -> Input` context menu; for available options see [configuration guide](/guide/configuration.md#input).

![Manage Input](https://i.gyazo.com/2f97539323c9fc36124e286856a36f84.png)

::: example
Example of adding a custom input binding to toggle inventory UI can be found in the [inventory example project on GitHub](https://github.com/Elringus/NaninovelInventory).

Specifically, the custom "ToggleInventory" binding is used in [UI/InventoryUI.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L215) runtime script. A binding with the same name is added via input configuration menu, under Control Scheme.
:::

## Gamepad and Keyboard

All the built-in features are usable with gamepad or keyboard input. You can remove, change or add gamepad/keyboard-specific hotkey bindings via the aforementioned bindings editor menu.

The built-in UIs can also be navigated with a gamepad or keyboard, without using mouse or touch input. When in any of modal menus (outside of main gameplay mode, eg title menu, backlog, etc), press a navigation key (directional pad or left stick on gamepad, arrow keys on keyboard) to select a button in the menu. The first focused button (game object) can be changed in each UI using `Focus Object` field.

![](https://i.gyazo.com/809d4c423d1696a075d5fb73370d48fa.png)

With `Focus Mode` property you can change whether the assigned game object should be focused immediately after the UI becomes visible or after a navigation key is pressed.

::: warn
Gamepad navigation over UIs will only work when Unity's new input system is installed in the project; find more information about the input system below.
:::

When in the main gameplay mode (outside of modal UIs), press a button binded to `Pause` input (`Backspace` key for keyboard and `Start` button for gamepad by default) to open pause menu, where you can save/load game, open settings, exit to title, etc.

## Input System

Naninovel supports Unity's new [Input System](https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/); see the [official docs](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Installation.html) on how to install and enable the input system. When the input system package is installed (don't forget to enable new input backend in the player settings), an `Input Actions` property will appear in the input configuration menu.

![](https://i.gyazo.com/7c6d767c0f3443e1999fe14917080eb1.png)

Assign [input actions asset](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/ActionAssets.html?q=input%20actions%20asset) to the property, then create "Naninovel" action map and add input actions with names equal to the Naninovel's binding names. The list of the built-in binding names can be found in the "Bindings" list under "Control Scheme" in the same configuration window. Below is an example input actions configuration.

![](https://i.gyazo.com/36d1951519e4f671509c7136a83d9958.png)

When properly configured, input actions will activate Naninovel's bindings. In case you wish to disable legacy input processing (which is set under the "Bindings" list), disable `Process Legacy Bindings` property under input configuration menu.

::: warn
Touch and object-related input is still processed via legacy input, so don't completely disable legacy backend in the player settings, unless you're going to implement the features yourself.
:::

Default input actions asset is stored at `Naninovel/Prefabs/DefaultControls.inputactions`.

For more information on using new input system (eg, how to configure particular bindings or allow players to override the bindings at runtime), consult the [official manual](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual).