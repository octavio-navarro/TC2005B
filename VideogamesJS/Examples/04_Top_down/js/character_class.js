class Character extends AnimatedObject {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.maxHP = 0;
        this.hp = 0;
        this.status = "alive";

        // Temporary canvas for composing images
        this.tempCanvas = document.createElement("canvas");
        this.tempCtx = this.tempCanvas.getContext("2d");
        // Set the size of the temporary canvas
        this.tempCanvas.width = this.size.x * scale;
        this.tempCanvas.height = this.size.y * scale;

        // Angle variable to do a sinusoidal effect
        this.angle = 0;
        // Variables to control hit animation
        this.hitAnimation = false;
        this.hitAnimationLength = 500;
        this.hitAnimationTime = 0;
    }

    setMaxHP(value) {
        this.maxHP = value;
        this.hp = value;
    }

    takeDamage(amount) {
        this.hp -= amount;
        this.gotHit();
        //console.log(`Character took damage. Now at ${this.hp} / ${this.maxHP}`);
        if (this.hp < 0) {
            this.hp = 0;
            this.status = "dead";
        }
        if (this.hpBar) {
            this.hpBar.update(this.hp / this.maxHP);
        }
    }

    // This method should be overloaded with the behaviour
    // for when a character is hit
    gotHit() {
        this.hitAnimation = true;
        this.hitAnimationTime = 0;
    }

    // Custom draw to use color overlays
    draw(ctx, scale) {
        // Draw the sprite first on the temporary canvas
        this.tempCtx.globalCompositeOperation = 'source-over';
        this.tempCtx.clearRect(0, 0, this.size.x * scale, this.size.y * scale);
        if (this.hitAnimation) {
            // This will basically only give us the alpha
            this.tempCtx.drawImage(this.spriteImage,
                          this.spriteRect.x * this.spriteRect.width,
                          this.spriteRect.y * this.spriteRect.height,
                          this.spriteRect.width,
                          this.spriteRect.height,
                          0,
                          0,
                          this.size.x * scale,
                          this.size.y * scale);
            // Draw the color on top. This will preserve the alpha on the sprite
            this.tempCtx.globalCompositeOperation = 'source-atop';

            let gbValue = Math.floor(Math.sin(this.angle) * 256);
            this.randomColor = `rgb(255, ${gbValue}, ${gbValue})`;
            this.angle += Math.PI / 9;

            this.tempCtx.fillStyle = this.randomColor;
            this.tempCtx.fillRect(0, 0, this.size.x * scale, this.size.y * scale);
            // Draw the image again to mix the color
            this.tempCtx.globalCompositeOperation = "multiply";
        }
        this.tempCtx.drawImage(this.spriteImage,
                      this.spriteRect.x * this.spriteRect.width,
                      this.spriteRect.y * this.spriteRect.height,
                      this.spriteRect.width,
                      this.spriteRect.height,
                      0,
                      0,
                      this.size.x * scale,
                      this.size.y * scale);

        // Draw the contents of the temprary canvas in the final canvas
        // This canvas will always use 'source-over'
        //ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(this.tempCanvas,
                      (this.position.x - this.halfSize.x) * scale,
                      (this.position.y - this.halfSize.y) * scale,
                      this.size.x * scale,
                      this.size.y * scale);

        if (showBBox) this.drawBoundingBox(ctx, scale);
        if (showColl) this.drawCollider(ctx, scale);
    }

    updateHit(deltaTime) {
        // Determine when to stop a hit animation
        if (this.hitAnimation) {
            this.hitAnimationTime += deltaTime;
            if (this.hitAnimationTime >= this.hitAnimationLength) {
                this.hitAnimation = false;
            }
        }
    }
}
