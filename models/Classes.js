var mongoose = require('mongoose');

var sectionSchema = new mongoose.Schema({
    sectionId: Number,
    title: String,
    desc: String,
    content: String,
    videoLink: String,
    otherMaterials: [{
        _id: Number,
        title: String,
        path: String
    }]
});

var lessonSchema = new mongoose.Schema({ //Lesson schema defined.
    lessonId: Number,
    title: String,
    desc: String,
    sections: [sectionSchema] //sub document defined in sectionsSchema
});
var studentSchema = new mongoose.Schema({
    student: {
        type: String,
        index: true
    }
});
var taSchema = new mongoose.Schema({
    ta: {
        type: String,
        index: true
    }
});

var classSchema = new mongoose.Schema({ //Class schema defined.
    title: String,
    permalink: {
        type: String,
        unique: true
    },
    desc: String,
    instructor: String,
    teacherAssistants: [taSchema],
    lessons: [lessonSchema], //sub document defined in lessonsSchema
    students: [studentSchema]
});


module.exports = mongoose.model('classes', classSchema);
