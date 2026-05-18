/*
* File with the description of the class for the main player in the game
*
* Gilberto Echeverria
* 2025-04-02
*/


class Player extends Character {
    constructor(width, height, x, y, type, maxHP) {
        super(width, height, x, y, type, maxHP);
        this.velocity = new Vec(0.0, 0.0);
        this.money = 0;
        this.setMaxHP(100);
        this.hpBar = new MeterBar(70, canvasHeight - 100, 200, 30, "black", "green", 5);

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

        this.updateHit(deltaTime);
        this.updateFrame(deltaTime);
        this.updateCollider();
    }

    startMovement(direction) {
        // Check whether we are already moving in a direction
        const dirData = this.movement[direction];
        // Make changes only if the direction is different
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

    draw(ctx, scale) {
        // Call the draw method of the base class
        super.draw(ctx, scale);
        // Also draw the health bar
        this.drawHealthBar(ctx);
    }

    drawHealthBar(ctx) {
        ctx.font = "30px Ubuntu Mono";
        ctx.fillStyle = "white";
        ctx.fillText(`HP:`, 20, canvasHeight - 78);
        this.hpBar.draw(ctx);
        ctx.font = "20px Ubuntu Mono";
        ctx.fillStyle = "white";
        ctx.fillText(`${this.hp} / ${this.maxHP}`, 90, canvasHeight - 78);
    }
}
