# Automated Testing

When working on large projects or with multiple team members modifying scenario scripts or gameplay logic, it's essential to make sure the game functions properly before publishing. Because of their interactive nature, games often require heavy manual testing; but with simpler visual novels it's possible to automate much of the process.

Naninovel provides tools under the `Naninovel.E2E` namespace to help build end-to-end tests by composing sequences of simulated user interactions while the game is running. Combined with [Unity's Test Framework](https://docs.unity3d.com/Packages/com.unity.test-framework@latest), you can build automated test suites that run in the Editor, on target devices, or in CI.

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## Getting Started

Open the "Test Runner" tab via `Window -> General -> Test Runner` in the Unity Editor and follow the instructions to set up Play mode tests; find more info in the [UTF guide](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/workflow-create-playmode-test.html). Make sure to reference Naninovel's common, runtime, and E2E assemblies to make the required APIs available. Below is an example of the test assembly setup:

![](https://i.gyazo.com/8b8cb5c916987d941cce8abf6daf131b.png)

If Naninovel is installed as a UPM package, you may also have to [make it testable](https://docs.unity3d.com/Manual/cus-tests.html#tests) via the project's `Packages/manifest.json`, e.g.:

```json
{
    "dependencies": {
        "com.elringus.naninovel": "...",
        "other-packages": "..."
    },
    "testables": [
        "com.elringus.naninovel"
    ]
}
```

The tests run asynchronously, so you'll need to use the `[UnityTest]` attribute and return `IEnumerator` from test methods. For example, here is a simple method that ensures the player can start a new game:

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E()
    .Once(() => Engine.GetService<IUIManager>().GetUI<ITitleUI>().Visible)
    .Click("NewGameButton")
    .Ensure(() => Engine.GetService<IScriptPlayer>().Playing);
```

After compiling, go to the Test Runner tab and find the newly added test. When run, it will wait until `ITitleUI` is shown, then attempt to find and click the button attached to the `NewGameButton` object and ensure script started playing. If any of the steps fail, the test stops and the associated record is marked with a red cross in the Test Runner.

::: warning
Disable "Initialize On Application Load" in engine configuration before running the tests. To retain auto initialization during normal usage, use the `Runtime Initializer` component applied to a GameObject on the main scene; find more info about engine initialization [in the guide](/guide/integration-options#manual-initialization).
:::

## Shortcuts

To help compose concise test suites, [static-import](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#static-modifier) the `Naninovel.E2E.Shortcuts` class; it contains various helpful shortcuts to make tests more compact and easier to read. For example, here is the above test re-written with the help of shortcuts:

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E().StartNew().Ensure(Playing);
```

## Suite Configuration

While end-to-end tests should be as close to real usage scenarios as possible, you'll still have to tweak various parameters to make testing practical. For example, you probably wouldn't want to specify click sequences each time the player is expected to click to continue reading; similarly, various effects such as UI fading or camera animations take time during playback, and waiting for them in tests is unnecessary.

To configure the engine specifically when running tests, use various `With` methods available on the `E2E` instance. For example, the snippet below overrides timescale and reveal delay to make effects run very fast and activates continue input each time it's requested:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E()
    .WithConfig<ScriptPlayerConfiguration>(c => c.SkipTimeScale = 999)
    .WithConfig<TextPrintersConfiguration>(c => c.MaxRevealDelay = 0)
    .With(() => Service<IScriptPlayer>().OnWaitingForInput += _ => Input("Continue").Activate(1))
```

— as this is a common configuration, it can be applied via the `WithFastForward` extension:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E().WithFastForward()
```

Another common scenario is setting up a clean engine state so that each test starts with global, settings, and game state not affected by previous runs or play sessions.

You'll probably also want to store test-specific data in memory so it's not serialized to disk. All this can be accomplished with `WithTransientState` extension; additionally, the method allows specifying initial global and settings state:

```csharp
[UnityTest]
public IEnumerator WhenTrueCompleteTitleBackChanges () => new E2E()
    .WithTransientState(GlobalStateMap.With(
        new CustomVariableManager.GlobalState {
            GlobalVariables = new[] {
                new CustomVariable("g_completedX", CustomVariableScope.Global, new CustomVariableValue(true)),
                new CustomVariable("g_completedY", CustomVariableScope.Global, new CustomVariableValue(true))
            }
        }))
```

— above will initialize the engine with a clean state, simulating first game launch, but will additionally set `g_completedX` and `g_completedY` global variables to true.

## Composing Sequences

When testing branching scenarios, you may find yourself repeating common interaction sequences to describe the many possible ways a player can complete them. To minimize boilerplate, the sequence object implements `ISequence` interface, which is accepted by all the test APIs. Using this, you can store common sequences in variables and compose them inside other, more general sequences.

Below is a sample test that ensures the "TrueRoute" UI shows in the title menu after the player completes common, X, and Y routes:

```csharp
[UnityTest]
public IEnumerator WhenXYRoutesCompleteTrueUnlocks () => new E2E()
    .WithTransientState().WithFastForward()
    .StartNew().Play(CommonX, RouteX)
    .StartNew().Play(CommonY, RouteY)
    .Once(InTitle).Ensure(() => UI("TrueRoute").Visible);

ISequence CommonX => Play(D1QuickX, D2TowardX, D3LooseHP);
ISequence CommonY => Play(D1QuickY, D2TowardY, D3LooseHP);

ISequence D1QuickX => Once(Choice("d1-qte-x")).Choose("d1-qte-x");
ISequence D1QuickY => Once(Choice("d1-qte-y")).Choose("d1-qte-y");
ISequence D1QuickNone => Once(Choice()).Wait(0.5f);

ISequence D2TowardX => Once(Choosing).Choose("d2-toward-x");
ISequence D2TowardY => Once(Choosing).Choose("d2-toward-y");

ISequence D3LooseHP => Once(Choosing).Choose("d3-loose-hp");
ISequence D3LooseX => Once(Choosing).Choose("d3-loose-x");
ISequence D3LastY => Once(Choosing).Choose("d3-last-y");
ISequence D3LastNah => Once(Choosing).Choose("d3-last-nah");

ISequence RouteX => On(Choosing, Choose(), Var("g_completedX", false));
ISequence RouteY => On(Choosing, Choose(), Var("g_completedY", false));
```

— notice how choice sequences for days 1-3 of the common route leading either to "X" or "Y" routes are composed to `CommonX` and `CommonY` variables, which are in turn composed inside the actual test method.

## Referencing Choices

As shown above, choices can be referenced in tests via strings like `d1-qte-x`. Those are custom [text identifiers](/guide/scenario-scripting#text-identification) assigned in scenario scripts. Even when stable text identification is enabled, you can still define custom text IDs in the scripts and they will be preserved by the system. For example, consider the following scenario script:

```nani
@choice "Choice 1|#my-id-for-choice-1|"
@choice "Choice 2|#my-id-for-choice-2|"
```

— here we've assigned `my-id-for-choice-1` for the first choice and `my-id-for-choice-2` for the second one; actual IDs can be anything, just make sure they're unique inside the script. You can now reference the choices in the tests via the assigned IDs:

```csharp
Once(Choosing).Choose("my-id-for-choice-2")
```

::: tip EXAMPLE
The [E2E sample](/guide/samples#e2e) shows most of the available shortcuts, extensions and testing scenarios.
:::

## Coverage

It may be helpful to check if a script line or command was executed during tests. When composing tests, you'd like to ensure the player can actually see all the available content. When a command is not executed after all tests pass, it may indicate an issue in the scenario logic or an incomplete test suite.

By default, after all E2E tests are finished, a coverage report is logged to the console:

![](https://i.gyazo.com/95beca8fb15948d5ea8645d9d199e957.png)

— the first line summarizes coverage as the ratio of covered to total commands count in all scenario scripts. Lines below show coverage per script; if a script has uncovered commands, it also shows line numbers containing those commands.

If you'd like to disable coverage, disable the `Cover` option in the `E2E` constructor, e.g.:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E(new Options { Cover = false })
```
