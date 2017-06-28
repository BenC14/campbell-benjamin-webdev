(function () {
    angular
        .module('HSProject')
        .controller('homeController', homeController);
    
    function homeController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();