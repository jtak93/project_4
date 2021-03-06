var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds143767.mlab.com:43767/esport-lounge');
mongoose.Promise = global.Promise;

// shortcut to mongoose.connection object
var db = mongoose.connection;

db.once('open', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(err) {
  console.error(`Database error:\n${err}`);
});
