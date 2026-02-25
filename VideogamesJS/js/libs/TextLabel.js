/*
 * Class to draw text at specific positions within the game canvas
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

"use strict";


class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
    }
}
