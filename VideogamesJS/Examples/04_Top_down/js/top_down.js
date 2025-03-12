/*
 * Simple top down adventure game
 *
 * Gilberto Echeverria
 * 2025-02-05
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let ctx;

let frameStart;

let game;
let player;
let level;

let playerSpeed = 0.005;

// Scale of the whole world, to be applied to all objects
// Each unit in the level file will be drawn as these many square pixels
const scale = 29;


class Player extends AnimatedObject {
    constructor(_color, width, height, x, y, _type) {
        super("green", width, height, x, y, "player");
        this.velocity = new Vec(0.0, 0.0);
        this.money = 0;

        // Movement variables to define directions and animations
        this.movement = {
            right: { status: false,
                     axis: "x",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     //moveFrames: [3, 5],
                     //idleFrames: [4, 4] },
                     moveFrames: [70, 79],
                     idleFrames: [30, 32] },
            left:  { status: false,
                     axis: "x",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     //moveFrames: [9, 11],
                     //idleFrames: [10, 10] },
                     moveFrames: [50, 59],
                     idleFrames: [10, 12] },
            up:    { status: false,
                     axis: "y",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     //moveFrames: [0, 2],
                     //idleFrames: [1, 1] },
                     moveFrames: [60, 69],
                     idleFrames: [20, 20] },
            down:  { status: false,
                     axis: "y",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     //moveFrames: [6, 8],
                     //idleFrames: [7, 7] },
                     moveFrames: [40, 49],
                     idleFrames: [0, 2] },
        };
    }

    update(level, deltaTime) {
        // Find out where the player should end if it moves
        let newPosition = this.position.plus(this.velocity.times(deltaTime));

        // Move only if the player does not move inside a wall
        if (! level.contact(newPosition, this.size, 'wall')) {
            this.position = newPosition;
        }

        this.updateFrame(deltaTime);
    }

    startMovement(direction) {
        const dirData = this.movement[direction];
        if (!dirData.status) {
            dirData.status = true;
            this.velocity[dirData.axis] = dirData.sign * playerSpeed;
            this.setAnimation(...dirData.moveFrames, dirData.repeat, dirData.duration);
        }
    }

    stopMovement(direction) {
        const dirData = this.movement[direction];
        dirData.status = false;
        this.velocity[dirData.axis] = 0;
        this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
    }
}


class Coin extends AnimatedObject {
    constructor(_color, width, height, x, y, _type) {
        super("yellow", width, height, x, y, "coin");
    }

    update(_level, deltaTime) {
        this.updateFrame(deltaTime);
    }
}


class Level {
    constructor(plan) {
        // Split the plan string into a matrix of strings
        let rows = plan.trim().split('\n').map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.actors = [];

        // Fill the rows array with a label for the type of element in the cell
        // Most cells are 'empty', except for the 'wall'
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let item = levelChars[ch];
                let objClass = item.objClass;
                let cellType = item.label;
                // Create a new instance of the type specified
                let actor = new objClass("grey", 1, 1, x, y, item.label);
                // Configurations for each type of cell
                // TODO: Simplify this code, sinde most of it is repeated
                if (actor.type == "player") {
                    // Also instantiate a floor tile below the player
                    this.addBackgroundFloor(x, y);

                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.player = actor;
                    cellType = "empty";
                } else if (actor.type == "coin") {
                    // Also instantiate a floor tile below the player
                    this.addBackgroundFloor(x, y);

                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                } else if (actor.type == "wall") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(31, 10, 17);     // green broken bricks
                    // item.rect = this.randomTile(2, 3, 19);     // green broken bricks
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "wall";
                } else if (actor.type == "floor") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(11, 4, 17);     // beige dirt
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "floor";
                }
                return cellType;
            });
        });
    }

    addBackgroundFloor(x, y) {
        let floor = levelChars['.'];
        let floorActor = new GameObject("grey", 1, 1, x, y, floor.label);
        floor.rect = this.randomTile(11, 4, 17);     // beige dirt
        floorActor.setSprite(floor.sprite, floor.rect);
        this.actors.push(floorActor);
    }

    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return new Rect(tile, y, 32, 32);
    }

    // Detect when the player touches a wall
    contact(playerPos, playerSize, type) {
        // Determine which cells the player is occupying
        let xStart = Math.floor(playerPos.x);
        let xEnd = Math.ceil(playerPos.x + playerSize.x);
        let yStart = Math.floor(playerPos.y);
        let yEnd = Math.ceil(playerPos.y + playerSize.y);

        // Check each of those cells
        for (let y=yStart; y<yEnd; y++) {
            for (let x=xStart; x<xEnd; x++) {
                // Anything outside of the bounds of the canvas is considered
                // to be a wall, so it blocks the player's movement
                let isOutside = x < 0 || x >= this.width ||
                                y < 0 || y >= this.height;
                let here = isOutside ? 'wall' : this.rows[y][x];
                // Detect if an object of type specified is being touched
                if (here == type) return true;
            }
        }
        return false;
    }
}


class Game {
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = level.player;
        this.actors = level.actors;
        //console.log(level);
        this.labelMoney = new TextLabel(20, canvasHeight - 30,
                                        "30px Ubuntu Mono", "white");
    }

    update(deltaTime) {
        this.player.update(this.level, deltaTime);

        for (let actor of this.actors) {
            actor.update(this.level, deltaTime);
        }

        // A copy of the full list to iterate over all of them
        // DOES THIS WORK?
        let currentActors = this.actors;
        // Detect collisions
        for (let actor of currentActors) {
            if (actor.type != 'floor' && overlapRectangles(this.player, actor)) {
                //console.log(`Collision of ${this.player.type} with ${actor.type}`);
                if (actor.type == 'wall') {
                    console.log("Hit a wall");
                } else if (actor.type == 'coin') {
                    this.player.money += 1;
                    this.actors = this.actors.filter(item => item !== actor);
                }
            }
        }
    }

    draw(ctx, scale) {
        for (let actor of this.actors) {
            actor.draw(ctx, scale);
        }
        this.player.draw(ctx, scale);

        this.labelMoney.draw(ctx, `Money: ${this.player.money}`);
    }
}


// Object with the characters that appear in the level description strings
// and their corresponding objects
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    ".": {objClass: GameObject,
          label: "floor",
          sprite: '../assets/sprites/ProjectUtumno_full.png',
          rect: new Rect(12, 17, 32, 32)},
    "#": {objClass: GameObject,
          label: "wall",
          sprite: '../assets/sprites/ProjectUtumno_full.png',
          rect: new Rect(2, 19, 32, 32)},
    "@": {objClass: Player,
          label: "player",
          //sprite: '../assets/sprites/blordrough_quartermaster-NESW.png',
          //rect: new Rect(0, 0, 48, 64),
          //sheetCols: 3,
          //startFrame: [7, 7]},
          sprite: '../assets/sprites/link_sprite_sheet.png',
          rect: new Rect(0, 0, 120, 130),
          sheetCols: 10,
          startFrame: [0, 0]},
    "$": {objClass: Coin,
          label: "collectible",
          sprite: '../assets/sprites/coin_gold.png',
          rect: new Rect(0, 0, 32, 32),
          sheetCols: 8,
          startFrame: [0, 7]},
};


function main() {
    // Set a callback for when the page is loaded,
    // so that the canvas can be found
    window.onload = init;
}

function init() {
    const canvas = document.getElementById('canvas');
    //const canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    gameStart();
}

function gameStart() {
    // Register the game object, which creates all other objects
    game = new Game('playing', new Level(GAME_LEVELS[1]));

    setEventListeners();

    // Call the first frame with the current time
    updateCanvas(document.timeline.currentTime);
}

function setEventListeners() {
    window.addEventListener("keydown", event => {
        if (event.key == 'w') {
            game.player.startMovement("up");
        }
        if (event.key == 'a') {
            game.player.startMovement("left");
        }
        if (event.key == 's') {
            game.player.startMovement("down");
        }
        if (event.key == 'd') {
            game.player.startMovement("right");
        }
    });

    window.addEventListener("keyup", event => {
        if (event.key == 'w') {
            game.player.stopMovement("up");
        }
        if (event.key == 'a') {
            game.player.stopMovement("left");
        }
        if (event.key == 's') {
            game.player.stopMovement("down");
        }
        if (event.key == 'd') {
            game.player.stopMovement("right");
        }
    });
}

// Function that will be called for the game loop
function updateCanvas(frameTime) {
    if (frameStart === undefined) {
        frameStart = frameTime;
    }
    let deltaTime = frameTime - frameStart;
    //console.log(`Delta Time: ${deltaTime}`);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx, scale);

    // Update time for the next frame
    frameStart = frameTime;
    requestAnimationFrame(updateCanvas);
}

// Call the start function to initiate the game
main();
