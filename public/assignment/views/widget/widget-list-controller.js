/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        console.log(vm.widgets);
        vm.gotoCreate = gotoCreate;

        vm.goBackToProfile = goBackToProfile;
        vm.gotoProfile = gotoProfile;

        function getWidgetTemplateUrl(widgetType) {
            console.log(widgetType);
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function gotoCreate()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/new");
        }

        function goBackToProfile()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }
    }
})();