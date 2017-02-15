(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location ,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        console.log(vm.websites)
        vm.goToRespectivePage = goToRespectivePage;
        function goToRespectivePage(website)
        {
            $location.url("/user/"+vm.userId+"/website/"+website._id+"/page");
        }

    }



})();