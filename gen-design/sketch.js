"use strict";
function setup() {
    createCanvas(windowWidth, windowHeight);
}

function mouseDragged () {
    line (pmouseX, pmouseY, mouseX, mouseY);
}
