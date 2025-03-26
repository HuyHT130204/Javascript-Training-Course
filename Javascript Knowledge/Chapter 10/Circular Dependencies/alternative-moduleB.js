console.log("Alternative Module B is loading...");
const moduleA = require('./alternative-moduleA');

// Here, moduleA.exports will still be {}, even after A finishes execution
console.log("Alternative Module A currently provides:", moduleA.valueFromA);

exports.valueFromB = "This is B";
console.log("Alternative Module B is done loading");
