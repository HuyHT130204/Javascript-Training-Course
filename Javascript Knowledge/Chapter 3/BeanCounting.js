// Count uppercase "B" characters in a string
function countBs(string) {
    return countChar(string, "B");
  }
  
  // Count occurrences of a specified character in a string
  function countChar(string, char) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] === char) {
        count++;
      }
    }
    return count;
  }
  
console.log(countBs("BBC")); // → 2
console.log(countChar("kakkerlak", "k")); // → 4
