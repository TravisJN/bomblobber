'use strict'

import Agent from './Agent.js';
import GameSpace from './GameSpace.js';
import Piece from './Piece.js';
import Waypoint from './Waypoint.js';
import Utils from './Utils.js';

//global variables
var view = new GameSpace(500, 500);
var agent = new Agent(view.canvas.width / 2, 0);
var numWaypoints = 50;
var waypoints = [];
var pieces = [];
var numPieces = 5;  //number of pieces the waypoints smash into
var clickCoords;

// Create an array of waypoints with random x,y values
// Creating an array based on this:
// https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
waypoints = Array.from({length: numWaypoints}, () => {
    let x = Math.floor(Math.random() * view.canvas.width);
    let y = Math.floor(Math.random() * view.canvas.height);
    return new Waypoint(x, y);
});

// Add waypoints to the grid object
waypoints.forEach((aWaypoint) => {
    Utils.getSectionFromGrid(view.grid, aWaypoint.x, aWaypoint.y).push(aWaypoint);
});

function smashWaypoint ({ x, y }) {
    //create small pieces at the current waypoint's position
    for (var i = 0; i < numPieces; i++) {
        var newPiece = new Piece(x, y);
        pieces.push(newPiece);
    }
}

//game loop
function tick() {
    let { canvas, context } = view;

    window.requestAnimationFrame(tick, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (clickCoords) {
        agent.seek(clickCoords);
    }

    agent.update();

    // get the array of waypoints that are in the same grid section as the agent
    let currentSection = Utils.getSectionFromGrid(view.grid, agent.x, agent.y);

    if (currentSection.length) {
        currentSection = currentSection.filter((aWaypoint) => {
            if (Utils.areColliding(agent.x, agent.y, agent.radius, aWaypoint.x, aWaypoint.y, aWaypoint.radius)) {
                smashWaypoint(aWaypoint);
                aWaypoint.isDestroyed = true;
                return false;
            }

            return true;
        });
    }

    if (waypoints.length === 0) {
        agent.maxVelocity = 0;
    }

    if (pieces.length > 0) {
        for (var i = 0; i < pieces.length; i++) {
            let aPiece = pieces[i];
            aPiece.update();
            view.drawPiece(aPiece);
        }
    }
    view.drawWaypoints(waypoints);
    view.drawAgent(agent);
};

tick();

document.getElementById('canvas').onclick = (e) => {
    agent.maxVelocity = agent.maxVelocity ? 0 : 5;
    // set seek destination to the mouse's click coords
    clickCoords = {
        x: e.x,
        y: e.y,
    };
}