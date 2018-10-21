export default class GameSpace {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
    }

    drawPiece({ x, y, radius }) {
        this.context.save();
        this.context.StrokeStyle = "black";
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.context.stroke();
        this.context.restore();
    }

    drawWaypoint({ x, y, radius }) {
        this.context.save();
        this.context.StrokeStyle = "black";
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.context.stroke();
        this.context.restore();
    }

    drawAgent({ x, y, radius, color, rotation, cannonWidth, cannonHeight }) {
        this.context.save();
        this.context.fillStyle = color;
        this.context.strokeStyle = "black";
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2*Math.PI, true);
        this.context.stroke();
        this.context.fill();

        this.context.translate(x, y);
        this.context.rotate(rotation + Math.PI / 2);
        this.context.fillRect(-cannonWidth / 2, 0, cannonWidth, -cannonHeight);
        this.context.strokeRect(-cannonWidth / 2, 0, cannonWidth, -cannonHeight);

        this.context.restore();
    }
}