var mongoose = require('mongoose');

var sectionsSchema = new mongoose.Schema({ 
    "sections": [{
        "_id": Number,
        "title": String,
        "content": String,
        "videoLink": String,
        "otherMaterials": [{
            "_id": Number,
            "title": String,
            "path": String
        }]
    }]
});

var lessonsSchema = new mongoose.Schema({ //Lesson schema defined.
    "lessons": [{
        "_id": Number,
        "title": String,
        "desc": String,
        "sections": [sectionsSchema] //sub document defined in sectionsSchema
    }]
});

var classSchema = new mongoose.Schema({ //Class schema defined.
    "classes": [{
        "_id": Number,
        "title": String,
        "lessons":[lessonsSchema] //sub document defined in lessonsSchema
    }]
});

module.exports = mongoose.model('classes', classSchema);