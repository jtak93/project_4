var express = require('express');
var router = express.Router();
var User = require('../models/user');
var token = require('../config/token_auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// use process.env.API_TOKEN for api token
router.post('/login', token.create);


module.exports = router;
