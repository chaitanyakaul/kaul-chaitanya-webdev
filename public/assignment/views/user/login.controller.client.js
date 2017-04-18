(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;



        function init() {
            vm.login = login;
            function login(user) {


                var promise = UserService.login(user);
                promise
                    .then(function (user) {
                        //console.log("fsd");
                        //console.log(user);
                        console.log("hit in client")



                        var loginUser = user.data;
                        console.log(loginUser)
                        if (loginUser != null) {
                            console.log("uper hit");
                            $rootScope.currentUser = user;
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