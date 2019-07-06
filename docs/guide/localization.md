# Localization

All the game resources (scripts, audio, voice, backgrounds, etc) can be localized to multiple languages/cultures.

## Resources Localization

Create a folder at `/Resources/Localization` with name equal to one of the [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) language tags you wish to add localization for.

Inside this folder store resources that will be used instead of the original ones when the corresponding localization is selected in the game settings. 

For example, if you wish to replace a background stored at `/Resources/Backgrounds/City` with another one when a `ja-JP` locale is selected, place the localized version at the following path: `/Resources/Localization/ja-JP/Backgrounds/City`.

## Scripts Localization

The resources localization scheme described above works with all the resource types, except naninovel scripts and managed text documents. For these type of resources, use localization tool accessible via `Naninovel -> Tools -> Localization`:

![Localization Tool](https://i.gyazo.com/cb521d2645830988563a7907f05170c8.png)

Specify source of the original resources (current Unity project, local file system or Google Drive), path prefixes for the naninovel scripts and managed text resources ("Scripts" and "Text" by default) and select path to the locale folder where to store the generated localization resources. Make sure you've selected an actual locale folder (e.g. `Resources/Localization/ja-JP`) and not just the localization resources root. 

Enabling "Try update" property will attempt to preserve any currently existing localization resources; when disabled all the existing localization resources at the specified path will be lost.

Enabling "Localize text" will also generate [managed text](/guide/managed-text.md) localization documents.

Press "Generate" button to create (update) the localization resources.

Script localization documents consists of statements in the following format:

```
# ID
; Original text
Translation text
```

`# ID` line is the unique identifier of the original statement in the naninovel script, you shouldn't modify those.

`; Original text` line is the original text which you're expected to translate. It's just a comment, so changing this line won't have any effect; it's provided for convenience.

You're expected to put the actual translation right after the comment line with the original text. You can use any number of lines for the translation, just make sure to place them before next `# ID` line. 

Here is an example translation of a generic text line:

```
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Юко: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно. Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

In case the translation takes too much space, you can break it into separate commands:

```
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Юко: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно.
Юко: Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

You're expected to include any inlined commands present in the original statement to the translation:

```
# b53b395d
; Kohaku: Qui ante molestie sit tempor felis.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Adipiscing elit?[style default][br][skipInput]
Кохаку: Противостояние вызывает кислый метеорный дождь.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Меандр разрушаем?[style default][br][skipInput]
```
