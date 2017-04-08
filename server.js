var express = require('express');
var app = express();
app.disable('etag');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var cookieParser = require('cookie-parser');
var session      = require('express-session');
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

var passport      = require('passport');
app.use(passport.initialize());
app.use(passport.session());




require ("./test/app.js")(app);

// Our assignment server
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);