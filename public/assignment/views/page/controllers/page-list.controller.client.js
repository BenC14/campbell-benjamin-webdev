(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        pageService
            .findAllPagesForWebsite(model.websiteId)
            .then(renderPages);

        function renderPages(pages) {
            model.pages = pages;
        }

    }
})();