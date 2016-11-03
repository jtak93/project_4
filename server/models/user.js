var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: String,
  userId: String,
  risk: Number,
  team: String
});

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  birthday: Date,
  balance: Number,
  inPlay: {
    type: Number,
    default: 0
  },
  bets: [betSchema]
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
