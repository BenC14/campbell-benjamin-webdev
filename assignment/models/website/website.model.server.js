var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');


websiteModel.createWebsite = createWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deletePage = deletePage;
websiteModel.addPage = addPage;

module.exports = websiteModel;

function deletePage(websiteId, pageId) {
    return websiteModel
        .findOne({_id: websiteId})
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}


function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function deleteWebsite(websiteId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            userModel
                .deleteWebsite(website._user, websiteId);
        })
        .then(function(){
            return websiteModel
            .remove({_id: websiteId})
                .then(function (status) {
                    return website.save();
                })
        });

}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name: website.name,
            description: website.description,
        }
    });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}
