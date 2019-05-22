---
sidebar: auto
---

# API Reference

Script commands API reference. Use the side bar to quickly navigate between available commands. 

~~Strikethrough~~ indicates a nameless parameter, and **bold** stands for required parameter; other parameters should be considered optional. Check out the [naninovel scripts guide](/guide/naninovel-scripts.md) in case you have no idea what's this all about.

The following parameters are supported by all the script commands:

<div class=config-table>

ID | Type | Description
--- | --- | ---
if | String |  A boolean [script expression](/guide/script-expressions.md), controlling whether the command should execute.
wait | Boolean | Whether the script player should wait for the async command execution before playing next action. Has no effect when the command is executed instantly.
time | Single | Determines for how long (in seconds) command should execute. While formally supported by all the commands not every command actually use this parameter (eg, execution time of instant commands won't be changed).

</div>

This API reference is valid for [Naninovel v1.6.0-beta](https://github.com/Elringus/NaninovelWeb/releases).

