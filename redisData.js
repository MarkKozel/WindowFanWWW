// var redis = require('redis');
// var client = redis.createClient('localhost');


// class redisData {
//     constructor() {

// Setup websocket with callbacks.
// Open the connection with the server.

var OneDayMin = "Sensor/Minute";
var OneDayMinDisplay = document.getElementById('daily-raw-data');

var ws = new WebSocket('ws://192.168.1.248:3123/');

ws.onmessage = function(evt) {
    // var OneDayMinDisplay = document.getElementById('daily-min-tempurature');
    var msgReceived = JSON.parse(evt.data);
    console.log("Websocket server responds: " + msgReceived);
    for (var x = 0; x < msgReceived.length; x++) {
        document.getElementById('daily-raw-data').value = msgReceived[x].Timestamp;
    }
};

// As soon as the connection is closed, we inform the user.
ws.onclose = function() {
    console.log('Disconnected from server');
    process.exit(1);
};

// Log a message when connection is successful.
ws.onopen = function() {
    console.log(`Connected to server with ${ws.protocol} connection`);
};

display = function() {

    // this.OneDayMinDisplay.innerHTML = `<b>1 Day Min Temp:</b> <i>reading</i>`;

    if (ws.readyState === ws.OPEN) {
        ws.send(OneDayMin);
    } else {
        console.log("Connection not open yet, try again");
    }
}
Display = this.display.bind(this);

setTimeout(Display, 2000);