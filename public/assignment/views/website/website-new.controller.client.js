/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (websites) {
                vm.websites = websites.data;

            });

        }

        init();

        function createWebsite(website) {

            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise.then(function(status){
                $location.url("/user/" + vm.userId + "/website");
            });

        };
    }
})();