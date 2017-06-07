(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        // var websites = [
        //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        // ];

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
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
        }

        // function createWebsite(website) {
        //     website._id = (new Date()).getTime() + "";
        //     websites.push(website);
        // }

        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        // function updateWebsite(websiteId, website) {
        //     var websiteOld = websites.find(function (website) {
        //         return website._id === websiteId;
        //     });
        //     var index = websites.indexOf(websiteOld);
        //     websites[index].name = website.name;
        //     websites[index].description = website.description;
        // }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        // function deleteWebsite(websiteId) {
        //     var website = websites.find(function (website) {
        //         return website._id === websiteId;
        //     });
        //     var index = websites.indexOf(website);
        //     websites.splice(index, 1);
        // }

        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findWebsiteById(websiteId) {
        //     return websites.find(function (website) {
        //         return website._id === websiteId;
        //     });
        // }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/" +userId+ "/website/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();