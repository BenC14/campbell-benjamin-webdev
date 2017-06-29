(function () {
    angular
        .module('HSProject')
        .factory('userProjectService', userProjectService);

    function userProjectService($http) {

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            register: register,
            logout: logout,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            login: login

        };

        function register(user) {
            var url = "/api/project/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/project/user"
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/project/user/all";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();