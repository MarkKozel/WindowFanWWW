class utilities {
    constructor() {

    }
    dateIndex(dateObj) {
        var result = '';

        result += dateObj.getFullYear().toString();

        var value = dateObj.getMonth().toString();
        result += (value.length === 1 ? "0" + value.toString() : value.toString());

        var value = dateObj.getDay().toString();
        result += (value.length === 1 ? "0" + value.toString() : value.toString());

        var value = dateObj.getHours().toString();
        result += (value.length === 1 ? "0" + value.toString() : value.toString());

        var value = dateObj.getMinutes().toString();
        result += (value.length === 1 ? "0" + value.toString() : value.toString());

        var value = dateObj.getSeconds().toString();
        result += (value.length === 1 ? "0" + value.toString() : value.toString());

        return result;
    };
    pad(theString, zeroPadding) {
        var result = "";
        var newLength = zeroPadding - theString.toString().length;
        for (var x = 0; x < newLength; x++) {
            result += '0';
        }
        return result + theString;
    }


    determineData(data) {
        var msgReceivedObj = JSON.parse(data);

        var lineObj0 = JSON.parse(msgReceivedObj[0]);
        var lineObj1 = JSON.parse(msgReceivedObj[1]);
        var lineObj2 = JSON.parse(msgReceivedObj[2]);

        var hour0 = parseInt(lineObj0.Timestamp.substring(11, 13));
        var minute0 = parseInt(lineObj0.Timestamp.substring(14, 16));
        var hour1 = parseInt(lineObj1.Timestamp.substring(11, 13));
        var minute1 = parseInt(lineObj1.Timestamp.substring(14, 16));
        var hour2 = parseInt(lineObj2.Timestamp.substring(11, 13));
        var minute2 = parseInt(lineObj2.Timestamp.substring(14, 16));

        if ((parseInt(hour0) < parseInt(hour1)) || (parseInt(hour1) < parseInt(hour2))) {
            return "hour";
        } else {
            if ((parseInt(minute0) < parseInt(minute1)) || (parseInt(minute1) < parseInt(minute2))) {
                return "minute";
            } else {
                return "unknown";
            }
        }
    };
}