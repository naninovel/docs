# Custom Actor Shader

When rendering most of the characters and background actors (generic excluded) a special shader is used to handle semi-transparency overdraw and support various transition effects.

You can override the default shader by assigning a material to `Custom Texture Material` property available in the actor configuration menu.

![](https://i.gyazo.com/8b6c06d2a7ed276f17cb25ecf7bcc4b0.png)

Be aware, that the shader used by the assigned material is expected to have specific properties; check the default shader at `Naninovel/Resources/Naninovel/Shaders/TransitionalTexture` for a reference.

When actor is represented as a sprite on a scene, `Custom Sprite Material` property is available (the case for non-generic implementations when they're not rendered to texture). By default, a simple unlit transparent shader is used; in case you want to implement lighting or surface effects, assign a material with a custom shader to the property.

::: tip EXAMPLE
Check [actor shader sample](/guide/samples#actor-shader) for an example on how to create and use texture shader for adding custom transition effects and sprite shader with lighting and self-illumination support to simulate time of day for a background actor.
:::

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)
