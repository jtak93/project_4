var User = require('../models/user');

function createUser(req, res, next) {
  // TODO: HANDLE ERR
  console.log("user:", req.body);
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    balance: 1000
  }
  User.create(user)
    .then( user => {
      console.log(user)
      next();
    });
}

module.exports = {
 create: createUser
};
