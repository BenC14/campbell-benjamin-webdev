var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserProjectModel"},
    text: String,
    dateCreated: {type: Date, default: Date.now}
});
var deckSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserProjectModel"},
    name: String,
    description: String,
    heroClass: {type: String, enum: ['Mage', 'Priest', 'Warlock', 'Warrior', 'Hunter', 'Rogue', 'Paladin', 'Druid', 'Shaman']},
    gameType: {type: String, enum: ['Standard', 'Wild']},
    cards: [],
    cardCount: { type: Number, default: 0 },
    security: {type: String, enum: ['Public', 'Private']},
    order: Number,
    _comments: [commentSchema],
    stars: { type: Number, default: 0 },
    dateCreated: {type: Date, default: Date.now},
}, {collection: "deck"});
module.exports = deckSchema;