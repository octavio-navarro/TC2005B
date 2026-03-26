/*
 * Functions to determine the next day after a given date
 *
 * Gilberto Echeverria
 * 2025-02-10
 */

function isLeap(year) {
    /*
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        return true;
    } else {
        return false;
    }
    */
    // If the function returns a boolean, we can simply return the result
    // of evaluating an expression
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function monthDays(month, year) {
    if (month === 2) {
        /*
        if (isLeap(year) === true) {
            return 29;
        } else {
            return 28;
        }
        */
        return isLeap(year) ? 29 : 28;
    } else if (month in [4, 6, 9, 11]) {
        return 30;
    } else {
        return 31;
    }
}

function nextDay(day, month, year) {
    return [1, 1, 2000];
}

export { isLeap, monthDays, nextDay };
