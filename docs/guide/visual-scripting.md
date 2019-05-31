# Visual Scripting

Naninovel C# API can be used with third-party visual scripting tools, such as [Bolt](https://ludiq.io/bolt). See the following guide for required setup and usage examples.

## Bolt

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) brings complete visual scripting to Unity, empowering artists, designers and programmers to create gameplay mechanics and interactive systems without writing a single line of code. 

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

### Setup

Download and install Bolt package to your Naninovel project. **Bolt v2 is recommended**, as the previous version doesn't support generics under AOT platforms (Naninovel core API is using generics extensively).

Now we need to expose Naninovel API for Bolt. Open the extractor tool via `Tools/Bolt/Extractor...`:

![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

Under "Namespaces" tab add a new namespace record, find "Naninovel" in the list, check "Hierarchy" and press "Fast Extract":

![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

That's it, you can now use Naninovel C# API in your bolt graphs.

### Usage

The following video demonstrates using Bolt flow graph to subscribe to `Engine.OnInitialized` event, get `NovelScriptPlayer` engine service and play a novel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/w7PAhE7HO9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Other Solutions

If you wish us to make setup and usage guides for other third-party visual scripting solutions, contact developers of the solution and ask them to provide us access to their tool.

