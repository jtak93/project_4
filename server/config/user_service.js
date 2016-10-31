var User = require('../models/user');

function createUser(req, res, next) {
  console.log(req.body);
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    balance: 1000
  }
  User.create(user)
    .then( user => next() );
}

module.exports = {
 create: createUser
};
