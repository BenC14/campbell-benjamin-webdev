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

var widgetModel = require('../models/widget/widget.model.server');

function findAllWidgetsForPage(req, res) {
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets) {
            res.json(widgets);
        })
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.send(widget);
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    return widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.send(widget);
        });

}

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