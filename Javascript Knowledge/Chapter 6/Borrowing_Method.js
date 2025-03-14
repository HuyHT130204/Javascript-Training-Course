let map = {
    one: true,
    two: true,
    hasOwnProperty: true
};

// Using call method to borrow hasOwnProperty from Object.prototype
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true

// Alternative approach
console.log({}.hasOwnProperty.call(map, "one"));
// → true
