var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var profilesellerRouter = express.Router();
profilesellerRouter.use(bodyParser.json());

profilesellerRouter.route('/:username')
    .get(authenticate.verifyUser, authenticate.verifySeller, (req,res,next) => {
        User.findOne({username: req.params.username})
        .then((user) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifySeller, (req, res, next) => {
        User.findOneAndUpdate(req.params.username, {
            nickname: req.body.nickname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            theState: req.body.theState,
            zipcode: req.body.zipcode
        }, (err, result) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, err: err});
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Update Successful!'});
        })
    })

module.exports = profilesellerRouter;