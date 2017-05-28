(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);
        model.userClone = angular.copy(model.user);
        model.updateUser = updateUser;

        function updateUser() {
            userService.updateUser(userId, model.userClone);
        }
    }
})();