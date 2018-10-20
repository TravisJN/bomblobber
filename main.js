'use strict'

import Utils from './Utils.js';
import Agent from './Agent.js';

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var utils = new Utils();

//global variables
var agent = new Agent(canvas.width / 2, canvas.height / 2);
var waypoints = [];
var pieces = [];
var currentWaypoint = 0;
var gravity = 0.25;
var bounce = -0.6;
var friction = 0.9;
var numPieces = 5;  //number of pieces the waypoints smash into

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

//objects
// function Agent (x, y) {
//     this.color = "red";
//     this.radius = 12;
//     this.cannonWidth = 5;
//     this.cannonHeight = 15;
//     this.x = x;
//     this.y = y;
//     this.targetx = 0;
//     this.targety = 0;
//     this.vx = 0;
//     this.vy = 0;

//     this.velocityX = 0;
//     this.velocityY = 0;
//     //this.angularAcceleration = 1;

//     this.maxVelocity = 5;
//     this.maxAcceleration = 1;
//     this.rotation = 0;
// }

function Waypoint (x, y) {
    this.x = x;
    this.y = y;
    this.radius = 8;
}

//pieces of the "smashed" waypoint
function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.radius = 1.5;

    //randomize the velocity of the pieces to look like explosion
    this.vx = utils.getRandomFloat(-5, 5);
    this.vy = utils.getRandomFloat(-5, 5);
}

//prototypes
Agent.prototype.draw = function () {
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

Agent.prototype.update = function () {
    agent.x += agent.vx;
    agent.y += agent.vy;

    agent.vx += SteeringForce.x;
    agent.vy += SteeringForce.y;

    var speed = Math.sqrt(agent.vx * agent.vx + agent.vy * agent.vy);

    //check for maximum velocity and stop accelerating when agent reaches it
    if (speed > agent.maxVelocity && speed > 0) {
        agent.vx = (agent.vx / speed) * agent.maxVelocity;
        agent.vy = (agent.vy / speed) * agent.maxVelocity
    }

    agent.rotation = Math.atan2(agent.vy, agent.vx);
}

function SteeringForce () {
    this.linearX = 0;
    this.linearY = 0;
}

Waypoint.prototype.draw = function () {
    context.save();
    context.StrokeStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.stroke();
    context.restore();
}

Piece.prototype.draw = function () {
    context.save();
    context.StrokeStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.stroke();
    context.restore();
}

Piece.prototype.update = function () {
    //check if piece is at bottom of canvas
    if (this.y > canvas.height - (this.radius + 1)) {
        this.y = canvas.height - (this.radius + 1);  //+1 to make it look nice, otherwise it was slightly clipped
        this.vy *= bounce;
        //apply friction only when piece is on the floor
        this.vx *= friction;
        this.vy *= friction;
    } else {
        this.vy += gravity;
    }
    //check if piece is hitting either side of canvas
    if (this.x > canvas.width - this.radius || this.x < 0 + this.radius) {
        this.vx *= -1;
    }


    this.x += this.vx;
    this.y += this.vy;
}

//functions
function seek () {
    var dx, dy;

    dx = waypoints[currentWaypoint].x - agent.x;
    dy = waypoints[currentWaypoint].y - agent.y;

    var distance = Math.sqrt(dx * dx + dy * dy);

    SteeringForce.x = dx / distance * agent.maxAcceleration;
    SteeringForce.y = dy / distance * agent.maxAcceleration;
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
        var newpiece = new Piece(waypoints[currentWaypoint].x, waypoints[currentWaypoint].y);
        pieces.push(newpiece);
    }
}

//game loop
(function update() {
    window.requestAnimationFrame(update, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);


    checkCollision();
    if (pieces.length > 0) {
        for (var i = 0; i < pieces.length; i++) {
            pieces[i].update();
            pieces[i].draw();
        }
    }
    waypoints[currentWaypoint].draw();
    seek();
    agent.update();
    agent.draw();
}());
