(function () {
    angular
        .module('HSProject')
        .controller('adminController', adminController);

    function adminController(currentUser, $location, userProjectService, $routeParams) {

        var model = this;
        //var userId = $routeParams['userId'];
        var userId = currentUser._id;//$routeParams['userId'];
        model.user = currentUser;
        model.userClone = angular.copy(model.user);

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.findAllUsers = findAllUsers;


        function findAllUsers() {
            console.log('in find all user');
            userProjectService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }
        // findAllUsers();


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