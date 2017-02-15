/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        console.log(vm.userId);
        vm.createWebsite = createWebsite;

        function init() {
           // vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite (website) {
            WebsiteService.createWebsite(vm.userId, website);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
            console.log(vm.userId);
        };
    }
})();