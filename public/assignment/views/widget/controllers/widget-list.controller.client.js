(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);
    
    function widgetListController($routeParams, widgetService, $sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        widgetService
            .findAllWidgetsForPage(model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            model.widgets = widgets.sort(orderWidgets);

        }

        function orderWidgets(widget1, widget2) {
            if (widget1.order < widget2.order)
                return -1;
            if (widget1.order > widget2.order)
                return 1;
            return 0;
        }

        model.getWidgetUrlForType = getWidgetUrlForType;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trustThisContent = trustThisContent;

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);

            //https://www.youtube.com/embed/AM2Ivdi9c4E
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

    }
})();