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
        //model.init = init;

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);


        // widgetService
        //     .findAllWidgetsForPage(model.pageId)
        //     .then(renderWidgets);
        //
        // function renderWidgets(widgets) {
        //     model.widgets = widgets;
        // }

        function renderWidget(widget) {
            model.widget = widget;
            console.log(model.widget);
            model.widgetClone = angular.copy(model.widget);

        }

        // function init() {
        //     model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
        //     model.widget = widgetService.findWidgetById(model.widgetId);
        //     model.widgetClone = angular.copy(model.widget);
        // }
        // init();

        // function getType() {
        //     widgetService
        //         .findWidgetById(model.widgetId)
        //         .then(function (widget) {
        //             //model.widget.widgetType = widget;
        //             return widget.widgetType;
        //         });
        // }

        // implementation
        function createWidget(widget) {
            widget.pageId = model.pageId;
            widgetService.createWidget(model.pageId, widget);
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