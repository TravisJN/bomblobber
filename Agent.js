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

    draw() {
        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        context.stroke();
        context.fill();


        context.translate(this.x, this.y);
        context.rotate(this.rotation + Math.PI / 2);
        context.fillRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);
        context.strokeRect(-this.cannonWidth / 2, 0, this.cannonWidth, -this.cannonHeight);

        context.restore();
    }
}