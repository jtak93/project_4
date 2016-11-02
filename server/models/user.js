var mongoose = require('mongoose');

var Schema = mongoose.Schema

var betSchema = new mongoose.Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match'},
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  risk: Number,
  team: String
});

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  birthday: Date,
  balance: Number,
  inPlay: Number,
  bets: [betSchema]
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
