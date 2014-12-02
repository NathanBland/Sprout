var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var app = express();

//config and connect to database
var sprout = require('./models/mongooseModel');

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


//set static files
app.use(express.static(__dirname + '/public'));


//pass in routes 
app.use(routes);


// config and start up server
app.set('ip', process.env.IP || '127.0.0.1');
app.set('port', process.env.PORT || '1337');

var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log('Server running at: %s:%s', address.address, address.port);
});

