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

let angle = 0;

// An object to represent the box to be displayed
const box = {
    color: "red",
    size: 200,
    x: canvasWidth / 2,
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

    // Make the box bounce off the walls
    // Double checking the direction before changing, to avoid getting stuck
    // on the borders when changing the size
    if (box.x <= 0 && box.directionX < 0
        || box.x + box.size >= canvasWidth && box.directionX > 0) {
        box.directionX *= -1;
    }
    if (box.y <= 0 && box.directionY < 0
        || box.y + box.size >= canvasHeight && box.directionY > 0) {
        box.directionY *= -1;
    }

    // Update the size of the box
    angle += 0.01;
    box.size = Math.floor(Math.cos(angle) * 50 + 100);
    //console.log(`Angle: ${angle}, Size: ${box.size}`);

    // Update the properties of the object
    box.x += box.speed * box.directionX;
    box.y += box.speed * box.directionY;

    drawObjcet(ctx);

    requestAnimationFrame(drawScene);
}

function drawObjcet(ctx) {
    // Draw a square
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.size, box.size);

    ctx.lineWidth = 2;

    // Draw another shape
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    // Left ear
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(box.x + box.size / 2 - box.size / 4, box.y + box.size / 2 - box.size / 6,
        box.size / 6, box.size / 3, -Math.PI / 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Right ear
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(box.x + box.size / 2 + box.size / 4, box.y + box.size / 2 - box.size / 6,
        box.size / 6, box.size / 3, Math.PI / 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Face
    ctx.beginPath();
    ctx.ellipse(box.x + box.size / 2, box.y + box.size / 2 + box.size / 6,
        box.size / 3, box.size / 3, 0, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}
