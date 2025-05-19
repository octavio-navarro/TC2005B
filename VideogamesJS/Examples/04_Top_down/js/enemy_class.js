/*
 * Description of the class for enemies in the game
 *
 * Drawing enemies of different colors, following the instructions at:
 * https://stackoverflow.com/questions/26502979/blending-different-images-in-canvas/26505047
 *
 * Gilberto Echeverria
 * 2025-04-02
 */


class Enemy extends Character {
    constructor(width, height, x, y, type, maxHP) {
        super(width, height, x, y, type, maxHP);
        this.state = "chase";
        this.speed = 0.0001;
        this.velocity = new Vec(0.0, 0.0);
        this.nextAttack = 1000; // Time before attacking next, in milliseconds
        this.attackTimer = 0;
        this.setMaxHP(100);
        this.moveDirection = "S";

        // Random color overlay
        const colors = ["#ffaaaa", "#aaffaa", "#aaaaff"];
        const colorIndex = Math.floor(Math.random() * colors.length);
        this.randomColor = colors[colorIndex];
    }

    update(level, deltaTime) {
        const distance = this.position.distanceTo(game.player.position);

        if (distance > 10) {
            this.state = "idle";
        } else if (distance < 1) {
            this.state = "attack";
        } else {
            this.state = "chase";
        }

        if (this.state == "chase") {
            const direction = game.player.position.minus(this.position).normalize();
            this.velocity = direction.times(this.speed * deltaTime);
            const newPosition = this.position.plus(this.velocity.times(deltaTime));

            // Move only if the character does not move inside a wall
            if (! level.contact(newPosition, this.size, 'wall')) {
                this.position = newPosition;
            }

            this.selectAnimation();
            //console.log(`Enemy ${this.id} Chasing towards ${this.moveDirection}`);
        }

        if (this.state == "attack") {
            if (this.attackTimer > this.nextAttack) {
                this.attackTimer = 0;
                game.player.takeDamage(2);
            } else {
                this.attackTimer += deltaTime;
            }
        }

        this.updateHit(deltaTime);
        this.updateFrame(deltaTime);
        this.updateCollider();
    }

    selectAnimation() {
        if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
            if (this.velocity.x > 0 && this.moveDirection != "E") {
                this.moveDirection = "E"
                this.setAnimation(3, 5);
            } else if (this.velocity.x < 0 && this.moveDirection != "W"){
                this.moveDirection = "W"
                this.setAnimation(9, 11);
            }
        } else {
            if (this.velocity.y > 0 && this.moveDirection != "S") {
                this.moveDirection = "S"
                this.setAnimation(6, 8);
            } else if (this.velocity.y < 0 && this.moveDirection != "N"){
                this.moveDirection = "N"
                this.setAnimation(0, 2);
            }
        }
    }
}
