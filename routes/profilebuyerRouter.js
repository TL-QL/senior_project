var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var profilebuyerRouter = express.Router();
profilebuyerRouter.use(bodyParser.json());

profilebuyerRouter.route('/:username')
    .get(authenticate.verifyUser, (req,res,next) => {
        User.findOne({username: req.params.username})
        .then((user) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        const filter = { username: req.params.username };
        const update = { 
            nickname: req.body.nickname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            theState: req.body.theState,
            zipcode: req.body.zipcode,
            transportation: req.body.transportation,
            care: req.body.care,
            interests: req.body.interests
        };
        User.findOneAndUpdate(filter, update, {
            new: true
          })
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Update Successful!'});
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = profilebuyerRouter;