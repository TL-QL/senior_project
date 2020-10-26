var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var passport = require('passport');
var authenticate = require('../authenticate');

var postsubRouter = express.Router();
postsubRouter.use(bodyParser.json());

postsubRouter.route('/:username')
    .post(authenticate.verifyUser, authenticate.verifySeller, (req,res,next) => {
        Item.countDocuments({}, function (err, count){
            if (err){ 
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, err: err});
            }else{
                var savedata = new Item({
                    "item_id": count,
                    "image": req.body.image,
                    "name": req.body.title,
                    "price": req.body.price,
                    "quantity": req.body.quantity,
                    "condition": req.body.condition,
                    "delivery": req.body.delivery,
                    "category": req.body.category,
                    "subCategory": req.body.subCategories,
                    "sizeInfo": req.body.sizeInfo,
                    "detachable": req.body.detachable,
                    "careIns": req.body.careIns,
                    "productInsurance": req.body.productInsurance,
                    "damage": req.body.damage,
                    "seller": req.params.username
                }).save(function(err, result) {
                    if (err){
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: false, err: err});
                    }
                    else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Post Successful!'});
                    }
                })
            }
        });
    })

module.exports = postsubRouter;