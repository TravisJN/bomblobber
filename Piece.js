import Utils from './Utils.js';

var gravity = 0.25;
var bounce = -0.6;
var friction = 0.9;

export default class Piece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 1.5;

        //randomize the velocity of the pieces to look like explosion
        this.vx = Utils.getRandomFloat(-5, 5);
        this.vy = Utils.getRandomFloat(-5, 5);
    }

    update() {
        //check if piece is at bottom of canvas
        if (this.y > canvas.height - (this.radius + 1)) {
            this.y = canvas.height - (this.radius + 1);  //+1 to make it look nice, otherwise it was slightly clipped
            this.vy *= bounce;
            //apply friction only when piece is on the floor
            this.vx *= friction;
            this.vy *= friction;
        } else {
            this.vy += gravity;
        }
        //check if piece is hitting either side of canvas
        if (this.x > canvas.width - this.radius || this.x < 0 + this.radius) {
            this.vx *= -1;
        }


        this.x += this.vx;
        this.y += this.vy;
    }
}