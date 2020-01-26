export default class Points {
    constructor() {
        this.total = 0;
    }

    get points() {
        return this.total;
    }

    addPoints(numPoints) {
        this.total += numPoints;
    }
}