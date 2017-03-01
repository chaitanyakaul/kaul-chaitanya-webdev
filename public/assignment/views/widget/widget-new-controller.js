/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
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
            //var abc = WidgetService.createHeaderWidget(vm.pageId)
            WidgetService.createHeaderWidget(vm.pageId)
                .then(function (widgets) {
                        vm.widget_id = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget_id);
                    }
                )

        }

        function createImageWidget() {
            WidgetService.createImageWidget(vm.pageId)
                .then(function (widgets) {

                        vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgeter);
                    }
                )
        }

        function createYoutubeWidget() {
            WidgetService.createYoutubeWidget(vm.pageId)
                .then(function (widgets) {

                        vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgeter);
                    }
                )
        }

        function createHtmlWidget() {
            WidgetService.createHtmlWidget(vm.pageId)
                .then(function (widgets) {

                        vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgeter);
                    }
                )
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/widget-' + type + '-editor.view.client.html';
        }

        function goBackToList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }

    }
})();