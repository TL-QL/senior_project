var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    theState: {
        type: String,
        default: ''
    },
    zipcode: {
        type: String,
        default: ''
    },
    credit: {
        type: Number,
        default: -1,
        min: 0.0,
        max: 10.0
    },
    // Drive, Transit, Bike, Walk
    transportation: {
        type: String,
        default: ''
    },
    //care more about price or quality
    care: {
        type: String,
        default: ''
    },
    // what kind(s) of goods are you interested in
    interests: {
        type: [String]
    },
    seller:   {
        type: Boolean,
        default: false
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);