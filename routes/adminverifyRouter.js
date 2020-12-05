var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const {spawn} = require('child_process');

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
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Item.find({})
        .then((items) => {
            User.find({})
            .then((users) => {
                var input = {};
                input.items = items;
                input.users = users;
                const python = spawn('python', ['ML.py', JSON.stringify(input)]);
                var output;
                python.stdout.on('data', function (data) {
                    output = JSON.parse(data.toString());
                });
                python.on('close', (code) => {
                    res.StatusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Credit model: weights recalculated!'});
                });
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    
module.exports = adminverifyRouter;