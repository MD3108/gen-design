"use strict";
const socket = io();

const username = prompt('What is your username');
socket.emit('username', username);

const usersList = document.querySelectorAll('.users');
socket.on('users', (data) => {
    usersList.innerHTML ='';
    data.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = username;
        //appendchild
        usersList.appendChild(li);
    });
})

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function mouseDragged () {
    line (pmouseX, pmouseY, mouseX, mouseY);

    socket.emit('line', {
        pmouseX,
        pmouseY,
        mouseX,
        mouseY 
    });

    socket.on('line', (data) => {
        line(data.pmouseX, data.pmouseY, data.mouseX, data.mouseY)
    });
}
