/*
 * Unit tests for the functions used to practice JavaScript in TC2005B
 * Using the Mocha testing framework
 * https://mochajs.org/
 *
 * Gilberto Echeverria
 * 2025-02-10
 */

"use strict";

import { strictEqual, deepStrictEqual } from "assert";
import * as tc2005b from "../js/tc2005b.js";


describe("TC2005B Module Tests", () => {

    describe("firstNonrepeating", () => {
        it("empty string", () => {
            strictEqual(tc2005b.firstNonRepeating(""), undefined);
        });

        it("abcd", () => {
            strictEqual(tc2005b.firstNonRepeating("abcd"), "a");
        });

        it("abacddbec", () => {
            strictEqual(tc2005b.firstNonRepeating("abacddbec"), "e");
        });

        it("abacddbecef", () => {
            strictEqual(tc2005b.firstNonRepeating("abacddbecef"), "f");
        });
    });

    describe("bubbleSort", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.bubbleSort([]), []);
        });

        it("one element", () => {
            deepStrictEqual(tc2005b.bubbleSort([3]), [3]);
        });

        it("two elements, ordered", () => {
            deepStrictEqual(tc2005b.bubbleSort([3, 8]), [3, 8]);
        });

        it("two elements, unordered", () => {
            deepStrictEqual(tc2005b.bubbleSort([8, 3]), [3, 8]);
        });

        it("multiple elements, ordered", () => {
            deepStrictEqual(tc2005b.bubbleSort([3, 6, 9, 12, 15]), [3, 6, 9, 12, 15]);
        });

        it("multiple elements, unordered", () => {
            deepStrictEqual(tc2005b.bubbleSort([9, 6, 15, 3, 12]), [3, 6, 9, 12, 15]);
        });

        it("multiple elements, inverse order", () => {
            deepStrictEqual(tc2005b.bubbleSort([15, 12, 9, 6, 3]), [3, 6, 9, 12, 15]);
        });
    });

    describe("invertArray", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.invertArray([]), []);
        });

        it("one element", () => {
            deepStrictEqual(tc2005b.invertArray([3]), [3]);
        });

        it("two elements", () => {
            deepStrictEqual(tc2005b.invertArray([3, 8]), [8, 3]);
        });

        it("multiple elements", () => {
            deepStrictEqual(tc2005b.invertArray([3, 6, 9, 12, 15]), [15, 12, 9, 6, 3]);
        });
    });

    describe("invertArrayInplace", () => {
        it("empty array", () => {
            let test = [];
            tc2005b.invertArrayInplace(test)
            deepStrictEqual(test, []);
        });

        it("one element", () => {
            let test = [3];
            tc2005b.invertArrayInplace(test)
            deepStrictEqual(test, [3]);
        });

        it("two elements", () => {
            let test = [3, 8];
            tc2005b.invertArrayInplace(test)
            deepStrictEqual(test, [8, 3]);
        });

        it("multiple elements", () => {
            let test = [3, 6, 9, 12, 15];
            tc2005b.invertArrayInplace(test)
            deepStrictEqual(test, [15, 12, 9, 6, 3]);
        });
    });

    describe("capitalize", () => {
        it("empty string", () => {
            strictEqual(tc2005b.capitalize(""), "");
        });

        it("single character, lowercase", () => {
            strictEqual(tc2005b.capitalize("a"), "A");
        });

        it("single character, uppercase", () => {
            strictEqual(tc2005b.capitalize("a"), "A");
        });

        it("One word, lowercase", () => {
            strictEqual(tc2005b.capitalize("mexico"), "Mexico");
        });

        it("One word, uppercase", () => {
            strictEqual(tc2005b.capitalize("Mexico"), "Mexico");
        });

        it("Multiple words, lowercase", () => {
            strictEqual(tc2005b.capitalize("mexico is a large country"),
                "Mexico Is A Large Country");
        });

        it("Multiple words, uppercase", () => {
            strictEqual(tc2005b.capitalize("Mexico Is Magnificent"),
                "Mexico Is Magnificent");
        });
    });

    describe("mcd", () => {
        it("zeros", () => {
            strictEqual(tc2005b.mcd(0, 0), 0);
        });

        it("3, 6", () => {
            strictEqual(tc2005b.mcd(3, 6), 3);
        });

        it("9, 6", () => {
            strictEqual(tc2005b.mcd(9, 6), 3);
        });

        it("24, 36", () => {
            strictEqual(tc2005b.mcd(24, 36), 12);
        });
    });

    describe("hackerSpeak", () => {
        it("empty string", () => {
            strictEqual(tc2005b.hackerSpeak(""), "");
        });

        it("hello string", () => {
            strictEqual(tc2005b.hackerSpeak("hello"), "h3ll0");
        });

        it("larger string", () => {
            strictEqual(tc2005b.hackerSpeak("Javascript es divertido"),
                "J4v45cr1pt 35 d1v3rt1d0");
        });
    });

    describe("factorize", () => {
        it("factorize 0", () => {
            deepStrictEqual(tc2005b.factorize(0), []);
        });

        it("factorize 6", () => {
            deepStrictEqual(tc2005b.factorize(6), [1, 2, 3, 6]);
        });

        it("factorize 7", () => {
            deepStrictEqual(tc2005b.factorize(7), [1, 7]);
        });

        it("factorize 12", () => {
            deepStrictEqual(tc2005b.factorize(12), [1, 2, 3, 4, 6, 12]);
        });
    });

    describe("deduplicate", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.deduplicate([]), []);
        });

        it("no duplicates", () => {
            deepStrictEqual(tc2005b.deduplicate([1, 2, 3]), [1, 2, 3]);
        });

        it("some duplicates", () => {
            deepStrictEqual(tc2005b.deduplicate([1, 2, 3, 4, 3, 2, 1]), [1, 2, 3, 4]);
        });

        it("all duplicates", () => {
            deepStrictEqual(tc2005b.deduplicate([2, 2, 2, 2, 2, 2, 2]), [2]);
        });
    });

    describe("findShortestString", () => {
        it("empty array", () => {
            strictEqual(tc2005b.findShortestString([]), 0);
        });

        it("equal strings", () => {
            strictEqual(tc2005b.findShortestString(["one", "two", "thr", "fou"]), 3);
        });

        it("first shortest", () => {
            strictEqual(tc2005b.findShortestString(["one", "two", "three", "four", "five"]), 3);
        });

        it("last shortest", () => {
            strictEqual(tc2005b.findShortestString(["one", "two", "three", "four", "five", "si"]), 2);
        });
    });

    describe("isPalindrome", () => {
        it("empty string", () => {
            strictEqual(tc2005b.isPalindrome(""), true);
        });

        it("single char string", () => {
            strictEqual(tc2005b.isPalindrome("u"), true);
        });

        it("two char string, yes", () => {
            strictEqual(tc2005b.isPalindrome("uu"), true);
        });

        it("two char string, no", () => {
            strictEqual(tc2005b.isPalindrome("un"), false);
        });

        it("multiple char string, yes", () => {
            strictEqual(tc2005b.isPalindrome("rizuzir"), true);
        });

        it("multiple char string, no", () => {
            strictEqual(tc2005b.isPalindrome("rizuzri"), false);
        });
    });

    describe("sortStrings", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.sortStrings([]), []);
        });

        it("unsorted strings", () => {
            deepStrictEqual(tc2005b.sortStrings(["one", "two", "thr", "fou"]),
                [ "fou", "one", "thr", "two"]);
        });

        it("sorted strings", () => {
            deepStrictEqual(tc2005b.sortStrings(["alpha", "beta", "gamma", "theta"]),
                ["alpha", "beta", "gamma", "theta"]);
        });
    });

    describe("stats", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.stats([]), [0, 0]);
        });

        it("one element array", () => {
            deepStrictEqual(tc2005b.stats([6]), [6, 6]);
        });

        it("small array", () => {
            deepStrictEqual(tc2005b.stats([6, 7, 7, 8]), [7, 7]);
        });

        it("large array", () => {
            deepStrictEqual(tc2005b.stats([4, 4, 6, 8, 4, 4, 6, 8]), [5.5, 4]);
        });
    });

    describe("popularString", () => {
        it("empty array", () => {
            strictEqual(tc2005b.popularString([]), "");
        });

        it("unsorted strings", () => {
            strictEqual(tc2005b.popularString(["one", "two", "thr", "fou"]),
                "one");
        });

        it("sorted strings", () => {
            strictEqual(tc2005b.popularString(["alpha", "beta", "beta", "gamma", "beta", "theta", "alpha"]),
                "beta");
        });
    });

    describe("isPowerOf2", () => {
        it("1", () => {
            strictEqual(tc2005b.isPowerOf2(1), true);
        });

        it("4", () => {
            strictEqual(tc2005b.isPowerOf2(4), true);
        });

        it("10", () => {
            strictEqual(tc2005b.isPowerOf2(10), false);
        });

        it("1024", () => {
            strictEqual(tc2005b.isPowerOf2(1024), true);
        });
    });

    describe("sortDescending", () => {
        it("empty array", () => {
            deepStrictEqual(tc2005b.sortDescending([]), []);
        });

        it("one element", () => {
            deepStrictEqual(tc2005b.sortDescending([3]), [3]);
        });

        it("two elements, ordered", () => {
            deepStrictEqual(tc2005b.sortDescending([3, 8]), [8, 3]);
        });

        it("two elements, unordered", () => {
            deepStrictEqual(tc2005b.sortDescending([8, 3]), [8, 3]);
        });

        it("multiple elements, ordered", () => {
            deepStrictEqual(tc2005b.sortDescending([3, 6, 9, 12, 15]), [15, 12, 9, 6, 3]);
        });

        it("multiple elements, unordered", () => {
            deepStrictEqual(tc2005b.sortDescending([9, 6, 15, 3, 12]), [15, 12, 9, 6, 3]);
        });

        it("multiple elements, inverse order", () => {
            deepStrictEqual(tc2005b.sortDescending([15, 12, 9, 6, 3]), [15, 12, 9, 6, 3]);
        });
    });

});
