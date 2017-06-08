(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
            model.userClone = angular.copy(model.user);

        }

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser() {
            userService
                .updateUser(userId, model.userClone)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();