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

var matches = [
{
  game: 'DOTA 2',
  tournament: 'ESL Two',
  date: Date.now(),
  teams: ['t1', 't2'],
  t1bet: 1,
  t2bet: 1,
  active: false,
  result: 1,
  bets: []
},
{
  game: 'LOL',
  tournament: 'ESL Two',
  date: Date.now(),
  teams: ['Sup', 'Son'],
  t1bet: 1,
  t2bet: 1,
  active: false,
  result: 0,
  bets: []
},
{
  game: 'DOTA 2',
  tournament: 'ESL Two',
  date: Date.now(),
  teams: ['XD', 'KappaPride'],
  t1bet: 1,
  t2bet: 1,
  active: false,
  result: null,
  bets: []
},
{
  game: 'CSGO',
  tournament: 'ESL Two',
  date: Date.now(),
  teams: ['TempoStorm', 'Fnatic'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
},
{
  game: 'LOL',
  tournament: 'Tournament 1',
  date: Date.now(),
  teams: ['Random', 'Team'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
},
{
  game: 'DOTA 2',
  tournament: 'Tournament 3',
  date: Date.now(),
  teams: ['XDwarriors', 'PogChamps'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
},
{
  game: 'CSGO',
  tournament: 'Tournament 5',
  date: Date.now(),
  teams: ['LETS GO', 'LAKERS>WARRIORS'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
},
{
  game: 'DOTA 2',
  tournament: 'The International',
  date: Date.now(),
  teams: ['Secret', 'Ehome'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
},
{
  game: 'LOL',
  tournament: 'Worlds',
  date: Date.now(),
  teams: ['Dignitas', 'SK Telecom'],
  t1bet: 1,
  t2bet: 1,
  active: true,
  result: null,
  bets: []
}
]


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
      return Match.create(matches);
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

