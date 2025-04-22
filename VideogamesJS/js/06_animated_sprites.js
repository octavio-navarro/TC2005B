/*
 * Simple animation on the HTML canvas
 *
 * Gilberto Echeverria
 * 2025-04-21
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

let playerSpeed = 0.5;
let animationDelay = 200;

const keyDirections = {
    w: "up",
    s: "down",
    a: "left",
    d: "right",
}

const playerMovement = {
    up: {
        axis: "y",
        direction: -1,
        frames: [0, 2],
        repeat: true,
        duration: animationDelay
    },
    down: {
        axis: "y",
        direction: 1,
        frames: [6, 8],
        repeat: true,
        duration: animationDelay
    },
    left: {
        axis: "x",
        direction: -1,
        frames: [9, 11],
        repeat: true,
        duration: animationDelay
    },
    right: {
        axis: "x",
        direction: 1,
        frames: [3, 5],
        repeat: true,
        duration: animationDelay
    },
    idle: {
        axis: "y",
        direction: 0,
        frames: [7, 7],
        repeat: true,
        duration: animationDelay
    }
};

// Class for the main character in the game
class Player extends AnimatedObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vec(0, 0);
        this.keys = []
        this.previousDirection = "down";
        this.currentDirection = "down";
    }

    update(deltaTime) {
        this.setVelocity();
        this.setMovementAnimation();

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.constrainToCanvas();

        this.updateFrame(deltaTime);
    }

    constrainToCanvas() {
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

    setVelocity() {
        this.velocity = new Vec(0, 0);
        for (const key of this.keys) {
            const move = playerMovement[key];
            this.velocity[move.axis] += move.direction;
        }
        this.velocity = this.velocity.normalize().times(playerSpeed);
    }

    setMovementAnimation() {
        // Identify the current movement direction
        if (Math.abs(this.velocity.y) > Math.abs(this.velocity.x)) {
            if (this.velocity.y > 0) {
                this.currentDirection = "down";
            } else if (this.velocity.y < 0) {
                this.currentDirection = "up";
            } else {
                this.currentDirection = "idle";
            }
        } else {
            if (this.velocity.x > 0) {
                this.currentDirection = "right";
            } else if (this.velocity.x < 0) {
                this.currentDirection = "left";
            } else {
                this.currentDirection = "idle";
            }
        }

        // Select the correct animation
        if (this.currentDirection != this.previousDirection) {
            const anim = playerMovement[this.currentDirection];
            this.setAnimation(...anim.frames, anim.repeat, anim.duration);
        }

        // Update direction
        this.previousDirection = this.currentDirection;
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    initObjects() {
        this.player = new Player(new Vec(canvasWidth / 2, canvasHeight / 2), 60, 60, "red", 3);
        //this.player.setSprite('../assets/sprites/link_front.png')
        this.player.setSprite('../assets/sprites/blordrough_quartermaster-NESW.png',
                              new Rect(48, 128, 48, 64));
        this.player.setAnimation(7, 7, false, animationDelay);
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
            if (Object.keys(keyDirections).includes(event.key)) {
                this.add_key(keyDirections[event.key]);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (Object.keys(keyDirections).includes(event.key)) {
                this.del_key(keyDirections[event.key]);
            }
        });
    }

    add_key(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    del_key(direction) {
        let index = this.player.keys.indexOf(direction);
        if (index != -1) {
            this.player.keys.splice(index, 1);
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

    game.draw(ctx);
    game.update(deltaTime);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
