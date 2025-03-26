const {buildGraph} = require("./graph");

// Original roads data from Chapter 7
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

// Convert the roads array to the expected format for buildGraph
const roadPairs = roads.map(road => road.split("-"));

// Build the graph using the imported function
const roadGraph = buildGraph(roadPairs);

// Export the graph
exports.roadGraph = roadGraph;
