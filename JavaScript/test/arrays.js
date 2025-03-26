/*
 * Unit tests for simple functions using arrays
 * Using the Mocha testing framework
 * https://mochajs.org/
 *
 * Gilberto Echeverria
 * 2025-03-25
 */

"use strict";

import { strictEqual, deepStrictEqual } from "assert";
import * as arr from "../js/arrays.js";


describe("Array Module Tests", () => {

    describe("addItemsFor", () => {
        it("empty array", () => {
            deepStrictEqual(arr.addItemsFor([]), 0);
        });

        it("one item array", () => {
            deepStrictEqual(arr.addItemsFor([5]), 5);
        });

        it("two item array", () => {
            deepStrictEqual(arr.addItemsFor([5, 8]), 13);
        });

        it("three item array", () => {
            deepStrictEqual(arr.addItemsFor([5, 8, 2]), 15);
        });

        it("multiple item array", () => {
            deepStrictEqual(arr.addItemsFor([5, 8, 2, 4, 6]), 25);
        });
    });

    describe("addItemsForIn", () => {
        it("empty array", () => {
            deepStrictEqual(arr.addItemsForIn([]), 0);
        });

        it("one item array", () => {
            deepStrictEqual(arr.addItemsForIn([5]), 5);
        });

        it("two item array", () => {
            deepStrictEqual(arr.addItemsForIn([5, 8]), 13);
        });

        it("three item array", () => {
            deepStrictEqual(arr.addItemsForIn([5, 8, 2]), 15);
        });

        it("multiple item array", () => {
            deepStrictEqual(arr.addItemsForIn([5, 8, 2, 4, 6]), 25);
        });
    });

    describe("addItemsForOf", () => {
        it("empty array", () => {
            deepStrictEqual(arr.addItemsForOf([]), 0);
        });

        it("one item array", () => {
            deepStrictEqual(arr.addItemsForOf([5]), 5);
        });

        it("two item array", () => {
            deepStrictEqual(arr.addItemsForOf([5, 8]), 13);
        });

        it("three item array", () => {
            deepStrictEqual(arr.addItemsForOf([5, 8, 2]), 15);
        });

        it("multiple item array", () => {
            deepStrictEqual(arr.addItemsForOf([5, 8, 2, 4, 6]), 25);
        });
    });

});
