console.log("Module B is loading...");
const moduleA = require('./moduleA');

// At this point, moduleA.exports is {} because A hasn't exported anything yet
console.log("Module A currently provides:", moduleA.valueFromA);

exports.valueFromB = "This is B";
console.log("Module B is done loading");
