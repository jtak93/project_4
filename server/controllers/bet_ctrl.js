var User = require('../models/user');
var Match = require('../models/match');
var Bet = require('../models/bet');
var itemsProcessed;
var betSlip;
var risks;
var user;
var riskTot;

function create(req, res, next) {
  // TODO: HANDLE ERROR AND FIX HANDLING MULTIPLE BETS
  console.log("running bet create")
  itemsProcessed = 0;
  betSlip = req.body.betSlip;
  risks = req.body.risks;
  user = req.body.user;
  riskTot = riskSum()
  betSlip.forEach( (bet, idx) => {
    var newBet = {
      matchId: bet._id,
      userId: user._id,
      risk: risks[idx],
      team: bet.teamPick
    }
    Match.findOne( {_id: bet._id} )
    .then( match => {
      match.bets.push(newBet)
      var teamNum = bet.teams.indexOf(bet.teamPick)
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
          console.log("user: ", oldUser)
          console.log(riskSum())
          oldUser.balance -= riskTot;
          oldUser.inPlay += riskTot;
          console.log("user: ", oldUser)
          oldUser.save( err => {
            console.log("User saved!");
            itemsProcessed++;
            if(itemsProcessed === betSlip.length) {
              next();
            }
          })
        })
      })
    })
  })
}
// TODO USE PROMISE.ALL TO HANDLE THE MULTIPLE BETS

function riskSum() {
  var sum = 0
  risks.forEach(risk => {
    sum += risk
  })
  return sum
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
