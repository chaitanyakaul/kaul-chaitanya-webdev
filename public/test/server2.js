/**
 * Created by chaitanyakaul on 26/02/17.
 */
var express = require('express');
var app = express();

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3200);