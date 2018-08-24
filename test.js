var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err) {
    console.log("Error " + err);
});

let keys = [
    "Sensor/Minute",
    "Sensor/Hour",
    "Sensor/Day"
];

keys.forEach(element => {
    let result = client.lrange(element, 0, -1, function(err, reply) {
        console.log(element + " -> " + reply);
    });
});

client.quit();