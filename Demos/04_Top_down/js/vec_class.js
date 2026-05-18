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

    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

    normalize() {
        const len = this.length();
        if (len == 0) {
            return new Vec(0, 0);
        }
        return new Vec(this.x / len, this.y / len);
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    directionTo(point) {
        point.minus(this).normalize();
    }

    distanceTo(point) {
        return point.minus(this).length();
    }
}
