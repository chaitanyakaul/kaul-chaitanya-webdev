(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password);
            promise.then(function(user){
                if(user) {
                   // console.log(user.data._id);
                    $location.url("/profile/"+user.data._id);
                } else {
                    vm.error = "User not found";
                }
            });
        }
    }
})();