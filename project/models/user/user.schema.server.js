var mongoose = require('mongoose');
var userProjectSchema = mongoose.Schema({
    username: {type: String, unique : true, require: true, dropDups: true},
    password: {type: String, require: true},
    email: String,
    firstName: String,
    lastName: String,
    decks: [{type: mongoose.Schema.Types.ObjectId, ref: "deckModel"}],
    dateCreated: {type: Date, default: Date.now},
    google: {
        id:    String,
        token: String
    }
}, {collection: "userProject"});
module.exports = userProjectSchema;