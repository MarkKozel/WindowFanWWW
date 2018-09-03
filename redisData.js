var OneDayMin = "Sensor/Minute";
var OneDayHour = "Sensor/Hour";

var minuteInterval = 60 * 1000;
var hourInterval = 60 * minuteInterval;

var utils = new utilities();

// var ws = new WebSocket('ws://192.168.1.248:3123/');

const processMD = new processMinuteData();
const processHD = new processHourData();

// ws.onmessage = function(evt) {
//     var type = utils.determineData(evt.data);
//     if (type === "hour") {
//         processHD.display(evt.data);
//     } else {
//         if (type === "minute") {
//             processMD.display(evt.data);
//         } else {
//             console.log("Rec'd unknown data:");
//             console.log(evt.data);
//         }
//     }
// };

// // As soon as the connection is closed, we inform the user.
// ws.onclose = function() {
//     console.log('Disconnected from server');
//     process.exit(1);
// };

// // Log a message when connection is successful.
// ws.onopen = function() {
//     console.log(`Connected to server with ${ws.protocol} connection`);
// };


// display = function(requestKey) {

//     // this.OneDayMinDisplay.innerHTML = `<b>1 Day Min Temp:</b> <i>reading</i>`;

//     if (ws.readyState === ws.OPEN) {
//         ws.send(requestKey);
//     } else {
//         console.log("Connection not open yet, try again");
//     }
// }

// Display = this.display.bind(this);

// display(OneDayMin);
// display(OneDayHour);
setTimeout(function() {
        processMD.getData();
        processHD.getData();
    },
    1000);

setInterval(function() {
    processMD.getData();
}, minuteInterval);

setInterval(function() {
    processHD.getData();
}, minuteInterval);