/*
 * Shooting bullets using the mouse as a pointer
 * Reference for mouse events:
 * https://javascript.info/mouse-events-basics
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

"use strict";

//import { Vector } from "./libs/Vector";
//import { GameObject } from "./libs/GameObject";
//import { Player } from "./libs/Player";
//import { Bullet } from "./libs/Bullet";
//import { boxOverlap, randomRange } from "./libs/game_functions";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;
let canvas;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime;

let playerSpeed = 0.2;
let bulletSpeed = 0.4;

// Dictionary for the keys that will control player movement
const keyDirections = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
    // TODO: Add the keys for the arrows to trigger movement as well

};

// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.nextActorTime = randomRange(500, 1000);
        this.generateTime = 0;
    }

    initObjects() {
        this.player = new Player(
            new Vector(canvasWidth / 2, canvasHeight / 2),
            60,
            60,
            "red"
        );
        this.player.setCollider(60, 60);
        this.player.setSpeed(playerSpeed);
        this.actors = [];
        this.playerBullets = [];

        for (let i=0; i<10; i++) {
            this.addBox();
        }
    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        for (let bullet of this.playerBullets) {
            bullet.draw(ctx);
        }
        this.player.draw(ctx);
    }

    update(deltaTime) {
        // Delete the destroyed actors
        this.actors = this.actors.filter(actor => !actor.destroy);

        // Delete the destroyed bullets
        this.playerBullets = this.playerBullets.filter(bullet => !bullet.destroy);
        // Move the bullets
        for (let bullet of this.playerBullets) {
            bullet.update(deltaTime, ctx.canvas);
        }
        // Move the player
        this.player.update(deltaTime, ctx.canvas);

        this.checkCollisions();

        this.generateTime += deltaTime;
        // Generate new boxes at random intervals
        if (this.generateTime > this.nextActorTime) {
            this.addBox();
            this.nextActorTime = randomRange(500, 1000);
            this.generateTime = 0;
        }
    }

    addBox() {
        // Create boxes with minimum size 50, and up to 50 pixels more
        const size = randomRange(50, 50);
        const posX = randomRange(canvasWidth - size);
        const posY = randomRange(canvasHeight - size);
        const box = new GameObject(
            new Vector(posX, posY),
            size,
            size,
            "grey"
        );
        box.destroy = false;
        this.actors.push(box);
    }

    checkCollisions() {
        // Check collision against other objects
        for (let actor of this.actors) {
            // With the player
            if (boxOverlap(this.player.collider, actor.collider)) {
                actor.color = "yellow";
            } else {
                actor.color = "grey";
            }

            // With the bullets
            for (let bullet of this.playerBullets) {
                if (boxOverlap(bullet.collider, actor.collider)) {
                    bullet.destroy = true;
                    actor.destroy = true;
                }
            }
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', event => {
            // Detect the predefined keys for movement and store the direction
            if (event.key in keyDirections) {
                this.addKey(keyDirections[event.key]);
            }
        });

        window.addEventListener('keyup', event => {
            // Detect the predefined keys for movement and remove the direction
            if (event.key in keyDirections) {
                this.delKey(keyDirections[event.key]);
            }
        });

        canvas.addEventListener('click', event => {
            if (event.button == 0) {
                // Identify the location of the canvas within the window
                const rect = canvas.getBoundingClientRect();
                // Get the coordinates where the mouse was in the window
                // Adjust those coordinates to the area of the canvas
                const canX = event.clientX - rect.left;
                const canY = event.clientY - rect.top;

                // Create a new bullet
                this.addBullet(canX, canY);
            }

        });
    }

    // Add directions to the keys array for character movement
    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    // Remove directions from the keys array for character movement
    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
    }

    // Instantiate a new bullet
    addBullet(clickX, clickY) {
        // TODO: Instantiate a new object of Bullet class


        // Compute the direction for the bullet movement,
        // based on the position of the mouse
        // TODO: Assign the bullet velocity vector, computed as Click position minus object position

        // TODO: Add the bullet to the list in the game object

    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}


//main();
