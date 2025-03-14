// Define characterScript function
function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => code >= from && code < to)) {
        return script;
      }
    }
    return null;
  }
  
  // Define countBy function
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name === name);
        if (known === -1) {
        counts.push({name, count: 1});
        } else {
        counts[known].count++;
        }
    }
    return counts;
}
  
  // SCRIPTS data (simplified version)
const SCRIPTS = [
    {
    name: "Latin",
    ranges: [[0x0000, 0x024F], [0x1E00, 0x1EFF]],
    direction: "ltr"
    },
    {
    name: "Arabic",
    ranges: [[0x0600, 0x06FF], [0x0750, 0x077F]],
    direction: "rtl"
    },
    {
    name: "Hebrew",
    ranges: [[0x0590, 0x05FF]],
    direction: "rtl"
    }
    // Full data would include many more scripts
];
  
function dominantDirection(text) {
    // Count characters by script
    let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
    
    // If no scripts found with direction, return ltr as default
    if (counted.length == 0) return "ltr";
    
    // Return the direction with the highest count
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

// Test
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("مرحبا"));
// → rtl
