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
                model.message = "Username or Password is incorrect, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/');
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();