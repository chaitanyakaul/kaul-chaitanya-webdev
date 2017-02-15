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
          var a = WebsiteService.updateWebsite(vm.websiteId,websiteName,websiteDescription);
          $location.url("/user/"+vm.userId+"/website");
      }

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };


      function editThat(website)
      {

          $location.url("/user/"+vm.userId+"/website/"+website._id);
      }
    }
})();