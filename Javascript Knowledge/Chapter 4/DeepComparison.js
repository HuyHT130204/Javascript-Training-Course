function deepEqual(a, b) {
    // Check if they're strictly equal
    if (a === b) return true;

    // Check if either is null or not an object
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") {
        return false;
    }

    // Get keys from both objects
    let keysA = Object.keys(a);
    let keysB = Object.keys(b);

    // Check if they have the same number of keys
    if (keysA.length != keysB.length) return false;

    // Check if all keys from a exist in b and have equal values
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false;
        }
    }

    return true;
}

// Test cases
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, extra: 3}));
// → false
console.log(deepEqual(obj, {here: {is: "not"}, object: 2}));
// → false
