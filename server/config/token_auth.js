var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'xdxdxd';

var jwtOptions = {
 algorithm: 'HS256',
 expiresIn: '2 days'
};

function authenticate(req, res, next) {
  var authHeader = req.get('Authorization');

  if (!authHeader) {
    return next({
      status:  401,
      message: 'Authentication failed: missing auth header'
    })
  }

  var token = authHeader.split(' ')[1]

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return next(err)
    req.decoded = decoded;
    next()
  });
}

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

function passUser(req, res, next) {
  User.findOne({username: req.body.user.username})
    .then((user) => {
      var token = jwt.sign({ user: user }, secret, jwtOptions);
      return res.json({
        token: token
      });
    });
}

module.exports = {
  create:        create,
  authenticate:  authenticate,
  passUser: passUser
};
