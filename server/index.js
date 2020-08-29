require('dotenv').config();
const path = require('path');
const express = require('express'); // Added express server
const http = require('http'); // Added HTTP-server
const socket = require('socket.io'); // Added Socket.io
const port = process.env.PORT || 5000;

const app = express(); // Created an instance of Express

const server = http.createServer(app); // Created a server instance

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
} else {
    app.use(express.static(path.join(__dirname, '/')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

const io = socket(server); // Connected sockets to the server

// Socket functionality
const rooms = {};

io.on('connection', (socket) => {
    socket.on('join room', (id) => {
        if (rooms[id]) {
            rooms[id].push(socket.id);
        } else {
            rooms[id] = [socket.id];
        }

        const otherUser = rooms[id].find((id) => id !== socket.id);

        if (otherUser) {
            socket.emit('other user', otherUser);
            socket.to(otherUser).emit('user joined', socket.id);
        }
    });

    socket.emit('your id', socket.id);
    socket.on('send message', (body) => {
        io.emit('message', body);
    });

    socket.on('offer', (payload) => {
        io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', (payload) => {
        io.to(payload.target).emit('answer', payload);
    });

    socket.on('ice-candidate', (incoming) => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });
});

// Started the server
server.listen(port, () => {
    console.log(`**************************************`);
    console.log(`Server is running on port: ${port}`);
    console.log(`URL address: http://localhost:${port}`);
    console.log(`**************************************`);
});
