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
        model.pageId = $routeParams['pageId']
        model.widgetId = $routeParams['widgetId'];

        // event handlers
        model.selectPhoto = selectPhoto;
        model.searchPhotos = searchPhotos;

        function getWidget() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }

        function renderWidget(widget) {
            model.widget = widget;
        }

        getWidget();

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;

            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function (success) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }

})();