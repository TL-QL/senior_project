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

router.post('/signupbuyer', (req, res, next) => {
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
      if(req.body.address)
        user.address = req.body.address;
      if(req.body.city)
        user.city = req.body.city;
      if(req.body.theState)
        user.theState = req.body.theState;
      if(req.body.zipcode)
        user.zipcode = req.body.zipcode;
      if(req.body.transportation)
        user.transportation = req.body.transportation;
      if(req.body.care)
        user.care = req.body.care;
      if(req.body.interests)
        user.interests = req.body.interests;
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

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      var seller = req.user.seller;
      var admin = req.user.admin;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token, seller: seller, admin: admin});
    });
  }) (req, res, next);
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
