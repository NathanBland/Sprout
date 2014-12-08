var mongoose = require('mongoose'),
    Course = require('./Classes');

var sectionSchema = new mongoose.Schema({
    sectionId: Number,
    started: Date,
    completed: Date
});

var lessonSchema = new mongoose.Schema({
    lessonId: Number,
    started: Date,
    completed: Date,
    sections: [sectionSchema]
});

var classesSchema = new mongoose.Schema({
    classId: String,
    enrolled: Date,
    lessons: [lessonSchema]
});

var User = mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    classes: [classesSchema],
    created: {
        type: Date,
        default: Date.now
    },
    teacher: { // true if user is a teacher
        type: Boolean,
        default: false
    },
    admin: { // true if user is an admin
        type: Boolean,
        default: false
    }

});
//##############
// User Methods
//##############

User.methods.getClasses = function(cb) {
    return Course.students.find({
        student: this._id
    }, cb);
};

User.methods.newClass = function(cb) {
    var course = new Course();
    course.instructor = this._id;
    return course;   
};

User.methods.removeClass = function(course, cb){
    Course.findOneAndRemove({
        _id: course._id,
        instructor: this._id
    },cb);  
};

//#################
//end User Methods
//#################

sectionSchema.virtual('formattedTime').get(function(){
    return this.created.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
});
sectionSchema.set('toObject', {
    getters: true,
    virtuals: true
});

User.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('user', User);