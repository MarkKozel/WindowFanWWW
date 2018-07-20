var redis = require("redis"),
    client = redis.createClient();


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