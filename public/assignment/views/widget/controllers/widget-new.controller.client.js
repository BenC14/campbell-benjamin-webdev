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

        widgetService
            .findAllWidgetsForPage(model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function createWidget(type) {
            var newWidget = {"type": "", "width": "", "url": ""};
            //newWidget._id = (new Date()).getTime() + "";
            newWidget.type = type;
            // newWidget.pageId = model.pageId;
            console.log(type);
            widgetService.createWidget(model.pageId, newWidget)
                .then(function(success) {
                    console.log('in create widget');
                    console.log('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+success._id);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+success._id);
                });
        }

    }
})();