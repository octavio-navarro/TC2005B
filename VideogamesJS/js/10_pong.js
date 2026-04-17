/*
 * Simple implementation of the PONG game
 *
 * Gilberto Echeverria
 * 2025-03-13
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
let oldTime;

let ballSpeed = 1;
let paddleSpeed = 5;

// Class for the ball in the game
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(1, 0);
    }

    update(deltaTime) {
        this.velocity = this.velocity.normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
        this.updateCollider();
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
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

        this.updateCollider();
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


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    // Create the objects in the game
    initObjects() {
        // The player controlled paddles
        this.paddleLeft = new Paddle(new Vector(50, canvasHeight / 2), 40, 100, "red");
        this.paddleRight = new Paddle(new Vector(canvasWidth - 50, canvasHeight / 2), 40, 100, "blue");
        // The ball
        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight / 2), 20, 20, "black");
        // The walls at the top and bottom

        // The goals on either side

        this.actors = [
            this.paddleLeft,
            this.paddleRight,
            this.ball
        ];
    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
    }

    update(deltaTime) {
        // Move the paddles
        this.paddleLeft.update(deltaTime);
        this.paddleRight.update(deltaTime);
        // Move the ball
        this.ball.update(deltaTime);

        // Detect collisions with the paddles
        if (boxOverlap(this.paddleLeft, this.ball)
            || boxOverlap(this.paddleRight, this.ball)) {
            this.ball.velocity.x *= -1;
        }
        // Detect collisions with the walls

        // Detect collisions with the goals

    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.addKey('up', this.paddleLeft);
            } if (event.key == 's') {
                this.addKey('down', this.paddleLeft);
            } if (event.key == 'ArrowUp') {
                this.addKey('up', this.paddleRight);
            } if (event.key == 'ArrowDown') {
                this.addKey('down', this.paddleRight);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.delKey('up', this.paddleLeft);
            } if (event.key == 's') {
                this.delKey('down', this.paddleLeft);
            } if (event.key == 'ArrowUp') {
                this.delKey('up', this.paddleRight);
            } if (event.key == 'ArrowDown') {
                this.delKey('down', this.paddleRight);
            }
        });
    }

    // Add the key pressed to the 'keys' array of the object sent
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed from the 'keys' array of the object sent
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
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
    let deltaTime = 1;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
