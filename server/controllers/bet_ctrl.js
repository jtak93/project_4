var User = require('../models/user');
var Match = require('../models/match');
var Bet = require('../models/bet');

function create(req, res, next) {
  // TODO: HANDLE ERROR
  console.log("running bet create")
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
        console.log("user:", user)
        user.save((err) => {
          console.log("err:", err)
          Match.findOne( {_id: bet._id} )
            .then(match => {
              match.bets.push(newBet);
              // get team pick
              console.log(bet.teams)
              console.log(bet.teamPick)
              var teamNum = bet.teams.indexOf(bet.teamPick)
              console.log(teamNum)
              if  (teamNum === 0) {
                match.t1bet += risks[idx]
              } else if (teamNum === 1) {
                match.t2bet += risks[idx]
              }
              match.save(err => {
                if (err) return err
                console.log(match)
                next();
              })
            })
        })
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
