/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location, $rootScope) {
        var vm = this;


        function init() {
            vm.register = register;

            function register(user) {


                var promise = UserService.register(user);
                promise.then(function (user) {
                    vm.user = user.data;

                    if (vm.user != null) {
                        var user = vm.user
                        $rootScope.currentUser = user;
                        $location.url("/profile/"+user._id);

                        $location.url("/profile/" + vm.user._id);
                    }
                    else {
                        vm.firstName = angular.copy(vm.user.firstName);
                    }

                })
            }
        }init();
    }
})();