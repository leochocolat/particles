class Point {

    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    update() {

    }

    draw(ctx) {
        const radius = 5;

        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

}

export default Point;