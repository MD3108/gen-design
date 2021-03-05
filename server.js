"use strict";

const express = require('express');
const socketIO = require('socket.io');

const port = 3000;
const index = '/index.html';
const server = express ()
                .use ((req, res) =>res.sendFile(index, {root: __dirname}))
                .listen(port, () => console.log('Server started at prot 3000')); 

const io = socketIO(server);

let users = [];

io.on('connection', (socket) => {
    console.log('a new user has joined the game');

    socket.on(username, (username) => {

        socket.username = username;

    });
});