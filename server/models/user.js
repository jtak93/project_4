var mongoose = require('mongoose');
var Match = require('./match')
var matchSchema = mongoose.model('Match').schema

var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  birthday: Date,
  balance: Number,
  inPlay: {
    type: Number,
    default: 0
  }
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
