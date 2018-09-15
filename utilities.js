/**
 * misc functions
 */
class utilities {
    constructor() {

    };

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

    /**
     * Pads theString with zeroPadding leading zeros
     */
    pad(theString, zeroPadding) {
        var result = "";
        var newLength = zeroPadding - theString.toString().length;
        for (var x = 0; x < newLength; x++) {
            result += '0';
        }
        return result + theString;
    }


    /**
     * Uses timestamp data element to determine what time part is changing. That decides which
     * type the data represents
     */
    determineData(data) {
        var msgReceivedObj = JSON.parse(data);

        var theDate0 = new Date(JSON.parse(msgReceivedObj[0]).Timestamp);
        var theDate1 = new Date(JSON.parse(msgReceivedObj[1]).Timestamp);
        var theDate2 = new Date(JSON.parse(msgReceivedObj[2]).Timestamp);

        var times = new Array(3);
        for (var x = 0; x < 3; x++) {
            var theDate = new Date(JSON.parse(msgReceivedObj[x]).Timestamp);
            times[x] = new Array(3);
            times[x]["day"] = theDate.getDay();
            times[x]["hour"] = theDate.getHours();
            times[x]["minute"] = theDate.getMinutes();

        }

        if ((times[0]['day'] < times[1]['day']) || (times[1]['day'] < times[2]['day'])) {
            return "day";
        } else {
            if ((times[0]['hour'] < times[1]['hour']) || (times[1]['hour'] < times[2]['hour'])) {
                return "hour";
            } else {
                if ((times[0]['minute'] < times[1]['minute']) || (times[1]['minute'] < times[2]['minute'])) {
                    return "minute";
                } else {
                    return "unknown";
                }
            }
        }
    };
}