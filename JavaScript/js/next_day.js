/*
 * Functions to determine the next day after a given date
 *
 * Gilberto Echeverria
 * 2025-02-10
 */

function isLeap(year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}

function monthDays(month, year) {
    return 30;
}

function nextDay(day, month, year) {
    return [1, 1, 2000];
}

export { isLeap, monthDays, nextDay };
