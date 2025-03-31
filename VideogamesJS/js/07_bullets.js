/*
 * Shooting bullets using the mouse as a pointer
 * Reference for mouse events:
 * https://javascript.info/mouse-events-basics
 *
 * Gilberto Echeverria
 * 2025-03-27
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;
let canvas;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime;

let playerSpeed = 0.2;
let bulletSpeed = 0.4;

// Dictionary for the keys that will control player movement
const keyDirections = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
};

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "player");
        this.velocity = new Vec(0, 0);

        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
            left: {
                axis: "x",
                sign: -1,
            },
            down: {
                axis: "y",
                sign: 1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(playerSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight) {
            this.position.y = canvasHeight - this.height;
        } else if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}


// Class for the bullets
class Bullet extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "bullet");
        this.velocity = new Vec(0, 0);
        this.destroy = false;
        this.speed = bulletSpeed;
        this.angle = 0;
        // Bullets will dissapear after a limited time
        this.maxLife = 2000;
        this.lifeTime = 0;
    }

    setVelocity(dirX, dirY) {
        const moveVector = new Vec(dirX, dirY).minus(this.position).normalize();
        this.angle = Math.atan2(moveVector.y, moveVector.x);
        this.velocity = moveVector.times(this.speed);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.checkAlive();
    }

    checkAlive() {
        if (this.lifeTime > this.maxLife ||
            this.position.y < 0 ||
            this.position.y + this.height > canvasHeight ||
            this.position.x < 0 ||
            this.position.x + this.width > canvasWidth) {
            // Mark the bullet to be destroyed in the next frame
            this.destroy = true;
        }
    }

    // Override the parent's draw method
    draw(ctx) {
        // Store the current transformation matrix
        ctx.save();
        // Apply the required rotation around the bullet center
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.position.x, -this.position.y);
        // Draw the bullet
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y,
                     this.width, this.height);
        // Recover any previous transformations
        ctx.restore();
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.nextActorTime = randomRange(500, 1000);
        this.generateTime = 0;
    }

    initObjects() {
        this.player = new Player(new Vec(canvasWidth / 2, canvasHeight / 2), 60, 60, "red");
        this.actors = [];
        this.playerBullets = [];

        for (let i=0; i<10; i++) {
            this.addBox();
        }

    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        for (let bullet of this.playerBullets) {
            bullet.draw(ctx);
        }
        this.player.draw(ctx);
    }

    update(deltaTime) {
        // Delete the destroyed actors
        this.actors = this.actors.filter(actor => !actor.destroy);

        // Delete the destroyed bullets
        this.playerBullets = this.playerBullets.filter(bullet => !bullet.destroy);
        // Move the bullets
        for (let bullet of this.playerBullets) {
            bullet.update(deltaTime);
        }
        // Move the player
        this.player.update(deltaTime);

        this.checkCollisions();

        this.generateTime += deltaTime;
        // Generate new boxes at random intervals
        if (this.generateTime > this.nextActorTime) {
            this.addBox();
            this.nextActorTime = randomRange(500, 1000);
            this.generateTime = 0;
        }
    }

    addBox() {
        // Create boxes with minimum size 50, and up to 50 pixels more
        const size = randomRange(50, 50);
        const posX = randomRange(canvasWidth - size);
        const posY = randomRange(canvasHeight - size);
        const box = new GameObject(new Vec(posX, posY), size, size, "grey");
        box.destroy = false;
        this.actors.push(box);
    }

    checkCollisions() {
        // Check collision against other objects
        for (let actor of this.actors) {
            // With the player
            if (boxOverlap(this.player, actor)) {
                actor.color = "yellow";
            } else {
                actor.color = "grey";
            }

            // With the bullets
            for (let bullet of this.playerBullets) {
                if (boxOverlap(bullet, actor)) {
                    bullet.destroy = true;
                    actor.destroy = true;
                }
            }
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', event => {
            // Detect the predefined keys for movement and store the direction
            if (event.key in keyDirections) {
                this.addKey(keyDirections[event.key]);
            }
        });

        window.addEventListener('keyup', event => {
            // Detect the predefined keys for movement and remove the direction
            if (event.key in keyDirections) {
                this.delKey(keyDirections[event.key]);
            }
        });

        canvas.addEventListener('click', event => {
            if (event.button == 0) {
                // Identify the location of the canvas within the window
                const rect = canvas.getBoundingClientRect();
                // Get the coordinates where the mouse was in the window
                // Adjust those coordinates to the area of the canvas
                const canX = event.clientX - rect.left;
                const canY = event.clientY - rect.top;

                // Create a new bullet
                this.addBullet(canX, canY);
            }

        });
    }

    // Add directions to the keys array for character movement
    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    // Remove directions from the keys array for character movement
    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
    }

    // Instantiate a new bullet
    addBullet(clickX, clickY) {
        const bullet = new Bullet(game.player.position, 20, 6, "blue");
        bullet.setVelocity(clickX, clickY);
        game.playerBullets.push(bullet);
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
