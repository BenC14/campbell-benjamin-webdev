(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        function register(username, password, password2) {
            if(model.myForm.$invalid) {
                model.myForm.classes = 'clicked';
                return;
            }

            if(password !== password2) {
                model.message = "Passwords must match";
                return;
            }

            return userService.findUserByUsername(username)
                .then(function(response) {
                    var available = response.availble;

                    if(available != 'true') {
                        model.message = "Username is not available";
                    } else {
                        var user = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(user)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    }
                });
        }

    }
})();