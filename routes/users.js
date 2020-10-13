var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signupseller', (req, res, next) => {
  User.register(new User({username: req.body.username, nickname: req.body.nickname, phone: req.body.phone, email: req.body.email}), req.body.password, (err, user) =>{
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      user.username = req.body.username;
      user.nickname = req.body.nickname;
      user.phone = req.body.phone;
      user.email = req.body.email;
      user.seller = true;
      if(req.body.address)
        user.address = req.body.address;
      if(req.body.city)
        user.city = req.body.city;
      if(req.body.theState)
        user.theState = req.body.theState;
      if(req.body.zipcode)
        user.zipcode = req.body.zipcode;
      user.save((err, user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      })
    }
  });
});


module.exports = router;
