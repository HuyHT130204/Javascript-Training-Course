class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.8) {
    throw new MultiplicatorUnitFailure("Klunk");
  }
  return a * b;
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) {
        throw e; // Re-throw any unexpected exceptions
      }
      // Otherwise, just try again
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64 (eventually)
