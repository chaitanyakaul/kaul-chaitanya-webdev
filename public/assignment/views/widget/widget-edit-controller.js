/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    console.log("sdfsdfsdf");
                    console.log(widget);
                    vm.widget = angular.copy(widget.data);

                });

        }

        init();


        function widgetUpdate(widget) {
            /* var abc = WidgetService.updateWidget(vm.widgetId,widget);
             $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");*/

            WidgetService.updateWidget(vm.widgetId, widget)
                .then(function (widgets) {

                        //vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                )

        }

        function deleteWidget() {
            /*var jsj = WidgetService.deleteWidget(vm.widgetId);
             $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");*/

            WidgetService.deleteWidget(vm.widgetId)
                .then(function (widgets) {
                        console.log("hit in delete");
                        //vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                )


        }

        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }

        function goToWidgetList() {
            deleteWidget();
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        var count = 0;

        function getEditorTemplateUrl(type) {
            count++;
            console.log(count);
            return 'views/widget/widget-' + type + '-editor.view.client.html';
        }
    }
})();