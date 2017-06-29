(function () {
    angular
        .module('HSProject')
        .controller('deckDetailsController', deckDetailsController);
    
    function deckDetailsController(currentUser, $routeParams,
                                  deckService,
                                  $location, userProjectService) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = $routeParams['userId'];
        model.deckId = $routeParams.deckId;
        model.cards = {};

        // event handlers

        model.updateDeck = updateDeck;
        model.addCommentToDeck = addCommentToDeck;
        model.renderCardList = renderCardList;
        model.classChanged = classChanged;
        model.logout = logout;

        deckService
            .findDeckById(model.deckId)
            .then(renderDeck);

        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function classChanged() {
            if(model.classToggleValue === 'hero') {
                model.currentlyRendering = model.deck.heroClass;
            } else if(model.classToggleValue === 'neutral') {
                model.currentlyRendering = 'Neutral';
            } else {
                model.currentlyRendering = '';
            }
        }

        function renderDecks(decks) {
            model.decks = decks;
        }

        function renderDeck(deck) {
            model.deck = deck;
            model.currentlyRendering = '';
            model.listToggleValue = 'comment';
            model.deckClone = angular.copy(model.deck);
        }

        function addCommentToDeck(comment) {
            if(model.currentUser._id !== undefined) {
                var newComment =
                    {_user: model.currentUser,
                        text: comment,
                    };
                model.deckClone._comments.push(newComment);
                deckService.updateDeck(model.deckId, model.deckClone);
            }
        }

        function updateDeck() {
            deckService.updateDeck(model.deckId, model.deckClone);
            $location.url('/user/'+model.userId+'/deck');
        }

        function renderCardList(filter) {
                return model.cards[filter];

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