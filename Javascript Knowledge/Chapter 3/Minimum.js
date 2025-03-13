// Write a function min that takes two arguments and returns their minimum
function min(a, b) {
    if (a < b) return a;
    else return b;
  }
  
  // Alternative using Math.min
  // function min(a, b) {
  //   return Math.min(a, b);
  // }
  
console.log(min(0, 10)); // → 0
console.log(min(0, -10)); // → -10
