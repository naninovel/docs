# UI Customization

UI customization feature allows to add a custom UI and modify or completely replace any of the built-in UI elements, like title menu, settings menu, printer backlog, etc.

Be aware though, that text printers and choice handlers are implemented via actors interface and are customized in a different way; see the corresponding documentation ([text printers](/guide/text-printers.md), [choice handlers](/guide/choices.md)) for more info.

If you wish to modify an existing built-in UI prefab, you can find them at `Naninovel/Resources/Naninovel/DefaultUI` folder. While it's possible, please refrain from editing the built-in prefabs directly to prevent issues when updating the package. Rather duplicate the prefab you want to modify (Ctrl/Cmd+D), move it out of the package folder and modify the duplicate instead. 

When creating a new prefab from scratch, don't forget to attach a component that implements interface of the UI you're going to override. This component should be attached to the root object of the prefab.

All the UI interfaces are stored under `Naninovel.UI` namespace:

Interface | Corresponding UI
--- | ---
IBacklogUI | Printer backlog.
ILoadingUI | Panel shown when the game is loading.
IMovieUI | UI used to host movies.
ISaveLoadUI | Panel used for saving and loading game.
ISettingsUI | Panel used for changing game settings.
ITitleUI | Title (main) menu of the game.
IExternalScriptsUI | External scripts browser UI (community modding feature).
IVariableInputUI | Input form for assigning an arbitrary text to a custom state variable (used by [`@input`](/api/#input) command).
IConfirmationUI | UI panel used to confirm important commands (eg, when exiting to the title menu or deleting saved game slot).
ICGGalleryUI | Unlockable [CG gallery](/guide/unlockable-items.md#cg-gallery) items browser.
ITipsUI | Unlockable [tips](/guide/unlockable-items.md#tips) browser.
IRollbackUI | Indicator for state rollback feature.
IContinueInputUI | A fullscreen invisible UI layer positioned at the bottom of the UI stack and used to activate a `continue input` trigger when clicked or touched.

To add a new custom UI (without overriding any of the built-in UIs), attach a `CustomUI` component to the root object of your custom UI prefab.

![](https://i.gyazo.com/e8f6f38a4e920d65443b7d0403d42b48.png)

In order for the UI to support visibility (visible on awake, fade time) and interaction options (disable interaction), also attach a `Canvas Group` component to the same object.

To create a custom UI template prefab with all the required components attached use `Create -> Naninovel -> Custom UI` asset context menu.

If you're OK with C# scripting and want to override default logic of the UI, [create a new component](https://docs.unity3d.com/Manual/CreatingAndUsingScripts), implement `IManagedUI` interface (feel free to inherit the component from `ScriptableUIBehaviour` to fulfill all the interface requirements) and attach the created custom component instead. Check `Naninovel/Runtime/UI` folder for reference implementations of the built-in UIs. Here is an example of minimal implementation of a custom UI component:

```csharp
using System.Threading.Tasks;

public class MyCustomUI : UnityCommon.ScriptableUIBehaviour, Naninovel.UI.IManagedUI
{
    public Task InitializeAsync () => Task.CompletedTask;
}
```

When the prefab is ready, add it to `Custom UI` list in the UI configuration accessible with `Naninovel -> Configuration -> UI` context menu.

![](https://i.gyazo.com/f26310e391b96bda3d402d704c31cb9e.png)

When the engine is initializing it'll spawn all the prefabs added to the `Custom UI` list.

To disable or override the default (built-in) UIs, use the `Default UI` area.

![](https://i.gyazo.com/57338b7150364f45f715bcd3e47d8c1a.png)

To disable a default UI, uncheck the toggle behind the corresponding UI record and to override the UI, assign a custom prefab to the "Game Object" field of the record.

## Play Naninovel Script On Button Click

When creating custom buttons, you may prefer to use naninovel scripts to handle the [onClick](https://docs.unity3d.com/ScriptReference/UI.Button-onClick.html) events instead of C#. Add `Play Script On Button Click` component to the button gameobject and either select an existing naninovel script or write the naninovel script right inside the text area field.

![](https://i.gyazo.com/8c8a0f210a26afcf43465aa71f59e318.png)

The script will be executed when user clicks the button in play mode. Notice, that when an existing naninovel script is selected via dropdown list, the script text area will be ignored and selected naninovel script will be played **instead** of the currently played one; in case you wish to additively execute some script logic without interrupting the currently played script, use the script text area.

## Video Guide

Check out the following video tutorial, where we create a custom calendar UI and bind it to the date and month [custom state variables](/api/#set).

*Be aware, that the video was created with a previous version of the engine and some of the steps may not reflect how things currently work. We'll update the video after the stable release, but you can still use the current one to get a grasp on how to use the feature on a conceptual level.*

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/jto4Ld-iP7M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Example Project

Within the [following GitHub repository](https://github.com/Elringus/NaninovelCustomUIExample) you can find the project showed in the above video tutorial.