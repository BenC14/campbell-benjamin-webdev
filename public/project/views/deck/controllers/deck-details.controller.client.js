(function () {
    angular
        .module('HSProject')
        .controller('deckDetailsController', deckDetailsController);
    
    function deckDetailsController(currentUser, $routeParams,
                                  deckService,
                                  $location) {

        var model = this;
        model.currentUser = currentUser;
        model.userId = $routeParams['userId'];
        model.deckId = $routeParams.deckId;
        model.cards = {};

        // event handlers

        model.updateDeck = updateDeck;
        model.addCommentToDeck = addCommentToDeck;

        // model.deleteDeck = deleteDeck;
        // model.getCardsForClass = getCardsForClass;
        // model.addCardToDeck = addCardToDeck;
        // model.removeCardFromDeck = removeCardFromDeck;
        model.renderCardList = renderCardList;
        model.classChanged = classChanged;
        model.listChanged = listChanged;

        deckService
            .findDeckById(model.deckId)
            .then(renderDeck);

        deckService
            .findAllDecksForUser(model.userId)
            .then(renderDecks);

        function classChanged() {
            console.log(model.classToggleValue);
            if(model.classToggleValue === 'hero') {
                model.currentlyRendering = model.deck.heroClass;
            } else if(model.classToggleValue === 'neutral') {
                model.currentlyRendering = 'Neutral';
            } else {
                model.currentlyRendering = '';
            }
        }

        function listChanged() {
            console.log(model.listToggleValue);
            // if(model.classToggleValue === 'hero') {
            //     model.currentlyRendering = model.deck.heroClass;
            // } else if(model.classToggleValue === 'neutral') {
            //     model.currentlyRendering = 'Neutral';
            // } else {
            //     model.currentlyRendering = '';
            // }
        }

        function renderDecks(decks) {
            model.decks = decks;
        }

        function renderDeck(deck) {
            model.deck = deck;
            // getCardsForClass(model.deck.heroClass);
            // getCardsForNeutral();
            console.log(model.deck)
            model.currentlyRendering = '';
            model.listToggleValue = 'comment';
            model.deckClone = angular.copy(model.deck);
        }

        function addCommentToDeck(comment) {
            console.log(currentUser);
            if(model.currentUser._id !== undefined) {
                console.log(comment)
                var newComment =
                    {_user: model.currentUser,
                        text: comment,
                    };
                model.deckClone._comments.push(newComment);
                deckService.updateDeck(model.deckId, model.deckClone);
            }
        }

        function updateDeck() {
            // if(model.myForm.$invalid) {
            //     model.classes = 'clicked';
            //     return;
            // }
            deckService.updateDeck(model.deckId, model.deckClone);
            $location.url('/user/'+model.userId+'/deck');
        }

        // function deleteDeck(deckId) {
        //     deckService.deleteDeck(deckId);
        //     $location.url('/user/'+model.userId+'/deck');
        // }

        function showCardsForClass(searchClass) {
            deckService.getCardsForClass(searchClass)
                .then(function(cards) {
                    model.cards.hero = cards;
                })

        }

        function showCardsForNeutral() {
            deckService.getCardsForClass('Neutral')
                .then(function(cards) {
                    model.cards.neutral = cards;
                })

        }

        function renderCardList(filter) {
                return model.cards[filter];

        }



        // model.filter('orderObjectBy', function() {
        //     return function(items, field, reverse) {
        //         var filtered = [];
        //         angular.forEach(items, function(item) {
        //             filtered.push(item);
        //         });
        //         filtered.sort(function (a, b) {
        //             return (a[field] > b[field] ? 1 : -1);
        //         });
        //         if(reverse) filtered.reverse();
        //         return filtered;
        //     };
        // });
    }
})();