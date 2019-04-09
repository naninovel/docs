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
IVariableInputUI | Input form for assigning an arbitrary text to a custom state variable (used by [`@input`](/api/#input) action).

To add a new custom UI (without overriding any of the built-in UIs), simply attach a `ManagedUI` component to the root object of your custom UI prefab.

![](https://i.gyazo.com/dba20c81652e0fd1b8549441baf14d79.png)

If you're OK with C# scripting and want to override default logic of the UI, you can [create a new component](https://docs.unity3d.com/Manual/CreatingAndUsingScripts), implement `Naninovel.UI.IManagedUI` interface (feel free to inherit the component from `UnityCommon.ScriptableUIBehaviour` to handle all the interface requirements) and attach this component instead. Check `Naninovel/Runtime/UI` folder for reference implementations of the built-in UIs; and here is an example of minimal implementation of a custom managed UI component:

```csharp
using System.Threading.Tasks;

public class MyCustomUI : UnityCommon.ScriptableUIBehaviour, Naninovel.UI.IManagedUI
{
    public Task InitializeAsync () => Task.CompletedTask;
}
```

When the prefab is ready, add it to `Custom UI` list in the UI configuration manager accessible with `Naninovel -> Configuration -> UI` context menu.

![UI Customization](https://i.gyazo.com/ac4f04b492d7559c7991a8c2720c08e1.png)

When the engine is initializing it'll spawn all the prefabs added to the `Custom UI` list. In case spawned prefab has a component attached to the root object that implements one of the built-in UI interfaces, built-in prefab with default implementation won't be spawned.
