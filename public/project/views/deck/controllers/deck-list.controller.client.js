(function () {
    angular
        .module('HSProject')
        .controller('deckListController', deckListController);
    
    function deckListController(currentUser, $routeParams, $location, deckService, userProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.currentUser = currentUser
        model.logout = logout;

        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function renderDecks(decks) {
            model.decks = decks;
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();