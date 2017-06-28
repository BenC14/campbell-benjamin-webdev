(function () {
    angular
        .module('HSProject')
        .controller('deckListController', deckListController);
    
    function deckListController($routeParams, deckService) {

        var model = this;
        model.userId = $routeParams['userId'];

        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function renderDecks(decks) {
            model.decks = decks;
        }

    }
})();