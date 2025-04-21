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
let radius = 100;

// An object to represent the box to be displayed
const box = {
    color: "red",
    size: 50,
    x: canvasWidth / 2 - 25,
    y: canvasHeight / 2 - 25,
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

    drawAxes();

    // Update the offset to rotate around the center
    let offsetX = 0;
    let offsetY = 0;


    // Draw the axis
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x + offsetX, box.y + offsetY, box.size, box.size);

    // Update vales for next frame
    angle += 0.1;

    requestAnimationFrame(drawScene);
}

// Draw the reference axes on the canvas
function drawAxes() {
    ctx.beginPath();
    // X axis
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    // Y axis
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.stroke();
}
