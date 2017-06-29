(function () {
    angular
        .module('HSProject')
        .controller('deckEditController', deckEditController);
    
    function deckEditController(currentUser, $routeParams,
                                  deckService,
                                  $location, userProjectService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.deckId = $routeParams.deckId;
        model.cards = {};
        model.currentUser = currentUser;

        // event handlers

        model.updateDeck = updateDeck;
        model.deleteDeck = deleteDeck;
        model.getCardsForClass = getCardsForClass;
        model.addCardToDeck = addCardToDeck;
        model.removeCardFromDeck = removeCardFromDeck;
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
                model.currentlyRendering = 'hero';
            } else {
                model.currentlyRendering = 'neutral';
            }
        }

        function renderDecks(decks) {
            model.decks = decks;
        }

        function renderDeck(deck) {
            model.deck = deck;
            getCardsForClass(model.deck.heroClass);
            getCardsForNeutral();
            model.currentlyRendering = 'hero';
            model.deckClone = angular.copy(model.deck);
        }

        function updateDeck() {
            deckService.updateDeck(model.deckId, model.deckClone);
            $location.url('/user/'+model.userId+'/deck');
        }

        function deleteDeck(deckId) {
            deckService.deleteDeck(deckId);
            $location.url('/user/'+model.userId+'/deck');
        }

        function getCardsForClass(searchClass) {
            deckService.getCardsForClass(searchClass)
                .then(function(cards) {
                    model.cards.hero = cards;
                })

        }

        function getCardsForNeutral() {
            deckService.getCardsForClass('Neutral')
                .then(function(cards) {
                    model.cards.neutral = cards;
                })

        }

        function renderCardList(filter) {
                return model.cards[filter];

        }

        function addCardToDeck(card) {
            if (model.deckClone.cardCount >= 30) {
                return
            }
            var found = undefined;
            for (var c in model.deckClone.cards) {
                if (model.deckClone.cards[c].cardId == card.cardId) {
                    found = model.deckClone.cards[c];
                }
            }
            if(found !== undefined){
                if (found.quantity == 2) {
                    return;
                } else if (found.rarity === "Legendary") {
                    return
                } else if (found.quantity == 1) {
                    found.quantity = 2;
                    model.deckClone.cardCount += 1
                }

            } else {
                    card.quantity = 1;
                    model.deckClone.cards.push(card);
                    model.deckClone.cardCount += 1
            }

        }

        function removeCardFromDeck(card) {
            var found = undefined;
            var foundIndex;
            for (var c in model.deckClone.cards) {
                if (model.deckClone.cards[c].cardId === card.cardId) {
                    found = model.deckClone.cards[c];
                    foundIndex = c;

                }
            }
            if(found !== undefined) {
                if (found.quantity === 2) {
                    found.quantity = 1;
                    model.deckClone.cardCount -= 1
                } else {
                    model.deckClone.cards.splice(foundIndex, 1);
                    model.deckClone.cardCount -= 1
                }
            }

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