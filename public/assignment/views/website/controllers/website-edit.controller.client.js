(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        // event handlers

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        websiteService
            .findWebsiteById(model.websiteId)
            .then(renderWebsite);

        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(websites) {
            model.website = websites;
            model.websiteClone = angular.copy(model.website);
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.websiteClone);
            $location.url('/user/'+model.userId+'/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();