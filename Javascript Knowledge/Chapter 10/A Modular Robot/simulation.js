const {VillageState} = require("./state");

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length === 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

exports.runRobot = runRobot;
