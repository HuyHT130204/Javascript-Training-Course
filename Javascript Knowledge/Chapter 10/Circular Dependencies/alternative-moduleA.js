console.log("Alternative Module A is loading...");
const moduleB = require('./alternative-moduleB');

console.log("Alternative Module B provides:", moduleB.valueFromB);

// Replace the exports object instead of adding to it
module.exports = { valueFromA: "This is A completely replaced" };
console.log("Alternative Module A is done loading");

