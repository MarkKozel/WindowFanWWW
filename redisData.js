'use strict'

var redis = require('redis');
var client = redis.createClient();


function data() {
    var result = '';
    client.get("Sensor/22/Temp/1DayMin", function(err, reply) {
        console.log(element + " -> " + reply);
        result = reply
    });
    return result;
};

function test() {
    return "Hello";
};
console.log("Redis client = " + client);