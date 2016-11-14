var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: String,
  userId: String,
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

matchSchema.virtual('odds1').get(function () {
  var total = this.t1bet + this.t2bet
  var rakedTotal = total * 0.95
  if (this.t1bet < 500 || this.t2bet < 500) {
    return 1.95
  } else {
    var num = (rakedTotal - this.t1bet) / this.t1bet + 1
    return num;
  }
  // 'this' represents the match document
  // this.t1bet...
});

matchSchema.virtual('odds2').get(function () {
  var total = this.t1bet + this.t2bet
  var rakedTotal = total * 0.95
  if (this.t1bet < 500 || this.t2bet < 500) {
    return 1.95
  } else {
    var num = (rakedTotal - this.t2bet) / this.t2bet + 1
    return num;
  }
  // 'this' represents the match document
  // this.t1bet...
});

matchSchema.set('toJSON', {virtuals: true});

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;

