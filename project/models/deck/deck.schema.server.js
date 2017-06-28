var mongoose = require('mongoose');
var deckSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserProjectModel"},
    name: String,
    heroClass: {type: String, enum: ['Mage', 'Priest', 'Warlock', 'Warrior', 'Hunter', 'Rogue', 'Paladin', 'Druid', 'Shaman']},
    gameType: {type: String, enum: ['STANDARD', 'WILD']},
    cards: [],
    cardCount: { type: Number, default: 0 },
    security: {type: String, enum: ['PUBLIC', 'PRIVATE']},
    order: Number,
    dateCreated: {type: Date, default: Date.now},
}, {collection: "deck"});
module.exports = deckSchema;