(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.goToRespectiveWidget = goToRespectiveWidget;

        function init() {
            //console.log("hit")
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (pages) {
                        vm.pages = pages.data;
                        //  console.log(vm.pages);
                    }
                )
        }

        init();


        vm.newPage = newPage;
        vm.callEdit = callEdit
        vm.goBackToWebsiteList = goBackToWebsiteList;
        vm.gotoProfile = gotoProfile;


        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function callEdit(id) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + id);
        }

        function goToRespectiveWidget(page) {
            $location.url("/user/" + vm.userIqxd + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function goBackToWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        }


        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }
    }
})();