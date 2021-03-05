"use strict";
const socket = io ();

const username = prompt('What is your username');

socket.emit('username', username);


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function mouseDragged () {
    line (pmouseX, pmouseY, mouseX, mouseY);
}
