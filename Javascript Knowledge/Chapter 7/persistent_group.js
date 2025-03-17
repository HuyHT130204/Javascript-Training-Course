// Exercise 3: Persistent Group
class PGroup {
    constructor(members) {
    this.members = members;
    }
    
    add(value) {
    // Return a new PGroup with the value added if it's not already in the set
    if (this.has(value)) return this;
    return new PGroup([...this.members, value]);
    }
    
    delete(value) {
    // Return a new PGroup without the value if it was in the set
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter(m => m !== value));
    }
    
    has(value) {
    return this.members.includes(value);
    }
}

// Create an empty instance that can be used as a starting point
PGroup.empty = new PGroup([]);

// Example usage and tests
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log("Testing PGroup:");
console.log("a.has('a'):", a.has("a"));     // Should be true
console.log("a.has('b'):", a.has("b"));     // Should be false
console.log("ab.has('a'):", ab.has("a"));   // Should be true
console.log("ab.has('b'):", ab.has("b"));   // Should be true
console.log("b.has('a'):", b.has("a"));     // Should be false
console.log("b.has('b'):", b.has("b"));     // Should be true
