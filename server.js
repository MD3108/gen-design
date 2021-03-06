"use strict";

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const index = '/index.html';
const server = express ()
                .use ((req, res) =>res.sendFile(index, {root: __dirname}))
                .listen(port, () => console.log('Server started at prot 3000')); 

const io = socketIO(server);

let users = [];
let timeout = null;
let currentPlayer = null;
let words = ["goku", "vegeta", "Gohan", "Piccolo"];

//cmd to launch server "node serve.js"

io.on('connection', (socket) => {
    console.log('a new user has joined the game');

    socket.on('username', (username) => {

        socket.username = username;
        if (users.length === 0 ){
            currentPlayer = socket;
            users.push(socket);
            switchPlayer();
        }else{
            users.push(socket);
        }

        sendUsers();
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username} has left the game`);

        users = users.filter ((user) => {
            return user !== socket;
        });

        if(users.length === 0){
            timeout = clearTimeout(timeout);
        }
    });

    socket.on('line', (data) => {
        socket.broadcast.emit('line', data);
    });

});

function sendUsers () {
    io.emit('users', users.map ((user) => {
        return {
            username: user.username,
            active: user === currentPlayer
        }
    }));
}

function switchPlayer () {
    const indexCurrentPlayer = users.indexOf(currentPlayer);
    currentPlayer = users[(indexCurrentPlayer + 1) % users.length];

    sendUsers();

    const nextWord = words[Math.floor(Math.random() * words.length)];
    io.emit('clear');
    timeout = setTimeout( switchPlayer, 15000);
}

