(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location, $rootScope) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        var userId = $routeParams['uid'];


        function init() {
            var promise = UserService.findUserById(userId);
            console.log(userId);
            promise.then(function (user) {
                vm.user = user.data;
                console.log("profile mein hit");

                console.log(vm.user);
                if (vm.user == null) {
                    $location.url("/login");
                }
                else {
                    //copy using the Angular directives from the firstname to user
                    vm.firstName = angular.copy(vm.user.firstName);
                }
            });

        }

        //self invoking function
        init();


        vm.update = function (newUser) {
            //call the updateUser service from the Node.JS part of the controller
            var user = UserService.updateUser(userId, newUser);
            //console.log("new user")
            //console.log(newUser)
            if (user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };


        //call the logout service from the Node.JS backed server
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }


        //call the delete user service from the NodeJS backed server
        vm.delete = function()

        {
            var user = UserService.deleteUser(userId);
            $location.url("/");
        }



    }
})();//iffy