
export default class Utils {



    // if (!window.requestAnimationFrame) {
    // window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    //                                 window.mozRequestAnimationFrame ||
    //                                 window.msRequestAnimationFrame ||
    //                                 window.oRequestAnimationFrame ||
    //                                 function (callback) {
    //                                     return window.setTimeout(callback, 17 /*~ 1000/60*/);
    //                                 });
    // }
    // constructor() {
    //     this.utils = {};
    // }

    /**
     * Keeps track of the current mouse position, relative to an element.
     * @param {HTMLElement} element
     * @return {object} Contains properties: x, y, event
     */
    static captureMouse(element) {
        var mouse = {x: 0, y: 0, event: null},
            body_scrollLeft = document.body.scrollLeft,
            element_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollTop,
            element_scrollTop = document.documentElement.scrollTop,
            offsetLeft = element.offsetLeft,
            offsetTop = element.offsetTop;

        element.addEventListener('mousemove', function (event) {
            var x, y;

            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + body_scrollLeft + element_scrollLeft;
                y = event.clientY + body_scrollTop + element_scrollTop;
            }
            x -= offsetLeft;
            y -= offsetTop;

            mouse.x = x;
            mouse.y = y;
            mouse.event = event;
        }, false);

        return mouse;
    };

    static getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static getDistance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;

        return Math.sqrt(dx * dx + dy * dy);
    }

    static areColliding(x1, y1, radius1, x2, y2, radius2) {
        return this.getDistance(x1, y1, x2, y2) <= radius1 + radius2;
    }
}
