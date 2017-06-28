var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143241.mlab.com:43241/heroku_1jv2w9jl'; // user yours
}

mongoose.createConnection(connectionString);

require('./services/user.service.server');
require('./services/deck.service.server');

