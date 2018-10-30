export default class Waypoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 4;

        this.isDestroyed = false;
    }

    // check collision method on each waypoint. Receives the position of the agent
    // and returns true or false. The view draw method will use this property to
    // determine what to draw

    /**
     * @description Receives the Agent object and compares its position with the position
     *              of this waypoint
     * @param {Agent} The agent object to compare positions with
     */
    checkCollision({ x, y, radius }) {
        var dx = 0;
        var dy = 0;
        var distance;

        dx = this.x - x;
        dy = this.y - y;

        distance = Math.sqrt(dx * dx + dy * dy);    //find hypotenuse

        return (distance < (radius + this.radius));
    }
}
