# Custom Actor Shader

When rendering most of the actors (characters and backgrounds, except generic ones) a special shader is used to handle semi-transparency overdraw and support various transition effects.

You can override the default shader by assigning a custom one to `Custom Texture Shader` property available in the actor configuration menu.

![](https://i.gyazo.com/40eef3177d43afe223e91c59c2032543.png)

Be aware, that the shader is expected to have specific properties; check default shader `Naninovel/Resources/Naninovel/Shaders/TransitionalTexture` for a reference.

When actor is represented as a sprite on a scene, `Custom Sprite Shader` property is available (the case for non-generic implementations when they're not rendered to texture). By default, a simple unlit transparent shader is used; in case you want to implement lighting or surface effects, assign a custom shader to the property.

::: tip EXAMPLE
Check the project on GitHub for an example on how to create and use [texture shader](https://github.com/Naninovel/CustomShader/blob/main/Assets/Shaders/CustomTexture.shader) for adding custom transition effects and [sprite shader](https://github.com/Naninovel/CustomShader/blob/main/Assets/Shaders/CustomSprite.shader) with lighting and self-illumination support to simulate time of day for a background actor: [github.com/Naninovel/CustomShader](https://github.com/Naninovel/CustomShader).
:::

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)
