(function () {
    angular
        .module('HSProject')
        .controller('homeController', homeController);


    function homeController(currentUser, $route, deckService, userProjectService) {
        var model = this;
        model.currentUser = currentUser;

        model.logout = logout;
        model.findAllPublicDecks = findAllPublicDecks;


        function findAllPublicDecks() {
            deckService
                .findAllPublicDecks()
                .then(function(decks) {
                    model.decks = decks;
                })
        }
        findAllPublicDecks();

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $route.reload();
                });
        }
    }


})();