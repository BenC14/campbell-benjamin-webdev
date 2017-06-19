(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return
            }

            userService

                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username or Password is incorrect, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();