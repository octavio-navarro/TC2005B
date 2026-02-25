/*
 * Class for a game object that has animation using a spritesheet
 *
 * Gilberto Echeverria
 * 2026-02-10
 */

"use strict";

//import { GameObject } from "./GameObject";


// Class to control the animation of characters and objects
class AnimatedObject extends GameObject {
    constructor(position, width, height, color, type, sheetCols) {
        super(position, width, height, color, type);
        // Animation properties
        this.frame = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.sheetCols = sheetCols;

        this.repeat = true;

        // Delay between frames (in milliseconds)
        this.frameDuration = 100;
        this.totalTime = 0;
    }

    setAnimation(minFrame, maxFrame, repeat, duration) {
        this.minFrame = minFrame;
        this.maxFrame = maxFrame;
        this.frame = minFrame;
        this.repeat = repeat;
        this.totalTime = 0;
        this.frameDuration = duration;

        //console.log(`Setting animation frames: ${this.minFrame} - ${this.maxFrame}`);
    }

    /*
     * Change the frame number to the next one.
     * Loop back to the first frame if the animation is set to repeat.
     * Also set the rectangle to be drawn from the spritesheet according to the current frame.
     *
     * Arguments:
     *   deltaTime: Time elapsed since the last frame (in milliseconds)
     */
    updateFrame(deltaTime) {
        this.totalTime += deltaTime;
        if (this.totalTime > this.frameDuration) {
            // Loop around the animation frames if the animation is set to repeat
            // Otherwise stay on the last frame
            // TODO: Set the frame to be used when the frame range ends
            let restartFrame = this.minFrame;
            // TODO: Change the frame to the next one
            this.frame = this.frame;
            // TODO: Determine the top left corner of the frame to draw from the spritesheet
            this.spriteRect.x = 0;
            this.spriteRect.y = 0;
            // Restart the time count
            this.totalTime = 0;
            //console.log(`New Rect:`)
            //console.log(this.spriteRect)
        }
    }
}
