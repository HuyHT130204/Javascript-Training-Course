// This regexp matches JavaScript-style numbers:
// - Optional plus or minus sign
// - Digits (optional before decimal point)
// - Optional decimal point followed by optional digits
// - Optional exponent notation with optional sign and required digits
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// Test cases
console.log(number.test("1")); // → true
console.log(number.test("-1")); // → true
console.log(number.test("+15")); // → true
console.log(number.test("1.55")); // → true
console.log(number.test(".5")); // → true
console.log(number.test("5.")); // → true
console.log(number.test("1.3e2")); // → true
console.log(number.test("1E-4")); // → true
console.log(number.test("1e+12")); // → true

console.log(number.test(".")); // → false
console.log(number.test("1.2.3")); // → false
console.log(number.test("+-1")); // → false
console.log(number.test("1+1")); // → false
console.log(number.test("1e4.5")); // → false
console.log(number.test("1e")); // → false
console.log(number.test("e3")); // → false
