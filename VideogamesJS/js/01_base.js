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
    ctx.ellipse(100, 100, 30, 30, 0, 0, Math.PI * 1.5, false);
    ctx.fill();
    ctx.stroke();
}
