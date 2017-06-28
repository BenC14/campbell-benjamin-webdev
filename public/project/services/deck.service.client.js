(function () {
    angular
        .module('HSProject')
        .factory('deckService', deckService);
    
    function deckService($http) {

        return {
            createDeck: createDeck,
            findAllDecksForUser: findAllDecksForUser,
            findDeckById: findDeckById,
            updateDeck: updateDeck,
            deleteDeck: deleteDeck,
            getCardsForClass: getCardsForClass
        };
        function createDeck(userId, deck) {
            var url = "/api/project/user/"+userId+"/deck"
            return $http.post(url, deck)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateDeck(deckId, deck) {
            var url = "/api/project/deck/" + deckId;
            return $http.put(url, deck)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteDeck(deckId) {
            var url = "/api/project/deck/" + deckId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findDeckById(deckId) {
            var url = "/api/project/deck/" + deckId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findAllDecksForUser(userId) {
            var url = "/api/project/user/" +userId+ "/deck/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getCardsForClass(heroClass) {
            var url = "/api/hearthstone/query/cards/classes/" + heroClass;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();