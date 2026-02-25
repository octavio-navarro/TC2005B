/*
 * Class for the principal game object in a simple game
 *
 * Gilberto Echeverria
 * 2026-02-16
 */

//import { Vector } from "./Vector.js";
//import { GameObject } from "./GameObject.js";

class Player extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "player");
        this.velocity = new Vector(0, 0);
        // Default value for player speed
        this.speed = 1.0;

        // Data structure with the directions a character can move and the
        // direction sign.
        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
            left: {
                axis: "x",
                sign: -1,
            },
            down: {
                axis: "y",
                sign: 1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
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
        }
        // Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(this.speed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

        // Restrict the player to move only within the canvas area
        this.clampWithinCanvas(canvas);

        // Change the collider's position
        this.updateCollider();
    }

    clampWithinCanvas(canvas) {
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y > canvas.height) {
            this.position.y = canvas.height;
        } else if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x > canvas.width) {
            this.position.x = canvas.width;
        }
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}
