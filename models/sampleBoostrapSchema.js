var mongoose = require('mongoose');

var classSchema = new mongoose.Schema({
    "classes": [{
        "_id": 1,
        "title": "Building Robust Web Applications",
    }]
});

var lessonsSchema = new mongoose.Schema({
    "lessons": [{
        "_id": 1,
        "title": "Learning to be Hapi",
        "desc": "Covers the web framework Hapi. Topics include routing, authentication, and plugins.",
        "sections": []

    }, {
        "_id": 2,
        "title": "K^3: Understanding Kube",
        "desc": "",
        "sections": []
    }, {
        "_id": 3,
        "title": "Swing with Swig",
        "desc": "",
        "sections": []
    }]
});

var sectionsSchema = new mongoose.Schema({ 
        "sections": [{ 
            "_id": 1, 
            "title": "All you need to know about Routing", 
            "content": "LOTS OF TEXT N STUFF", 
            "videoLink": "http://www.youtube.com/watch?v=Jr2Z6Ygkz64", 
            "otherMaterials": [{
                "_id": 1,
                "title": "lecture-notes.docx",
                "path": "/public/files/lecture-notes.docx" 
            }]
        }, {
            "_id": 2,
            "title": "Authentication for the Ages",
            "content": "Another Awesome bit of Material",
            "videoLink": "http://youtu.be/ZI9wXL-add0?t=10m50s",
            "otherMaterials": [{
                "_id": 1,
                "title": "lecture-powerpoint.ppt",
                "path": "/public/files/lecture-powerpoint.ppt"
            }]
        }, {
            "_id": 3,
            "title": "Plugins, not Glade",
            "content": "How do we keep generating this stuff!",
            "videoLink": "http://www.youtube.com/watch?v=LX4W6eeXUHU",
            "otherMaterials": [{
                "_id": 1,
                "title": "lecture-notes.docx",
                "path": "/public/files/lecture-notes.docx"
            }]
        }]
    }
);