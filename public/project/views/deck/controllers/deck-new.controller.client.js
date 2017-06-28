(function () {
    angular
        .module('HSProject')
        .controller('deckNewController', deckNewController);
    
    function deckNewController($routeParams,
                                  deckService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createDeck = createDeck;


        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function renderDecks(decks) {
            model.decks = decks;
        }

        // implementation
        function createDeck(deck) {
            console.log(deck);
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return;
            }
            deck._userId = model.userId;
            deckService.createDeck(model.userId, deck);
            $location.url('/user/'+model.userId+'/deck');
        }

    }
})();