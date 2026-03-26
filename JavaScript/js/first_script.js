/*
 My very first time with JavaScript

 Gilberto Echeverria
 2026-03-25
*/

// Instruct JavaScirpt interpreter to validate if variables exist
"use strict";

// Display messages in the terminal
console.log("Hello there!");

// Create a few variables
// Constant values (will not change)
const name = "Gil";
// A variable that can change (locally scoped)
let age = 50;

// Global variables (avoid this)
var id = 2345423;

// Template literals, or template strings, are used to interpolate expressions
// They are delimited with backticks ( `` )
console.log(`Hello, my name is ${name}`);

// Control structures are very similar to those in C++
//
// An if/else
if (name === "Gil") {
    console.log("You are great!!");
} else {
    console.log("This is only a test");
}

let height = 1.45;

// The ternary operator
console.log(`You are ${ (height < 1.20 ? "short" : "tall" ) }`);

// While loops
while (age < 20) {

}

// For loops
for (let i=0; i<age; i++) {

}
