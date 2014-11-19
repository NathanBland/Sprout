module.exports = [{
    method: 'GET',
    path: '/css/{param*}', //serve static css assets
    handler: {
        directory: {
            path: './public/css'
        }
    }
}, {
    method: 'GET',
    path: '/scripts/{param*}',  //serve static javascript assets
    handler: {
        directory: {
            path: './public/scripts'
        }
    }
}, {
    method: 'GET',
    path: '/classes',          //route for class listings
    handler: function(request, reply) {
        reply.view('class', {
            title: 'Sprout Classes',
            sections: [
                {title: "Learning Hapi"},
                {title: "Understanding Kube"},
                {title: "Swing with Swig"}
            ]
        });
    }
}, {
    method: 'GET',
    path: '/{param?}',          //route for root with optional param
    handler: function(request, reply) {
        reply.view('index', {
            title: 'Sprout Home'
        });
    }
}];