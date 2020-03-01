var io = require('socket.io-client');
var socket = io.connect('http://localhost:3001', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});

setInterval(function () {
    console.log("enviado")
    socket.emit('CH01', 'me', 'test msg');
}, 5000);

