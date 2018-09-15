/**
 * Set up refresh intervals for each data type
 */
var minuteInterval = 60 * 1000;
var hourInterval = 60 * minuteInterval;
var dayInterval = hourInterval * 24;

var utils = new utilities();

//Instanciate classes to request type data
const processMD = new processMinuteData();
const processHD = new processHourData();
const processDD = new processDayData();

//Make inital request when page loads
setTimeout(function() {
        processMD.getData();
        processHD.getData();
        processDD.getData();
    },
    1000);

//Setup each data type refresh
setInterval(function() {
    processMD.getData();
}, minuteInterval);

setInterval(function() {
    processHD.getData();
}, minuteInterval);

setInterval(function() {
    processDD.getData();
}, dayInterval);