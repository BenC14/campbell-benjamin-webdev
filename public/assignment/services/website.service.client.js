(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        return {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        function createWebsite(userId, website) {
            var url = "/api/assignment/user/"+userId+"/website"
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/" +userId+ "/website/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();