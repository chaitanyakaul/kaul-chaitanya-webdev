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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);

        }
        init();

      function updateWebsite(websiteName,websiteDescription)
      {
          console.log("Hit")
          var a = WebsiteService.updateWebsite(vm.websiteId,websiteName,websiteDescription);
          $location.url("/user/"+vm.userId+"/website");
      }

        function deleteWebsite () {
            console.log("hit")
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };


      function editThat(website)
      {

          $location.url("/user/"+vm.userId+"/website/"+website._id);
      }
    }
})();