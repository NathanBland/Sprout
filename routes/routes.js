var express = require('express');
var ensureLogin = require('connect-ensure-login');
var ensureAuthenticated = ensureLogin.ensureAuthenticated;
var router = module.exports = express.Router();
var app = express();
var Course = require('../models/Classes');
var User = require('../models/User.js');

router.get('/', function(req, res, next) {
    if (req.user) {
        return res.redirect('/dashboard');
    }
    res.render('index', {
        title: "Sprout Home"
    });
});

router.all('/dashboard/*', ensureAuthenticated('login'));

router.get('/dashboard', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('dashboard', {
        title: "Sprout - Dashboard"
    })
});

router.get('/purpose', function(req, res, next) {
    res.render('purpose', {
        title: "/Purpose",
        content: "We are two individuals who believe fervently that education is at the heart of breaking the cycles of suffering that surround us. The old"
    });
});

router.get('/classes', function(req, res, next) {
    Course.find({}, function(err, classes) {
        console.log(classes);
        res.render('classes', {
            classes: classes,
            title: "Sprout - Course Catalog"
        });
    });
});

router.param(':classTitle', function(req, res, next, classTitle) {

    Course.findOne({
        permalink: classTitle
    }, function(err, course) {
        //console.log(err);
        //console.log(course);
        res.locals.course = course;
        res.locals.title = course.title;
        next();
    });
});

router.get('/class/:classTitle/lesson/lesson-:lessonId/section/:sectionId', function(req, res, next) {
    var course = res.locals.course;
    var lesson = course.lessons[req.params.lessonId - 1]; //correct for friendly lesson numbers
    var section = course.lessons[req.params.lessonId - 1].sections[req.params.sectionId - 1]; //correct for friendly section numbers

    res.render('section_details', {
        lessonId: lesson.lessonId,
        section: section
    });
});

router.get('/class/:classTitle/lesson/lesson-:lessonId', function(req, res, next) {
    var course = res.locals.course;
    var lesson = course.lessons[req.params.lessonId - 1]; //correct for friendly lesson numbers
    res.render('lesson_details', {
        lesson: lesson
    });
});


router.get('/class/:classTitle', function(req, res, next) {
    res.render('class_details');
});

router.post('/enroll/:classTitle', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }

    //console.log(req.user._id);
    Course.findOne({
            "permalink": req.params.classTitle
        },
        function(err, course) {
            if (err) {
                console.warn(err);
                return res.redirect('/classes');
            }
            var enrolled = false;
            course.students.forEach(function(element, index, array) {
                if (element.studnet == req.user._id) {
                    enrolled = true;
                }
            });
            if (!enrolled) {
                course.students.push({
                    student: req.user._id
                });
                course.save(function(err) {
                    console.warn(err);
                    //return res.redirect('/classes');
                });
            }

            console.log(course);
        });
    User.findOne({
        _id: req.user.id
    }, function(err, user) {
        if (err) {
            console.warn(err);
            return res.redirect('/classes');
        }
        var enrolled = false;
        user.courses.forEach(function(element, index, array) {
            if (element.classId == req.params.classTitle) {
                enrolled = true;
            } 
            if (!enrolled){
                user.courses.push({
                    classId: req.params.classTitle
                });
                user.save(function(err) {
                    console.warn(err);
                });
            }
            else {
                console.log("already enrolled!");
            }
        });

        //console.log(user);
    });


    res.redirect('/class/' + req.params.classTitle);
});
//###########
//teacher routers
//###########

router.get('/add/class', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (!req.user.teacher) {
        return res.redirect('/dashboard');
    }
    res.render('add_class', {
        title: "Create A Class"
    });
});
router.post('/add/class', makeCourse);

function permalink(title) {
    return title.toLowerCase().replace(/\W+/g, '-').replace(/-$/, '');
}

function makeCourse(req, res, next) {
    console.log(req.body);

    var data = req.body;
    var perma = permalink(req.body.classTitle);
    var course = req.user.newClass();
    var lessons = [];
    if (data.lesson instanceof Array) {
        for (var i = 0; i < data.lesson.length; i++) {
            lessons.push({
                "lessonId": i + 1, //value adjusted for friendly URLS.
                "title": data.lesson[i]
            });
        }

    }
    else {
        lessons = [{
            "lessonId": 1,
            "title": data.lesson
        }];
    }
    console.log(lessons);
    course.set({
        title: data.classTitle,
        permalink: perma,
        desc: data.desc || '',
        lessons: lessons || [],
        students: []
    });
    course.save(function(err) {
        if (err) {
            return res.render('add_class', {
                title: "Problem Adding Class: " + course.title
            })
        }
        else {
            res.redirect('/dashboard');
        }
    });
}

router.get('/add/lesson', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (!req.user.teacher) {
        return res.redirect('/dashboard');
    }
    res.render('add', {
        title: "Create A Lesson"
    });
});
router.post('/add/lesson', makeLesson);

function makeLesson(req, res, next) {

}

router.get('/:classTitle/add/section', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    if (!req.user.teacher) {
        return res.redirect('/dashboard');
    }
    res.render('add', {
        title: "Create A Section"
    });
});
router.post('/:classTitle/add/section', makeSection);

function makeSection(req, res, next) {

}

//###########
//end teacher routes
//###########


//end specific routes







//pages be hiddin'
router.use(function(req, res) {
    console.warn('404 Not Found: %s', req.originalUrl);
    res.status(404).render('error', {
        title: "404 Error - Page Not Found",
        notification: {
            severity: "error",
            message: "We could not locate that page. Try using the back button",
            type: "e404"
        }
    });
});
// server errors
router.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).render('error', {
        title: "500 Error - Server Error",
        notification: {
            severity: "error",
            message: "Something is very wrong on our side. Try again later.",
            type: "e500"
        }
    });
});
