/*
 * Basic implementation of the PONG game
 *
 * Gilberto Echeverria
 * 2026-03-11
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let paddleSpeed = 0.5;
let ballSpeed = 0.5;

// Class for the game ball
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0);
    }

    update(deltaTime) {
        this.velocity = this.velocity.normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
            down: {
                axis: "y",
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
        // TODO: Normalize the velocity to avoid greater speed on diagonals

        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/sprites/trak2_plate2b.png");

        this.paddleLeft = new Paddle(new Vector(50, canvasHeight / 2),
                                 20, 200, "red");
        this.paddleRight = new Paddle(new Vector(canvasWidth - 50, canvasHeight / 2),
                                 20, 200, "blue");
        //this.paddleLeft.setSprite("../assets/sprites/blordrough_quartermaster-NESW.png",
                                //        x   y    w   h
                                //new Rect(48, 128, 48, 64));

        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2),
                                20, 20, "white");

        this.actors = [];
        for (let i=0; i<10; i++) {
            this.addBox();
        }
    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);

        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.paddleLeft.draw(ctx);
        this.paddleRight.draw(ctx);

        this.ball.draw(ctx);
    }

    update(deltaTime) {
        // Move the paddleLeft
        this.paddleLeft.update(deltaTime);
        this.paddleRight.update(deltaTime);

        this.ball.update(deltaTime);

        // Check collision against other objects
        for (let actor of this.actors) {
            if (boxOverlap(this.paddleLeft, actor)) {
                //actor.color = "yellow";
                actor.setSprite("../assets/sprites/RTS_Crate_red.png")
            } else {
                //actor.color = "grey";
                actor.setSprite("../assets/sprites/RTS_Crate.png")
            }
        }
    }

    addBox() {
        // TODO: Use the randomRange function to make these values different
        // Create boxes with minimum size 50, and up to 50 pixels more
        const size = randomRange(50, 50);
        // Define a random position for the box, within the canvas
        const posX = randomRange(canvasWidth);
        const posY = randomRange(canvasHeight);
        const box = new GameObject(new Vector(posX, posY), size, size, "grey");
        box.setSprite("../assets/sprites/RTS_Crate.png")
        // Set a property to indicate if the box should be destroyed or not
        box.destroy = false;
        this.actors.push(box);
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.addKey('up', this.paddleLeft);
            } else if (event.key == 's') {
                this.addKey('down', this.paddleLeft);
            }
            if (event.key == 'o') {
                this.addKey('up', this.paddleRight);
            } else if (event.key == 'l') {
                this.addKey('down', this.paddleRight);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.delKey('up', this.paddleLeft);
            } else if (event.key == 's') {
                this.delKey('down', this.paddleLeft);
            }
            if (event.key == 'o') {
                this.delKey('up', this.paddleRight);
            } else if (event.key == 'l') {
                this.delKey('down', this.paddleRight);
            }
        });
    }

    addKey(direction, paddle) {
        if (!paddle.keys.includes(direction)) {
            paddle.keys.push(direction);
        }
    }

    delKey(direction, paddle) {
        if (paddle.keys.includes(direction)) {
            paddle.keys.splice(paddle.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
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
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
