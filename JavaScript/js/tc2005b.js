/*
 * Example functions to practice JavaScript
 *
 * Gilberto Echeverria
 * 2025-02-12
 */

"use strict";


function firstNonRepeating(string) {
    const letters = [];
    for (let i=0; i<string.length; i++) {
        let found = false;
        for (let item of letters) {
            if (item.char === string[i]) {
                item.count++;
                found = true;
                break;
            }
        }
        if (!found) {
            letters.push( { char: string[i], count: 1} );
        }
    }

    for (let index in letters) {
        if (letters[index].count === 1) {
            return letters[index].char;
        }
    }
}


export {
    firstNonRepeating,
    /*
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
    */
};
