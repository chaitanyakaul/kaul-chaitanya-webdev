(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;



        function init() {
            vm.login = login;
            function login(user) {


                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .then(function (user) {
                        //console.log("fsd");
                        //console.log(user);
                        var loginUser = user.data[0];
                        if (loginUser != null) {
                            console.log("uper hit");
                            console.log(loginUser._id);
                            $location.url('/profile/' + loginUser._id);
                        } else {
                            vm.error = 'user not found';
                        }
                    })
                    .catch(function (err) {
                        vm.error = 'user not found';
                    });
            }
        }init()
    }
})();