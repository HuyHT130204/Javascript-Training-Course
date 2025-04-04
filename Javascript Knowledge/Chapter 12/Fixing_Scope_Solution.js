// Egg Language Implementation - Fixing Scope Solution

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

// SOLUTION: Add the set special form
specialForms.set = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of set");
    }
    
    const varName = args[0].name;
    const value = evaluate(args[1], scope);
    
    // Start with current scope
    let currentScope = scope;
    
    // Traverse the scope chain to find the binding
    while (currentScope) {
    // Check if this scope has the binding
    if (Object.prototype.hasOwnProperty.call(currentScope, varName)) {
        // Found it, update the value
        currentScope[varName] = value;
        return value;
    }
    // Move up to parent scope
    currentScope = Object.getPrototypeOf(currentScope);
    }
    
    // If we get here, the binding wasn't found
    throw new ReferenceError(`Undefined binding: ${varName}`);
};

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
    return function() {
    if (arguments.length != params.length) {
        throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
        localScope[params[i]] = arguments[i];
    }
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

// Test the set special form
console.log("Testing 'set' special form:");

// Basic test
console.log("\nTest 1: Basic outer scope modification");
run(`
do(
    define(x, 1),
    define(f, fun(
    do(
        set(x, 2),
        print(x)
    )
    )),
    f(),
    print(x)
)
`);
// This should print:
// 2
// 2 (x is modified in outer scope)

// Nested scopes test
console.log("\nTest 2: Multiple levels of scopes");
run(`
do(
    define(x, 1),
    define(f, fun(
    do(
        define(x, 5),  # Creates local x
        define(g, fun(
        set(x, 10)   # Should modify the x in f's scope, not global
        )),
        g(),
        print(x)       # Should print 10
    )
    )),
    f(),
    print(x)           # Should still be 1
)
`);

// Error case - variable not defined
console.log("\nTest 3: Error when variable not defined");
try {
    run(`
    do(
    set(nonExistentVar, 10)
    )
    `);
} catch (error) {
    console.log(`Error (expected): ${error.message}`);
}

// Compare with define
console.log("\nTest 4: Comparing 'set' with 'define'");
run(`
do(
    define(x, 1),
    define(f, fun(
    do(
        define(y, 2),        # Creates local y
        set(x, 3),           # Updates outer x
        print(x),            # Should print 3
        print(y)             # Should print 2
    )
    )),
    f(),
    print(x),                # Should print 3
    
    # This will fail because y only exists in f's local scope
    if(true, s
    print("y is not accessible here"),
    print(y)
    )
)
`);
