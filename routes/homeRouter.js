var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var User = require('../models/user');
var Shopping = require('../models/shoppingcarts');
var passport = require('passport');
var authenticate = require('../authenticate');
const {spawn} = require('child_process');

var homeRouter = express.Router();
homeRouter.use(bodyParser.json());

homeRouter.route('/:username/:search/:category/:condition/:method/:sort')
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
        Item.find({approve: true, soldout: false})
        .then((all_items) => {
            var input = {};
            var input2 = {};
            input.username = req.params.username;
            input.items = [];
            for(var i = 0;i < all_items.length;i++){
                var temp = {};
                temp.item_id = all_items[i].item_id;
                temp.description = 'It is '+all_items[i].name.toString()+'. It belongs to category '+all_items[i].category.toString()+'. Product insurance: '+all_items[i].productInsurance.toString()+'. Detaching Info: '+all_items[i].detachable.toString()+'. Care Instruction: '+ all_items[i].careIns.toString()+'. Description on damage(s): '+all_items[i].damage.toString();
                var ratings =[];
                if(all_items[i].comments){
                    for(var j = 0;j < all_items[i].comments.length;j++){
                        ratings.push(all_items[i].comments[j].rating);
                    }
                }
                else
                    ratings.push(6);
                temp.rating = ratings;
                if(all_items[i].buyer) temp.buyer = all_items[i].buyer;
                else 
                    temp.buyer = "";
                input.items.push(temp);
            }
            Shopping.find({})
            .then((shop) => {
                input2 = shop;
            }, (err) => next(err))
            .catch((err) => next(err));
            const python = spawn('python', ['recommend_system.py', JSON.stringify(input), JSON.stringify(input2)]);
            var output = [];
            python.stdout.on('data', function (data) {
                output = JSON.parse(data.toString());
            });
            python.on('close', (code) => {
                Item.find({item_id: {$in: output}})
                .then((rec) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    //res.json({search: items, recommendation: rec});
                    res.json({input:input, input2: input2});
                }, (err) => next(err))
                .catch((err) => next(err));
            });
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = homeRouter;