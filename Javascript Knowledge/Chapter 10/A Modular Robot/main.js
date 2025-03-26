const {VillageState} = require("./state");
const {randomRobot, routeRobot, goalOrientedRobot} = require("./robots");
const {runRobot} = require("./simulation");

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0, total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += runRobot(state, robot1, memory1);
    total2 += runRobot(state, robot2, memory2);
  }
  console.log(`Robot 1 finished in ${total1 / 100} turns on average`);
  console.log(`Robot 2 finished in ${total2 / 100} turns on average`);
}

// Example usage
let state = VillageState.random();
console.log(`Random robot: ${runRobot(state, randomRobot, [])}`);
console.log(`Route robot: ${runRobot(state, routeRobot, [])}`);
console.log(`Goal-oriented robot: ${runRobot(state, goalOrientedRobot, [])}`);

compareRobots(routeRobot, [], goalOrientedRobot, []);
