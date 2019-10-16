import _ from 'underscore';
import { TweenLite } from 'gsap';

class CurvesComponent {
    constructor() {
        // _.bindAll(this, )

        this._setup();
    }

    _setup() {
        this._setupCanvas();
        this._resize();
        this._setupEventListeners();
    }

    _setupCanvas() {
        this._canvas = document.querySelector('.canvas');
        this._canvas.style.backgroundColor = 'black';
        this._ctx = this._canvas.getContext('2d');
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._width = 700;
        this._height = 500;

        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    _setupEventListeners() {

    }
}

export default CurvesComponent;