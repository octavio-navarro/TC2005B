class MeterBar {
    constructor(x, y, width, height, bgColor, fgColor, margin) {
        // Two rectangles to be drawn to display the frame and the content
        this.frame = new Rect(x, y, width, height);
        this.content = new Rect(x + margin, y + margin,
                                width - 2 * margin, height - 2 * margin);
        this.bgColor = bgColor;
        this.fgColor = fgColor;

        // A factor to multiply the content by
        this.percent = 1;
    }

    update(percent) {
        this.percent = percent;
    }

    draw(ctx) {
        // Draw the frame
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(this.frame.x, this.frame.y,
                     this.frame.width, this.frame.height);
        // Draw the content, scaled by the percent
        ctx.fillStyle = this.fgColor;
        ctx.fillRect(this.content.x, this.content.y,
                     this.content.width * this.percent, this.content.height);
    }
}
