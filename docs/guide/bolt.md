# Bolt

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) is an advanced visual scripting solution for Unity providing the most flexibility for both programmers and designers. 

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

## Setup

Download and install Bolt package to your Naninovel project. **Bolt v2 is recommended**, as the previous version doesn't support generics under AOT platforms (Naninovel core API is using generics extensively).

Now we need to expose Naninovel API for Bolt. Open the extractor tool via `Tools/Bolt/Extractor...`:

![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

Under "Namespaces" tab add a new namespace record, find "Naninovel" in the list, check "Hierarchy" and press "Fast Extract":

![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

That's it, you can now use Naninovel C# API in your bolt graphs.

![](https://i.gyazo.com/080106d574ea894f62ea79b7dd904ab2.png)

An example project is available on GitHub: [github.com/Elringus/NaninovelBolt](https://github.com/Elringus/NaninovelBolt).