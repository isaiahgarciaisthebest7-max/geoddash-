// --- Refined "Authentic" Physics ---
const config = {
    gravity: 0.95,        // Fast fall for that snappy feel
    jumpForce: -15.5,      // Higher initial burst to clear gaps
    shipForce: -0.85,     // Balanced lift for ship mode
    speed: 450,           // GD "Normal" speed (approx 450px/sec)
    groundY: 350
};

// ... inside the update(dt) function ...

function update(dt) {
    if (gameState !== 'PLAYING') return;

    distance += config.speed * dt;
    
    // 1. CUBE MODE PHYSICS
    if (player.mode === 'CUBE') {
        player.dy += config.gravity; 
        
        // Check if on ground
        if (player.y + player.size >= config.groundY) {
            player.y = config.groundY - player.size;
            player.dy = 0;
            player.rotation = 0; // Snap to flat on ground

            // Buffer jump: if holding space, jump immediately on landing
            if (isPressing) {
                player.dy = config.jumpForce;
            }
        }

        // Apply rotation only while in the air
        if (player.y + player.size < config.groundY) {
            player.rotation += 450 * dt; // Rotates roughly 90deg per jump
        }
    } 
    
    // 2. SHIP MODE PHYSICS
    else if (player.mode === 'SHIP') {
        // Constant gravity vs constant lift
        player.dy += isPressing ? config.shipForce : config.gravity * 0.6;
        
        // Dampen the speed to prevent "teleporting"
        if (player.dy > 8) player.dy = 8;
        if (player.dy < -8) player.dy = -8;
        
        player.rotation = player.dy * 2.5; // Tilt based on vertical speed
    }

    player.y += player.dy;

    // ... rest of your collision and drawing logic ...
}
