var app = require('../../express');

app.post  ('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get   ('/api/assignment/website/:websiteId', findWebsiteById);
app.put   ('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

// var websites = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

var websiteModel = require('../models/website/website.model.server');

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
}

// function findAllWebsitesForUser(req, res) {
//     var resultSet = [];
//     for(var w in websites) {
//         if(websites[w].developerId === req.params.userId) {
//             resultSet.push(websites[w]);
//         }
//     }
//     res.json(resultSet);
// }

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

// function createWebsite(req, res) {
//     var website = req.body;
//     website._id = (new Date()).getTime() + "";
//     websites.push(website)
//     res.send(website);
// }

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params.websiteId;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200);
        });
}

// function updateWebsite(req, res) {
//     var website = req.body;
//     var websiteId = req.params.websiteId;
//     for (var w in websites) {
//         if (websiteId === websites[w]._id) {
//             websites[w] = website;
//             res.sendStatus(200);
//             return;
//         }
//     }
//     res.sendStatus(404);
// }

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


// function deleteWebsite(req, res) {
//     var websiteId = req.params.websiteId;
//     var website = websites.find(function (website) {
//         return website._id === websiteId;
//     });
//     var index = websites.indexOf(website);
//     websites.splice(index, 1);
//     res.sendStatus(200);
// }

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.send(website);
        });

}

// function findWebsiteById(req, res) {
//     var websiteId = req.params['websiteId'];
//     var website = websites.find(function (website) {
//         return website._id === websiteId;
//     });
//     res.send(website);
// }