var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://MongoLab-b:UgDSFViA_qKGUVtyhsO9iLCq4M91hT7YD25_2YU1r2I-@ds052408.mongolab.com:52408/MongoLab-b');

var db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

var Schema = mongoose.Schema;
db.userSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

db.urlSchema = new Schema({
  id: Schema.Types.ObjectId,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = db;

console.log(db.userSchema);
// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
