(function () {
    angular
        .module('HSProject')
        .controller('deckNewController', deckNewController);
    
    function deckNewController(currentUser, $routeParams,
                                  deckService,
                                  $location, userProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createDeck = createDeck;
        model.logout = logout;
        model.currentUser = currentUser;

        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function renderDecks(decks) {
            model.decks = decks;
        }

        // implementation
        function createDeck(deck) {
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return;
            }
            deck._userId = model.userId;
            deckService.createDeck(model.userId, deck);
            $location.url('/user/'+model.userId+'/deck');
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