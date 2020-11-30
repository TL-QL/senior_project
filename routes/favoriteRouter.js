var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var Favorites = require('../models/favorites');
var passport = require('passport');
var authenticate = require('../authenticate');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/:username')
    .get(authenticate.verifyUser, authenticate.verifybuyer, (req,res,next) => {
        Favorites.findOne({username: req.params.username})
        .then((items) => {
            Item.find({item_id: {$in: items.items}, soldout: false})
            .then((info) => {
                res.StatusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(info);
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifybuyer, (req, res, next) => {
        Favorites.findOneAndUpdate({username: req.params.username}, { $pullAll: {items: [req.body.item_id] } })
        .then((fav)=> {
            Item.findOneAndUpdate({item_id: req.body.item_id}, {$inc: {"favoriteCount": req.body.fav}})
            .then((item) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Successfully remove from Fav List!'});
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = favoriteRouter;