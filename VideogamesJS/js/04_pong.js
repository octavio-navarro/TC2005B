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

let oldTime;
const paddleVelocity = 1.0;
const speedIncrease = 1.1;
const initialSpeed = 0.5;

let leftScore = 0;
let rightScore = 0;

// Context of the Canvas
let ctx;

// Clases for the Pong game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
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

// An object to represent the box to be displayed
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "red");
const leftPaddle = new Paddle(new Vec(20, canvasHeight / 2), 20, 100, "blue");
const rightPaddle = new Paddle(new Vec(canvasWidth - 40, canvasHeight / 2), 20, 100, "blue");
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "black", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "black", "obstacle");
const leftGoal = new GameObject(new Vec(0, 0), 20, canvasHeight, "green", "leftGoal");
const rightGoal = new GameObject(new Vec(canvasWidth -20, 0), 20, canvasHeight, "green", "rightGoal");
const leftLabel = new TextLabel(100, 50, "40px Ubuntu Mono", "white")
const rightLabel = new TextLabel(500, 50, "40px Ubuntu Mono", "white")


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createEventListeners();

    drawScene(0);
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key == 'q') {
            leftPaddle.velocity = new Vec(0, -paddleVelocity);
        } else if (event.key == 'a') {
            leftPaddle.velocity = new Vec(0, paddleVelocity);
        } else if (event.key == 'o' || event.code == 'ArrowUp') {
            rightPaddle.velocity = new Vec(0, -paddleVelocity);
        } else if (event.key == 'l' || event.code == 'ArrowDown') {
            rightPaddle.velocity = new Vec(0, paddleVelocity);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'q') {
            leftPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'a') {
            leftPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'o' || event.code == 'ArrowUp') {
            rightPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'l' || event.code == 'ArrowDown') {
            rightPaddle.velocity = new Vec(0, 0);
        }

        if (event.key == 's' && !box.inPlay) {
            box.initVelocity();
        }
    });
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    leftLabel.draw(ctx, `${leftScore}`);
    rightLabel.draw(ctx, `${rightScore}`);
    leftGoal.draw(ctx);
    rightGoal.draw(ctx);
    topBar.draw(ctx);
    bottomBar.draw(ctx);
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
    box.draw(ctx);

    //console.log(`DeltaTime: ${deltaTime}`);
    // Update the properties of the object
    box.update(deltaTime);
    leftPaddle.update(deltaTime);
    rightPaddle.update(deltaTime);

    if (boxOverlap(box, leftPaddle) || boxOverlap(box, rightPaddle)) {
        box.velocity.x *= -1;
        box.velocity = box.velocity.times(speedIncrease);
    }
    if (boxOverlap(box, topBar) || boxOverlap(box, bottomBar)) {
        box.velocity.y *= -1;
        box.velocity = box.velocity.times(speedIncrease);
    }
    if (boxOverlap(box, leftGoal)) {
        rightScore += 1;
        box.reset();
    }
    if (boxOverlap(box, rightGoal)) {
        leftScore += 1;
        box.reset();
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
