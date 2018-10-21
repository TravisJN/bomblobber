'use strict'

import Agent from './Agent.js';
import GameSpace from './GameSpace.js';
import Piece from './Piece.js';
import Waypoint from './Waypoint.js';

//global variables
var view = new GameSpace();
var agent = new Agent(view.canvas.width / 2, view.canvas.height / 2);
var waypoints = [];
var pieces = [];
var currentWaypoint = 0;
var numPieces = 5;  //number of pieces the waypoints smash into
var steeringForce = {
    linearX: 0,
    linearY: 0
};

//create waypoints
var waypoint1 = new Waypoint(100, 100);
waypoints.push(waypoint1);
var waypoint2 = new Waypoint(300, 100);
waypoints.push(waypoint2);
var waypoint3 = new Waypoint(300, 300);
waypoints.push(waypoint3);
var waypoint4 = new Waypoint(100, 300);
waypoints.push(waypoint4);
var waypoint5 = new Waypoint(350, 425);
waypoints.push(waypoint5);

//functions
function seek () {
    var dx, dy;

    dx = waypoints[currentWaypoint].x - agent.x;
    dy = waypoints[currentWaypoint].y - agent.y;

    var distance = Math.sqrt(dx * dx + dy * dy);

    steeringForce.linearX = dx / distance * agent.maxAcceleration;
    steeringForce.linearY = dy / distance * agent.maxAcceleration;
}

//set next waypoint as target
function nextWaypoint () {
    if (currentWaypoint === waypoints.length - 1) {
        currentWaypoint = 0;
    } else {
        currentWaypoint++;
    }
}

//see if agent has arrived at waypoint
function checkCollision() {
    var dx = 0;
    var dy = 0;
    var distance;

    dx = waypoints[currentWaypoint].x - agent.x;
    dy = waypoints[currentWaypoint].y - agent.y;

    distance = Math.sqrt(dx * dx + dy * dy);    //find hypotenuse

    if (distance < (agent.radius + waypoints[currentWaypoint].radius)) {  //Hit!
        smashWaypoint();
        nextWaypoint();    //get next waypoint
    }

}

function smashWaypoint () {
    //create small pieces at the current waypoint's position
    for (var i = 0; i < numPieces; i++) {
        var newPiece = new Piece(waypoints[currentWaypoint].x, waypoints[currentWaypoint].y);
        pieces.push(newPiece);
    }
}

//game loop
function tick() {
    let { canvas, context } = view;
    window.requestAnimationFrame(tick, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    checkCollision();
    if (pieces.length > 0) {
        for (var i = 0; i < pieces.length; i++) {
            let aPiece = pieces[i];
            aPiece.update();
            view.drawPiece(aPiece);
        }
    }

    view.drawWaypoint(waypoints[currentWaypoint]);
    seek();
    agent.update(steeringForce);
    view.drawAgent(agent);
};

tick();
