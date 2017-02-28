(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.deleteWebsite = deleteWebsite;
       vm.updateWebsite = updateWebsite;
       vm.editThat = editThat;


        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            var anotherPromise = WebsiteService.findWebsiteById(vm.websiteId);

            anotherPromise.then(function(website)
            {
                vm.weber = website.data
            })


            promise.then(function (websites) {
                vm.websites = websites.data;

            });

        }
        init();

      function updateWebsite(website)
      {
          console.log(website);
          var a = WebsiteService.updateWebsite(vm.websiteId,website);
          $location.url("/user/"+vm.userId+"/website");
      }




        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };


      function editThat(website)
      {
          console.log("hit that")
            console.log(website);
          $location.url("/user/"+vm.userId+"/website/"+website._id);
      }
    }
})();