/*
 * Unit tests for simple functions to determine the next day
 * Using the Mocha testing framework
 * https://mochajs.org/
 *
 * Gilberto Echeverria
 * 2025-03-25
 */

"use strict";

import { strictEqual, deepStrictEqual } from "assert";
import * as nd from "../js/next_day.js";


describe("Next Day Module Tests", () => {

    describe("isLeap", () => {
        it("normal year", () => {
            strictEqual(nd.isLeap(2023), false);
        });

        it("divisible by 4, not 100", () => {
            strictEqual(nd.isLeap(2024), true);
        });

        it("divisible by 100, not by 400", () => {
            strictEqual(nd.isLeap(2100), false);
        });

        it("divisible by 400", () => {
            strictEqual(nd.isLeap(2000), true);
        });
    });

    describe("monthDays", () => {
        it("january", () => {
            strictEqual(nd.monthDays(1, 2000), 31);
        });

        it("february, leap year", () => {
            strictEqual(nd.monthDays(2, 2000), 29);
        });

        it("february, normal year", () => {
            strictEqual(nd.monthDays(2, 2023), 28);
        });

        it("march", () => {
            strictEqual(nd.monthDays(3, 2000), 31);
        });

        it("april", () => {
            strictEqual(nd.monthDays(4, 2000), 30);
        });

        it("september", () => {
            strictEqual(nd.monthDays(9, 2000), 30);
        });

        it("december", () => {
            strictEqual(nd.monthDays(12, 2000), 31);
        });
    });

    describe("nextDay", () => {
        it("normal day", () => {
            deepStrictEqual(nd.nextDay(3, 5, 2010), [4, 5, 2010]);
        });

        it("last day of april", () => {
            deepStrictEqual(nd.nextDay(30, 4, 2010), [1, 5, 2010]);
        });

        it("february 28 normal year", () => {
            deepStrictEqual(nd.nextDay(28, 2, 2023), [1, 3, 2023]);
        });

        it("february 28 leap year", () => {
            deepStrictEqual(nd.nextDay(28, 2, 2024), [29, 2, 2024]);
        });

        it("last day of year", () => {
            deepStrictEqual(nd.nextDay(31, 12, 2024), [1, 1, 2025]);
        });
    });

});
