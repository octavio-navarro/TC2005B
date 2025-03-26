/*
 * Simple functions to determine the date of the next day
 *
 * Gilberto Echeverria
 * 2025-03-26
 */

"use strict";

export function isLeap(year) {
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}

export function monthDays(month, year) {
    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    } else if (month == 2) {
        return isLeap(year) ? 29 : 28;
    }
    return 31;
}

export function nextDay(day, month, year) {
    return [day + 1, month, year];
}
