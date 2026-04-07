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
    // Use the includes method of an array to test it the month has 30 days
    } else if ([4, 6, 9, 11].includes(month)) {
        return 30;
    } else {
        return 31;
    }
}

function nextDay(day, month, year) {
    if (day === monthDays(month, year)) {
        if (month === 12) {
            return [1, 1, year + 1];
        } else {
            return [1, month + 1, year];
        }
    }
    return [day + 1, month, year];
}

export { isLeap, monthDays, nextDay };
