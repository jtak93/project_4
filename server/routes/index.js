var express = require('express');
var router = express.Router();
var User = require('../models/user');
var token = require('../config/token_auth');
var userCtrl = require('../config/user_ctrl');
var betCtrl = require('../controllers/bet_ctrl');

// use process.env.API_TOKEN for api token
router.post('/login', token.create);

router.post('/signup', userCtrl.create, token.create);

router.post('/bets/create', token.authenticate, betCtrl.create, token.passUser);



module.exports = router;
