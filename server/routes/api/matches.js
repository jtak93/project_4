var express = require('express');
var router = express.Router();
var Match = require('../../models/match')

/* GET users listing. */
router.get('/matches', function(req, res, next) {
  Match.find({})
    .then(matches => {
      console.log(matches)
      res.json(matches);
    })
});

router.get('/matches/active', function(req, res, next) {
  Match.find({'active' : true})
    .then(matches => {
      console.log(matches)
      res.json(matches);
    })
});

router.post('/matches/user', function(req, res, next) {
  Match.find({'bets.userId': req.body.user._id }).exec()
    .then(matches => {
      res.json(matches);
    })
});

module.exports = router;
