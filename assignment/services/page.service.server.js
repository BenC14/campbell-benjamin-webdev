var app = require('../../express');

app.post  ('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get   ('/api/assignment/page/:pageId', findPageById);
app.put   ('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

var pageModel = require('../models/page/page.model.server');

function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        })
}


// function findAllPagesForWebsite(req, res) {
//     var resultSet = [];
//     for(var p in pages) {
//         if(pages[p].websiteId === req.params.websiteId) {
//             resultSet.push(pages[p]);
//         }
//     }
//     res.json(resultSet);
// }

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.send(page);
        });
}

//
// function createPage(req, res) {
//     var page = req.body;
//     page._id = (new Date()).getTime() + "";
//     pages.push(page);
//     res.send(page);
// }

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200);
        });
}

// function updatePage(req, res) {
//     var page = req.body;
//     var pageId = req.params.pageId;
//     for (var p in pages) {
//         if (pageId === pages[p]._id) {
//             pages[p] = page;
//             res.sendStatus(200);
//             return;
//         }
//     }
//     res.sendStatus(404);
// }

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


// function deletePage(req, res) {
//     var pageId = req.params.pageId;
//     var page = pages.find(function (page) {
//         return page._id === pageId;
//     });
//     var index = pages.indexOf(page);
//     pages.splice(index, 1);
//     res.sendStatus(200);
// }

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.send(page);
        });

}

// function findPageById(req, res) {
//     var pageId = req.params['pageId'];
//     var page = pages.find(function (page) {
//         return page._id === pageId;
//     });
//     res.send(page);
// }