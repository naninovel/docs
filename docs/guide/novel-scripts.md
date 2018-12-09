# Novel scripts

Novel scripts are text documents (`.txt` extension) where you control what happens on scenes. You can open and edit them with a text editor of your choice, like Notepad, Word or Sublime.

Each line in a novel script represents a statement, which can be an action, generic text, label, comment or a define statement. Type of the statement is determined by the literal that is placed at the start of the line:

Literal | Statement Type 
:---: | --- 
@ | [Action](#action-lines)
# | [Label](#label-lines)
; | [Comment](#comment-lines)
> | [Define](#define-lines)

When none of the above literals are present at the start of the line, it's considered a [generic text](#generic-text-lines) statement.

## Action lines

Line is considered an action statement if it starts with a `@` literal. Action represents a single operation, that controls what happens on the scene; eg, it can be used to change a background, move a character or load another novel script.

### Action identifier

Right after the action literal an action identifier is expected. This could either be the name of the C# class that implements the action or the action's tag (if it's applied via `NovelActionTag` attribute). 

For example, a [`@save`](/api/#save) action (used to auto-save the game) is implemented via the `AutoSave` C# class. The implementing class also has a `[NovelActionTag("save")]` attribute applied, so you can use both `@save` and `@AutoSave` statements in the script to invoke this action. 

Action identifiers are case-insensitive; all the following statements are valid and will invoke the same `AutoSave` action:

```
@save
@Save
@AutoSave
@autosave
``` 

### Action parameters

