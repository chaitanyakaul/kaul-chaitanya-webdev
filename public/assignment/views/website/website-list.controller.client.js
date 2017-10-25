(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        vm.userId = $routeParams.uid;
        vm.callWebsiteEdit = callWebsiteEdit;
        vm.goToRespectivePage = goToRespectivePage;


        // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        // console.log(vm.websites);


        //this is iffy related call to the annonymous function
        function init() {
            // create a promise which calls the Node.JS backed code to get the websites of a particular websites.
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
        {   //get the Node.JS backed code and fetch websites by id.
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }


    }


})();