var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err) {
    console.log("Error " + err);
});

let keys = [
    "Sensor/22/Temp/1DayMin",
    "Sensor/22/Rh/1MinAverage",
    "Sensor/22/Temp/1DayMax",
    "Sensor/21/Rh/1DayMin",
    "Sensor/21/Rh/1DayMax",
    "Sensor/21/Temp/1DayMin",
    "Sensor/22/Rh/1HourAverage",
    "Sensor/22/Time/1MinAverage",
    "Sensor/21/Rh/1DayAverage",
    "Sensor/21/Time/1DayAverage",
    "Sensor/21/Rh/1MinAverage",
    "Sensor/22/Time/1HourAverage",
    "Sensor/22/Rh/1DayMax",
    "Sensor/22/Temp/1DayAverage",
    "Sensor/22/Temp/1HourAverage",
    "Sensor/21/Time/1MinAverage",
    "Sensor/22/Temp/1MinAverage",
    "Sensor/21/Temp/1DayMax",
    "Sensor/22/Time/1DayAverage",
    "Sensor/21/Time/1HourAverage",
    "Sensor/22/Rh/1DayMin",
    "Sensor/21/Temp/1DayAverage",
    "Sensor/22/Rh/1DayAverage",
    "Sensor/21/Rh/1HourAverage",
    "Sensor/21/Temp/1HourAverage",
    "Sensor/21/Temp/1MinAverage"
];

keys.forEach(element => {
    let result = client.get(element, function(err, reply) {
        console.log(element + " -> " + reply);
    });
});

client.quit();