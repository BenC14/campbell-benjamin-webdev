(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);
    
    function widgetNewController($routeParams,
                                  widgetService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // event handlers
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
        }
        init();

        // implementation
        function createWidget(type) {
            var newWidget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
            newWidget._id = (new Date()).getTime() + "";
            newWidget.widgetType = type;
            newWidget.pageId = model.pageId;
            widgetService.createWidget(newWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+newWidget._id);
        }

    }
})();