var mongoose = require('mongoose');
var deckSchema = require('./deck.schema.server');
var deckModel = mongoose.model('DeckModel', deckSchema);
var userProjectModel = require('../user/user.model.server');


deckModel.createDeck = createDeck;
deckModel.deleteDeck = deleteDeck;
deckModel.updateDeck = updateDeck;
deckModel.findDeckById = findDeckById;
deckModel.findAllDecks = findAllDecks;
deckModel.findAllPublicDecks = findAllPublicDecks;
deckModel.findAllDecksForUser = findAllDecksForUser;
deckModel.reorderDeck = reorderDeck;

module.exports = deckModel;

function createDeck(userId, deck) {
    deck._user = userId;
    return deckModel
        .find({_user: userId})
        .then(function (decks) {
            var order = Date.now();
            deck.order = order;
            return  deckModel
                .create(deck)
                .then(function (deck) {
                    return userProjectModel
                        .addDeck(userId, deck._id)
                        .then(function (response) {
                            return deckModel.findDeckById(response)
                                .then(function (response) {
                                    return response;
                                })
                        })
                })

        });
}

function findAllDecksForUser(userId) {
    return deckModel
        .find({_user: userId})
        .populate('_user', 'name')
        .exec();
}

function deleteDeck(deckId) {
    return deckModel
        .findById(deckId)
        .then(function (deck) {
            userProjectModel
                .deleteDeck(deck._user, deckId);
        })
        .then(function(){
            return deckModel
                .remove({_id: deckId})
                .then(function (status) {
                    return deck.save();
                })
        });

}

function updateDeck(deckId, deck) {
    return deckModel.findOneAndUpdate({_id: deckId}, deck, {upsert:true});
}

function findDeckById(deckId) {
    return deckModel.findById(deckId)
        .populate('_comments._user', 'username')
        .exec();
}

function findAllDecks() {
    return deckModel.find({})
        .populate('_user', 'username')
        .exec();
}

function findAllPublicDecks() {
    return deckModel.find({security:'Public'})
        .populate('_user', 'username')
        .exec();
}

function reorderDeck(userId, start, end) {
    var userId = userId;
    var initial = start;
    var final = end;

    return deckModel
        .find({_user: userId},null, {sort: {order: 1}}, function(err, doc) {
            if (doc.length < final){
                final = doc.length + 1;
            }
            var tempInitial = doc[initial].order;
            doc[initial].order = doc[final].order;
            doc[initial].save();
            doc[final].order = tempInitial;
            doc[final].save();
            return doc;
        })
        .then(function(response) {
            return doc;
        });
}
