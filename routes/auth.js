var express = require("express");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User.js');

var router = module.exports = express.Router();


//###########
// Define strategies.
//###########

//###########
//Local
//###########
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
router.use(passport.initialize());
router.use(passport.session());
router.use(function(req, res, next) {
    var user = req.user;
    if (user) {
        res.locals.user = {
            username: user.username
        };
    }
    next();
});
//###########
// End Local
//###########

//###########
// End strategies
//###########

//###########
// Auth Routes
//###########

//###########
// Local Routes
//###########
router.get('/register', function(req, res) {
    res.render('register', {
        title: "Sprout - Create an account"
    });
});
router.post('/register', function(req, res) {
    // need some kind of validation here.

    console.log("signing up:" + req.body.username);
    User.register(new User({
        username: req.body.username,
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register', {
                title: "Sprout - Create an account",
                notification: {
                    severity: "error",
                    message: "Failed to register user: " + err.message
                },
                user: user
            });
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/dashboard');
        });
    });
});
router.get('/login', function(req, res) {
    res.render('login', {
        title: "Sprout - Log in",
        user: req.user
    });
});
router.post('/login', function(req, res, next) {
    console.log(req.body.username);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(err);
            console.log(user);
            return res.render('login', {
                title: "Sprout - Log in",
                notification: {
                    severity: 'error',
                    message: "Your username or password is wrong. Try again."
                }
            });
        }
        // Log the user in and redirect to their dashboard.
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/dashboard');
        });
    })(req, res, next); /**/
});
// Log the user out and redirect to the homepage.
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
//###########
// End Local Routes
//###########