# Development Console

Development console is used to execute static C# methods via in-game UI.

To show the console UI while the game is running, make sure development console is enabled in the engine configuration and press `~` (tilde) key.

![Engine Configuration](/guide/engine-config.png)

To expose a C# method to the console, add a `ConsoleCommand` attribute to a static method. The attribute has an optional string argument, allowing to set a shortcut:

```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

In the console, type either full method name or the shortcut (if applied) and press `Enter` key to execute the method.

<video class="video" loop autoplay><source src="https://i.gyazo.com/bd41a9a8fff91eb575b235a6b641dcce.mp4 " type="video/mp4"></video>

Following commands are currently available:

Command | Description
--- | ---
nav | Toggles script navigator UI.
debug | Toggles debug window.
purge | When [Google Drive provider](/guide/google-drive-integration.md) is used, purges the downloaded resources cache.
play | Starts executing currently loaded novel script.
stop | Halts execution of the currently loaded novel script.
rewind (int) | Rewinds currently loaded novel script to the provided line index.

## Executing Novel Actions

You can invoke the novel actions via development console. Input the action string just like you do in novel scripts and it will be immediately executed. Among other cases, this could be useful to debug custom state variables. Eg, you can print the current value of any custom variable with:

```
@print {VariableName}
```

— will print the value of the `VariableName` to the currently active printer.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/wcgTGro0_SE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>