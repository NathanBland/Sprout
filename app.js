var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');
var routes = require('./routes/');
var logger = require('./logger');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();


//config and connect to database
app.set('dbhost', process.env.IP || 'localhost');
app.set('dbname', 'sprout');

mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'));


//set css preprocessor
app.use(stylus.middleware(__dirname + '/public/css'));


//set view engine
var engines = require('consolidate');

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', engines.swig);

//logger to stdout showing static assets being served and how long it takes
app.use(logger);

//set static files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ //parse submitted data using bodyParser
    extended: false
}));
app.use(cookieParser('building the minds of tomorrow, with safety and ease.'));
app.use(session({
    secret: 'Secret, secret. Knowledge is the greatest of these.',
    resave: true,
    saveUninitialized: true
}));

//pass in routes 
app.use(routes);

// config and start up server
app.set('ip', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || '1337');

var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log('Server running at: %s:%s', address.address, address.port);
});
