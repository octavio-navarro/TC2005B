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

// Context of the Canvas
let ctx;

// Clases for the Pong game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(0.01, 0.01);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

// An object to represent the box to be displayed
const box = new Ball(new Vec(0, canvasHeight / 2), 20, 20, "red");


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');



    drawScene(0);
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    box.draw(ctx);

    //console.log(`DeltaTime: ${deltaTime}`);
    // Update the properties of the object
    box.update(deltaTime);

    /*
    // Make the ball bounde at the boundaries
    if (box.position.x > canvasWidth - box.width) {
        box.direction = -1;
        box.speed += 0.1;
    } else if (box.position.x < 0) {
        box.direction = 1;
        box.speed += 0.1;
    }
    */

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
