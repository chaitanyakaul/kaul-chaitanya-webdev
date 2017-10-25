(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        //hold the current instance of the object in the variable vm
        var vm = this;


        //this is iffy related call to the annonymous function
        function init() {
            vm.login = login;
            function login(user) {

                // create a promise which calls the Node.JS backed code to get the websites of a particular websites.
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
                        //catch the error and print it to the console.
                        vm.error = 'user not found';
                    });
            }
        }init()
    }
})();//iffy