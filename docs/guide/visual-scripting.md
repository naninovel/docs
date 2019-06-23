# Visual Scripting

Naninovel C# API can be used with third-party visual scripting tools, such as [Bolt](https://ludiq.io/bolt) or [PlayMaker](https://hutonggames.com/). See the following guide for required setup and usage examples.

## Bolt

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) is an advanced visual scripting solution for Unity providing the most flexibility for both programmers and designers. 

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

### Setup

Download and install Bolt package to your Naninovel project. **Bolt v2 is recommended**, as the previous version doesn't support generics under AOT platforms (Naninovel core API is using generics extensively).

Now we need to expose Naninovel API for Bolt. Open the extractor tool via `Tools/Bolt/Extractor...`:

![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

Under "Namespaces" tab add a new namespace record, find "Naninovel" in the list, check "Hierarchy" and press "Fast Extract":

![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

That's it, you can now use Naninovel C# API in your bolt graphs.

### Usage

The following video demonstrates using Bolt flow graph to subscribe to `Engine.OnInitialized` event, get `ScriptPlayer` engine service and play a naninovel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/w7PAhE7HO9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## PlayMaker

[PlayMaker](https://assetstore.unity.com/packages/tools/visual-scripting/playmaker-368) is a popular visual scripting tool for Unity specifically designed to be friendly for non-programmers. 

![](https://i.gyazo.com/0a5b219b059fd61c85d225e903d77857.png)

Be aware, that in contrast to Bolt, where all the Naninovel's C# API is available by default, PlayMaker requires creating a special C# class for each action. This means that only a limited subset of the engine API is available out of the box when using PlayMaker. The available custom actions could also break in case Naninovel's API change (especially while we're in beta development stage).

### Setup

Install PlayMaker following instructions from the [official manual](https://hutonggames.fogbugz.com/default.asp?W11).

Download and import [custom Naninovel actions for PlayMaker](https://github.com/Elringus/NaninovelPlayMaker/raw/master/NaninovelPlayMaker.unitypackage).

The custom Naninovel actions should now appear in the PlayMaker actions browser under "Naninovel" category.

![](https://i.gyazo.com/a40b0b7b21c73d3b5f64b005085198ea.png)

### Usage

The following video demonstrates using PlayMaker FSM (finite state machine) to initialize Naninovel engine, preload and play a scenario script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/N856vi18XVU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Some of the essential Naninovel events can be automatically routed to PlayMaker FSMs. For this, create a global [user event](https://hutonggames.fogbugz.com/default.asp?W148) with an appropriate name and use it inside an FSM. Here are the available event names:

- `Naninovel/Engine/OnInitialized`
- `Naninovel/ScriptPlayer/OnPlay`
- `Naninovel/ScriptPlayer/OnStop`
- `Naninovel/StateManager/OnGameSaveStarted`
- `Naninovel/StateManager/OnGameSaveFinished`
- `Naninovel/StateManager/OnGameLoadStarted`
- `Naninovel/StateManager/OnGameLoadFinished`

It's also possible to broadcast custom PlayMaker events from naninovel scripts using `@playmaker` command:

```
@playmaker EventName
```

— will invoke a global user event named "EventName" in all the active FSMs on scene.

## Other Solutions

If you wish us to make setup and usage guides for other third-party visual scripting solutions, contact developers of the solution and ask them to provide us access to their tool.
