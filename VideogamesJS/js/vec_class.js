/*
 * Collection of classes that will be used in the games
 *
 * Gilberto Echeverria
 * 2025-02-25
 */

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    minus(other) {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    times(scalar) {
        return new Vec(this.x * scalar, this.y * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize() {
        const mag = this.magnitude();
        if (mag == 0) {
            return new Vec(0, 0);
        }
        return new Vec(this.x / mag, this.y / mag);
    }
}
