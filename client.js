// Connect to server
var io = require('socket.io-client')
var sqlite3 = require('sqlite3').verbose();
var socket = io.connect('http://10.1.0.47:80', {reconnect: true});

socket.on('connect', function(socket, err) {
    console.log('Connected!');
});

socket.on('disconnect', function(socket, err) {
    console.log('Disconnected!');
})

var checkData = setInterval (function () {
    for (var i = 0; i < checkData.length; i++); {
        var db = new sqlite3.Database('hud_db_master.sqlite3');
        db.all("SELECT * FROM hud ORDER BY col_id DESC LIMIT 1;", function(err, rows) {
            var data = JSON.stringify(rows)
            var jsonData = JSON.parse(data);

            var temp = jsonData[i].temp;
            var latitude = jsonData[i].latitude;
            var longitude = jsonData[i].longitude;
            var altitude = jsonData[i].altitude;
            var pressure = jsonData[i].pressure;
            var speed = jsonData[i].speed;
            var track = jsonData[i].track;

            socket.emit('client_temp', temp, 'Pi-Voyager');
            socket.emit('client_latitude', latitude, 'Pi-Voyager');
            socket.emit('client_longitude', longitude, 'Pi-Voyager');
            socket.emit('client_altitude', altitude, 'Pi-Voyager');
            socket.emit('client_pressure', pressure, 'Pi-Voyager');
            socket.emit('client_speed', speed, 'Pi-Voyager');
            socket.emit('client_track', track, 'Pi-Voyager');
        });
        db.close();
        }
}, 1000);
