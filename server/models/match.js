var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  risk: Number
});

// TODO: validations
var MatchSchema = new mongoose.Schema({
  game: String,
  tournament: String,
  date: Date,
  teams: [String],
  t1bet: Number,
  t2bet: Number,
  active: Boolean,
  result: {
    type: Number,
    // null means not done, 0 tie, 1 team 1 wins, 2 team 2 wins
    enum: [0, 1, 2]
  },
  bets: [betSchema]
});

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;

