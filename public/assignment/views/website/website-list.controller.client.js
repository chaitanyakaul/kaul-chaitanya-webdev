(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        // console.log(vm.websites);

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (websites) {
                vm.websites = websites.data;

            });

        }

        init();

        vm.goToRespectivePage = goToRespectivePage;
        function goToRespectivePage(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

    }


})();