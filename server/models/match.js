var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match'},
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  risk: Number,
  team: String
});

// TODO: validations
var matchSchema = new mongoose.Schema({
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

matchSchema.virtual('odds').get(() => {
  var total = this.t1bet + this.t2bet
  var num = parse(total);
  return 2;
  // if (total < 1000) {
  //   return 1
  // } else {
  //   return num;
  // }
  // 'this' represents the match document
  // this.t1bet...
});

matchSchema.set('toJSON', {virtuals: true});
matchSchema.set('toObject', { virtuals: true });

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;

