import Point from './Point';
import Line from './Line';
import _ from 'underscore';
import { TweenLite } from 'gsap';

const SPEED = 1.1;

class CanvasComponent {
    constructor() {
        _.bindAll(this, '_tickHandler', '_resizeHandler');

        this._settings = {
            amount: 100,
            distanceMin: 100
        }

        this.ui = {
            fps: document.querySelector('.fps-indicator'),
        }

        this._initTime();
        this._setup();
    }

    _initTime() {
        this._now = Date.now()
        this._lastTime = this._now;
        this._deltaTime = 16;
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
        this._points = [];

        for (let i = 0; i < this._settings.amount; i++) {
            let position = {
                x: Math.random() * this._width,
                y: Math.random() * this._height
            };
            let direction = {
                x: 1, 
                y: 1
            };
            let velocity =  Math.random() * SPEED;

            let point = new Point(position, direction, velocity);
            this._points.push(point);
        }
    }

    _drawBalls() {
        for (let i = 0; i < this._points.length; i++) {
            this._points[i].draw(this._ctx);
        }
    }

    _drawLines() {
        for (let i = 0; i < this._points.length; i++) {
            for (let j = 0; j < this._points.length; j++) {
                let distance = this._getDistance(this._points[i].position, this._points[j].position);
                if ( distance <= this._settings.distanceMin && i != j) {
                    let line = new Line(this._points[i].position, this._points[j].position);
                    line.draw(this._ctx);
                }
            }
        }
    }

    _directionManager() {
        for (let i = 0; i < this._points.length; i++) {
            this._points[i].updateDirection(this._width, this._height);
        }
    }
    
    _updateBallPositions() {
        for (let i = 0; i < this._points.length; i++) {
            this._points[i].update(this._deltaTime);
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

    _getFPS() {
        this._now = Date.now();
        this._deltaTime = this._now - this._lastTime;
        this._lastTime = this._now;
        this.ui.fps.innerHTML = `${Math.round(1000 / this._deltaTime)} fps`;
    }

    _tick() {
        this._draw();
        this._update();
        this._getFPS();
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