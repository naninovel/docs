# Custom Actor Shader

When rendering most of the actors (characters and backgrounds, except generic ones) a special shader is used to handle semi-transparency overdraw and to support various effects.

You can override the default shader by assigning a custom one to `Custom Shader` property available in the actor configuration menu.

![](https://i.gyazo.com/0ddd77ffda5e4d31e09be723b318ef43.png)

Be aware, that the shader is expected to have several specific properties and render passes in order to work correctly. You can use the built-in default shader as a reference when writing your own. The built-in shader is located at `Naninovel/Resources/Naninovel/Shaders/TransitionalSprite.shader`.

See Unity documentation and tutorials on shaders and graphics programming in general for more info on how to create and modify the shader and what you can achieve with it.
