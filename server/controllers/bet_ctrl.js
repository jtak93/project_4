var User = require('../models/user');
var Match = require('../models/match');
var Bet = require('../models/bet');

function create(req, res, next) {
  res.json({msg: req.body})
}

module.exports = {
 create: create
};
