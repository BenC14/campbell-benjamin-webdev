(function () {
    angular
        .module('HSProject')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            // .when('/user/:userId', {
            //     templateUrl: 'views/user/templates/profile.view.client.html',
            //     controller: 'profileController',
            //     controllerAs: 'model'
            // })
            .when('/user/:userId/deck', {
            templateUrl: 'views/deck/templates/deck-list.view.client.html',
            controller: 'deckListController',
            controllerAs: 'model'
            })
            .when('/user/:userId/deck/new', {
                templateUrl: 'views/deck/templates/deck-new.view.client.html',
                controller: 'deckNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/deck/:deckId', {
                templateUrl: 'views/deck/templates/deck-edit.view.client.html',
                controller: 'deckEditController',
                controllerAs: 'model'
            })

    }

    function checkLoggedIn($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    console.log('in check user');
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();