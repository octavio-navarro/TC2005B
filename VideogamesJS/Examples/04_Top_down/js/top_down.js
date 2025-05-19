/*
 * Simple top down adventure game
 * Reference for mouse events:
 * https://javascript.info/mouse-events-basics
 *
 * Gilberto Echeverria
 * 2025-02-05
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let canvas;
let ctx;
let canvasRect;

// Timestamp for the previous frame
let frameStart;

// Global game variables
let game;
let level;

// Speed in sprites per second, to be multiplied by the scale
let playerSpeed = 0.005;

// Scale of the whole world, to be applied to all objects
// Each unit in the level file will be drawn as these many square pixels
let scale = 29;
// Variable with reference to the HTML slider to adjust the scale
let scaleSlider = undefined;


class Coin extends AnimatedObject {
    constructor(_color, width, height, x, y, _type) {
        super("yellow", width, height, x, y, "coin");
    }

    update(_level, deltaTime) {
        this.updateFrame(deltaTime);
    }
}


class Game {
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = level.player;
        this.actors = level.actors;
        this.enemies = level.enemies;

        this.playerBullets = [];
        this.enemyBullets = [];

        // Sound samples
        this.coinSoundElement = document.createElement("audio");
        this.coinSoundElement.src = "../assets/sfx/coins/coin1.wav";

        // Background music
        this.bgMusicElement = document.createElement("audio");
        this.bgMusicElement.src = "../assets/music/sanctuary_dungeon.mp3";
        // Set the music to play again when it finishes
        this.bgMusicElement.loop = true;
        // A more complicated method, as used at:
        //https://stackoverflow.com/questions/3273552/html5-audio-looping
        //this.bgMusicElement.addEventListener("ended", function() {
        //    this.currentTime = 0;
        //    this.play();
        //}, false);

        //console.log(level);
        this.labelMoney = new TextLabel(20, canvasHeight - 30,
                                        "30px Ubuntu Mono", "white");
        this.labelDebug = new TextLabel(400, canvasHeight - 110,
                                        "20px Ubuntu Mono", "yellow");
    }

    update(deltaTime) {
        this.player.update(this.level, deltaTime);

        for (let enemy of this.enemies) {
            enemy.update(this.level, deltaTime);
        }

        for (let actor of this.actors) {
            actor.update(this.level, deltaTime);
        }

        this.playerInteraction();
        this.enemyInteraction();

        // Check which bullets can be removed from the list
        this.playerBullets = this.playerBullets.filter(bullet => !bullet.destroy);
        // Draw the active bullets
        for (let bullet of this.playerBullets) {
            bullet.update(this.level, deltaTime);
        }
    }

    playerInteraction() {
        // A copy of the full list to iterate over all of them
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
                    this.coinSoundElement.currentTime = 0;
                    this.coinSoundElement.play();
                }
            }
        }
    }

    enemyInteraction() {
        let currentEnemies = this.enemies;
        // Loop over all enemies
        for (let enemy of currentEnemies) {
            // Loop over all bullets
            for (let bullet of this.playerBullets) {
                if (overlapRectangles(enemy, bullet)) {
                    enemy.takeDamage(30);
                    // Destroy the bullet immediately
                    this.playerBullets = this.playerBullets.filter(item => item !== bullet);
                    // Destroy the enemy if it runs out of HP
                    if (enemy.status == "dead") {
                        this.enemies = this.enemies.filter(item => item !== enemy);
                    }
                }
            }
        }
    }

    draw(ctx, scale) {
        for (let actor of this.actors) {
            actor.draw(ctx, scale);
        }
        for (let enemy of this.enemies) {
            enemy.draw(ctx, scale);
        }
        for (let bullet of this.playerBullets) {
            bullet.draw(ctx, scale);
        }
        this.player.draw(ctx, scale);

        this.labelMoney.draw(ctx, `Money: ${this.player.money}`);

        //this.labelDebug.draw(ctx, `Player bullets: ${this.playerBullets.length}`);
        //this.labelDebug.draw(ctx, `E0 ${this.enemies[0].id} ${this.enemies[0].moveDirection} | E1 ${this.enemies[1].id} ${this.enemies[1].moveDirection}`);
    }

    addBullet(destinationX, destinationY) {
        let item = levelChars["B"];
        const bullet = new Bullet("red", 1, 1,
                                    game.player.position.x,
                                    game.player.position.y,
                                    item.label);
        let instanceRect = new Rect(...item.rectParams);
        bullet.setSprite(item.sprite, instanceRect);
        bullet.sheetCols = item.sheetCols;
        bullet.setAnimation(...item.startFrame, true, 100);

        bullet.setVelocity(destinationX, destinationY);
        game.playerBullets.push(bullet);
    }
}


// Object with the characters that appear in the level description strings
// and their corresponding objects
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    ".": {objClass: GameObject,
          label: "floor",
          sprite: '../assets/sprites/ProjectUtumno_full.png',
          // Rect params shoul be: x, y, width, height
          rectParams: [12, 17, 32, 32]},
    "#": {objClass: GameObject,
          label: "wall",
          sprite: '../assets/sprites/ProjectUtumno_full.png',
          rectParams: [2, 19, 32, 32]},
    "@": {objClass: Player,
          label: "player",
          sprite: '../assets/sprites/link_sprite_sheet.png',
          rectParams: [0, 0, 120, 130],
          sheetCols: 10,
          startFrame: [0, 0]},
    "$": {objClass: Coin,
          label: "collectible",
          sprite: '../assets/sprites/coin_gold.png',
          rectParams: [0, 0, 32, 32],
          sheetCols: 8,
          startFrame: [0, 7]},
    "E": {objClass: Enemy,
          label: "enemy",
          //sprite: '../assets/sprites/ProjectUtumno_full.png',
          //rectParams: [10, 61, 32, 32)},
          sprite: '../assets/sprites/rotting_zombie-NESW.png',
          rectParams: [0, 0, 48, 64],
          sheetCols: 3,
          startFrame: [7, 7]},
    "B": {objClass: Coin,
          label: "playerBullet",
          sprite: '../assets/sprites/staff-shot-02-30x15.png',
          rectParams: [0, 0, 30, 15],
          sheetCols: 3,
          startFrame: [3, 11]},
};

// Callback when the HTML slider for the scale is modified
function updateSlider(value) {
    scale = value;
    scaleSlider.innerHTML = `Scale: ${scale}`;
}


function main() {
    // Set a callback for when the page is loaded,
    // so that the canvas can be found
    window.onload = init;
}

function init() {
    canvas = document.getElementById('canvas');
    //const canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    // Identify the location of the canvas within the window
    canvasRect = canvas.getBoundingClientRect();

    if (!scaleSlider) {
        scaleSlider = document.getElementById("scaleValue");
    }

    gameStart();
}

function gameStart() {
    // Register the game object, which creates all other objects
    game = new Game('paused', new Level(GAME_LEVELS[1]), canvasWidth, canvasHeight);

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

        if (event.key == 'y') showBBox = !showBBox;
        if (event.key == 'u') showColl = !showColl;

        if (event.key == ' ') {
            if (game.state == "paused") {
                game.state = "playing";
                game.bgMusicElement.play();
            } else if (game.state == "playing") {
                game.state = "paused";
                game.bgMusicElement.pause();
            }
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

    // Detect mouse clicks only inside the canvas
    canvas.addEventListener("click", event => {
        // Detect left click
        if (event.button == 0) {
            // Get the coordinates where the mouse was in the window
            // Adjust those coordinates to the area of the canvas
            // Scale down the position by the drawing scale
            const canvasClickX = (event.clientX - canvasRect.left) / scale;
            const canvasClickY = (event.clientY - canvasRect.top) / scale;
            //console.log(`WINDOW CLICK at: ${event.clientX}, ${event.clientY}`);
            //console.log(`CANVAS CLICK at: ${canvasClickX}, ${canvasClickY}`);
            //console.log(`PLAYER POS: ${game.player.position.x}, ${game.player.position.y}`);

            // Create the bullet object
            game.addBullet(canvasClickX, canvasClickY);
        }
    });
}

// Function that will be called for the game loop
function updateCanvas(frameTime) {
    if (game.state == "playing") {
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
    } else {
        game.labelDebug.draw(ctx, "Press spacebar to begin playing");
    }
    requestAnimationFrame(updateCanvas);
}

// Call the start function to initiate the game
main();
