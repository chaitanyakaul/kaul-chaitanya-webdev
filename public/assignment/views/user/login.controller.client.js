(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {


            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (user) {
                    console.log("fsd");
                    console.log(user);
                    var loginUser = user.data;
                    if(loginUser != null) {
                        $location.url('/profile/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .catch(function(err) {
                    vm.error = 'user not found';
                });
        }
    }
})();