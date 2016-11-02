var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match'},
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  risk: Number,
  team: String
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
  result: Number,
  bets: [betSchema]
});

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;

