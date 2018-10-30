
export default class Agent {
    constructor(x, y) {
        this.color = "red";
        this.radius = 12;
        this.cannonWidth = 5;
        this.cannonHeight = 15;
        this.x = x;
        this.y = y;
        this.targetx = 0;
        this.targety = 0;
        this.vx = 0;
        this.vy = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        //this.angularAcceleration = 1;

        this.maxVelocity = 0;
        this.maxAcceleration = 1;
        this.rotation = 0;

        this.steeringForce = {
            linearX: 0,
            linearY: 0,
        };
    }

    update() {
        if (this.maxVelocity === 0) {
            return;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx += this.steeringForce.linearX;
        this.vy += this.steeringForce.linearY;

        var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

        //check for maximum velocity and stop accelerating when agent reaches it
        if (speed > this.maxVelocity && speed > 0) {
            this.vx = (this.vx / speed) * this.maxVelocity;
            this.vy = (this.vy / speed) * this.maxVelocity
        }

        this.rotation = Math.atan2(this.vy, this.vx);
    }

    seek({ x, y }) {
        var dx, dy;

        dx = x - this.x;
        dy = y - this.y;

        var distance = Math.sqrt(dx * dx + dy * dy);

        this.steeringForce.linearX = dx / distance * this.maxAcceleration;
        this.steeringForce.linearY = dy / distance * this.maxAcceleration;
    }
}