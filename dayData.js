/**
 * Class to interface with Redis data server, request data, and populate html elements
 */
class processDayData {
    constructor() {
        this.table = document.getElementById("day-raw-data-table");

        this.DayDataAsOf = document.getElementById('day-data-as-of');

        this.DayCurTempIn = document.getElementById('day-current-temp-in');
        this.DayCurRhIn = document.getElementById('day-current-rh-in');
        this.DayCurTempOut = document.getElementById('day-current-temp-out');
        this.DayCurRhOut = document.getElementById('day-current-rh-out');
        this.DayCurTempMaxOut = document.getElementById('day-current-temp-max-out');
        this.DayCurTempMinOut = document.getElementById('day-current-temp-min-out');
        this.DayCurTempMaxIn = document.getElementById('day-current-temp-max-in');
        this.DayCurTempMinIn = document.getElementById('day-current-temp-min-in');

        this.RedisKey = "Sensor/Day";

        this.ws = new WebSocket('ws://192.168.1.248:3123/');
        this.ws.onmessage = this.wsonmessage.bind(this);
        this.ws.onclose = this.wsonclose.bind(this);
        this.ws.onopen = this.wsonopen.bind(this);

        this.currentData = new Map();

        this.utils = new utilities();
    };

    /**
     * Verifies that data returned is for this handler/type
     * @param {JSON} evt weather data
     */
    wsonmessage(evt) {
        var type = utils.determineData(evt.data);

        if (type === "day") {
            this.display(evt.data);
        } else {
            console.log("DayData() Rec'd unknown data:");
            //console.log(evt.data);
        }

    };

    // As soon as the connection is closed, we inform the user.
    wsonclose() {
        console.log('Disconnected from server');
        process.exit(1);
    };

    // Log a message when connection is successful.
    wsonopen() {
        console.log(`Connected to server with ${this.ws.protocol} connection`);
    };


    /**
     * Request data from Redis server if connected
     */
    getData() {
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(this.RedisKey);
        } else {
            console.log("Connection not open yet, try again");
        }
    };

    /**
     * Extracts JSON data, finds stats for the data, and pushed out to html elements
     * @param {JSON} dayData weather data for this type
     */
    display(dayData) {
        var msgReceivedObj = JSON.parse(dayData);

        var curDay = -1;
        var curMonth = -1;

        var theTime;

        var cIndex = -1;
        var cDay = -1;
        var cMonth = -1;

        var currentTempIn = -1;
        var currentRhIn = -1;
        var currentTempOut = -1;
        var currentRhOut = -1;

        var currentTempMaxOut = -1;
        var currentTempMinOut = -1;
        var currentTempMaxIn = -1;
        var currentTempMinIn = -1;

        var lineObj;

        //Find current line
        var cIndex = -1;
        var cMonth = -1;
        var cDay = -1;

        for (var x = 0; x < msgReceivedObj.length; x++) {
            lineObj = JSON.parse(msgReceivedObj[x]);
            var theDate = new Date(lineObj.Timestamp);
            var day = theDate.getDate();
            var month = theDate.getMonth();

            this.currentData.set(this.utils.dateIndex(theDate), lineObj);

            if ((month >= cMonth) && (day > cDay)) {
                cIndex = this.utils.dateIndex(theDate);
                cDay = day;
                cMonth = month;
            }

        }

        $('#day-raw-data-table > tr > td').remove();

        // for (var x = 0; x < msgReceivedObj.length; x++) {
        //     lineObj = JSON.parse(msgReceivedObj[x]);
        var iterator1 = this.currentData[Symbol.iterator]();

        for (let item of iterator1) {
            var theDate = new Date(item[1].Timestamp);
            var day = theDate.getDate();
            var month = theDate.getMonth();

            var inTemp = Number.parseFloat(item[1].IndoorTemp).toPrecision(3);
            var inRh = Number.parseFloat(item[1].IndoorRH).toPrecision(3);
            var outTemp = Number.parseFloat(item[1].OutdoorTemp).toPrecision(3);
            var outRh = Number.parseFloat(item[1].OutdoorRH).toPrecision(3);

            var outMaxTemp = Number.parseFloat(item[1].OutdoorTempMax).toPrecision(3);
            var outminTemp = Number.parseFloat(item[1].OutdoorTempMin).toPrecision(3);
            var inMaxTemp = Number.parseFloat(item[1].IndoorTempMax).toPrecision(3);
            var inMinTemp = Number.parseFloat(item[1].IndoorTempMin).toPrecision(3);

            if ((month >= curMonth) && (day > curDay)) {
                currentTempIn = inTemp;
                currentRhIn = inRh;
                currentTempOut = outTemp;
                currentRhOut = outRh;

                currentTempMaxOut = outMaxTemp;
                currentTempMinOut = outminTemp;
                currentTempMaxIn = inMaxTemp;
                currentTempMinIn = inMinTemp;

                curDay = day;
                curMonth = month
            }

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");

            if (cIndex === item[0]) {
                td1.className = "table-primary";
                td2.className = "table-primary";
                td3.className = "table-primary";
            }

            if (day > 12) {
                theTime = `${this.utils.pad(day,2)}/${this.utils.pad(day - 12,2)} am`;
            } else {
                theTime = `${this.utils.pad(day,2)}/${this.utils.pad(day,2)}pm`;
            }

            td1.appendChild(document.createTextNode(`${theTime}`));
            td2.appendChild(document.createTextNode(`${inTemp}F / ${inRh}%`));
            td3.appendChild(document.createTextNode(`${outTemp}F / ${outRh}%`));
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            this.table.appendChild(tr);

        }

        theTime = `${this.utils.pad(curMonth,2)}/${this.utils.pad(curDay,2)} - ${this.utils.pad(curDay,2)} pm`;

        this.DayDataAsOf.innerHTML = `<b>as of</b> ${theTime}`;

        this.DayCurTempIn.innerText = `Current  Indoor Temp: ${currentTempIn}F`;
        this.DayCurRhIn.innerText = `Current  Indoor RelH: ${currentRhIn}%`;
        this.DayCurTempOut.innerText = `Current Outdoor Temp: ${currentTempOut}F`;
        this.DayCurRhOut.innerText = `Current Outdoor RelH: ${currentRhOut}%`;

        this.DayCurTempMaxOut.innerText = `Current Outdoor High: ${currentTempMaxOut}F`;
        this.DayCurTempMinOut.innerText = `Current Outdoor Low: ${currentTempMinOut}F`;

        this.DayCurTempMaxIn.innerText = `Current Indoor High: ${currentTempMaxIn}F`;
        this.DayCurTempMinIn.innerText = `Current Indoor Low: ${currentTempMinIn}F`;
    }
}