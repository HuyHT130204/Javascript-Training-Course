const {roadGraph} = require("./roads");

// Display the road graph
console.log("Road graph connections:");
for (let place in roadGraph) {
  console.log(`${place} connects to: ${roadGraph[place].join(", ")}`);
}

// Verify a specific connection
console.log("\nVerifying specific connection:");
console.log(`Does Alice's House connect to Bob's House? ${
  roadGraph["Alice's House"].includes("Bob's House") ? "Yes" : "No"
}`);
