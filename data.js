// var redis = require('redis');
// var client = redis.createClient('localhost');


class redisData {
    constructor() {

        // Setup websocket with callbacks.
        // Open the connection with the server.

        let inside = '21';
        let outside = '22';
        this.In1DayMinTemp = 'Sensor/' + inside + '/Temp/1DayMin';
        this.In1DayMaxTemp = 'Sensor/' + inside + '/Temp/1DayMax';
        this.In1DayAverageTemp = 'Sensor/' + inside + '/Temp/1DayAverage';
        this.In1DayMinRh = 'Sensor/' + inside + '/Rh/1DayMin';
        this.In1DayMaxRh = 'Sensor/' + inside + '/Rh/1DayMax';
        this.In1DayAverageRh = 'Sensor/' + inside + '/Rh/1DayAverage';

        this.Out1DayMinTemp = 'Sensor/' + outside + '/Temp/1DayMin';
        this.Out1DayMaxTemp = 'Sensor/' + outside + '/Temp/1DayMax';
        this.Out1DayAverageTemp = 'Sensor/' + outside + '/Temp/1DayAverage';
        this.Out1DayMinRh = 'Sensor/' + outside + '/Rh/1DayMin';
        this.Out1DayMaxRh = 'Sensor/' + outside + '/Rh/1DayMax';
        this.Out1DayAverageRh = 'Sensor/' + outside + '/Rh/1DayAverage';

        this.OneDayMinTemp = document.getElementById('daily-min-tempurature');
        this.OneDayMaxTemp = document.getElementById('daily-max-tempurature');
        this.OneDayMaxRh = document.getElementById('daily-max-humidity');
        this.OneDayMinRh = document.getElementById('daily-min-humidity');

        var ws = new WebSocket('ws://192.168.1.249:3123/');

        ws.onmessage = function(evt) {
            // var OneDayMinDisplay = document.getElementById('daily-min-tempurature');
            var msgReceived = evt.data;
            console.log("Websocket server responds: " + msgReceived);
            this.OneDayMinDisplay.innerHTML = `<b>1 Day Min Temp:</b> ${msgReceived}`;
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
    };

    paint() {

    };

    display() {

        this.OneDayMinDisplay.innerHTML = `<b>1 Day Min Temp:</b> <i>reading</i>`;

        if (ws.readyState === ws.OPEN) {
            ws.send(OneDayMin);
        } else {
            console.log("Connection not open yet, try again");
        }
    }
};