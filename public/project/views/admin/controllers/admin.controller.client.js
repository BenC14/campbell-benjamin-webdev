(function () {
    angular
        .module('HSProject')
        .controller('adminController', adminController);

    function adminController(currentUser, $location, userProjectService, deckService, $route, $routeParams) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;
        model.userClone = angular.copy(model.user);
        model.currentUser = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.updateOtherUser = updateOtherUser;
        model.deleteOtherUser = deleteOtherUser;
        model.updateOtherDeck = updateOtherDeck;
        model.deleteOtherDeck = deleteOtherDeck;
        model.logout = logout;
        model.findAllUsers = findAllUsers;
        model.findAllDecks = findAllDecks;
        model.seeUsersDecks = seeUsersDecks;


        function findAllUsers() {
            userProjectService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
            model.typeToggleValue = 'users';
        }
        findAllUsers();

        function findAllDecks() {
            deckService
                .findAllDecks()
                .then(function (decks) {
                    model.decks = decks;
                })
        }
        findAllDecks();

        function seeUsersDecks(user) {
            $location.url('/user/' + user._id + '/deck');
        }

        function updateOtherDeck(deck) {
            deckService
                .updateDeck(deck._id, deck)
                .then(function () {
                    model.message = "Deck updated successfully";
                });
        }

        function deleteOtherDeck(deck) {
            deckService
                .deleteDeck(deck._id)
                .then(function () {
                    $route.reload();
                });
        }

        function updateOtherUser(user) {
            userProjectService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function deleteOtherUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(function () {
                    $route.reload();
                });
        }

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser() {

            userProjectService
                .updateUser(userId, model.userClone)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();