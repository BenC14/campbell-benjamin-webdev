var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, unique : true, require: true, dropDups: true},
    password: {type: String, require: true},
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "user"});
module.exports = userSchema;