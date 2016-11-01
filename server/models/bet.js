var mongoose = require('mongoose');

var BetSchema = new mongoose.Schema({
  matchId: { type: String, ref: 'Match' },
  userId: { type: String, ref: 'User', required: true },
  risk: Number,
  team: String
});

var Bet = mongoose.model('Bet', BetSchema);

module.exports = Bet;
