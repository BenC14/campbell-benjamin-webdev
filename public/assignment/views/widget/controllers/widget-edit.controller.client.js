(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);
    
    function widgetEditController($routeParams,
                                  widgetService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        // event handlers
        model.createWidget = createWidget;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            model.widgetClone = angular.copy(model.widget);
            console.log(model.widgets);

        }
        init();

        // implementation
        function createWidget(widget) {
            widget.pageId = model.pageId;
            widgetService.createWidget(widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, model.widgetClone);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();