/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {


            var promise = UserService.createUser(user);
            promise.then(function (user) {
                vm.user = user.data;

                if (vm.user != null){
                    $location.url("/user/"+vm.user._id);
                }
                else{
                    vm.firstName = angular.copy(vm.user.firstName);
                }

        })
    }
}})();