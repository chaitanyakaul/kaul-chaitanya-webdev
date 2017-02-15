/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;
        vm.goBackToList = goBackToList;
        vm.gotoProfile = gotoProfile;
        vm.createHtmlWidget = createHtmlWidget;

        function createHeaderWidget() {
            var abc = WidgetService.createHeaderWidget(vm.pageId)
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+abc);

        }

        function createImageWidget()
        {
            var abc = WidgetService.createImageWidget(vm.pageId)
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+abc);
        }

        function createYoutubeWidget()
        {
            var abc = WidgetService.createYoutubeWidget(vm.pageId)
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+abc);
        }

        function createHtmlWidget()
        {
            var abc = WidgetService.createHtmlWidget(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+abc);
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/widget-'+type+'-editor.view.client.html';
        }

        function goBackToList()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }

    }
})();