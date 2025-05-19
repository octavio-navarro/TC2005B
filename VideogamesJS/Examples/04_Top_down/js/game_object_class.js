/*
 * Generic class for any game object
 *
 * Gilberto Echeverria
 * 2025-05-02
 */


// Global variables to select whether to display bounding boxes and colliders
let showBBox = false;
let showColl = false;

class GameObject {
    constructor(color, width, height, x, y, type) {
        this.id = randomRange(9000, 1000);
        this.position = new Vec(x, y);
        this.size = new Vec(width, height);
        this.halfSize = new Vec(width / 2, height / 2);
        this.color = color;
        this.type = type;

        // Sprite properties
        this.spriteImage = undefined;
        this.spriteRect = undefined;

        // Intialize a collider with the default object size
        this.setCollider(width, height);
    }

    setCollider(width, height) {
        let xMargin = (this.size.x - width) / 2;
        let yMargin = (this.size.y - height) / 2;
        this.xOffset = this.halfSize.x - xMargin;
        this.yOffset = this.halfSize.y - yMargin;
        this.colliderWidth = width;
        this.colliderHeight = height;
        this.updateCollider();
    }

    // Create the collider directly as a rectangle to be tested
    updateCollider() {
        this.collider = new Rect(this.position.x - this.xOffset * scale,
                                 this.position.y - this.yOffset * scale,
                                 this.colliderWidth * scale,
                                 this.colliderHeight * scale);
    }

    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }

   draw(ctx, scale) {
        if (this.spriteImage) {
            // Draw a sprite if the object has one defined
            if (this.spriteRect) {
                ctx.drawImage(this.spriteImage,
                              this.spriteRect.x * this.spriteRect.width,
                              this.spriteRect.y * this.spriteRect.height,
                              this.spriteRect.width,
                              this.spriteRect.height,
                              (this.position.x - this.halfSize.x) * scale,
                              (this.position.y - this.halfSize.y) * scale,
                              this.size.x * scale,
                              this.size.y * scale);
            } else {
                ctx.drawImage(this.spriteImage,
                              (this.position.x - this.halfSize.x) * scale,
                              (this.position.y - this.halfSize.y) * scale,
                              this.size.x * scale,
                              this.size.y * scale);
            }
        } else {
            // If there is no sprite asociated, just draw a color square
            ctx.fillStyle = this.color;
            ctx.fillRect((this.position.x - this.halfSize.x) * scale,
                         (this.position.y - this.halfSize.y) * scale,
                         this.size.x * scale,
                         this.size.y * scale);
        }
    }

    drawBoundingBox(ctx, scale) {
        // Attempt to compose the overlay so it makes the image lighter
        ctx.globalCompositeOperation = "screen";
        // A transparent layer on top
        ctx.fillStyle = "rgb(0.5, 0.5, 0.5, 0.3)";
        ctx.fillRect((this.position.x - this.halfSize.x) * scale,
                     (this.position.y - this.halfSize.y) * scale,
                     this.size.x * scale,
                     this.size.y * scale);
        // Return to default composition type
        ctx.globalCompositeOperation = "source-over";

        // Draw the bounding box of the sprite
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect((this.position.x - this.halfSize.x) * scale,
                 (this.position.y - this.halfSize.y) * scale,
                 this.size.x * scale,
                 this.size.y * scale);
        ctx.stroke();

        // A dot in the center of the sprite
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x * scale - 2,
                     this.position.y * scale - 2, 4, 4);
    }

    drawCollider(ctx) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(this.collider.position.x,
                 this.collider.position.y,
                 this.collider.width,
                 this.collider.height);
        ctx.stroke();
    }

    update() {

    }
}
