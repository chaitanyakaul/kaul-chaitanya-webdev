(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;
        vm.gotoProfile = gotoProfile
        vm.userId = $routeParams.uid;
        vm.goToEdit = goToEdit;
        vm.gotoPageList = gotoPageList;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {

            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        };
        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }

        function goToEdit(page)
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+page._id);
        }

        function gotoPageList()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
        }

    }
})();