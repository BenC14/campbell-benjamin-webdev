(function () {
    angular
        .module('HSProject')
        .controller('profileController', profileController);
    
    function profileController(currentUser, $location, userProjectService, $routeParams) {

        var model = this;
        var userId = currentUser._id;//$routeParams['userId'];
        model.user = currentUser;
        model.userClone = angular.copy(model.user);
        model.currentUser = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function logout() {
            userProjectService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function deleteUser(user) {
            userProjectService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
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