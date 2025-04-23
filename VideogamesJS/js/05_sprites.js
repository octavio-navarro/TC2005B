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
    },
    down: {
        axis: "y",
        direction: 1,
    },
    left: {
        axis: "x",
        direction: -1,
    },
    right: {
        axis: "x",
        direction: 1,
    },
    idle: {
        axis: "y",
        direction: 0,
    }
};

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vec(0, 0);
        this.keys = []
    }

    update(deltaTime) {
        this.setVelocity();

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.constrainToCanvas();
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

}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
    }

    initObjects() {
        this.player = new Player(new Vec(canvasWidth / 2, canvasHeight / 2), 60, 60, "green", 3);
        this.player.setSprite('../assets/sprites/rogue_spritesheet_calciumtrice.png',
                               new Rect(64, 64, 32, 32));
        //this.player.setSprite('../assets/sprites/blordrough_quartermaster-NESW.png',
        //                      new Rect(48, 128, 48, 64));
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
