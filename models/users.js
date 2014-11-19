var db = require('./config/mongodbConfig');
var Joi = require('Joi');
var MongoDB = require('mongodb').Db;


// User model
var CRUD = {
    db: db,                 // MongoDB connection
    collection: 'users',    // MongoDB collection
    // Create options
    create: {
        // Valid create payload 
        payload: Joi.object().keys({ 
            email: Joi.string().required(),
            password: Joi.string().required()
        }),                 
        defaults: {         // Default values that will be added at doc creation
            access: 'normal', // Sets which role can update 
            activated: false,
            uId: true       // Field used for access control. This is a special field that when set to true will default to user's id 
                            // The value comes from, 'request.auth.artifacts.id' ie the id the user authenticates with
        },
        bcrypt: 'password', // Sets 'password' field to be bcrypted at doc creation
        date: 'created',    // Sets 'created' field to be dated at doc creation
        access: "admin"     
    },
    // Read options for get and find
    read: {
        whitelist: ['email'],   // Array of fields that will be returned, all other fields will be excluded 
        blacklist: ['password'], // Array of fields that will be removed, all other fields will be included
        access: 'normal'        
    },
    // Update options
    update: {
        // Valid update payload
        payload: Joi.object().keys({
            email: Joi.string(),
            password: Joi.string()
        }), 
        bcrypt: 'password', 
        date: 'updated',   
        access: 'normal' 
    },
    // Delete options
    del: {
        access: 'normal' 
    },
    // Joi options when validating payloads    
    validationOpts: {
        abortEarly: false
    }

};

var User = require('toothache')(CRUD);