var mongoose = require('./db');

var User = require('../models/user');
var Match = require('../models/match');

var users = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@email.com',
    birthday: Date.now(),
    balance: 10000,
    bets: []
  },
];

Match
  .remove({})
  .then(() => {
  User.remove({})
    .then(() => {
      console.log('Emptying and seeding database...');
      return User.create(users);
    })
    .then((users) => {
      console.log(users)
      users.map(user => {
        console.log(user)
        var newBet = {
          matchId: null,
          userId: user._id,
          risk: 1000
        };
        user.bets.push(newBet);
        user.save( (err, user) => console.log(user))
        console.log(`Seeded ${users.length} users`);
        mongoose.connection.close();
        process.exit();
        return user;
      });
    });
  });
