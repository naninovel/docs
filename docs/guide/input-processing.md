# Input Processing
 
Engine processes user input using pre-configured listeners. Each input listener has the following properties:

Property | Description
--- | ---
Name | Identifier of the input listener. Used to reference the listener by other engine systems.
Always Process | Whether to process the input while in input blocking mode. E.g. when playing a movie.
Keys | List of keys which activates the input.
Axes | List of axes which activates the input.

You can configure the built-in input bindings and add new listeners using `Naninovel -> Configuration -> Input` context menu; for available options see [configuration guide](/guide/configuration.md#input).

![Manage Input](/guide/input-config.png)
