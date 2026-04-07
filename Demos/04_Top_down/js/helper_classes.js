/*
 * General classes that can be useful for a game
 *
 * Gilberto Echeverria
 * 2025-01-22
 */

"use strict";

class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}


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


// Simple collision detection between rectangles
function overlapRectangles(actor1, actor2) {
    return actor1.position.x + actor1.size.x > actor2.position.x &&
           actor1.position.x < actor2.position.x + actor2.size.x &&
           actor1.position.y + actor1.size.y > actor2.position.y &&
           actor1.position.y < actor2.position.y + actor2.size.y;
}

function randomRange(size, start) {
    return Math.floor(Math.random() * size) + ((start === undefined) ? 0 : start);
}
