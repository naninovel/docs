# Automated Testing

When working on large projects and/or with multiple team members modifying scenario scripts or gameplay logic, it's essential to make sure the game is functioning properly before publishing it. Due to interactive nature, games often require heavy manual testing; but with simpler visual novels it's possible to automate the process.

Naninovel provides tools under `Naninovel.E2E` namespace to help build end-to-end tests by composing sequences of simulated user interactions while the game is running. Combined with [Unity's test tools](https://docs.unity3d.com/Packages/com.unity.test-framework@latest), you can build automated test suites that will run in editor, on the target device or on CI.

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## Getting Started

Open "Test Runner" tab via `Window -> General -> Test Runner` editor menu and follow the instructions to set up play mode test; find more info in the [UTF guide](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/workflow-create-playmode-test.html). Make sure to reference Naninovel's common, runtime and E2E assemblies to make the required APIs available. Below is an example of the test assembly setup:

![](https://i.gyazo.com/8b8cb5c916987d941cce8abf6daf131b.png)

In case Naninovel is installed as a UPM package, you may also have to [make it testable](https://docs.unity3d.com/Manual/cus-tests.html#tests) via the project's `Packages/manifest.json`, eg:

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

The tests will run asynchronously, so you'll need to use `[UnityTest]` attribute and return `IEnumerator` from the test methods; for example, here is a simple method that ensures player can start new game:

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E()
    .Once(() => Engine.GetService<IUIManager>().GetUI<ITitleUI>().Visible)
    .Click("NewGameButton")
    .Ensure(() => Engine.GetService<IScriptPlayer>().Playing);
```

After the script is compiled, go to Test Runner tab and find the newly added test. When run, it will wait until `ITitleUI` is shown, then attempt to find and click button attached to "NewGameButton" object and ensure script started playing. Should any of the steps fail, the test will stop and associated record will be marked with a red cross in Unity's test runner.

::: warning
Disable "Initialize On Application Load" in engine configuration before running the tests. To retain the auto initialization during normal usage, use `Runtime Initializer` component applied to a game object on main scene; find more info about engine initialization [in the guide](/guide/integration-options#manual-initialization).
:::

## Shortcuts

To help compose concise test suits, [static-import](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#static-modifier) `Naninovel.E2E.Shortcuts` class; it contains various helpful shortcuts to make the tests more compact and easier to read. For example, here is the above test re-written with the help of shortcuts:

```csharp
[UnityTest]
public IEnumerator CanStartGame () => new E2E().StartNew().Ensure(Playing);
```

## Suite Configuration

While end-to-end tests are expected to be as close to real usage scenario as possible, you'll still have to tweak various parameters to make testing more practical. Like, you probably wouldn't want to specify "click" sequences each time player is expected to click to continue reading; similarly, various effects, such as UI fading or camera animations take time during playback, but there is no sense in waiting for all that during tests.

To configure the engine specifically when running tests, use various `With` methods available on `E2E` instance. For example, below will override timescale and reveal delay, to make all the effects run very fast and also will activate continue input each time it's requested:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E()
    .WithConfig<ScriptPlayerConfiguration>(c => c.SkipTimeScale = 999)
    .WithConfig<TextPrintersConfiguration>(c => c.MaxRevealDelay = 0)
    .With(() => Service<IScriptPlayer>().OnWaitingForInput += _ => Input("Continue").Activate(1))
```

— as this is a common configuration, it can be applied via `WithFastForward` extension:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E().WithFastForward()
```

Another common scenario is to set up clean engine state, so that when each test starts running, global, settings and game state is not affected by anything that may be stored from previous test runs or play sessions.

You'll probably also would like to store test-specific data in memory, so that it's not serialized to disk. All this can be accomplished with `WithTransientState` extension method; additionally, the method allows to specify initial global and settings state:

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

— above will initialize the engine with clean state, simulating first game launch; but will additionally set `g_completedX` and `g_completedY` global variables to true.

## Composing Sequences

When testing branching scenarios, you may find yourself repeating common interaction sequences to describe the many possible ways player can complete them. To minimize the boilerplate, the sequence object implement `ISequence` interface, which is accepted by all the test APIs. Using this, you can store common sequences in variables and compose them inside other, more general sequences.

Below is a sample test, which ensures "TrueRoute" UI shows in title menu after player completes common, X and Y routes:

```csharp
[UnityTest]
public IEnumerator WhenXYRoutesCompleteTrueUnlocks () => new E2E()
    .WithTransientState().WithFastForward()
    .StartNew().Play(CommonX, RouteX)
    .StartNew().Play(CommonY, RouteY)
    .Once(InTitle).Ensure(() => UI("TrueRoute").Visible);

ISequence CommonX => Play(D1QuickX, D2TowardX, D3LooseHP);
ISequence CommonY => Play(D1QuickY, D2TowardY, D3LooseX);

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

As you've noticed above, choices can be referenced in the tests via strings like `d1-qte-x`. Those are custom [text identifiers](/guide/naninovel-scripts#text-identification) assigned in scenario scripts. Even when stable text identification is enabled, you can still define custom text IDs in the scripts and they will be preserved by the system. For example, consider following scenario script:

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

It may be helpful to check if a script line or command was executed during tests. When composing tests, you'd like to be sure player can actually see all the available content. When a command is not executed after all the tests passed, it may indicate an issue in the scenario logic or an incomplete test suite.

By default, after all E2E tests are finished, coverage report is logged to the console:

![](https://i.gyazo.com/95beca8fb15948d5ea8645d9d199e957.png)

— first line summarizes coverage as the ratio of covered to total commands count in all the scenario scripts. Lines below show coverage per script; in case script has uncovered commands, it'll also show line numbers containing the commands.

In case you'd like to disable the coverage, disable `Cover` option in `E2E` constructor, eg:

```csharp
[UnityTest]
public IEnumerator Test () => new E2E(new Options { Cover = false })
```
