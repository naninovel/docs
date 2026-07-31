# Scene Recording

Scene composition is often easier visually: place characters, adjust their scale and rotation, then move or zoom the camera until the shot looks right. Reproducing the result in a scenario script would normally require repeatedly guessing numeric parameters, replaying the scene and making small corrections.

Scene Recording removes this trial-and-error loop. Start recording on a scenario line, arrange supported actors and the camera with Unity's regular Scene view and Inspector tools, and the corresponding scenario commands appear live in the [Story Editor](/guide/editor) or [VS Code extension](/guide/ide-extension). Use it when staging a new scene, fine-tuning an existing composition, or capturing transforms that would be inconvenient to calculate manually.

![](/assets/img/guide/scene-recording.mp4)

## Recording in Story Editor

1. Enter Play Mode and start scenario playback.
2. In the Story Editor, right-click the destination line and select `Start Scene Recording`.
3. Modify supported objects with the Unity Scene view gizmos or Inspector. Generated lines update in real time and are outlined in red.
4. Right-click a line and select `Stop Scene Recording` or save the script to stop the recording.

The entire recording is registered as a single `Record Scene` undo step. Editing a scenario script or stopping playback also stops an active recording.

## Recording in VS Code

1. Enter Play Mode and start scenario playback.
2. Right-click the destination scenario line and select `Start Scene Recording`.
3. Modify supported objects with the Unity Scene view gizmos or Inspector. A red circle in the gutter marks the recorded block while its commands update.
4. Right-click a line and select `Stop Scene Recording` or save the script to stop the recording.

VS Code saves the document automatically when recording stops. Undoing or redoing, editing outside the recorded block or stopping playback also stops recording.

## Supported Sources

The default recorder supports the following scene objects and serialized properties:

| Object      | Recorded properties                 | Generated command                     |
|-------------|-------------------------------------|---------------------------------------|
| Main Camera | Position, rotation, ortho size, FOV | `@camera offset: rotation: zoom:`     |
| Characters  | Position, rotation and scale        | `@char ID position: rotation: scale:` |
| Backgrounds | Position, rotation and scale        | `@back ID position: rotation: scale:` |

The default recorder does not capture actor appearance or visibility, project and prefab assets, or changes made by runtime scripts, animations, and Timeline. It observes serialized changes to scene objects made through Unity's editor modification system, such as moving an object with a Scene view gizmo or changing a value in the Inspector.

## Custom Recorders

To support additional scene objects or change how commands are generated, add a C# class with a parameterless constructor that implements `ISceneRecorder`. Place it in an editor-only assembly, such as under an `Assets/Editor` directory. Naninovel will automatically use your custom implementation instead of the default one.

In your custom implementation you can inherit the default `SceneRecorder` class and modify its output. The following example records changes to a light's intensity with a custom command:

```cs
public class CustomRecorder : SceneRecorder
{
    // invoked on scene changes while recording
    public override void Record (
        // input: scene changes to record
        IReadOnlyList<SceneChange> changes,
        // output: recorded scenario lines
        List<string> lines)
    {
        // retain the default behaviour (optional)
        base.Record(changes, lines);
        // scan the current batch of scene changes
        foreach (var change in changes)
            // find the object and property we are interested in
            if (change is { Target: Light light, Property: "m_Intensity" })
                // record the change in scenario script
                lines.Add($"@light power:{light.intensity}");
    }
}
```

Each `SceneChange` identifies the Unity object that owns the modified serialized property and the property's serialized path. Append complete NaniScript command lines to `lines`. You can also remove or modify the `lines` list elements to customize or disable the default behaviour.
