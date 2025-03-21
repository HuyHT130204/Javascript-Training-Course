function loop(value, test, update, body) {
    for (let current = value; test(current); current = update(current)) {
      body(current);
    }
  }

// Test
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
