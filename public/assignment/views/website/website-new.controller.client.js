/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        //this is iffy related call to the annonymous function
        function init() {
            // create a promise which calls the Node.JS backed code to get the websites of a particular websites.
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (websites) {
                vm.websites = websites.data;

            });

        }

        init();

        function createWebsite(website) {
            //get the Node.JS backed code and fetch websites by id.
            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise.then(function(status){
                $location.url("/user/" + vm.userId + "/website");
            });

        };
    }
})();