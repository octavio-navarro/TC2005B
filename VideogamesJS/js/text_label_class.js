/*
 * Show text on the Canvas with specific parameters
 *
 * Gilberto Echeverria
 * 2025-04-09
 */

class TextLabel {
    constructor(position, font, color) {
        this.position = position;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.position.x, this.position.y);
    }
}
