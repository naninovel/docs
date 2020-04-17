# Render Pipelines

Unity's [scriptable render pipelines](https://docs.unity3d.com/Manual/ScriptableRenderPipeline.html) (SRP) — both URP and HDRP — are supported with some limitations and require additional setup.

::: warn
The SRPs are still hardly production-ready (despite the official claims from Unity) and lack many features compared to default rendering system. It's not recommended to use the render pipelines, unless you're an advanced user and ready to solve any potential technical issues and limitations.
:::

## Setup

See the [official documentation](https://docs.unity3d.com/Manual/ScriptableRenderPipeline.html) on how to install and configure your SRP of choice.

Both URP and HDRP doesn't support multiple cameras, so it's required to disable `Use UI Camera` in the camera configuration menu (enabled by default).

![](https://i.gyazo.com/5b70d18f028d27124bd8f4a25b2df47c.png)

When running under HDRP, change color space to linear (HDRP doesn't support gamma mode, which is set by default).

![](https://i.gyazo.com/2c053a6e3d79f080469787b7f09ee8f3.png)

## Limitations

Some of the built-in effects and features (eg, Depth Of Field, Digital Glitch, [`@startTrans`](/api/#starttrans) and [`@finishTrans`](/api/#finishtrans) commands) won't work with SRPs due to lack of the required rendering features. It's possible to replace most of the missing effects and features via various hacks and use them without modifying Naninovel's source code or package content; see [special effects guide](/guide/special-effects.md#adding-custom-effects) and [custom commands](/guide/custom-commands.md) guides for more information on extending the engine in that regard.