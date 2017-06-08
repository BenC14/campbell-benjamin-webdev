(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);
    
    function widgetService($http) {

        return {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidgets: sortWidgets
        };

        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/"+pageId+"/widget"
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" +pageId+ "/widget/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidgets(pageId, initial, final){
            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }
    }
})();