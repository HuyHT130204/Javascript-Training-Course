// Defining the road network
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

// Converting the road list into a graph
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
    if (graph[from] == null) {
        graph[from] = [to];
    } else {
        graph[from].push(to);
    }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

// The village state class
class VillageState {
    constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
    }

    move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
        return this;
    } else {
        let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
    }
    }
}

// Creating a random state
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
        place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

// Route finding function
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
        }
    }
    }
}

// The different robots
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
    memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
    } else {
        route = findRoute(roadGraph, place, parcel.address);
    }
    }
    return {direction: route[0], memory: route.slice(1)};
}

// Function to count steps for a robot
function countRobotSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    }
}

// Exercise 1: Measuring a Robot
function compareRobots(robot1, memory1, robot2, memory2) {
    let totalSteps1 = 0;
    let totalSteps2 = 0;
    const taskCount = 100;
    
    for (let i = 0; i < taskCount; i++) {
    // Generate the same random task for both robots
    let state = VillageState.random();
    
    // Measure first robot
    totalSteps1 += countRobotSteps(state, robot1, memory1);
    
    // Measure second robot on the same task
    totalSteps2 += countRobotSteps(state, robot2, memory2);
    }
    
    console.log(`Robot 1 average: ${totalSteps1 / taskCount} steps per task`);
    console.log(`Robot 2 average: ${totalSteps2 / taskCount} steps per task`);
}

// Exercise 2: Robot Efficiency
function lazyRobot({place, parcels}, route) {
    // If we already have a route, stick to it
    if (route.length > 0) {
    return {direction: route[0], memory: route.slice(1)};
    }
    
    // Consider all possible routes to pickup or deliver a parcel
    let routes = parcels.map(parcel => {
    if (parcel.place != place) {
        // This parcel needs to be picked up - find route to it
        return {
        route: findRoute(roadGraph, place, parcel.place),
        pickUp: true,
        parcel
        };
    } else {
        // This parcel needs to be delivered - find route to its address
        return {
        route: findRoute(roadGraph, place, parcel.address),
        pickUp: false,
        parcel
        };
    }
    });

    // If no routes found (shouldn't happen), move randomly
    if (routes.length == 0) {
    return {direction: randomPick(roadGraph[place])};
    }
    
    // Score the routes based on distance and parcel criteria
    function scoreRoute(route) {
    // Route efficiency: shorter is better
    let score = route.route.length == 0 ? 0 : 1/route.route.length;
    
    // Prioritize pickup slightly more (1.5x) to reduce total trips
    if (route.pickUp) score *= 1.5;
    
    return score;
    }
    
    // Choose the route with the highest score
    let bestRoute = routes.reduce((a, b) => scoreRoute(a) > scoreRoute(b) ? a : b);
    
    return {direction: bestRoute.route[0], memory: bestRoute.route.slice(1)};
}

// Run the comparison
console.log("Comparing goalOrientedRobot vs lazyRobot:");
compareRobots(goalOrientedRobot, [], lazyRobot, []);