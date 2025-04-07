/*
 * Implementation of the game of Pong
 *
 * Gilberto Echeverria
 * 2025-04-07
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

    }

    update(deltaTime) {

    }

    initVelocity() {

    }

    reset() {

    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {

    }

    update(deltaTime) {

    }
}

// Class that controls all the objects in the game
class Game {
    constructor(canvasWidth, canvasHeight) {
        // Create instances for all objects in the game

        this.createEventListeners();
    }

    update(deltaTime) {

    }

    draw(ctx) {
        // Draw all objects in the game
        // Draw from back to front, so objects are not overpainted

    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {

        });

        window.addEventListener('keyup', (event) => {

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
