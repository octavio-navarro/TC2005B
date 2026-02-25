/*
 * Class for the base Game Object used for all the actors in a scene
 *
 * The position of the object is its center.
 *
 * Gilberto Echeverria
 * 2026-02-15
 */

"use strict";

//import { Vector } from "./Vector.js";
//import { Rect } from "./Rect.js";

// Global variables to select whether to display bounding boxes and colliders
let showBBox = false;
let showColl = false;

// Register event listeners to toggle bounding boxes
window.addEventListener('keydown', event => {
    if (event.key == 'y') showBBox = !showBBox;
    if (event.key == 'u') showColl = !showColl;
});



class GameObject {
    constructor(position, width, height, color, type) {
        this.position = position;
        this.size = new Vector(width, height);
        this.halfSize = new Vector(width / 2, height / 2);
        this.color = color;
        this.type = type;
        // Default scale for all new objects
        this.scale = 1.0;

        // Sprite properties
        this.spriteImage = undefined;
        this.spriteRect = undefined;

        // Intialize a collider with the default object size
        this.setCollider(width, height);
    }

    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }

    setScale(scale) {
        this.scale = scale;
    }

    setCollider(width, height) {
        // The top left corner of the collider is offset by half of its size
        this.xOffset = width / 2;
        this.yOffset = height / 2;
        this.colliderWidth = width;
        this.colliderHeight = height;
        this.updateCollider();
    }

    updateCollider() {
        // Adjust the Rect of the object with its position
        this.collider = new Rect(this.position.x - this.xOffset * this.scale,
                                 this.position.y - this.yOffset * this.scale,
                                 this.colliderWidth * this.scale,
                                 this.colliderHeight * this.scale);
    }

    draw(ctx) {
        if (this.spriteImage) {
            if (this.spriteRect) {
                ctx.drawImage(this.spriteImage,
                              // The coordiantes within the image file to show
                              this.spriteRect.x,
                              this.spriteRect.y,
                              this.spriteRect.width,
                              this.spriteRect.height,
                              // The position to draw the image
                              (this.position.x - this.halfSize.x * this.scale),
                              (this.position.y - this.halfSize.y * this.scale),
                              this.size.x * this.scale,
                              this.size.y * this.scale);
            } else {
                ctx.drawImage(this.spriteImage,
                              // The position to draw the image
                              (this.position.x - this.halfSize.x * this.scale),
                              (this.position.y - this.halfSize.y * this.scale),
                              this.size.x * this.scale,
                              this.size.y * this.scale);
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect((this.position.x - this.halfSize.x * this.scale),
                         (this.position.y - this.halfSize.y * this.scale),
                         this.size.x * this.scale,
                         this.size.y * this.scale);
        }

        if (showBBox) this.drawBoundingBox(ctx);
        if (showColl) this.drawCollider(ctx);
    }

    drawBoundingBox(ctx) {
        // Attempt to compose the overlay so it makes the image lighter
        ctx.globalCompositeOperation = "screen";
        // A transparent layer on top
        ctx.fillStyle = "rgb(0.5, 0.5, 0.5, 0.3)";
        ctx.fillRect((this.position.x - this.halfSize.x * this.scale),
                     (this.position.y - this.halfSize.y * this.scale),
                     this.size.x * this.scale,
                     this.size.y * this.scale);
        // Return to default composition type
        ctx.globalCompositeOperation = "source-over";

        // Draw the bounding box of the sprite
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect((this.position.x - this.halfSize.x * this.scale),
                 (this.position.y - this.halfSize.y * this.scale),
                 this.size.x * this.scale,
                 this.size.y * this.scale);
        ctx.stroke();

        // A dot in the center of the sprite
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);
    }

    drawCollider(ctx) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(this.collider.x,
                 this.collider.y,
                 this.collider.width,
                 this.collider.height);
        ctx.stroke();
    }

    // Empty template for all GameObjects to be able to update
    update() {

    }
}
