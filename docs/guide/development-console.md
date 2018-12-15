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
purge | When Google Drive provider is used, purges the downloaded resources cache.
play | Starts executing currently loaded novel script.
stop | Halts execution of the currently loaded novel script.
rewind (int) | Rewinds currently loaded novel script to the provided line index.
