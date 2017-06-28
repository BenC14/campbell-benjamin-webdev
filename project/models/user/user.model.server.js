
var mongoose = require('mongoose');
var userProjectSchema = require('./user.schema.server');
var userProjectModel = mongoose.model('UserProjectModel', userProjectSchema);

userProjectModel.createUser = createUser;
userProjectModel.findUserById = findUserById;
userProjectModel.findUserByCredentials = findUserByCredentials;
userProjectModel.findUserByUsername = findUserByUsername;
userProjectModel.findAllUsers = findAllUsers;
userProjectModel.deleteUser = deleteUser;
userProjectModel.updateUser = updateUser;
//userProjectModel.findUserByUsername = findUserByUsername;
userProjectModel.deleteDeck = deleteDeck;
userProjectModel.addDeck = addDeck;
userProjectModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userProjectModel;

function findUserByGoogleId(googleId) {
    return userProjectModel.findOne({'google.id': googleId});
}


function deleteDeck(userId, deckId) {
    return userProjectModel
        .findOne({_id: userId})
        .then(function (user) {
            var index = user.decks.indexOf(deckId);
            user.decks.splice(index, 1);
            return user.save();
        });
}

function addDeck(userId, deckId) {
    return userProjectModel
        .findById(userId)
        .then(function (user) {
            user.decks.push(deckId);
            return user.save();
        });
}

function updateUser(userId, newUser) {

    return userProjectModel.update({_id: userId}, {
        $set : {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    });
}

function deleteUser(userId) {
    return userProjectModel.remove({_id: userId});
}

function findUserByCredentials(username, password) {
    return userProjectModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    console.log('in find by user server');
    console.log(username);
    return userProjectModel.findOne({username: username})
        .then(function (response) {
            if (response != null){
                console.log('found');
                console.log(response);
                return response;
            } else {
                return {'availble': 'true'};
            }
        });
}


function findUserById(userId) {
    return userProjectModel.findById(userId);
}

function findAllUsers() {
    return userProjectModel.find({});
}

function createUser(user) {
    return userProjectModel.create(user);
}
