(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        console.log(vm.userId);
        vm.createPage = createPage;
        vm.gotoProfile = gotoProfile
        vm.userId = $routeParams.uid;

        function init() {
            // vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {

            PageService.createPage(vm.websiteId, page);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
          $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
           // $route.reload();
            console.log(page);
            //init();
        };
        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }

    }
})();