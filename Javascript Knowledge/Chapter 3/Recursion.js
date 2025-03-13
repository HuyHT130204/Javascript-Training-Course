// Define a recursive function isEven that determines if a number is even
function isEven(n) {
    // Convert negative numbers to positive
    if (n < 0) return isEven(-n);
    
    // Base cases
    if (n === 0) return true;
    if (n === 1) return false;
    
    // Recursive case: check if n-2 is even
    return isEven(n - 2);
  }
  
console.log(isEven(50)); // → true
console.log(isEven(75)); // → false
console.log(isEven(-1)); // → false
