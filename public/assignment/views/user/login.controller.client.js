/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/profile/' + loginUser._id);
                console.log(loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }
})();