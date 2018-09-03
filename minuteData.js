class processMinuteData {
    constructor() {
        this.table = document.getElementById("minute-raw-data-table");

        this.MinueDataAsOf = document.getElementById('minute-data-as-of');

        this.MinuteCurTempIn = document.getElementById('minute-current-temp-in');
        this.MinuteCurRhIn = document.getElementById('minute-current-rh-in');
        this.MinuteCurTempOut = document.getElementById('minute-current-temp-out');
        this.MinuteCurRhOut = document.getElementById('minute-current-rh-out');

        this.RedisKey = "Sensor/Minute";

        this.ws = new WebSocket('ws://192.168.1.248:3123/');
        this.ws.onmessage = this.wsonmessage.bind(this);
        this.ws.onclose = this.wsonclose.bind(this);
        this.ws.onopen = this.wsonopen.bind(this);

        this.currentData = new Map();

        this.utils = new utilities();
    }

    wsonmessage(evt) {
        var type = utils.determineData(evt.data);

        if (type === "minute") {
            this.display(evt.data);
        } else {
            console.log("MinuteData() Rec'd unknown data:");
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


    getData() {
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(this.RedisKey);
        } else {
            console.log("Connection not open yet, try again");
        }
    }

    display(minuteData) {
        var msgReceivedObj = JSON.parse(minuteData);

        var curHour = -1;
        var curMin = -1;

        var theTime;

        var cIndex = -1;
        var cHour = -1;
        var cMin = -1;

        var currentTempIn = -1;
        var currentRhIn = -1;
        var currentTempOut = -1;
        var currentRhOut = -1;

        var lineObj;

        //Find current line
        var cIndex = -1;
        var cHour = -1;
        var cMin = -1;
        for (var x = 0; x < msgReceivedObj.length; x++) {
            lineObj = JSON.parse(msgReceivedObj[x]);
            // var hour = parseInt(lineObj.Timestamp.substring(11, 13));
            // var minute = parseInt(lineObj.Timestamp.substring(14, 16));

            var theDate = new Date(lineObj.Timestamp);
            var minute = theDate.getMinutes();
            var hour = theDate.getHours();

            this.currentData.set(this.utils.dateIndex(theDate), lineObj);

            if ((hour >= cHour) && (minute > cMin)) {
                cIndex = this.utils.dateIndex(theDate);
                cHour = hour;
                cMin = minute;
            }
        }

        $('#minute-raw-data-table > tr > td').remove();

        var iterator1 = this.currentData[Symbol.iterator]();

        for (let item of iterator1) {

            var theDate = new Date(item[1].Timestamp);

            var hour = theDate.getHours();
            var minute = theDate.getMinutes();

            var inTemp = Number.parseFloat(item[1].IndoorTemp).toPrecision(3);
            var inRh = Number.parseFloat(item[1].IndoorRH).toPrecision(3);
            var outTemp = Number.parseFloat(item[1].OutdoorTemp).toPrecision(3);
            var outRh = Number.parseFloat(item[1].OutdoorRH).toPrecision(3);

            if ((hour >= curHour) && (minute > curMin)) {
                currentTempIn = inTemp;
                currentRhIn = inRh;
                currentTempOut = outTemp;
                currentRhOut = outRh;

                curHour = hour;
                curMin = minute;
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

            if (hour > 12) {
                theTime = `${this.utils.pad(hour-12,2)}:${this.utils.pad(minute,2)} pm`;
            } else {
                theTime = `${this.utils.pad(hour,2)}:${this.utils.pad(minute,2)} pm`;
            }

            td1.appendChild(document.createTextNode(`${theTime}`));
            td2.appendChild(document.createTextNode(`${inTemp}F / ${inRh}%`));
            td3.appendChild(document.createTextNode(`${outTemp}F / ${outRh}%`));
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            this.table.appendChild(tr);

        }
        if (this.curHour > 12) {
            theTime = `${this.utils.pad(curHour - 12),2}:${this.utils.pad(curMin,2)} pm`;
        } else {
            theTime = `${this.utils.pad(curHour,2)}:${this.utils.pad(curMin,2)} pm`;
        }
        this.MinueDataAsOf.innerHTML = `<b>as of</b> ${theTime}`;

        this.MinuteCurTempIn.innerText = `Current  Indoor Temp: ${currentTempIn}F`;
        this.MinuteCurRhIn.innerText = `Current  Indoor RelH: ${currentRhIn}%`;
        this.MinuteCurTempOut.innerText = `Current Outdoor Temp: ${currentTempOut}F`;
        this.MinuteCurRhOut.innerText = `Current Outdoor RelH: ${currentRhOut}%`;
    }
}