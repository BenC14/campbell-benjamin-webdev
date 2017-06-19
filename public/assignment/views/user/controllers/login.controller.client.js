(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            console.log(model.myForm.$invalid);
            if(model.myForm.$invalid) {
                //console.log('in invalid');
                //model.myForm.clicked = 'true';
                //console.log(model.myForm);
                model.classes = 'clicked';
                return
            }

            userService
                // .findUserByCredentials(username, password)
                // .then(login, handleError);

                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                console.log('in login error');
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

            // function login(found) {
            //     if(found !== null) {
            //         $location.url('/user/' + found._id);
            //         // $scope.message = "Welcome " + username;
            //     } else {
            //         model.message = "Username " + username + " not found, please try again";
            //     }
            // }
            console.log(model.myForm);
        };
    }
})();