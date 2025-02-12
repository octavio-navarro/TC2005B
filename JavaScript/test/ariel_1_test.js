/*
 * Unit tests for the functions in the dataset from Ariel Ortiz 1
 *
 * Gilberto Echeverria
 * 2025-01-20
 */

"use strict";

import { strictEqual, deepStrictEqual } from "assert";
import * as ariel_1 from "../js/ariel_1.js";


describe("Ariel1 Module Tests", () => {

    // Simple functions

    describe("fahrenheitToCelsius", () => {
        it("212 F -> 100 C", () => {
            strictEqual(ariel_1.fahrenheitToCelsius(212.0), 100.0);
        });

        it("32 F -> 0 C", () => {
            strictEqual(ariel_1.fahrenheitToCelsius(32), 0);
        });

        it("-40 F -> -40 C", () => {
            strictEqual(ariel_1.fahrenheitToCelsius(-40), -40);
        });
    })

    describe("roots", () => {
        it("roots(2, 4, 2)", () => {
            strictEqual(ariel_1.roots(2, 4, 2), -1);
        });

        it("roots(1, 0, 0)", () => {
            strictEqual(ariel_1.roots(1, 0, 0), 0);
        });

        it("roots(4, 5, 1)", () => {
            strictEqual(ariel_1.roots(4, 5, 1), -1 / 4);
        });
    });

    // Conditionals

    describe("sign", () => {
        it("negative number", () => {
            strictEqual(ariel_1.sign(-5), -1);
        });

        it("positive number", () => {
            strictEqual(ariel_1.sign(5), 1);
        });

        it("zero", () => {
            strictEqual(ariel_1.sign(0), 0);
        });
    });

    describe("bmi", () => {
        it("underweight", () => {
            strictEqual(ariel_1.bmi(47, 1.7), "underweight");
        });

        it("normal", () => {
            strictEqual(ariel_1.bmi(55, 1.5), "normal");
        });

        it("obese1", () => {
            strictEqual(ariel_1.bmi(76, 1.7), "obese1");
        });

        it("obese2", () => {
            strictEqual(ariel_1.bmi(81, 1.6), "obese2");
        });

        it("obese3", () => {
            strictEqual(ariel_1.bmi(120, 1.6), "obese3");
        });
    });

    // Recursion

    describe("factorial", () => {
        it("factorial(0)", () => {
            strictEqual(ariel_1.factorial(0), 1);
        });

        it("factorial(5)", () => {
            strictEqual(ariel_1.factorial(5), 120);
        });

        it("factorial(20)", () => {
            strictEqual(ariel_1.factorial(20), 2432902008176640000);
        });

        /*
        it("factorial(40)", () => {
          strictEqual(
            ariel_1.factorial(40),
            815915283247897734345611269596115894272000000000
          );
        });
    */
    });

    describe("pow", () => {
        it("5⁰ = 1", () => {
            strictEqual(ariel_1.pow(5, 0), 1);
        });

        it("-5³ = -125", () => {
            strictEqual(ariel_1.pow(-5, 3), -125);
        });

        it("15¹² = 129746337890625", () => {
            strictEqual(ariel_1.pow(15, 12), 129746337890625);
        });
    });

    describe("fib", () => {
        it("fib(6)", () => {
            strictEqual(ariel_1.fib(6), 8);
        });

        it("sequence 0 - 10", () => {
            deepStrictEqual(
                Array.from({ length: 11 }, (_, i) => ariel_1.fib(i)),
                [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
            );
        });

        it("fib(42)", () => {
            strictEqual(ariel_1.fib(42), 267914296);
        });
    });

    // Lists

    describe("duplicate", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.duplicate([]), []);
        });

        it("number list", () => {
            deepStrictEqual(
                ariel_1.duplicate([1, 2, 3, 4, 5]),
                [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
        });

        it("string list", () => {
            deepStrictEqual(
                ariel_1.duplicate(["one", "two", "three"]),
                ["one", "one", "two", "two", "three", "three"]);
        });
    });

    describe("enlist", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.enlist([]), []);
        });

        it("number list", () => {
            deepStrictEqual(ariel_1.enlist([1, 2, 3]), [[1], [2], [3]]);
        });

        it("nested list", () => {
            deepStrictEqual(
                ariel_1.enlist([[1, 2, 3], 4, [5], 7, 8]),
                [[[1, 2, 3]], [4], [[5]], [7], [8]]);
        });
    });

    describe("positives", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.positives([]), []);
        });

        it("mixed list", () => {
            deepStrictEqual(
                ariel_1.positives([12, -4, 3, -1, -10, -13, 6, -5]),
                [12, 3, 6]);
        });

        it("only negatives list", () => {
            deepStrictEqual(
                ariel_1.positives([-4, -1, -10, -13, -5]),
                []);
        });

        it("only positives list", () => {
            deepStrictEqual(
                ariel_1.positives([6, 2, 9, 13]),
                [6, 2, 9, 13]);
        });
    });

    describe("addList", () => {
        it("empty list", () => {
            strictEqual(ariel_1.addList([]), 0);
        });

        it("small list", () => {
            strictEqual(ariel_1.addList([2, 4, 1, 3]), 10);
        });

        it("larger list", () => {
            strictEqual(ariel_1.addList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 55);
        });
    });


    describe("invertPairs", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.invertPairs([]), []);
        });

        it("single pair list", () => {
            deepStrictEqual(ariel_1.invertPairs([[1, 2]]), [[2, 1]]);
        });

        it("mixed list", () => {
            deepStrictEqual(
                ariel_1.invertPairs([[1, 2], ['a', 'b'], ["Monday", "Tuesday"]]),
                [[2, 1], ['b', 'a'], ["Tuesday", "Monday"]]);
        });

    });



    describe("swapper", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.swapper([], 'a', 'b'), [])
        });

        it("no swaps", () => {
            deepStrictEqual(
                ariel_1.swapper(['x', 'y', 'z'], 'a', 'b'), ['x', 'y', 'z'])
        });

        it("atom list", () => {
            deepStrictEqual(
                ariel_1.swapper(['a', 'b', 'c', 'b', 'd'], 'a', 'b'),
                ['b', 'a', 'c', 'a', 'd'])
        });

        it("number list", () => {
            deepStrictEqual(
                ariel_1.swapper([4, 4, 5, 2, 4, 8, 2, 5, 6, 4, 5, 1, 9, 5, 9, 9, 1, 2, 2, 4], 1, 2),
                [4, 4, 5, 1, 4, 8, 1, 5, 6, 4, 5, 2, 9, 5, 9, 9, 2, 1, 1, 4])
        });

        it("number list without swaps", () => {
            deepStrictEqual(
                ariel_1.swapper([4, 3, 4, 9, 9, 3, 3, 3, 9, 9, 7, 9, 3, 7, 8, 7, 8, 4, 5, 6], 1, 2),
                [4, 3, 4, 9, 9, 3, 3, 3, 9, 9, 7, 9, 3, 7, 8, 7, 8, 4, 5, 6])
        });

        it("big bang list", () => {
            deepStrictEqual(
                ariel_1.swapper(
                    [
                        'soft',
                        'kitty',
                        'warm',
                        'kitty',
                        'little',
                        'ball',
                        'of',
                        'fur',
                        'happy',
                        'kitty',
                        'sleepy',
                        'kitty',
                        'purr',
                        'purr',
                        'purr'
                    ],
                    'purr',
                    'kitty'
                ), [
                    'soft',
                    'purr',
                    'warm',
                    'purr',
                    'little',
                    'ball',
                    'of',
                    'fur',
                    'happy',
                    'purr',
                    'sleepy',
                    'purr',
                    'kitty',
                    'kitty',
                    'kitty'
                ]
            )
        });
    });

    describe("dotProduct", () => {
        it("empty list", () => {
            strictEqual(ariel_1.dotProduct([], []), 0);
        });

        it("integer list", () => {
            strictEqual(ariel_1.dotProduct([1, 2, 3], [4, 5, 6]), 32);
        });

        it("float list", () => {
            strictEqual(
                ariel_1.dotProduct([1.3, 3.4, 5.7, 9.5, 10.4], [-4.5, 3.0, 1.5, 0.9, 0.0]),
                21.45);
        });
    });

    describe("average", () => {
        it("empty list", () => {
            strictEqual(ariel_1.average([]), 0);
        });

        it("single item list", () => {
            strictEqual(ariel_1.average([4]), 4);
        });

        it("integer list", () => {
            strictEqual(ariel_1.average([5, 6, 1, 6, 0, 1, 2]), 3);
        });

        it("float list", () => {
            strictEqual(ariel_1.average([1.7, 4.5, 0, 2.0, 3.4, 5, 2.5, 2.2, 1.2]), 2.5);
        });
    });

    describe("stdDev", () => {
        it("empty list", () => {
            strictEqual(ariel_1.stdDev([]), 0);
        });

        it("list 1", () => {
            strictEqual(ariel_1.stdDev([4, 8, 15, 16, 23, 42]), 12.315302134607444);
        });

        it("list 2", () => {
            strictEqual(ariel_1.stdDev([110, 105, 90, 100, 95]), 7.0710678118654755);
        });

        it("list 3", () => {
            strictEqual(
                ariel_1.stdDev([9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4]),
                2.9832867780352594
            );
        });
    });

    describe("replic", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.replic(7, []), []);
        });

        it("repeat 0 times", () => {
            deepStrictEqual(ariel_1.replic(0, ['a', 'b', 'c']), []);
        });

        it("repeat 3 single item", () => {
            deepStrictEqual(ariel_1.replic(3, ['a']), ['a', 'a', 'a']);
        });

        it("repeat 4 list", () => {
            deepStrictEqual(ariel_1.replic(4, [1, 2, 3, 4]),
                [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
        });
    });

    describe("expand", () => {
        it("empty list", () => {
            deepStrictEqual(ariel_1.expand([]), []);
        });

        it("single item", () => {
            deepStrictEqual(ariel_1.expand(['a']), ['a']);
        });

        it("integer list", () => {
            deepStrictEqual(ariel_1.expand([1, 2, 3, 4]), [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
        });

        it("atom list", () => {
            deepStrictEqual(
                ariel_1.expand(['a', 'b', 'c', 'd', 'e']),
                ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e']);
        });
    });

    describe("binary", () => {
        it("zero", () => {
            deepStrictEqual(ariel_1.binary(0), []);
        });

        it("30", () => {
            deepStrictEqual(ariel_1.binary(30), [1, 1, 1, 1, 0]);
        });

        it("45123", () => {
            deepStrictEqual(
                ariel_1.binary(45123),
                [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1]);
        });
    });


});
