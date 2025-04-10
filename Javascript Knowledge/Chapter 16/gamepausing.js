// gamepausing.js - Adds pause functionality to the game

// Create a dedicated key tracker for the Escape key
function trackEscKey() {
    let down = Object.create(null);
    
    function track(event) {
      if (event.key === "Escape") {
        // Only register keydown events for Escape to prevent repeated toggling
        if (event.type === "keydown") {
          down.pressed = true;
        }
        event.preventDefault();
      }
    }
    
    window.addEventListener("keydown", track);
    
    // Method to check and reset the pressed state
    down.checkAndReset = function() {
      if (down.pressed) {
        down.pressed = false;
        return true;
      }
      return false;
    };
    
    // Method to unregister event handlers
    down.unregister = function() {
      window.removeEventListener("keydown", track);
    };
    
    return down;
}
  
// Create the Escape key handler
const escapeKey = trackEscKey();

// Create pause overlay
function createPauseOverlay(parent) {
    const overlay = document.createElement("div");
    overlay.className = "pause-overlay";
    overlay.textContent = "PAUSED";
    parent.appendChild(overlay);
    return overlay;
}
  
// Modified runAnimation function with pause capability
function runAnimationWithPause(frameFunc) {
    let lastTime = null;
    let frame;
    let paused = false;
    let pauseOverlay = null;
    
    function animate(time) {
        // Check for pause toggle
        if (escapeKey.checkAndReset()) {
            paused = !paused;
            
            if (pauseOverlay) {
                pauseOverlay.style.display = paused ? "flex" : "none";
            }
        }
        
        if (paused) {
            frame = requestAnimationFrame(animate);
            return;
        }
        
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        frame = requestAnimationFrame(animate);
    }
    
    frame = requestAnimationFrame(animate);
    
    return {
        setPauseOverlay(overlay) {
            pauseOverlay = overlay;
        },
        cancel() { 
            cancelAnimationFrame(frame);
        }
    };
}
  
// Modified runLevel function with pause functionality
function runLevelWithPause(level, Display) {
    let display = new Display(document.getElementById('game-container'), level);
    let pauseOverlay = createPauseOverlay(display.dom);
    let state = State.start(level);
    let ending = 1;
    
    return new Promise(resolve => {
        let animation = runAnimationWithPause(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
        
        animation.setPauseOverlay(pauseOverlay);
    });
}
  
// Modified runGame function with lives system and pause functionality
async function runGameWithPause(plans, Display) {
    // Start with 3 lives
    let lives = 3;
    const livesDisplay = document.getElementById('lives-display');
  
    for (let level = 0; level < plans.length;) {
        // Display current lives count
        livesDisplay.textContent = `Lives: ${lives}`;
        
        let status = await runLevelWithPause(new Level(plans[level]), Display);
        
        if (status == "won") {
            level++; // Move to next level when won
        } else {
            lives--; // Lose a life when lost
            livesDisplay.textContent = `Lives: ${lives}`;
            
            if (lives <= 0) {
                // Game over - restart from beginning
                alert("Game over! Starting over.");
                level = 0;
                lives = 3;
            }
        }
    }
    
    livesDisplay.textContent = "You've won!";
    alert("You've won!");
    escapeKey.unregister(); // Clean up at the end
}
  
// Initialize and run the game when the page loads
window.addEventListener('load', () => {
    runGameWithPause(GAME_LEVELS, DOMDisplay);
});
