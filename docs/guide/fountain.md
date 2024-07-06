# Fountain

[Fountain](https://fountain.io) is a markup syntax for writing, editing and sharing screenplays in plain, human-readable text. It's supported by the screenwriting software, such as [Highland](https://highland2.app), [Final Draft](https://www.finaldraft.com) and [Scrivener](https://www.literatureandlatte.com/scrivener).

![](https://i.gyazo.com/a4efc6cd882a12799f548ecf1dde4824.png)

Naninovel provides a tool to convert `.fountain` documents to `.nani` scripts, so that you can work on the initial scenario for your project in a Fountain-compatible software and then move to Naninovel.

Open the tool via `Naninovel -> Tools -> Fountain Screenplay` editor menu, select source `.fountain` document, output folder to store the generated `.nani` files and click "Convert Screenplay".

![](https://i.gyazo.com/2cf71e3a5b2713ba14838f1e28bb498d.png)

Fountain's [Action](https://fountain.io/syntax#section-action) and [Dialogue](https://fountain.io/syntax#section-dialogue) paragraphs will be converted to [generic text lines](/guide/naninovel-scripts.html#generic-text-lines); other syntax constructs will be represented as [comment lines](/guide/naninovel-scripts.html#comment-lines).

![](https://i.gyazo.com/e6d3231993fc11eb664d2c9a70c8a87a.png)

If you'd like to split the screenplay into multiple `.nani` scripts, use Fountain's [Section](https://fountain.io/syntax#section-sections) markup. For example, consider the following screenplay:

```
# Episode 1
## Scene 1
...
## Scene 2
...
# Episode 2
## Scene 1
...
```

It'll be converted in the following naninovel scripts, organized with folders:
- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
