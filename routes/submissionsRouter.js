var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var passport = require('passport');
var authenticate = require('../authenticate');

var submissionsRouter = express.Router();
submissionsRouter.use(bodyParser.json());

submissionsRouter.route('/:username')
    .get(authenticate.verifyUser, authenticate.verifySeller, (req,res,next) => {
        Item.find({seller: req.params.username})
        .then((items) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(items);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = submissionsRouter;