(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);
    
    function widgetService() {

        // var widgets = [
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];

        return {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(widget) {
            var url = "/api/assignment/page/"+pageId+"/widget"
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
        }

        // function createWidget(widget) {
        //     widget._id = (new Date()).getTime() + "";
        //     widgets.push(widget);
        // }

        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        // function updateWidget(widgetId, widget) {
        //     var widgetOld = widgets.find(function (widget) {
        //         return widget._id === widgetId;
        //     });
        //     var index = widgets.indexOf(widgetOld);
        //     for (var attrname in widget) { widgets[index][attrname] = widget[attrname]; }
        // }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function deleteWidget(widgetId) {
        //     var widget = widgets.find(function (widget) {
        //         return widget._id === widgetId;
        //     });
        //     var index = widgets.indexOf(widget);
        //     widgets.splice(index, 1);
        // }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findWidgetById(widgetId) {
        //     return widgets.find(function (widget) {
        //         return widget._id === widgetId;
        //     });
        // }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" +pageId+ "/widget/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findAllWidgetsForPage(pageId) {
        //     var resultSet = [];
        //     for(var w in widgets) {
        //         if(widgets[w].pageId === pageId) {
        //             resultSet.push(widgets[w]);
        //         }
        //     }
        //     return resultSet;
        // }
    }
})();