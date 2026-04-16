/*
 * Collection of functions that will be used in the games
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

"use strict";

/*
 * Detect a collision of two box colliders
 *
 * Arguments:
 * - obj1: An instance of the Rect class with properties x, y, width, height
 * - obj2: An instance of the Rect class with properties x, y, width, height
 *
 * Returns:
 * - true if the boxes overlap, false otherwise
 */
function boxOverlap(obj1, obj2) {
    // Declare legible names for the borders
    // TODO: define variables
    const L1 = obj1.collider.x;
    const R1 = obj1.collider.x + obj1.collider.width;
    const T1 = obj1.collider.y;
    const B1 = obj1.collider.y + obj1.collider.height;

    const L2 = obj2.collider.x;
    const R2 = obj2.collider.x + obj2.collider.width;
    const T2 = obj2.collider.y;
    const B2 = obj2.collider.y + obj2.collider.height;

    // Compare the values to determine if the boxes overlap
    // TODO: use the correct condition
    return L1 <= R2 && L2 <= R1 && T1 <= B2 && T2 <= B1;
}

/*
 * Generate a random integer in the range [start, start + size - 1]
 *
 * Arguments:
 * - size: The size of the range (number of possible values)
 * - start: The starting value of the range (default is 0)
 *
 * Returns:
 * - A random integer in the specified range
*/
function randomRange(size, start) {
    return Math.floor(Math.random() * size) + ((start === undefined) ? 0 : start);
}

//export { boxOverlap, randomRange };
