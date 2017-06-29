(function () {
    angular
        .module('HSProject')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
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
            .when('/user/:userId/deck', {
            templateUrl: 'views/deck/templates/deck-list.view.client.html',
            controller: 'deckListController',
            controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/deck/new', {
                templateUrl: 'views/deck/templates/deck-new.view.client.html',
                controller: 'deckNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/deck/:deckId', {
                templateUrl: 'views/deck/templates/deck-edit.view.client.html',
                controller: 'deckEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkUserMatch
                }
            })

            .when('/user/:userId/deck/:deckId/details', {
                templateUrl: 'views/deck/templates/deck-details.view.client.html',
                controller: 'deckDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

    }

    function checkCurrentUser($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, $location, userProjectService) {
        var deferred = $q.defer();
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
    function checkUserMatch($q, $location, $route, userProjectService) {
        var deferred = $q.defer();
        var routeUserId = $route.current.params.userId;
        var routeDeckId = $route.current.params.deckId;
        userProjectService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else if(currentUser._id === routeUserId){
                    deferred.resolve(currentUser);
                } else {
                    deferred.reject();
                    $location.url('/user/' + routeUserId + '/deck/' + routeDeckId + '/details');
                }
            });
        return deferred.promise;
    }

})();