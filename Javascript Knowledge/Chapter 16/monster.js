// monster.js - Adds monster enemies to the game

// Monster class for enemy characters
class Monster {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.squished = false;
        this.deathCountdown = null;
    }
    
    get type() { 
        return this.squished ? "squished" : "monster"; 
    }
    
    static create(pos) {
        return new Monster(pos.plus(new Vec(0, -0.5)), new Vec(2, 0));
    }
    
    update(time, state) {
        // If monster is squished, count down to removal
        if (this.squished) {
            this.deathCountdown -= time;
            if (this.deathCountdown <= 0) {
                // Return null to remove the monster from actors array
                return null;
            }
            return this;
        }
        
        // Otherwise, move like horizontal lava
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Monster(newPos, this.speed);
        } else {
            return new Monster(this.pos, this.speed.times(-1));
        }
    }
    
    // Called when player touches monster
    collide(state) {
        let player = state.player;
        
        // Check if player is landing on top of monster
        // We look specifically at the position and velocity
        let playerAbove = player.pos.y + player.size.y < this.pos.y + 0.1;
        let playerFalling = player.speed.y > 0;
        
        if (playerAbove && playerFalling) {
            // Player is above monster and falling onto it - monster gets squished
            
            // Create squished version of this monster
            let squished = new Monster(this.pos, new Vec(0, 0));
            squished.squished = true; 
            squished.deathCountdown = 0.5; // Disappear after 0.5 seconds
            
            // Make a list of actors with this monster replaced by squished version
            let actors = state.actors.map(a => {
                if (a === this) return squished;
                if (a.type === "player") {
                    // Give player a bounce
                    return new Player(a.pos, new Vec(a.speed.x, -jumpSpeed / 2));
                }
                return a;
            });
            
            // Return a new state with the updated actors
            return new State(state.level, actors, "playing");
        } else {
            // Player touched monster from side or bottom - player loses
            // But we make sure the monster isn't already squished
            if (!this.squished) {
                return new State(state.level, state.actors, "lost");
            } else {
                // If monster is already squished, collision doesn't harm player
                return state;
            }
        }
    }
}

// Set monster size
Monster.prototype.size = new Vec(1.2, 1.2);

// Add monster to level character mapping
levelChars["M"] = Monster;

// We need to override the original State.update to fix a potential issue
// with detecting monster collisions
const originalStateUpdate = State.prototype.update;
State.prototype.update = function(time, keys) {
    // First update all actors (including squished monsters)
    let actors = this.actors
        .map(actor => actor.update(time, this, keys))
        .filter(actor => actor !== null); // Remove any null actors (like expired squished monsters)
    
    let newState = new State(this.level, actors, this.status);
    
    // If game is already over, just return the new state
    if (newState.status !== "playing") return newState;
    
    // Check for player collision with lava
    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost");
    }
    
    // Check for collisions with other actors
    for (let actor of actors) {
        if (actor !== player && overlap(actor, player)) {
            newState = actor.collide(newState);
            // If the game ended from this collision, return immediately
            if (newState.status !== "playing") return newState;
        }
    }
    
    return newState;
};
