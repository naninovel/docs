# Adventure Creator

[Adventure Creator](https://www.adventurecreator.org/) lets you make traditional 2D, 2.5D and 3D adventure games - those that emphasize storytelling, exploration and puzzles - such as Monkey Island, Grim Fandango, The Longest Journey, and Telltale's The Walking Dead.

![](https://i.gyazo.com/74a12fa535198cb26a87a5037b15a988.jpg)

You can use Naninovel to handle dialogue scenes in AC or load AC from a Naninovel-based game for some custom gameplay.

::: info NOTE
Extensions for third-party products serve mostly as examples on how you can integrate Naninovel with other tools. They contain bare minimum functionality and may become incompatible due to changes in third-party product. Please do not consider these extensions part of Naninovel: we are not providing any support or help on using them with Naninovel beyond the scope of sample projects.
:::

## Setup

Install both Adventure Creator and Naninovel (the order doesn't matter).

Download and import [Adventure Creator extension package](https://github.com/naninovel/samples/blob/main/unity/ac/NaninovelAdventureCreator.unitypackage).

Set `NaninovelAdventureCreator/Runtime/Actions` as the source for custom actions in AC settings. Consult [AC guide](https://www.adventurecreator.org/tutorials/writing-custom-action) for more info on custom actions.

![](https://i.gyazo.com/59a162751411ec60a7cf5ad89e9a66ec.png)

You should now see "Play Naninovel Script" action available under "Custom" category.

![](https://i.gyazo.com/faf33afa1df8ff98ea04ef9cf1a44f8f.png)

Depending on the setup, you may need to assign a special layer for Naninovel objects to prevent them from being rendered by AC cameras and vice-versa. This can be done via Naninovel's Engine configuration window.

![](https://i.gyazo.com/ed765928c0420ec2b1e26d6bf4a66e6c.png)

When using Naninovel as a drop-in system from AC-based game, you may also want to disable `Initialize On Application Load` and `Show Title UI` options in the Engine configuration.

## Usage

Use `Play Naninovel Script` custom AC action to (optionally) turn-off AC, initialize Naninovel engine (when required) and load specified Naninovel script. By default, the AC and Naninovel cameras will also swap automatically, but you can prevent that by disabling `Swap Cameras` property.

Use `@turnOnAC` custom Naninovel command in a Naninovel script to enable AC, reset Naninovel engine state (optionally) and swap the cameras back (also optionally). State reset is controlled with `reset` and camera swap with `swapCameras` parameters.

It's also possible to play a specific AC's action list after turning on AC (exiting Naninovel mode) via `@turnOnAC` command with `action` parameter. Eg, given we have the following dialogue options (or any other type of action list) game objects on the scene:

![](https://i.gyazo.com/f743d9f61c995755271b602d09d8c6eb.png)

We can play them after exiting Naninovel mode like the following:

```nani
; Will play "OnNaninovelExit1" action list after exiting Naninovel mode.
@turnOnAC action:OnNaninovelExit1

; Will play "OnNaninovelExit2" action list after exiting Naninovel mode.
@turnOnAC action:OnNaninovelExit2
```

The following video demonstrates AC's demo scene integrated with Naninovel to handle a dialogue.

![](https://www.youtube.com/watch?v=7tOIFZRSAec)

::: tip EXAMPLE
See the [GitHub project](https://github.com/naninovel/samples/tree/main/unity/ac) for an integration example. When opening the project for the first time you'll get errors due to missing Adventure Creator and Naninovel packages; import them and the errors will go away.
:::
