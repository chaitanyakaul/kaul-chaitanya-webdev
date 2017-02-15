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
            var registerUser = UserService.createUser(user);

            console.log(registerUser);
            $location.url("/profile/"+registerUser);
            if(registerUser != null) {
              vm.error="You are registered";
        }
    }
}})();