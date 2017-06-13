var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');


pageModel.createPage = createPage;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.deleteWidget = deleteWidget;
pageModel.addWidget = addWidget;

module.exports = pageModel;

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findOne({_id: pageId})
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    console.log('in add widget');
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            console.log('in page');
            console.log(page);
            page.save();
            return widgetId;
        });
}


function createPage(websiteId, page) {
    console.log('in page model');
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function deletePage(pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            websiteModel
                .deletePage(page._website, pageId);
        })
        .then(function(){
            return pageModel
            .remove({_id: pageId})
                .then(function (status) {
                    return page.save();
                })
        });

}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        $set : {
            name: page.name,
            title: page.title,
            description: page.description
        }
    });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}
