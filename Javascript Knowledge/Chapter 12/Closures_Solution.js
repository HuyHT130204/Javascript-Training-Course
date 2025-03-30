// Parsing
function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
    } else {
    throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(") {
    return {expr: expr, rest: program};
    }
    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
        program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
        throw new SyntaxError("Expected ',' or ')'");
    }
    }
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

// Evaluator
const specialForms = Object.create(null);

function evaluate(expr, scope) {
    if (expr.type == "value") {
    return expr.value;
    } else if (expr.type == "word") {
    if (expr.name in scope) {
        return scope[expr.name];
    } else {
        throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
    } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" && operator.name in specialForms) {
        return specialForms[operator.name](args, scope);
    } else {
        let op = evaluate(operator, scope);
        if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
        } else {
        throw new TypeError("Applying a non-function.");
        }
    }
    }
}

// Special Forms
specialForms.if = (args, scope) => {
    if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
    } else {
    return evaluate(args[2], scope);
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
    }
    return false;
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
    value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

// SOLUTION: Closures Explanation
// The key mechanism that enables closures is how the function definition
// captures the lexical environment (scope) where it was defined.
specialForms.fun = (args, scope) => {
    if (!args.length) {
    throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
        throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
    });
    
    // This is where the magic happens:
    // The returned function closes over the 'scope' variable
    // capturing the environment where the function was defined
    return function() {
    if (arguments.length != params.length) {
        throw new TypeError("Wrong number of arguments");
    }
    
    // Create a new local scope that inherits from the captured scope
    let localScope = Object.create(scope);
    
    // Bind parameters in the local scope
    for (let i = 0; i < arguments.length; i++) {
        localScope[params[i]] = arguments[i];
    }
    
    // Evaluate the body in this new scope
    return evaluate(body, localScope);
    };
};

// Environment
const topScope = Object.create(null);
topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
    console.log(value);
    return value;
};

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

// Test the closure mechanism
console.log("\nDemonstrating closure behavior:");
run(`
do(define(f, fun(a, fun(b, +(a, b)))),
    print(f(4)(5)))
`);
// Should output 9

console.log("\nDetailed explanation of why closures work in Egg:");
console.log(`
How Closures Work in Egg
========================

The key mechanism that enables closures in Egg is in the 'fun' special form implementation,
which creates a JavaScript closure that captures the scope where the function was defined.

When specialForms.fun executes, it:
1. Processes the function parameters and body
2. Returns a JavaScript function that "closes over" the 'scope' parameter
3. This function remembers the scope even after the special form call completes

When the returned function is later invoked, it:
1. Creates a new local scope that inherits from the captured scope (via Object.create)
2. Binds the function parameters in this new local scope
3. Evaluates the body in this combined scope environment

In the example "f(4)(5)":
- First, f(4) creates a function with 'a' bound to 4 in its scope
- This function closes over that scope containing 'a'
- When this function is called with 5, it creates a new scope with 'b' = 5
- This new scope inherits from the scope where 'a' = 4
- So when evaluating "+(a, b)", both 'a' and 'b' are accessible
- This gives us 4 + 5 = 9

This is identical to how lexical closures work in JavaScript itself,
which is why we can leverage JavaScript's closure mechanism to implement
closures in our Egg language.
`);

// Another closure example
console.log("\nAnother closure example (counter):");
run(`
do(
    define(makeCounter, fun(
    do(
        define(count, 0),
        fun(
        do(
            define(count, +(count, 1)),
            count
        )
        )
    )
    )),
    define(counter, makeCounter()),
    print(counter()),
    print(counter()),
    print(counter())
)
`);
