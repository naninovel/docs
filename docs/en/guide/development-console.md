# Development Console

Development console is used to execute static C# methods via in-game UI. To enable or disable the feature, use `Enable Development Console` property in the engine configuration. To keep the feature only under development (debug) builds, enable `Debug Only Console` in the same configuration menu.

To show the console UI while the game is running, make sure development console is enabled and press `~` (tilde) key. The key can be changed via input configuration under `ToggleConsole` binding.

To expose a C# method to the console, add a `ConsoleCommand` attribute to a static method. The attribute has an optional string argument, allowing to set a shortcut:

```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

In the console, type either full method name or the shortcut (if applied) and press `Enter` key to execute the method.

![](https://i.gyazo.com/bd41a9a8fff91eb575b235a6b641dcce.mp4)

Following commands are currently available:

Command | Description
--- | ---
nav | Toggles scenario script navigator UI.
debug | Toggles script debug window.
var | Toggles [custom variable editor](/guide/custom-variables#variables-debug) window.
play | Starts executing currently loaded scenario script.
stop | Halts execution of the currently loaded scenario script.
rewind (int) | Rewinds currently loaded scenario script to the provided line index. The line should be either a command or a generic text. When rewinding back, the line should exist in the rollback stack.
reload | Performs hot reload of the currently played scenario script.

## Executing Commands

You can invoke the script commands via development console. Input the command string just like you do in scenario scripts and it will be immediately executed. Among other cases, this could be useful to debug custom state variables. Eg, you can print the current value of any custom variable with:

```nani
@print {VariableName}
```

— will print the value of the `VariableName` with the default printer.

![](https://www.youtube.com/watch?v=wcgTGro0_SE)
