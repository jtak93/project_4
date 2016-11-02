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
    inPlay: 0,
    bets: []
  },
];

var matches = [
  {
    game: 'CSGO',
    tournament: 'ESL One',
    date: Date.now(),
    teams: ['Liquid', 'Navi'],
    t1bet: 0,
    t2bet: 0,
    active: true,
    result: null,
    bets: []
  },
  {
    game: 'CSGO',
    tournament: 'ESL Two',
    date: Date.now(),
    teams: ['t1', 't2'],
    t1bet: 0,
    t2bet: 0,
    active: false,
    result: 2,
    bets: []
  }
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
      console.log(`Seeded ${users.length} users`);
      return Match.create(matches);
    })
    .then( (matches) => {
      console.log(`Seeded ${matches.length} matches`);
      mongoose.connection.close();
      process.exit();
    });
  });


