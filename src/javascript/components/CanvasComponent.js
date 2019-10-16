import Point from './Point';
import Line from './Line';
import _ from 'underscore';
import { TweenLite } from 'gsap';

const SPEED = 10;

class CanvasComponent {
    constructor() {
        _.bindAll(this, '_tickHandler', '_resizeHandler');

        this._settings = {
            amount: 50,
            distanceMin: 100
        }

        this._setup();
    }

    _setup() {
        this._setupCanvas();
        this._resize();

        this._initBalls();
        this._setupEventListeners();
    }

    _setupCanvas() {
        this._canvas = document.querySelector('.canvas');
        this._ctx = this._canvas.getContext('2d');
    }

    _initBalls() {
        this._positions = [];
        this._directions = [];

        for (let i = 0; i < this._settings.amount; i++) {
            let point = {
                x: Math.random() * this._width,
                y: Math.random() * this._height
            }

            this._directions.push({x: 1, y: 1});
            this._positions.push(point);
        }
    }

    _drawBalls() {
        for (let i = 0; i < this._positions.length; i++) {
            let point = new Point({ x: this._positions[i].x, y: this._positions[i].y });
            point.draw(this._ctx);
        }
    }

    _drawLines() {
        for (let i = 0; i < this._positions.length; i++) {
            for (let j = 0; j < this._positions.length; j++) {
                let distance = this._getDistance(this._positions[i], this._positions[j]);
                if ( distance <= this._settings.distanceMin && i != j) {
                    let line = new Line(this._positions[i], this._positions[j]);
                    line.draw(this._ctx);
                }
            }
        }
    }

    _directionManager() {
        for (let i = 0; i < this._positions.length; i++) {
            if (this._positions[i].x >= this._width || this._positions[i].x < 0) {
                this._directions[i].x *= -1;
            } 
            if (this._positions[i].y >= this._height || this._positions[i].y < 0 ) {
                this._directions[i].y *= -1;
            }
        }
    }
    
    _updateBallPositions() {
        for (let i = 0; i < this._positions.length; i++) {
            this._positions[i].x += this._directions[i].x * SPEED;
            this._positions[i].y += this._directions[i].y * SPEED;
        }
    }

    _getDistance(start, end) {
        let dx = start.x - end.x;
        let dy = start.y - end.y;

        return Math.sqrt(dx*dx + dy*dy);
    }

    _draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);

        this._drawBalls();
        this._drawLines();
    }

    _update() {
        this._directionManager();
        this._updateBallPositions();
    }

    _tick() {
        this._draw();
        this._update();
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    _setupEventListeners() {
        TweenLite.ticker.addEventListener('tick', this._tickHandler);
        window.addEventListener('resize', this._resizeHandler);
    };

    _tickHandler() {
        this._tick()
    }

    _resizeHandler() {
        this._resize();
    }
}

export default new CanvasComponent();