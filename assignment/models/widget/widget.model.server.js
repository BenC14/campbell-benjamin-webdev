var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');


widgetModel.createWidget = createWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .find({_page: pageId})
        .then(function (widgets) {
            var order = Date.now();
            widget.order = order;
            return  widgetModel
                .create(widget)
                .then(function (widget) {
                    return pageModel
                        .addWidget(pageId, widget._id)
                        .then(function (response) {
                            return widgetModel.findWidgetById(response)
                                .then(function (response) {
                                    return response;
                                })
                        })
                })

        });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page', 'name')
        .exec();
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            pageModel
                .deleteWidget(widget._page, widgetId);
        })
        .then(function(){
            return widgetModel
                .remove({_id: widgetId})
                .then(function (status) {
                    return widget.save();
                })
        });

}

function updateWidget(widgetId, widget) {
    return widgetModel.findOneAndUpdate({_id: widgetId}, widget, {upsert:true});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function reorderWidget(pageId, start, end) {
    var pageId = pageId;
    var initial = start;
    var final = end;

    return widgetModel
        .find({_page: pageId},null, {sort: {order: 1}}, function(err, doc) {
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
