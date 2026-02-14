import { test, expect } from "vitest";
import { tokenize } from "./tokenize";

// comment lines
test("comment line", snap(`; Foo Comment`));

// label lines
test("label line", snap(`# FooLabel`));
test("label line indented", snap(`    # FooLabel`));
test("label line with comment", snap(`# FooLabel ; Bar comment`));

// command lines
test("command line", snap(`@fooCommand`));
test("command line indented", snap(`    @fooCommand`));
test("command line with comment", snap(`@fooCommand ; Bar comment`));
test("command line with nameless parameter", snap(`@fooCommand namelessParameterValue`));
test("command line with named parameter", snap(`@cmd paramId:paramValue`));
test("command line with nameless and named parameters", snap(`@cmd namelessParamValue paramId:paramValue`));
test("command line with multiple parameters", snap(`@cmd namelessParamValue x:foo y:bar z:baz`));
test("command line with boolean flags", snap(`@cmd foo! !bar baz! far!`));
test("command line with parameters and boolean flags", snap(`@cmd x foo:true !bar baz:false far!`));
test("command line with parameters and comment", snap(`@cmd foo x:bar y:baz ; comment`));
test("command line with quoted values", snap(`@cmd "quoted foo" x:"quoted bar"`));
test("command line with expressions in values", snap(`@cmd x{ foo() ? bar : baz }x x:{expr}`));
test("command line with escaped values", snap(`@cmd \\"x\\{y\\}\\:\\" x:\\"x\\{y\\}\\"`));
test("command line with text identifier in value", snap(`@cmd "foo |#TextId|{expr}bar|#ID|" x:baz|#ID|`));

// generic text lines
test("generic text line", snap(`Lorem ipsum.`));
test("generic text line indented", snap(`    Lorem ipsum.`));
test("generic text line with author", snap(`AuthorId: Lorem ipsum.`));
test("generic text line with author indented", snap(`    AuthorId: Lorem ipsum.`));
test("generic text line with author and appearance", snap(`AuthorId.AppearanceId: Lorem ipsum.`));
test("generic text line with inlined commands", snap(`Lorem[-] []ipsum[cmd param:value].[>]`));
test("generic text line with formatting tags", snap(`x <b>x</b> <ruby="X">x</ruby> x <font=x>x</font>`));
test("generic text line with special tags", snap(`<->x</option1/option2/option3>x<@cmd param>x<:expr>x`));
test("generic text line with text identifiers", snap(` text|#TextId|`));
test("generic text line with mixed content", snap(`X.Y: \\{x\\}{exp}\\[x\\][cmd x x:y{exp}z|#ID| wait! !z][< as:"x"]`));
test("generic text line with comments", snap(`x[; comment]y[cmd ; comment]`));

// hardcoded expression contexts of well-known commands and parameters
test("nameless parameter value of if command is expression", snap(`@if expression x!`));
test("nameless parameter value of if command is expression with curlies", snap(`@if { expression } x!`));
test("nameless parameter value of if inlined command is expression", snap(`[if expression x!]`));
test("nameless parameter value of unless command is expression", snap(`@unless expression x!`));
test("nameless parameter value of unless inlined command is expression", snap(`[unless x x!]`));
test("nameless parameter value of while command is expression", snap(`@while expression x!`));
test("nameless parameter value of set command is expression", snap(`@set expression x!`));
test("if parameter value is expression", snap(`@cmd if:expression`));
test("if parameter value is expression with curlies", snap(`@cmd if:{expression}`));
test("if parameter value is expression with escapes", snap(`@cmd if:x="Saying \\"Stop the car\\" was a mistake."`));
test("if parameter value inside inlined command is expression", snap(`[cmd if:expression]`));
test("unless parameter value is expression", snap(`@cmd unless:expression`));
test("unless parameter value inside inlined command is expression", snap(`[cmd unless:expression]`));
test("set parameter value is expression", snap(`@cmd set:expression`));

// hardcoded navigation contexts of well-known commands and parameters
test("nameless parameter value of goto command is navigation", snap(`@goto navigation`));
test("nameless parameter value of gosub command is navigation", snap(`@gosub navigation`));
test("goto parameter value is navigation", snap(`@cmd goto:navigation`));
test("gosub parameter value is navigation", snap(`@cmd gosub:navigation`));

function snap(...lines: string[]): () => Promise<void> {
    return async () => expect(await tokenize(lines)).toMatchSnapshot();
}
