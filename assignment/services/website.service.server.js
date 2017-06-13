var app = require('../../express');

app.post  ('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get   ('/api/assignment/website/:websiteId', findWebsiteById);
app.put   ('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

var websiteModel = require('../models/website/website.model.server');

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.json(website);
        });
}


function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });
}



function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.send(website);
        });

}
