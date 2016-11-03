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
  }
];

var matchOne =
  {
    game: 'CSGO',
    tournament: 'ESL One',
    date: Date.now(),
    teams: ['Liquid', 'Navi'],
    t1bet: 1,
    t2bet: 1,
    active: true,
    result: null,
    bets: []
  }

var matchTwo =
  {
    game: 'DOTA 2',
    tournament: 'ESL Two',
    date: Date.now(),
    teams: ['t1', 't2'],
    t1bet: 1,
    t2bet: 1,
    active: false,
    result: null,
    bets: []
  }


Match
  .remove({})
  .then(() => {
  User.remove({})
    .then(() => {
      console.log('Emptying and seeding database...');
      return User.create(users);
    })
    // .then((users) => {
    //   // console.log(users)
    //   users.forEach(user => {
    //     // console.log(user)
    //     var newBet = {
    //       matchId: null,
    //       userId: user._id,
    //       risk: 1000
    //     };
    //     user.bets.push(newBet);
    //     user.save( err => {
    //       console.log(`Seeded bet in user ${user}`);
    //       return user;
    //     });
    //   });
    //   return users;
    // })
    .then( () => {
      console.log("create match 1")
      return Match.create(matchOne);
    })
    .then( () => {
      console.log("create match 2")
      return Match.create(matchTwo);
    })
    // .then( matches => {
    //   console.log("matches need saving")
    //   matches.forEach( match => {
    //     var newBet = {
    //       matchId: match._id,
    //       userId: null,
    //       risk: 1000
    //     };
    //     match.bets.push(newBet);
    //     match.save( err => {
    //       console.log(`Seeded ${matches.length} matches`);
    //     })
    //   })
    // })
    .then( () => {
      process.exit();
    });
  })

