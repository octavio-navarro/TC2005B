/*
 * Using sprites to draw more interesting game objects
 *
 * Gilberto Echeverria
 * 2026-03-03
 */

"use strict";

//import { Vector } from "./libs/Vector";
//import { Rect } from "./libs/Rect";
//import { GameObject } from "./libs/GameObject";
//import { AnimatedPlayer } from "./libs/AnimatedPlayer";
//import { boxOverlap, randomRange } from "./libs/game_functions";
//import { AnimatedObject } from "./libs/AnimatedObject";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime;

let playerSpeed = 0.5;

// Dictionary for the keys that will control player movement
const keyDirections = {
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
    ArrowUp: 'up',
    ArrowLeft: 'left',
    ArrowDown: 'down',
    ArrowRight: 'right',
};

// Data structure with the directions a character can move, the
// direction sign and the related animation.
const playerMotion = {
    up: {
        status: false,
        axis: "y",
        sign: -1,
        repeat: true,
        duration: 100,
        moveFrames: [0, 2],
        idleFrames: [1, 1],
    },
    left: {
        status: false,
        axis: "x",
        sign: -1,
        repeat: true,
        duration: 100,
        moveFrames: [9, 11],
        idleFrames: [10, 10],
    },
    down: {
        status: false,
        axis: "y",
        sign: 1,
        repeat: true,
        duration: 100,
        moveFrames: [6, 8],
        idleFrames: [7, 7],
    },
    right: {
        status: false,
        axis: "x",
        sign: 1,
        repeat: true,
        duration: 100,
        moveFrames: [3, 5],
        idleFrames: [4, 4],
    },
};


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new AnimatedObject(
            new Vector(canvasWidth / 2, canvasHeight / 2),
            canvasWidth,
            canvasHeight,
            "gray",
            "background",
            45
        );
        this.background.setSprite("../assets/sprites/lava_spr_strip45.png",
                                    new Rect(0, 0, 16, 16));

        // TODO: Call the function to run the animation of the object
        //this.background.setAnimation(0, 44, true, 100);

        this.player = new AnimatedPlayer(
            new Vector(canvasWidth / 2, canvasHeight / 2),
            60,
            60,
            "red",
            3,
            playerMotion
        );
        this.player.setSprite('../assets/sprites/blordrough_quartermaster-NESW.png',
                              new Rect(48, 128, 48, 64));
        this.player.setSpeed(playerSpeed);

        this.actors = [];
        for (let i=0; i<10; i++) {
            this.addBox();
        }
    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);

        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.player.draw(ctx);
        //console.log(`Current frame: ${this.player.frame}, repeating: ${this.player.repeat}`);
    }

    update(deltaTime) {
        // Animate the background
        this.background.updateFrame(deltaTime);

        // Move the player
        this.player.update(deltaTime, ctx.canvas);

        // Check collision against other objects
        for (let actor of this.actors) {
            actor.updateFrame(deltaTime);
            /*
            if (boxOverlap(this.player.collider, actor.collider)) {
                //actor.setSprite('../assets/sprites/RTS_Crate_red.png');
            } else {
                //actor.setSprite('../assets/sprites/RTS_Crate.png');
            }
            */
        }
    }

    addBox() {
        // Create boxes with minimum size 50, and up to 50 pixels more
        const size = randomRange(60, 50);
        const posX = randomRange(canvasWidth - size);
        const posY = randomRange(canvasHeight - size);
        const box = new AnimatedObject(
            new Vector(posX, posY),
            size,
            size,
            "gray",
            "obstacle",
            6
        );
        // Add the sprite and indicate the rectangle (mainly for the size)
        box.setSprite('../assets/sprites/artifact_ss.png',
                              new Rect(64, 0, 64, 64));
        // TODO: Call the function to run the animation of the object
        //
        box.destroy = false;
        this.actors.push(box);
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            // Detect the predefined keys for movement and store the direction
            if (event.key in keyDirections) {
                this.addKey(keyDirections[event.key]);
                this.player.startMovement(keyDirections[event.key]);
            }
        });

        window.addEventListener('keyup', (event) => {
            // Detect the predefined keys for movement and remove the direction
            if (event.key in keyDirections) {
                this.delKey(keyDirections[event.key]);
                this.player.stopMovement(keyDirections[event.key]);
            }
        });
    }

    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
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

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}

//main();
