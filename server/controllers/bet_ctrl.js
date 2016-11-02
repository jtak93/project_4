var User = require('../models/user');
var Match = require('../models/match');
var Bet = require('../models/bet');

function create(req, res, next) {
  // TODO: HANDLE ERROR
  var betSlip = req.body.betSlip;
  var risks = req.body.risks;
  var user = req.body.user;
  betSlip.forEach( (bet, idx) => {
    var newBet = {
      matchId: bet._id,
      userId: user._id,
      risk: risks[idx],
      team: bet.teamPick
    }
    User.findOne( {_id: user._id} )
      .then(user => {
        user.bets.push(newBet);
        user.balance -= risks[idx];
        user.inPlay += risks[idx];
        user.save((err, user) => {
          console.log(user);
          return user;
        })
        .then(() => next())
      })
  })
}

module.exports = {
 create: create
};


// var BetSchema = new mongoose.Schema({
//   matchId: { type: String, ref: 'Match' },
//   userId: { type: String, ref: 'User', required: true },
//   risk: Number,
//   team: String
// });
