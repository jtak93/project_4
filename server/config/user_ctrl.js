var User = require('../models/user');

function createUser(req, res, next) {
  // TODO: HANDLE ERR
  console.log(req.body);
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    balance: 1000,
    inPlay: 0
  }
  User.create(user)
    .then( user => next() );
}

module.exports = {
 create: createUser
};
