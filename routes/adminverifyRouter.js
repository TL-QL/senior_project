var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var passport = require('passport');
var authenticate = require('../authenticate');

var adminverifyRouter = express.Router();
adminverifyRouter.use(bodyParser.json());

adminverifyRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Item.find({})
        .then((items) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(items);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    
module.exports = adminverifyRouter;