var express = require('express');
var router = express.Router();
var Match = require('../../models/match')

/* GET users listing. */
router.get('/matches', function(req, res, next) {
  Match.find({})
    .then(matches => {
      res.json(matches);
    })
});


module.exports = router;
