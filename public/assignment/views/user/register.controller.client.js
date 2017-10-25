/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location, $rootScope) {
        //hold the current instance of the object in the variable vm
        var vm = this;

        //use AngularJS's routeparams class and pass the current uid to it
        function init() {
            vm.register = register;

            function register(user) {

                // create a promise which calls the Node.JS backed code to get the websites of a particular websites.
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
                        //call Angular related copy method to copy the firstname of the user
                        vm.firstName = angular.copy(vm.user.firstName);
                    }

                })
            }
        }init(); //iffy related call to immediately invoke the calling function
    }
})(); //iffy