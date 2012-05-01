var express = require('express'),
    browserid  = require('./browserid-consumer');

app = express.createServer();
app.use(express.static(__dirname + '/static'))
app.use(express.bodyParser());
    
app.post('/authorize', function(req, res) {
    browserid.verify(req.body.assertion, "localhost:3000", function(err, message) {
        if (err) {
            res.send("Error: authorization failed.");
        } else {
            res.send("Success: " + JSON.stringify(message));
        }
    }, {logger: {debug: console.log}});
});

app.listen(3000);

