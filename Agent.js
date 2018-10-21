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

        this.maxVelocity = 5;
        this.maxAcceleration = 1;
        this.rotation = 0;
    }

    // Should we just have context be a global
    // draw(context) {
    //     context.save();
    //     context.fillStyle = this.color;
    //     context.strokeStyle = "black";
    //     context.beginPath();
    //     context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    //     context.stroke();
    //     context.fill();


    //     context.translate(this.x, this.y);
    //     context.rotate(this.rotation + Math.PI / 2);
    //     context.fillRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);
    //     context.strokeRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);

    //     context.restore();
    // }

    update (steeringForce) {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += steeringForce.linearX;
        this.vy += steeringForce.linearY;

        var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

        //check for maximum velocity and stop accelerating when agent reaches it
        if (speed > this.maxVelocity && speed > 0) {
            this.vx = (this.vx / speed) * this.maxVelocity;
            this.vy = (this.vy / speed) * this.maxVelocity
        }

        this.rotation = Math.atan2(this.vy, this.vx);
    }
}