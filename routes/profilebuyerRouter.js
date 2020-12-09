var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var profilebuyerRouter = express.Router();
profilebuyerRouter.use(bodyParser.json());

profilebuyerRouter.route('/:username')
    .get(authenticate.verifyUser, authenticate.verifybuyer, (req,res,next) => {
        User.findOne({username: req.params.username})
        .then((user) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = profilebuyerRouter;