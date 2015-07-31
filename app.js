var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 80;

server.listen(port, function() {
    console.log('Gulp is starting my app on PORT: ' + port)
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var sockets = [];
io.on('connect', function(socket) {
    sockets.push(socket);
    socket.on('client_temp', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_temp', jsonData);
       }
    });

    socket.on('client_latitude', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_latitude', jsonData);
       }
    });

    socket.on('client_longitude', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_longitude', jsonData);
       }
    });

    socket.on('client_altitude', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_altitude', jsonData);
       }
    });

    socket.on('client_pressure', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_pressure', jsonData);
       }
    });

    socket.on('client_speed', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_speed', jsonData);
       }
    });

    socket.on('client_track', function(jsonData) {
       for(var i = 0, len = sockets.length; i < len; ++i) {
           sockets[i].emit('web_track', jsonData);
       }
    });
});
