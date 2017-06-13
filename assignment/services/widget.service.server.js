var app = require('../../express');

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post  ('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get   ('/api/assignment/widget/:widgetId', findWidgetById);
app.put   ('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put ('/api/assignment/page/:pageId/widget', orderWidget);

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

var widgetModel = require('../models/widget/widget.model.server');

function findAllWidgetsForPage(req, res) {
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        })
}



// function findAllWidgetsForPage(req, res) {
//     var resultSet = [];
//     for(var w in widgets) {
//         if(widgets[w].pageId === req.params.pageId) {
//             resultSet.push(widgets[w]);
//         }
//     }
//     res.json(resultSet);
// }

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            console.log('widget');
            res.send(widget);
        });
}

// function createWidget(req, res) {
//     var widget = req.body;
//     widget._id = (new Date()).getTime() + "";
//     widgets.push(widget);
//     res.send(widget);
// }


function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    console.log('in server service');
    console.log(widget);

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}
//
// function updateWidget(req, res) {
//     var widget = req.body;
//     var widgetId = req.params.widgetId;
//     for (var w in widgets) {
//         if (widgetId === widgets[w]._id) {
//             widgets[w] = widget;
//             res.sendStatus(200);
//             return;
//         }
//     }
//     res.sendStatus(404);
// }


function deleteWidget(req, res) {
    console.log('in delete');
    var widgetId = req.params.widgetId;
    console.log(widgetId);
    return widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

// function deleteWidget(req, res) {
//     var widgetId = req.params.widgetId;
//     var widget = widgets.find(function (widget) {
//         return widget._id === widgetId;
//     });
//     var index = widgets.indexOf(widget);
//     widgets.splice(index, 1);
//     res.sendStatus(200);
// }

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.send(widget);
        });

}

// function findWidgetById(req, res) {
//     var widgetId = req.params['widgetId'];
//     var widget = widgets.find(function (widget) {
//         return widget._id === widgetId;
//     });
//     res.send(widget);
// }

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;

    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var url = '/assignment/uploads/'+filename;

    var widgetNew = {};
    widgetNew._id = widgetId;
    widgetNew.url = url;
    return widgetModel.updateWidget(widgetId, widgetNew)
        .then(function(response){
            var callbackUrl   = '/assignment/#!/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId;
            return res.redirect(callbackUrl);
        });

    // for (var w in widgets) {
    //     if (widgetId === widgets[w]._id) {
    //         widgets[w].url = url;
    //     }
    // }

    var callbackUrl   = '/assignment/#!/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId;

    res.redirect(callbackUrl);
}

function orderWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = parseInt(req.query['initial']);
    var final = parseInt(req.query['final']);


    return widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.sendStatus(status);
        });
}


// function orderWidget(req, res) {
//     var pageId = req.params.pageId;
//     var initial = parseInt(req.query['initial']);
//     var final = parseInt(req.query['final']);
//
//
//     var order = [];
//     for (var w in widgets) {
//         if (widgets[w].pageId === pageId) {
//             order.push(w);
//         }
//     }
//     var oldIndex = order[initial];
//     var newIndex = order[final];
//     var widget = widgets[oldIndex];
//     widgets.splice(oldIndex, 1);
//     widgets.splice(newIndex, 0, widget);
//     res.sendStatus(200);
//
// }