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

    // Compare the values to determine if the boxes overlap
    // TODO: use the correct condition
    return false;
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
