var User = require('../models/user');
var Match = require('../models/match');
var Bet = require('../models/bet');

function create(req, res, next) {
  // TODO: HANDLE ERROR AND FIX HANDLING MULTIPLE BETS
  console.log("running bet create")
  var betSlip = req.body.betSlip;
  var risks = req.body.risks;
  var user = req.body.user;
  betSlip.forEach( (bet, idx) => {
    console.log(bet);
    var newBet = {
      matchId: bet._id,
      userId: user._id,
      risk: risks[idx],
      team: bet.teamPick
    }
    console.log(newBet);
    Match.findOne( {_id: bet._id} )
    .then( match => {
      match.bets.push(newBet)
      var teamNum = bet.teams.indexOf(bet.teamPick)
      console.log(teamNum)
      if  (teamNum === 0) {
        match.t1bet += risks[idx]
      } else if (teamNum === 1) {
        match.t2bet += risks[idx]
      }
      return match.save( err => {
        if (err) return err.message
      })
    })
    .then( () => {
      Match.findOne( {_id: bet._id} )
      .then( match => {
        User.findOne( {_id: user._id} )
        .then( oldUser => {
          oldUser.matches.push(match);
          oldUser.balance -= risks[idx];
          oldUser.inPlay += risks[idx];
          oldUser.save( err => {
            console.log("User saved!");
            next();
          })
        })
      })
    })
  })
}
// TODO USE PROMISE.ALL TO HANDLE THE MULTIPLE BETS


module.exports = {
 create: create
};


// var BetSchema = new mongoose.Schema({
//   matchId: { type: String, ref: 'Match' },
//   userId: { type: String, ref: 'User', required: true },
//   risk: Number,
//   team: String
// });
