(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($scope,
                                  $route,
                                  $routeParams,
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

        widgetService
            .findWidgetById(model.widgetId)
            .then(renderWidget);


        function renderWidget(widget) {
            model.widget = widget;
            model.widgetClone = angular.copy(model.widget);

        }


        // implementation
        function createWidget(widget) {
            widget.pageId = model.pageId;
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function updateWidget(widget) {
            console.log(widget);
            console.log('clone');
            console.log(model.widgetClone);
            widgetService.updateWidget(model.widgetId, model.widgetClone);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

        function deleteWidget(widgetId) {
            console.log('in controller');
            console.log(widgetId);
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }
})();