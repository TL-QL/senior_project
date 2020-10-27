var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var passport = require('passport');
var authenticate = require('../authenticate');

var adminverifysingleRouter = express.Router();
adminverifysingleRouter.use(bodyParser.json());

adminverifysingleRouter.route('/:item_id')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Item.findOne({item_id: req.params.item_id})
        .then((item) => {
            res.StatusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(item);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        const filter = { item_id: req.params.item_id };
        var update = {};
        if(req.body.approve){
            update = {
                approve: req.body.approve,
                reject: req.body.reject,
                imageScore: req.body.imageScore
            };
        }
        else{
            update = {
                reject: req.body.reject,
                approve: req.body.approve
            };
        }
        Item.findOneAndUpdate(filter, update, {
            new: true
          })
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Update Successful!'});
        }, (err) => next(err))
        .catch((err) => next(err));
    })


module.exports = adminverifysingleRouter;