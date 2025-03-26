/* Testing the for instructions in JavaScript
 *
 * Gilberto Echeverria
 * 2025-03-26
 */

"use strict";

export function addItemsFor(array) {
    let total = 0;
    for (let i=0; i<array.length; i++) {
        total += array[i];
    }
    return total;
}

export function addItemsForIn(array) {
    let total = 0;
    for (let i in array) {
        total += array[i];
    }
    return total;
}

export function addItemsForOf(array) {
    let total = 0;
    for (let elem of array) {
        total += elem;
    }
    return total;
}
