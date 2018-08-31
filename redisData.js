// var redis = require('redis');
// var client = redis.createClient('localhost');


// class redisData {
//     constructor() {

// Setup websocket with callbacks.
// Open the connection with the server.

var OneDayMin = "Sensor/Minute";
var OneDayMinDisplay = document.getElementById('daily-raw-data');

var MinuteRawData = document.getElementById('minute-raw-data');

var MinCurrTempInWidget = document.getElementById('minute-current-temp-in');
var MinCurrRhInWidget = document.getElementById('minute-current-rh-in');
var MinCurrTempOutWidget = document.getElementById('minute-current-temp-out');
var MinCurrRhOutWidget = document.getElementById('minute-current-rh-out');

var ws = new WebSocket('ws://192.168.1.248:3123/');

ws.onmessage = function(evt) {
    var output = '';
    var msgReceivedObj = JSON.parse(evt.data);

    var curHour = -1;
    var curMin = -1;

    var currentTempIn = -1;
    var currentRhIn = -1;
    var currentTempOut = -1;
    var currentRhOut = -1;

    var table = document.getElementById("minute-raw-data-table");

    //Find current line
    var cIndex = -1;
    var cHour = -1;
    var cMin = -1;
    for (var x = 0; x < msgReceivedObj.length; x++) {
        lineObj = JSON.parse(msgReceivedObj[x]);
        var hour = parseInt(lineObj.Timestamp.substring(11, 13));
        var minute = parseInt(lineObj.Timestamp.substring(14, 16));

        if ((hour >= cHour) && (minute > cMin)) {
            cIndex = x;
            cHour = hour;
            cMin = minute;
        }

    }



    //console.log("Websocket server responds: " + msgReceivedObj);
    for (var x = 0; x < msgReceivedObj.length; x++) {
        lineObj = JSON.parse(msgReceivedObj[x]);
        //var ts = new Date(lineObj.Timestamp);

        var hour = lineObj.Timestamp.substring(11, 13);
        var minute = lineObj.Timestamp.substring(14, 16);
        var inTemp = Number.parseFloat(lineObj.IndoorTemp).toPrecision(3);
        var inRh = Number.parseFloat(lineObj.IndoorRH).toPrecision(3);
        var outTemp = Number.parseFloat(lineObj.OutdoorTemp).toPrecision(3);
        var outRh = Number.parseFloat(lineObj.OutdoorRH).toPrecision(3);

        if ((hour >= curHour) && (minute > curMin)) {
            currentTempIn = inTemp;
            currentRhIn = inRh;
            currentTempOut = outTemp;
            currentRhOut = outRh;

            curHour = hour;
            curMin = minute;
        }

        // output += `${hour}:${minute} indoors (${inTemp}F/${inRh}%)   outdoors (${outTemp}F/${outRh}%)` + '\n';
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        if (cIndex === x) {
            td1.className = "table-primary";
            td2.className = "table-primary";
            td3.className = "table-primary";
        }

        td1.appendChild(document.createTextNode(`${hour}:${minute}`));
        td2.appendChild(document.createTextNode(`${inTemp}F / ${inRh}%`));
        td3.appendChild(document.createTextNode(`${outTemp}F / ${outRh}%`));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);

    }
    // document.getElementById('minute-raw-data').value = output;
    document.getElementById('minute-data-as-of').innerHTML = `<b>as of</b> ${curHour}:${curMin}`;

    document.getElementById('minute-current-temp-in').innerText = `Current  Indoor Temp: ${currentTempIn}F`;
    document.getElementById('minute-current-rh-in').innerText = `Current  Indoor RelH: ${currentRhIn}%`;
    document.getElementById('minute-current-temp-out').innerText = `Current Outdoor Temp: ${currentTempOut}F`;
    document.getElementById('minute-current-rh-out').innerText = `Current Outdoor RelH: ${currentRhOut}%`;


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