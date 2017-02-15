/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.widgetUpdate = widgetUpdate;
        vm.deleteWidget = deleteWidget;
        vm.gotoProfile = gotoProfile;
        vm.goToWidgetList = goToWidgetList;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'views/widget/widget-'+type+'-editor.view.client.html';
        }


        function widgetUpdate(widget)
        {
            var abc = WidgetService.updateWidget(vm.widgetId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

        function deleteWidget()
        {
            var jsj = WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function gotoProfile()
        {
            $location.url("/profile/"+vm.userId);
        }

        function goToWidgetList()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();