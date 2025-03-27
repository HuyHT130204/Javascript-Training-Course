// Mock implementations of required functions for demonstration
const network = (nest) => {
    return ['Big Oak', 'Church Tower', 'Cow Pasture', 'Gilles Garden'];
};

const storage = (nest, name) => {
    // Simulated storage with predefined scalpel locations
    const storageData = {
    'Big Oak': 'Church Tower',
    'Church Tower': 'Cow Pasture',
    'Cow Pasture': 'Gilles Garden',
    'Gilles Garden': 'Gilles Garden'
    };
    return Promise.resolve(storageData[nest.name]);
};

const routeRequest = (nest, target, type, content) => {
    // Simulated route request
    return Promise.resolve(storage(nest, content));
};

function anyStorage(nest, source, name) {
    if (source === nest.name) return storage(nest, name);
    return routeRequest(nest, source, "storage", name);
}

// Exercise 1: Tracking the Scalpel (Async/Await Version)
async function locateScalpel(nest) {
    let current = nest.name;
    
    while (true) {
    let next = await anyStorage(nest, current, "scalpel");
    
    if (next === current) {
        return current;
    }
    
    current = next;
    }
}

// Exercise 1: Tracking the Scalpel (Promise Version)
function locateScalpelPromise(nest) {
    let current = nest.name;
    
    function follow(currentNest) {
    return anyStorage(nest, currentNest, "scalpel")
        .then(next => {
        if (next === currentNest) {
            return currentNest;
        }
        return follow(next);
        });
    }
    
    return follow(current);
}

// Exercise 2: Building Promise.all
function Promise_all(promises) {
    return new Promise((resolve, reject) => {
    // Handle empty array
    if (promises.length === 0) {
        resolve([]);
        return;
    }
    
    let results = new Array(promises.length);
    let completed = 0;
    
    promises.forEach((promise, index) => {
        Promise.resolve(promise)
        .then(value => {
            results[index] = value;
            completed++;
            
            if (completed === promises.length) {
            resolve(results);
            }
        })
        .catch(reject);
    });
    });
}

// Demonstration and Testing Function
function runExercises() {
    console.log("Exercise 1: Tracking the Scalpel");
    
    // Mock nest object
    const mockNest = { name: 'Big Oak' };
    
    // Test Async/Await Version
    locateScalpel(mockNest)
    .then(location => {
        console.log("Scalpel location (Async/Await):", location);
    })
    .catch(error => {
        console.error("Error in Async/Await version:", error);
    });
    
    // Test Promise Version
    locateScalpelPromise(mockNest)
    .then(location => {
        console.log("Scalpel location (Promise):", location);
    })
    .catch(error => {
        console.error("Error in Promise version:", error);
    });
    
    // Exercise 2: Promise.all Implementation
    console.log("\nExercise 2: Building Promise.all");
    
    // Test Promise_all with resolving promises
    Promise_all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
    ])
    .then(results => {
    console.log("Promise_all resolved results:", results);
    })
    .catch(error => {
    console.error("Promise_all error:", error);
    });
    
    // Test Promise_all with a mix of resolving and rejecting promises
    Promise_all([
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3)
    ])
    .then(results => {
    console.log("This should not be printed");
    })
    .catch(error => {
    console.log("Promise_all caught error:", error);
    });
}

// Run the demonstrations
runExercises();
