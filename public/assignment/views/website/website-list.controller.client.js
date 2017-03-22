(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.callWebsiteEdit = callWebsiteEdit;
        vm.goToRespectivePage = goToRespectivePage;


        // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        // console.log(vm.websites);

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (websites) {
                vm.websites = websites.data;
                console.log("Refresh")
                console.log(vm.websites)
            });


        }

        init();

        function goToRespectivePage(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function callWebsiteEdit(website)
        {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }


    }


})();