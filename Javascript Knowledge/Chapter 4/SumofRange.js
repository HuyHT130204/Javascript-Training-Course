// Basic range function that creates an array from start to end (inclusive)
function range(start, end, step = 1) {
    let array = [];
    
    if (step > 0) {
      for (let i = start; i <= end; i += step) {
        array.push(i);
      }
    } else {
      for (let i = start; i >= end; i += step) {
        array.push(i);
      }
    }
    
    return array;
  }
  
  // Sum function that adds all numbers in an array
  function sum(array) {
    let total = 0;
    for (let value of array) {
      total += value;
    }
    return total;
  }
  
// Test cases
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
