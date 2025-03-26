console.log("Module A is loading...");
const moduleB = require('./moduleB');

console.log("Module B provides:", moduleB.valueFromB);

// Export after requiring B
exports.valueFromA = "This is A";
console.log("Module A is done loading");
