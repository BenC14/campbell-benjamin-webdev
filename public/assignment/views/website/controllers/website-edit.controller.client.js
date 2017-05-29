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
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.websiteClone = angular.copy(model.website);
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.websiteClone);
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();