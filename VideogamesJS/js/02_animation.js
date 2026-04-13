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

// An object to represent the box to be displayed
const box = {
    color: "red",
    size: 200,
    x: 0,
    y: canvasHeight / 2,
    directionX: 1,
    directionY: 1,
    speed: 2.0,
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    drawScene();
}

function drawScene() {
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.size, box.size);

    // Update the properties of the object
    box.x += box.speed * box.directionX;

    // TODO: Make the box move in X and Y axis
    box.y += box.speed * box.directionY;

    // TODO: Make the box bounce off the walls
    if (box.x + box.size >= canvasWidth || box.x <= 0) {
        box.directionX *= -1;
        box.speed *= 1.05;
        box.size *= 0.95;
    }
    if (box.y + box.size >= canvasHeight || box.y <= 0) {
        box.directionY *= -1;
        box.speed *= 1.05;
        box.size *= 0.95;
    }

    requestAnimationFrame(drawScene);
}
