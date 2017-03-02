(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];


        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(function (user) {
                vm.user = user.data;
                console.log(vm.user)
                if (vm.user == null) {
                    $location.url("/login");
                }
                else {
                    vm.firstName = angular.copy(vm.user.firstName);
                }
            });

        }

        init();


        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser);
            //console.log("new user")
            //console.log(newUser)
            if (user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        vm.delete = function()

        {
            var user = UserService.deleteUser(userId);
            $location.url("/");
        }

    }
})();