(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

        function wbdvSortable($http, $routeParams) {
            function linkFunction(scope, element) {
                var initial = -1;
                var final = -1;
                $(element).sortable({

                    start: function (event, ui) {
                        initial = ui.item.index();
                    },
                    stop: function (event, ui) {
                        var final = ui.item.index();
                        var pageId = $routeParams.pageId;
                        var url = "/api/assignment/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;

                        return $http.put(url);
                    }
                });
            }
                return {link: linkFunction};
            }


})();
