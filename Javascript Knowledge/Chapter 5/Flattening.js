function flatten(arrays) {
    return arrays.reduce((result, array) => result.concat(array), []);
  }
  
// Test
console.log(flatten([[1, 2, 3], [4, 5], [6]]));
// → [1, 2, 3, 4, 5, 6]
