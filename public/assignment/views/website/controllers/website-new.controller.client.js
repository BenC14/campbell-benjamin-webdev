(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            model.websites = websites;
        }

        // implementation
        function createWebsite(website) {
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return;
            }
            website.developerId = model.userId;
            websiteService.createWebsite(model.userId, website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();