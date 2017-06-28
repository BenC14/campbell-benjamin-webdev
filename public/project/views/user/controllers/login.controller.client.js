(function () {
    angular
        .module('HSProject')
        .controller('loginController', loginController);

    function loginController($location, userProjectService) {

        var model = this;

        model.login = function (username, password) {
            if(model.myForm.$invalid) {
                model.classes = 'clicked';
                return
            }

            userProjectService

                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                console.log(error);
                console.log('in error');
                model.message = "Username or Password is incorrect, please try again";
            }

            function login(found) {
                console.log('in login found');
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