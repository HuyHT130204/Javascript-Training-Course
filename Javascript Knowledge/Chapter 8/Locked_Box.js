const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
    }
};

function withBoxUnlocked(body) {
    // Store the original locked state
    const wasLocked = box.locked;
    
    // Only unlock if it's currently locked
    if (wasLocked) {
    box.unlock();
    }
    
    try {
    // Run the function
    return body();
    } finally {
    // Restore to original locked state
    if (wasLocked) {
        box.lock();
    }
    }
}

// Test 1: Normal operation
withBoxUnlocked(function() {
    box.content.push("gold piece");
});

// Test 2: Exception handling
try {
    withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}

console.log(box.locked);
// → true

// Extra test for the additional requirement
box.unlock();
withBoxUnlocked(function() {
    box.content.push("silver piece");
});
console.log(box.locked);
// → false (box stays unlocked if it was already unlocked)
