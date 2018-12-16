# Custom Novel Actions

Novel action represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another novel script. Parametrized action sequences defined in [novel scripts](/guide/novel-scripts.md) effectively controls the game flow. You can find available built-in actions in the [API reference](/api/). In code, all the built-in novel action implementations are defined under `Naninovel.Actions` namespace.


To add your own custom novel action, create a new C# class, inherit `Naninovel.Actions.NovelAction` class and implement `ExecuteAsync` and `UndoAsync` abstract methods.

`ExecuteAsync` is an async method invoked when the action is executed by the scripts player; put the action logic here. Use [engine services](/guide/engine-services.md) to access the engine built-in systems. Novel script execution will halt until this method returns a completed task in case `Wait` parameter is `true`.

`UndoAsync` method is invoked when rewinding novel scripts backwards. In case your novel action changes scene state, you should revert the changes here; otherwise just return a completed task.

To expose an action parameter to novel scripts, add a `NovelActionParameter` attribute to the public field you want to expose. The attribute takes two optional arguments: `name` (string) is an alias name of the parameter and `isOptional` (bool) controls whether the parameter should be considered optional (can be omitted in novel scripts). If you wish to make the parameter nameless, set an empty string (`""` or `string.Empty`) as the alias.

To assign a tag (alias) to the novel action, apply `NovelActionTag` attribute to the implementing class. In novel scripts you can reference the action by either its implementation class name or the assigned tag.

In case execution of the action requires loading some resources, implement `NovelAction.IPreloadable` interface to preload the required resources when the game is loading.

In case the action have parameters that can be localized (text directly presented to the user, usually), implement `NovelAction.ILocalizable` interface to add the action to the generated script localization documents.

You can find scripts with all the built-in action implementations at `Naninovel/Runtime/Actions` package folder; feel free to use them as a reference when implementing your own custom actions.

