/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;

        vm.goBackToPageList = goBackToPageList;
        vm.goToEdit = goToEdit;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.gotoProfile = gotoProfile;

        function init()
        {

            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (pages)
                    {
                        vm.pages = pages.data;

                    }

                )

            PageService.findPageById(vm.pageId)
                .then(function (pages)
            {
                vm.pagess = pages.data;

            })


        }
        init();



        function deletePage(pages){
            var a = PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function updatePage (pages) {
            var a = PageService.updatePage(vm.pageId,vm.pagess);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");


        };

        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }

        function goBackToPageList()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function goToEdit(page)
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+page._id);
        }


    }
})();