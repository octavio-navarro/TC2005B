/*
 * Example functions to practice JavaScript
 *
 * Gilberto Echeverria
 * 2025-02-12
 */

"use strict";

function firstNonRepeating(str) {
    // Create an empty array to store the candidates
    const candidates = [];
    // Check every character in the string
    for (let i=0; i<str.length; i++) {
        // Compare against the candidates
        let found = false;
        for (let cand of candidates) {
            // If the char had already been found, increase its counter
            if (cand.char == str[i]) {
                cand.count += 1;
                found = true;
            }
        }
        // If the char was not found, add it to the list
        if (!found) {
            candidates.push({char: str[i], count: 1});
        }
    }

    // Show the data structure generated
    // A list of objects
    console.log(candidates);

    // Look for the first char that appeared only once
    for (let index in candidates) {
        if (candidates[index].count == 1) {
            return candidates[index].char;
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
