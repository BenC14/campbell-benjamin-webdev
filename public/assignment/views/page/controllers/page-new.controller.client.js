(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createPage = createPage;

        pageService
            .findAllPagesForWebsite(model.websiteId)
            .then(renderPages);

        function renderPages(pages) {
            model.pages = pages;
        }

        // implementation
        function createPage(page) {
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return;
            }
            page.websiteId = model.websiteId;
            pageService.createPage(model.websiteId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();