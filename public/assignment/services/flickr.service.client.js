(function () {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);
    
    function flickrService($http) {

        var key = "0984e38b3afd59d182ad3416528fbd97";
        var secret = "b13c64fe55ddfdd8";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        return {
            searchPhotos: searchPhotos
        };


            function searchPhotos(searchTerm) {
                console.log(urlBase);
                var url = urlBase
                    .replace("API_KEY", key)
                    .replace("TEXT", searchTerm);
                return $http.get(url);
            }
        }
})();