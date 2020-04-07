# User Interface

Naninovel comes with multiple built-in UIs: title (main) menu, game settings, save-load menu, backlog panel, CG gallery, tips and many others.

Each of the built-in UIs can be disabled or customized; see [UI customization](/guide/user-interface.md#ui-customization) guide for more information.

## Adaptive UI Layout

All the built-in UIs are implemented with adaptive layout. This allows the UI to remain usable on all the platforms, no matter the screen resolution.

<video class="video" loop autoplay><source src="https://i.gyazo.com/b6bddf8a0c6f2ba68dcdc1bc65db0c09.mp4" type="video/mp4"></video>

## UI Toggling

UI toggling feature allows user to hide/show the in-game UI as a whole.

<video class="video" loop autoplay><source src="https://i.gyazo.com/e267c4ab3654efbfaf611011502de79f.mp4" type="video/mp4"></video>

Activate `ToggleUI` input (`Space` key by default for standalone input module) or use `HIDE` button on the control panel to hide/show the UI.

When UI is hidden, `Continue` input or clicking (touching) the screen will also un-hide the UI.

## UI Customization

UI customization feature allows to add a custom UI and modify or completely replace any of the built-in UI elements, like title menu, settings menu, printer backlog, etc.

Be aware, that text printers and choice handlers are implemented via actors interface and are customized in a different way; see the corresponding documentation ([text printers](/guide/text-printers.md), [choice handlers](/guide/choices.md)) for more info.

*Notice: Before attempting to create custom UIs or modify existing ones first make sure you're familiar with [Unity's UI system](https://docs.unity3d.com/Packages/com.unity.ugui@latest) (uGUI); we're not providing any tutorials or support for Unity's built-in tools.*

To add a custom UI or modify (disable) a built-in one, use UI resources manager accessible via `Naninovel -> Resources -> UI` editor menu.

![](https://i.gyazo.com/b0f00e8431e34e59249b3f59919e3b2c.png)

To add a custom UI, create a new prefab (`Create -> Naninovel -> Custom UI`) and add it to the list. To disable a built-in UI remove a record from the list. When the engine is initializing it'll instantiate all the UI prefabs assigned in the resources manager.

To show or hide any of the UIs listed in the resources manager use [`@showUI`](/api/#showui) and [`@hideUI`](/api/#hideui) commands respectively.

When you create a new custom UI prefab via the context menu, the prefab will have a `Custom UI` component attached to the root object. This component (or rather the fact that the component is implementing `IManagedUI` interface) is essential to make the prefab accepted as a UI by the engine.

![](https://i.gyazo.com/9a4a38754ccf35e48b8bef2c3062ff02.png)

`Disable Interaction` property allows to permanently disable interaction with the UI, no matter the visibility. Requires `Canvas Group` component on the same game object.

When `Visible On Awake` is enabled, the UI will be visible when the UI is instantiated (right after the engine is initialized) and vice-versa.

When `Control Opacity` is enabled and `Canvas Group` component is attached to the same game object,  `Alpha` property of the `Canvas Group` component will be changed in sync with the current visibility state of the UI element. `Fade Duration` will then control time (duration in seconds) of the opacity fade animation. In case you wish to implement your own effect to accommodate the visibility status of the UI element (eg, slide animation instead of fading the opacity), disable `Control Opacity` property and use `On Show` and `On Hide` Unity events to react on visibility changes.

In case you wish to support gamepad or keyboard navigation over the UI, assign a game object with an interactable component (eg, a `Button`) to `Focus Object` property. This object will then be automatically focused when the UI becomes visible allowing to navigate over other interactable objects with a gamepad and/or keyboard. See Unity's [guide on UI navigation](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-SelectableNavigation.html) for more info on how to setup the navigation behavior.

When `Focus Object` is assigned, `Focus Mode` property allows to choose when to focus the object: `Visibility` mode will focus it right after the UI becomes visible and `Navigation` will postpone the focus until player activates a navigation key on gamepad (left stick or D-pad) or keyboard (arrow keys). 

`On Show` and `On Hide` Unity events allow to hook custom handlers to react to the UI visibility changes. For example, you can hook an `Animator` triggers to fire some custom animations when the UI becomes visible and vice-versa.

When `Hide On Load` is enabled, the UI will automatically be hidden when the engine is starting a load operation. This usually happens when loading another naninovel script or exiting to title menu.

Enabling `Save Visibility State` will make the visibility state of the UI persistent, so that when player loads a saved game, the UI will be in the same state (visible or  hidden) as it was when the game was saved.

`Block Input When Visible` allows to disable [input processing](/guide/input-processing.md) when the UI is visible. This is useful to prevent the player from using various hotkeys (hiding the UI, continue reading, etc) while he's interacting with the UI. `Allowed Samplers` allows to add exceptions to the blocked inputs; eg, you can add `ToggleUI` input name to the list, allowing player to toggle the UI while still preventing activation of any other inputs.

Enabling `Modal UI` makes all other UIs ignore interaction while the UI is visible. This is similar to `Block Input When Visible`, but affects event-based interaction (mouse clicks, touches, UI navigation) instead of direct input processing.

Several other components will also be added by default when creating a custom UI: 
- `Canvas Group` allows hiding the UI by changing the opacity (controlled with `Fade Duration`) and allows the UI to ignore user interaction when necessary.
- `Canvas Scaler` automatically scales the layout to fit current display resolution.
- `Graphic Raycaster` allows player to interact with buttons and other interactable elements inside the UI canvas.

You are free to modify or remove any of the above components as you see fit.

If you wish to modify an existing built-in UI prefab, you can find them at `Naninovel/Prefabs/DefaultUI` folder. While it's possible, please refrain from editing the built-in prefabs directly to prevent issues when updating the package. Rather duplicate the prefab you want to modify (Ctrl/Cmd+D), move it out of the package folder and modify the duplicate instead. Then assign modified prefab to an existing record in the UI resources manager.

When creating a new prefab from scratch, make sure to attach a component that implements interface of the UI you're going to override. This component should be attached to the root object of the prefab.

All the UI interfaces are stored under `Naninovel.UI` namespace:

Interface | Corresponding UI
--- | ---
IBacklogUI | Printer backlog.
ILoadingUI | Panel shown when the game is loading.
IMovieUI | UI used to host movies.
ISaveLoadUI | Panel used for saving and loading game.
ISceneTransitionUI | Handles scene transition ( [`@startTrans`](/api/#startTrans) and  [`@finishTrans`](/api/#finishTrans) commands).
ISettingsUI | Panel used for changing game settings.
ITitleUI | Title (main) menu of the game.
IExternalScriptsUI | External scripts browser UI (community modding feature).
IVariableInputUI | Input form for assigning an arbitrary text to a custom state variable (used by [`@input`](/api/#input) command).
IConfirmationUI | UI panel used to confirm important commands (eg, when exiting to the title menu or deleting saved game slot).
ICGGalleryUI | Unlockable [CG gallery](/guide/unlockable-items.md#cg-gallery) items browser.
ITipsUI | Unlockable [tips](/guide/unlockable-items.md#tips) browser.
IRollbackUI | Indicator for state rollback feature.
IContinueInputUI | A fullscreen invisible UI layer positioned at the bottom of the UI stack and used to activate a `continue input` trigger when clicked or touched.

In order for the UI to support visibility (visible on awake, fade time) and interaction options (disable interaction), also attach a `Canvas Group` component to the same object.

If you're OK with C# scripting and want to override default logic of the UI, [create a new component](https://docs.unity3d.com/Manual/CreatingAndUsingScripts), implement `IManagedUI` interface (feel free to inherit the component from `CustomUI` or `ScriptableUIBehaviour` to fulfill all the interface requirements) and attach the created custom component instead. Check `Naninovel/Runtime/UI` folder for reference implementations of the built-in UIs. Here is an example of minimal implementation of a custom UI component:

```csharp
using UniRx.Async;

public class MyCustomUI : ScriptableUIBehaviour, Naninovel.UI.IManagedUI
{
    public UniTask InitializeAsync () => UniTask.CompletedTask;
}
```

## Play Script On Unity Event

When creating custom UIs, you may want to execute some commands or start playing a specific naninovel script in reaction to some events (eg, a [button click](https://docs.unity3d.com/Manual/script-Button.html)).

Add `Play Script` component to a game object and either select an existing naninovel script or write the commands right inside the text area field; then route [Unity event](https://docs.unity3d.com/Manual/UnityEvents.html) of some other component to invoke `Play()` method on the `Play Script` component. The script will be executed when the event is triggered at play mode. The example below hides a custom UI when the button is clicked.

![](https://i.gyazo.com/5f56fbddc090919cc71f68e82bb1713f.png)

It's also possible to reference Unity event arguments in the script text with `{arg}` expression; supported arguments types are: string, integer, float and boolean. Below example demonstrates executing camera shake and playing a sound effect when a boolean Unity event is positive and playing a background musing when it's negative.

![](https://i.gyazo.com/78e9fa27d6561f8f8aced76bbeb4b542.png)

Be aware, that conditional block commands (if, else, elseif, endif) are not supported in the script text.

Notice, that when an existing naninovel script is selected via dropdown list, the script text area will be ignored and selected naninovel script will be played **instead** of the currently played one; in case you wish to additively execute some commands without interrupting the currently played script, use the script text area.

## Video Guide

Check out the following video tutorial, where we create a custom calendar UI and bind it to the date and month [custom state variables](/api/#set).

*Be aware, that the video was created with a previous version of the engine and some of the steps may not reflect how things currently work. We'll update the video after the stable release, but you can still use the current one to get a grasp on how to use the feature on a conceptual level.*

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/jto4Ld-iP7M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Example Project

Within the [following GitHub repository](https://github.com/Elringus/NaninovelCustomUIExample) you can find the project showed in the above video tutorial.