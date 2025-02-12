/*
 * Unit tests for the functions in the dataset from Ariel Ortiz 2
 *
 * Gilberto Echeverria
 * 2025-01-20
 */

"use strict";

import { strictEqual, deepStrictEqual } from "assert";
import * as ariel_2 from "../js/ariel_2.js";


describe("ariel_2 Module Tests", () => {

    describe("insert", () => {
        it("insert in empty list", () => {
            deepStrictEqual(
                ariel_2.insert([], 14),
                [14]);
        });

        it("insert at the beginning", () => {
            deepStrictEqual(
                ariel_2.insert([5, 6, 7, 8], 4),
                [4, 5, 6, 7, 8]);
        });

        it("insert in the middle", () => {
            deepStrictEqual(
                ariel_2.insert([1, 3, 6, 7, 9, 16], 5),
                [1, 3, 5, 6, 7, 9, 16]);
        });

        it("insert at the end", () => {
            deepStrictEqual(
                ariel_2.insert([1, 5, 6], 10),
                [1, 5, 6, 10]);
        });
    });

    describe("insertionSort", () => {

        it("empty list", () => {
            deepStrictEqual(
                ariel_2.insertionSort([]), []);
        });

        it("unsorted list", () => {
            deepStrictEqual(
                ariel_2.insertionSort([4, 3, 6, 8, 3, 0, 9, 1, 7]),
                [0, 1, 3, 3, 4, 6, 7, 8, 9]);
        });

        it("sorted list", () => {
            deepStrictEqual(
                ariel_2.insertionSort([1, 2, 3, 4, 5, 6]),
                [1, 2, 3, 4, 5, 6]);
        });

        it("inverted list", () => {
            deepStrictEqual(
                ariel_2.insertionSort([6, 5, 4, 3, 2, 1]),
                [1, 2, 3, 4, 5, 6]);
        });

        it("repeated elements", () => {
            deepStrictEqual(
                ariel_2.insertionSort([5, 5, 5, 1, 5, 5, 5]),
                [1, 5, 5, 5, 5, 5, 5]);
        });
    });

    describe("rotateLeft", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.rotateLeft([], 5), []);
        });

        it("0 rotation", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 0),
                ['a', 'b', 'c', 'd', 'e', 'f', 'g']
            );
        });

        it("1 rotation", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 1),
                ['b', 'c', 'd', 'e', 'f', 'g', 'a']
            );
        });

        it("-1 rotation", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], -1),
                ['g', 'a', 'b', 'c', 'd', 'e', 'f']
            );
        });

        it("3 rotation", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3),
                ['d', 'e', 'f', 'g', 'a', 'b', 'c']
            );
        });

        it("-3 rotation", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], -3),
                ['e', 'f', 'g', 'a', 'b', 'c', 'd']
            );
        });

        it("greater than length", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 8),
                ['b', 'c', 'd', 'e', 'f', 'g', 'a']
            );
        });

        it("negative greater than length", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], -8),
                ['g', 'a', 'b', 'c', 'd', 'e', 'f']
            );
        });

        it("multiples of rotation 1", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 45),
                ['d', 'e', 'f', 'g', 'a', 'b', 'c']
            );
        });

        it("negative multiples of rotation 1", () => {
            deepStrictEqual(
                ariel_2.rotateLeft(['a', 'b', 'c', 'd', 'e', 'f', 'g'], -45),
                ['e', 'f', 'g', 'a', 'b', 'c', 'd']
            );
        });
    });

    describe("primeFactors", () => {

        it("factor of 1", () => {
            deepStrictEqual(ariel_2.primeFactors(1), []);
        });

        it("factors of 2", () => {
            deepStrictEqual(ariel_2.primeFactors(2), [2]);
        });

        it("factors of 6", () => {
            deepStrictEqual(ariel_2.primeFactors(6), [2, 3]);
        });

        it("factors of 17", () => {
            deepStrictEqual(ariel_2.primeFactors(17), [17]);
        });

        it("factors of 96", () => {
            deepStrictEqual(ariel_2.primeFactors(96), [2, 2, 2, 2, 2, 3]);
        });

        it("factors of 467", () => {
            deepStrictEqual(ariel_2.primeFactors(467), [467]);
        });

        it("factors of 666", () => {
            deepStrictEqual(ariel_2.primeFactors(666), [2, 3, 3, 37]);
        });
    });

    describe("gcd", () => {

        it("gcd(0, 0)", () => {
            deepStrictEqual(ariel_2.gcd(0, 0), 0);
        });

        it("gcd(3, 0)", () => {
            deepStrictEqual(ariel_2.gcd(3, 0), 3);
        });

        it("gcd(0, 2)", () => {
            deepStrictEqual(ariel_2.gcd(0, 2), 2);
        });

        it("gcd(2, 2)", () => {
            deepStrictEqual(ariel_2.gcd(2, 2), 2);
        });

        it("gcd(10, 8)", () => {
            deepStrictEqual(ariel_2.gcd(10, 8), 2);
        });

        it("gcd(8, 10)", () => {
            deepStrictEqual(ariel_2.gcd(8, 10), 2);
        });

        it("gcd(270, 192)", () => {
            deepStrictEqual(ariel_2.gcd(270, 192), 6);
        });

        it("gcd(13, 7919)", () => {
            deepStrictEqual(ariel_2.gcd(13, 7919), 1);
        });

        it("gcd(20, 16)", () => {
            deepStrictEqual(ariel_2.gcd(20, 16), 4);
        });

        it("gcd(54, 24)", () => {
            deepStrictEqual(ariel_2.gcd(54, 24), 6);
        });

        it("gcd(6307, 1995)", () => {
            deepStrictEqual(ariel_2.gcd(6307, 1995), 7);
        });
    });

    describe("deepReverse", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.deepReverse([]), []);
        });

        it("list with 2 elements", () => {
            deepStrictEqual(ariel_2.deepReverse(['a', 'b']), ['b', 'a']);
        });

        it("list with 3 elements", () => {
            deepStrictEqual(
                ariel_2.deepReverse(['a', 'b', 'c']),
                ['c', 'b', 'a']);
        });

        it("one nested list", () => {
            deepStrictEqual(
                ariel_2.deepReverse(['a', ['b', 'c', 'd'], 3]),
                [3, ['d', 'c', 'b'], 'a']);
        });

        it("two nested lists", () => {
            deepStrictEqual(
                ariel_2.deepReverse(['a', ['b', 'c', 'd'], 3, [4, 5, 6]]),
                [[6, 5, 4], 3, ['d', 'c', 'b'], 'a']);
        });

        it("nested 2 deep", () => {
            deepStrictEqual(
                ariel_2.deepReverse([[1, 2], 3, [4, [5, 6]]]),
                [[[6, 5], 4], 3, [2, 1]]);
        });
    });

    describe("insertAt", () => {

        it("insert in empty list", () => {
            deepStrictEqual(ariel_2.insertAt([], 0, 'x'), ['x']);
            deepStrictEqual(ariel_2.insertAt([], 5, 'x'), ['x']);
            deepStrictEqual(ariel_2.insertAt([], -5, 'x'), ['x']);
        });

        it("positive indices", () => {
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 0, 'x'), ['x', 1, 2, 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 1, 'x'), [1, 'x', 2, 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 2, 'x'), [1, 2, 'x', 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 3, 'x'), [1, 2, 3, 'x']);
        });

        it("large positive indices", () => {
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 6, 'x'), [1, 2, 3, 'x']);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], 9, 'x'), [1, 2, 3, 'x']);
        });

        it("negative indices", () => {
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -4, 'x'), ['x', 1, 2, 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -3, 'x'), [1, 'x', 2, 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -2, 'x'), [1, 2, 'x', 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -1, 'x'), [1, 2, 3, 'x']);
        });

        it("large negative indices", () => {
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -6, 'x'), ['x', 1, 2, 3]);
            deepStrictEqual(ariel_2.insertAt([1, 2, 3], -9, 'x'), ['x', 1, 2, 3]);
        });
    });

    describe("insertEverywhere", () => {

        it("insert in empty list", () => {
            deepStrictEqual(ariel_2.insertEverywhere([], 'x'), [['x']]);
        });

        it("insert in list with one element", () => {
            deepStrictEqual(
                ariel_2.insertEverywhere(['a'], 'x'),
                [['x', 'a'], ['a', 'x']]);
        });

        it("insert in list with three elements", () => {
            deepStrictEqual(
                ariel_2.insertEverywhere(['a', 'b', 'c'], 'x'),
                [
                    ['x', 'a', 'b', 'c'],
                    ['a', 'x', 'b', 'c'],
                    ['a', 'b', 'x', 'c'],
                    ['a', 'b', 'c', 'x']
                ]);
        });

        it("insert in list with five elements", () => {
            deepStrictEqual(
                ariel_2.insertEverywhere(['a', 'b', 'c', 'd', 'e'], 'x'),
                [
                    ['x', 'a', 'b', 'c', 'd', 'e'],
                    ['a', 'x', 'b', 'c', 'd', 'e'],
                    ['a', 'b', 'x', 'c', 'd', 'e'],
                    ['a', 'b', 'c', 'x', 'd', 'e'],
                    ['a', 'b', 'c', 'd', 'x', 'e'],
                    ['a', 'b', 'c', 'd', 'e', 'x']
                ]);
        });
    });


    // RLE

    describe("pack", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.pack([]), []);
        });

        it("list with 1 element", () => {
            deepStrictEqual(ariel_2.pack(['a']), [['a']]);
        });

        it("list with multiple repeated elements", () => {
            deepStrictEqual(
                ariel_2.pack(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']),
                [['a', 'a', 'a', 'a'], ['b'], ['c', 'c'], ['a', 'a'], ['d'], ['e', 'e', 'e', 'e']]
            );
        });

        it("list with no repeated elements", () => {
            deepStrictEqual(ariel_2.pack([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
        });

        it("list with all repeated elements", () => {
            deepStrictEqual(ariel_2.pack([9, 9, 9, 9, 9]), [[9, 9, 9, 9, 9]]);
        });
    });

    describe("compress", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.compress([]), []);
        });

        it("list with 1 element", () => {
            deepStrictEqual(ariel_2.compress(['a']), ['a']);
        });

        it("list with multiple repeated elements", () => {
            deepStrictEqual(
                ariel_2.compress(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']),
                ['a', 'b', 'c', 'a', 'd', 'e']
            );
        });

        it("list with no repeated elements", () => {
            deepStrictEqual(ariel_2.compress([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
        });

        it("list with all repeated elements", () => {
            deepStrictEqual(ariel_2.compress([9, 9, 9, 9, 9]), [9]);
        });
    });

    describe("encode", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.encode([]), []);
        });

        it("list with 1 element", () => {
            deepStrictEqual(ariel_2.encode(['a']), [[1, 'a']]);
        });

        it("list with multiple repeated elements", () => {
            deepStrictEqual(
                ariel_2.encode(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']),
                [[4, 'a'], [1, 'b'], [2, 'c'], [2, 'a'], [1, 'd'], [4, 'e']]
            );
        });

        it("list with no repeated elements", () => {
            deepStrictEqual(ariel_2.encode([1, 2, 3, 4, 5]), [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]]);
        });

        it("list with all repeated elements", () => {
            deepStrictEqual(ariel_2.encode([9, 9, 9, 9, 9]), [[5, 9]]);
        });
    });

    describe("encodeModified", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.encodeModified([]), []);
        });

        it("list with 1 element", () => {
            deepStrictEqual(ariel_2.encodeModified(['a']), ['a']);
        });

        it("list with multiple repeated elements", () => {
            deepStrictEqual(
                ariel_2.encodeModified(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']),
                [[4, 'a'], 'b', [2, 'c'], [2, 'a'], 'd', [4, 'e']]
            );
        });

        it("list with no repeated elements", () => {
            deepStrictEqual(ariel_2.encodeModified([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
        });

        it("list with all repeated elements", () => {
            deepStrictEqual(ariel_2.encodeModified([9, 9, 9, 9, 9]), [[5, 9]]);
        });
    });

    describe("decode", () => {

        it("empty list", () => {
            deepStrictEqual(ariel_2.decode([]), []);
        });

        it("list with 1 element", () => {
            deepStrictEqual(ariel_2.decode(['a']), ['a']);
        });

        it("list with multiple repeated elements", () => {
            deepStrictEqual(
                ariel_2.decode([[4, 'a'], 'b', [2, 'c'], [2, 'a'], 'd', [4, 'e']]),
                ['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']
            );
        });

        it("list with no repeated elements", () => {
            deepStrictEqual(ariel_2.decode([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
        });

        it("list with all repeated elements", () => {
            deepStrictEqual(ariel_2.decode([[5, 9]]), [9, 9, 9, 9, 9]);
        });
    });


    describe("argsSwap", () => {
        it("Custom function to create a pair", () => {
            deepStrictEqual(ariel_2.argsSwap((a, b) => { return [a, b]; })(1, 2), [2, 1]);
        });

        it("Custom function to divide a number by another", () => {
            deepStrictEqual(ariel_2.argsSwap((a, b) => a / b)(8, 2), 0.25);
        });
    });

    describe("thereExistsOne", () => {

        it("positive function on an empty list", () => {
            deepStrictEqual(ariel_2.thereExistsOne(x => x >= 0, []), false);
        });
        it("positive function with one positive", () => {
            deepStrictEqual(ariel_2.thereExistsOne(x => x >= 0, [-1, -10, 4, -5, -2, -1]), true);
        });
        it("positive function with many positives", () => {
            deepStrictEqual(ariel_2.thereExistsOne(x => x >= 0, [-1, -10, 4, -5, 2, -1]), false);
        });
        it("negative function with one negative", () => {
            deepStrictEqual(ariel_2.thereExistsOne(x => x < 0, [-1]), true);
        });
        it("isNan function with no NaN", () => {
            deepStrictEqual(ariel_2.thereExistsOne(isNaN, [4, 8, 15, 16, 23, 42]), false);
        });
        it("isNan function with one NaN", () => {
            deepStrictEqual(ariel_2.thereExistsOne(isNaN, [4, 8, 15, NaN, 23, 42]), true);
        });
    });

    describe("linearSearch", () => {

        it("empty list", () => {
            deepStrictEqual(
                ariel_2.linearSearch([], 5, (a, b) => a === b),
                false);
        });

        it("compare numbers", () => {
            deepStrictEqual(
                ariel_2.linearSearch(
                    [48, 77, 30, 31, 5, 20, 91, 92, 69, 97, 28, 32, 17, 18, 96],
                    5,
                    (a, b) => a === b),
                4);
        });

        it("compare strings", () => {
            deepStrictEqual(
                ariel_2.linearSearch(
                    ["red", "blue", "green", "black", "white"],
                    "black",
                    (a, b) => a === b),
                3);
        });

        it("string contains", () => {
            deepStrictEqual(
                ariel_2.linearSearch(
                    ["terminal", "keyboard", "mouse", "monitor"],
                    "ous",
                    (a, b) => a.includes(b)),
                2);
        });
    });

    describe("deriv", () => {
        const f = x => x ** 3;
        const df = ariel_2.deriv(f, 0.001);
        const ddf = ariel_2.deriv(df, 0.001);
        const dddf = ariel_2.deriv(ddf, 0.001);

        it("first derivate", () => {
            strictEqual(Math.round(df(5), 1), 75.0);
        });

        it("second derivate", () => {
            strictEqual(Math.round(ddf(5), 1), 30.0);
        });

        it("third derivate", () => {
            strictEqual(Math.round(dddf(5), 1), 6.0);
        });
    });

    describe("newton", () => {

        it("root of x-10", () => {
            const f = function (x) { return x - 10; };
            strictEqual(Math.round(ariel_2.newton(f, 1) * 1000) / 1000, 10.0);
        });

        it("root of 4x+2", () => {
            const f = function (x) { return 4 * x + 2; };
            strictEqual(Math.round(ariel_2.newton(f, 1) * 1000) / 1000, -0.5);
        });

        it("root of x³+1", () => {
            const f = function (x) { return x ** 3 + 1; };
            strictEqual(Math.round(ariel_2.newton(f, 50) * 1000) / 1000, -1.0);
        });

        it("root of cos(x)+(x/2)", () => {
            const f = function (x) { return Math.cos(x) + x / 2; };
            strictEqual(Math.round(ariel_2.newton(f, 5) * 1000) / 1000, -1.03);
        });
    });

    describe("integral", () => {

        it("x³ from 0 to 1, 10 iterations", () => {
            const f = function (x) { return x ** 3; };
            strictEqual(Math.round(ariel_2.integral(0, 1, 10, f) * 1000) / 1000, 1 / 4);
        });

        it("x*y integral over x:[1-2] and y:[3-4], 10 iterations", () => {
            strictEqual(
                Math.round(
                    ariel_2.integral(1, 2, 10, (x) => {
                        return ariel_2.integral(3, 4, 10, (y) => {
                            return x * y; }); }) * 1000)
                    / 1000,
                21 / 4);
        });
    });
});
