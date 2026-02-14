# Grammar Test

```nani
; Foo Comment

# FooLabel
    # FooLabel
# FooLabel ; Bar comment

@fooCommand
    @fooCommand
@fooCommand ; Bar comment
@fooCommand namelessParameterValue
@cmd paramId:paramValue
@cmd namelessParamValue paramId:paramValue
@cmd namelessParamValue x:foo y:bar z:baz
@cmd foo! !bar baz! far!
@cmd x foo:true !bar baz:false far!
@cmd foo x:bar y:baz ; comment
@cmd "quoted foo" x:"quoted bar"
@cmd x{ foo() ? bar : baz }x x:{expr}
@cmd \"x\{y\}\:\" x:\"x\{y\}\"
@cmd "foo |#TextId|{expr}bar|#ID|" x:baz|#ID|

Lorem ipsum.
    Lorem ipsum.
AuthorId: Lorem ipsum.
    AuthorId: Lorem ipsum.
AuthorId.AppearanceId: Lorem ipsum.
Lorem[-] []ipsum[cmd param:value].[>]
x <b>x</b> <ruby="X">x</ruby> x <font=x>x</font>
<->x</option1/option2/option3>x<@cmd param>x<:expr>x
 text|#TextId|
X.Y: \{x\}{exp}\[x\][cmd x x:y{exp}z|#ID| wait! !z][< as:"x"]
x[; comment]y[cmd ; comment]

@if expression x!
@if { expression } x!
[if expression x!]
@unless expression x!
[unless x x!]
@while expression x!
@set expression x!
@cmd if:expression
@cmd if:{expression}
@cmd if:x="Saying \"Stop the car\" was a mistake."
[cmd if:expression]
@cmd unless:expression
[cmd unless:expression]
@cmd set:expression

@goto navigation
@gosub navigation
@cmd goto:navigation
@cmd gosub:navigation
```
