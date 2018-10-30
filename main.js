'use strict'

import Agent from './Agent.js';
import GameSpace from './GameSpace.js';
import Piece from './Piece.js';
import Waypoint from './Waypoint.js';

//global variables
var view = new GameSpace();
var agent = new Agent(view.canvas.width / 2, 0);
var waypoints = [];
var pieces = [];
var currentWaypoint;
var numPieces = 5;  //number of pieces the waypoints smash into

//create waypoints
var waypoint1 = currentWaypoint = new Waypoint(100, 100);
waypoints.push(waypoint1);
var waypoint2 = new Waypoint(300, 100);
waypoints.push(waypoint2);
var waypoint3 = new Waypoint(300, 300);
waypoints.push(waypoint3);
var waypoint4 = new Waypoint(100, 300);
waypoints.push(waypoint4);
var waypoint5 = new Waypoint(350, 425);
waypoints.push(waypoint5);

//set next waypoint as target
function nextWaypoint () {
    if (currentWaypoint === waypoints.length - 1) {
        currentWaypoint = 0;
    } else {
        currentWaypoint++;
    }
}

function getNextWaypoint() {
    let randomInt = Math.floor(Math.random() * waypoints.length);
    // pick a random waypoint I guess
    return waypoints[randomInt];
}

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

    agent.seek(currentWaypoint);
    agent.update();

    waypoints = waypoints.filter((aWaypoint) => {
        if (aWaypoint.checkCollision(agent)) {
            smashWaypoint(aWaypoint);
            aWaypoint.isDestroyed = true;
            return false;
        }
        return true;
    });

    if (waypoints.length > 0) {
        if (currentWaypoint.isDestroyed) {
            currentWaypoint = getNextWaypoint();
        }
    } else {
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
    // Start/stop the agent's movement on click
    agent.maxVelocity = agent.maxVelocity ? 0 : 5;
}