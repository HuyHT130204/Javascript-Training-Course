// Convert array to linked list
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}

// Convert linked list to array
function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

// Add an element to the front of a list
function prepend(element, list) {
    return {value: element, rest: list};
}

// Get the nth element of a list (iterative version)
function nth(list, n) {
    if (!list) return undefined;
    let current = list;
    for (let i = 0; i < n; i++) {
        if (!current.rest) return undefined;
        current = current.rest;
    }
    return current.value;
}

// Get the nth element of a list (recursive version)
function nthRecursive(list, n) {
    if (!list) return undefined;
    if (n === 0) return list.value;
    return nthRecursive(list.rest, n - 1);
}

// Test cases
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nthRecursive(arrayToList([10, 20, 30]), 1));
// → 20
