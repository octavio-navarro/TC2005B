/*
 * First script to draw some figures on the Canvas
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 *
 * Gilberto Echeverria
 * 2025-02-18
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;
const boxSize = 200;

// Context of the Canvas
let ctx;

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    draw();
}

function draw() {
    // Draw a square
    ctx.fillStyle = "red";
    ctx.fillRect(canvasWidth / 2, canvasHeight / 2, boxSize, boxSize);

    // Draw an ellipse
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "green";
    ctx.ellipse(400, 300, 60, 30, Math.PI/4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Draw a circle
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.strokeStyle = "black";
    ctx.ellipse(100, 400, 30, 30, 0, 0, Math.PI * 1.5, false);
    ctx.fill();
    ctx.stroke();

    house();
    drawBunny();

    // TODO: Make different shapes using the canvas 2d functions

    requestAnimationFrame(draw);
}

function drawBunny() {
    // Draw another shape
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    const bunny = {
        x: 500,
        y: 100,
        size: 150
    }

    // Left ear
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(bunny.x + bunny.size / 2 - bunny.size / 4, bunny.y + bunny.size / 2 - bunny.size / 6,
        bunny.size / 6, bunny.size / 3, -Math.PI / 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Right ear
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(bunny.x + bunny.size / 2 + bunny.size / 4, bunny.y + bunny.size / 2 - bunny.size / 6,
        bunny.size / 6, bunny.size / 3, Math.PI / 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    // Face
    ctx.beginPath();
    ctx.ellipse(bunny.x + bunny.size / 2, bunny.y + bunny.size / 2 + bunny.size / 6,
        bunny.size / 3, bunny.size / 3, 0, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

}

function house() {
    // Set line width
    ctx.lineWidth = 10;

    ctx.fillStyle = "black";

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
}
