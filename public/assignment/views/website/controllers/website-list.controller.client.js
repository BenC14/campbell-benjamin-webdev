(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        console.log(model.userId);
        console.log($routeParams.userId);

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();
    }
})();