/*
 * Base class for game objects in general
 *
 * Gilberto Echeverria
 * 2025-04-07
 */

class GameObject {
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    draw(ctx) {
        if (this.spriteImage) {
            if (this.spriteRect) {
                ctx.drawImage(this.spriteImage,
                              this.spriteRect.x, this.spriteRect.y,
                              this.spriteRect.width, this.spriteRect.height,
                              this.position.x, this.position.y,
                              this.width, this.height);
            } else {
                ctx.drawImage(this.spriteImage,
                              this.position.x, this.position.y,
                              this.width, this.height);
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        this.drawBoundingBox(ctx);
    }

   drawBoundingBox(ctx) {
        // Draw the bounding box of the sprite
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y,
                 this.width, this.height);
        ctx.stroke();
    }

    update(deltaTime) {

    }

    // Create an image to be drawn for the object
    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }

}

function boxOverlap(rect1, rect2) {
    return rect1.position.x < rect2.position.x + rect2.width &&
           rect1.position.x + rect1.width > rect2.position.x &&
           rect1.position.y < rect2.position.y + rect2.height &&
           rect1.position.y + rect1.height > rect2.position.y;
}
