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

// SOLUTION: Arrays Exercise
// Add array creation function
topScope.array = function(...values) {
    return values;
};

// Add length function for arrays
topScope.length = function(array) {
    return array.length;
};

// Add element access function
topScope.element = function(array, n) {
    return array[n];
};

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

// Test the array implementation
run(`
do(
    define(arr, array(1, 2, 3, 4, 5)),
    print(arr),
    print(length(arr)),
    print(element(arr, 2))
)
`);

// Demonstration of a more complex example
run(`
do(
    define(sum, fun(arr,
    do(
        define(total, 0),
        define(i, 0),
        while(<(i, length(arr)),
        do(
            define(total, +(total, element(arr, i))),
            define(i, +(i, 1))
        )),
        total
    )
    )),
    define(numbers, array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)),
    print(sum(numbers))
)
`);
