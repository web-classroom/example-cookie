var http = require('http');
var express = require('express');

// domain 1
var d1 = express();
d1.get('/', function (req, res) {
    res.send("<script src='http://localhost:4000/tracker.js'></script>");
});
http.createServer(d1).listen(3000, () => console.log("domain 1 started"));

// domain 2
var d2 = express();
d2.get('/tracker.js', function (req, res) {
    let cookie = req.get('Cookie');
    let values = cookie
        ? cookie
            .split("; ")
            .map(value => value.split("="))
            .reduce((values, value) => {
                values[value[0]] = value[1];
                return values;
            }, {})
        : {};
    let counter = values.counter
        ? parseInt(values.counter) + 1
        : 0;
    console.log(values);
    res.set('Set-Cookie', [`counter=${counter}`]);
    res.send(`console.log("Hello Tracker!")`);
});
http.createServer(d2).listen(4000, () => console.log("domain 2 started"));