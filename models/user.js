var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    nickname: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
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
        type: Double,
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