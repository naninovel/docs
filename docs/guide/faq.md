﻿# FAQ

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) use the [UI customization](/guide/ui-customization.md) feature; for everything else set `Title Script` at the [scripts configuration menu](/guide/configuration.md#scripts) (Naninovel -> Configuration -> Scripts) and use novel script actions to setup the scene just like when writing a scenario. The title script will be automatically played when entering the title menu.

## I'd like to use backgrounds with a non-standard resolution (eg, 2048x1024), but they look cropped.

Set `Reference Resolution` at the [camera configuration menu](/guide/configuration.md#camera) (Naninovel -> Configuration -> Camera) equal to the backgrounds resolution.

## How to run a custom C# code from novel scripts?

Use [custom novel actions](/guide/custom-novel-actions.md).

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system. 

Be aware, that in most cases such integration will require C# scripting (or [visual scripting](/guide/visual-scripting.md)) in varying extent. See the [engine architecture overview](/guide/engine-architecture.md) to a get grasp of how Naninovel works and [integration guide](/guide/integration-options.md) for more information on the integration options

## Is it possible to embed a mini-game to Naninovel?

Sure, you can freely "inject" any custom logic to the default Naninovel flow. In most cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/visual-scripting.md) solution). Check the [engine services guide](/guide/engine-services.md) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management.md#custom-state), [custom actor implementations](/guide/custom-actor-implementations.md) and [custom novel actions](/guide/custom-novel-actions.md) in the process.