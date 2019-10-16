class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    draw(ctx) {
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)';
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.closePath();
        ctx.stroke();
    }
}

export default Line;