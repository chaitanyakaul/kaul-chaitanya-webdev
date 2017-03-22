(function () {
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
            //console.log("hit")
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (pages) {
                        vm.pages = pages.data;
                        //  console.log(vm.pages);
                    }
                )
        }

        init();

        function createPage(page) {

            var promise =  PageService.createPage(vm.websiteId, page);
            promise.then(function(status){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            })


        };
        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }

        function goToEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function gotoPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

    }
})();