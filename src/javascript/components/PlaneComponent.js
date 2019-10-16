import Point from './Point';
import Line from './Line';
import EasingComponent from './EasingComponent';
import _ from 'underscore';
import { TweenLite } from 'gsap';

const DURATION = 1;

class CanvasComponent {
    constructor() {
        _.bindAll(this, '_tickHandler', '_resizeHandler', '_mousemoveHandler', '_clickHandler', '_animate');

        this.component = {
            easing: new EasingComponent()
        }

        this._settings = {
            
        }

        this._angle = 0;
        this._mouse = { x: 0, y: 0 }

        this._tweenObject = {
            progress: 0
        }

        this._setup();
    }

    _setup() {
        this._setupCanvas();
        this._resize();
        
        this._initPosition();
        this._setupEventListeners();
    }

    _setupCanvas() {
        this._canvas = document.querySelector('.canvas');
        this._ctx = this._canvas.getContext('2d');
    }

    _initPosition() {
        this._position = {
            x: Math.random() * this._width,
            y: Math.random() * this._height
        }
        this._startingPosition = {};
        this._startingPosition.x = this._position.x;
        this._startingPosition.y = this._position.y;
    }

    _drawPlane() {
        this._ctx.save();

        this._ctx.beginPath();
        this._ctx.translate(this._position.x, this._position.y);
        this._ctx.rotate(this._angle + Math.PI/2);

        this._ctx.moveTo(0, 0);
        this._ctx.lineTo(30, 100);
        this._ctx.lineTo(- 30, 100);
        this._ctx.lineTo(0, 0);
        this._ctx.fill();
        this._ctx.stroke();
        this._ctx.closePath();

        this._ctx.restore();
    }

    _updatePlane() {   
        this._position.x = this.component.easing.easeOutBack(this._tweenObject.progress, this._startingPosition.x, this._mouse.x - this._startingPosition.x, DURATION);
        this._position.y = this.component.easing.easeOutBack(this._tweenObject.progress, this._startingPosition.y, this._mouse.y - this._startingPosition.y, DURATION);

        console.log(this._tweenObject.progress, this._startingPosition.x, this._mouse.x - this._startingPosition.x, DURATION)
    }

    _animate() {
        if (this._tweenObject.progress < DURATION) {
            this._tweenObject.progress += 0.016;
            console.log(this._tweenObject.progress);
        }
        
        this._updatePlane();
    }

    _angleManager() {
        let dx = this._mouse.x - this._position.x;
        let dy = this._mouse.y - this._position.y;
        this._angle = Math.atan2(dy, dx);
    }
    
    _draw() {
        this._ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this._ctx.fillRect(0, 0, this._width, this._height);

        this._drawPlane();
    }

    _update() {
        this._animate();
        this._angleManager();
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

        // window.addEventListener('mousemove', this._mousemoveHandler);
        window.addEventListener('click', this._clickHandler);
    };

    _tickHandler() {
        this._tick()
    }

    _resizeHandler() {
        this._resize();
    }

    _mousemoveHandler(e) {
        this._mouse.x = e.clientX;
        this._mouse.y = e.clientY;
    }

    _clickHandler(e) {
        this._mouse.x = e.clientX;
        this._mouse.y = e.clientY;

        this._startingPosition.x = this._position.x;
        this._startingPosition.y = this._position.y;
        this._tweenObject.progress = 0;
    }

    lerp(start, end, value) {
        return (1 - value) * start + value * end;
    }
}

export default new CanvasComponent();