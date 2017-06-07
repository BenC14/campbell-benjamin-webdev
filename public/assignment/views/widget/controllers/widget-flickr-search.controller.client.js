(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetFlickrSearchController', widgetFlickrSearchController);
    
    function widgetFlickrSearchController($routeParams,
                                  flickrService,
                                  widgetService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        // event handlers
        model.createWidget = createWidget;
        model.selectPhoto = selectPhoto;
        model.searchPhotos = searchPhotos;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then();
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }



        widgetService
            .findAllWidgetsForPage(model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        // function init() {
        //     model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
        // }
        // init();

        // implementation
        function createWidget(type) {
            var newWidget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
            //newWidget._id = (new Date()).getTime() + "";
            newWidget.widgetType = type;
            newWidget.pageId = model.pageId;
            //console.log(newWidget);
            widgetService.createWidget(model.pageId, newWidget)
                .then(function(success) {
                    console.log('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+success._id);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+success._id);
                });
        }

    }
})();