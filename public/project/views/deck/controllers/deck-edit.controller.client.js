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
            console.log(model.classToggleValue);
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
            console.log(deck);
            getCardsForClass(model.deck.heroClass);
            getCardsForNeutral();
            model.currentlyRendering = 'hero';
            model.deckClone = angular.copy(model.deck);
        }

        function updateDeck() {
            // if(model.myForm.$invalid) {
            //     model.classes = 'clicked';
            //     return;
            // }
            console.log(model.deckClone);
            deckService.updateDeck(model.deckId, model.deckClone);
            $location.url('/user/'+model.userId+'/deck');
        }

        function deleteDeck(deckId) {
            deckService.deleteDeck(deckId);
            $location.url('/user/'+model.userId+'/deck');
        }

        function getCardsForClass(searchClass) {
            console.log('in get cards');
            console.log(model.deck.heroClass);
            deckService.getCardsForClass(searchClass)
                .then(function(cards) {
                    model.cards.hero = cards;
                })

        }

        function getCardsForNeutral() {
            console.log('in get cards');
            console.log('Neutral');
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
            console.log(model.deckClone.cards);
            console.log('cardId: '+ card.cardId);
            var found = undefined;
            // console.log(found);
            // console.log(model.deckClone.cards[found]);
            for (var c in model.deckClone.cards) {
                console.log('looking for ' + card.cardId);
                if (model.deckClone.cards[c].cardId == card.cardId) {
                    console.log('found');
                    console.log(model.deckClone.cards[c]);
                    found = model.deckClone.cards[c];
                }
            }
            console.log(found);
            if(found !== undefined){
                if (found.quantity == 2) {
                    console.log('found quantity 2');
                    return;
                    console.log('adding');
                    console.log(found);
                    //found.quantity = 2;
                } else if (found.rarity === "Legendary") {
                    console.log('found legendary');
                    return
                } else if (found.quantity == 1) {
                    console.log('found quantity 1');
                    found.quantity = 2;
                    model.deckClone.cardCount += 1
                }

            } else {
                console.log('didnt find quantity 1');
                    card.quantity = 1;
                    console.log('card about to add');
                    console.log(card);
                    model.deckClone.cards.push(card);
                    model.deckClone.cardCount += 1
            }
            for (var c in model.deckClone.cards) {
                console.log(model.deckClone.cards[c].cardId);
            }

        }

        function removeCardFromDeck(card) {
            console.log(model.deckClone.cards);
            console.log(card);
            var found = undefined;
            var foundIndex;
            for (var c in model.deckClone.cards) {
                if (model.deckClone.cards[c].cardId === card.cardId) {
                    console.log('found');
                    console.log(model.deckClone.cards[c]);
                    found = model.deckClone.cards[c];
                    console.log(c);
                    foundIndex = c;
                    console.log('foundIndex1: ' + foundIndex);

                }
            }
            console.log(found);
            if(found !== undefined) {
                if (found.quantity === 2) {
                    console.log('removing 1');
                    console.log(found.rarity);
                    found.quantity = 1;
                    model.deckClone.cardCount -= 1
                } else {
                    // card.quantity = 0;
                    console.log(model.deckClone.cards.indexOf(found));
                    console.log(model.deckClone.cards[model.deckClone.cards.indexOf(found)]);
                    console.log('foundIndex: ' + foundIndex);
                    model.deckClone.cards.splice(foundIndex, 1);
                    // model.deckClone.cards.push(card);
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