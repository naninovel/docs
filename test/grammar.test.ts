import { snapshot as s } from "./common";

// comment lines
s(`; Foo Comment`);

// label lines
s(`# FooLabel`);
s(`    # FooLabel`);
s(`# FooLabel ; Bar comment`);

// command lines
s(`@fooCommand`);
s(`    @fooCommand`);
s(`@fooCommand ; Bar comment`);
s(`@fooCommand namelessParameterValue`);
s(`@cmd paramId:paramValue`);
s(`@cmd namelessParamValue paramId:paramValue`);
s(`@cmd namelessParamValue x:foo y:bar z:baz`);
s(`@cmd foo! !bar baz! far!`);
s(`@cmd x foo:true !bar baz:false far!`);
s(`@cmd foo x:bar y:baz ; comment`);
s(`@cmd "quoted foo" x:"quoted bar"`);
s(`@cmd x{ foo() ? bar : baz }x x:{expr}`);
s(`@cmd \\"x\\{y\\}\\:\\" x:\\"x\\{y\\}\\"`);
s(`@cmd "foo |#TextId|{expr}bar|#ID|" x:baz|#ID|`);
s(`@cmd value with space param: not : param otherParam:not : param wow!`);
s(`    @cmd space with { expression } ! wow! id:possible in named { as well } !wow`);
s(`@cmd escape \\" quotes \\", \\{ expr \\}, param\\:val and flag\\! id:val flag!`);

// generic text lines
s(`Lorem ipsum.`);
s(`    Lorem ipsum.`);
s(`AuthorId: Lorem ipsum.`);
s(`    AuthorId: Lorem ipsum.`);
s(`AuthorId.AppearanceId: Lorem ipsum.`);
s(`Lorem[-] []ipsum[cmd param:value].[>]`);
s(`x <b>x</b> <ruby="X">x</ruby> x <font=x>x</font>`);
s(`<->x</option1/option2/option3>x<@cmd param>x<:expr>x`);
s(` text|#TextId|`);
s(`X.Y: \\{x\\}{exp}\\[x\\][cmd x x:y{exp}z|#ID| wait! !z][< as:"x"]`);
s(`x[; comment]y[cmd ; comment]`);
s(`x[cmd space in value param!]y[cmd p1: not : param\\! p2:space {exp} not\\:param\\!]`);

// hardcoded expression contexts of well-known commands and parameters
s(`@if expression x!`);
s(`@if x > y ? z : w x!`);
s(`@if { expression } x!`);
s(`[if expression x!]`);
s(`[if x > y ? z : w x!]`);
s(`@unless expression x!`);
s(`[unless x x!]`);
s(`@while expression x!`);
s(`@set expression x!`);
s(`@cmd if:expression x:y`);
s(`@cmd if: x > y ? z : w x!`);
s(`@cmd if:{expression} x!`);
s(`@cmd if:x="Saying \\"Stop the car\\" was a mistake."`);
s(`[cmd if:expression]`);
s(`[cmd if: x > y ? z : w x!]`);
s(`@cmd unless:expression`);
s(`[cmd unless:expression]`);
s(`@cmd set:expression`);

// hardcoded navigation contexts of well-known commands and parameters
s(`@goto navigation`);
s(`@gosub navigation`);
s(`@cmd goto:navigation`);
s(`@cmd gosub:navigation`);
