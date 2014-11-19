var Hapi = require('hapi');
var server = new Hapi.Server(process.env.IP, process.env.PORT);
var routes = require('./routes/routes');
var qs = require("qs");
var auth = require('./auth');
var bell = require('bell');

//set view engine
server.views({
    engines: {
        html : require('swig')
        },
        path: './views'
    });

//pass in routes 
server.route(routes);

// start up server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

