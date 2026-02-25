/*
 * Class for a simple bullet that can be fired by the player or enemies
 *
 * Gilberto Echeverria
 * 2026-02-16
 */

//import { Vector } from "./Vector.js";
//import { GameObject } from "./GameObject.js";

// Class for the bullets
class Bullet extends GameObject {
    constructor(position, width, height, color, speed) {
        super(position, width, height, color, "bullet");
        this.velocity = new Vector(0, 0);
        this.destroy = false;
        this.speed = speed;
        this.angle = 0;
        // Bullets will dissapear after a limited time
        this.maxLife = 2000;
        this.lifeTime = 0;
        // Rotation of the object depending on the sprite used
        this.spriteRotation = 0;
    }

    setVelocity(dirX, dirY) {
        // Use the expected direction to set the speed
        const moveVector = new Vector(dirX, dirY).normalize();
        this.angle = Math.atan2(moveVector.y, moveVector.x);
        this.velocity = moveVector.times(this.speed);
    }

    setSpriteRotation(spriteRotation) {
        this.spriteRotation = spriteRotation;
    }

    update(deltaTime, canvas) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.checkAlive();
        this.updateCollider(canvas);
    }

    checkAlive() {
        if (this.lifeTime > this.maxLife ||
            this.position.y < 0 ||
            this.position.y > canvas.height ||
            this.position.x < 0 ||
            this.position.x > canvas.width) {
            // Mark the bullet to be destroyed in the next frame
            this.destroy = true;
        }
    }

    // Override the parent's draw method
    draw(ctx) {
        // Store the current transformation matrix
        ctx.save();
        // Apply the required rotation around the bullet center
        ctx.translate(this.position.x, this.position.y);
        // Add the rotation of the sprite to the direction of motion
        ctx.rotate(this.angle + this.spriteRotation);
        ctx.translate(-this.position.x, -this.position.y);
        // Draw the bullet
        super.draw(ctx);
        // Recover any previous transformations
        ctx.restore();
    }
}

