var express = require('express');


var router = module.exports = express.Router();

router.get('/', function(req, res, next){
    res.render('index', {
        title: "Sprout Home"
        });
});

router.get('/classes', function(req, res, next){
    res.render('class', {
            title: 'Sprout Classes',
            sections: [
                {title: "Learning Hapi"},
                {title: "Understanding Kube"},
                {title: "Swing with Swig"}
                ]
        });
    });

router.get('/classes/lessons', function(req, res, next){
        res.render('lessons', {
            title: 'Sprout Lessons',
            sections: [
                {title: "Learning Hapi"},
                {title: "Understanding Kube"},
                {title: "Swing with Swig"}
            ]}
)});