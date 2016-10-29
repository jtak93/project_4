var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'xdxdxd';

var jwtOptions = {
 algorithm: 'HS256',
 expiresIn: '2 days'
};

function create(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return next({
      status: 401,
      message: 'Missing required fields: username and password'
    })
  }
  User.findOne({username: req.body.username})
    .then((user) => {
      if ( !user || !user.verifyPasswordSync(req.body.password) ) {
        return next({
          message: 'User not found or password incorrect.',
          status: 403
        });
      }
      var token = jwt.sign({ user: user }, secret, jwtOptions);
      return res.json({
        token: token
      });
    });
}

module.exports = {
 create:       create
};
