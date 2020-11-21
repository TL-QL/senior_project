var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var homeRouter = express.Router();
homeRouter.use(bodyParser.json());

homeRouter.route('/:search/:category/:condition/:method/:sort')
.get(authenticate.verifyUser, authenticate.verifybuyer, (req,res,next) => {
    var filter = {name: { "$regex": req.params.search }, approve: true, soldout: false};
    if(req.params.category !== 'NA') filter.category = req.params.category;
    if(req.params.condition !== 'NA') filter.condition = req.params.condition;
    if(req.params.method == 'pickup') filter.delivery = {$in: ['pickup', 'both']};
    if(req.params.method == 'delivery') filter.delivery = {$in: ['delivery', 'both']};
    var mySort = 1;
    if(req.params.sort == 'high') mySort=-1;
    if(req.params.sort == 'low') mySort=1;
    Item.find(filter).sort({price: mySort})
    .then((items) => {
        res.StatusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(items);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = homeRouter;