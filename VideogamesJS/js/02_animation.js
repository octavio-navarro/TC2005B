/*
 * Simple animation on the HTML canvas
 *
 * Gilberto Echeverria
 * 2025-02-19
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

let oldTime;

// An object to represent the box to be displayed
const box = {
    color: "red",
    size: 200,
    position: new Vec(0, canvasHeight / 2),
    speed: new Vec(0.3, 0.2), // pixels per millisecond
}

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
    ctx.fillStyle = box.color;
    ctx.fillRect(box.position.x, box.position.y, box.size, box.size);

    // Update the properties of the object
    //box.x += box.speed * box.direction * deltaTime;
    box.position = box.position.plus(box.speed.times(deltaTime));

    if (box.position.x + box.size >= canvasWidth || box.position.x < 0) {
        box.speed.x *= -1;
    }
    if (box.position.y + box.size >= canvasHeight || box.position.y < 0) {
        box.speed.y *= -1;
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
