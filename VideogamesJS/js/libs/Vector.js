/*
 * Vector class used in 2D games
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

// TODO: Complete the methods in this class to be able to perform vector operations

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vector(0, 0);
    }

    minus(other) {
        return new Vector(0, 0);
    }

    times(scalar) {
        return new Vector(0, 0);
    }

    magnitude() {
        return 0;
    }

    squareLength() {
        return 0;
    }

    normalize() {
        const mag = this.magnitude();
        if (mag == 0) {
            return new Vector(0, 0);
        }
        return new Vector(this.x / mag, this.y / mag);
    }
}


/*
 * Test the Vector class
 */
//let p = new Vector(0, 8);
//let v = new Vector(1, 1);
//p = p.plus(v.times(1));
//console.log("New position: ", p);
//console.log("plus: ", p.plus(v));
//console.log("minus: ", p.minus(v));
//console.log("times: ", p.times(3));
//console.log("magnitude: ", p.magnitude());
//console.log("squareLength: ", p.squareLength());
