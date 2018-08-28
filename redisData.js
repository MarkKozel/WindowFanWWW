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
    var output = '';
    var msgReceivedObj = JSON.parse(evt.data);
    console.log("Websocket server responds: " + msgReceivedObj);
    for (var x = 0; x < msgReceivedObj.length; x++) {
        lineObj = JSON.parse(msgReceivedObj[x]);
        //var ts = new Date(lineObj.Timestamp);

        var hour = lineObj.Timestamp.substring(11, 13);
        var minute = lineObj.Timestamp.substring(14, 16);
        var inTemp = Number.parseFloat(lineObj.IndoorTemp).toPrecision(3);
        var inRh = Number.parseFloat(lineObj.IndoorRH).toPrecision(3);
        var outTemp = Number.parseFloat(lineObj.OutdoorTemp).toPrecision(3);
        var outRh = Number.parseFloat(lineObj.OutdoorRH).toPrecision(3);

        output += `${hour}:${minute} indoors (${inTemp}F/${inRh}%)   outdoors (${outTemp}F/${outRh}%)` + '\n';

        // output += ts.getHours() + ":" + ts.getMinutes() +
        //     ' indoors(' + inTemp + 'F ' + inRh + '%' + ')' + " " +
        //     ' outdoors(' + outTemp + 'F ' + outRh + '%' + ')\n';
        // var ts = dataObj.IndoorRH;
    }
    document.getElementById('daily-raw-data').value = output;
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
