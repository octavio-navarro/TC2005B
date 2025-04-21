/*
 * Implementation of the game of Pong
 *
 * Gilberto Echeverria
 * 2025-02-25
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Variable to store the times for the frames
let oldTime;

// Global settings
const paddleVelocity = 0.8;
const speedIncrease = 1.05;
const initialSpeed = 0.3;

// Context of the Canvas
let ctx;

// The game object
let game;

// Clases for the Pong game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
        // Update the position using a constant velocity
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let angle = Math.random() * (Math.PI / 2) - (Math.PI / 4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
        // Select a random direction for the serve
        this.velocity.x *= (Math.random() < 0.5) ? 1 : -1;
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight) {
            this.position.y = canvasHeight - this.height;
        }
    }
}

// Class that controls all the objects in the game
class Game {
    constructor(canvasWidth, canvasHeight) {
        // An object to represent the box to be displayed
        this.box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "red");
        // The paddles that will be controlled by the players
        this.leftPaddle = new Paddle(new Vec(20, canvasHeight / 2), 20, 100, "blue");
        this.rightPaddle = new Paddle(new Vec(canvasWidth - 40, canvasHeight / 2), 20, 100, "blue");
        // Top and bottom bars where the ball can bounce
        this.topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "black", "obstacle");
        this.bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "black", "obstacle");
        // Goals on the sides. If the ball touches them a player scores
        this.leftGoal = new GameObject(new Vec(0, 0), 2, canvasHeight, "green", "leftGoal");
        this.rightGoal = new GameObject(new Vec(canvasWidth -2, 0), 2, canvasHeight, "green", "rightGoal");
        // Text labels to show the game score
        this.leftLabel = new TextLabel(200, 100, "40px Ubuntu Mono", "white")
        this.rightLabel = new TextLabel(600, 100, "40px Ubuntu Mono", "white")

        this.leftScore = 0;
        this.rightScore = 0;

        this.createEventListeners();
    }

    update(deltaTime) {
        // Identify if the ball hits a paddle, then bounce back horizontally
        if (boxOverlap(this.box, this.leftPaddle) || boxOverlap(this.box, this.rightPaddle)) {
            this.box.velocity.x *= -1;
            this.box.velocity = this.box.velocity.times(speedIncrease);
        }
        // If the ball hits a wall, bounce back vertically
        if (boxOverlap(this.box, this.topBar) || boxOverlap(this.box, this.bottomBar)) {
            this.box.velocity.y *= -1;
            this.box.velocity = this.box.velocity.times(speedIncrease);
        }
        // Score when the ball hits a goal
        if (boxOverlap(this.box, this.leftGoal)) {
            this.rightScore += 1;
            this.box.reset();
        }
        if (boxOverlap(this.box, this.rightGoal)) {
            this.leftScore += 1;
            this.box.reset();
        }

        // Update the positions of the objects
        this.box.update(deltaTime);
        this.leftPaddle.update(deltaTime);
        this.rightPaddle.update(deltaTime);
    }

    draw(ctx) {
        // Draw the background objects first
        this.leftLabel.draw(ctx, `${this.leftScore}`);
        this.rightLabel.draw(ctx, `${this.rightScore}`);
        this.leftGoal.draw(ctx);
        this.rightGoal.draw(ctx);
        this.topBar.draw(ctx);
        this.bottomBar.draw(ctx);
        this.leftPaddle.draw(ctx);
        this.rightPaddle.draw(ctx);
        // Draw the ball last
        this.box.draw(ctx);
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'q') {
                this.leftPaddle.velocity = new Vec(0, -paddleVelocity);
            } else if (event.key == 'a') {
                this.leftPaddle.velocity = new Vec(0, paddleVelocity);
            } else if (event.key == 'o' || event.code == 'ArrowUp') {
                this.rightPaddle.velocity = new Vec(0, -paddleVelocity);
            } else if (event.key == 'l' || event.code == 'ArrowDown') {
                this.rightPaddle.velocity = new Vec(0, paddleVelocity);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'q') {
                this.leftPaddle.velocity = new Vec(0, 0);
            } else if (event.key == 'a') {
                this.leftPaddle.velocity = new Vec(0, 0);
            } else if (event.key == 'o' || event.code == 'ArrowUp') {
                this.rightPaddle.velocity = new Vec(0, 0);
            } else if (event.key == 'l' || event.code == 'ArrowDown') {
                this.rightPaddle.velocity = new Vec(0, 0);
            }

            if (event.key == 's' && !this.box.inPlay) {
                this.box.initVelocity();
            }
        });
    }
}


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    game = new Game(canvasWidth, canvasHeight);

    drawScene(0);
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    //console.log(`DeltaTime: ${deltaTime}`);

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update all game objects
    game.update(deltaTime);

    // Draw all game objects
    game.draw(ctx);

    // Update the time for the next frame
    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
