(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);
    
    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        return {
            createPage: createPage,
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(page) {
            var url = "/api/assignment/website/"+websiteId+"/page"
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                })
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
        }

        // function createPage(page) {
        //     page._id = (new Date()).getTime() + "";
        //     pages.push(page);
        // }

        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        // function updatePage(pageId, page) {
        //     var pageOld = pages.find(function (page) {
        //         return page._id === pageId;
        //     });
        //     var index = pages.indexOf(pageOld);
        //     pages[index].name = page.name;
        //     pages[index].description = page.description;
        // }

        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function deletePage(pageId) {
        //     var page = pages.find(function (page) {
        //         return page._id === pageId;
        //     });
        //     var index = pages.indexOf(page);
        //     pages.splice(index, 1);
        // }

        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findPageById(pageId) {
        //     return pages.find(function (page) {
        //         return page._id === pageId;
        //     });
        // }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/assignment/website/" +websiteId+ "/page/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findAllPagesForWebsite(websiteId) {
        //     var resultSet = [];
        //     for(var p in pages) {
        //         if(pages[p].websiteId === websiteId) {
        //             resultSet.push(pages[p]);
        //         }
        //     }
        //     return resultSet;
        // }
    }
})();