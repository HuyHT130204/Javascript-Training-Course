function Promise_all(promises) {
    return new Promise((resolve, reject) => {
    // Handle empty array case
    if (promises.length === 0) {
        resolve([]);
        return;
    }
    
    let results = new Array(promises.length);
    let pending = promises.length;
    let failed = false;
    
    // Process each promise in the array
    promises.forEach((promise, index) => {
        // Convert non-promise values to promises
        Promise.resolve(promise)
        .then(result => {
            // Don't do anything if we've already failed
            if (failed) return;
            
            // Store this result in the correct position
            results[index] = result;
            
            // Decrease pending count and check if we're done
            pending--;
            if (pending === 0) {
            resolve(results);
            }
        })
        .catch(error => {
            // If any promise fails, we fail the whole operation
            // Check if we've already failed to avoid calling reject multiple times
            if (!failed) {
            failed = true;
            reject(error);
            }
        });
    });
    });
}

// Test function
function test() {
    function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 100);
    });
    }
    
    // Test with all promises resolving
    Promise_all([soon(1), soon(2), soon(3)]).then(results => {
    console.log('Success:', results); // Should log [1, 2, 3]
    });
    
    // Test with one promise rejecting
    Promise_all([soon(1), Promise.reject('X'), soon(3)])
    .then(results => {
        console.log('Should not get here');
    })
    .catch(error => {
        console.log('Failed:', error); // Should log "Failed: X"
    });
    
    // Test with empty array
    Promise_all([]).then(results => {
    console.log('Empty success:', results); // Should log []
    });
}
