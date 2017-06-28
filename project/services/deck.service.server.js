var app = require('../../express');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

app.post  ('/api/project/user/:userId/deck', createDeck);
app.get('/api/project/user/:userId/deck', findAllDecksForUser);
app.get   ('/api/project/deck/:deckId', findDeckById);
app.put   ('/api/project/deck/:deckId', updateDeck);
app.delete('/api/project/deck/:deckId', deleteDeck);
app.post ("/api/project/upload", upload.single('myFile'), uploadImage);
app.put ('/api/project/user/:userId/deck', orderDeck);

var deckModel = require('../models/deck/deck.model.server');

function findAllDecksForUser(req, res) {
    deckModel
        .findAllDecksForUser(req.params.userId)
        .then(function (decks) {
            res.json(decks);
        })
}

function createDeck(req, res) {
    var deck = req.body;
    var userId = req.params.userId;
    deckModel
        .createDeck(userId, deck)
        .then(function (deck) {
            res.send(deck);
        });
}

function updateDeck(req, res) {
    var deck = req.body;
    var deckId = req.params.deckId;
    deckModel
        .updateDeck(deckId, deck)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function deleteDeck(req, res) {
    var deckId = req.params.deckId;
    return deckModel
        .deleteDeck(deckId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findDeckById(req, res) {
    var deckId = req.params['deckId'];
    deckModel
        .findDeckById(deckId)
        .then(function (deck) {
            res.send(deck);
        });

}

function uploadImage(req, res) {
    var deckId      = req.body.deckId;

    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var userId = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var url = '/project/uploads/'+filename;

    var deckNew = {};
    deckNew._id = deckId;
    deckNew.url = url;
    return deckModel.updateDeck(deckId, deckNew)
        .then(function(response){
            var callbackUrl   = '/project/#!/user/'+userId+'/website/'+websiteId+'/user/'+userId+'/deck/'+deckId;
            return res.redirect(callbackUrl);
        });

    var callbackUrl   = '/project/#!/user/'+userId+'/website/'+websiteId+'/user/'+userId+'/deck/'+deckId;

    res.redirect(callbackUrl);
}

function orderDeck(req, res) {
    var userId = req.params.userId;
    var initial = parseInt(req.query['initial']);
    var final = parseInt(req.query['final']);


    return deckModel
        .reorderDeck(userId, initial, final)
        .then(function (status) {
            res.sendStatus(status);
        });
}