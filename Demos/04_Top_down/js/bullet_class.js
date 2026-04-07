class Bullet extends AnimatedObject {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.velocity = new Vec(0, 0);
        this.destroy = false;
        this.speed = 0.005;
        this.angle = 0;
    }

    // Compute the correct velocity angle to get to the destination
    setVelocity(destinationX, destinationY) {
        const moveVector = new Vec(destinationX, destinationY).minus(this.position).normalize();
        // The angle is used to rotate the sprite
        this.angle = Math.atan2(moveVector.y, moveVector.x);
        this.velocity = moveVector.times(this.speed);
    }

    update(level, deltaTime) {
        // Find out where the bullet should end if it moves
        let newPosition = this.position.plus(this.velocity.times(deltaTime));

        // Move only if the bullet does not move inside a wall
        if (! level.contact(newPosition, this.size, 'wall')) {
            this.position = newPosition;
        } else {
            this.destroy = true;
        }

        this.updateFrame(deltaTime);
        this.updateCollider();
    }

    // Override the parent's draw method
    draw(ctx, scale) {
        // Store the current transformation matrix
        ctx.save();
        // Apply the required rotation around the bullet center
        ctx.translate(this.position.x * scale, this.position.y * scale);
        ctx.rotate(this.angle);
        ctx.translate(-this.position.x * scale, -this.position.y * scale);
        // Draw the bullet
        ctx.drawImage(this.spriteImage,
                      this.spriteRect.x * this.spriteRect.width,
                      this.spriteRect.y * this.spriteRect.height,
                      this.spriteRect.width,
                      this.spriteRect.height,
                      (this.position.x - this.halfSize.x) * scale,
                      (this.position.y - this.halfSize.y) * scale,
                      this.size.x * scale,
                      this.size.y * scale);
        // Recover any previous transformations
        ctx.restore();

        if (showBBox) this.drawBoundingBox(ctx, scale);
    }
}
