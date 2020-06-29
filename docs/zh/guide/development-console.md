# Development Console

Development console is used to execute static C# methods via in-game UI.

To show the console UI while the game is running, make sure development console is enabled in the engine configuration and press `~` (tilde) key. In case you have issues using the default key (eg, when under Unity editor on Mac OS), you can change it via `Toggle Console Key` property.

![Engine Configuration](https://i.gyazo.com/bc56a837c03d198e2d8141bdebc2e696.png)


To expose a C# method to the console, add a `ConsoleCommand` attribute to a static method. The attribute has an optional string argument, allowing to set a shortcut:

```csharp
[ConsoleCommand("debug")]
public static void ToggleDebugInfo () => UI.DebugInfoGUI.Toggle();
```

In the console, type either full method name or the shortcut (if applied) and press `Enter` key to execute the method.

[!bd41a9a8fff91eb575b235a6b641dcce]

Following commands are currently available:

Command | Description
--- | ---
nav | Toggles naninovel script navigator UI.
debug | Toggles [naninovel script debug](/zh/guide/naninovel-scripts.md#scripts-debug) window.
var | Toggles [custom variable editor](/zh/guide/custom-variables.md#variables-debug) window.
purge | When [Google Drive provider](/zh/guide/resource-providers.md#google-drive) is used, purges the downloaded resources cache.
play | Starts executing currently loaded naninovel script.
stop | Halts execution of the currently loaded naninovel script.
rewind (int) | Rewinds currently loaded naninovel script to the provided line index. The line should be either a command or a generic text. When rewinding back, the line should exist in the rollback stack.
reload | Performs [hot reload](/zh/guide/naninovel-scripts.md#hot-reload) of the currently played naninovel script. Works only in Unity editor.

## Executing Commands

You can invoke the script commands via development console. Input the command string just like you do in naninovel scripts and it will be immediately executed. Among other cases, this could be useful to debug custom state variables. Eg, you can print the current value of any custom variable with:

```
@print {VariableName}
```

— will print the value of the `VariableName` with the default printer.

[!!wcgTGro0_SE]