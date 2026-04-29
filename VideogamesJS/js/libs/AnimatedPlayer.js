/*
 * Class for the principal game object in a simple game
 * This object will have animation for some of its actions
 *
 * Gilberto Echeverria
 * 2026-02-22
 */

//import { Vector } from "./Vector.js";
//import { AnimatedObject } from "./AnimatedObject.js";

class AnimatedPlayer extends AnimatedObject {
    constructor( position, width, height, color, sheetCols, motion ) {
        super(
            position,
            width,
            height,
            color,
            "player",
            sheetCols
        );
        this.velocity = new Vector(0, 0);
        // Default value for player speed
        this.speed = 1.0;
        this.sheetCols = sheetCols;

        // Keys pressed to move the player
        this.keys = [];

        // Data structure with the directions a character can move, the
        // direction sign and the related animation.
        this.motion = motion;
    }

    update(deltaTime, canvas) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;

            // Adapt the animation according to the direction
            const dirData = this.motion[direction];
            // Make changes only if the direction is different
            if (!dirData.status) {
                dirData.status = true;
                this.setAnimation(...dirData.moveFrames, dirData.repeat, dirData.duration);
            }
        }
        // Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(this.speed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

        // Restrict the player to move only within the canvas area
        this.clampWithinCanvas(canvas);

        // Update to show then next frame when necessary
        this.updateFrame(deltaTime);

        // Change the collider's position
        this.updateCollider();
    }

    clampWithinCanvas(canvas) {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvas.height) {
            this.position.y = canvas.height - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvas.width) {
            this.position.x = canvas.width - this.halfSize.x;
        }
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }


    startMovement(direction) {
        // Check whether we are already moving in a direction
        const dirData = this.motion[direction];
        // Make changes only if the direction is different
        if (!dirData.status) {
            dirData.status = true;
            this.setAnimation(...dirData.moveFrames, dirData.repeat, dirData.duration);
        }
    }

    stopMovement(direction) {
        const dirData = this.motion[direction];
        dirData.status = false;
        this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
    }

}
