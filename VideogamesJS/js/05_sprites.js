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

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime;

let playerSpeed = 1.0;

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "player");
        this.velocity = new Vec(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight) {
            this.position.y = canvasHeight - this.height;
        } else if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    initObjects() {
        this.player = new Player(new Vec(canvasWidth / 2, canvasHeight / 2), 60, 60, "red");
        //this.player.setSprite('../assets/sprites/link_front.png')
        //this.player.setSprite('../assets/sprites/blordrough_quartermaster-NESW.png',
        //                      new Rect(0, 0, 48, 64));
        this.actors = [];
    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.player.draw(ctx);
    }

    update(deltaTime) {
        for (let actor of this.actors) {
            actor.update(deltaTime);
        }
        this.player.update(deltaTime);
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.player.velocity.y = -playerSpeed;
            } else if (event.key == 'a') {
                this.player.velocity.x = -playerSpeed;
            } else if (event.key == 's') {
                this.player.velocity.y = playerSpeed;
            } else if (event.key == 'd') {
                this.player.velocity.x = playerSpeed;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.player.velocity.y = 0;
            } else if (event.key == 'a') {
                this.player.velocity.x = 0;
            } else if (event.key == 's') {
                this.player.velocity.y = 0;
            } else if (event.key == 'd') {
                this.player.velocity.x = 0;
            }
        });
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
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

    game.draw(ctx);
    game.update(deltaTime);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
