var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Feedback = require('../models/feedbacks');
var passport = require('passport');
var authenticate = require('../authenticate');

var contactusRouter = express.Router();
contactusRouter.use(bodyParser.json());

contactusRouter.route('/')
    .post((req,res,next) => {
        Feedback.countDocuments({}, function (err, count) { 
            if (err){ 
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, err: err});
            }else{ 
                var savedata = new Feedback({
                    "feedback_id": count,
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname,
                    "phone": req.body.phone,
                    "email": req.body.email,
                    "agree": req.body.agree,
                    "contactType": req.body.contactType,
                    "message": req.body.message 
                }).save(function(err, result) {
                    if (err){
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: false, err: err});
                    }
                    else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Send Successful!'});
                    }
                })
            } 
        }); 
    })

module.exports = contactusRouter;