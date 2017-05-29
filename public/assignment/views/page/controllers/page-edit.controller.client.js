(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
            model.pageClone = angular.copy(model.page);

        }
        init();

        // implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function updatePage(page) {
            pageService.updatePage(model.pageId, model.pageClone);
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();