# Getting started

## Installation
Import Naninovel package from the Asset Store to your Unity project and wait for the initial scripts compilation and assets import process. During the first-time import a number of configuration assets will be automatically generated inside the package folder; when the process finishes, an information window will be shown with the currently installed engine version and links to the online resources.
You are free to move the package folder anywhere inside your project assets directory.
In case you delete the package folder and then re-import it again in the same project, the configuration assets won’t be automatically re-generated; open “Naninovel -> Configuration” menu to generate them before running the editor or building the player.

## Add novel script
Use “Create -> Novel Script” asset context menu to create novel script. Novel scripts are text documents (.txt extension) where you control what happens on scenes. You can open and edit them with a text editor of your choice, like Notepad, Word or Sublime.
Add the created novel script to the project resources. For this, open scripts manager using “Naninovel -> Resources -> Scripts” context menu, press “+” (plus sign) button in the list to add a new record and drag-drop script asset to the list. Alternatively, you can just keep the scripts in a “Resources/Scripts” folder and they'll be automatically exposed to project resources.
In case you’ve chosen to not use the script manager, you’ll have to manually set “Start Game Script” value in the “Naninovel -> Configuration -> Scripts” menu; it will be set automatically when you add first novel script in the manager otherwise.
Open the created script in a text editor and add the following text:
```
Hello World!
@stop
```
The first line will print the text “Hello World!” when the game is run and the second is required to gracefully stop script execution.
Enter play mode and start new game to see the result.
If the “NEW GAME” button is not interactable, make sure you’ve set a correct novel script name for the “Start Game Script” option in the scripts configuration.

## Add character
