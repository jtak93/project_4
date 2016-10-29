var mongoose = require('./db');

var User = require('../models/user');

var users = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@email.com',
    birthday: Date.now(),
    balance: 10000
  },
];

User
  .remove({})
  .then(() => {
    console.log('Emptying and seeding database...');
    return User.create(users);
  })
  .then((users) => {
    console.log(`Seeded ${users.length} users`);
    mongoose.connection.close();
    process.exit();
  });
