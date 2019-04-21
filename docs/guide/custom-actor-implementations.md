# Custom Actor Implementations

Novel actor is a scene entity defined by a name, appearance, visibility and transform (position, rotation and scale). It can asynchronously change appearance, visibility and transform over time. Examples of novel actors are characters, backgrounds, text printers and choice handlers. 

Novel actors are represented by `INovelActor` interface and its derivatives:

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

Each actor interface can have multiple implementations; e.g. character actors currently have four built-in implementations: sprite, diced sprite, animated and Live2D.

Actor implementation can be selected in the configuration managers accessible via `Naninovel -> Configuration` context menu. You can both change default implementation used for all the actors or set specific implementation per actor. To change default implementation, use `Default Metadata` property and to set specific ones, use an `Implementation` drop-down list in actor's configuration. 

![Default Actor Implementation](https://i.gyazo.com/ac39a68df1e81dd4b33b7a2674113479.png)
![Actor Implementation](https://i.gyazo.com/51e4f625448889d3d39254de3dce5ec6.png)

Implementation drop-down list contains all the types that implements specific actor interface. You can add your own custom implementations and they'll also appear in the list. See `Naninovel/Runtime/Actors` scripts for a reference when creating your own actor implementations.

