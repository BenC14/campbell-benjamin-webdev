(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        console.log(model.websiteId);
        console.log($routeParams.websiteId);

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
        }
        init();
    }
})();