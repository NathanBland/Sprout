{//so far these are all for one lesson
    "sections": [{ //two ways. Store a lesson Id in each of these, or store section ids in an array in lessons.
        "_id": 1, //should we store what lesson they go with here, or in the lessons schema? =(
        "title": "All you need to know about Routing", // needs to change, that's probably a lesson heading
        "content": "LOTS OF TEXT N STUFF", /// which way should we use? I'm leaning towards storing a lesson id... but idk... 
        "videoLink": "http://www.youtube.com/watch?v=Jr2Z6Ygkz64",//
        "otherMaterials": [{
            "_id": 1,
            "title": "lecture-notes.docx",
            "path": "/public/files/lecture-notes.docx" //eventually this will be stored as an {id}, but for now it can just be a file name.
        }]
    },
    {
        "_id":2,
        "title": "Authentication for the Ages",
        "content":"Another Awesome bit of Material",
        "videoLink":"http://youtu.be/ZI9wXL-add0?t=10m50s",
        "otherMaterials": [{
            "_id": 1,
            "title":"lecture-powerpoint.ppt",
            "path":"/public/files/lecture-powerpoint.ppt"
            }]
        }, 
        {
        "_id":3,
        "title": "Plugins, not Glade",
        "content":"How do we keep generating this stuff!",
        "videoLink":"http://www.youtube.com/watch?v=LX4W6eeXUHU",
        "otherMaterials": [{
            "_id": 1,
            "title":"lecture-notes.docx",
            "path":"/public/files/lecture-notes.docx"
            }]
        }]
}