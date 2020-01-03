# Input Processing
 
Engine processes user input using pre-configured listeners. Each input listener has the following properties:

Property | Description
--- | ---
Name | Identifier of the input listener. Used to reference the listener by other engine systems.
Always Process | Whether to process the input while in input blocking mode. E.g. when playing a movie.
Keys | List of keys (buttons) which activate the input.
Axes | List of axes (eg, a mouse or a gamepad analog stick) which activate the input.
Swipes | List of swipes (touch screen) which activate the input.

For specific values see Unity's input guide: [docs.unity3d.com/Manual/ConventionalGameInput](https://docs.unity3d.com/Manual/ConventionalGameInput.html).

You can configure the built-in input bindings and add new listeners using `Naninovel -> Configuration -> Input` context menu; for available options see [configuration guide](/guide/configuration.md#input).

![Manage Input](https://i.gyazo.com/2f97539323c9fc36124e286856a36f84.png)

To allow players change the input bindings, remove all the key direct bindings and use axes instead. The axes can then be configured via [Unity's game launcher](https://docs.unity3d.com/Manual/ConventionalGameInput.html).