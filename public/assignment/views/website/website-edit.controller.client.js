(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        vm.editThat = editThat;


        //this is iffy related call to the annonymous function
        function init() {

            var promise = WebsiteService.findWebsitesByUser(vm.userId);

            promise.then(function (websites) {
                vm.websites = websites.data;

            });

        }


        function another_init()
        {
            //get the Node.JS backed code and fetch websites by id.
            var anotherPromise = WebsiteService.findWebsiteById(vm.websiteId);
            anotherPromise.then(function (website) {

                vm.weber = website.data
                console.log(vm.weber);

            })
        }
        another_init();

        init();

        function updateWebsite(website) {


            //store the website details in the mongoDB backed database.
            var a = WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.userId + "/website");
        }


        function deleteWebsite() {
            //delete the specific website using the controller from Node.JS
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        };


        function editThat(website) {
            //called to edit a specific website.
            console.log("hit that")
            console.log(website);
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }
    }
})();